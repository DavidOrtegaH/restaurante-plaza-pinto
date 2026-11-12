import type { APIRoute } from 'astro';
import { getSiteConfig } from '../config/site.mjs';

export const GET: APIRoute = () => {
  const { site, indexable } = getSiteConfig();
  const body = indexable && site
    ? `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
