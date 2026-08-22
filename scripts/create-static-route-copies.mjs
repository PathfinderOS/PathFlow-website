import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  getSeoForPath,
  indexableRoutes,
  jsonLdForPath,
  legacyRouteMap,
  siteUrl,
} from '../src/seo.js';

const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');
const baseHtml = await readFile(indexPath, 'utf8');
const legacyRoutes = Object.keys(legacyRouteMap);
const staticRoutes = [...new Set([...indexableRoutes, ...legacyRoutes])];

await writeFile(indexPath, htmlForRoute('/'));
await copyFile(indexPath, path.join(distDir, '404.html'));

await Promise.all(
  staticRoutes
    .filter((route) => route !== '/')
    .map(async (route) => {
      const routeDir = path.join(distDir, route.replace(/^\/+/, ''));
      await mkdir(routeDir, { recursive: true });
      await writeFile(path.join(routeDir, 'index.html'), htmlForRoute(route));
    }),
);

await writeFile(path.join(distDir, 'sitemap.xml'), buildSitemap());
await writeFile(path.join(distDir, 'robots.txt'), buildRobots());

function htmlForRoute(route) {
  const seo = getSeoForPath(route);
  const robots = legacyRoutes.includes(route) ? 'noindex,follow' : seo.robots;
  const jsonLd = JSON.stringify(jsonLdForPath(route));

  return baseHtml
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(seo.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/s,
      `<meta name="description" content="${escapeAttribute(seo.description)}" />`,
    )
    .replace(
      /<meta\s+name="robots"\s+content=".*?"\s*\/?>/s,
      `<meta name="robots" content="${escapeAttribute(robots)}" />`,
    )
    .replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/s,
      `<meta property="og:title" content="${escapeAttribute(seo.ogTitle || seo.title)}" />`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/s,
      `<meta property="og:description" content="${escapeAttribute(seo.description)}" />`,
    )
    .replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/s,
      `<meta property="og:url" content="${escapeAttribute(seo.canonicalUrl)}" />`,
    )
    .replace(
      /<meta\s+property="og:image"\s+content=".*?"\s*\/?>/s,
      `<meta property="og:image" content="${escapeAttribute(seo.ogImage)}" />`,
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/s,
      `<meta name="twitter:title" content="${escapeAttribute(seo.title)}" />`,
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/s,
      `<meta name="twitter:description" content="${escapeAttribute(seo.description)}" />`,
    )
    .replace(
      /<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/s,
      `<meta name="twitter:image" content="${escapeAttribute(seo.ogImage)}" />`,
    )
    .replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/s,
      `<link rel="canonical" href="${escapeAttribute(seo.canonicalUrl)}" />`,
    )
    .replace(
      '</head>',
      `    <script id="pathflow-json-ld" type="application/ld+json">${escapeScriptJson(jsonLd)}</script>\n  </head>`,
    );
}

function buildSitemap() {
  const urls = indexableRoutes
    .map((route) => {
      const loc = route === '/' ? siteUrl : `${siteUrl}${route}`;
      return `  <url>\n    <loc>${escapeHtml(loc)}</loc>\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function buildRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('"', '&quot;');
}

function escapeScriptJson(value) {
  return value.replaceAll('</script', '<\\/script');
}
