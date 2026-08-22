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
      schemaType: 'Article',
      schemaName: `${caseStudy.company} case study`,
      datePublished: caseStudy.publishedAt,
    },
  ]),
);

const resourceArticleSeo = Object.fromEntries(
  resourceArticles.map((article) => [
    article.path,
    {
      title: article.seo.title,
      description: article.seo.description,
      ogTitle: article.seo.ogTitle,
      schemaType: 'Article',
      schemaName: article.title,
      datePublished: article.publishedAt,
    },
  ]),
);

export const routeSeo = {
  '/': {
    title: 'Pathflow | Business Systems, Automation & Client Infrastructure',
    description:
      'Pathflow builds, connects, documents, and manages the systems behind business operations and client delivery.',
    schemaType: 'Organization',
  },
  '/businesses': {
    title: 'Business Automation & CRM Systems | Pathflow',
    description:
      'Connected systems for service businesses: lead intake, CRM, workflow automation, documents, reporting, websites, and ongoing care.',
  },
  '/consultants': {
    title: 'Client System Management & Handoff for Consultants | Pathflow',
    description:
      'Pathflow helps consultants map architecture, document resources, manage client systems, and hand off work without losing context.',
  },
  '/services': {
    title: 'Connected Business System Services | Pathflow',
    description:
      'Explore Pathflow services for CRM automation, lead intake, workflow automation, connected websites, dashboards, and managed infrastructure.',
  },
  '/platform': {
    title: 'Pathflow Platform | Architecture, Resources & Handoff',
    description:
      'Pathflow platform keeps architecture, resources, project handoff, and client requests connected to the systems being built and managed.',
  },
  '/solutions/architecture': {
    title: 'Pathflow Architecture | Map Client Systems Clearly',
    description:
      'Map the applications, infrastructure, services and dependencies behind client projects with living architecture diagrams connected to Pathflow.',
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

export function normalizePath(pathname = '/') {
  const normalized = pathname.replace(/\/$/, '') || '/';
  return normalized;
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
    canonicalUrl: `${siteUrl}${canonicalPath === '/' ? '' : canonicalPath}`,
    ogImage: route.ogImage || defaultOgImage,
    robots: normalized === canonicalPath ? 'index,follow' : 'noindex,follow',
  };
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
    return {
      '@context': 'https://schema.org',
      ...organization,
    };
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
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: group === 'services' ? 'Services' : titleCase(group),
      item: `${siteUrl}/${group}`,
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
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: seo.schemaName || seo.title.replace(' | Pathflow', ''),
        description: seo.description,
        url: seo.canonicalUrl,
        publisher: organization,
        author: organization,
        ...(seo.datePublished ? { datePublished: seo.datePublished } : {}),
      },
      breadcrumb,
    ];
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

function titleCase(value = '') {
  return value
    .replace(/[-/]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
