const dialog = document.querySelector('.menu-dialog');
const image = dialog?.querySelector('[data-dialog-image]');
const heading = dialog?.querySelector('[data-dialog-heading]');
const close = dialog?.querySelector('.menu-dialog__close');
const viewport = dialog?.querySelector('.menu-dialog__image-wrap');
const zoomIn = dialog?.querySelector('[data-zoom-in]');
const zoomOut = dialog?.querySelector('[data-zoom-out]');
const reset = dialog?.querySelector('[data-zoom-reset]');
const level = dialog?.querySelector('[data-zoom-level]');

if (dialog instanceof HTMLDialogElement && image instanceof HTMLImageElement && viewport && heading && close && zoomIn && zoomOut && reset && level) {
  let zoom = 1;
  let fittedWidth = 0;
  let opener;

  const applyZoom = () => {
    image.width = Math.round(fittedWidth * zoom);
    level.textContent = `${Math.round(zoom * 100)} %`;
    zoomIn.disabled = zoom >= 3;
    zoomOut.disabled = zoom <= 1;
  };
  const fit = () => {
    if (!image.naturalWidth || !dialog.open) return;
    fittedWidth = Math.min(image.naturalWidth, viewport.clientWidth - 36,
      (viewport.clientHeight - 36) * image.naturalWidth / image.naturalHeight);
    zoom = 1;
    applyZoom();
    viewport.scrollTo(0, 0);
  };
  const changeZoom = (amount) => {
    zoom = Math.max(1, Math.min(3, Math.round((zoom + amount) * 100) / 100));
    applyZoom();
  };

  image.addEventListener('load', fit);
  document.querySelectorAll('[data-menu-image]').forEach((card) => {
    card.addEventListener('click', () => {
      const { menuImage, menuTitle } = card.dataset;
      if (!menuImage || !menuTitle) return;
      opener = card;
      heading.textContent = menuTitle;
      image.alt = `Carta ampliada: ${menuTitle}`;
      dialog.showModal();
      image.src = menuImage;
      if (image.complete) fit();
      close.focus();
    });
  });
  zoomIn.addEventListener('click', () => changeZoom(.5));
  zoomOut.addEventListener('click', () => changeZoom(-.5));
  reset.addEventListener('click', fit);
  viewport.addEventListener('wheel', (event) => {
    if (!event.ctrlKey) return;
    event.preventDefault();
    changeZoom(event.deltaY < 0 ? .25 : -.25);
  }, { passive: false });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    image.removeAttribute('src');
    image.removeAttribute('width');
    opener?.focus();
  });
  window.addEventListener('resize', fit);
}
