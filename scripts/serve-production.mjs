import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const rules = [];
let rule;
for (const line of (await readFile(path.join(root, '_headers'), 'utf8')).split(/\r?\n/)) {
  if (line.startsWith('/')) { rule = { pattern: line.trim(), headers: {} }; rules.push(rule); }
  const match = line.match(/^\s+([^:]+):\s*(.*)$/);
  if (match && rule) rule.headers[match[1]] = match[2];
}
const responseHeaders = (pathname) => Object.assign({}, ...rules.filter(rule =>
  rule.pattern.endsWith('*') ? pathname.startsWith(rule.pattern.slice(0, -1)) : pathname === rule.pattern
).map(rule => rule.headers));
const contentTypes = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp',
  '.png': 'image/png', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
};

http.createServer(async (request, response) => {
  const headers = responseHeaders(new URL(request.url, 'http://localhost').pathname);
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { ...headers, Allow: 'GET, HEAD' }).end();
    return;
  }
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    const relative = path.relative(root, file);
    if (relative.startsWith('..') || path.isAbsolute(relative)) {
      response.writeHead(403, headers).end();
      return;
    }
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
    const data = await readFile(file);
    response.writeHead(200, {
      ...headers, 'Content-Type': contentTypes[path.extname(file)] || 'application/octet-stream',
      'Content-Length': data.length,
    });
    response.end(request.method === 'HEAD' ? undefined : data);
  } catch {
    response.writeHead(404, { ...headers, 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found');
  }
}).listen(Number(process.env.PORT || 4323), '127.0.0.1', () => {
  console.log(`Production preview with security headers: http://127.0.0.1:${process.env.PORT || 4323}`);
});
