import type { ImageMetadata } from 'astro';
import entries from './menu.json';
import raciones from '../assets/menu/raciones.png';
import tostas from '../assets/menu/tostas-y-sandwiches.png';
import ensaladas from '../assets/menu/ensaladas-y-platos.png';
import hamburguesas from '../assets/menu/hamburguesas.png';
import bocadillos from '../assets/menu/bocadillos-y-postres.png';

export interface MenuItem {
  name: string;
  description?: string;
  price: number;
  montadoPrice?: number;
}

export interface MenuPage {
  id: string;
  title: string;
  alt: string;
  groups: { title: string; items: MenuItem[] }[];
  image: ImageMetadata;
}

const images: Record<string, ImageMetadata> = {
  raciones,
  'tostas-y-sandwiches': tostas,
  'ensaladas-y-platos': ensaladas,
  hamburguesas,
  'bocadillos-y-postres': bocadillos,
};

const ids = new Set<string>();
export const menuPages: MenuPage[] = entries.map((entry) => {
  const image = images[entry.id];
  if (!image || ids.has(entry.id) || !entry.title.trim() || !entry.alt.trim() || !entry.groups.length) {
    throw new Error(`Invalid or duplicate menu category: ${entry.id}`);
  }
  ids.add(entry.id);
  for (const group of entry.groups) {
    if (!group.title.trim() || !group.items.length) throw new Error(`Invalid menu group in ${entry.id}`);
    for (const item of group.items as MenuItem[]) {
      if (!item.name || !Number.isInteger(item.price) || item.price < 0 ||
          (item.montadoPrice !== undefined && (!Number.isInteger(item.montadoPrice) || item.montadoPrice < 0))) {
        throw new Error(`Invalid menu item in ${entry.id}`);
      }
    }
  }
  return { ...entry, image };
});

export const formatPrice = (cents: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(cents / 100);
