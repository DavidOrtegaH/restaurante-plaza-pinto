const dialog = document.querySelector<HTMLDialogElement>('.menu-dialog');
const dialogImage = document.querySelector<HTMLImageElement>('[data-dialog-image]');
const dialogHeading = document.querySelector<HTMLElement>('[data-dialog-heading]');
const closeButton = document.querySelector<HTMLButtonElement>('.menu-dialog__close');

if (dialog && dialogImage && dialogHeading && closeButton) {
  document.querySelectorAll<HTMLButtonElement>('[data-menu-image]').forEach((card) => {
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

  dialog.addEventListener('close', () => {
    dialogImage.removeAttribute('src');
  });
}
