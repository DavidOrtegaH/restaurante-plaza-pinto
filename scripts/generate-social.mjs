import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

// Export our local vector artwork; never rasterize untrusted SVG uploads.
await sharp(fileURLToPath(new URL('../src/assets/social-preview.svg', import.meta.url)))
  .png()
  .toFile(fileURLToPath(new URL('../src/assets/social-preview.png', import.meta.url)));
