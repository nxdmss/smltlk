import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const indexPath = path.join(root, 'dist', 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html не найден');
  process.exit(1);
}

let html = fs.readFileSync(indexPath, 'utf8');

const viewport =
  '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />';

if (/<meta[^>]+name=["']viewport["'][^>]*>/i.test(html)) {
  html = html.replace(
    /<meta[^>]+name=["']viewport["'][^>]*>/i,
    viewport,
  );
} else {
  html = html.replace('<head>', `<head>\n${viewport}`);
}

const metaBlock = `
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
`;

if (!/apple-mobile-web-app-capable/i.test(html)) {
  html = html.replace('<head>', `<head>${metaBlock}`);
}

const finalCss = `
<style id="smltlk-iphone-edge-v3">
  :root {
    --smltlk-app-height: 100vh;
  }

  html,
  body,
  #root,
  #root > div {
    box-sizing: border-box !important;
    margin: 0 !important;
    padding: 0 !important;
    border: 0 !important;
    width: 100vw !important;
    max-width: 100vw !important;
    height: var(--smltlk-app-height) !important;
    min-height: var(--smltlk-app-height) !important;
  }

  html,
  body {
    position: fixed !important;
    inset: 0 !important;
    overflow: hidden !important;
    overscroll-behavior: none !important;
    background: #F6F7F5 !important;
  }

  #root,
  #root > div {
    position: fixed !important;
    inset: 0 !important;
    overflow: hidden !important;
  }

  #root > div {
    padding-bottom: 0 !important;
    margin-bottom: 0 !important;
  }

  @supports (padding: env(safe-area-inset-bottom)) {
    html,
    body,
    #root,
    #root > div {
      padding-bottom: 0 !important;
    }
  }
</style>
`;

html = html.replace('</head>', `${finalCss}\n</head>`);

const heightScript = `
<script id="smltlk-iphone-height-v3">
(() => {
  const syncHeight = () => {
    const values = [
      window.innerHeight || 0,
      document.documentElement.clientHeight || 0,
      window.screen?.height || 0,
    ];

    const height = Math.max(...values);

    document.documentElement.style.setProperty(
      '--smltlk-app-height',
      height + 'px'
    );
  };

  syncHeight();

  window.addEventListener('resize', syncHeight, { passive: true });
  window.addEventListener('orientationchange', syncHeight, { passive: true });
  window.addEventListener('pageshow', syncHeight, { passive: true });
})();
</script>
`;

html = html.replace('</body>', `${heightScript}\n</body>`);

fs.writeFileSync(indexPath, html);
console.log('iPhone edge-to-edge v3 applied');
