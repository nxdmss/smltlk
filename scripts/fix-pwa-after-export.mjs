import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const pub = path.join(root, 'public');

if (!fs.existsSync(dist)) {
  console.error('dist/ не найден после expo export');
  process.exit(1);
}

for (const file of [
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'icon-1024.png',
  'manifest.json',
]) {
  fs.copyFileSync(path.join(pub, file), path.join(dist, file));
}

const indexPath = path.join(dist, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html не найден');
  process.exit(1);
}

let html = fs.readFileSync(indexPath, 'utf8');

html = html
  .replace(/\s*<link[^>]+rel=["']apple-touch-icon["'][^>]*>\s*/gi, '\n')
  .replace(/\s*<link[^>]+rel=["']icon["'][^>]*>\s*/gi, '\n')
  .replace(/\s*<link[^>]+rel=["']manifest["'][^>]*>\s*/gi, '\n')
  .replace(/\s*<meta[^>]+name=["']theme-color["'][^>]*>\s*/gi, '\n');

const tags = `
  <link rel="manifest" href="/manifest.json?v=8" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=8" />
  <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png?v=8" />
  <meta name="theme-color" content="#FFFFFF" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  <meta name="apple-mobile-web-app-title" content="SMALL TALK" />
`;

html = html.replace('</head>', tags + '\n</head>');
fs.writeFileSync(indexPath, html);

console.log('PWA icon v8: white background + exact orange Small Talk mark');
