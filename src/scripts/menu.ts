export function initializeMenuDialog(): void {
  const dialog = document.querySelector<HTMLDialogElement>('.menu-dialog');
  const image = dialog?.querySelector<HTMLImageElement>('[data-dialog-image]');
  const heading = dialog?.querySelector<HTMLElement>('[data-dialog-heading]');
  const closeButton = dialog?.querySelector<HTMLButtonElement>('.menu-dialog__close');
  const viewport = dialog?.querySelector<HTMLDivElement>('.menu-dialog__image-wrap');
  const zoomIn = dialog?.querySelector<HTMLButtonElement>('[data-zoom-in]');
  const zoomOut = dialog?.querySelector<HTMLButtonElement>('[data-zoom-out]');
  const reset = dialog?.querySelector<HTMLButtonElement>('[data-zoom-reset]');
  const level = dialog?.querySelector<HTMLOutputElement>('[data-zoom-level]');
  const status = dialog?.querySelector<HTMLElement>('[data-image-status]');
  const fallback = dialog?.querySelector<HTMLAnchorElement>('[data-image-fallback]');
  if (!dialog || !image || !heading || !closeButton || !viewport || !zoomIn || !zoomOut || !reset || !level || !status || !fallback) return;

  let zoom = 1;
  let fittedWidth = 0;
  let ready = false;
  let opener: HTMLAnchorElement | null = null;
  let textFocus: HTMLElement | null = null;
  let pixelRatio = window.devicePixelRatio;

  const applyZoom = () => {
    image.width = Math.max(1, Math.round(fittedWidth * zoom));
    level.textContent = `${Math.round(zoom * 100)} %`;
    zoomIn.disabled = !ready || zoom >= 3;
    zoomOut.disabled = !ready || zoom <= 1;
    reset.disabled = !ready;
  };
  const fit = () => {
    if (!ready || !dialog.open || !image.naturalWidth) return;
    fittedWidth = Math.max(1, Math.min(image.naturalWidth, viewport.clientWidth - 36,
      Math.max(100, viewport.clientHeight - 36) * image.naturalWidth / image.naturalHeight));
    zoom = 1;
    applyZoom();
    viewport.scrollTo(0, 0);
  };
  const showLoaded = () => {
    if (!dialog.open || !image.naturalWidth) return;
    ready = true;
    image.hidden = false;
    status.textContent = '';
    viewport.setAttribute('aria-busy', 'false');
    fit();
  };
  const showError = () => {
    if (!dialog.open) return;
    ready = false;
    image.hidden = true;
    status.textContent = 'No se ha podido cargar la imagen. Puedes consultar la carta en texto.';
    viewport.setAttribute('aria-busy', 'false');
    applyZoom();
  };
  image.addEventListener('load', showLoaded);
  image.addEventListener('error', showError);

  document.querySelectorAll<HTMLAnchorElement>('[data-menu-image]').forEach((card) => {
    card.addEventListener('click', (event: MouseEvent) => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const { menuImage, menuTitle, menuId } = card.dataset;
      if (!menuImage || !menuTitle || !menuId) return;
      const url = new URL(menuImage, location.href);
      if (url.origin !== location.origin) return;
      event.preventDefault();
      opener = card;
      ready = false;
      zoom = 1;
      image.hidden = true;
      image.removeAttribute('src');
      heading.textContent = menuTitle;
      image.alt = `Carta ampliada: ${menuTitle}`;
      fallback.href = `#texto-${menuId}`;
      status.textContent = 'Cargando carta…';
      viewport.setAttribute('aria-busy', 'true');
      applyZoom();
      if (!dialog.open) dialog.showModal();
      image.src = url.href;
      if (image.complete && image.naturalWidth) showLoaded();
      closeButton.focus();
    });
  });
  zoomIn.addEventListener('click', () => { if (ready) { zoom = Math.min(3, zoom + .5); applyZoom(); } });
  zoomOut.addEventListener('click', () => { if (ready) { zoom = Math.max(1, zoom - .5); applyZoom(); } });
  reset.addEventListener('click', fit);
  closeButton.addEventListener('click', () => dialog.close());
  fallback.addEventListener('click', (event) => {
    event.preventDefault();
    const details = document.getElementById(fallback.hash.slice(1));
    if (details instanceof HTMLDetailsElement) {
      details.open = true;
      textFocus = details.querySelector('summary');
      dialog.close();
      details.scrollIntoView({ block: 'start' });
    } else dialog.close();
  });
  dialog.addEventListener('click', (event: MouseEvent) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    ready = false;
    image.removeAttribute('src');
    image.removeAttribute('width');
    status.textContent = '';
    (textFocus ?? opener)?.focus();
    textFocus = null;
  });
  window.addEventListener('resize', () => {
    const nextRatio = window.devicePixelRatio;
    if (nextRatio !== pixelRatio) { pixelRatio = nextRatio; return; }
    fit();
  });
}

initializeMenuDialog();
