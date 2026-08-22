import React from 'react';
import { createPortal } from 'react-dom';
import ReactDOM from 'react-dom/client';
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  CalendarCheck,
  ChevronDown,
  CheckCircle2,
  Code2,
  Database,
  FileCheck2,
  FileSearch,
  FolderOpen,
  GitBranch,
  Inbox,
  Map,
  Menu,
  MonitorCheck,
  Route,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react';
import layeredHero from '../pathflow-layered-hero.svg';
import {
  caseStudiesByPath,
  caseStudyNavItems,
  workIndexItems,
} from './caseStudies.js';
import {
  getCanonicalPath,
  getSeoForPath,
  jsonLdForPath,
} from './seo.js';
import {
  latestResourceIndexItems,
  resourceArticlesByPath,
  resourceIndexItems,
  resourceNavItems,
  resourceSections,
  resourceTopicItems,
  resourceTypeFilters,
} from './resourceArticles.js';
import './index.css';

const bookingLink =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1ejTXovOc_jVNvzOBE3_I4SBrYLvGJ_SGHX65CWHUhVPBbd_p9EIkIRs-5G3LqODcJP_zHrt1D';
const platformLink = 'https://app.getpathflow.com';
const architectureEmbedBaseUrl = import.meta.env.VITE_ARCHITECTURE_EMBED_BASE_URL || 'https://architecture.getpathflow.com';
const architectureEditorLink = 'https://architecture.getpathflow.com/new';
const contactEmail = 'vladimir@getpathflow.com';
const publicArchitectureEmbedToken = 'e48837111c2df243362275825fd291a792e1ddfbb82705b5';
const documentsProductLink = 'https://documents.getpathflow.com';
const documentsDeveloperLink = 'https://developers.getpathflow.com/documents';

const solutionNavItems = [
  {
    label: 'For Businesses',
    href: '/businesses',
    description: 'Build and improve the connected systems behind your operations.',
  },
  {
    label: 'For Consultants',
    href: '/consultants',
    description: 'Understand, document, manage, and hand off client systems.',
  },
  {
    label: 'Pathflow Architecture',
    href: '/solutions/architecture',
    description: 'Map systems, services, boundaries, resources, and data flows.',
  },
  {
    label: 'Pathflow Documents',
    href: '/solutions/documents',
    description: 'Automate client document intake, matching, classification, and filing.',
  },
  {
    label: 'Pathflow MCP',
    href: '/platform/mcp',
    description: 'Give agents the context behind the work.',
  },
  {
    label: 'Pathflow Handoffs',
    href: '/platform/handoffs',
    description: 'Deliver the project with its context intact.',
  },
];

const process = [
  {
    title: 'Map the flow',
    description:
      'We map the website, forms, CRM, automations, documents, infrastructure, ownership, and handoffs before changing anything.',
  },
  {
    title: 'Build the system',
    description:
      'We connect the pieces and remove manual gaps with the smallest practical set of tools.',
  },
  {
    title: 'Launch and monitor',
    description:
      'We test the full path, document it, deploy it, and monitor the parts that matter.',
  },
  {
    title: 'Improve monthly',
    description:
      'Ongoing care keeps workflows healthy while the system evolves with the business.',
  },
];

const plans = [
  {
    title: 'Build',
    description:
      'One-time implementations and clearly scoped improvements for websites, intake, CRM, automation, reporting, and handoff.',
    icon: Wrench,
  },
  {
    title: 'Care',
    description:
      'Managed hosting, monitoring, backups, maintenance, fixes, and operational continuity for systems already in use.',
    icon: ShieldCheck,
  },
  {
    title: 'Growth',
    description:
      'Ongoing system improvements, new automation, reporting, optimization, and monthly review as the operation changes.',
    icon: Sparkles,
  },
];

const problemCards = [
  {
    title: 'Forms go to inboxes',
    href: '/services/lead-intake-automation',
    cta: 'Fix lead intake',
  },
  {
    title: 'Leads fall through',
    href: '/services/crm-automation',
    cta: 'Improve follow-up',
  },
  {
    title: 'CRMs get messy',
    href: '/services/crm-automation',
    cta: 'Clean up the CRM',
  },
  {
    title: 'Documents are chased manually',
    href: '/services/lead-intake-automation',
    cta: 'Automate document collection',
  },
  {
    title: 'Automations break silently',
    href: '/services/managed-automation',
    cta: 'Manage automations',
  },
  {
    title: 'Nobody knows what is working',
    href: '/services/dashboards-reporting',
    cta: 'Improve visibility',
  },
];

const connectedFlow = [
  'Website',
  'Intake',
  'CRM',
  'Automation',
  'Communication',
  'Documents',
  'Reporting',
];

const businessOutcomes = [
  {
    title: 'Capture every lead',
    description: 'Forms, verification, routing, CRM creation, and follow-up.',
    icon: FileCheck2,
  },
  {
    title: 'Keep work moving',
    description: 'Pipeline automation, reminders, document requests, and internal alerts.',
    icon: GitBranch,
  },
  {
    title: 'See what is happening',
    description: 'Dashboards, lead status, workflow health, and operational visibility.',
    icon: BarChart3,
  },
  {
    title: 'Keep it running',
    description: 'Hosting, monitoring, backups, maintenance, and ongoing improvements.',
    icon: ShieldCheck,
  },
];

const consultantCapabilities = [
  {
    title: 'Architecture',
    description: 'Map systems, services, infrastructure, boundaries, ownership, and data flows.',
    icon: Map,
  },
  {
    title: 'Handoffs',
    description: 'Give clients a structured record of what was built, how it works, and where everything lives.',
    icon: FileCheck2,
  },
  {
    title: 'Resources',
    description: 'Track domains, cloud accounts, SaaS tools, repositories, infrastructure, and who manages them.',
    icon: Database,
  },
  {
    title: 'Requests',
    description: 'Keep changes, questions, and client requests attached to the projects and systems they affect.',
    icon: MonitorCheck,
  },
];

const platformAreas = [
  {
    title: 'Architecture',
    description: 'Visual maps of system resources, boundaries, and connections.',
    icon: Map,
  },
  {
    title: 'Project handoff',
    description: 'Structured handoff documentation clients can return to later.',
    icon: FileCheck2,
  },
  {
    title: 'Resources',
    description: 'Track the real services, accounts, repositories, and infrastructure behind a project.',
    icon: Database,
  },
  {
    title: 'Requests',
    description: 'Manage ongoing questions and changes in the context of the project.',
    icon: GitBranch,
  },
];

const work = [
  {
    label: 'Website + secure lead intake',
    title: 'Farm Financing Ontario',
    description:
      'Built a fast business website with Cloudflare-protected lead intake, bot protection, direct CRM delivery, and ongoing SEO content.',
    tags: ['Website', 'Cloudflare', 'CRM integration', 'SEO'],
    href: '/work/farm-financing-ontario',
    linkLabel: 'Read case study',
    icon: Route,
  },
  {
    label: 'Calling + CRM workflow',
    title: 'RingCentral + GHL call follow-up workflow',
    description:
      'Connected RingCentral call activity, lead status, GHL follow-up, and n8n routing so the team had a clearer record of what happened after each call.',
    tags: ['RingCentral', 'GHL', 'n8n', 'Workflow automation'],
    href: '/services/workflow-automation',
    linkLabel: 'View automation work',
    icon: GitBranch,
  },
  {
    label: 'Operations visibility',
    title: 'Lead and workflow health dashboard',
    description:
      'Created practical views for stuck leads, missing steps, intake status, and workflow health across the tools already in use.',
    tags: ['Reporting', 'CRM', 'Lead intake', 'Workflow health'],
    href: '/services/dashboards-reporting',
    linkLabel: 'View dashboard service',
    icon: MonitorCheck,
  },
];

const mcpContextObjects = [
  'Clients',
  'Projects',
  'Requests',
  'Attachments',
  'Tasks',
  'Activity',
  'Work logs',
  'Resources',
  'Deployments',
  'Architecture diagrams',
  'Handoffs',
];

const mcpCapabilities = [
  {
    eyebrow: 'Clients and projects',
    title: 'Maintain the project record around the work.',
    description:
      'Agents can understand and maintain the project record around the work instead of keeping project state trapped inside a conversation.',
    items: [
      'List clients',
      'Create projects',
      'Update project name',
      'Update project status',
      'Update project summary',
      'Update project/client association',
    ],
  },
  {
    eyebrow: 'Requests',
    title: 'Treat client asks as structured work.',
    description:
      'A request becomes a structured unit of work rather than another instruction buried in email or chat.',
    items: [
      'List deployment and project requests',
      'Search requests',
      'Retrieve full request bodies',
      'Inspect request metadata',
      'Update request lifecycle status',
    ],
  },
  {
    eyebrow: 'Attachments',
    title: 'Keep files attached to the request that introduced them.',
    description:
      'Text-like attachments can be read directly. Binary files such as images and PDFs are retrieved through short-lived download URLs.',
    items: [
      'List request attachments',
      'Read text attachments',
      'Read Markdown attachments',
      'Read JSON attachments',
      'Read CSV attachments',
      'Create short-lived download URLs for binary attachments',
    ],
  },
  {
    eyebrow: 'Tasks and checklists',
    title: 'Use the same operational checklist humans see.',
    description:
      'Agent-assisted work can use the same operational checklist humans see in Pathflow.',
    items: [
      'List project tasks',
      'Create project tasks',
      'Update task status',
      'Update priority',
      'Update assignee',
      'Update due date',
      'Mark completion',
    ],
  },
  {
    eyebrow: 'Activity and context',
    title: 'Retrieve useful current state without rebuilding history.',
    description:
      'Agents can retrieve the useful current state of a project without requiring the entire project history to be reconstructed inside a prompt.',
    items: [
      'Retrieve compact agent context',
      'List project activity',
      'Append structured work logs',
    ],
  },
  {
    eyebrow: 'Resources and deployments',
    title: 'Update recorded resource and deployment state.',
    description:
      'Pathflow MCP exposes project resources and recorded deployment state. The implementation or deployment itself still happens through the appropriate external system.',
    items: [
      'List project resources',
      'Update recorded resource state',
      'List deployments',
      'Record manual service instances',
      'Update manual service instances',
      'Update recorded GitHub Pages deployment state',
    ],
  },
  {
    eyebrow: 'Architecture',
    title: 'Make the system map useful to agents too.',
    description:
      'A Pathflow Architecture diagram is not only documentation for humans. Through MCP, its nodes and edges can become machine-readable project context.',
    items: [
      'List saved project architecture diagrams',
      'Retrieve a saved diagram',
      'Retrieve nodes',
      'Retrieve edges',
    ],
    emphasis:
      'The same system map can help a client understand the project, help a consultant maintain it, and help an agent reason about it.',
  },
  {
    eyebrow: 'Handoffs',
    title: 'Close the delivery loop.',
    description:
      'The agent does not simply finish a task somewhere else and disappear. Completed work can return to the same Pathflow workflow the client already uses.',
    items: [
      'List handoffs',
      'Retrieve handoff',
      'Prepare handoff',
      'Update handoff',
      'Add handoff items',
      'Update handoff items',
      'Send client handoff email',
    ],
  },
];

const mcpWorkflowSteps = [
  'Client request',
  'Project context',
  'Agent-assisted work',
  'Project state updated',
  'Handoff',
  'Client notification',
];

const mcpDeploymentBoundarySteps = [
  { label: 'Pathflow request', scope: 'Pathflow coordination' },
  { label: 'Agent / consultant', scope: 'Human and agent work' },
  { label: 'GitHub', scope: 'External tool' },
  { label: 'GitHub Actions', scope: 'External execution' },
  { label: 'Deployment', scope: 'External result' },
  { label: 'Pathflow state + handoff', scope: 'Pathflow coordination' },
];

const architectureMedia = {
  editor: {
    embedSrc: `${architectureEmbedBaseUrl}/share/${publicArchitectureEmbedToken}?embed=1`,
    alt: 'Pathflow Architecture editor showing a client project system map with resources, boundaries, and labeled relationships.',
    caption: 'A saved architecture belongs to the client project, alongside resources, requests, handoffs, and operational context.',
    layout: 'hero',
    aspectRatio: '16 / 10',
  },
  sharedView: {
    src: '/solutions/architecture/shared-view.png',
    alt: 'Read-only Pathflow Architecture share view for a client or collaborator.',
    caption: 'A shared architecture view is meant for inspection, not accidental editing.',
    pending: true,
    layout: 'wide',
    aspectRatio: '16 / 9',
  },
  projectExample: {
    src: '/solutions/architecture/real-project.png',
    alt: 'Sanitized Pathflow Architecture project example.',
    caption: 'Use a sanitized project architecture here once a public client example is ready.',
    pending: true,
    layout: 'wide',
    aspectRatio: '16 / 9',
  },
};

const architectureStaticWorkflow = [
  'Draw',
  'Export',
  'Put in documentation',
  'Forget about it',
];

const architectureLivingWorkflow = [
  'Project',
  'Resources',
  'Architecture',
  'Ongoing work',
  'Handoff',
];

const architectureResourceGroups = [
  {
    label: 'Applications and services',
    examples: 'Websites, CRMs, automation platforms, APIs, internal tools, SaaS',
  },
  {
    label: 'Infrastructure',
    examples: 'VPS, EC2, VPC, subnets, databases, gateways, proxies, hosting layers',
  },
  {
    label: 'Repositories and deployments',
    examples: 'GitHub repositories, GitHub Pages, deployment targets, app/service relationships',
  },
  {
    label: 'Domains and external services',
    examples: 'Domains, DNS providers, Cloudflare, email infrastructure, communication services',
  },
];

const architectureBoundaryPrompts = [
  'Who owns it?',
  'Who manages it?',
  'Where does it run?',
  'What depends on it?',
  'What changes if it moves?',
];

const architectureCapabilities = [
  {
    label: 'Build the map',
    items: [
      'Create services, databases, external systems, users, data sources, state nodes, and infrastructure nodes',
      'Add gateway, firewall, load balancer, router, domain, and generic infrastructure roles',
      'Add notes directly to the diagram',
    ],
  },
  {
    label: 'Connect real context',
    items: [
      'Attach nodes to Pathflow project resources where resource records exist',
      'Use custom or catalog-backed nodes when the system includes something not yet recorded',
      'Keep saved nodes and edges available as project architecture context',
    ],
  },
  {
    label: 'Describe relationships',
    items: [
      'Connect nodes with flow or association relationships',
      'Add edge labels for protocols, handoffs, webhooks, APIs, or other relationship notes',
      'Reverse flow direction or delete an edge without deleting the connected nodes',
    ],
  },
  {
    label: 'Structure the system',
    items: [
      'Group work with environment, system, network, VPC, and subnet boundaries',
      'Place components inside or along boundaries when that relationship matters',
      'Tidy full diagrams, selections, or boundary contents',
    ],
  },
  {
    label: 'Work like an editor',
    items: [
      'Use right-click context menus, selection tools, fit view, full screen, undo, and redo',
      'Save diagrams against a project or standalone architecture record',
      'Export PNG, PDF, or HTML views',
    ],
  },
  {
    label: 'Share safely',
    items: [
      'Enable a public architecture share link',
      'Share a read-only architecture view with client-safe metadata',
      'Disable or revoke shared links when access should end',
    ],
  },
];

const architectureHandoffSteps = [
  'Consultant builds system',
  'Architecture stays with project',
  'Client receives handoff',
  'Future collaborator can understand it',
];

const documentsWorkflowSteps = [
  {
    label: 'Receive',
    description: 'Email attachment',
  },
  {
    label: 'Match',
    description: 'Find the client',
  },
  {
    label: 'Understand',
    description: 'Identify the document',
  },
  {
    label: 'Organize',
    description: 'Rename and route',
  },
  {
    label: 'Track',
    description: 'Know what arrived',
  },
];

const documentsManagedItems = [
  'Gmail and Google Drive connections',
  'CRM-aware document intake',
  'Document matching and classification',
  'Routing, monitoring, and maintenance',
];

const documentsApiItems = [
  'n8n and automation workflows',
  'Custom applications and backend services',
  'Developer-controlled credentials and orchestration',
  'Structured document events for the next workflow step',
];

const documentsControlItems = [
  {
    title: 'Exact identity matching',
    description: 'Use sender emails, CRM identifiers, and internal mappings before treating a file as belonging to a client.',
  },
  {
    title: 'Review for ambiguity',
    description: 'Unknown or ambiguous senders can be held for review instead of being filed by assumption.',
  },
  {
    title: 'Tenant-aware operation',
    description: 'Each organization keeps its connections, clients, documents, and storage bindings isolated.',
  },
  {
    title: 'Deterministic routing',
    description: 'Document intelligence describes what a file appears to be. Routing rules decide what happens next.',
  },
  {
    title: 'Scoped integrations',
    description: 'Connect only the services needed for the document workflow, including customer-controlled storage.',
  },
  {
    title: 'Activity history',
    description: 'Document events can be tracked so teams can see what happened and what still needs attention.',
  },
];

const documentsFolderRows = [
  ['Pathflow Documents', 0],
  ['Clients', 1],
  ['Vladimir Belsch', 2],
  ['Identification', 3],
  ['Income', 3],
  ['Tax', 3],
  ['Banking', 3],
  ['Property', 3],
  ['Other', 3],
];

const handoffMedia = {
  editor: {
    src: '/solutions/handoffs/handoff-editor.png',
    alt: 'Pathflow handoff editor showing project summary, deliverables, resources, and client instructions.',
    caption: 'A handoff stays inside the project instead of becoming another file detached from the work.',
    pending: true,
    layout: 'wide',
    aspectRatio: '16 / 10',
  },
  email: {
    src: '/solutions/handoffs/handoff-email.png',
    alt: 'Client handoff email inviting a recipient to review completed Pathflow project work.',
    caption: 'The client handoff can be sent through the normal invitation flow when delivery is configured.',
    pending: true,
    layout: 'standard',
    aspectRatio: '4 / 3',
  },
  clientProject: {
    src: '/solutions/handoffs/client-project.png',
    alt: 'Client project view showing a delivered project and its connected handoff.',
    caption: 'After delivery, the project remains the place the client can return to for context and future requests.',
    pending: true,
    layout: 'wide',
    aspectRatio: '16 / 10',
  },
  handoffView: {
    src: '/solutions/handoffs/handoff-view.png',
    alt: 'Client-facing Pathflow handoff view with completed items, operational notes, resources, and next steps.',
    caption: 'Client-facing handoffs show useful project context without exposing secret values.',
    pending: true,
    layout: 'standard',
    aspectRatio: '4 / 3',
  },
};

const handoffProblemPrompts = [
  'Where is it hosted?',
  'Which account owns it?',
  'Where is the repository?',
  'Which services are connected?',
  'What can they safely change?',
  'Who manages each part?',
  'What happens when they need another consultant six months from now?',
];

const handoffTypicalSteps = [
  'Final invoice',
  'Email',
  'Drive folder',
  'Random links',
  'Credentials',
  'README',
  'Let me know if you need anything',
];

const handoffPathflowSteps = [
  'Project',
  'Resources',
  'Architecture',
  'Instructions',
  'Handoff',
  'Client access',
  'Ongoing requests',
];

const handoffIncludedRows = [
  {
    label: 'Project and handoff summary',
    description: 'Title, summary, version label, completion state, completed date, and the client-facing explanation of what changed.',
  },
  {
    label: 'Completed deliverables',
    description: 'Structured handoff items for what was built, important changes, next steps, operational notes, and known limitations.',
  },
  {
    label: 'Resources and links',
    description: 'Project resources, direct URLs, repositories, hosting, domains, systems, services, and other access points that belong around the work.',
  },
  {
    label: 'Access context without secret values',
    description: 'Credential references, storage location notes, auth type, ownership, rotation notes, and access instructions without displaying secret values in the handoff.',
  },
  {
    label: 'Client-facing instructions',
    description: 'Next steps, modification instructions, operational notes, owner context, environment notes, and client-safe guidance.',
  },
  {
    label: 'Recipients and responses',
    description: 'Sent, viewed, acknowledged, revision-requested, and question states that keep the delivery conversation visible around the project.',
  },
];

const handoffItemExamples = [
  'Website',
  'Lead intake',
  'Automation workflow',
  'Hosting',
  'Domain',
  'Repository',
  'CRM integration',
  'Analytics',
];

const handoffItemQuestions = [
  'What is this?',
  'Where does it live?',
  'Who manages it?',
  'How do I access it?',
  'How do I change it?',
];

const handoffResourceTypes = [
  'Domain',
  'Repository',
  'Hosting',
  'Database',
  'CRM',
  'Automation platform',
  'API',
  'Cloud service',
  'External integration',
];

const handoffInviteSteps = [
  'Consultant completes handoff',
  'Handoff invitation is sent or recorded',
  'Client signs in or creates an account',
  'Client opens the project',
  'Project remains available afterward',
];

const handoffRequestLoopSteps = [
  'Handoff',
  'Client understands project',
  'New request',
  'Consultant accepts work',
  'Project changes',
  'New completion handoff',
];

const handoffMcpItems = [
  'Retrieve project and handoff context',
  'Prepare or update a handoff',
  'Manage handoff items',
  'Send the client handoff email through Pathflow',
  'Write the result back to the client-facing workflow',
];

const handoffRecordEvents = [
  'Prepared',
  'Sent',
  'Viewed',
  'Accepted',
  'Revision requested',
  'Question asked',
  'Project activity updated',
];

const handoffAudienceValues = [
  {
    label: 'Client-side value',
    title: 'Know what you own.',
    description:
      'The client can see what was delivered, where the system lives, what the connected services are, what the next steps are, and how to come back with a future request.',
  },
  {
    label: 'Consultant-side value',
    title: "Stop being the project's external hard drive.",
    description:
      'The context no longer has to live in memory, inbox threads, screenshots, and private notes. It can stay with the project where the client relationship continues.',
  },
];

const handoffProductFamily = [
  {
    title: 'Architecture',
    description: 'Understand the system.',
    href: '/solutions/architecture',
  },
  {
    title: 'MCP',
    description: 'Give agents context.',
    href: '/platform/mcp',
  },
  {
    title: 'Handoffs',
    description: 'Deliver the system with context intact.',
    href: '/platform/handoffs',
  },
];

const servicePages = {
  '/services/crm-automation': {
    navLabel: 'CRM & Pipeline Automation',
    eyebrow: 'CRM & Pipeline Automation',
    title: 'Clean CRM systems that keep leads moving.',
    summary:
      'Pathflow sets up, cleans, connects, and automates CRM systems so contacts, opportunities, pipeline stages, follow-up, and reporting match how the business actually works.',
    shortDescription:
      'GoHighLevel, Salesforce, HubSpot, Zoho, pipeline cleanup, lead routing, follow-up, and alerts.',
    icon: GitBranch,
    problems: [
      'Leads enter from several sources and land in the wrong place.',
      'Pipeline stages do not match the real sales or intake process.',
      'Follow-up depends on memory instead of clear workflow triggers.',
      'Reports are unreliable because fields, tags, and sources are inconsistent.',
    ],
    flow: ['Website or form', 'Contact record', 'Opportunity', 'Pipeline stage', 'Follow-up', 'Dashboard'],
    capabilities: [
      'CRM setup and configuration',
      'Pipeline and opportunity stage design',
      'Custom fields, tags, and lead source tracking',
      'Lead routing and assignment rules',
      'Follow-up reminders and internal alerts',
      'Form, automation, and dashboard connections',
      'Workflow cleanup and documentation',
      'Handoff notes for staff or future consultants',
    ],
    tools: ['GoHighLevel', 'Salesforce', 'HubSpot', 'Zoho', 'n8n', 'Webhooks', 'Dashboards'],
    approach: [
      'Audit the current fields, stages, sources, and workflows.',
      'Simplify the CRM model before adding automation.',
      'Connect forms, calls, documents, and reporting to the CRM path.',
      'Document how leads move and where the system should be watched.',
    ],
    proof:
      'Recent work has connected landing page forms to routed CRM stages, reminders, and internal alerts for service teams that needed fewer dropped leads.',
    faqs: [
      {
        question: 'Can Pathflow work with an existing CRM?',
        answer:
          'Yes. Most CRM work starts by reviewing the existing account, cleaning up the model, then connecting the missing parts around it.',
      },
      {
        question: 'Do you require a specific CRM?',
        answer:
          'No. Pathflow commonly works around GoHighLevel, Salesforce, HubSpot, Zoho, and systems with accessible APIs or webhook support.',
      },
    ],
    adjacent: ['/services/lead-intake-automation', '/services/dashboards-reporting', '/services/workflow-automation'],
  },
  '/services/lead-intake-automation': {
    navLabel: 'Lead Intake Systems',
    eyebrow: 'Lead Intake Systems',
    title: 'Lead intake that reaches the right next step.',
    summary:
      'Pathflow builds intake systems that collect the right information, validate submissions, update the CRM, request documents, trigger reminders, and show your team what still needs attention.',
    shortDescription:
      'Branded forms, verification, routing, document requests, CRM updates, and reminders.',
    icon: FileCheck2,
    problems: [
      'A form sends an email, but the CRM is not updated.',
      'Clients start intake but do not complete it.',
      'Documents are requested manually and tracked in inboxes.',
      'The team cannot tell which lead needs the next follow-up.',
    ],
    flow: ['Website', 'Lead form', 'Validation', 'CRM record', 'Document request', 'Reminder', 'Team alert'],
    capabilities: [
      'Branded intake and lead forms',
      'Email or SMS verification patterns',
      'CRM contact and opportunity creation',
      'Custom field mapping',
      'Document request workflows',
      'Incomplete-form reminders',
      'Internal alerts for new or stalled submissions',
      'Intake status tracking and reporting',
    ],
    tools: ['Website forms', 'Cloudflare', 'GoHighLevel', 'HubSpot', 'n8n', 'Email', 'SMS'],
    approach: [
      'Map the current lead path before changing the form.',
      'Define the minimum information needed to route the lead.',
      'Connect validation, CRM updates, reminders, and status reporting.',
      'Test the full submission path and document expected behavior.',
    ],
    proof:
      'Farm Financing Ontario used a connected website and secure lead intake path with Cloudflare protection and direct CRM delivery.',
    faqs: [
      {
        question: 'Can intake forms replace PDFs?',
        answer:
          'Often, yes. Pathflow can turn repeatable PDF or paper intake into a structured form that updates the rest of the system.',
      },
      {
        question: 'Can the system ask for documents later?',
        answer:
          'Yes. Intake can trigger document requests, reminders, and dashboard status so the team does not have to track every step manually.',
      },
    ],
    adjacent: ['/services/crm-automation', '/services/connected-websites', '/services/workflow-automation'],
  },
  '/services/workflow-automation': {
    navLabel: 'Workflow Automation',
    eyebrow: 'Workflow Automation',
    title: 'Automation for the handoffs between your tools.',
    summary:
      'Pathflow builds workflow automation with APIs, webhooks, n8n, scheduled jobs, monitoring, and clear documentation so data moves between tools without fragile manual work.',
    shortDescription:
      'n8n, APIs, webhooks, integrations, Zapier migration, scheduled jobs, and workflow monitoring.',
    icon: ServerCog,
    problems: [
      'Tools work individually but do not share the right data.',
      'Manual copy-paste creates missed updates and duplicate records.',
      'Older Zapier or Make workflows are hard to reason about.',
      'Automations fail quietly until a client or lead notices.',
    ],
    flow: ['Trigger', 'Validation', 'API or webhook', 'Workflow logic', 'App update', 'Alert', 'Log'],
    capabilities: [
      'API and webhook integrations',
      'n8n workflow development',
      'Zapier or Make migration planning',
      'Scheduled jobs and data syncs',
      'CRM, website, document, and dashboard automation',
      'Error handling and operational alerts',
      'Workflow documentation',
      'Ongoing monitoring and maintenance',
    ],
    tools: ['n8n', 'Zapier', 'Make', 'REST APIs', 'Webhooks', 'Twilio', 'Google Workspace', 'CRMs'],
    approach: [
      'Identify the business event that should trigger work.',
      'Keep workflow logic explicit and documented.',
      'Add alerts around the steps that matter.',
      'Leave the system understandable for the next operator.',
    ],
    proof:
      'Recent workflow work connected call activity, CRM status, follow-up, and automation routing so the team had a clearer operating record.',
    faqs: [
      {
        question: 'Do you only build in n8n?',
        answer:
          'No. n8n is useful for many workflows, but Pathflow can also work with native CRM automation, APIs, webhooks, and existing tools.',
      },
      {
        question: 'Can you migrate existing Zapier workflows?',
        answer:
          'Yes. Pathflow can audit current Zaps, decide what should move, and rebuild practical workflows in n8n or another better-fit layer.',
      },
    ],
    adjacent: ['/services/n8n-automation', '/services/managed-automation', '/services/crm-automation'],
  },
  '/services/connected-websites': {
    navLabel: 'Connected Websites',
    eyebrow: 'Connected Websites',
    title: 'Websites connected to the system behind them.',
    summary:
      'Pathflow builds business websites, landing pages, and intake pages that connect to CRM, analytics, automation, lead routing, hosting, and reporting.',
    shortDescription:
      'Business websites and campaign pages connected to CRM, analytics, intake, and automation.',
    icon: Route,
    problems: [
      'The website exists, but form data stops in an inbox.',
      'Domains, hosting, DNS, and deployment live in unclear accounts.',
      'Campaign pages are disconnected from lead source reporting.',
      'Updates happen without version history or a maintainable setup.',
    ],
    flow: ['Domain', 'Website', 'Lead form', 'Validation', 'CRM', 'Automation', 'Analytics'],
    capabilities: [
      'Custom business websites',
      'Landing and campaign pages',
      'Intake pages and lead capture pages',
      'Domain, DNS, SSL, and hosting setup',
      'GitHub setup and version control',
      'Website forms connected to CRM',
      'Analytics and conversion tracking',
      'Website monitoring and maintenance',
    ],
    tools: ['Static hosting', 'Cloudflare', 'GitHub', 'CRM forms', 'n8n', 'Analytics', 'Vite', 'React'],
    approach: [
      'Start with the visitor path and the business action behind it.',
      'Build the page and form as part of the operational system.',
      'Use simple infrastructure unless the business needs more.',
      'Document domains, hosting, form routing, and analytics.',
    ],
    proof:
      'Farm Financing Ontario is an example of a fast public website connected to secure lead intake, bot protection, CRM delivery, and ongoing SEO content.',
    faqs: [
      {
        question: 'Can Pathflow replace an old Wix, GoDaddy, or Hostinger site?',
        answer:
          'Yes. Pathflow can rebuild the site and clean up the surrounding hosting, domain, form, and CRM connections.',
      },
      {
        question: 'Does every website need a custom app?',
        answer:
          'No. Many business websites should stay lightweight. Pathflow adds custom backend pieces only when the workflow needs them.',
      },
    ],
    adjacent: ['/services/lead-intake-automation', '/services/custom-apps', '/services/managed-automation'],
  },
  '/services/custom-apps': {
    navLabel: 'Custom Apps & Portals',
    eyebrow: 'Custom Apps & Portals',
    title: 'Custom tools for the workflow gaps your software does not cover.',
    summary:
      'Pathflow builds focused internal apps, client portals, admin panels, dashboards, forms, and database-backed tools that connect to the systems your business already uses.',
    shortDescription:
      'Internal tools, portals, admin panels, intake review screens, workflow controls, and hosted apps.',
    icon: Code2,
    problems: [
      'Important work is trapped in spreadsheets, inboxes, or manual admin steps.',
      'The CRM or automation platform works, but the team needs a better interface.',
      'Staff need a safer way to review, route, approve, or trigger workflow actions.',
      'A full software product would be too much, but a focused tool would remove daily friction.',
    ],
    flow: ['User action', 'Custom interface', 'Database', 'Workflow logic', 'CRM or app update', 'Alert', 'Review'],
    capabilities: [
      'Custom internal apps',
      'Client portals and intake review screens',
      'Admin panels and workflow control panels',
      'Document and lead status trackers',
      'Database-backed forms and approval tools',
      'CRM-connected operational tools',
      'API-connected dashboards and reporting interfaces',
      'Hosted app deployment, updates, and maintenance',
    ],
    tools: ['React', 'Databases', 'APIs', 'n8n', 'Cloudflare', 'GitHub', 'CRMs', 'Dashboards'],
    approach: [
      'Define the workflow gap before choosing the interface.',
      'Keep the tool focused on the decision or action the team needs.',
      'Connect it to existing systems instead of creating another disconnected island.',
      'Document hosting, data flow, ownership, and maintenance expectations.',
    ],
    proof:
      'Pathflow custom app work usually sits between the website, CRM, automation layer, database, and reporting needs when off-the-shelf tools do not quite fit.',
    faqs: [
      {
        question: 'Is this the same as building a full SaaS product?',
        answer:
          'No. Most custom app work is smaller and more operational: a portal, dashboard, admin panel, review queue, form, or control surface for an existing workflow.',
      },
      {
        question: 'Can a custom app connect to our CRM or automations?',
        answer:
          'Yes. These tools are most useful when they connect to the CRM, database, forms, n8n workflows, document systems, or reporting layer already used by the business.',
      },
    ],
    adjacent: ['/services/workflow-automation', '/services/connected-websites', '/services/dashboards-reporting'],
  },
  '/services/dashboards-reporting': {
    navLabel: 'Dashboards & Reporting',
    eyebrow: 'Dashboards & Reporting',
    title: 'See what is happening across the system.',
    summary:
      'Pathflow builds dashboards and reporting views for lead sources, pipeline status, intake completion, workflow health, stuck leads, and operational visibility.',
    shortDescription:
      'Lead-source reporting, operational dashboards, stuck-lead views, and system visibility.',
    icon: BarChart3,
    problems: [
      'Data exists across tools, but nobody sees the full process.',
      'Teams cannot tell which leads are stuck or missing documents.',
      'Campaign performance is separated from CRM outcomes.',
      'Automation health is invisible until something breaks.',
    ],
    flow: ['CRM', 'Forms', 'Automation logs', 'Documents', 'Data model', 'Dashboard', 'Review'],
    capabilities: [
      'Lead source dashboards',
      'CRM and pipeline dashboards',
      'Intake completion reporting',
      'Document status views',
      'Workflow health dashboards',
      'Campaign and landing page reporting',
      'Automated reporting workflows',
      'Data cleanup for reliable views',
    ],
    tools: ['CRM reports', 'Metabase', 'Grafana', 'Spreadsheets', 'n8n', 'Databases', 'Custom dashboards'],
    approach: [
      'Define the decisions the dashboard should support.',
      'Clean up source fields and status definitions before visualizing.',
      'Connect only the data needed for practical visibility.',
      'Review the dashboard as the system changes.',
    ],
    proof:
      'Recent dashboard work created views for stuck leads, missing steps, intake status, and workflow health across existing tools.',
    faqs: [
      {
        question: 'Can dashboards be built inside tools we already use?',
        answer:
          'Yes. Pathflow can use built-in CRM reporting, spreadsheets, hosted dashboard tools, or custom views depending on the job.',
      },
      {
        question: 'Do dashboards require a data warehouse?',
        answer:
          'Not always. Many useful operational dashboards can start with simpler CRM, spreadsheet, or app-level data connections.',
      },
    ],
    adjacent: ['/services/crm-automation', '/services/lead-intake-automation', '/services/workflow-automation'],
  },
  '/services/managed-automation': {
    navLabel: 'Managed Automation Infrastructure',
    eyebrow: 'Managed Automation Infrastructure',
    title: 'Managed infrastructure for systems that need to keep running.',
    summary:
      'Pathflow manages automation infrastructure, n8n hosting, monitoring, backups, deployments, SSL, workflow maintenance, and small fixes so business systems have a clear owner.',
    shortDescription:
      'Managed n8n hosting, monitoring, backups, workflow maintenance, and infrastructure care.',
    icon: ShieldCheck,
    problems: [
      'Important automations live in accounts nobody checks.',
      'Hosting, SSL, backups, and monitoring are unclear.',
      'A workflow breaks, but there is no alert or owner.',
      'Infrastructure was built once and never documented.',
    ],
    flow: ['Repository', 'Deployment', 'Hosting', 'Workflow runtime', 'Monitoring', 'Backup', 'Maintenance'],
    capabilities: [
      'Managed n8n hosting',
      'Website and landing page hosting',
      'Dashboard and internal tool hosting',
      'Cloudflare, DNS, and SSL configuration',
      'Backups and recovery planning',
      'Uptime and workflow monitoring',
      'Security updates and maintenance',
      'Infrastructure documentation and handoff',
    ],
    tools: ['n8n', 'Cloudflare', 'GitHub', 'Docker', 'AWS', 'Monitoring tools', 'Databases'],
    approach: [
      'Choose infrastructure based on the system, not fashion.',
      'Separate fragile personal accounts from business operations.',
      'Monitor the parts that matter to the client path.',
      'Document ownership, access, backups, and recovery steps.',
    ],
    proof:
      'Pathflow care work commonly covers hosted websites, automations, dashboards, DNS, SSL, backups, and small operational fixes after launch.',
    faqs: [
      {
        question: 'Is managed automation a SaaS pricing tier?',
        answer:
          'No. Care scope is based on the systems being managed, the monitoring required, and how quickly changes need to happen.',
      },
      {
        question: 'Can infrastructure stay client-owned?',
        answer:
          'Yes. Pathflow can work with client-owned accounts or managed infrastructure, as long as ownership and access are documented clearly.',
      },
    ],
    adjacent: ['/services/n8n-automation', '/services/connected-websites', '/services/workflow-automation'],
  },
  '/services/n8n-automation': {
    navLabel: 'n8n Automation',
    eyebrow: 'n8n Automation',
    title: 'n8n automation built to keep running.',
    summary:
      'Pathflow builds and maintains n8n workflows for APIs, webhooks, Zapier migration, CRM automation, scheduled jobs, managed hosting, monitoring, backups, and maintenance.',
    shortDescription:
      'Workflow development, APIs, webhooks, Zapier migration, managed hosting, monitoring, backups, and maintenance.',
    icon: ServerCog,
    problems: [
      'Task-based automation costs grow with every workflow execution.',
      'Custom API logic is awkward in simpler automation tools.',
      'Self-hosted n8n exists, but nobody owns updates or monitoring.',
      'Workflows are useful but undocumented and hard to change.',
    ],
    flow: ['Webhook', 'n8n workflow', 'API call', 'CRM update', 'Notification', 'Log', 'Monitor'],
    capabilities: [
      'n8n setup and configuration',
      'Managed n8n hosting',
      'Zapier or Make migration',
      'Webhook and API workflows',
      'CRM, email, SMS, and document automation',
      'Scheduled jobs and data syncs',
      'Error handling and alerts',
      'Backups, monitoring, and workflow documentation',
    ],
    tools: ['n8n', 'Docker', 'Cloudflare', 'REST APIs', 'Webhooks', 'CRMs', 'Twilio', 'Email'],
    approach: [
      'Confirm whether n8n is the right layer for the workflow.',
      'Build workflows around clear triggers, branches, and failure states.',
      'Host and monitor n8n when the business needs managed infrastructure.',
      'Document workflows so they can be reviewed and changed later.',
    ],
    proof:
      'Pathflow uses n8n where it is a practical fit for connected lead routing, CRM updates, scheduled jobs, and API workflow glue.',
    faqs: [
      {
        question: 'Can Pathflow host n8n for us?',
        answer:
          'Yes. Pathflow can manage hosting, SSL, updates, backups, and monitoring when a managed setup is the right fit.',
      },
      {
        question: 'Should every Zapier workflow move to n8n?',
        answer:
          'No. Some simple workflows can stay where they are. Pathflow reviews the current setup before recommending a migration.',
      },
    ],
    adjacent: ['/services/workflow-automation', '/services/managed-automation', '/services/crm-automation'],
  },
};

const serviceNavItems = [
  '/services/crm-automation',
  '/services/lead-intake-automation',
  '/services/workflow-automation',
  '/services/connected-websites',
  '/services/custom-apps',
  '/services/dashboards-reporting',
  '/services/managed-automation',
].map((path) => ({
  label: servicePages[path].navLabel,
  href: path,
  description: servicePages[path].shortDescription,
}));

function App() {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  const canonicalPath = getCanonicalPath(pathname);
  const service = servicePages[canonicalPath];
  const caseStudy = caseStudiesByPath[canonicalPath];
  const resourceArticle = resourceArticlesByPath[canonicalPath];
  const Page = pageComponents[canonicalPath];
  const isFound = Boolean(Page || service || caseStudy || resourceArticle);

  React.useEffect(() => {
    applySeo(pathname, isFound);
  }, [pathname, isFound]);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header canonicalPath={canonicalPath} />
      <main id="main" className="relative z-10 isolate overflow-hidden">
        {service && <ServicePage service={service} />}
        {!service && caseStudy && <CaseStudyPage caseStudy={caseStudy} />}
        {!service && !caseStudy && resourceArticle && <ResourceArticlePage article={resourceArticle} />}
        {!service && !caseStudy && !resourceArticle && Page && <Page />}
        {!isFound && <NotFoundPage />}
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

function applySeo(pathname, isFound) {
  const seo = getSeoForPath(pathname);
  const robots = isFound ? seo.robots : 'noindex,follow';

  document.title = seo.title;
  setMeta('name', 'description', seo.description);
  setMeta('name', 'robots', robots);
  setMeta('property', 'og:title', seo.ogTitle || seo.title);
  setMeta('property', 'og:description', seo.description);
  setMeta('property', 'og:type', 'website');
  setMeta('property', 'og:url', seo.canonicalUrl);
  setMeta('property', 'og:image', seo.ogImage);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', seo.title);
  setMeta('name', 'twitter:description', seo.description);
  setMeta('name', 'twitter:image', seo.ogImage);
  setCanonical(seo.canonicalUrl);
  setJsonLd(isFound ? jsonLdForPath(pathname) : null);
}

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

function setJsonLd(data) {
  const existing = document.getElementById('pathflow-json-ld');
  if (existing) {
    existing.remove();
  }

  if (!data) return;

  const script = document.createElement('script');
  script.id = 'pathflow-json-ld';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

function Header({ canonicalPath }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const workIsActive = canonicalPath === '/work' || canonicalPath.startsWith('/work/');
  const servicesAreActive = canonicalPath === '/services' || canonicalPath.startsWith('/services/');
  const solutionsAreActive = solutionNavItems.some((item) => isHrefActive(item.href, canonicalPath));
  const resourcesAreActive = canonicalPath === '/resources' || canonicalPath.startsWith('/resources/');

  React.useEffect(() => {
    setMobileOpen(false);
  }, [canonicalPath]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-black/[0.86] backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8" aria-label="Main navigation">
        <a href="/" className="flex min-w-0 items-center gap-3" aria-label="Pathflow home">
          <img src="/assets/logo-transparent.png" alt="" className="h-9 w-9 shrink-0 object-contain" />
          <span className="text-xl font-semibold leading-none text-white">Pathflow</span>
        </a>
        <div className="hidden items-center gap-7 text-sm text-white/70 lg:flex">
          <NavDropdown label="Solutions" items={solutionNavItems} active={solutionsAreActive} canonicalPath={canonicalPath} />
          <NavDropdown label="Services" items={serviceNavItems} active={servicesAreActive} canonicalPath={canonicalPath} />
          <NavDropdown label="Work" items={caseStudyNavItems} active={workIsActive} canonicalPath={canonicalPath} />
          <NavDropdown label="Resources" items={resourceNavItems} active={resourcesAreActive} canonicalPath={canonicalPath} />
          <a className="nav-link" href="/#care">
            Care
          </a>
        </div>
        <div className="flex items-center gap-3">
          <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-small btn-primary">
            <CalendarCheck size={16} />
            <span className="hidden sm:inline">Book consultation</span>
            <span className="sm:hidden">Book</span>
          </a>
          <a href={platformLink} className="btn btn-small btn-muted hidden sm:inline-flex">
            Log in
          </a>
          <button
            type="button"
            className="btn btn-small btn-muted px-3 lg:hidden"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-controls="mobile-navigation"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((isOpen) => !isOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      {mobileOpen && <MobileNavigation canonicalPath={canonicalPath} />}
    </header>
  );
}

function NavDropdown({ label, items, active = false, canonicalPath }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuId = React.useId();

  return (
    <div
      className={`nav-dropdown group ${active ? 'nav-dropdown-active' : ''}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false);
        }
      }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className={`nav-link nav-trigger ${active ? 'nav-link-active' : ''}`}
        aria-haspopup="true"
        aria-controls={menuId}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        onFocus={() => setIsOpen(true)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setIsOpen(false);
            event.currentTarget.blur();
          }
        }}
      >
        <span>{label}</span>
        <ChevronDown size={14} className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
      </button>
      <div className={`nav-menu ${isOpen ? 'nav-menu-open' : ''}`} id={menuId}>
        <div className="nav-menu-panel">
          {items.map((item) => (
            <NavMenuItem item={item} canonicalPath={canonicalPath} key={item.label || item.type} />
          ))}
        </div>
      </div>
    </div>
  );
}

function NavMenuItem({ item, canonicalPath }) {
  if (item.type === 'heading') {
    return <p className="nav-menu-heading">{item.label}</p>;
  }

  if (item.type === 'separator') {
    return <div className="nav-menu-separator" aria-hidden="true" />;
  }

  if (item.disabled) {
    return (
      <span className="nav-menu-link nav-menu-link-disabled">
        <span className="block text-white/65">{item.label}</span>
        {item.description && <span className="mt-1 block text-xs leading-5 text-white/40">{item.description}</span>}
      </span>
    );
  }

  const active = isHrefActive(item.href, canonicalPath);

  return (
    <a
      className={`nav-menu-link ${active ? 'nav-menu-link-active' : ''}`}
      href={item.href}
      aria-current={active ? 'page' : undefined}
    >
      <span className="flex items-center justify-between gap-3 text-white">
        {item.label}
        {item.directional && <ArrowRight size={14} className="cta-arrow shrink-0" aria-hidden="true" />}
      </span>
      {item.description && <span className="mt-1 block text-xs leading-5 text-white/55">{item.description}</span>}
    </a>
  );
}

function MobileNavigation({ canonicalPath }) {
  return (
    <div id="mobile-navigation" className="mobile-nav lg:hidden">
      <div className="mx-auto grid max-w-7xl gap-2 px-5 py-4 sm:px-6">
        <MobileNavGroup label="Solutions" items={solutionNavItems} canonicalPath={canonicalPath} />
        <MobileNavGroup label="Services" items={serviceNavItems} canonicalPath={canonicalPath} />
        <MobileNavGroup label="Work" items={caseStudyNavItems} canonicalPath={canonicalPath} />
        <MobileNavGroup label="Resources" items={resourceNavItems} canonicalPath={canonicalPath} />
        <a className="mobile-nav-link" href="/#care">Care</a>
        <a className="mobile-nav-link sm:hidden" href={platformLink}>Log in</a>
      </div>
    </div>
  );
}

function MobileNavGroup({ label, items, canonicalPath }) {
  const isActive = items.some((item) => item.href && isHrefActive(item.href, canonicalPath));

  return (
    <details className="mobile-nav-group" open={isActive}>
      <summary className={`mobile-nav-summary ${isActive ? 'mobile-nav-link-active' : ''}`}>
        <span>{label}</span>
        <ChevronDown size={16} aria-hidden="true" />
      </summary>
      <div className="mobile-nav-group-panel">
        {items.map((item) => (
          <MobileNavItem item={item} canonicalPath={canonicalPath} key={item.label || item.type} />
        ))}
      </div>
    </details>
  );
}

function MobileNavItem({ item, canonicalPath }) {
  if (item.type === 'heading') {
    return <p className="mobile-nav-heading">{item.label}</p>;
  }

  if (item.type === 'separator') {
    return <div className="mobile-nav-separator" aria-hidden="true" />;
  }

  if (item.disabled) {
    return (
      <span className="mobile-nav-sublink mobile-nav-sublink-disabled">
        <span>{item.label}</span>
        {item.description && <small>{item.description}</small>}
      </span>
    );
  }

  const active = isHrefActive(item.href, canonicalPath);

  return (
    <a className={`mobile-nav-sublink ${active ? 'mobile-nav-link-active' : ''}`} href={item.href} aria-current={active ? 'page' : undefined}>
      <span>{item.label}</span>
      {item.description && <small>{item.description}</small>}
    </a>
  );
}

function isHrefActive(href, canonicalPath) {
  if (!href || href.startsWith('#') || href.includes('#')) return false;

  const normalizedHref = href.replace(/\/$/, '') || '/';
  if (normalizedHref === '/') return canonicalPath === '/';

  return canonicalPath === normalizedHref || canonicalPath.startsWith(`${normalizedHref}/`);
}

function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <ConnectedSystemSection />
      <BusinessesSection />
      <ConsultantsSection />
      <ServicesSection />
      <PlatformSection />
      <WorkSection />
      <ProcessSection />
      <CarePlansSection />
      <ResourcesSection />
      <FinalCtaSection />
    </>
  );
}

function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 sm:pt-36">
      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-6 lg:px-8 lg:pb-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.72fr)] lg:items-center">
          <div className="max-w-5xl">
            <p className="eyebrow mb-6">Connected business systems</p>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              Systems, made clear.
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/75 sm:text-xl sm:leading-9">
              Pathflow builds, connects, documents, and manages the systems businesses and consultants rely on, from websites and lead intake to CRM workflows, automation, and infrastructure.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-primary">
                <CalendarCheck size={18} />
                Book a consultation
              </a>
              <a href="#connections" className="btn btn-secondary group">
                See how Pathflow works
                <ArrowDown size={18} className="transition-transform group-hover:translate-y-0.5 group-focus-visible:translate-y-0.5" />
              </a>
            </div>
          </div>
          <HeroArchitectureMotif />
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <a href="/businesses" className="audience-card audience-route-card card-link group block">
            <p className="text-xs font-medium uppercase tracking-normal text-white/55">For businesses</p>
            <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">Better systems for leads, clients, and operations.</h2>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
              Explore business solutions
              <ArrowRight size={16} className="cta-arrow" />
            </span>
          </a>
          <a href="/consultants" className="audience-card audience-route-card card-link group block">
            <p className="text-xs font-medium uppercase tracking-normal text-white/55">For consultants</p>
            <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">Document and hand off client systems without losing context.</h2>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
              Explore Pathflow for consultants
              <ArrowRight size={16} className="cta-arrow" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function HeroArchitectureMotif() {
  return (
    <div className="hero-architecture-motif hidden lg:block" aria-hidden="true">
      <img src={layeredHero} alt="" decoding="async" draggable="false" />
    </div>
  );
}

function ProblemSection() {
  return (
    <Section id="problem" eyebrow="The real problem" title="Most businesses don't have a website problem. They have a flow problem.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {problemCards.map((problem) => (
          <a className="problem-card card-link group block" href={problem.href} key={problem.title}>
            <div className="mb-5 flex h-9 w-9 items-center justify-center border border-white/[0.08] bg-black transition-colors group-hover:border-white/30 group-focus-visible:border-white/40">
              <CheckCircle2 size={18} className="text-white/75" />
            </div>
            <h3 className="text-lg font-medium text-white">{problem.title}</h3>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/65">
              {problem.cta}
              <ArrowRight size={15} className="cta-arrow" />
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}

function ConnectedSystemSection() {
  return (
    <Section
      id="connections"
      eyebrow="Connected system thinking"
      title="The value is in the connections."
      intro="A website, CRM, automation tool, phone system, and dashboard can all work individually and still produce a broken process. Pathflow maps and improves the path between them."
    >
      <ConnectedFlowDiagram items={connectedFlow} />
      <div className="connection-notes mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="connection-statement">
          <p className="text-xs font-semibold uppercase tracking-normal text-white/55">Most providers own one box.</p>
          <h3 className="mt-4 max-w-lg text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Pathflow cares about the arrows between them.
          </h3>
        </div>
        <ol className="connection-checklist">
          {[
            'Who submits it',
            'Where it is validated',
            'Which system owns the record',
            'What happens next',
            'Who gets notified',
            'How you know it worked',
          ].map((item, index) => (
            <li key={item}>
              <span>0{index + 1}</span>
              {item}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

function BusinessesSection() {
  return (
    <Section
      id="businesses"
      eyebrow="For businesses"
      title="Build a system your team can actually rely on."
      intro="Pathflow connects the tools already running your business and fixes the gaps between them: lead intake, CRM workflows, documents, follow-up, reporting, websites, and automation."
    >
      <CardGrid items={businessOutcomes} />
      <div className="mt-10">
        <a href="/businesses" className="btn btn-secondary">
          Explore solutions for businesses
          <ArrowRight size={18} />
        </a>
      </div>
    </Section>
  );
}

function ConsultantsSection() {
  return (
    <section id="consultants" className="consultant-section mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <p className="eyebrow">For consultants</p>
          <h2 className="section-title mt-4">Your clients already have a stack. Keep it understandable.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
            Pathflow gives consultants a durable place to map what exists, document what was built, manage client systems, and hand work over without losing the context behind it.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {consultantCapabilities.map(({ title, description, icon: Icon }) => (
              <article className="capability-item" key={title}>
                <Icon size={18} className="text-white/65" />
                <div>
                  <h3 className="text-base font-semibold text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-white/65">{description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-9">
            <a href="/consultants" className="btn btn-secondary">
              Explore Pathflow for consultants
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
        <ConsultantSystemModel />
      </div>
    </section>
  );
}

function ConsultantSystemModel() {
  return (
    <article className="consultant-model consultant-case-study border border-white/[0.095] bg-black p-5 sm:p-6" aria-labelledby="consultant-case-study-title">
      <div className="consultant-case-study-visual">
        <img src="/farmfinancingontario.png" alt="Farm Financing Ontario logo" />
      </div>
      <div className="consultant-case-study-copy">
        <p className="text-xs font-semibold uppercase tracking-normal text-white/50">Featured case study</p>
        <h3 id="consultant-case-study-title" className="mt-3 text-2xl font-semibold text-white">Farm Financing Ontario</h3>
        <p className="mt-4 max-w-xl text-base leading-7 text-white/70">
          Website, lead intake, CRM integration, deployment, and ongoing SEO.
        </p>
        <a href="/work/farm-financing-ontario" className="consultant-case-study-link group">
          View case study
          <ArrowRight size={16} className="cta-arrow" />
        </a>
      </div>
    </article>
  );
}

function PlatformPreview() {
  return (
    <article className="platform-preview border border-white/[0.095] bg-black p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <p className="text-sm font-medium text-white/55">Architecture map</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Lead intake system</h3>
        </div>
        <Map size={22} className="text-white/60" />
      </div>
      <ArchitectureMiniMap className="mt-5" />
    </article>
  );
}

function ServicesSection() {
  const homeServices = serviceNavItems.map((item) => ({
    ...item,
    ...servicePages[item.href],
  }));

  return (
    <Section
      id="services"
      eyebrow="Services"
      title="Build the pieces. Connect the whole operation."
      intro="Pathflow can fix one part of the workflow or connect the full path across intake, CRM, automation, websites, reporting, and infrastructure."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {homeServices.map(({ navLabel, shortDescription, href, icon: Icon }) => (
          <a className="service-card card-link group block" href={href} key={href}>
            <Icon size={24} className="text-white/75" />
            <h3 className="mt-6 text-2xl font-semibold leading-tight text-white">{navLabel}</h3>
            <p className="mt-3 leading-7 text-white/75">{shortDescription}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/75">
              View service
              <ArrowRight size={15} className="cta-arrow" />
            </span>
          </a>
        ))}
      </div>
      <div className="mt-10">
        <a href="/work" className="btn btn-secondary group">
          View all work
          <ArrowRight size={18} className="cta-arrow" />
        </a>
      </div>
    </Section>
  );
}

function PlatformSection() {
  return (
    <Section
      id="platform"
      eyebrow="Pathflow platform"
      title="The system should stay understandable after the work is done."
      intro="Pathflow keeps project context, architecture, resources, handoffs, and client requests together so systems remain understandable long after launch."
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="grid gap-5 sm:grid-cols-2">
          {platformAreas.map(({ title, description, icon: Icon }) => (
            <article className="service-card" key={title}>
              <Icon size={22} className="text-white/70" />
              <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 leading-7 text-white/75">{description}</p>
            </article>
          ))}
        </div>
        <PlatformPreview />
      </div>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <a href="/solutions/architecture" className="btn btn-secondary">
          Explore Pathflow Architecture
          <ArrowRight size={18} />
        </a>
        <a href={platformLink} className="btn btn-muted">
          Log in
        </a>
      </div>
    </Section>
  );
}

function ArchitectureMiniMap({ className = '', compact = false }) {
  const nodes = [
    { id: 'website', label: 'Website', meta: 'client-owned', x: 28, y: 26, w: 132 },
    { id: 'cloudflare', label: 'Cloudflare', meta: 'managed', x: 198, y: 26, w: 138 },
    { id: 'n8n', label: 'n8n', meta: 'managed', x: 198, y: 148, w: 138 },
    { id: 'crm', label: 'CRM', meta: 'client-owned', x: 28, y: 148, w: 132 },
  ];
  const edges = [
    { path: 'M160 62H198', label: 'validate', x: 179, y: 48 },
    { path: 'M267 96V148', label: 'webhook', x: 302, y: 124 },
    { path: 'M198 184H160', label: 'create lead', x: 179, y: 208 },
  ];

  return (
    <div className={`architecture-mini-map ${compact ? 'architecture-mini-map-compact' : ''} ${className}`}>
      <svg viewBox="0 0 364 250" role="img" aria-label="Architecture graph showing website, Cloudflare, n8n, and CRM resources connected by data flow edges">
        <defs>
          <marker id={compact ? 'mini-arrow-compact' : 'mini-arrow'} markerHeight="8" markerWidth="8" orient="auto" refX="7" refY="4">
            <path d="M0,0 L8,4 L0,8" fill="rgba(255,255,255,0.52)" />
          </marker>
        </defs>
        <g className="mini-map-edges">
          {edges.map((edge) => (
            <g key={edge.label}>
              <path d={edge.path} markerEnd={`url(#${compact ? 'mini-arrow-compact' : 'mini-arrow'})`} />
              <text x={edge.x} y={edge.y} textAnchor="middle">{edge.label}</text>
            </g>
          ))}
        </g>
        <g>
          {nodes.map((node) => (
            <g className="mini-map-node" key={node.id} transform={`translate(${node.x} ${node.y})`}>
              <rect width={node.w} height="70" />
              <text className="mini-map-node-label" x={node.w / 2} y="31" textAnchor="middle">{node.label}</text>
              <text className="mini-map-node-meta" x={node.w / 2} y="51" textAnchor="middle">{node.meta}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

function WorkSection() {
  return (
    <Section
      id="work"
      eyebrow="Recent client work"
      title="Practical builds for the parts of the business customers never see."
      intro="The work is usually quiet: fewer dropped leads, cleaner handoffs, clearer document status, and better visibility into the system."
    >
      <div className="work-layout grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        {work.map(({ label, title, description, tags, href, linkLabel, icon: Icon }, index) => (
          <article className={`work-card ${index === 0 ? 'work-card-featured lg:row-span-2' : ''}`} key={title}>
            <div className="flex items-start justify-between gap-4">
              <span className="border border-white/20 bg-white/[0.04] px-2.5 py-1 text-xs text-white/75">{label}</span>
              <Icon size={21} className="text-white/60" />
            </div>
            <h3 className={`${index === 0 ? 'mt-10 text-3xl sm:text-4xl' : 'mt-8 text-xl'} font-semibold leading-tight text-white`}>{title}</h3>
            <p className={`${index === 0 ? 'mt-5 text-lg leading-8' : 'mt-3 leading-7'} text-white/75`}>{description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span className="border border-white/[0.12] px-2.5 py-1 text-xs text-white/60" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <a href={href} className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/75">
              {linkLabel}
              <ArrowRight size={15} className="cta-arrow" />
            </a>
          </article>
        ))}
      </div>
    </Section>
  );
}

function ProcessSection() {
  return (
    <Section
      id="process"
      eyebrow="How it works"
      title="A structured path from messy workflow to monitored system."
    >
      <ProcessCards />
    </Section>
  );
}

function ProcessCards() {
  return (
    <div className="relative grid gap-5 lg:grid-cols-4">
      {process.map((step, index) => (
        <article className="process-card" key={step.title}>
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-white/60">0{index + 1}</span>
            {index < process.length - 1 && <ArrowRight size={17} className="hidden text-white/30 lg:block" />}
          </div>
          <h3 className="mt-7 text-xl font-semibold text-white">{step.title}</h3>
          <p className="mt-3 leading-7 text-white/70">{step.description}</p>
        </article>
      ))}
    </div>
  );
}

function CarePlansSection() {
  return (
    <Section
      id="care"
      eyebrow="Care"
      title="Keep the system working after launch."
      intro="Some work is a focused build. Some systems need monthly care. Some operations need steady improvement as the business changes."
    >
      <CardGrid items={plans} />
    </Section>
  );
}

function ResourcesSection() {
  return (
    <Section
      id="resources"
      eyebrow="Resources"
      title="Practical notes from building real systems."
      intro="Early Pathflow resources focus on the decisions that make connected systems easier to build, maintain, and hand off."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {latestResourceIndexItems.map((resource) => (
          <a className="resource-card card-link group block" href={resource.path} key={resource.path}>
            <span className="text-sm font-medium text-white/55">{resource.typeLabel}</span>
            <h3 className="mt-5 text-xl font-semibold text-white">{resource.shortTitle}</h3>
            <p className="mt-3 leading-7 text-white/75">{resource.description}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/75">
              Read resource
              <ArrowRight size={15} className="cta-arrow" />
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}

function FinalCtaSection() {
  return (
    <section id="contact" className="relative overflow-hidden border-y border-white/[0.06] bg-black">
      <div className="absolute inset-0 circuit-grid opacity-25" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-28">
        <div>
          <p className="eyebrow">Start with the system</p>
          <h2 className="section-title mt-4">Let's map what you have and what should happen next.</h2>
        </div>
        <div className="border border-white/[0.08] bg-black p-6 sm:p-8">
          <p className="text-lg leading-8 text-white/70">
            Whether you're fixing your own operations or managing systems for clients, start by making the current system visible.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-primary">
              <CalendarCheck size={18} />
              Book a consultation
            </a>
            <a href="/solutions/architecture" className="btn btn-secondary">
              <Map size={18} />
              Explore Pathflow Architecture
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function BusinessesPage() {
  return (
    <>
      <PageHero
        eyebrow="For businesses"
        title="Connected systems for service businesses."
        intro="Pathflow connects the website, lead intake, CRM, automations, documents, reporting, and infrastructure that keep a service business moving."
        primaryCta="Book a consultation"
        secondaryCta="View services"
        secondaryHref="/#services"
      />
      <Section
        eyebrow="Operating system"
        title="The pieces should work as one path."
        intro="A lead should not disappear between a form, inbox, CRM, document request, and follow-up reminder. Pathflow maps the current path, fixes the gaps, and keeps the system understandable."
      >
        <FlowSequence items={['Website', 'Lead intake', 'CRM', 'Documents', 'Follow-up', 'Reporting', 'Care']} />
      </Section>
      <Section eyebrow="Outcomes" title="What the system should do for your team.">
        <CardGrid items={businessOutcomes} />
      </Section>
      <Section
        eyebrow="Common work"
        title="Business systems built around the full lead and client path."
        intro="Pathflow can start with one obvious problem, then connect adjacent pieces when the system needs it."
      >
        <LinkedServiceGrid paths={[
          '/services/lead-intake-automation',
          '/services/crm-automation',
          '/services/workflow-automation',
          '/services/connected-websites',
          '/services/custom-apps',
          '/services/dashboards-reporting',
          '/services/managed-automation',
        ]} />
      </Section>
      <FinalCtaSection />
    </>
  );
}

function ConsultantsPage() {
  return (
    <>
      <PageHero
        eyebrow="For consultants"
        title="Keep every client system understandable."
        intro="Pathflow helps technical consultants, automation consultants, agencies, fractional technical operators, and client-focused developers map what exists, document what was built, and hand off work with context intact."
        primaryCta="Book a consultation"
        secondaryCta="Explore Architecture"
        secondaryHref="/solutions/architecture"
      />
      <Section
        eyebrow="Client system management"
        title="A durable record for the stack your client already has."
        intro="Client work rarely lives in one tool. Pathflow keeps architecture, resources, project documentation, client requests, ownership, and responsibilities attached to the systems they affect."
      >
        <CardGrid items={consultantCapabilities} />
      </Section>
      <Section eyebrow="Platform areas" title="Current Pathflow platform capabilities.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {platformAreas.map(({ title, description, icon: Icon }) => (
            <article className="service-card" key={title}>
              <Icon size={22} className="text-white/70" />
              <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 leading-7 text-white/70">{description}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section
        eyebrow="Handoff"
        title="Clients should know what was built, where it lives, and who owns it."
        intro="Pathflow is useful when a project includes domains, cloud accounts, SaaS tools, repositories, automations, dashboards, secrets, support contacts, and future requests that need to stay connected to the work."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            'Technical consultants documenting implementation choices',
            'Automation consultants handing over CRM and n8n workflows',
            'Agencies maintaining domains, websites, forms, and client infrastructure',
          ].map((item) => (
            <article className="service-detail-item" key={item}>
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white/70" />
              <span>{item}</span>
            </article>
          ))}
        </div>
      </Section>
      <FinalCtaSection />
    </>
  );
}

function ServicesLandingPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Build the pieces. Connect the whole operation."
        intro="Pathflow can fix one part of the workflow or connect the full path across website, intake, CRM, automation, reporting, and care."
        primaryCta="Book a consultation"
        secondaryCta="Start with the flow"
        secondaryHref="/#connections"
      />
      <Section
        eyebrow="Service areas"
        title="The pieces work better when they work together."
        intro="Each service targets a real part of the operating system, but the strongest work usually happens where the parts meet."
      >
        <LinkedServiceGrid paths={[
          '/services/crm-automation',
          '/services/lead-intake-automation',
          '/services/workflow-automation',
          '/services/connected-websites',
          '/services/custom-apps',
          '/services/dashboards-reporting',
          '/services/managed-automation',
          '/services/n8n-automation',
        ]} />
      </Section>
      <ProcessSection />
      <FinalCtaSection />
    </>
  );
}

function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Pathflow platform"
        title="Keep project context connected to the system."
        intro="The Pathflow platform supports the documentation and management layer around client systems: architecture, resources, handoffs, and requests."
        primaryCta="Book a consultation"
        secondaryCta="Explore Architecture"
        secondaryHref="/solutions/architecture"
      />
      <Section
        eyebrow="Platform areas"
        title="Current software areas, described plainly."
        intro="Pathflow is not presented as automatic infrastructure provisioning. It is a practical place to keep the system map, resources, handoff, and requests understandable."
      >
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <CardGrid items={platformAreas} />
          <PlatformPreview />
        </div>
      </Section>
      <FinalCtaSection />
    </>
  );
}

function PlatformArchitecturePage() {
  return (
    <article className="architecture-page">
      <ArchitectureHero />
      <ArchitectureStaleSection />
      <ArchitectureModelSection />
      <ArchitectureNodeMeaningSection />
      <ArchitectureOwnershipSection />
      <ArchitectureMovementSection />
      <ArchitectureStructureSection />
      <ArchitectureHandoffSection />
      <ArchitectureShareSection />
      <ArchitectureAgentContextSection />
      <ArchitectureCapabilitiesSection />
      <ArchitectureProofSection />
      <ArchitectureProductFamilySection />
      <ArchitectureClosingSection />
    </article>
  );
}

function ArchitectureHero() {
  const hasHeroMedia = canRenderArchitectureMedia(architectureMedia.editor);

  return (
    <header id="top" className="architecture-hero relative isolate overflow-hidden pt-32 sm:pt-36">
      <div className="case-study-hero-field" aria-hidden="true" />
      <div className={`architecture-hero-grid ${hasHeroMedia ? 'architecture-hero-grid-with-media' : ''} mx-auto grid max-w-7xl gap-12 px-5 pb-20 sm:px-6 lg:px-8 lg:pb-28`}>
        <div className="max-w-4xl">
          <p className="eyebrow mb-6">Pathflow Architecture</p>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
            See how it all connects.
          </h1>
          <div className="mt-8 max-w-3xl space-y-5 text-lg leading-8 text-white/75 sm:text-xl sm:leading-9">
            <p>
              Map the services, infrastructure, applications and dependencies behind a client project in one living architecture.
            </p>
            <p>
              Build a system map that stays with the project instead of disappearing into a diagram file.
            </p>
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={architectureEditorLink} target="_blank" rel="noreferrer" className="btn btn-primary">
              <Map size={18} />
              Build an architecture
            </a>
            <a href="/platform/mcp" className="btn btn-secondary group">
              See Pathflow MCP
              <ArrowRight size={18} className="cta-arrow" />
            </a>
          </div>
        </div>
        {hasHeroMedia && <ArchitectureProductMedia media={architectureMedia.editor} className="architecture-hero-media" />}
      </div>
    </header>
  );
}

function ArchitectureStaleSection() {
  return (
    <ArchitectureSection
      eyebrow="A living project artifact"
      title="Not another diagram that goes stale."
      intro="Traditional architecture diagrams often become static artifacts. The useful system map is the one that stays near the work it describes."
    >
      <ArchitectureWorkflowContrast />
      <div className="architecture-callout">
        <p>The diagram belongs to the project.</p>
        <span>
          Architecture in Pathflow lives beside the resources, requests, handoffs and operational context it describes.
        </span>
      </div>
    </ArchitectureSection>
  );
}

function ArchitectureWorkflowContrast() {
  return (
    <div className="architecture-workflow-contrast" aria-label="Static diagrams compared with Pathflow Architecture">
      <ArchitectureWorkflowPanel
        title="Static diagram"
        steps={architectureStaticWorkflow}
        tone="muted"
      />
      <ArchitectureWorkflowPanel
        title="Pathflow architecture"
        steps={architectureLivingWorkflow}
        tone="gold"
      />
    </div>
  );
}

function ArchitectureWorkflowPanel({ steps, title, tone }) {
  return (
    <article className={`architecture-workflow-panel architecture-workflow-panel-${tone}`}>
      <p>{title}</p>
      <ol>
        {steps.map((step) => (
          <li key={step}>
            <span aria-hidden="true" />
            <strong>{step}</strong>
          </li>
        ))}
      </ol>
    </article>
  );
}

function ArchitectureModelSection() {
  return (
    <ArchitectureSection
      eyebrow="Real implementation shape"
      title="Model the real system."
      intro="Pathflow Architecture is meant to map the implementation behind client work: the apps, services, infrastructure, repositories, deployments, domains, and outside systems that make the project function."
    >
      <ArchitectureSystemGraphic />
      <dl className="architecture-resource-ledger" aria-label="Objects Pathflow Architecture can describe">
        {architectureResourceGroups.map((group) => (
          <div key={group.label}>
            <dt>{group.label}</dt>
            <dd>{group.examples}</dd>
          </div>
        ))}
      </dl>
    </ArchitectureSection>
  );
}

function ArchitectureSystemGraphic() {
  const nodes = [
    { id: 'domain', label: 'Domain', meta: 'DNS / ownership', x: 56, y: 106, w: 132 },
    { id: 'cloudflare', label: 'Cloudflare', meta: 'edge / DNS', x: 240, y: 106, w: 142, gold: true },
    { id: 'website', label: 'Website', meta: 'client site', x: 456, y: 106, w: 128, gold: true },
    { id: 'github', label: 'GitHub repo', meta: 'source', x: 688, y: 70, w: 138 },
    { id: 'pages', label: 'GitHub Pages', meta: 'deploy target', x: 688, y: 178, w: 150 },
    { id: 'n8n', label: 'n8n', meta: 'automation', x: 456, y: 318, w: 126, gold: true },
    { id: 'crm', label: 'CRM', meta: 'lead record', x: 688, y: 318, w: 112, gold: true },
    { id: 'email', label: 'Email service', meta: 'notification', x: 246, y: 318, w: 142 },
    { id: 'handoff', label: 'Handoff', meta: 'project context', x: 70, y: 410, w: 128 },
  ];
  const edges = [
    { path: 'M188 140H240', label: 'DNS', x: 214, y: 124, gold: true },
    { path: 'M382 140H456', label: 'proxy', x: 419, y: 124, gold: true },
    { path: 'M584 140C630 140 642 104 688 104', label: 'source', x: 632, y: 118 },
    { path: 'M584 140C626 140 642 212 688 212', label: 'deploy', x: 636, y: 178 },
    { path: 'M520 174V318', label: 'submit lead', x: 558, y: 250, gold: true },
    { path: 'M582 352H688', label: 'create record', x: 635, y: 336, gold: true },
    { path: 'M456 352H388', label: 'notify', x: 422, y: 336 },
    { path: 'M246 352C188 352 152 382 134 410', label: 'document', x: 186, y: 384 },
  ];

  return (
    <div className="architecture-system-graphic" aria-labelledby="architecture-system-title architecture-system-desc">
      <svg viewBox="0 0 920 560" role="img">
        <title id="architecture-system-title">Client project architecture map</title>
        <desc id="architecture-system-desc">
          A domain connects through Cloudflare to a website, source repository, deployment target, automation service, CRM, email service, and handoff context.
        </desc>
        <defs>
          <marker id="architecture-system-arrow" markerHeight="9" markerWidth="9" orient="auto" refX="8" refY="4.5">
            <path d="M0,0 L9,4.5 L0,9" fill="rgba(255,255,255,0.55)" />
          </marker>
          <marker id="architecture-system-arrow-gold" markerHeight="9" markerWidth="9" orient="auto" refX="8" refY="4.5">
            <path d="M0,0 L9,4.5 L0,9" fill="rgba(198,161,91,0.9)" />
          </marker>
        </defs>
        <g className="architecture-boundary-shapes" aria-hidden="true">
          <rect x="28" y="40" width="852" height="468" rx="0" />
          <rect x="424" y="44" width="448" height="232" rx="0" />
          <rect x="424" y="288" width="420" height="156" rx="0" />
        </g>
        <g className="architecture-boundary-labels" aria-hidden="true">
          <text x="50" y="72">Client project</text>
          <text x="446" y="72">Deployment boundary</text>
          <text x="446" y="314">Automation boundary</text>
        </g>
        <g className="architecture-system-edges">
          {edges.map((edge) => (
            <g className={edge.gold ? 'architecture-system-edge-gold' : ''} key={edge.label}>
              <path d={edge.path} markerEnd={`url(#${edge.gold ? 'architecture-system-arrow-gold' : 'architecture-system-arrow'})`} />
              <text x={edge.x} y={edge.y} textAnchor="middle">{edge.label}</text>
            </g>
          ))}
        </g>
        <g className="architecture-system-signal" aria-hidden="true">
          <circle r="4">
            <animateMotion dur="13s" repeatCount="indefinite" path="M188 140H240H382H456C496 140 520 174 520 318H582H688" />
          </circle>
        </g>
        <g>
          {nodes.map((node) => (
            <g className={`architecture-system-node ${node.gold ? 'architecture-system-node-gold' : ''}`} transform={`translate(${node.x} ${node.y})`} key={node.id}>
              <rect width={node.w} height="68" />
              <text className="architecture-system-label" x={node.w / 2} y="30" textAnchor="middle">{node.label}</text>
              <text className="architecture-system-meta" x={node.w / 2} y="50" textAnchor="middle">{node.meta}</text>
            </g>
          ))}
        </g>
      </svg>
      <ol className="architecture-system-mobile" aria-label="Highlighted architecture path">
        {['Domain', 'Cloudflare', 'Website', 'n8n', 'CRM', 'Handoff'].map((item, index, items) => (
          <li key={item}>
            <span>{item}</span>
            {index < items.length - 1 && <i aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </div>
  );
}

function ArchitectureNodeMeaningSection() {
  return (
    <section className="architecture-section architecture-split-section">
      <div className="architecture-prose architecture-prose-left">
        <p className="eyebrow">Resources, not rectangles</p>
        <h2>A node should mean something.</h2>
        <p>The useful part of an architecture is not the rectangle.</p>
        <p>It is what that rectangle represents.</p>
        <p>
          Pathflow Architecture is designed around project resources, so the system map can stay connected to the services and infrastructure being described.
        </p>
        <p>
          Nodes can be linked to Pathflow resources where those records exist, while custom and catalog-backed nodes cover the parts of the system that still need to be represented.
        </p>
      </div>
      <ArchitectureNodeRecord />
    </section>
  );
}

function ArchitectureNodeRecord() {
  return (
    <aside className="architecture-node-record" aria-label="Example architecture node detail">
      <div className="architecture-node-record-header">
        <span aria-hidden="true" />
        <div>
          <p>Selected node</p>
          <h3>Cloudflare</h3>
        </div>
      </div>
      <dl>
        <div>
          <dt>Type</dt>
          <dd>Infrastructure / domain edge</dd>
        </div>
        <div>
          <dt>Pathflow resource</dt>
          <dd>Linked project resource</dd>
        </div>
        <div>
          <dt>Notes</dt>
          <dd>DNS, proxy, SSL, redirects, and edge protection context.</dd>
        </div>
      </dl>
    </aside>
  );
}

function ArchitectureOwnershipSection() {
  return (
    <ArchitectureSection
      eyebrow="Operational context"
      title={'Architecture should answer more than "what talks to what?"'}
      intro="Real client systems often mix client-managed services, consultant-managed systems, Pathflow-managed work, third-party infrastructure, cloud boundaries, and project or environment boundaries."
    >
      <div className="architecture-prompt-wall">
        {architectureBoundaryPrompts.map((prompt) => (
          <p key={prompt}>{prompt}</p>
        ))}
      </div>
      <p className="architecture-section-note">
        Architecture gives those relationships a visual place to live. Resource metadata and project records can carry the operational details around ownership, management, URLs, verification, and handoff.
      </p>
    </ArchitectureSection>
  );
}

function ArchitectureMovementSection() {
  return (
    <section className="architecture-section architecture-split-section">
      <ArchitectureRelationshipDetail />
      <div className="architecture-prose architecture-prose-right">
        <p className="eyebrow">Directional relationships</p>
        <h2>Show how the system moves.</h2>
        <p>
          Relationships are not just lines between boxes. Flow relationships can be directional and labeled, while association relationships can show dependency without pretending data is moving.
        </p>
        <p>
          In the editor, a selected edge can be labeled, changed between flow and association, reversed when it is a flow, or deleted without deleting either connected node.
        </p>
      </div>
    </section>
  );
}

function ArchitectureRelationshipDetail() {
  return (
    <figure className="architecture-relationship-detail" aria-labelledby="architecture-relationship-title">
      <figcaption id="architecture-relationship-title">Focused relationship detail</figcaption>
      <svg viewBox="0 0 620 250" role="img" aria-label="A directional architecture relationship from website to automation and CRM">
        <defs>
          <marker id="architecture-relationship-arrow" markerHeight="10" markerWidth="10" orient="auto" refX="9" refY="5">
            <path d="M0,0 L10,5 L0,10" fill="rgba(198,161,91,0.92)" />
          </marker>
        </defs>
        <g className="architecture-edge-detail-lines">
          <path d="M148 125H290" markerEnd="url(#architecture-relationship-arrow)" />
          <path d="M330 125H472" markerEnd="url(#architecture-relationship-arrow)" />
        </g>
        <g className="architecture-edge-detail-labels">
          <text x="219" y="104" textAnchor="middle">webhook</text>
          <text x="401" y="104" textAnchor="middle">create lead</text>
        </g>
        {[
          ['Website', 'form submit', 30],
          ['n8n', 'flow', 260],
          ['CRM', 'record', 472],
        ].map(([label, meta, x]) => (
          <g className="architecture-edge-detail-node" transform={`translate(${x} 88)`} key={label}>
            <rect width="118" height="74" />
            <text x="59" y="32" textAnchor="middle">{label}</text>
            <text className="architecture-edge-detail-meta" x="59" y="52" textAnchor="middle">{meta}</text>
          </g>
        ))}
      </svg>
      <p>Gold highlights the active route. Grey structure stays visible without demanding attention.</p>
    </figure>
  );
}

function ArchitectureStructureSection() {
  return (
    <ArchitectureSection
      eyebrow="Boundaries"
      title="Structure and boundaries."
      intro="A useful system map should show not only the components, but the context they live inside."
    >
      <div className="architecture-boundary-layout">
        <ArchitectureBoundaryStack />
        <div className="architecture-prose architecture-prose-right">
          <p>
            Architecture supports environment, system, and network boundaries, including VPC and subnet structure. Subnets can be marked public, private, or unspecified when that distinction matters.
          </p>
          <p>
            The point is not to make an AWS-only diagram. Mixed client systems often include cloud resources, SaaS tools, consultant-managed infrastructure, websites, automation services, and client-owned accounts in the same operational picture.
          </p>
        </div>
      </div>
    </ArchitectureSection>
  );
}

function ArchitectureBoundaryStack() {
  return (
    <figure className="architecture-boundary-stack" aria-label="Nested architecture boundaries">
      <div className="architecture-boundary-box architecture-boundary-box-system">
        <span>System boundary</span>
        <div className="architecture-boundary-box architecture-boundary-box-network">
          <span>Network / VPC</span>
          <div className="architecture-subnet-grid">
            <div>Public subnet</div>
            <div>Private subnet</div>
          </div>
        </div>
        <div className="architecture-boundary-box architecture-boundary-box-environment">
          <span>Environment boundary</span>
        </div>
      </div>
    </figure>
  );
}

function ArchitectureHandoffSection() {
  return (
    <ArchitectureSection
      eyebrow="Handoff"
      title="Leave behind something the next person can understand."
      intro="The person receiving a project should not have to reverse-engineer what was built. A Pathflow architecture can stay with the project and become part of the handoff to the client or the next consultant."
    >
      <ArchitectureLifecyclePath />
    </ArchitectureSection>
  );
}

function ArchitectureLifecyclePath() {
  return (
    <ol className="architecture-lifecycle-path" aria-label="Architecture handoff lifecycle">
      {architectureHandoffSteps.map((step, index) => (
        <li key={step}>
          <span aria-hidden="true" />
          <strong>{step}</strong>
          {index < architectureHandoffSteps.length - 1 && <i aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}

function ArchitectureShareSection() {
  return (
    <section className="architecture-section architecture-split-section architecture-share-section">
      <div className="architecture-prose architecture-prose-left">
        <p className="eyebrow">Read-only sharing</p>
        <h2>Share the system, not the editor.</h2>
        <p>
          Share a clean, read-only view of the architecture when someone needs to understand the system without editing it.
        </p>
        <p>
          The shared view includes the diagram and client-safe metadata, and the share can be disabled when that public link should no longer be available.
        </p>
      </div>
      <div>
        <ArchitectureSharePreview />
        <ArchitectureProductMedia media={architectureMedia.sharedView} />
      </div>
    </section>
  );
}

function ArchitectureSharePreview() {
  return (
    <aside className="architecture-share-preview" aria-label="Read-only sharing flow">
      {['Enable public link', 'Read-only architecture view', 'Disable when access ends'].map((item, index, items) => (
        <div key={item}>
          <span aria-hidden="true" />
          <strong>{item}</strong>
          {index < items.length - 1 && <i aria-hidden="true" />}
        </div>
      ))}
    </aside>
  );
}

function ArchitectureAgentContextSection() {
  return (
    <ArchitectureSection
      eyebrow="Architecture and MCP"
      title="A system map agents can read."
      intro="Pathflow MCP can retrieve saved architecture diagrams, including their nodes and edges. That means the same architecture can become context for agent-assisted work without giving agents infrastructure access by itself."
    >
      <div className="architecture-audience-rail" aria-label="Who uses the system map">
        {[
          ['Clients', 'Understand what they own.'],
          ['Consultants', 'Understand what they maintain.'],
          ['Agents', 'Understand the system around the work.'],
        ].map(([label, text]) => (
          <article key={label}>
            <p>{label}</p>
            <h3>{text}</h3>
          </article>
        ))}
      </div>
      <a href="/platform/mcp" className="btn btn-primary mt-10 group">
        Explore Pathflow MCP
        <ArrowRight size={18} className="cta-arrow" />
      </a>
    </ArchitectureSection>
  );
}

function ArchitectureCapabilitiesSection() {
  return (
    <ArchitectureSection
      eyebrow="Editor capabilities"
      title="Current Architecture editor capabilities."
      intro="The editor is built for saved, shareable system maps with meaningful nodes, directional relationships, boundaries, notes, resource attachment, and practical editing controls."
    >
      <div className="architecture-capability-list">
        {architectureCapabilities.map((group) => (
          <article className="architecture-capability-group" key={group.label}>
            <h3>{group.label}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </ArchitectureSection>
  );
}

function ArchitectureProofSection() {
  const hasProjectExample = canRenderArchitectureMedia(architectureMedia.projectExample);

  return (
    <section className="architecture-section architecture-proof-section">
      <div className={`architecture-proof ${hasProjectExample ? 'architecture-proof-with-media' : ''}`}>
        <div className="architecture-prose architecture-prose-left">
          <p className="eyebrow">Built with Pathflow Architecture</p>
          <h2>Built for real client systems.</h2>
          <p>
            When a project architecture is safe to show publicly, this section can carry the product proof. Until then, the page avoids invented counts, hidden infrastructure details, or fake proof metrics.
          </p>
        </div>
        {hasProjectExample && <ArchitectureProductMedia media={architectureMedia.projectExample} />}
      </div>
    </section>
  );
}

function ArchitectureProductFamilySection() {
  return (
    <ArchitectureSection
      eyebrow="Product family"
      title="Architecture describes the system. MCP makes that context available to agents."
    >
      <div className="architecture-family-flow" aria-label="Pathflow product relationship">
        <a href="/solutions/architecture">
          <span aria-hidden="true" />
          <strong>Architecture</strong>
          <small>Saved nodes, edges, resources, and boundaries</small>
        </a>
        <i aria-hidden="true" />
        <a href="/platform/mcp">
          <span aria-hidden="true" />
          <strong>MCP</strong>
          <small>Structured project context for agent-assisted work</small>
        </a>
      </div>
    </ArchitectureSection>
  );
}

function ArchitectureClosingSection() {
  return (
    <section className="architecture-section architecture-closing-section">
      <div className="architecture-prose">
        <div className="case-study-closing-statement">
          <p>Systems, made clear.</p>
        </div>
        <div className="architecture-closing-lines" aria-label="Pathflow Architecture closing statement">
          <p>Map what exists.</p>
          <p>Understand how it connects.</p>
          <p>Leave behind something the next person can actually use.</p>
        </div>
        <a href={architectureEditorLink} target="_blank" rel="noreferrer" className="btn btn-primary mt-8 group">
          <Map size={18} />
          Build an architecture
          <ArrowRight size={18} className="cta-arrow" />
        </a>
      </div>
    </section>
  );
}

function ArchitectureSection({ children, eyebrow, intro, title }) {
  return (
    <section className="architecture-section">
      <div className="architecture-section-inner">
        <div className="architecture-section-heading">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          {intro && <p>{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function ArchitectureProductMedia({ media, className = '' }) {
  const [failed, setFailed] = React.useState(false);

  if (!canRenderArchitectureMedia(media) || (failed && !import.meta.env.DEV)) {
    return null;
  }

  const showEmbed = Boolean(media.embedSrc);
  const showPlaceholder = !showEmbed && (media.pending || failed);

  return (
    <figure
      className={`architecture-media architecture-media-${media.layout || 'standard'} ${showEmbed ? 'architecture-media-embed' : ''} ${showPlaceholder ? 'architecture-media-placeholder' : ''} ${className}`}
      style={{ '--media-aspect': media.aspectRatio || '16 / 10' }}
    >
      <div className="architecture-media-frame">
        {showEmbed ? (
          <iframe
            src={media.embedSrc}
            title={media.alt}
            loading="lazy"
            allow="fullscreen"
          />
        ) : showPlaceholder ? (
          <div className="architecture-media-placeholder-inner" role="img" aria-label={`Pending screenshot: ${media.alt}`}>
            <span>Pending product screenshot</span>
            <code>{media.src}</code>
          </div>
        ) : (
          <a href={media.src} className="case-study-media-link" target="_blank" rel="noreferrer" aria-label={`View full-size image: ${media.alt}`}>
            <img
              src={media.src}
              alt={media.alt}
              loading="lazy"
              decoding="async"
              onError={() => setFailed(true)}
            />
          </a>
        )}
      </div>
      {media.caption && <figcaption>{media.caption}</figcaption>}
    </figure>
  );
}

function canRenderArchitectureMedia(media) {
  return Boolean(media && (!media.pending || import.meta.env.DEV));
}

function PathflowDocumentsPage() {
  return (
    <article className="documents-page">
      <DocumentsHero />
      <DocumentsUseModesSection />
      <DocumentsWorkflowSection />
      <DocumentsClientIdentitySection />
      <DocumentsIntelligenceSection />
      <DocumentsStorageSection />
      <DocumentsDeveloperSection />
      <DocumentsManagedSection />
      <DocumentsStateSection />
      <DocumentsControlsSection />
      <DocumentsProofSection />
      <DocumentsClosingSection />
    </article>
  );
}

function DocumentsHero() {
  return (
    <header id="top" className="documents-hero relative isolate overflow-hidden pt-32 sm:pt-36">
      <div className="case-study-hero-field" aria-hidden="true" />
      <div className="documents-hero-grid mx-auto grid max-w-7xl gap-12 px-5 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="max-w-4xl">
          <p className="eyebrow mb-6">Pathflow Documents</p>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
            Client documents, handled.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/75 sm:text-xl sm:leading-9">
            Connect your inbox, CRM, and storage. Pathflow identifies incoming documents, matches them to the right client, organizes them, and keeps the workflow moving.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={documentsProductLink} className="btn btn-primary group">
              <FileCheck2 size={18} />
              Start with Documents
              <ArrowRight size={18} className="cta-arrow" />
            </a>
            <a href={documentsDeveloperLink} className="btn btn-secondary group">
              <Code2 size={18} />
              Build with the API
            </a>
          </div>
        </div>
        <DocumentsHeroWorkflow />
      </div>
    </header>
  );
}

function DocumentsHeroWorkflow() {
  const steps = [
    ['Gmail', 'vladimir@getpathflow.com'],
    ['Matched client', 'Vladimir Belsch'],
    ['Document', 'Notice of Assessment', '98% confidence'],
    ['Google Drive', 'Clients / Vladimir Belsch / Tax'],
  ];

  return (
    <figure className="documents-hero-workflow" aria-label="Pathflow Documents workflow from Gmail to matched client, document classification, and Google Drive filing">
      <div className="documents-workflow-grid" aria-hidden="true" />
      <figcaption>
        <span>Live document event</span>
        <strong>Intake resolved</strong>
      </figcaption>
      <ol>
        {steps.map(([label, value, meta], index) => (
          <li key={label}>
            <div className={`documents-workflow-node ${index === 2 ? 'documents-workflow-node-gold' : ''}`}>
              <p>{label}</p>
              <strong>{value}</strong>
              {meta && <small>{meta}</small>}
            </div>
            {index < steps.length - 1 && <i aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </figure>
  );
}

function DocumentsUseModesSection() {
  return (
    <DocumentsSection eyebrow="One service, two ways to use it" title="Use Pathflow your way.">
      <div className="documents-mode-grid">
        <article className="documents-mode-card documents-mode-card-gold">
          <Inbox size={22} aria-hidden="true" />
          <h3>Connect your systems.</h3>
          <p>
            Use the managed Pathflow experience when the business wants Gmail, Google Drive, CRM connections, deployment, monitoring, and maintenance handled together.
          </p>
          <ul>
            {documentsManagedItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a href={documentsProductLink} className="btn btn-primary mt-7 group">
            Start with Documents
            <ArrowRight size={18} className="cta-arrow" />
          </a>
        </article>
        <article className="documents-mode-card">
          <Code2 size={22} aria-hidden="true" />
          <h3>Keep the infrastructure you already have.</h3>
          <p>
            Already use n8n or your own backend? Call the Pathflow Documents API from your existing workflow while keeping your own orchestration and infrastructure.
          </p>
          <ul>
            {documentsApiItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a href={documentsDeveloperLink} className="btn btn-secondary mt-7 group">
            View developer docs
            <ArrowRight size={18} className="cta-arrow" />
          </a>
        </article>
      </div>
    </DocumentsSection>
  );
}

function DocumentsWorkflowSection() {
  return (
    <DocumentsSection
      eyebrow="Document workflow automation"
      title="From inbox to the right place."
      intro="Pathflow Documents turns incoming files into structured document events. Documents can arrive through connected services or the API, while Pathflow maintains the relationship between the client, the document, and its storage location."
    >
      <ol className="documents-workflow-strip" aria-label="Document workflow automation sequence">
        {documentsWorkflowSteps.map((step, index) => (
          <li key={step.label}>
            <span>{step.label}</span>
            <strong>{step.description}</strong>
            {index < documentsWorkflowSteps.length - 1 && <i aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </DocumentsSection>
  );
}

function DocumentsClientIdentitySection() {
  return (
    <section className="documents-section documents-split-section">
      <div className="documents-prose documents-prose-left">
        <p className="eyebrow">Client identity</p>
        <h2>Files need an owner, not just a folder.</h2>
        <p>
          Exact sender-email matching can resolve a client when the relationship is known. CRM IDs and internal mappings stay authoritative, while folder names remain human-readable presentation.
        </p>
        <p>
          Pathflow maintains the underlying client to storage relationship. If Pathflow cannot establish the client confidently, the document can be held for review instead of being filed by assumption.
        </p>
      </div>
      <DocumentsIdentityGraph />
    </section>
  );
}

function DocumentsIdentityGraph() {
  return (
    <aside className="documents-identity-graph" aria-label="Client identity matching model">
      {[
        ['Incoming sender', 'vladimir@getpathflow.com'],
        ['CRM contact', 'Vladimir Belsch'],
        ['Pathflow client identity', 'Stable internal mapping'],
        ['Storage binding', 'Google Drive folder'],
      ].map(([label, value], index, items) => (
        <div className="documents-identity-row" key={label}>
          <span aria-hidden="true" />
          <div>
            <p>{label}</p>
            <strong>{value}</strong>
          </div>
          {index < items.length - 1 && <i aria-hidden="true" />}
        </div>
      ))}
    </aside>
  );
}

function DocumentsIntelligenceSection() {
  return (
    <section className="documents-section documents-split-section documents-intelligence-section">
      <DocumentsIntelligencePanel />
      <div className="documents-prose documents-prose-right">
        <p className="eyebrow">Pathflow Intelligence</p>
        <h2>Understand the document before moving it.</h2>
        <p>
          Pathflow Intelligence is narrowly scoped to structured document understanding. It can classify documents and extract metadata for the surrounding workflow to validate and act on.
        </p>
        <p>
          Intelligence determines what the document appears to be. Pathflow routing rules determine what happens next.
        </p>
      </div>
    </section>
  );
}

function DocumentsIntelligencePanel() {
  return (
    <aside className="documents-intelligence-panel" aria-label="Document understanding example">
      <div className="documents-panel-header">
        <FileSearch size={18} aria-hidden="true" />
        <div>
          <p>Sample-NOA.pdf</p>
          <strong>Structured result</strong>
        </div>
      </div>
      <dl>
        {[
          ['Document type', 'Notice of Assessment'],
          ['Tax year', '2025'],
          ['Confidence', '98%'],
          ['Suggested filename', 'Vladimir_Belsch_NOA_2025.pdf'],
        ].map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

function DocumentsStorageSection() {
  return (
    <DocumentsSection
      eyebrow="Automated filing"
      title="A filing system that maintains itself."
      intro="Start with an opinionated structure or configure how client folders, document categories, and filenames should be organized."
    >
      <div className="documents-storage-layout">
        <DocumentsFolderTree />
        <div className="documents-storage-principles" aria-label="Storage organization principles">
          {['Human-readable folders', 'Stable client mappings', 'Configurable routing'].map((item) => (
            <article key={item}>
              <FolderOpen size={18} aria-hidden="true" />
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </div>
    </DocumentsSection>
  );
}

function DocumentsFolderTree() {
  return (
    <figure className="documents-folder-tree" aria-label="Example Google Drive folder structure for organized client documents">
      {documentsFolderRows.map(([label, level]) => (
        <div className={`documents-folder-row documents-folder-level-${level}`} key={label}>
          <span aria-hidden="true" />
          <strong>{label}</strong>
        </div>
      ))}
    </figure>
  );
}

function DocumentsDeveloperSection() {
  return (
    <section className="documents-section documents-split-section documents-developer-section">
      <div className="documents-prose documents-prose-left">
        <p className="eyebrow">For consultants and developers</p>
        <h2>Bring the workflow. Use the document layer.</h2>
        <p>
          Pathflow Documents does not require replacing n8n, custom apps, automation platforms, backend services, or agent workflows. Call the API where document handling belongs, then let your infrastructure continue the workflow.
        </p>
        <p>
          This makes the document-processing layer useful for agencies, consultants, developers, and internal automation teams that want structured document results without moving every system into Pathflow.
        </p>
        <a href={documentsDeveloperLink} className="btn btn-primary mt-8 group">
          Explore the Documents API
          <ArrowRight size={18} className="cta-arrow" />
        </a>
      </div>
      <DocumentsApiFlow />
    </section>
  );
}

function DocumentsApiFlow() {
  return (
    <aside className="documents-api-flow" aria-label="Documents API workflow from n8n or backend to Pathflow and back to existing infrastructure">
      {[
        ['Your n8n or application', 'existing workflow'],
        ['Pathflow Documents API', 'classify, resolve, organize, track'],
        ['Structured document result', 'metadata and event state'],
        ['Your infrastructure continues', 'CRM, storage, notifications, agents'],
      ].map(([label, description], index, items) => (
        <div className={index === 1 ? 'documents-api-flow-core' : ''} key={label}>
          <p>{label}</p>
          <strong>{description}</strong>
          {index < items.length - 1 && <i aria-hidden="true" />}
        </div>
      ))}
    </aside>
  );
}

function DocumentsManagedSection() {
  return (
    <section className="documents-section documents-split-section">
      <DocumentsManagedStatus />
      <div className="documents-prose documents-prose-right">
        <p className="eyebrow">Managed by Pathflow</p>
        <h2>Connect it. We run it.</h2>
        <p>
          Pathflow can operate Documents as a managed service. Connect supported systems through the Pathflow interface while deployment, monitoring, updates, and maintenance remain managed.
        </p>
      </div>
    </section>
  );
}

function DocumentsManagedStatus() {
  return (
    <aside className="documents-status-panel" aria-label="Managed Pathflow Documents service status">
      <div className="documents-panel-header">
        <MonitorCheck size={18} aria-hidden="true" />
        <div>
          <p>Pathflow Documents</p>
          <strong>Managed service</strong>
        </div>
      </div>
      <dl>
        {[
          ['Gmail', 'Connected'],
          ['Google Drive', 'Connected'],
          ['Mailbox listener', 'Healthy'],
          ['Document processing', 'Healthy'],
          ['Managed by', 'Pathflow'],
        ].map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd><span aria-hidden="true" />{value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

function DocumentsStateSection() {
  return (
    <DocumentsSection
      eyebrow="Beyond filing"
      title="Know what arrived. Know what is still missing."
      intro="As the workflow expands, document state is designed to support checklists, CRM updates, and follow-up workflows so teams can move beyond filing and understand what still needs attention."
    >
      <div className="documents-checklist-panel" aria-label="Future document checklist state example">
        <div>
          <p>Vladimir Belsch</p>
          <strong>Document requirements</strong>
        </div>
        <ul>
          {[
            ['Identification', true],
            ['Employment Letter', true],
            ['T4', true],
            ['Notice of Assessment', false],
            ['Bank Statements', false],
          ].map(([label, done]) => (
            <li className={done ? 'documents-checklist-complete' : ''} key={label}>
              <span aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </DocumentsSection>
  );
}

function DocumentsControlsSection() {
  return (
    <DocumentsSection
      eyebrow="Controlled automation"
      title="Automate the repetitive part. Keep control of the decisions."
    >
      <div className="documents-control-grid">
        {documentsControlItems.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </DocumentsSection>
  );
}

function DocumentsProofSection() {
  return (
    <section className="documents-section documents-proof-section">
      <div className="documents-proof">
        <div className="documents-prose documents-prose-left">
          <p className="eyebrow">Pathflow Documents in use</p>
          <h2>Built around real document workflows.</h2>
          <p>
            This section is ready for a sanitized product screenshot once there is a client-safe example to show. The page avoids invented metrics, testimonials, or processing counts.
          </p>
        </div>
        <figure className="documents-product-placeholder" aria-label="Pending product screenshot placeholder">
          <div>
            <span>Pending product screenshot</span>
            <code>/solutions/documents/document-table.png</code>
          </div>
          <figcaption>Use a sanitized product screenshot here once a client-safe example is ready.</figcaption>
        </figure>
      </div>
    </section>
  );
}

function DocumentsClosingSection() {
  return (
    <section className="documents-section documents-closing-section">
      <div className="documents-prose">
        <p className="eyebrow">Pathflow Documents</p>
        <h2>Stop filing client documents by hand.</h2>
        <p>Connect your systems or call the API from the workflow you already use.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={documentsProductLink} className="btn btn-primary group">
            Start with Documents
            <ArrowRight size={18} className="cta-arrow" />
          </a>
          <a href={documentsDeveloperLink} className="btn btn-secondary">
            Build with the API
          </a>
        </div>
      </div>
    </section>
  );
}

function DocumentsSection({ children, eyebrow, intro, title }) {
  return (
    <section className="documents-section">
      <div className="documents-section-inner">
        <div className="documents-section-heading">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          {intro && <p>{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function PathflowHandoffsPage() {
  const hasFarmFinancingCaseStudy = Boolean(caseStudiesByPath['/work/farm-financing-ontario']);

  return (
    <article className="handoff-page">
      <HandoffHero hasFarmFinancingCaseStudy={hasFarmFinancingCaseStudy} />
      <HandoffProblemSection />
      <HandoffComparisonSection />
      <HandoffProjectConnectionSection />
      <HandoffIncludedSection />
      <HandoffItemsSection />
      <HandoffArchitectureSection />
      <HandoffResourcesSection />
      <HandoffClientInviteSection />
      <HandoffOngoingSection />
      <HandoffMcpSection />
      <HandoffHistorySection />
      {hasFarmFinancingCaseStudy && <HandoffProofSection />}
      <HandoffAudienceValueSection />
      <HandoffProductFamilySection />
      <HandoffClosingSection />
    </article>
  );
}

function HandoffHero({ hasFarmFinancingCaseStudy }) {
  return (
    <header id="top" className="handoff-hero relative isolate overflow-hidden pt-32 sm:pt-36">
      <div className="case-study-hero-field" aria-hidden="true" />
      <div className="handoff-hero-grid mx-auto grid max-w-7xl gap-12 px-5 pb-20 sm:px-6 lg:grid-cols-[minmax(0,0.96fr)_minmax(24rem,0.72fr)] lg:px-8 lg:pb-28">
        <div className="max-w-5xl">
          <p className="eyebrow mb-6">Pathflow Handoffs</p>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
            Deliver the project with its context intact.
          </h1>
          <div className="mt-8 max-w-3xl space-y-5 text-lg leading-8 text-white/75 sm:text-xl sm:leading-9">
            <p>Turn completed consulting work into a handoff your client can actually use.</p>
            <p>
              Package the architecture, resources, instructions, access context and project history behind the work, then invite the client into the same project where ongoing requests and future changes can continue.
            </p>
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={platformLink} className="btn btn-primary">
              <FileCheck2 size={18} />
              Create a handoff
            </a>
            {hasFarmFinancingCaseStudy && (
              <a href="/work/farm-financing-ontario" className="btn btn-secondary group">
                See a real client workflow
                <ArrowRight size={18} className="cta-arrow" />
              </a>
            )}
          </div>
        </div>
        <HandoffHeroGraph />
      </div>
    </header>
  );
}

function HandoffHeroGraph() {
  const nodes = [
    { label: 'Consultant', meta: 'finished work', x: 32, y: 174, w: 132, gold: true },
    { label: 'Project', meta: 'context hub', x: 220, y: 174, w: 116, gold: true },
    { label: 'Architecture', meta: 'system map', x: 424, y: 64, w: 148, gold: true },
    { label: 'Resources', meta: 'services + links', x: 432, y: 174, w: 132, gold: true },
    { label: 'Instructions', meta: 'how it changes', x: 420, y: 284, w: 154, gold: true },
    { label: 'Handoff', meta: 'client package', x: 668, y: 174, w: 122, gold: true },
    { label: 'Client', meta: 'future access', x: 850, y: 174, w: 104, gold: true },
  ];

  return (
    <figure className="handoff-hero-graph" aria-labelledby="handoff-hero-graph-title handoff-hero-graph-desc">
      <svg viewBox="0 0 980 420" role="img">
        <title id="handoff-hero-graph-title">Pathflow handoff delivery topology</title>
        <desc id="handoff-hero-graph-desc">
          Consultant work flows into a project, connects architecture, resources and instructions, then becomes a handoff the client can continue from.
        </desc>
        <defs>
          <marker id="handoff-hero-arrow" markerHeight="9" markerWidth="9" orient="auto" refX="8" refY="4.5">
            <path d="M0,0 L9,4.5 L0,9" fill="rgba(198,161,91,0.92)" />
          </marker>
        </defs>
        <g className="handoff-graph-neutral-lines" aria-hidden="true">
          <path d="M164 208H220" />
          <path d="M336 208H432" />
          <path d="M336 202C386 190 398 116 424 98" />
          <path d="M336 214C386 226 394 318 420 318" />
          <path d="M572 98C638 106 668 142 668 208" />
          <path d="M564 208H668" />
          <path d="M574 318C638 310 668 270 668 208" />
          <path d="M790 208H850" />
        </g>
        <g className="handoff-graph-gold-paths">
          <path d="M164 208H278H336" />
          <path d="M336 202C386 190 398 116 424 98" />
          <path d="M336 208H432H564H668" />
          <path d="M336 214C386 226 394 318 420 318" />
          <path d="M790 208H850" markerEnd="url(#handoff-hero-arrow)" />
        </g>
        <g className="handoff-graph-signal" aria-hidden="true">
          <circle r="4">
            <animateMotion dur="13s" repeatCount="indefinite" path="M164 208H278H336H432H564H668H790H850" />
          </circle>
        </g>
        {nodes.map((node) => (
          <g className={`handoff-graph-node ${node.gold ? 'handoff-graph-node-gold' : ''}`} transform={`translate(${node.x} ${node.y})`} key={node.label}>
            <rect width={node.w} height="68" />
            <text className="handoff-graph-label" x={node.w / 2} y="30" textAnchor="middle">{node.label}</text>
            <text className="handoff-graph-meta" x={node.w / 2} y="50" textAnchor="middle">{node.meta}</text>
          </g>
        ))}
      </svg>
      <ol className="handoff-hero-mobile" aria-label="Pathflow handoff delivery path">
        {['Consultant', 'Project', 'Architecture / resources / instructions', 'Handoff', 'Client'].map((item, index, items) => (
          <li key={item}>
            <span>{item}</span>
            {index < items.length - 1 && <i aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </figure>
  );
}

function HandoffProblemSection() {
  return (
    <HandoffSection
      eyebrow="The context gap"
      title="The work is done. The context usually isn't."
      intro="Delivery often ends right when the client starts needing ownership-level clarity."
    >
      <div className="handoff-question-wall" aria-label="Questions clients still need answered after a project is delivered">
        {handoffProblemPrompts.map((prompt) => (
          <p key={prompt}>{prompt}</p>
        ))}
      </div>
      <p className="handoff-strong-line">
        A project is not fully delivered if understanding it still depends on the person who built it being available.
      </p>
    </HandoffSection>
  );
}

function HandoffComparisonSection() {
  return (
    <HandoffSection
      eyebrow="Handoff model"
      title="Fragmented delivery versus connected delivery."
      intro="A handoff should not ask the client to stitch the project back together from inbox threads, folders and links."
    >
      <div className="handoff-comparison-grid" aria-label="Typical handoff compared with Pathflow handoff">
        <HandoffFlowPanel title="Typical handoff" steps={handoffTypicalSteps} tone="muted" />
        <HandoffFlowPanel title="Pathflow handoff" steps={handoffPathflowSteps} tone="gold" />
      </div>
    </HandoffSection>
  );
}

function HandoffFlowPanel({ steps, title, tone }) {
  return (
    <article className={`handoff-flow-panel handoff-flow-panel-${tone}`}>
      <p>{title}</p>
      <ol>
        {steps.map((step) => (
          <li key={step}>
            <span aria-hidden="true" />
            <strong>{step}</strong>
          </li>
        ))}
      </ol>
    </article>
  );
}

function HandoffProjectConnectionSection() {
  return (
    <section className="handoff-section handoff-split-section">
      <div className="handoff-prose handoff-prose-left">
        <p className="eyebrow">Connected to the project</p>
        <h2>The handoff belongs to the project.</h2>
        <p>
          A Pathflow handoff is not an isolated export. It stays connected to the project alongside the resources, architecture, requests, activity and client context around the work.
        </p>
        <p>
          The client receives access to the project where the work continues to live, so the handoff can become a starting point for later questions instead of a dead end.
        </p>
        <p className="handoff-strong-line">The handoff stays connected to the project.</p>
      </div>
      <HandoffProjectOrbit />
    </section>
  );
}

function HandoffProjectOrbit() {
  const items = ['Architecture', 'Resources', 'Requests', 'Activity', 'Handoff'];

  return (
    <figure className="handoff-project-orbit" aria-label="Project-centered handoff context">
      <div className="handoff-project-core">
        <span>Project</span>
        <small>context hub</small>
      </div>
      <div className="handoff-project-spokes">
        {items.map((item) => (
          <div key={item}>
            <span aria-hidden="true" />
            <strong>{item}</strong>
          </div>
        ))}
      </div>
    </figure>
  );
}

function HandoffIncludedSection() {
  return (
    <HandoffSection
      eyebrow="What a handoff can include"
      title="A client-facing package built from real project objects."
      intro="Pathflow handoffs organize the delivery record into sections a client can review without needing to inspect the consultant workspace."
    >
      <dl className="handoff-ledger">
        {handoffIncludedRows.map((row) => (
          <div key={row.label}>
            <dt>{row.label}</dt>
            <dd>{row.description}</dd>
          </div>
        ))}
      </dl>
      <HandoffMediaStrip mediaKeys={['editor']} />
    </HandoffSection>
  );
}

function HandoffItemsSection() {
  return (
    <section className="handoff-section handoff-split-section">
      <div className="handoff-prose handoff-prose-left">
        <p className="eyebrow">Handoff items</p>
        <h2>Break the delivery into understandable pieces.</h2>
        <p>
          Handoff items make the project concrete. Each piece can explain what was delivered, where it lives, who manages it, how access works, and what should happen next.
        </p>
        <p>
          The same handoff can mix deliverables, systems, resources, operational notes, important changes, credential references, and client next steps.
        </p>
      </div>
      <div className="handoff-item-board" aria-label="Illustrative handoff item examples and questions">
        <p>Example items</p>
        <ul className="handoff-item-examples">
          {handoffItemExamples.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="handoff-item-questions">
          {handoffItemQuestions.map((question) => (
            <span key={question}>{question}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function HandoffArchitectureSection() {
  return (
    <section className="handoff-section handoff-split-section handoff-architecture-section">
      <div className="handoff-prose handoff-prose-left">
        <p className="eyebrow">Architecture integration</p>
        <h2>Show the system you are handing over.</h2>
        <p>
          The client should not only receive a list of links. The system map should remain available beside the handoff, so the resources and services behind the delivery can be understood as a connected project.
        </p>
        <p>
          Pathflow Architecture keeps the visual system map close to the handoff instead of sending the client away to reverse-engineer a diagram file.
        </p>
        <a href="/solutions/architecture" className="btn btn-primary mt-8">
          <Map size={18} />
          Explore Pathflow Architecture
        </a>
      </div>
      <HandoffArchitectureMiniMap />
    </section>
  );
}

function HandoffArchitectureMiniMap() {
  return (
    <figure className="handoff-mini-map" aria-labelledby="handoff-mini-map-title handoff-mini-map-desc">
      <svg viewBox="0 0 620 340" role="img">
        <title id="handoff-mini-map-title">Architecture available beside a handoff</title>
        <desc id="handoff-mini-map-desc">
          A project architecture map connects resources and services to the client handoff.
        </desc>
        <defs>
          <marker id="handoff-mini-arrow" markerHeight="9" markerWidth="9" orient="auto" refX="8" refY="4.5">
            <path d="M0,0 L9,4.5 L0,9" fill="rgba(198,161,91,0.9)" />
          </marker>
        </defs>
        <g className="handoff-mini-boundary" aria-hidden="true">
          <rect x="28" y="34" width="564" height="260" />
          <text x="48" y="66">Client project</text>
        </g>
        <g className="handoff-graph-neutral-lines">
          <path d="M148 152H252" />
          <path d="M252 152H372" />
          <path d="M252 152C252 92 306 82 358 82" />
          <path d="M252 152C252 216 308 228 360 228" />
        </g>
        <g className="handoff-graph-gold-paths">
          <path d="M148 152H252H372H478" markerEnd="url(#handoff-mini-arrow)" />
        </g>
        {[
          { label: 'Architecture', meta: 'diagram', x: 54, y: 118, w: 118, gold: true },
          { label: 'Resources', meta: 'records', x: 202, y: 118, w: 106, gold: true },
          { label: 'Systems', meta: 'services', x: 352, y: 48, w: 102 },
          { label: 'Instructions', meta: 'change notes', x: 336, y: 194, w: 126 },
          { label: 'Handoff', meta: 'delivery', x: 456, y: 118, w: 104, gold: true },
        ].map((node) => (
          <g className={`handoff-graph-node ${node.gold ? 'handoff-graph-node-gold' : ''}`} transform={`translate(${node.x} ${node.y})`} key={node.label}>
            <rect width={node.w} height="68" />
            <text className="handoff-graph-label" x={node.w / 2} y="30" textAnchor="middle">{node.label}</text>
            <text className="handoff-graph-meta" x={node.w / 2} y="50" textAnchor="middle">{node.meta}</text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

function HandoffResourcesSection() {
  return (
    <HandoffSection
      eyebrow="Resources integration"
      title="Hand off the things behind the diagram."
      intro="Resources give the client and future collaborators a way to understand the accounts, services, links, and ownership context that sit behind the visible system."
    >
      <div className="handoff-resource-rail" aria-label="Resource types commonly referenced by a handoff">
        {handoffResourceTypes.map((resource) => (
          <span key={resource}>{resource}</span>
        ))}
      </div>
      <p className="handoff-section-note">
        Credential-related handoff items can reference where access belongs and who owns it, while keeping secret values out of the client-facing handoff.
      </p>
    </HandoffSection>
  );
}

function HandoffClientInviteSection() {
  return (
    <section className="handoff-section handoff-split-section">
      <div className="handoff-prose handoff-prose-left">
        <p className="eyebrow">Client invitation</p>
        <h2>The client gets more than an email.</h2>
        <p>
          The handoff invitation brings the client back into the project, where the completed work, client-facing notes, resources, and responses can live together.
        </p>
        <p>
          Depending on the configured delivery setup, Pathflow can send the handoff email or record that the handoff was sent. The client can then sign in or create an account and review the project.
        </p>
      </div>
      <HandoffSequence steps={handoffInviteSteps} label="Client invitation workflow" />
      <HandoffMediaStrip mediaKeys={['email', 'clientProject', 'handoffView']} className="handoff-media-strip-full" />
    </section>
  );
}

function HandoffOngoingSection() {
  return (
    <HandoffSection
      eyebrow="Ongoing work"
      title="Handoff does not have to mean goodbye."
      intro="When a client needs another change later, the same project can become the place the next request starts."
    >
      <HandoffLoop />
    </HandoffSection>
  );
}

function HandoffLoop() {
  return (
    <ol className="handoff-loop" aria-label="Handoff to future request workflow">
      {handoffRequestLoopSteps.map((step, index) => (
        <li className={index === 0 || index === 1 || index === 5 ? 'handoff-loop-gold' : ''} key={step}>
          <span aria-hidden="true" />
          <strong>{step}</strong>
        </li>
      ))}
    </ol>
  );
}

function HandoffMcpSection() {
  return (
    <section className="handoff-section handoff-split-section handoff-mcp-section">
      <div className="handoff-prose handoff-prose-left">
        <p className="eyebrow">Handoffs and MCP</p>
        <h2>Agents can close the loop too.</h2>
        <p>
          Pathflow MCP can make handoff context available to agents and help write completed work back into the same delivery workflow humans use.
        </p>
        <p>
          It does not make Pathflow an implementation or deployment engine. The work still happens through the right external tools; the delivery state comes back to the project.
        </p>
        <a href="/platform/mcp" className="btn btn-secondary mt-8 group">
          See Pathflow MCP
          <ArrowRight size={18} className="cta-arrow" />
        </a>
      </div>
      <ul className="handoff-mcp-list" aria-label="Handoff capabilities available through Pathflow MCP">
        {handoffMcpItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function HandoffHistorySection() {
  return (
    <HandoffSection
      eyebrow="Project history"
      title="Delivery that leaves a record."
      intro="A useful handoff is more than a final document. It should leave a visible project record of what was prepared, sent, viewed, accepted, questioned, or sent back for revision."
    >
      <div className="handoff-history-rail" aria-label="Handoff activity states">
        {handoffRecordEvents.map((event) => (
          <span key={event}>{event}</span>
        ))}
      </div>
    </HandoffSection>
  );
}

function HandoffProofSection() {
  return (
    <section className="handoff-section handoff-proof-section">
      <div className="handoff-proof">
        <div>
          <p className="eyebrow">Used on real client work</p>
          <h2>Farm Financing Ontario has a maintainable delivery record.</h2>
        </div>
        <div>
          <p>
            The public site, lead intake path, CRM delivery, deployment, domain, and SEO content structure were built as one connected client system.
          </p>
          <p>
            After launch, routine updates can still move through Pathflow as accepted work, recorded completion, handoff, and client notification.
          </p>
          <a href="/work/farm-financing-ontario" className="btn btn-primary mt-6 group">
            Read the Farm Financing Ontario case study
            <ArrowRight size={18} className="cta-arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}

function HandoffAudienceValueSection() {
  return (
    <HandoffSection
      eyebrow="Why it matters"
      title="The delivery value is different on each side of the table."
    >
      <div className="handoff-audience-grid">
        {handoffAudienceValues.map((value) => (
          <article key={value.title}>
            <p>{value.label}</p>
            <h3>{value.title}</h3>
            <span>{value.description}</span>
          </article>
        ))}
      </div>
    </HandoffSection>
  );
}

function HandoffProductFamilySection() {
  return (
    <HandoffSection
      eyebrow="Product family"
      title="One project context, three connected views."
      intro="Architecture, MCP and Handoffs describe different parts of the same continuity problem."
    >
      <div className="handoff-family-flow" aria-label="Pathflow product family">
        {handoffProductFamily.map((item, index) => (
          <React.Fragment key={item.title}>
            <a href={item.href} className={item.title === 'Handoffs' ? 'handoff-family-active' : ''}>
              <span aria-hidden="true" />
              <strong>{item.title}</strong>
              <small>{item.description}</small>
            </a>
            {index < handoffProductFamily.length - 1 && <i aria-hidden="true" />}
          </React.Fragment>
        ))}
      </div>
    </HandoffSection>
  );
}

function HandoffClosingSection() {
  return (
    <section className="handoff-section handoff-closing-section">
      <div className="handoff-prose">
        <div className="case-study-closing-statement">
          <p>Finish the work.</p>
          <p>Keep the understanding.</p>
        </div>
        <p>
          Pathflow Handoffs turn delivery into a project-connected record that clients, consultants and agents can come back to later.
        </p>
        <p className="case-study-kicker">Build it. Explain it. Hand it over properly.</p>
        <a href={platformLink} className="btn btn-primary mt-8">
          <FileCheck2 size={18} />
          Open Pathflow
        </a>
      </div>
    </section>
  );
}

function HandoffSequence({ steps, label }) {
  return (
    <ol className="handoff-sequence" aria-label={label}>
      {steps.map((step, index) => (
        <li key={step}>
          <span aria-hidden="true" />
          <strong>{step}</strong>
          {index < steps.length - 1 && <i aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}

function HandoffMediaStrip({ mediaKeys, className = '' }) {
  const visibleMedia = mediaKeys
    .map((mediaKey) => handoffMedia[mediaKey])
    .filter(canRenderHandoffMedia);

  if (visibleMedia.length === 0) return null;

  return (
    <div className={`handoff-media-grid ${className}`}>
      {visibleMedia.map((media) => (
        <HandoffProductMedia media={media} key={media.src} />
      ))}
    </div>
  );
}

function HandoffProductMedia({ media, className = '' }) {
  const [failed, setFailed] = React.useState(false);

  if (!canRenderHandoffMedia(media) || (failed && !import.meta.env.DEV)) {
    return null;
  }

  const showPlaceholder = media.pending || failed;

  return (
    <figure
      className={`handoff-media handoff-media-${media.layout || 'standard'} ${showPlaceholder ? 'handoff-media-placeholder' : ''} ${className}`}
      style={{ '--media-aspect': media.aspectRatio || '16 / 10' }}
    >
      <div className="handoff-media-frame">
        {showPlaceholder ? (
          <div className="handoff-media-placeholder-inner" role="img" aria-label={`Pending screenshot: ${media.alt}`}>
            <span>Pending product screenshot</span>
            <code>{media.src}</code>
          </div>
        ) : (
          <a href={media.src} className="case-study-media-link" target="_blank" rel="noreferrer" aria-label={`View full-size image: ${media.alt}`}>
            <img
              src={media.src}
              alt={media.alt}
              loading="lazy"
              decoding="async"
              onError={() => setFailed(true)}
            />
          </a>
        )}
      </div>
      {media.caption && <figcaption>{media.caption}</figcaption>}
    </figure>
  );
}

function canRenderHandoffMedia(media) {
  return Boolean(media && (!media.pending || import.meta.env.DEV));
}

function HandoffSection({ children, className = '', eyebrow, intro, title }) {
  return (
    <section className={`handoff-section ${className}`}>
      <div className="handoff-section-inner">
        <div className="handoff-section-heading">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          {intro && <p>{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function PathflowMcpPage() {
  const hasFarmFinancingCaseStudy = Boolean(caseStudiesByPath['/work/farm-financing-ontario']);

  return (
    <article className="mcp-page">
      <McpHero hasFarmFinancingCaseStudy={hasFarmFinancingCaseStudy} />
      <McpPromptSection />
      <McpWorkflowSection />
      <McpCapabilitiesSection />
      <McpAuditSection />
      <McpContextSection />
      <McpArchitectureRelationshipSection />
      <McpDeploymentBoundarySection />
      <McpConsultantWorkflowSection />
      <McpNotSection />
      {hasFarmFinancingCaseStudy && <McpProofSection />}
      <McpClosingSection />
    </article>
  );
}

function McpHero({ hasFarmFinancingCaseStudy }) {
  return (
    <header id="top" className="mcp-hero relative isolate overflow-hidden pt-32 sm:pt-36">
      <div className="case-study-hero-field" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(22rem,0.7fr)] lg:px-8 lg:pb-28">
        <div className="max-w-5xl">
          <p className="eyebrow mb-6">Pathflow MCP</p>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
            Give agents the context behind the work.
          </h1>
          <div className="mt-8 max-w-3xl space-y-5 text-lg leading-8 text-white/75 sm:text-xl sm:leading-9">
            <p>
              Pathflow MCP connects AI agents to the projects, requests, resources, architecture, tasks, deployments, and handoffs already managed in Pathflow.
            </p>
            <p>
              Instead of rebuilding project context inside every prompt, agents can retrieve the current state of the work, act through the appropriate tools, and write the outcome back into Pathflow.
            </p>
          </div>
          <ul className="mcp-context-chip-list mt-8" aria-label="Pathflow context available through MCP">
            {mcpContextObjects.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-primary">
              <CalendarCheck size={18} />
              Get started
            </a>
            {hasFarmFinancingCaseStudy && (
              <a href="/work/farm-financing-ontario" className="btn btn-secondary group">
                See it used in real client work
                <ArrowRight size={18} className="cta-arrow" />
              </a>
            )}
          </div>
        </div>
        <McpHeroGraph />
      </div>
    </header>
  );
}

function McpHeroGraph() {
  return (
    <div className="mcp-hero-graph hidden lg:block" aria-hidden="true">
      <svg viewBox="0 0 460 420">
        <g className="mcp-graph-neutral-lines">
          <path d="M96 68V126" />
          <path d="M96 126L222 178" />
          <path d="M222 178L118 238" />
          <path d="M222 178L226 284" />
          <path d="M222 178L342 238" />
          <path d="M226 284V346" />
        </g>
        <path className="mcp-graph-gold-line" d="M96 68V126L222 178L226 284V346" />
        {[
          { label: 'Request', x: 46, y: 42, gold: true },
          { label: 'Project', x: 45, y: 112, gold: true },
          { label: 'Tasks', x: 68, y: 224 },
          { label: 'Architecture', x: 290, y: 224 },
          { label: 'Resources', x: 168, y: 164, gold: true },
          { label: 'Agent', x: 178, y: 270, gold: true },
          { label: 'Handoff', x: 170, y: 332, gold: true },
        ].map((node) => (
          <g className={`mcp-hero-node ${node.gold ? 'mcp-hero-node-gold' : ''}`} transform={`translate(${node.x} ${node.y})`} key={node.label}>
            <circle cx="8" cy="8" r="6" />
            <text x="24" y="13">{node.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function McpPromptSection() {
  return (
    <section className="mcp-section mcp-section-tight">
      <div className="mcp-prose">
        <p className="eyebrow">MCP context</p>
        <h2>The instruction does not need to carry the whole project.</h2>
        <p>A client submits a request in Pathflow.</p>
        <p>
          The request is already attached to the project, documented architecture, surrounding resources, open tasks, and current delivery state.
        </p>
        <p>Through MCP, an agent can retrieve the relevant context before it acts.</p>
        <PromptExample text="Review the accepted request and prepare the update." />
        <p>The instruction stays short because the project record carries the details.</p>
        <p className="mcp-strong-line">The useful part is not the wording. It is the context behind it.</p>
      </div>
    </section>
  );
}

function PromptExample({ text, label = 'Example instruction' }) {
  return (
    <figure className="mcp-prompt-example">
      <figcaption>{label}</figcaption>
      <pre><code>{text}</code></pre>
    </figure>
  );
}

function McpWorkflowSection() {
  return (
    <section className="mcp-section">
      <div className="mcp-prose">
        <p className="eyebrow">From request to handoff</p>
        <h2>The normal delivery loop stays connected.</h2>
        <p>
          Pathflow contains the request and project context. The agent can retrieve that context, use external tools where implementation belongs, and write state, tasks, and work logs back into Pathflow.
        </p>
        <p>
          The result is not a completed task stranded inside an agent session. The normal client-delivery workflow continues afterward.
        </p>
      </div>
      <McpWorkflowPath items={mcpWorkflowSteps} />
    </section>
  );
}

function McpWorkflowPath({ items }) {
  return (
    <ol className="mcp-workflow-path" aria-label="Request to handoff workflow">
      {items.map((item, index) => (
        <li key={item} className={index === 1 || index === 3 || index === 4 ? 'mcp-workflow-pathflow' : ''}>
          <span aria-hidden="true" />
          <strong>{item}</strong>
        </li>
      ))}
    </ol>
  );
}

function McpCapabilitiesSection() {
  return (
    <section className="mcp-section">
      <div className="mcp-prose">
        <p className="eyebrow">Current MCP capabilities</p>
        <h2>Project context as operational objects.</h2>
        <p>
          Pathflow MCP exposes the records that already describe delivery work: clients, projects, requests, attachments, tasks, activity, resources, architecture, deployment state, and handoffs.
        </p>
      </div>
      <div className="mcp-capability-list">
        {mcpCapabilities.map((capability) => (
          <McpCapabilitySection capability={capability} key={capability.eyebrow} />
        ))}
      </div>
    </section>
  );
}

function McpCapabilitySection({ capability }) {
  return (
    <article className="mcp-capability">
      <div>
        <p>{capability.eyebrow}</p>
        <h3>{capability.title}</h3>
        <span>{capability.description}</span>
        {capability.emphasis && <strong>{capability.emphasis}</strong>}
      </div>
      <ul>
        {capability.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function McpAuditSection() {
  return (
    <section className="mcp-section mcp-split-section">
      <div className="mcp-prose mcp-prose-left">
        <p className="eyebrow">Work that leaves a trail</p>
        <h2>Meaningful changes return to visible project state.</h2>
        <p>
          Most meaningful changes remain visible through the same project activity and workflow state humans already use.
        </p>
        <p>
          That can include request lifecycle changes, task completion, structured work logs, recorded resource or deployment state changes, and handoffs.
        </p>
      </div>
      <div className="mcp-trail-list" aria-label="Examples of visible Pathflow state">
        {['Request lifecycle', 'Task completion', 'Work logs', 'Resource state', 'Recorded deployment state', 'Handoffs'].map((item, index) => (
          <div style={{ '--trail-index': index }} key={item}>
            <span aria-hidden="true" />
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function McpContextSection() {
  return (
    <section className="mcp-section">
      <div className="mcp-prose">
        <p className="eyebrow">Selective project context</p>
        <h2>The agent works against an existing project graph.</h2>
        <p>
          A request does not need every possible piece of context. Pathflow MCP lets an agent retrieve the pieces that matter for the current work and understand how they relate to the project.
        </p>
      </div>
      <McpContextGraph />
    </section>
  );
}

function McpContextGraph() {
  return (
    <div className="mcp-context-graph" aria-labelledby="mcp-context-title mcp-context-desc">
      <svg viewBox="0 0 980 480" role="img">
        <title id="mcp-context-title">Pathflow context graph for agent-assisted work</title>
        <desc id="mcp-context-desc">
          A request connects to a project, architecture, resources, tasks, activity, deployments, handoff, and an agent retrieving selected context.
        </desc>
        <g className="mcp-graph-neutral-lines">
          <path d="M150 226H392" />
          <path d="M486 226H732" />
          <path d="M440 190L440 82" />
          <path d="M440 262L440 360" />
          <path d="M392 246L254 346" />
          <path d="M486 246L640 346" />
          <path d="M486 206L642 112" />
          <path d="M392 206L260 112" />
          <path d="M770 226H880" />
        </g>
        <g className="mcp-graph-gold-paths">
          <path d="M150 226H440H732H880" />
          <path d="M440 226V82" />
          <path d="M440 226L640 346" />
          <path d="M440 226V360" />
        </g>
        <g className="mcp-graph-signal" aria-hidden="true">
          <circle r="4">
            <animateMotion dur="13s" repeatCount="indefinite" path="M150 226H440H732H880" />
          </circle>
        </g>
        {[
          { label: 'Request', meta: 'current work', x: 42, y: 194, w: 126, gold: true },
          { label: 'Project', meta: 'relationship hub', x: 392, y: 194, w: 104, gold: true },
          { label: 'Resources', meta: 'recorded state', x: 724, y: 194, w: 126, gold: true },
          { label: 'Agent', meta: 'selective retrieval', x: 856, y: 194, w: 108, gold: true },
          { label: 'Architecture', meta: 'nodes + edges', x: 366, y: 46, w: 148, gold: true },
          { label: 'Tasks', meta: 'checklist', x: 196, y: 78, w: 112 },
          { label: 'Deployments', meta: 'recorded state', x: 596, y: 78, w: 142 },
          { label: 'Activity', meta: 'project trail', x: 374, y: 360, w: 132, gold: true },
          { label: 'Handoff', meta: 'client delivery', x: 588, y: 342, w: 126, gold: true },
          { label: 'Attachments', meta: 'request files', x: 190, y: 342, w: 138 },
        ].map((node) => (
          <g className={`mcp-context-node ${node.gold ? 'mcp-context-node-gold' : ''}`} transform={`translate(${node.x} ${node.y})`} key={node.label}>
            <rect width={node.w} height="64" />
            <text className="mcp-context-label" x={node.w / 2} y="29" textAnchor="middle">{node.label}</text>
            <text className="mcp-context-meta" x={node.w / 2} y="48" textAnchor="middle">{node.meta}</text>
          </g>
        ))}
      </svg>
      <ol className="mcp-context-mobile" aria-label="Selective request context path">
        {['Request', 'Project', 'Architecture', 'Resources', 'Agent', 'Activity', 'Handoff'].map((item, index, items) => (
          <li key={item}>
            <span>{item}</span>
            {index < items.length - 1 && <i aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </div>
  );
}

function McpArchitectureRelationshipSection() {
  return (
    <section className="mcp-section mcp-architecture-relationship">
      <div className="mcp-prose">
        <p className="eyebrow">Architecture and MCP</p>
        <h2>Architecture describes the system. MCP makes that context available to agents.</h2>
        <p>
          Pathflow Architecture remains the system map for humans: resources, boundaries, services, owners, and relationships.
        </p>
        <p>
          Pathflow MCP gives agents structured access to that same project context without presenting future runtime functionality as already available.
        </p>
        <a href="/solutions/architecture" className="btn btn-primary mt-8">
          <Map size={18} />
          Explore Pathflow Architecture
        </a>
      </div>
    </section>
  );
}

function McpDeploymentBoundarySection() {
  return (
    <section className="mcp-section">
      <div className="mcp-prose">
        <p className="eyebrow">Deployment boundary</p>
        <h2>Pathflow coordinates the work. It does not deploy infrastructure itself.</h2>
        <p>
          Pathflow MCP can expose and update recorded resource and deployment state, manage requests and work logs, and coordinate the handoff around a deployment.
        </p>
        <p>The actual deployment still happens through the appropriate external system.</p>
        <p>
          For example, a GitHub Pages deployment can happen through GitHub Actions while Pathflow tracks the request, project state, work log, and handoff surrounding that deployment.
        </p>
      </div>
      <McpDeploymentBoundaryDiagram />
    </section>
  );
}

function McpDeploymentBoundaryDiagram() {
  return (
    <ol className="mcp-boundary-flow" aria-label="Pathflow coordination and external deployment execution">
      {mcpDeploymentBoundarySteps.map((step) => (
        <li className={step.scope.startsWith('Pathflow') ? 'mcp-boundary-pathflow' : 'mcp-boundary-external'} key={step.label}>
          <span aria-hidden="true" />
          <strong>{step.label}</strong>
          <small>{step.scope}</small>
        </li>
      ))}
    </ol>
  );
}

function McpConsultantWorkflowSection() {
  return (
    <section className="mcp-section mcp-split-section">
      <div className="mcp-prose mcp-prose-left">
        <p className="eyebrow">Built for consultant workflows</p>
        <h2>Specific project delivery context, not generic agent memory.</h2>
      </div>
      <div className="mcp-prose mcp-prose-right">
        <p>
          Pathflow MCP is designed around project delivery rather than generic agent memory.
        </p>
        <p>
          The objects exposed through MCP already describe the work consultants perform: clients, projects, requests, attachments, tasks, resources, architecture, deployment state, and handoffs.
        </p>
        <p className="mcp-strong-line">MCP makes that existing context available to the agents helping perform the work.</p>
      </div>
    </section>
  );
}

function McpNotSection() {
  return (
    <section className="mcp-section mcp-not-section">
      <div className="mcp-prose">
        <p className="eyebrow">Boundaries</p>
        <h2>What Pathflow MCP is not.</h2>
        <ul className="mcp-not-list">
          {[
            'An infrastructure deployment engine',
            'A replacement for GitHub Actions',
            'A replacement for Terraform',
            'A replacement for cloud-provider APIs',
            'A standalone autonomous agent runtime',
          ].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>
          Agents still use the appropriate external tools to perform implementation and deployment work.
        </p>
        <p>
          Pathflow provides the project context, workflow state, and client-delivery record around that execution.
        </p>
      </div>
    </section>
  );
}

function McpProofSection() {
  return (
    <section className="mcp-section mcp-proof-section">
      <div className="mcp-proof">
        <div>
          <p className="eyebrow">Used on real client work</p>
          <h2>A launched website became easier to maintain.</h2>
        </div>
        <div>
          <p>Farm Financing Ontario was first built as a complete website, intake, CRM, deployment, and SEO system.</p>
          <p>Once that context existed in Pathflow, routine maintenance no longer needed a long re-explanation:</p>
          <PromptExample text="Review the accepted request and update the site." />
          <p>
            Pathflow supplied the surrounding project and request context. The update could be completed, recorded in Pathflow, handed off, and returned to the client without rebuilding the project history inside the agent session.
          </p>
          <a href="/work/farm-financing-ontario" className="btn btn-primary mt-6 group">
            Read the Farm Financing Ontario case study
            <ArrowRight size={18} className="cta-arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}

function McpClosingSection() {
  return (
    <section className="mcp-section mcp-closing-section">
      <div className="mcp-prose">
        <div className="case-study-closing-statement">
          <p>The system already has the context.</p>
          <p>Let your agents use it.</p>
        </div>
        <p>
          Pathflow MCP turns the project state already stored in Pathflow into structured context for agent-assisted work.
        </p>
        <p>
          From request intake to task updates, work logs, and final handoff, the operational record stays connected to the work itself.
        </p>
        <p className="case-study-kicker">Less prompting. Less reconstruction. Better continuity.</p>
        <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-primary mt-8">
          <CalendarCheck size={18} />
          Get started
        </a>
      </div>
    </section>
  );
}

function ResourcesPage() {
  const [filters, setFilters] = React.useState(() => getResourceFilterState());
  const selectedTopic = filters.topic;
  const selectedType = filters.type;
  const selectedTopicItem = resourceTopicItems.find((topic) => topic.slug === selectedTopic);
  const selectedTypeFilter = resourceTypeFilters.find((filter) => filter.value === selectedType);
  const topicFilter = selectedTopicItem ? selectedTopicItem.slug : '';
  const typeFilter = selectedTypeFilter ? selectedTypeFilter.value : '';
  const hasFilter = Boolean(topicFilter || typeFilter);
  const filteredResources = resourceIndexItems.filter((resource) => {
    const topicMatches = topicFilter ? resource.topicSlugs.includes(topicFilter) : true;
    const typeMatches = typeFilter ? resource.type === typeFilter : true;

    return topicMatches && typeMatches;
  });
  const guidesSection = resourceSections.find((section) => section.type === 'guide');
  const secondarySections = resourceSections.filter((section) => section.type !== 'guide');

  React.useEffect(() => {
    function handlePopState() {
      setFilters(getResourceFilterState());
    }

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  function handleResourceFilterClick(event, href) {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();

    const nextUrl = new URL(href, window.location.origin);
    const nextPath = `${nextUrl.pathname}${nextUrl.search}`;
    const currentPath = `${window.location.pathname}${window.location.search}`;

    if (nextPath !== currentPath) {
      window.history.pushState({}, '', nextPath);
    }

    setFilters(getResourceFilterState(nextUrl.search));
  }

  return (
    <article className="resource-index-page">
      <section id="top" className="resource-index-hero relative isolate overflow-hidden pt-32 sm:pt-36">
        <div className="case-study-hero-field" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8 lg:pb-24">
          <div className="max-w-4xl">
            <p className="eyebrow mb-6">Resources</p>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[1.04] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Practical notes for building, delivering and operating client systems.
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/75 sm:text-xl sm:leading-9">
              Guides, architecture patterns and field notes for consultants and technical teams working across infrastructure, automation, delivery and operations.
            </p>
          </div>
        </div>
      </section>

      <section className="resource-hub-section resource-latest-section">
        <div className="resource-hub-wrap">
          <ResourceHubHeader
            eyebrow="Latest"
            title="Newest field-manual entries."
            description="Recent resources for decisions that affect implementation, delivery and operations."
          />
          <div className="resource-latest-grid">
            {latestResourceIndexItems.map((item, index) => (
              <ResourceListingItem item={item} variant={index === 0 ? 'latest-featured' : 'latest'} key={item.path} />
            ))}
          </div>
        </div>
      </section>

      {guidesSection && (
        <section className="resource-hub-section resource-guides-section">
          <div className="resource-hub-wrap">
            <ResourceHubHeader eyebrow="Guides" title="Guides" description={guidesSection.description} />
            <div className="resource-guide-list">
              {guidesSection.items.slice(0, 6).map((item) => (
                <ResourceListingItem item={item} variant="guide" key={item.path} />
              ))}
            </div>
          </div>
        </section>
      )}

      {secondarySections.map((section) => (
        <section className={`resource-hub-section resource-${section.type}-section`} key={section.type}>
          <div className="resource-hub-wrap">
            <ResourceHubHeader eyebrow={section.typeLabel} title={section.title} description={section.description} />
            <div className={section.type === 'field-note' ? 'resource-note-list' : 'resource-pattern-list'}>
              {section.items.map((item) => (
                <ResourceListingItem item={item} variant={section.type === 'field-note' ? 'field-note' : 'pattern'} key={item.path} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="resource-hub-section resource-browse-section">
        <div className="resource-hub-wrap">
          <ResourceHubHeader
            eyebrow="Browse"
            title="Browse by topic"
            description="Filter the field manual by the area of the system you are working on."
          />
          <div className="resource-filter-panel" aria-label="Resource filters">
            <div>
              <p>Content type</p>
              <div className="resource-filter-row">
                {resourceTypeFilters.map((filter) => {
                  const href = resourceFilterHref({ type: filter.value, topic: topicFilter });
                  const active = filter.value === typeFilter;

                  return (
                    <a
                      className={`resource-filter-chip ${active ? 'resource-filter-chip-active' : ''}`}
                      href={href}
                      aria-current={active ? 'true' : undefined}
                      key={filter.label}
                      onClick={(event) => handleResourceFilterClick(event, href)}
                    >
                      <span>{filter.label}</span>
                      <small>{active ? 'Active' : filter.count}</small>
                    </a>
                  );
                })}
              </div>
            </div>
            <div>
              <p>Topics</p>
              <div className="resource-filter-row">
                <a
                  className={`resource-filter-chip ${!topicFilter ? 'resource-filter-chip-active' : ''}`}
                  href={resourceFilterHref({ type: typeFilter })}
                  aria-current={!topicFilter ? 'true' : undefined}
                  onClick={(event) => handleResourceFilterClick(event, resourceFilterHref({ type: typeFilter }))}
                >
                  <span>All topics</span>
                  <small>{!topicFilter ? 'Active' : resourceIndexItems.length}</small>
                </a>
                {resourceTopicItems.map((topic) => {
                  const active = topic.slug === topicFilter;

                  return (
                    <a
                      className={`resource-filter-chip ${active ? 'resource-filter-chip-active' : ''}`}
                      href={resourceFilterHref({ type: typeFilter, topic: topic.slug })}
                      aria-current={active ? 'true' : undefined}
                      key={topic.slug}
                      onClick={(event) => handleResourceFilterClick(event, resourceFilterHref({ type: typeFilter, topic: topic.slug }))}
                    >
                      <span>{topic.label}</span>
                      <small>{active ? 'Active' : topic.count}</small>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="resource-filter-results">
            <div className="resource-filter-summary">
              <p>{hasFilter ? 'Filtered resources' : 'All resources'}</p>
              <span>{filteredResources.length} published {filteredResources.length === 1 ? 'resource' : 'resources'}</span>
            </div>
            <div className="resource-note-list">
              {filteredResources.map((item) => (
                <ResourceListingItem item={item} variant="compact" key={item.path} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

function getResourceFilterState(search = window.location.search) {
  const searchParams = new URLSearchParams(search);

  return {
    topic: searchParams.get('topic') || '',
    type: searchParams.get('type') || '',
  };
}

function ResourceHubHeader({ eyebrow, title, description }) {
  return (
    <div className="resource-hub-header">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <span>{description}</span>}
    </div>
  );
}

function ResourceListingItem({ item, variant = 'guide' }) {
  const isFeatured = variant === 'latest-featured';
  const shouldShowImage = Boolean(item.image && (variant === 'latest-featured' || variant === 'latest'));

  return (
    <a href={item.path} className={`resource-listing-item resource-listing-item-${variant} group`}>
      <div className="resource-listing-body">
        <ResourceListingMeta item={item} />
        <h3>{item.shortTitle || item.title}</h3>
        <p>{item.description}</p>
        <ResourceTopicChips topics={item.topics.slice(0, isFeatured ? 4 : 3)} />
        {shouldShowImage && <ResourceListingImage image={item.image} />}
      </div>
      <div className="resource-listing-footer">
        <span>{formatResourceDate(item.publishedAt)}</span>
        <span>{item.readingTime}</span>
        <ArrowRight size={16} className="cta-arrow" aria-hidden="true" />
      </div>
    </a>
  );
}

function ResourceListingImage({ image }) {
  return (
    <figure className="resource-listing-media" aria-label={image.alt}>
      <img src={image.src} alt={image.alt} loading="lazy" />
    </figure>
  );
}

function ResourceListingMeta({ item }) {
  return (
    <div className="resource-listing-meta">
      <span>{item.typeLabel}</span>
      {item.topics.slice(0, 2).map((topic) => (
        <span key={topic}>{topic}</span>
      ))}
    </div>
  );
}

function ResourceTopicChips({ topics }) {
  return (
    <div className="resource-topic-chips" aria-label="Resource topics">
      {topics.map((topic) => (
        <span key={topic}>{topic}</span>
      ))}
    </div>
  );
}

function resourceFilterHref({ topic = '', type = '' }) {
  const params = new URLSearchParams();
  if (topic) params.set('topic', topic);
  if (type) params.set('type', type);
  const query = params.toString();

  return query ? `/resources?${query}` : '/resources';
}

function formatResourceDate(value) {
  if (!value) return '';
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`));
}

function ResourceArticlePage({ article }) {
  const tocItems = article.sections
    .filter((section) => section.title && section.type !== 'sources')
    .map((section) => ({ id: section.id, title: section.title }));

  return (
    <article className="resource-article-page">
      <ResourceArticleHero article={article} />
      <ResourceArticleToc items={tocItems} />
      {article.sections.map((section) => (
        <ResourceArticleSection article={article} section={section} key={section.id} />
      ))}
    </article>
  );
}

function ResourceArticleHero({ article }) {
  return (
    <header id="top" className="resource-article-hero relative isolate overflow-hidden pt-32 sm:pt-36">
      <div className="case-study-hero-field" aria-hidden="true" />
      <div className="mx-auto max-w-5xl px-5 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <p className="eyebrow mb-6">{article.eyebrow}</p>
        <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
          {article.title}
        </h1>
        <p className="resource-article-lede">{article.description}</p>
        <p className="resource-article-dek">{article.dek}</p>
        <ul className="resource-article-meta" aria-label="Article metadata">
          {article.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
          <li>{formatResourceDate(article.publishedAt)}</li>
          <li>{article.readingTime}</li>
        </ul>
      </div>
    </header>
  );
}

function ResourceArticleToc({ items }) {
  return (
    <nav className="resource-article-toc" aria-label="Article sections">
      <div>
        <p>In this guide</p>
        <ol>
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`}>{item.title}</a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

function ResourceArticleSection({ article, section }) {
  switch (section.type) {
    case 'intro':
      return <ResourceIntroSection section={section} />;
    case 'short':
      return <ResourceShortSection section={section} />;
    case 'models':
      return <ResourceModelsSection section={section} />;
    case 'questions':
      return <ResourceQuestionsSection section={section} />;
    case 'fit':
      return <ResourceFitSection section={section} />;
    case 'comparison':
      return <ResourceComparisonSection section={section} />;
    case 'documentation':
      return <ResourceDocumentationSection section={section} />;
    case 'default':
      return <ResourceDefaultSection section={section} />;
    case 'proof-placeholder':
      return <ResourceProofPlaceholder article={article} section={section} />;
    case 'architecture-cta':
      return <ResourceArchitectureCta section={section} />;
    case 'contextual-cta':
      return <ResourceContextualCta section={section} />;
    case 'checklist':
      return <ResourceChecklistSection section={section} />;
    case 'sources':
      return <ResourceSourcesSection article={article} section={section} />;
    default:
      return <ResourceProseSection section={section} />;
  }
}

function ResourceIntroSection({ section }) {
  return (
    <section id={section.id} className="resource-article-section resource-article-intro">
      <div className="resource-article-prose">
        <h2 className="sr-only">Introduction</h2>
        <ResourceParagraphs paragraphs={section.paragraphs} />
        {section.media && <ResourceArticleImage media={section.media} />}
        {section.questions?.length > 0 && (
          <div className="resource-question-wall" aria-label={section.questionsLabel || 'Article key questions'}>
            {section.questions.map((question) => (
              <p key={question}>{question}</p>
            ))}
          </div>
        )}
        <p className="resource-article-emphasis">{section.closing}</p>
      </div>
    </section>
  );
}

function ResourceArticleImage({ media }) {
  return (
    <figure className="resource-article-media">
      <img src={media.src} alt={media.alt} loading={media.loading || 'lazy'} decoding="async" />
      {media.caption && <figcaption>{media.caption}</figcaption>}
    </figure>
  );
}

function ResourceShortSection({ section }) {
  return (
    <section id={section.id} className="resource-article-section resource-short-section">
      <div className="resource-article-prose">
        <p className="eyebrow">Early summary</p>
        <h2>{section.title}</h2>
        <div className="resource-summary-block">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResourceProseSection({ section }) {
  return (
    <ResourceArticleShell section={section}>
      <ResourceParagraphs paragraphs={section.paragraphs} />
      {section.diagram && <ResourceDiagram diagram={section.diagram} />}
      {section.diagrams?.map((diagram) => (
        <ResourceDiagram diagram={diagram} key={diagram.label} />
      ))}
      {section.codeBlocks && <ResourceCodeStack blocks={section.codeBlocks} />}
      {section.list && <ResourceBulletGroup title={section.listTitle} items={section.list} />}
      {section.records && <ResourceRecordList records={section.records} />}
      {section.examples && <ResourceExampleStack examples={section.examples} />}
      {section.paragraphsAfter && <ResourceParagraphs paragraphs={section.paragraphsAfter} />}
      {section.emphasis && <p className="resource-article-emphasis">{section.emphasis}</p>}
      {section.relatedLinks && <ResourceRelatedLinks links={section.relatedLinks} />}
      {section.relatedLink && <ResourceRelatedLink link={section.relatedLink} />}
    </ResourceArticleShell>
  );
}

function ResourceModelsSection({ section }) {
  return (
    <ResourceArticleShell section={section}>
      <p>{section.intro}</p>
      <div className="resource-model-list">
        {section.models.map((model) => (
          <article key={model.title}>
            <h3>{model.title}</h3>
            <p>{model.description}</p>
          </article>
        ))}
      </div>
    </ResourceArticleShell>
  );
}

function ResourceQuestionsSection({ section }) {
  return (
    <ResourceArticleShell section={section}>
      <p>{section.intro}</p>
      <div className="resource-question-wall resource-question-wall-compact" aria-label="Automation ownership questions">
        {section.questions.map((question) => (
          <p key={question}>{question}</p>
        ))}
      </div>
      <p className="resource-article-emphasis">{section.emphasis}</p>
    </ResourceArticleShell>
  );
}

function ResourceFitSection({ section }) {
  return (
    <ResourceArticleShell section={section}>
      <p>{section.intro}</p>
      <ResourceBulletGroup items={section.points} />
      <ResourceDiagram diagram={section.diagram} />
      <p className="resource-article-emphasis">{section.closing}</p>
    </ResourceArticleShell>
  );
}

function ResourceComparisonSection({ section }) {
  return (
    <ResourceArticleShell section={section}>
      <p>{section.intro}</p>
      <div className="resource-comparison-axis" aria-label="Zapier and n8n delivery tradeoff">
        {section.sides.map((side) => (
          <article key={side.title}>
            <p>{side.title}</p>
            <strong>{side.top}</strong>
            <span aria-hidden="true" />
            <strong>{side.bottom}</strong>
          </article>
        ))}
      </div>
    </ResourceArticleShell>
  );
}

function ResourceDocumentationSection({ section }) {
  return (
    <ResourceArticleShell section={section}>
      <p>{section.intro}</p>
      <ResourceBulletGroup items={section.points} />
      {section.architectureDiagram && <ResourceArchitectureDiagram />}
      <p>{section.closing}</p>
    </ResourceArticleShell>
  );
}

function ResourceDefaultSection({ section }) {
  return (
    <ResourceArticleShell section={section}>
      <ResourceParagraphs paragraphs={section.paragraphs} />
      <div className="resource-default-visual" aria-label="Responsible automation delivery compared with a deployment shortcut">
        <article>
          <p>Responsible delivery</p>
          <ol>
            {section.completeStack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>
        <article>
          <p>Shortcut</p>
          <code>{section.shortcut}</code>
        </article>
      </div>
    </ResourceArticleShell>
  );
}

function ResourceProofPlaceholder({ article, section }) {
  const caseStudy = article.caseStudyReference || article.futureCaseStudy;
  const caseStudyTitle = caseStudy.title || `${caseStudy.company} case study`;
  const caseStudyAvailable = Boolean(caseStudy.available || caseStudy.active);

  return (
    <section id={section.id} className="resource-article-section resource-proof-placeholder-section">
      <div className="resource-article-prose">
        <p className="eyebrow">Proof</p>
        <h2>{section.title}</h2>
        <p>{caseStudy.description}</p>
        {caseStudyAvailable ? (
          <a href={caseStudy.href} className="resource-related-link group">
            <strong>{caseStudyTitle}</strong>
            <ArrowRight size={16} className="cta-arrow" aria-hidden="true" />
          </a>
        ) : (
          <span className="resource-disabled-link" data-future-href={caseStudy.href} aria-disabled="true">
            <strong>{caseStudyTitle}</strong>
            <small>{caseStudy.status || 'Coming later'}</small>
          </span>
        )}
      </div>
    </section>
  );
}

function ResourceArchitectureCta({ section }) {
  return (
    <section id={section.id} className="resource-article-section resource-architecture-cta-section">
      <div className="resource-article-prose">
        <p className="eyebrow">Next step</p>
        <h2>{section.title}</h2>
        <p>{section.description}</p>
        <a href={section.cta.href} className="resource-text-link group">
          {section.cta.label}
          <ArrowRight size={16} className="cta-arrow" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function ResourceContextualCta({ section }) {
  const ctaAvailable = section.cta && section.cta.available !== false;

  return (
    <section id={section.id} className="resource-article-section resource-contextual-cta-section">
      <div className="resource-article-prose">
        <p className="eyebrow">{section.eyebrow || 'Next step'}</p>
        <h2>{section.title}</h2>
        <p>{section.description}</p>
        {ctaAvailable ? (
          <a href={section.cta.href} className="resource-related-link group">
            <span>
              <strong>{section.cta.label}</strong>
              {section.cta.description && <small>{section.cta.description}</small>}
            </span>
            <ArrowRight size={16} className="cta-arrow" aria-hidden="true" />
          </a>
        ) : (
          <span className="resource-disabled-link" data-future-href={section.cta.href} aria-disabled="true">
            <span>
              <strong>{section.cta.label}</strong>
              <small>{section.cta.status || section.cta.description || 'Not public yet'}</small>
            </span>
          </span>
        )}
      </div>
    </section>
  );
}

function ResourceChecklistSection({ section }) {
  return (
    <ResourceArticleShell section={section}>
      <ResourceParagraphs paragraphs={section.paragraphs} />
      {section.groups ? (
        <div className="resource-checklist-groups" aria-label={section.listLabel || section.title}>
          {section.groups.map((group) => (
            <section className="resource-checklist-group" key={group.title}>
              <h3>{group.title}</h3>
              <div className="resource-checklist">
                {group.items.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="resource-checklist" aria-label={section.listLabel || section.title}>
          {section.items.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      )}
      {section.closing && <p className="resource-article-emphasis">{section.closing}</p>}
    </ResourceArticleShell>
  );
}

function ResourceSourcesSection({ article, section }) {
  return (
    <section id={section.id} className="resource-article-section resource-sources-section">
      <div className="resource-article-prose">
        <h2>{section.title}</h2>
        <p>
          Product-specific details should be checked against official documentation before a client recommendation is finalized.
        </p>
        <ol className="resource-source-list">
          {article.sources.map((source) => (
            <li key={source.href}>
              <a href={source.href} target="_blank" rel="noreferrer">
                {source.label}
              </a>
              {source.provider && <small>{source.provider}</small>}
              <span>{source.description}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ResourceArticleShell({ children, section }) {
  return (
    <section id={section.id} className="resource-article-section">
      <div className="resource-article-prose">
        <h2>{section.title}</h2>
        {children}
      </div>
    </section>
  );
}

function ResourceParagraphs({ paragraphs = [] }) {
  return (
    <>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </>
  );
}

function ResourceBulletGroup({ items, title }) {
  return (
    <div className="resource-bullet-group">
      {title && <p>{title}</p>}
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function ResourceRecordList({ records }) {
  return (
    <div className="resource-record-list">
      {records.map((record) => (
        <article key={record.title}>
          <h3>{record.title}</h3>
          <dl>
            {record.fields.map((field) => (
              <div key={`${record.title}-${field.label}`}>
                <dt>{field.label}</dt>
                <dd>{field.value}</dd>
              </div>
            ))}
          </dl>
        </article>
      ))}
    </div>
  );
}

function ResourceExampleStack({ examples }) {
  return (
    <div className="resource-example-stack">
      {examples.map((example) => (
        <article key={example.title}>
          <p>{example.label || 'Example'}</p>
          <h3>{example.title}</h3>
          {example.description && <span>{example.description}</span>}
          {example.items && (
            <ol>
              {example.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          )}
        </article>
      ))}
    </div>
  );
}

function ResourceCodeStack({ blocks }) {
  return (
    <div className="resource-code-stack">
      {blocks.map((block) => (
        <figure key={block.label || block.code}>
          {block.label && <figcaption>{block.label}</figcaption>}
          <pre>
            <code>{block.code}</code>
          </pre>
        </figure>
      ))}
    </div>
  );
}

function ResourceDiagram({ diagram }) {
  if (diagram.kind === 'branch') {
    return <ResourceBranchDiagram diagram={diagram} />;
  }

  if (diagram.kind === 'topology') {
    return <ResourceTopologyDiagram diagram={diagram} />;
  }

  return <ResourceFlowDiagram diagram={diagram} />;
}

function ResourceFlowDiagram({ diagram }) {
  return (
    <figure className="resource-flow-diagram" aria-label={diagram.label}>
      <ol>
        {diagram.items.map((item, index) => (
          <li key={item}>
            <span>{item}</span>
            {index < diagram.items.length - 1 && <i aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </figure>
  );
}

function ResourceTopologyDiagram({ diagram }) {
  return (
    <figure className="resource-topology-diagram" aria-label={diagram.label}>
      <ol>
        {diagram.groups.map((group, index) => (
          <li className={group === 'n8n' ? 'resource-topology-core' : ''} key={group}>
            <span>{group}</span>
            {index < diagram.groups.length - 1 && <i aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </figure>
  );
}

function ResourceBranchDiagram({ diagram }) {
  return (
    <figure className="resource-branch-diagram" aria-label={diagram.label}>
      <ol className="resource-branch-main">
        {diagram.beforeBranch.map((item, index) => (
          <li key={item}>
            <span>{item}</span>
            {index < diagram.beforeBranch.length - 1 && <i aria-hidden="true" />}
          </li>
        ))}
      </ol>
      <div className="resource-branch-split" aria-hidden="true" />
      <div className="resource-branch-grid">
        {diagram.branches.map((branch) => (
          <article key={branch.title}>
            <p>{branch.title}</p>
            {branch.items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </article>
        ))}
      </div>
    </figure>
  );
}

function ResourceArchitectureDiagram() {
  return (
    <figure className="resource-architecture-diagram" aria-labelledby="resource-architecture-title resource-architecture-desc">
      <svg viewBox="0 0 720 420" role="img">
        <title id="resource-architecture-title">Example automation architecture</title>
        <desc id="resource-architecture-desc">
          RingCentral sends a transcript to n8n, n8n sends work to OpenAI and GHL, then both paths return into an email notification.
        </desc>
        <defs>
          <marker id="resource-architecture-arrow" markerHeight="9" markerWidth="9" orient="auto" refX="8" refY="4.5">
            <path d="M0,0 L9,4.5 L0,9" fill="rgba(198,161,91,0.9)" />
          </marker>
        </defs>
        <g className="resource-architecture-lines">
          <path d="M360 88V156" markerEnd="url(#resource-architecture-arrow)" />
          <path d="M360 224C312 270 264 270 224 308" markerEnd="url(#resource-architecture-arrow)" />
          <path d="M360 224C408 270 456 270 496 308" markerEnd="url(#resource-architecture-arrow)" />
          <path d="M224 348C274 378 314 386 360 386" />
          <path d="M496 348C446 378 406 386 360 386" />
        </g>
        <g className="resource-architecture-labels">
          <text x="386" y="126">transcript</text>
        </g>
        {[
          { label: 'RingCentral', meta: 'call event', x: 276, y: 42, w: 168 },
          { label: 'n8n', meta: 'workflow logic', x: 296, y: 156, w: 128, core: true },
          { label: 'OpenAI', meta: 'classification', x: 150, y: 300, w: 148 },
          { label: 'GHL', meta: 'CRM update', x: 444, y: 300, w: 128 },
          { label: 'Email notification', meta: 'team alert', x: 276, y: 360, w: 168, core: true },
        ].map((node) => (
          <g className={`resource-architecture-node ${node.core ? 'resource-architecture-node-core' : ''}`} transform={`translate(${node.x} ${node.y})`} key={node.label}>
            <rect width={node.w} height="56" />
            <text className="resource-architecture-node-label" x={node.w / 2} y="25" textAnchor="middle">{node.label}</text>
            <text className="resource-architecture-node-meta" x={node.w / 2} y="42" textAnchor="middle">{node.meta}</text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

function ResourceRelatedLink({ link }) {
  return (
    <a href={link.href} className="resource-related-link group">
      <span>
        <strong>{link.label}</strong>
        <small>{link.description}</small>
      </span>
      <ArrowRight size={16} className="cta-arrow" aria-hidden="true" />
    </a>
  );
}

function ResourceRelatedLinks({ links }) {
  return (
    <div className="resource-related-stack">
      {links.map((link) => (
        <ResourceRelatedLink link={link} key={link.href} />
      ))}
    </div>
  );
}

function WorkIndexPage() {
  return (
    <>
      <section id="top" className="work-index-hero relative isolate overflow-hidden pt-32 sm:pt-36">
        <div className="absolute inset-0 -z-10 circuit-grid opacity-60" />
        <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8 lg:pb-24">
          <div className="max-w-4xl">
            <p className="eyebrow mb-6">Work</p>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[1.04] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Selected systems, websites, and client operations delivered through Pathflow.
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/75 sm:text-xl sm:leading-9">
              Practical work where websites, infrastructure, requests, handoffs, and connected services had to stay understandable after delivery.
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="work-index-list">
          {workIndexItems.map((item) => (
            <WorkIndexItem item={item} key={item.company} />
          ))}
        </div>
      </section>
    </>
  );
}

function WorkIndexItem({ item }) {
  const content = (
    <>
      <div>
        <p className="text-xs font-semibold uppercase tracking-normal text-white/45">{item.status}</p>
        <h2 className="mt-4 text-2xl font-semibold leading-tight text-white sm:text-3xl">{item.company}</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-white/70">{item.description}</p>
      </div>
      <div className="flex flex-col gap-5 sm:items-end">
        <div className="flex flex-wrap gap-2 sm:justify-end">
          {item.tags.map((tag) => (
            <span className="border border-white/[0.12] px-2.5 py-1 text-xs text-white/60" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        {item.href && (
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
            Read case study
            <ArrowRight size={15} className="cta-arrow" />
          </span>
        )}
      </div>
    </>
  );

  if (!item.href) {
    return <article className="work-index-item work-index-item-muted">{content}</article>;
  }

  return (
    <a href={item.href} className="work-index-item card-link group">
      {content}
    </a>
  );
}

function CaseStudyPage({ caseStudy }) {
  return (
    <article className="case-study-page">
      <CaseStudyHero caseStudy={caseStudy} />
      {caseStudy.sections.map((section) => (
        <CaseStudyArticleSection caseStudy={caseStudy} section={section} key={section.id} />
      ))}
    </article>
  );
}

function CaseStudyHero({ caseStudy }) {
  return (
    <header id="top" className="case-study-hero relative isolate overflow-hidden pt-32 sm:pt-36">
      <div className="case-study-hero-field" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(22rem,0.6fr)] lg:px-8 lg:pb-28">
        <div className="max-w-5xl">
          <p className="eyebrow mb-6">{caseStudy.eyebrow}</p>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
            {caseStudy.title}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/75 sm:text-xl sm:leading-9">
            {caseStudy.description}
          </p>
          <ul className="case-study-tag-list mt-8" aria-label="Case study tags">
            {caseStudy.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
        <CaseStudyHeroVisual caseStudy={caseStudy} />
      </div>
    </header>
  );
}

function CaseStudyHeroVisual({ caseStudy }) {
  if (caseStudy.logo) {
    return (
      <div className="case-study-hero-logo hidden lg:flex">
        <img src={caseStudy.logo.src} alt={caseStudy.logo.alt} />
      </div>
    );
  }

  return <CaseStudyHeroMotif />;
}

function CaseStudyHeroMotif() {
  return (
    <div className="case-study-hero-motif hidden lg:block" aria-hidden="true">
      <svg viewBox="0 0 420 360">
        <path className="case-study-hero-path case-study-hero-path-muted" d="M48 72H176C238 72 250 128 250 178V286" />
        <path className="case-study-hero-path case-study-hero-path-muted" d="M126 286H250C320 286 344 236 344 182V104" />
        <path className="case-study-hero-path case-study-hero-path-gold" d="M76 176H186C238 176 270 148 314 104" />
        {[
          [48, 72],
          [176, 72],
          [250, 178],
          [250, 286],
          [126, 286],
          [344, 182],
          [344, 104],
          [76, 176],
          [186, 176],
          [314, 104],
        ].map(([cx, cy], index) => (
          <circle className={index > 6 ? 'case-study-hero-node-gold' : 'case-study-hero-node'} cx={cx} cy={cy} r="5" key={`${cx}-${cy}`} />
        ))}
      </svg>
    </div>
  );
}

function CaseStudyArticleSection({ caseStudy, section }) {
  switch (section.type) {
    case 'intro':
      return (
        <section className="case-study-section case-study-intro-section" aria-labelledby="case-study-intro-heading">
          <div className="case-study-prose">
            <h2 id="case-study-intro-heading" className="sr-only">Introduction</h2>
            <CaseStudyParagraphs paragraphs={section.paragraphs} />
          </div>
        </section>
      );
    case 'project-context':
      return (
        <CaseStudyProseSection section={section}>
          <CaseStudyParagraphs paragraphs={section.paragraphs} />
          <QuestionStack questions={section.questions} />
          <div className="case-study-memory-note">
            {section.closing.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </CaseStudyProseSection>
      );
    case 'request':
      return (
        <CaseStudyProseSection section={section}>
          <CaseStudyParagraphs paragraphs={section.paragraphs} />
          <CaseStudyRequest request={section.request} />
          <CaseStudyMedia media={caseStudy.media[section.media]} />
        </CaseStudyProseSection>
      );
    case 'manual-workflow':
      return (
        <section id={section.id} className="case-study-section">
          <div className="case-study-prose">
            <CaseStudySectionHeader section={section} />
          </div>
          <ManualWorkflowPath steps={section.steps} />
        </section>
      );
    case 'context-graph':
      return (
        <section id={section.id} className="case-study-section">
          <div className="case-study-prose">
            <CaseStudySectionHeader section={section} />
            <CaseStudyParagraphs paragraphs={section.paragraphs} />
          </div>
          {section.media ? <CaseStudyMedia media={caseStudy.media[section.media]} /> : <ContextGraph />}
        </section>
      );
    case 'execution':
      return (
        <CaseStudyProseSection section={section}>
          <p>{section.intro}</p>
          <CaseStudyActionList actions={section.actions} />
          <blockquote className="case-study-pullquote">
            <p>{section.quoteLead}</p>
            <strong>{section.quote}</strong>
          </blockquote>
          <CaseStudyMedia media={caseStudy.media[section.media]} />
        </CaseStudyProseSection>
      );
    case 'result':
      return (
        <CaseStudyProseSection section={section}>
          <CaseStudyParagraphs paragraphs={section.paragraphs} />
          <CaseStudyMedia media={caseStudy.media[section.media]} />
        </CaseStudyProseSection>
      );
    case 'handoff':
      return (
        <section id={section.id} className="case-study-section">
          <div className="case-study-prose">
            <CaseStudySectionHeader section={section} />
            <CaseStudyParagraphs paragraphs={section.paragraphs} />
            <div className="case-study-highlight-stack">
              {section.highlights.map((highlight) => (
                <p key={highlight}>{highlight}</p>
              ))}
            </div>
          </div>
          <LifecyclePath items={section.lifecycle} />
          <CaseStudyMediaGrid caseStudy={caseStudy} mediaKeys={section.media} />
        </section>
      );
    case 'larger-idea':
      return (
        <CaseStudyProseSection section={section}>
          <CaseStudyParagraphs paragraphs={section.paragraphs} />
          <div className="case-study-emphasis-block">
            {section.emphasis.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          {section.cta && (
            <a href={section.cta.href} className="btn btn-primary mt-8 group">
              {section.cta.label}
              <ArrowRight size={18} className="cta-arrow" />
            </a>
          )}
        </CaseStudyProseSection>
      );
    case 'closing':
      return <CaseStudyClosing section={section} />;
    default:
      return null;
  }
}

function CaseStudyProseSection({ section, children }) {
  return (
    <section id={section.id} className="case-study-section">
      <div className="case-study-prose">
        <CaseStudySectionHeader section={section} />
        {children}
      </div>
    </section>
  );
}

function CaseStudySectionHeader({ section }) {
  return (
    <div className="case-study-section-header">
      {section.eyebrow && <p className="eyebrow">{section.eyebrow}</p>}
      {section.title && <h2>{section.title}</h2>}
    </div>
  );
}

function CaseStudyParagraphs({ paragraphs }) {
  return (
    <>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </>
  );
}

function QuestionStack({ questions }) {
  return (
    <div className="case-study-question-stack" aria-label="Project decisions and system concerns">
      {questions.map((question, index) => (
        <p style={{ '--question-index': index }} key={question}>
          {question}
        </p>
      ))}
    </div>
  );
}

function CaseStudyRequest({ request }) {
  return (
    <aside className="case-study-request-box" aria-label={request.label}>
      <p>{request.label}</p>
      <strong>{request.text}</strong>
    </aside>
  );
}

function ManualWorkflowPath({ steps }) {
  return (
    <div className="manual-workflow-visual" aria-label="Fragmented manual workflow">
      <ol className="manual-workflow-list">
        {steps.map((step, index) => (
          <li className="manual-workflow-step" style={{ '--step-index': index }} key={step}>
            <span className="manual-workflow-node" aria-hidden="true" />
            <span className="manual-workflow-label">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ContextGraph() {
  return (
    <div className="context-graph-wrap" aria-labelledby="context-graph-title context-graph-desc">
      <svg className="context-graph-svg" viewBox="0 0 920 430" role="img">
        <title id="context-graph-title">Pathflow project context graph</title>
        <desc id="context-graph-desc">
          The accepted request connects to the client, project, resources, and repository, deployment, integrations, and attachments.
        </desc>
        <defs>
          <marker id="context-graph-arrow" markerHeight="9" markerWidth="9" orient="auto" refX="8" refY="4.5">
            <path d="M0,0 L9,4.5 L0,9" fill="rgba(198,161,91,0.88)" />
          </marker>
        </defs>
        <g className="context-graph-edges-neutral">
          <path d="M460 194H236" />
          <path d="M460 194H684" />
          <path d="M236 194C236 118 304 78 382 78" />
          <path d="M684 194C684 118 616 78 538 78" />
          <path d="M684 194C684 278 610 338 526 338" />
          <path d="M236 194C236 278 312 338 396 338" />
        </g>
        <g className="context-graph-edges-gold">
          <path d="M138 194H236H460H684H782" markerEnd="url(#context-graph-arrow)" />
          <path d="M460 194C460 122 492 94 538 78" />
          <path d="M460 194C460 276 482 318 526 338" />
        </g>
        <g className="context-graph-signal" aria-hidden="true">
          <circle r="4">
            <animateMotion dur="12s" repeatCount="indefinite" path="M138 194H236H460H684H782" />
          </circle>
        </g>
        {[
          { label: 'Request', meta: 'accepted work', x: 48, y: 160, w: 132, primary: true },
          { label: 'Client', meta: 'Farm Financing Ontario', x: 188, y: 160, w: 132, primary: true },
          { label: 'Project', meta: 'documented system', x: 398, y: 156, w: 124, primary: true },
          { label: 'Resources', meta: 'owned context', x: 640, y: 160, w: 132, primary: true },
          { label: 'Repository', meta: 'implementation', x: 780, y: 160, w: 124, primary: true },
          { label: 'Deployment', meta: 'where it ships', x: 348, y: 44, w: 124 },
          { label: 'Integrations', meta: 'connected services', x: 508, y: 44, w: 132 },
          { label: 'Attachments', meta: 'supplied assets', x: 480, y: 304, w: 132 },
          { label: 'Handoff', meta: 'completion state', x: 348, y: 304, w: 124 },
        ].map((node) => (
          <g
            className={`context-graph-node ${node.primary ? 'context-graph-node-primary' : ''}`}
            transform={`translate(${node.x} ${node.y})`}
            key={node.label}
          >
            <rect width={node.w} height="68" />
            <text className="context-graph-label" x={node.w / 2} y="31" textAnchor="middle">{node.label}</text>
            <text className="context-graph-meta" x={node.w / 2} y="51" textAnchor="middle">{node.meta}</text>
          </g>
        ))}
      </svg>
      <ol className="context-graph-mobile" aria-label="Pathflow context relationship path">
        {['Request', 'Client', 'Project', 'Resources', 'Repository / deployment / integrations / attachments'].map((item, index, items) => (
          <li key={item}>
            <span>{item}</span>
            {index < items.length - 1 && <i aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </div>
  );
}

function CaseStudyActionList({ actions }) {
  return (
    <ul className="case-study-action-list">
      {actions.map((action) => (
        <li key={action}>
          <span aria-hidden="true" />
          {action}
        </li>
      ))}
    </ul>
  );
}

function LifecyclePath({ items }) {
  return (
    <div className="lifecycle-path-wrap" aria-label="Completed Pathflow delivery lifecycle">
      <ol className="lifecycle-path" style={{ '--lifecycle-count': items.length }}>
        {items.map((item, index) => (
          <li style={{ '--lifecycle-index': index }} key={item}>
            <span aria-hidden="true" />
            <strong>{item}</strong>
          </li>
        ))}
      </ol>
    </div>
  );
}

function CaseStudyMediaGrid({ caseStudy, mediaKeys }) {
  const visibleMedia = mediaKeys
    .map((mediaKey) => caseStudy.media[mediaKey])
    .filter(canRenderCaseStudyMedia);

  if (visibleMedia.length === 0) return null;

  const singleMediaLayout = visibleMedia.length === 1 ? visibleMedia[0].layout || 'standard' : '';

  return (
    <div className={`case-study-media-grid ${visibleMedia.length === 1 ? `case-study-media-grid-single case-study-media-grid-${singleMediaLayout}` : ''}`}>
      {visibleMedia.map((media) => (
        <CaseStudyMedia media={media} key={media.src || media.embedSrc} />
      ))}
    </div>
  );
}

function CaseStudyMedia({ media }) {
  const [failed, setFailed] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const closeButtonRef = React.useRef(null);

  React.useEffect(() => {
    if (!isModalOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  if (!canRenderCaseStudyMedia(media) || (failed && !import.meta.env.DEV)) {
    return null;
  }

  const showEmbed = Boolean(media.embedSrc);
  const showPlaceholder = !showEmbed && (media.pending || failed);

  return (
    <>
      <figure
        className={`case-study-media case-study-media-${media.layout || 'standard'} ${showEmbed ? 'case-study-media-embed' : ''} ${showPlaceholder ? 'case-study-media-placeholder' : ''}`}
        style={{
          '--media-aspect': media.aspectRatio || '16 / 10',
          '--media-object-position': media.objectPosition || 'center',
        }}
      >
        <div className="case-study-media-frame">
          {showEmbed ? (
            <iframe
              src={media.embedSrc}
              title={media.alt}
              loading="lazy"
              allow="fullscreen"
            />
          ) : showPlaceholder ? (
            <div className="case-study-media-placeholder-inner" role="img" aria-label={`Pending screenshot: ${media.alt}`}>
              <span>Pending screenshot</span>
              <code>{media.src}</code>
            </div>
          ) : (
            <button type="button" className="case-study-media-link" onClick={() => setIsModalOpen(true)} aria-label={`View full-size image: ${media.alt}`}>
              <img
                src={media.src}
                alt={media.alt}
                loading="lazy"
                decoding="async"
                onError={() => setFailed(true)}
              />
            </button>
          )}
        </div>
        {media.caption && <figcaption>{media.caption}</figcaption>}
      </figure>
      {isModalOpen && createPortal(
        <div className="case-study-media-modal" role="dialog" aria-modal="true" aria-label={`Full-size image: ${media.alt}`} onClick={() => setIsModalOpen(false)}>
          <div className="case-study-media-modal-inner" onClick={(event) => event.stopPropagation()}>
            <button ref={closeButtonRef} type="button" className="case-study-media-modal-close" onClick={() => setIsModalOpen(false)} aria-label="Close full-size image">
              <X size={20} />
            </button>
            <img src={media.src} alt={media.alt} decoding="async" />
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}

function canRenderCaseStudyMedia(media) {
  return Boolean(media && (!media.pending || import.meta.env.DEV));
}

function CaseStudyClosing({ section }) {
  return (
    <section id={section.id} className="case-study-section case-study-closing-section">
      <div className="case-study-prose">
        <div className="case-study-closing-statement">
          {section.statement.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <CaseStudyParagraphs paragraphs={section.paragraphs} />
        <p className="case-study-kicker">{section.kicker}</p>
        <a href={section.cta.href} className="btn btn-primary mt-8 group">
          {section.cta.label}
          <ArrowRight size={18} className="cta-arrow" />
        </a>
      </div>
    </section>
  );
}

function ServicePage({ service }) {
  return (
    <>
      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        intro={service.summary}
        primaryCta="Book a workflow consultation"
        secondaryCta="See all services"
        secondaryHref="/#services"
      />
      <Section eyebrow="Short answer" title="What this service is.">
        <div className="max-w-4xl border border-white/[0.095] bg-black p-6 text-lg leading-8 text-white/70 sm:p-8">
          {service.summary}
        </div>
      </Section>
      <Section eyebrow="Problems it solves" title="Where the flow usually breaks.">
        <div className="grid gap-4 sm:grid-cols-2">
          {service.problems.map((item) => (
            <article className="service-detail-item" key={item}>
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white/70" />
              <span>{item}</span>
            </article>
          ))}
        </div>
      </Section>
      <Section eyebrow="Typical system flow" title="The path this work usually supports.">
        <FlowSequence items={service.flow} />
      </Section>
      <ServiceDetailList eyebrow="Capabilities" title="Specific work Pathflow can help with." items={service.capabilities} />
      <ServiceDetailList eyebrow="Common tools" title="Tools and systems this work often touches." items={service.tools} />
      <Section eyebrow="Implementation approach" title="How Pathflow approaches the work.">
        <div className="grid gap-5 lg:grid-cols-4">
          {service.approach.map((item, index) => (
            <article className="process-card" key={item}>
              <span className="text-sm text-white/60">0{index + 1}</span>
              <p className="mt-6 leading-7 text-white/75">{item}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section eyebrow="Proof" title="Practical work, not abstract automation.">
        <article className="work-card max-w-4xl">
          <p className="leading-8 text-white/75">{service.proof}</p>
        </article>
      </Section>
      {service.faqs?.length > 0 && (
        <Section eyebrow="FAQs" title="Useful answers before a consultation.">
          <div className="grid gap-5 lg:grid-cols-2">
            {service.faqs.map((faq) => (
              <article className="service-card" key={faq.question}>
                <h3 className="text-xl font-semibold text-white">{faq.question}</h3>
                <p className="mt-3 leading-7 text-white/75">{faq.answer}</p>
              </article>
            ))}
          </div>
        </Section>
      )}
      <Section eyebrow="Adjacent services" title="Connected work that often belongs nearby.">
        <LinkedServiceGrid paths={service.adjacent} />
      </Section>
      <FinalCtaSection />
    </>
  );
}

function PageHero({ eyebrow, title, intro, primaryCta, secondaryCta, secondaryHref }) {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 sm:pt-36">
      <div className="absolute inset-0 -z-10 circuit-grid" />
      <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="max-w-5xl">
          <p className="eyebrow mb-6">{eyebrow}</p>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[1.04] tracking-normal text-white sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/75 sm:text-xl sm:leading-9">{intro}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-primary">
              <CalendarCheck size={18} />
              {primaryCta}
            </a>
            <a href={secondaryHref} className="btn btn-secondary">
              {secondaryCta}
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({ id, eyebrow, title, intro, children }) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mb-12 max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title mt-4">{title}</h2>
        {intro && <p className="mt-5 text-lg leading-8 text-white/75">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

function CardGrid({ items }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {items.map(({ title, description, icon: Icon }) => (
        <article className="service-card" key={title}>
          <Icon size={22} className="text-white/70" />
          <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
          <p className="mt-3 leading-7 text-white/75">{description}</p>
        </article>
      ))}
    </div>
  );
}

const connectedDiagramNodes = [
  { id: 'website', label: 'Website', x: 44, y: 56, w: 128 },
  { id: 'intake', label: 'Intake', x: 214, y: 56, w: 118 },
  { id: 'crm', label: 'CRM', x: 382, y: 56, w: 106 },
  { id: 'automation', label: 'Automation', x: 540, y: 56, w: 156 },
  { id: 'communication', label: 'Communication', x: 728, y: 176, w: 174 },
  { id: 'documents', label: 'Documents', x: 526, y: 304, w: 142 },
  { id: 'reporting', label: 'Reporting', x: 316, y: 304, w: 132 },
];

const connectedDiagramEdges = [
  {
    id: 'submit',
    label: 'submit',
    from: 'Website',
    to: 'Intake',
    path: 'M172 90H214',
    labelX: 193,
    labelY: 75,
  },
  {
    id: 'validate',
    label: 'validate',
    from: 'Intake',
    to: 'CRM',
    path: 'M332 90H382',
    labelX: 357,
    labelY: 75,
  },
  {
    id: 'route',
    label: 'route',
    from: 'CRM',
    to: 'Automation',
    path: 'M488 90H540',
    labelX: 514,
    labelY: 75,
  },
  {
    id: 'notify',
    label: 'notify',
    from: 'Automation',
    to: 'Communication',
    path: 'M696 90C766 90 815 112 815 176',
    labelX: 772,
    labelY: 110,
  },
  {
    id: 'request',
    label: 'request',
    from: 'Communication',
    to: 'Documents',
    path: 'M815 244C815 298 724 338 668 338',
    labelX: 760,
    labelY: 306,
  },
  {
    id: 'measure',
    label: 'measure',
    from: 'Documents',
    to: 'Reporting',
    path: 'M526 338H448',
    labelX: 487,
    labelY: 323,
  },
];

function ConnectedFlowDiagram({ items }) {
  return (
    <div className="connected-flow" aria-labelledby="connected-flow-title connected-flow-desc">
      <div className="connected-flow-desktop">
        <svg className="connected-flow-svg" viewBox="0 0 946 410" role="img">
          <title id="connected-flow-title">Connected system path</title>
          <desc id="connected-flow-desc">
            Website submissions move through intake, CRM, automation, communication, documents, and reporting.
          </desc>
          <defs>
            <marker id="connected-arrow" markerHeight="9" markerWidth="9" orient="auto" refX="8" refY="4.5">
              <path d="M0,0 L9,4.5 L0,9" fill="rgba(255,255,255,0.58)" />
            </marker>
          </defs>
          <g className="connected-flow-edges">
            {connectedDiagramEdges.map((edge, index) => (
              <g
                aria-label={`${edge.from} to ${edge.to}: ${edge.label}`}
                className="connected-flow-edge"
                key={edge.id}
                style={{ '--edge-index': index }}
                tabIndex="0"
              >
                <path d={edge.path} markerEnd="url(#connected-arrow)" />
                <text className="connected-flow-edge-label" x={edge.labelX} y={edge.labelY} textAnchor="middle">
                  {edge.label}
                </text>
              </g>
            ))}
          </g>
          <g className="connected-flow-signal" aria-hidden="true">
            <circle r="4">
              <animateMotion
                dur="10s"
                repeatCount="indefinite"
                path="M172 90H214H332H382H488H540H696C766 90 815 112 815 176V244C815 298 724 338 668 338H526H448"
              />
            </circle>
          </g>
          <g className="connected-flow-nodes">
            {connectedDiagramNodes.map((node, index) => (
              <g
                className="connected-flow-node"
                key={node.id}
                style={{ '--node-index': index }}
                transform={`translate(${node.x} ${node.y})`}
                tabIndex="0"
              >
                <rect height="68" width={node.w} />
                <text x={node.w / 2} y="40" textAnchor="middle">
                  {node.label}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>
      <ol className="connected-flow-mobile" aria-label="Connected system flow">
        {items.map((item, index) => (
          <li key={item}>
            <span className="mobile-flow-node">{item}</span>
            {index < items.length - 1 && <span className="mobile-flow-edge" aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </div>
  );
}

function FlowSequence({ items }) {
  return (
    <div className="flow-sequence" aria-label="Connected system flow">
      <ol>
        {items.map((item, index) => (
          <li key={item}>
            <div className="flow-node">{item}</div>
            {index < items.length - 1 && <ArrowRight size={18} aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </div>
  );
}

function ServiceDetailList({ eyebrow, title, items }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mb-12 max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title mt-4">{title}</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div className="service-detail-item" key={item}>
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white/70" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function LinkedServiceGrid({ paths }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {paths.map((path) => {
        const service = servicePages[path];
        const Icon = service.icon;
        return (
          <a className="service-card card-link group block" href={path} key={path}>
            <Icon size={22} className="text-white/70" />
            <h3 className="mt-5 text-xl font-semibold text-white">{service.navLabel}</h3>
            <p className="mt-3 leading-7 text-white/75">{service.shortDescription}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/75">
              View service
              <ArrowRight size={15} className="cta-arrow" />
            </span>
          </a>
        );
      })}
    </div>
  );
}

function NotFoundPage() {
  return (
    <PageHero
      eyebrow="Not found"
      title="This Pathflow page is not available."
      intro="The page may have moved as the marketing site was reorganized around solutions, services, and resources."
      primaryCta="Book a consultation"
      secondaryCta="Go home"
      secondaryHref="/"
    />
  );
}

function Footer() {
  return (
    <footer className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-5 py-8 text-center text-sm text-white/50 sm:px-6 lg:px-8">
      <p>Pathflow: Systems, made clear.</p>
      <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2" aria-label="Footer navigation">
        <a href="/businesses" className="nav-link">Businesses</a>
        <a href="/consultants" className="nav-link">Consultants</a>
        <a href="/services" className="nav-link">Services</a>
        <a href="/work" className="nav-link">Work</a>
        <a href="/platform" className="nav-link">Platform</a>
        <a href="/solutions/architecture" className="nav-link">Architecture</a>
        <a href="/solutions/documents" className="nav-link">Documents</a>
        <a href="/platform/mcp" className="nav-link">MCP</a>
        <a href="/platform/handoffs" className="nav-link">Handoffs</a>
        <a href="/resources" className="nav-link">Resources</a>
        <a href={`mailto:${contactEmail}`} className="nav-link">Email Pathflow</a>
      </nav>
    </footer>
  );
}

const pageComponents = {
  '/': HomePage,
  '/businesses': BusinessesPage,
  '/consultants': ConsultantsPage,
  '/services': ServicesLandingPage,
  '/work': WorkIndexPage,
  '/platform': PlatformPage,
  '/solutions/architecture': PlatformArchitecturePage,
  '/solutions/documents': PathflowDocumentsPage,
  '/platform/mcp': PathflowMcpPage,
  '/platform/handoffs': PathflowHandoffsPage,
  '/resources': ResourcesPage,
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
