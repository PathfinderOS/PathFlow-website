import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  getSeoForPath,
  getSitemapEntries,
  indexableRoutes,
  jsonLdForPath,
  legacyRouteMap,
  siteUrl,
} from '../src/seo.js';
import { caseStudies } from '../src/caseStudies.js';
import { publishedResourceArticles, resourceTopicItems } from '../src/resourceArticles.js';

const primaryFallbackLinks = [
  ['Home', '/'],
  ['Businesses', '/businesses'],
  ['Consultants', '/consultants'],
  ['Services', '/services'],
  ['Products', '/products'],
  ['Platform', '/platform'],
  ['Architecture', '/solutions/architecture'],
  ['Documents', '/solutions/documents'],
  ['MCP', '/platform/mcp'],
  ['Handoffs', '/platform/handoffs'],
  ['Resources', '/resources'],
  ['Work', '/work'],
];

const serviceFallbackLinks = [
  ['CRM & Pipeline Automation', '/services/crm-automation'],
  ['Lead Intake Automation', '/services/lead-intake-automation'],
  ['Workflow Automation', '/services/workflow-automation'],
  ['Connected Websites', '/services/connected-websites'],
  ['Custom Internal Apps & Portals', '/services/custom-apps'],
  ['Dashboards & Reporting', '/services/dashboards-reporting'],
  ['Managed Automation Infrastructure', '/services/managed-automation'],
  ['n8n Automation & Managed Hosting', '/services/n8n-automation'],
];

const routeFallbackLinks = {
  '/': [
    ['HighLevel Project Management and client delivery', '/resources/highlevel-project-management-crm-client-delivery'],
    ['Automation consultant handoff documentation', '/resources/automation-consultant-handoff-documentation'],
    ['Farm Financing Ontario case study', '/work/farm-financing-ontario'],
  ],
  '/businesses': [
    ['Lead intake automation', '/services/lead-intake-automation'],
    ['CRM automation', '/services/crm-automation'],
    ['Connected websites', '/services/connected-websites'],
    ['Resources', '/resources'],
  ],
  '/consultants': [
    ['Pathflow Architecture', '/solutions/architecture'],
    ['Pathflow Handoffs', '/platform/handoffs'],
    ['Automation handoff documentation', '/resources/automation-consultant-handoff-documentation'],
    ['Resources', '/resources'],
  ],
  '/platform': [
    ['All Pathflow products', '/products'],
    ['Pathflow Architecture', '/solutions/architecture'],
    ['Pathflow Documents', '/solutions/documents'],
    ['Pathflow Handoffs', '/platform/handoffs'],
    ['Pathflow MCP', '/platform/mcp'],
  ],
  '/products': [
    ['Pathflow Architecture', '/solutions/architecture'],
    ['Pathflow Documents', '/solutions/documents'],
    ['Pathflow MCP', '/platform/mcp'],
    ['Pathflow Handoffs', '/platform/handoffs'],
  ],
  '/solutions/architecture': [
    ['Automation consultant handoff documentation', '/resources/automation-consultant-handoff-documentation'],
    ['GitHub self-hosted runner brownouts', '/resources/github-self-hosted-runner-brownouts-2026'],
    ['Pathflow Handoffs', '/platform/handoffs'],
  ],
  '/solutions/documents': [
    ['Lead intake automation', '/services/lead-intake-automation'],
    ['Workflow automation', '/services/workflow-automation'],
    ['Pathflow MCP', '/platform/mcp'],
  ],
  '/platform/mcp': [
    ['Pathflow Architecture', '/solutions/architecture'],
    ['Pathflow Handoffs', '/platform/handoffs'],
    ['Farm Financing Ontario case study', '/work/farm-financing-ontario'],
  ],
  '/platform/handoffs': [
    ['Automation consultant handoff documentation', '/resources/automation-consultant-handoff-documentation'],
    ['Pathflow Architecture', '/solutions/architecture'],
    ['Farm Financing Ontario case study', '/work/farm-financing-ontario'],
  ],
};

const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');
const baseHtml = await readFile(indexPath, 'utf8');
const legacyRoutes = Object.keys(legacyRouteMap);
const staticRoutes = [...new Set([...indexableRoutes, ...legacyRoutes])];

await writeFile(indexPath, htmlForRoute('/'));
await writeFile(path.join(distDir, '404.html'), htmlForNotFound());

await Promise.all(
  staticRoutes
    .filter((route) => route !== '/')
    .map(async (route) => {
      const routeDir = path.join(distDir, route.replace(/^\/+/, ''));
      await mkdir(routeDir, { recursive: true });
      const html = legacyRoutes.includes(route) ? htmlForLegacyRoute(route) : htmlForRoute(route);
      await writeFile(path.join(routeDir, 'index.html'), html);
    }),
);

await writeFile(path.join(distDir, 'sitemap.xml'), buildSitemap());
await writeFile(path.join(distDir, 'feed.xml'), buildResourceFeed());
await writeFile(path.join(distDir, 'robots.txt'), buildRobots());

function htmlForRoute(route) {
  const seo = getSeoForPath(route);
  const jsonLd = JSON.stringify(jsonLdForPath(route));

  return baseHtml
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(seo.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/s,
      `<meta name="description" content="${escapeAttribute(seo.description)}" />`,
    )
    .replace(
      /<meta\s+name="robots"\s+content=".*?"\s*\/?>/s,
      `<meta name="robots" content="${escapeAttribute(seo.robots)}" />`,
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
      /<meta\s+property="og:type"\s+content=".*?"\s*\/?>/s,
      `<meta property="og:type" content="${escapeAttribute(seo.ogType)}" />`,
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
      '<div id="root"></div>',
      `<div id="root"></div>\n    ${staticFallbackForRoute(route)}`,
    )
    .replace(
      '</head>',
      `    <script id="pathflow-json-ld" type="application/ld+json">${escapeScriptJson(jsonLd)}</script>\n  </head>`,
    );
}

function htmlForLegacyRoute(route) {
  const seo = getSeoForPath(route);
  const title = `Redirecting to ${seo.title}`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex,follow" />
    <meta http-equiv="refresh" content="0; url=${escapeAttribute(seo.canonicalUrl)}" />
    <link rel="canonical" href="${escapeAttribute(seo.canonicalUrl)}" />
    <title>${escapeHtml(title)}</title>
    <script>window.location.replace(${JSON.stringify(seo.canonicalUrl)});</script>
  </head>
  <body>
    <p>This page has moved to <a href="${escapeAttribute(seo.canonicalUrl)}">${escapeHtml(seo.canonicalUrl)}</a>.</p>
  </body>
</html>
`;
}

function htmlForNotFound() {
  const title = 'Page Not Found | Pathflow';
  const description = 'The requested Pathflow page could not be found.';

  return baseHtml
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/s,
      `<meta name="description" content="${escapeAttribute(description)}" />`,
    )
    .replace(
      /<meta\s+name="robots"\s+content=".*?"\s*\/?>/s,
      '<meta name="robots" content="noindex,follow" />',
    )
    .replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/s,
      `<meta property="og:title" content="${escapeAttribute(title)}" />`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/s,
      `<meta property="og:description" content="${escapeAttribute(description)}" />`,
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/s,
      `<meta name="twitter:title" content="${escapeAttribute(title)}" />`,
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/s,
      `<meta name="twitter:description" content="${escapeAttribute(description)}" />`,
    );
}

function staticFallbackForRoute(route) {
  const seo = getSeoForPath(route);
  const canonicalPath = seo.canonicalPath;
  const article = publishedResourceArticles.find((item) => item.path === canonicalPath);
  const resourceTopic = resourceTopicItems.find((item) => item.path === canonicalPath);
  const caseStudy = caseStudies.find((item) => item.path === canonicalPath);
  const heading = article?.title || resourceTopic?.label || caseStudy?.title || seo.schemaName || seo.title.replace(' | Pathflow', '');
  const description = article?.description || resourceTopic?.description || caseStudy?.description || seo.description;
  const nav = renderStaticNav();
  let body = '';

  if (canonicalPath === '/resources') {
    body = renderResourceIndexFallback();
  } else if (article) {
    body = renderResourceArticleFallback(article);
  } else if (resourceTopic) {
    body = renderResourceTopicFallback(resourceTopic);
  } else if (canonicalPath === '/work') {
    body = renderWorkIndexFallback();
  } else if (caseStudy) {
    body = renderCaseStudyFallback(caseStudy);
  } else if (canonicalPath === '/services') {
    body = renderRouteLinkList('Services', serviceFallbackLinks);
  } else {
    body = renderRouteLinkList('Related Pathflow pages', fallbackLinksForRoute(canonicalPath));
  }

  return `<noscript>
      <main class="static-fallback" aria-label="Static page summary">
        ${nav}
        <article>
          <header>
            ${renderBreadcrumb(canonicalPath, heading)}
            <h1>${escapeHtml(heading)}</h1>
            <p>${escapeHtml(description)}</p>
          </header>
          ${body}
        </article>
      </main>
    </noscript>`;
}

function renderStaticNav() {
  return `<nav aria-label="Static site navigation"><ul>${primaryFallbackLinks
    .map(([label, href]) => `<li><a href="${escapeAttribute(publicPath(href))}">${escapeHtml(label)}</a></li>`)
    .join('')}</ul></nav>`;
}

function renderBreadcrumb(route, currentLabel) {
  const segments = route.split('/').filter(Boolean);
  const items = [
    `<li><a href="/">Pathflow</a></li>`,
  ];

  if (segments[0]) {
    const parent = breadcrumbParentForGroup(segments[0]);
    items.push(`<li><a href="${escapeAttribute(publicPath(parent.path))}">${escapeHtml(parent.name)}</a></li>`);
  }

  if (segments.length > 1) {
    items.push(`<li>${escapeHtml(currentLabel)}</li>`);
  }

  return `<nav aria-label="Breadcrumb"><ol>${items.join('')}</ol></nav>`;
}

function renderResourceIndexFallback() {
  return `<section>
    <h2>All published resources</h2>
    <ul>${publishedResourceArticles.map(renderResourceListItem).join('')}</ul>
    <h2>Resource topics</h2>
    <ul>${resourceTopicItems.map((topic) => `<li><a href="${escapeAttribute(publicPath(topic.path))}">${escapeHtml(topic.label)}</a> (${escapeHtml(topic.count)})</li>`).join('')}</ul>
  </section>`;
}

function renderResourceTopicFallback(topic) {
  return `<section>
    <h2>${escapeHtml(topic.label)} resources</h2>
    <p>${escapeHtml(topic.description)}</p>
    <ul>${topic.items.map(renderResourceListItem).join('')}</ul>
  </section>`;
}

function renderResourceArticleFallback(article) {
  const sections = article.sections
    .filter((section) => section.type !== 'sources')
    .map(renderContentSection)
    .join('');
  const sources = article.sources?.length
    ? `<section><h2>Sources</h2><ul>${article.sources.map((source) => `<li><a href="${escapeAttribute(source.href)}">${escapeHtml(source.label)}</a></li>`).join('')}</ul></section>`
    : '';

  return `<p>${escapeHtml(article.dek || '')}</p>
    <p>Published ${escapeHtml(article.publishedAt)}${article.updatedAt ? `; updated ${escapeHtml(article.updatedAt)}` : ''}</p>
    <ul>${(article.tags || []).map((tag) => `<li>${escapeHtml(tag)}</li>`).join('')}</ul>
    ${sections}
    ${sources}`;
}

function renderWorkIndexFallback() {
  return `<section>
    <h2>Published case studies</h2>
    <ul>${caseStudies.map((caseStudy) => `<li><a href="${escapeAttribute(publicPath(caseStudy.path))}">${escapeHtml(caseStudy.company)}</a><p>${escapeHtml(caseStudy.description)}</p></li>`).join('')}</ul>
  </section>`;
}

function renderCaseStudyFallback(caseStudy) {
  const sections = caseStudy.sections.map(renderContentSection).join('');
  return `<p>${escapeHtml(caseStudy.description)}</p>${sections}`;
}

function renderContentSection(section) {
  const title = section.title ? `<h2>${escapeHtml(section.title)}</h2>` : '';
  const paragraphs = [
    ...(section.paragraphs || []),
    ...(section.paragraphsAfter || []),
  ]
    .flat()
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join('');
  const list = section.list?.length
    ? `<ul>${section.list.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
    : '';
  const items = section.items?.length
    ? `<ul>${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
    : '';
  const questions = section.questions?.length
    ? `<ul>${section.questions.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
    : '';
  const relatedLinks = [...(section.relatedLinks || []), section.relatedLink].filter(Boolean);
  const links = relatedLinks.length
    ? `<ul>${relatedLinks.map((link) => `<li><a href="${escapeAttribute(publicPath(link.href))}">${escapeHtml(link.label)}</a></li>`).join('')}</ul>`
    : '';
  const ctaAvailable = section.cta?.href && section.cta.available !== false;
  const cta = section.cta
    ? ctaAvailable
      ? `<p><a href="${escapeAttribute(publicPath(section.cta.href))}">${escapeHtml(section.cta.label)}</a></p>`
      : `<p>${escapeHtml(section.cta.label)}: ${escapeHtml(section.cta.status || section.cta.description || 'Not public yet')}</p>`
    : '';

  return `<section>${title}${paragraphs}${questions}${list}${items}${links}${cta}</section>`;
}

function renderRouteLinkList(title, links = []) {
  if (!links.length) return '';
  return `<section><h2>${escapeHtml(title)}</h2><ul>${links
    .map(([label, href]) => `<li><a href="${escapeAttribute(publicPath(href))}">${escapeHtml(label)}</a></li>`)
    .join('')}</ul></section>`;
}

function fallbackLinksForRoute(route) {
  if (routeFallbackLinks[route]) return routeFallbackLinks[route];
  if (route.startsWith('/services/')) {
    return [
      ['All services', '/services'],
      ['Resources', '/resources'],
      ['Automation consultant handoff documentation', '/resources/automation-consultant-handoff-documentation'],
    ];
  }
  return [
    ['Resources', '/resources'],
    ['Services', '/services'],
    ['Work', '/work'],
  ];
}

function renderResourceListItem(article) {
  return `<li>
    <a href="${escapeAttribute(publicPath(article.path))}">${escapeHtml(article.title)}</a>
    <p>${escapeHtml(article.description)}</p>
    <p>${escapeHtml(article.category)} · ${escapeHtml(article.publishedAt)}</p>
  </li>`;
}

function publicPath(route) {
  if (!route || /^https?:\/\//.test(route) || route.startsWith('mailto:')) return route || '/';
  const normalized = route.replace(/\/$/, '') || '/';
  return normalized === '/' ? '/' : `${normalized}/`;
}

function buildSitemap() {
  const urls = getSitemapEntries()
    .map((entry) => {
      const lastmod = entry.lastmod ? `\n    <lastmod>${escapeHtml(entry.lastmod)}</lastmod>` : '';
      return `  <url>\n    <loc>${escapeHtml(entry.loc)}</loc>${lastmod}\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function buildResourceFeed() {
  const articles = publishedResourceArticles.slice(0, 25);
  const lastBuildDate = new Date(
    Math.max(
      ...articles.map((article) => new Date(`${article.updatedAt || article.modifiedAt || article.publishedAt}T00:00:00Z`).getTime()),
    ),
  ).toUTCString();
  const items = articles
    .map((article) => {
      const url = `${siteUrl}${publicPath(article.path)}`;
      const pubDate = new Date(`${article.publishedAt}T00:00:00Z`).toUTCString();
      const categories = [...new Set([article.category, ...(article.topics || []), ...(article.tags || [])])]
        .filter(Boolean)
        .map((category) => `<category>${escapeHtml(category)}</category>`)
        .join('');

      return `    <item>
      <title>${escapeHtml(article.title)}</title>
      <link>${escapeHtml(url)}</link>
      <guid isPermaLink="true">${escapeHtml(url)}</guid>
      <description>${escapeHtml(article.description || article.dek || '')}</description>
      <pubDate>${escapeHtml(pubDate)}</pubDate>
      ${categories}
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Pathflow Resources</title>
    <link>${siteUrl}/resources/</link>
    <description>Guides and field notes for connected systems, automation, infrastructure, and client delivery.</description>
    <language>en</language>
    <lastBuildDate>${escapeHtml(lastBuildDate)}</lastBuildDate>
${items}
  </channel>
</rss>
`;
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

function titleCase(value = '') {
  return value
    .replace(/[-/]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function breadcrumbParentForGroup(group) {
  if (group === 'solutions') {
    return { name: 'Platform', path: '/platform' };
  }

  return {
    name: titleCase(group),
    path: `/${group}`,
  };
}
