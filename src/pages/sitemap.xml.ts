import type { APIRoute } from 'astro';
import { getSiteConfig } from '../config/site.mjs';

export const GET: APIRoute = () => {
  const { site, indexable } = getSiteConfig();
  const location = site?.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const entries = indexable && location ? `<url><loc>${location}/</loc></url>` : '';
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
