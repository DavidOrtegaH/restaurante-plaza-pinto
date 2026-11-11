const dialog = document.querySelector('.menu-dialog');
const dialogImage = document.querySelector('[data-dialog-image]');
const dialogHeading = document.querySelector('[data-dialog-heading]');
const closeButton = document.querySelector('.menu-dialog__close');

if (dialog instanceof HTMLDialogElement && dialogImage instanceof HTMLImageElement &&
  dialogHeading instanceof HTMLElement && closeButton instanceof HTMLButtonElement) {
  document.querySelectorAll('[data-menu-image]').forEach((card) => {
    if (!(card instanceof HTMLButtonElement)) return;

    card.addEventListener('click', () => {
      const image = card.dataset.menuImage;
      const title = card.dataset.menuTitle;
      if (!image || !title) return;

      dialogImage.src = image;
      dialogImage.alt = `Carta ampliada: ${title}`;
      dialogHeading.textContent = title;
      dialog.showModal();
    });
  });

  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => dialogImage.removeAttribute('src'));
}
