import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getSiteConfig } from '../src/config/site.mjs';

const data = JSON.parse(readFileSync(new URL('../src/data/menu.json', import.meta.url), 'utf8'));
const source = JSON.parse(readFileSync(new URL('../assets/menu-generation.json', import.meta.url), 'utf8'));

test('all source dishes, descriptions and prices survive the structured migration', () => {
  assert.equal(data.length, 5);
  assert.equal(new Set(data.map(page => page.id)).size, 5);
  let count = 0;
  for (const original of source.pages) {
    const page = data.find(item => item.id === original.key);
    assert(page);
    const expected = original.text.split('\n').filter(line => line.includes(' — '));
    const actual = page.groups.flatMap(group => group.items).map(item => {
      count++;
      assert(Number.isInteger(item.price));
      const price = (item.price / 100).toFixed(2).replace('.', ',') + '€';
      const montado = item.montadoPrice === undefined ? '' : ' | ' + (item.montadoPrice / 100).toFixed(2).replace('.', ',') + '€';
      return item.name + (item.description ? ` (${item.description})` : '') + ' — ' + price + montado;
    });
    assert.deepEqual(actual, expected, original.key);
  }
  assert.equal(count, 76);
});

test('SEO never invents a production URL and does not index deploy previews', () => {
  assert.deepEqual(getSiteConfig({}), { site: undefined, indexable: false });
  assert.deepEqual(getSiteConfig({ URL: 'https://restaurant.example/', CONTEXT: 'production' }), {
    site: 'https://restaurant.example', indexable: true,
  });
  assert.equal(getSiteConfig({ URL: 'https://restaurant.example', CONTEXT: 'deploy-preview' }).indexable, false);
  assert.equal(getSiteConfig({ URL: 'https://restaurant.example', CONTEXT: 'branch-deploy' }).indexable, false);
  assert.equal(getSiteConfig({ SITE_URL: 'https://custom.example', URL: 'https://restaurant.example' }).site, 'https://custom.example');
  for (const value of ['http://restaurant.example', 'https://user:password@restaurant.example', 'https://restaurant.example/path', 'https://localhost']) {
    assert.throws(() => getSiteConfig({ SITE_URL: value }));
  }
});
