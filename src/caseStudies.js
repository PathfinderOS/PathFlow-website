export const caseStudies = [
  {
    slug: 'farm-financing-ontario',
    path: '/work/farm-financing-ontario',
    company: 'Farm Financing Ontario',
    eyebrow: 'Work / Farm Financing Ontario',
    title: 'A farm financing website built as a complete operating path',
    description:
      'How Farm Financing Ontario went from public brand presence to secure lead intake, CRM delivery, deployment, SEO foundations, and maintainable ongoing content.',
    navDescription:
      'Website, lead intake, CRM integration, deployment, SEO, and ongoing maintenance.',
    indexDescription:
      'A public farm financing site connected to secure intake, CRM delivery, GitHub Pages deployment, DNS, SEO content, and Pathflow-maintained updates.',
    tags: ['Website', 'Lead intake', 'CRM integration', 'Deployment', 'SEO', 'Pathflow MCP'],
    logo: {
      src: '/farmfinancingontario.png',
      alt: 'Farm Financing Ontario logo',
    },
    seo: {
      title: 'Farm Financing Ontario Case Study | Pathflow',
      description:
        'See how Pathflow delivered the Farm Financing Ontario website, secured lead intake, CRM integration, deployment, SEO foundations, and ongoing maintenance workflow.',
    },
    media: {
      website: {
        src: '/work/farm-financing-ontario/website.png',
        alt: 'Farm Financing Ontario public website homepage',
        caption:
          'The public website presents the Farm Financing Ontario brand, rural financing services, and a direct path into lead intake.',
        layout: 'wide',
        aspectRatio: '1121 / 835',
      },
      intake: {
        src: '/work/farm-financing-ontario/cf-worker.png',
        alt: 'Farm Financing Ontario lead intake form connected to a protected Worker endpoint',
        caption:
          'The financing review form posts to a dedicated Cloudflare Worker so validation, observability, and CRM forwarding stay outside browser code.',
        layout: 'wide',
        aspectRatio: '1185 / 575',
      },
      deployment: {
        src: '/work/farm-financing-ontario/deployment.png',
        alt: 'Farm Financing Ontario GitHub Pages deployment workflow',
        caption:
          'The site deploys through GitHub Actions with separate build and GitHub Pages deploy jobs, giving updates a repeatable path to production.',
        layout: 'wide',
        aspectRatio: '1457 / 743',
      },
      content: {
        embedSrc: 'https://architecture.getpathflow.com/share/5797d45a0fa5d76d523ce5ebc485b9423164d98bf71722a6?embed=1&focus=top&controls=0&fitPadding=0.06&maxZoom=1.75',
        alt: 'Pathflow Architecture share view for the Farm Financing Ontario website, intake, CRM, deployment, and infrastructure context',
        caption:
          'The project architecture is publicly shareable, so the client and consultant can inspect how the website, intake layer, CRM, domain, and deployment pieces fit together.',
        layout: 'standard',
        aspectRatio: '1 / 1',
      },
      maintenance: {
        src: '/work/farm-financing-ontario/pf_maintenance.png',
        alt: 'Pathflow project overview for Farm Financing Ontario showing resources, deployments, requests, handoff, health, and activity',
        caption:
          'Pathflow keeps the client project context together: resources like GoDaddy, Cloudflare, and GitHub, plus deployments, requests, handoff status, project health, and recent activity.',
        layout: 'wide',
        aspectRatio: '1457 / 743',
        objectPosition: 'top center',
      },
    },
    sections: [
      {
        id: 'intro',
        type: 'intro',
        paragraphs: [
          'Farm Financing Ontario needed more than a brochure page.',
          'The project had to introduce a rural and farm mortgage financing brand, explain the service categories clearly, collect usable financing review leads, protect the CRM endpoint, launch on the client domain, and create enough search infrastructure to support ongoing article publishing.',
          'Pathflow delivered the public website and the operational path behind it: React and TypeScript frontend, secure Cloudflare Worker intake, Turnstile verification, CRM webhook delivery, GitHub Pages deployment, domain configuration, robots and sitemap assets, blog structure, and ongoing SEO maintenance.',
          'The later Pathflow MCP oneshot prompt is part of the story, but it is not the whole story. It is the finishing layer that makes the launched site easier to maintain after the real build exists.',
        ],
      },
      {
        id: 'project',
        type: 'project-context',
        eyebrow: 'The project',
        title: 'The site had to be a business system, not just a page.',
        paragraphs: [
          'The repository shows a focused Vite, React, TypeScript, and Tailwind website for a farm and rural mortgage financing brand.',
          'The public experience includes brand positioning, service explanations, a how-it-works flow, latest articles, brokerage attribution, contact details, and a financing review form.',
          'Behind that form is the important part: the frontend posts to a configured Worker URL, not directly to the CRM. The Worker validates the request, checks Cloudflare Turnstile, applies origin and field controls, and forwards accepted leads to Cashly CRM through a private webhook secret.',
          'The launch path is also part of the work. The repo includes a GitHub Actions workflow that builds the Vite app and deploys the dist output to GitHub Pages, plus a CNAME for farmfinancingontario.ca and SEO assets in the public folder.',
        ],
        questions: [
          'Brand and service positioning',
          'Lead form fields and consent',
          'Turnstile and Worker validation',
          'Cashly CRM webhook delivery',
          'GitHub Pages deployment',
          'Domain, sitemap, and SEO content',
        ],
        closing: [
          'Those decisions are the work.',
          'The visible website is the part visitors see. The connected path behind it is what makes it useful.',
        ],
      },
      {
        id: 'request',
        type: 'request',
        eyebrow: 'The build',
        title: 'The first deliverable was a complete public website.',
        paragraphs: [
          'Farm Financing Ontario needed a site that felt specific to farm, land, acreage, construction, refinancing, and private lending conversations in Ontario.',
          'The homepage was structured around practical buyer questions: what kind of property is involved, what kind of financing is needed, how the review works, and how to request a follow-up.',
          'The build used a static frontend so the public site could stay fast and durable while more sensitive lead delivery logic lived outside the browser.',
        ],
        request: {
          label: 'Delivered',
          text: 'Website, lead intake, CRM integration, deployment, and ongoing SEO for Farm Financing Ontario.',
        },
        media: 'website',
      },
      {
        id: 'usual-way',
        type: 'manual-workflow',
        eyebrow: 'The connected path',
        title: 'The work crossed copy, code, infrastructure, and operations.',
        steps: [
          'Brand positioning',
          'React website',
          'Lead form',
          'Turnstile',
          'Cloudflare Worker',
          'Cashly CRM',
          'GitHub Pages',
          'Custom domain',
          'SEO content',
          'Pathflow maintenance',
        ],
      },
      {
        id: 'context',
        type: 'context-graph',
        eyebrow: 'Architecture',
        title: 'The project map made the system inspectable.',
        paragraphs: [
          'The project architecture was captured as a shareable Pathflow map instead of staying in memory or scattered notes.',
          'That map connects the website, lead intake layer, Cloudflare, Cashly CRM, deployment, domain, and surrounding project resources so future changes start from the same picture.',
          'It gives the client and consultant a common reference point before maintenance requests, handoffs, or follow-up implementation work.',
        ],
        media: 'content',
      },
      {
        id: 'execution',
        type: 'execution',
        eyebrow: 'Implementation',
        title: 'The site shipped with the pieces needed to operate.',
        intro: 'The delivery connected the visitor-facing experience to the operational handoff behind it:',
        actions: [
          'create a responsive Vite, React, TypeScript, and Tailwind frontend',
          'write service copy for farm purchases, rural refinancing, private lending, land, and construction financing',
          'build a financing review form with useful lead fields and consent',
          'secure form submission through Cloudflare Turnstile and a Worker relay',
          'route accepted submissions into Cashly CRM through a private webhook',
          'configure GitHub Pages deployment, custom domain support, and required production variables',
        ],
        quoteLead: 'The useful part was not any single tool.',
        quote:
          'The useful part was the complete path: clear public positioning, clean lead capture, protected delivery, and a deployment process that could be repeated.',
        media: 'intake',
      },
      {
        id: 'result',
        type: 'result',
        eyebrow: 'Result',
        title: 'The live site became a maintained client asset.',
        paragraphs: [
          'The repository is set up to deploy through GitHub Actions whenever changes are pushed to main. The workflow installs dependencies, builds the app with the production Worker and Turnstile variables, uploads the static artifact, and deploys it to GitHub Pages.',
          'The custom domain farmfinancingontario.ca is configured through GitHub Pages, with HTTPS enforced and a public CNAME in the repo.',
          'The site also includes crawl foundations: robots.txt, sitemap.xml, canonical page metadata, Open Graph and Twitter metadata, article metadata, and JSON-LD support.',
        ],
        media: 'deployment',
      },
      {
        id: 'handoff',
        type: 'handoff',
        eyebrow: 'SEO and content',
        title: 'Ongoing content was part of the operating model.',
        paragraphs: [
          'The site was not left as a one-page launch artifact.',
          'It includes a blog index and article routes for ongoing search-focused publishing. Recent updates added practical farm financing articles and updated the sitemap so search engines can discover the new pages.',
          'This matters because the website is meant to compound: each article can support the same lead intake path while giving the brand more surface area for relevant searches.',
        ],
        highlights: [
          'Blog structure for articles and previews.',
          'Sitemap entries for the homepage, blog index, and article pages.',
          'Page-level metadata for search and social sharing.',
        ],
        lifecycle: [
          'Launch website',
          'Collect leads',
          'Deliver to CRM',
          'Publish articles',
          'Update sitemap',
          'Maintain',
        ],
        media: ['maintenance'],
      },
      {
        id: 'larger-idea',
        type: 'larger-idea',
        eyebrow: 'The cherry on top',
        title: 'Pathflow MCP makes maintenance easier after launch.',
        paragraphs: [
          'After launch, the value of Pathflow MCP was continuity.',
          'The client did not need to know where the repository lived, which deployment process was used, how Cloudflare fit into the lead intake path, where the GoDaddy domain was managed, or how the completed work should be handed back. They could just submit the change request in Pathflow.',
          'Because the project context already existed in Pathflow, the consultant did not have to reconstruct the system before acting. The agent could see the accepted request in relation to the documented resources: GitHub, Cloudflare, GoDaddy, deployment notes, content structure, assets, and handoff workflow.',
          'That is what made a oneshot instruction useful. The consultant could tell their agent, “fulfill the latest request,” and the agent had enough context to update the site, follow the existing delivery path, record the work, and send the client the handoff.',
        ],
        emphasis: [
          'The client gets an easy way to ask for changes.',
          'The consultant gets enough project context to act without re-explaining the system every time.',
        ],
        cta: {
          label: 'Explore Pathflow MCP',
          href: '/platform/mcp',
        },
      },
      {
        id: 'closing',
        type: 'closing',
        statement: ['A website is only useful when the path behind it works.', 'Farm Financing Ontario has that path.'],
        paragraphs: [
          'Pathflow built and maintains the public site, the secure lead intake path, the CRM delivery layer, the deployment process, and the SEO content structure around Farm Financing Ontario.',
          'Pathflow MCP helps with maintenance because the request, resources, deployment details, and handoff workflow are already connected in the project record.',
        ],
        kicker: 'Built, connected, deployed, indexed, and maintainable.',
        cta: {
          label: 'Explore website and lead intake work',
          href: '/services/connected-websites',
        },
      },
    ],
  },
];

export const caseStudiesByPath = Object.fromEntries(
  caseStudies.map((caseStudy) => [caseStudy.path, caseStudy]),
);

const allWorkIndexItems = [
  {
    company: 'Farm Financing Ontario',
    href: '/work/farm-financing-ontario',
    status: 'Published case study',
    description:
      'A farm financing website connected to secure lead intake, Cashly CRM delivery, GitHub Pages deployment, DNS, SEO content, and Pathflow-maintained updates.',
    tags: ['Website', 'Lead intake', 'CRM', 'SEO'],
  },
  {
    company: 'Debt Shield Canada',
    hidden: true,
    status: 'Case study coming soon',
    description: 'Selected client system work to be documented.',
    tags: ['Selected work'],
  },
  {
    company: 'Glenforest Capital',
    hidden: true,
    status: 'Case study coming soon',
    description: 'Selected financing and client delivery work to be documented.',
    tags: ['Selected work'],
  },
];

export const workIndexItems = allWorkIndexItems.filter((item) => !item.hidden);

const allCaseStudyNavItems = [
  { type: 'heading', label: 'Selected work' },
  {
    label: 'Farm Financing Ontario',
    href: '/work/farm-financing-ontario',
    description: 'Website, secure intake, CRM, deployment, and SEO.',
  },
  {
    label: 'Debt Shield Canada',
    hidden: true,
    description: 'Case study coming soon',
    disabled: true,
  },
  {
    label: 'Glenforest Capital',
    hidden: true,
    description: 'Case study coming soon',
    disabled: true,
  },
  { type: 'separator' },
  {
    label: 'View all work',
    href: '/work',
    description: 'Selected systems, websites, and client operations.',
    directional: true,
  },
];

export const caseStudyNavItems = allCaseStudyNavItems.filter((item) => !item.hidden);
