/** @param {Record<string, string | undefined>} env */
export function getSiteConfig(env = process.env) {
  const value = env.SITE_URL || env.URL;
  if (!value) return { site: undefined, indexable: false };
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password ||
      url.pathname !== '/' || url.search || url.hash ||
      ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)) {
    throw new Error('SITE_URL must be a public HTTPS origin without a path or credentials.');
  }
  return {
    site: url.origin,
    indexable: !env.CONTEXT || env.CONTEXT === 'production',
  };
}
