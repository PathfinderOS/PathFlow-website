import { caseStudies } from './caseStudies.js';
import { resourceArticles } from './resourceArticles.js';

export const siteUrl = 'https://getpathflow.com';
export const defaultOgImage = `${siteUrl}/assets/logo.png`;

export const legacyRouteMap = {
  '/services/crm-systems': '/services/crm-automation',
  '/services/lead-intake': '/services/lead-intake-automation',
  '/services/app-integrations': '/services/workflow-automation',
  '/services/dashboards': '/services/dashboards-reporting',
  '/services/managed-hosting': '/services/managed-automation',
  '/platform/architecture': '/solutions/architecture',
  '/solutions/handoffs': '/platform/handoffs',
};

const caseStudySeo = Object.fromEntries(
  caseStudies.map((caseStudy) => [
    caseStudy.path,
    {
      title: caseStudy.seo.title,
      description: caseStudy.seo.description,
      ogImage: toAbsolutePublicUrl(caseStudy.seo.ogImage || caseStudy.logo?.src),
      schemaImage: toAbsolutePublicUrl(caseStudy.seo.ogImage || caseStudy.logo?.src),
      schemaType: 'Article',
      schemaName: `${caseStudy.company} case study`,
      datePublished: caseStudy.publishedAt,
      dateModified: caseStudy.updatedAt || caseStudy.publishedAt,
      lastmod: caseStudy.updatedAt || caseStudy.publishedAt,
      articleSection: 'Case Studies',
      keywords: caseStudy.tags,
    },
  ]),
);

const resourceArticleSeo = Object.fromEntries(
  resourceArticles
    .filter((article) => article.status === 'published')
    .map((article) => {
      const articleImage = toAbsolutePublicUrl(article.image?.src);
      const modifiedDate = article.updatedAt || article.modifiedAt || article.publishedAt;

      return [
        article.path,
        {
          title: article.seo.title,
          description: article.seo.description,
          ogTitle: article.seo.ogTitle,
          ogImage: toAbsolutePublicUrl(article.seo.ogImage || article.image?.src),
          schemaImage: articleImage,
          schemaType: 'Article',
          schemaName: article.title,
          datePublished: article.publishedAt,
          dateModified: modifiedDate,
          lastmod: modifiedDate,
          articleSection: article.category,
          keywords: [...new Set([...(article.tags || []), ...(article.topics || [])])],
        },
      ];
    }),
);

export const routeSeo = {
  '/': {
    title: 'Pathflow | Business Systems, Automation & Client Infrastructure',
    description:
      'Pathflow builds, connects, documents, and manages the systems behind business operations and client delivery.',
    schemaType: 'Organization',
    schemaName: 'Pathflow',
  },
  '/businesses': {
    title: 'Business Automation & CRM Systems | Pathflow',
    description:
      'Connected systems for service businesses: lead intake, CRM, workflow automation, documents, reporting, websites, and ongoing care.',
    schemaName: 'Business automation and CRM systems',
  },
  '/consultants': {
    title: 'Client System Management & Handoff for Consultants | Pathflow',
    description:
      'Pathflow helps consultants map architecture, document resources, manage client systems, and hand off work without losing context.',
    schemaName: 'Client system management for consultants',
  },
  '/services': {
    title: 'Connected Business System Services | Pathflow',
    description:
      'Explore Pathflow services for CRM automation, lead intake, workflow automation, connected websites, dashboards, and managed infrastructure.',
    schemaType: 'CollectionPage',
    schemaName: 'Pathflow services',
  },
  '/platform': {
    title: 'Pathflow Platform | Architecture, Resources & Handoff',
    description:
      'Pathflow platform keeps architecture, resources, project handoff, and client requests connected to the systems being built and managed.',
    schemaName: 'Pathflow Platform',
  },
  '/solutions/architecture': {
    title: 'Pathflow Architecture | Map Client Systems Clearly',
    description:
      'Map the applications, infrastructure, services and dependencies behind client projects with living architecture diagrams connected to Pathflow.',
    schemaName: 'Pathflow Architecture',
  },
  '/solutions/documents': {
    title: 'Pathflow Documents | Client Document Automation',
    description:
      'Automate client document intake, classification, organization, and routing. Connect Gmail, Google Drive, CRM workflows, or use the Pathflow Documents API from n8n and custom applications.',
    schemaType: 'SoftwareApplication',
    schemaName: 'Pathflow Documents',
  },
  '/platform/mcp': {
    title: 'Pathflow MCP | Project Context for AI Agents',
    description:
      'Give AI agents structured access to Pathflow projects, requests, tasks, resources, architecture, deployment state and client handoffs.',
    schemaName: 'Pathflow MCP',
  },
  '/platform/handoffs': {
    title: 'Pathflow Handoffs | Deliver Client Projects With Context',
    description:
      'Turn completed consulting work into client handoffs that keep architecture, resources, instructions, access context, project history and future requests connected.',
    schemaName: 'Pathflow Handoffs',
  },
  '/resources': {
    title: 'Pathflow Resources | Guides for Client Systems, Automation and Infrastructure',
    description:
      'Practical guides, architecture patterns and field notes for building, delivering and operating client systems across automation, infrastructure, security and DevOps.',
    schemaType: 'CollectionPage',
    schemaName: 'Pathflow Resources',
  },
  ...resourceArticleSeo,
  '/work': {
    title: 'Work & Case Studies | Pathflow',
    description:
      'Selected systems, websites, and client operations delivered through Pathflow.',
  },
  ...caseStudySeo,
  '/services/crm-automation': {
    title: 'CRM & Pipeline Automation | Pathflow',
    description:
      'CRM setup, cleanup, lead routing, pipeline automation, follow-up workflows, and reporting foundations for service businesses.',
    schemaType: 'Service',
    schemaName: 'CRM and pipeline automation',
  },
  '/services/lead-intake-automation': {
    title: 'Lead Intake Automation | Pathflow',
    description:
      'Lead intake systems that connect website forms, validation, routing, CRM records, document requests, reminders, and reporting.',
    schemaType: 'Service',
    schemaName: 'Lead intake automation',
  },
  '/services/workflow-automation': {
    title: 'Workflow Automation & App Integrations | Pathflow',
    description:
      'Workflow automation with APIs, webhooks, n8n, Zapier migration, scheduled jobs, monitoring, and business app integrations.',
    schemaType: 'Service',
    schemaName: 'Workflow automation and app integrations',
  },
  '/services/connected-websites': {
    title: 'Connected Websites | Pathflow',
    description:
      'Business websites and campaign pages connected to CRM, analytics, intake forms, automation, hosting, and reporting.',
    schemaType: 'Service',
    schemaName: 'Connected websites',
  },
  '/services/custom-apps': {
    title: 'Custom Internal Apps & Portals | Pathflow',
    description:
      'Focused internal tools, client portals, admin panels, dashboards, forms, and database-backed apps connected to your business systems.',
    schemaType: 'Service',
    schemaName: 'Custom internal apps and portals',
  },
  '/services/dashboards-reporting': {
    title: 'Dashboards & Reporting | Pathflow',
    description:
      'Operational dashboards for lead sources, CRM pipelines, intake status, workflow health, stuck leads, and system visibility.',
    schemaType: 'Service',
    schemaName: 'Dashboards and reporting',
  },
  '/services/managed-automation': {
    title: 'Managed Automation Infrastructure | Pathflow',
    description:
      'Managed n8n hosting, monitoring, backups, workflow maintenance, secure deployment, and infrastructure care.',
    schemaType: 'Service',
    schemaName: 'Managed automation infrastructure',
  },
  '/services/n8n-automation': {
    title: 'n8n Automation & Managed Hosting | Pathflow',
    description:
      'n8n workflow development, API and webhook automation, Zapier migration, managed hosting, monitoring, backups, and maintenance.',
    schemaType: 'Service',
    schemaName: 'n8n automation and managed hosting',
  },
};

export const indexableRoutes = Object.keys(routeSeo);

export function getSitemapEntries() {
  return indexableRoutes.map((route) => {
    const seo = getSeoForPath(route);

    return {
      route,
      loc: seo.canonicalUrl,
      lastmod: normalizeDate(seo.lastmod || seo.dateModified || seo.datePublished),
    };
  });
}

export function normalizePath(pathname = '/') {
  const normalized = pathname.replace(/\/$/, '') || '/';
  return normalized;
}

export function getPublicUrlForPath(pathname = '/') {
  const normalized = normalizePath(pathname);
  return normalized === '/' ? siteUrl : `${siteUrl}${normalized}/`;
}

export function getCanonicalPath(pathname = '/') {
  const normalized = normalizePath(pathname);
  return legacyRouteMap[normalized] || normalized;
}

export function getSeoForPath(pathname = '/') {
  const normalized = normalizePath(pathname);
  const canonicalPath = getCanonicalPath(normalized);
  const route = routeSeo[canonicalPath] || routeSeo['/'];

  return {
    ...route,
    canonicalPath,
    canonicalUrl: getPublicUrlForPath(canonicalPath),
    ogImage: route.ogImage || defaultOgImage,
    ogType: route.ogType || (route.schemaType === 'Article' ? 'article' : 'website'),
    dateModified: route.dateModified || route.lastmod,
    robots: normalized === canonicalPath ? 'index,follow' : 'noindex,follow',
  };
}

function toAbsolutePublicUrl(src) {
  if (!src) return undefined;
  if (/^https?:\/\//.test(src)) return src;
  return `${siteUrl}${src.startsWith('/') ? src : `/${src}`}`;
}

export function jsonLdForPath(pathname = '/') {
  const seo = getSeoForPath(pathname);
  const segments = seo.canonicalPath.split('/').filter(Boolean);
  const organization = {
    '@type': 'Organization',
    name: 'Pathflow',
    url: siteUrl,
    logo: defaultOgImage,
    email: 'vladimir@getpathflow.com',
  };

  if (seo.schemaType === 'Organization') {
    return [
      {
        '@context': 'https://schema.org',
        ...organization,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Pathflow',
        url: siteUrl,
        publisher: organization,
      },
    ];
  }

  const webPage = {
    '@context': 'https://schema.org',
    '@type': seo.schemaType === 'CollectionPage' ? 'CollectionPage' : 'WebPage',
    name: seo.schemaName || seo.title.replace(' | Pathflow', ''),
    description: seo.description,
    url: seo.canonicalUrl,
    publisher: organization,
  };

  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Pathflow',
      item: siteUrl,
    },
  ];

  const [group, slug] = segments;
  if (group) {
    const parent = breadcrumbParentForGroup(group);
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: parent.name,
      item: getPublicUrlForPath(parent.path),
    });
  }

  if (segments.length > 1 || seo.schemaType === 'Service') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: breadcrumbItems.length + 1,
      name: seo.schemaName || titleCase(slug || seo.title.split('|')[0]),
      item: seo.canonicalUrl,
    });
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  };

  if (seo.schemaType === 'Article') {
    const article = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: seo.schemaName || seo.title.replace(' | Pathflow', ''),
      description: seo.description,
      url: seo.canonicalUrl,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': seo.canonicalUrl,
      },
      publisher: organization,
      ...(seo.schemaImage ? { image: seo.schemaImage } : {}),
      ...(seo.datePublished ? { datePublished: seo.datePublished } : {}),
      ...(seo.dateModified ? { dateModified: seo.dateModified } : {}),
      ...(seo.articleSection ? { articleSection: seo.articleSection } : {}),
      ...(seo.keywords?.length ? { keywords: seo.keywords.join(', ') } : {}),
    };

    return [article, breadcrumb];
  }

  if (seo.schemaType === 'SoftwareApplication') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: seo.schemaName || seo.title.replace(' | Pathflow', ''),
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: seo.description,
        url: seo.canonicalUrl,
        publisher: organization,
      },
      breadcrumb,
    ];
  }

  if (seo.schemaType !== 'Service') {
    return segments.length > 1 ? [webPage, breadcrumb] : webPage;
  }

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: seo.schemaName,
      description: seo.description,
      url: seo.canonicalUrl,
      provider: organization,
    },
    breadcrumb,
  ];
}

function normalizeDate(value) {
  if (!value) return undefined;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  return value;
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
    name: group === 'services' ? 'Services' : titleCase(group),
    path: `/${group}`,
  };
}
