import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';

const pages = JSON.parse(readFileSync(new URL('../../src/data/menu.json', import.meta.url), 'utf8'));

test('production CSP allows every menu to open, zoom and return keyboard focus', async ({ page }) => {
  const errors = [];
  page.on('console', event => { if (event.type() === 'error') errors.push(event.text()); });
  const response = await page.goto('/');
  expect(response.headers()['content-security-policy']).toContain("script-src 'self'");
  await expect(page.locator('script[type="module"]')).toHaveAttribute('src', /.+\.js$/);
  for (const entry of pages) {
    const card = page.getByRole('link', { name: 'Ampliar carta: ' + entry.title, exact: true });
    await card.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Ampliar carta', exact: true })).toBeEnabled();
    await expect(page.getByRole('button', { name: 'Cerrar carta ampliada' })).toBeFocused();
    const width = await page.locator('[data-dialog-image]').evaluate(image => image.width);
    await page.getByRole('button', { name: 'Ampliar carta', exact: true }).click();
    expect(await page.locator('[data-dialog-image]').evaluate(image => image.width)).toBeGreaterThan(width);
    const wheelAllowed = await page.locator('.menu-dialog__image-wrap').evaluate(el =>
      el.dispatchEvent(new WheelEvent('wheel', { ctrlKey: true, deltaY: -100, bubbles: true, cancelable: true })));
    expect(wheelAllowed).toBe(true);
    await expect(page.locator('[data-zoom-level]')).toHaveText('150 %');
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
    await expect(card).toBeFocused();
  }
  expect(errors).toEqual([]);
});

for (const width of [320, 1280]) {
  test(`WCAG checks pass for text, image dialog and reflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/');
    for (const summary of await page.locator('summary').all()) await summary.click();
    const scan = () => new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa']).analyze();
    expect((await scan()).violations).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
    await page.getByRole('link', { name: 'Ampliar carta: Hamburguesas', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Ampliar carta', exact: true })).toBeEnabled();
    expect((await scan()).violations).toEqual([]);
    await page.keyboard.press('Escape');
  });
}

test('a failed image reports the error and offers the matching text menu', async ({ page }) => {
  await page.goto('/');
  const card = page.getByRole('link', { name: 'Ampliar carta: Hamburguesas', exact: true });
  const reading = await card.getAttribute('data-menu-image');
  await page.route('**' + reading, route => route.abort());
  await card.click();
  await expect(page.locator('[data-image-status]')).toContainText('No se ha podido cargar');
  await expect(page.getByRole('button', { name: 'Ampliar carta', exact: true })).toBeDisabled();
  await page.getByRole('link', { name: 'Consultar esta carta en texto' }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.locator('#texto-hamburguesas')).toHaveAttribute('open', '');
  await expect(page.locator('#texto-hamburguesas summary')).toBeFocused();
});

test('optimized images preserve aspect ratios and first image is prioritized', async ({ page, request }) => {
  await page.goto('/');
  const first = page.locator('.menu-card img').first();
  await expect(first).toHaveAttribute('loading', 'eager');
  await expect(first).toHaveAttribute('fetchpriority', 'high');
  for (const image of await page.locator('.menu-card img').all()) {
    await expect(image).toHaveAttribute('srcset', /320w.*480w.*640w.*960w/);
    expect(await image.evaluate(el => getComputedStyle(el).objectFit)).toBe('contain');
    const response = await request.get(await image.getAttribute('src'));
    expect((await response.body()).length).toBeLessThan(100_000);
    expect(response.headers()['cache-control']).toContain('immutable');
  }
});

test('semantic SEO is complete and noindex is safe without a known production URL', async ({ page, request }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Bar Plaza en Pinto/);
  const data = await page.locator('script[type="application/ld+json"]').textContent();
  expect(JSON.parse(data)['@type']).toBe('Restaurant');
  const canonical = page.locator('link[rel="canonical"]');
  if (await canonical.count()) {
    await expect(canonical).toHaveAttribute('href', /^https:\/\//);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /^https:\/\/.+\.png$/);
    const social = new URL(await page.locator('meta[property="og:image"]').getAttribute('content'));
    const response = await request.get(social.pathname);
    expect(response.status()).toBe(200);
    const png = await response.body();
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);
  } else {
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow');
    expect(await (await request.get('/robots.txt')).text()).toContain('Disallow: /');
  }
  expect((await request.get('/sitemap.xml')).status()).toBe(200);
});

test('generation prompts and source contracts are not exposed by the deployed site', async ({ request }) => {
  for (const path of ['/images/menu/transcription.json', '/images/menu/menu.sdd', '/scripts/menu.sdd']) {
    expect((await request.get(path)).status()).toBe(404);
  }
});

test('menu remains available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4323/');
  await page.locator('#texto-raciones summary').click();
  await expect(page.locator('#texto-raciones')).toContainText('Patatas Bravas/Aliolis/Braviolis');
  await expect(page.getByRole('link', { name: 'Ampliar carta: Raciones', exact: true })).toHaveAttribute('href', /\.webp$/);
  await context.close();
});
