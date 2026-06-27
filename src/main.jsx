import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  CalendarCheck,
  ChevronDown,
  CheckCircle2,
  Database,
  FileCheck2,
  GitBranch,
  Mail,
  Map,
  MonitorCheck,
  Route,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react';
import waveBackground from '../Wave.svg';
import { isSupabaseConfigured, supabase } from './lib/supabaseClient';
import './index.css';

const bookingLink =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1ejTXovOc_jVNvzOBE3_I4SBrYLvGJ_SGHX65CWHUhVPBbd_p9EIkIRs-5G3LqODcJP_zHrt1D';

const serviceNavItems = [
  { label: 'CRM & Pipelines', href: '/services/crm-systems' },
  { label: 'Lead Intake', href: '/services/lead-intake' },
  { label: 'n8n Automation', href: '/services/n8n-automation' },
  { label: 'App Integrations', href: '/services/app-integrations' },
  { label: 'Connected Websites', href: '/services/connected-websites' },
  { label: 'Dashboards', href: '/services/dashboards' },
  { label: 'Managed Hosting', href: '/services/managed-hosting' },
  { label: 'E-Signatures', href: '/services/e-signatures' },
  { label: 'Custom Apps', href: '/services/custom-apps' },
  { label: 'Workflow Audit', href: '/#services' },
];

const problems = [
  'Forms go to inboxes',
  'Leads fall through',
  'CRMs get messy',
  'Documents are chased manually',
  'Automations break silently',
  'Nobody knows what is working',
];

const services = [
  {
    title: 'Client Intake Systems',
    description:
      'Branded forms, email/SMS verification, document requests, CRM updates, reminders.',
    icon: FileCheck2,
  },
  {
    title: 'CRM & Pipeline Automation',
    description:
      'GoHighLevel, Salesforce, HubSpot, and Zoho setup, pipeline cleanup, lead routing, follow-up workflows, and internal alerts.',
    icon: GitBranch,
  },
  {
    title: 'Managed Automation Infrastructure',
    description:
      'n8n hosting, Zapier migration, webhook/API workflows, monitoring, backups.',
    icon: ServerCog,
  },
  {
    title: 'Connected Websites',
    description:
      'Business websites and campaign pages connected to CRM, analytics, forms, and automation.',
    icon: Route,
  },
  {
    title: 'Dashboards & Reporting',
    description:
      'Lead source reporting, operational dashboards, stuck-lead views, and system visibility.',
    icon: BarChart3,
  },
  {
    title: 'Ongoing Systems Care',
    description:
      'Managed hosting, monitoring, backups, workflow maintenance, fixes, and monthly improvements.',
    icon: ShieldCheck,
  },
];

const process = [
  {
    title: 'Map the flow',
    description:
      'We review your website, forms, CRM, automations, documents, and follow-up process.',
  },
  {
    title: 'Build the system',
    description:
      'We connect the pieces: forms, CRM, workflows, documents, notifications, dashboards.',
  },
  {
    title: 'Launch and monitor',
    description:
      'We test the full path, deploy it, document it, and monitor what matters.',
  },
  {
    title: 'Improve monthly',
    description:
      'Optional ongoing care keeps workflows updated, monitored, and improving.',
  },
];

const work = [
  {
    label: 'Intake to CRM',
    title: 'Lead capture rebuilt around follow-up',
    description:
      'Connected landing page forms to routed CRM stages, reminders, and internal alerts.',
    icon: Database,
  },
  {
    label: 'Documents',
    title: 'Checklist and e-sign flow cleanup',
    description:
      'Turned manual document chasing into a tracked path from request to signed file.',
    icon: FileCheck2,
  },
  {
    label: 'Visibility',
    title: 'Operations dashboard for active leads',
    description:
      'Created a practical view of stuck leads, missing documents, and workflow health.',
    icon: MonitorCheck,
  },
];

const plans = [
  {
    title: 'Build',
    description:
      'One-time implementation projects for websites, intake flows, CRM cleanup, and automations.',
    icon: Wrench,
  },
  {
    title: 'Care',
    description:
      'Managed hosting, monitoring, backups, workflow maintenance, and small fixes.',
    icon: ShieldCheck,
  },
  {
    title: 'Growth',
    description:
      'Ongoing improvements, dashboards, new automations, reporting, and monthly ops review.',
    icon: Sparkles,
  },
];

const crmHelpItems = [
  'GoHighLevel, Salesforce, HubSpot, and Zoho setup and configuration',
  'Pipeline and opportunity stage design',
  'Custom fields, tags, and lead source tracking',
  'Smart lists and saved views',
  'Workflow cleanup and optimization',
  'Lead routing and assignment rules',
  'Follow-up reminders and internal alerts',
  'Form and website connections',
  'CRM-to-dashboard reporting foundations',
  'Documentation and handoff',
];

const crmUseCases = [
  'Setting up a new CRM from scratch',
  'Cleaning up a messy GoHighLevel, Salesforce, HubSpot, or Zoho account',
  'Connecting website forms to CRM contacts and opportunities',
  'Creating pipeline stages that match your sales or intake process',
  'Automating reminders when leads or clients need follow-up',
  'Improving visibility into where leads are coming from and what stage they are in',
];

const leadIntakeHelpItems = [
  'Branded intake forms',
  'Contact and opportunity creation in your CRM',
  'Custom field mapping',
  'Email and SMS verification',
  'Incomplete-form reminders',
  'Document request workflows',
  'Internal alerts for new submissions',
  'Stage movement in your pipeline',
  'Confirmation messages for clients',
  'Intake status tracking and reporting',
];

const leadIntakeUseCases = [
  'Replacing PDF or paper intake forms with a digital process',
  'Connecting website forms to GoHighLevel or another CRM',
  'Sending automatic reminders when clients do not complete intake',
  'Moving opportunities to the right pipeline stage after submission',
  'Requesting IDs, forms, or supporting documents',
  'Giving your team visibility into who has submitted, who is missing information, and what needs attention',
];

const n8nHelpItems = [
  'n8n setup and configuration',
  'Managed n8n hosting',
  'Zapier or Make migration',
  'Webhook and API workflows',
  'CRM automation',
  'Website form routing',
  'Email and SMS workflow automation',
  'Scheduled jobs and data syncs',
  'Error handling and alerts',
  'Backups and monitoring',
  'Workflow documentation',
  'Ongoing maintenance and updates',
];

const n8nUseCases = [
  'Replacing expensive Zapier workflows with managed n8n automations',
  'Connecting website forms to your CRM',
  'Creating or updating contacts and opportunities',
  'Sending intake links, reminders, and confirmations',
  'Routing leads based on source, location, service type, or status',
  'Syncing data between apps and spreadsheets',
  'Triggering document or e-signature workflows',
  'Sending internal alerts when important actions happen',
  'Building automations that your current CRM does not support on its own',
];

const appIntegrationHelpItems = [
  'Connecting existing business apps',
  'Setting up new tools and platforms',
  'API and webhook integrations',
  'CRM integrations',
  'Form and website integrations',
  'Email and SMS integrations',
  'Voice AI and calling tool setup',
  'Twilio setup and routing',
  'Document and e-signature integrations',
  'Dashboard and reporting connections',
  'Monitoring and alerting tools',
  'Self-hosted business tools',
  'Data syncs and scheduled jobs',
  'Custom integration logic',
];

const appIntegrationTools = [
  'GoHighLevel',
  'n8n',
  'Twilio',
  'Voice AI tools',
  'DocuSeal',
  'Google Workspace',
  'Email and SMS platforms',
  'Website forms',
  'Dashboards and reporting tools',
  'Monitoring tools',
  'Nextcloud and other self-hosted tools',
  'Custom APIs and databases',
];

const appIntegrationUseCases = [
  'Sending website form submissions into your CRM',
  'Creating contacts and opportunities automatically',
  'Routing leads based on source, status, or service type',
  'Connecting Twilio phone/SMS workflows to your CRM',
  'Setting up voice AI tools for intake, qualification, or follow-up',
  'Sending signed document updates to your team',
  'Syncing data between apps, spreadsheets, and dashboards',
  'Adding monitoring for websites, automations, and internal tools',
  'Setting up self-hosted tools for storage, documents, dashboards, or automation',
];

const connectedWebsitesHelpItems = [
  'Custom business websites',
  'Landing pages and campaign pages',
  'Intake pages and lead capture pages',
  'Domain and DNS setup',
  'GoDaddy, Cloudflare, or existing domain connections',
  'GitHub setup and version control',
  'Static site hosting',
  'GitHub Pages, S3, or other hosting options',
  'SSL and secure deployment setup',
  'Website forms connected to your CRM',
  'Database setup when needed',
  'Analytics and conversion tracking',
  'Website monitoring',
  'Ongoing updates and maintenance',
];

const connectedWebsitesUseCases = [
  'Building a new business website from scratch',
  'Replacing an outdated Wix, GoDaddy, Webflow, or Hostinger site',
  'Cleaning up an AI-generated or unfinished website draft',
  'Creating landing pages for campaigns or lead generation',
  'Connecting website forms to GoHighLevel or another CRM',
  'Setting up proper hosting, DNS, SSL, and version control',
  'Creating intake pages that trigger automations and follow-up',
  'Adding databases, dashboards, or backend services when a static site is not enough',
];

const dashboardsHelpItems = [
  'Lead source dashboards',
  'CRM and pipeline dashboards',
  'Intake completion reporting',
  'Document status dashboards',
  'Follow-up and response tracking',
  'Campaign and landing page reporting',
  'Workflow health dashboards',
  'Website and system uptime views',
  'Business performance dashboards',
  'Custom dashboards inside existing apps',
  'Hosted dashboards using managed infrastructure',
  'Data cleanup and dashboard preparation',
  'Automated reporting workflows',
];

const dashboardsUseCases = [
  'Seeing how many leads came in from each source',
  'Tracking where opportunities are sitting in the pipeline',
  'Monitoring who completed intake and who still needs follow-up',
  'Seeing which clients are missing documents or signatures',
  'Reviewing campaign performance from landing pages or ads',
  'Tracking workflow errors, uptime, or automation health',
  'Creating a monthly performance report for the business',
  'Building a management view across CRM, forms, automations, and spreadsheets',
];

const managedHostingHelpItems = [
  'Website hosting',
  'Landing page and intake page hosting',
  'n8n hosting',
  'Dashboard hosting',
  'Document and e-signature tool hosting',
  'Custom app hosting',
  'Database setup when needed',
  'Domain and DNS setup',
  'SSL certificate setup',
  'Cloudflare configuration',
  'AWS infrastructure setup',
  'GitHub-based deployments',
  'Docker-based deployments',
  'Kubernetes-ready infrastructure',
  'Scalable cloud hosting architecture',
  'Backups and recovery planning',
  'Uptime monitoring',
  'Security updates and maintenance',
  'Deployment documentation',
];

const managedHostingUseCases = [
  'Hosting a new website or landing page',
  'Moving a website away from an unclear or unreliable setup',
  'Hosting n8n for workflow automation',
  'Hosting dashboards for business reporting',
  'Setting up a database-backed app or portal',
  'Connecting a custom domain to a hosted system',
  'Adding SSL and secure deployment configuration',
  'Monitoring websites, forms, automations, and internal tools',
  'Creating a more maintainable setup for future updates',
  'Separating business systems from personal or outdated accounts',
  'Preparing infrastructure for future scaling or higher availability',
];

const eSignatureHelpItems = [
  'E-signature setup',
  'DocuSeal setup and hosting',
  'Reusable signing templates',
  'Intake forms and authorization documents',
  'Consent forms and client agreements',
  'CRM-triggered signature requests',
  'Signed-document notifications',
  'Document status tracking',
  'Reminder workflows for unsigned documents',
  'Secure document storage workflows',
  'Internal alerts when documents are completed',
  'Dashboard reporting for document status',
  'Ongoing maintenance and template updates',
];

const eSignatureUseCases = [
  'Sending intake agreements after a lead submits a form',
  'Requesting authorization forms from clients',
  'Replacing manual PDF signing workflows',
  'Tracking who has signed and who still needs follow-up',
  'Updating the CRM when a document is completed',
  'Triggering next steps after a signature is received',
  'Sending reminders for unsigned documents',
  'Creating a more affordable alternative to enterprise signing tools',
  'Connecting document signing to intake, CRM, and follow-up automation',
];

const customAppsHelpItems = [
  'Custom internal apps',
  'Admin panels',
  'Client portals',
  'Intake review dashboards',
  'Document trackers',
  'Lead routing tools',
  'Workflow control panels',
  'Custom forms',
  'Database-backed tools',
  'Reporting interfaces',
  'Lightweight approval systems',
  'Internal request forms',
  'CRM-connected apps',
  'API-connected tools',
  'Hosted app deployment',
  'Ongoing updates and maintenance',
];

const customAppsUseCases = [
  'Reviewing intake submissions in one place',
  'Tracking which clients are missing documents',
  'Creating a simple client portal',
  'Building an admin panel for internal operations',
  'Managing lead routing or assignment rules',
  'Creating a dashboard for a custom process',
  'Replacing a spreadsheet that has become too important',
  'Giving staff a safer interface for triggering workflows',
  'Connecting a custom app to your CRM, database, or automation tools',
  'Building a small tool when your existing software does not quite fit',
];

function App() {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  const [session, setSession] = React.useState(null);
  const [authReady, setAuthReady] = React.useState(!isSupabaseConfigured);
  const isCrmSystemsPage = pathname === '/services/crm-systems';
  const isLeadIntakePage = pathname === '/services/lead-intake';
  const isN8nAutomationPage = pathname === '/services/n8n-automation';
  const isAppIntegrationsPage = pathname === '/services/app-integrations';
  const isConnectedWebsitesPage = pathname === '/services/connected-websites';
  const isDashboardsPage = pathname === '/services/dashboards';
  const isManagedHostingPage = pathname === '/services/managed-hosting';
  const isESignaturesPage = pathname === '/services/e-signatures';
  const isCustomAppsPage = pathname === '/services/custom-apps';
  const isLoginPage = pathname === '/login';
  const isPortalPage = pathname === '/portal';

  React.useEffect(() => {
    if (!supabase) {
      setAuthReady(true);
      return undefined;
    }

    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) {
        return;
      }

      setSession(data.session);
      setAuthReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setAuthReady(true);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    if (isLoginPage) {
      document.title = 'Log In | PathFlow';
      return;
    }

    if (isPortalPage) {
      document.title = 'Portal | PathFlow';
      return;
    }

    if (isCrmSystemsPage) {
      document.title = 'CRM Systems | Pathflow Web Services';
      return;
    }

    if (isLeadIntakePage) {
      document.title = 'Lead Intake | Pathflow Web Services';
      return;
    }

    if (isN8nAutomationPage) {
      document.title = 'n8n Automation | Pathflow Web Services';
      return;
    }

    if (isAppIntegrationsPage) {
      document.title = 'App Integrations | Pathflow Web Services';
      return;
    }

    if (isConnectedWebsitesPage) {
      document.title = 'Connected Websites | Pathflow Web Services';
      return;
    }

    if (isDashboardsPage) {
      document.title = 'Dashboards | Pathflow Web Services';
      return;
    }

    if (isManagedHostingPage) {
      document.title = 'Managed Hosting | Pathflow Web Services';
      return;
    }

    if (isESignaturesPage) {
      document.title = 'E-Signatures | Pathflow Web Services';
      return;
    }

    if (isCustomAppsPage) {
      document.title = 'Custom Apps | Pathflow Web Services';
      return;
    }

    document.title = 'Pathflow Web Services';
  }, [
    isCrmSystemsPage,
    isLeadIntakePage,
    isN8nAutomationPage,
    isAppIntegrationsPage,
    isConnectedWebsitesPage,
    isDashboardsPage,
    isManagedHostingPage,
    isESignaturesPage,
    isCustomAppsPage,
    isLoginPage,
    isPortalPage,
  ]);

  return (
    <main className="min-h-screen bg-black text-white">
      <Header session={session} />
      {isLoginPage && <LoginPage authReady={authReady} session={session} />}
      {isPortalPage && <PortalPage authReady={authReady} session={session} />}
      {isCrmSystemsPage && <CrmSystemsPage />}
      {isLeadIntakePage && <LeadIntakePage />}
      {isN8nAutomationPage && <N8nAutomationPage />}
      {isAppIntegrationsPage && <AppIntegrationsPage />}
      {isConnectedWebsitesPage && <ConnectedWebsitesPage />}
      {isDashboardsPage && <DashboardsPage />}
      {isManagedHostingPage && <ManagedHostingPage />}
      {isESignaturesPage && <ESignaturesPage />}
      {isCustomAppsPage && <CustomAppsPage />}
      {!isCrmSystemsPage &&
        !isLeadIntakePage &&
        !isN8nAutomationPage &&
        !isAppIntegrationsPage &&
        !isConnectedWebsitesPage &&
        !isDashboardsPage &&
        !isManagedHostingPage &&
        !isESignaturesPage &&
        !isCustomAppsPage &&
        !isLoginPage &&
        !isPortalPage && <HomePage />}
      <Footer />
    </main>
  );
}

function HomePage() {
  return (
    <div className="relative isolate overflow-hidden">
      <BeamsBackground />
      <Hero />
      <ProblemSection />
      <ServicesSection />
      <ProcessSection />
      <WorkSection />
      <CarePlansSection />
      <ContactSection />
    </div>
  );
}

function BeamsBackground() {
  return (
    <div className="beams-background" aria-hidden="true">
      <img className="wave-background" src={waveBackground} alt="" />
    </div>
  );
}

function Header({ session }) {
  const portalLabel = session ? 'Portal' : 'Log in';

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-black/[0.86] backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-3" aria-label="PathFlow home">
          <img src="/assets/logo-transparent.png" alt="" className="h-9 w-9 object-contain" />
          <span className="text-xl font-semibold leading-none text-white">PathFlow</span>
        </a>
        <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          <div className="nav-dropdown group">
            <button type="button" className="nav-link nav-trigger" aria-haspopup="true">
              <span>Services</span>
              <ChevronDown size={14} className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
            </button>
            <div className="nav-menu">
              <div className="nav-menu-panel">
                {serviceNavItems.map((item) => (
                  <a className="nav-menu-link" href={item.href} key={item.label}>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <a className="nav-link" href="/#process">
            Process
          </a>
          <a className="nav-link" href="/#work">
            Work
          </a>
          <a className="nav-link" href="/#plans">
            Care Plans
          </a>
          <a className="nav-link" href="/#contact">
            Contact
          </a>
        </div>
        <div className="flex items-center gap-3">
          <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-small btn-primary">
            <CalendarCheck size={16} />
            <span className="hidden sm:inline">Book consultation</span>
            <span className="sm:hidden">Book</span>
          </a>
          <a href={session ? '/portal' : '/login'} className="btn btn-small btn-muted">
            {portalLabel}
          </a>
        </div>
      </nav>
    </header>
  );
}

function LoginPage({ authReady, session }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function handlePasswordSignIn(event) {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!supabase || !email || !password) {
      setError('Enter your email and password.');
      return;
    }

    setIsSubmitting(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsSubmitting(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    window.location.assign('/portal');
  }

  async function handleMagicLink() {
    setError('');
    setMessage('');

    if (!supabase || !email) {
      setError('Enter your email first.');
      return;
    }

    setIsSubmitting(true);
    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/portal`,
      },
    });

    setIsSubmitting(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    setMessage('Check your email for the sign-in link.');
  }

  return (
    <PortalShell eyebrow="PathFlow Portal" title="Sign in to your workspace.">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="portal-card">
          <h2 className="text-2xl font-semibold text-white">Projects, systems, and handoff notes.</h2>
          <p className="mt-4 leading-7 text-white/65">
            Consultants can manage client project workspaces. Clients can sign in
            to see the systems, documents, dashboards, and automations built for them.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {['Client projects', 'System notes', 'Documents', 'Dashboards'].map((item) => (
              <div className="border border-white/[0.08] bg-white/[0.025] p-4 text-sm font-medium text-white/75" key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="portal-card">
          {!isSupabaseConfigured && <SupabaseSetupNotice />}

          {isSupabaseConfigured && !authReady && (
            <p className="text-sm text-white/65">Checking session...</p>
          )}

          {isSupabaseConfigured && authReady && session && (
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-white/55">Signed in</p>
              <p className="mt-4 text-lg font-semibold text-white">{session.user.email}</p>
              <a href="/portal" className="btn btn-primary mt-8">
                Continue to portal
                <ArrowRight size={18} />
              </a>
            </div>
          )}

          {isSupabaseConfigured && authReady && !session && (
            <form className="space-y-5" onSubmit={handlePasswordSignIn}>
              <div>
                <label className="block text-sm font-medium text-white/75" htmlFor="email">
                  Email
                </label>
                <input
                  className="mt-2 w-full border border-white/[0.12] bg-black px-4 py-3 text-white outline-none transition-colors placeholder:text-white/35 focus:border-white/40"
                  id="email"
                  inputMode="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  type="email"
                  value={email}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/75" htmlFor="password">
                  Password
                </label>
                <input
                  className="mt-2 w-full border border-white/[0.12] bg-black px-4 py-3 text-white outline-none transition-colors placeholder:text-white/35 focus:border-white/40"
                  id="password"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                  type="password"
                  value={password}
                />
              </div>

              {error && <p className="text-sm text-red-300">{error}</p>}
              {message && <p className="text-sm text-white/70">{message}</p>}

              <div className="flex flex-col gap-3 sm:flex-row">
                <button className="btn btn-primary" disabled={isSubmitting} type="submit">
                  Sign in
                </button>
                <button className="btn btn-secondary" disabled={isSubmitting} onClick={handleMagicLink} type="button">
                  Email magic link
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </PortalShell>
  );
}

function PortalPage({ authReady, session }) {
  const [isSigningOut, setIsSigningOut] = React.useState(false);
  const [projects, setProjects] = React.useState([]);
  const [projectsError, setProjectsError] = React.useState('');
  const [isLoadingProjects, setIsLoadingProjects] = React.useState(false);
  const role = getWorkspaceRole(session?.user);
  const isConsultant = role === 'consultant';
  const activeProjectCount = projects.filter(
    (project) => !['complete', 'completed', 'archived'].includes(project.status),
  ).length;
  const projectCards = isConsultant
    ? [
        ['Client projects', String(projects.length), 'Visible workspaces'],
        ['Open requests', '0', 'Needs review'],
        ['Active builds', String(activeProjectCount), 'In progress'],
      ]
    : [
        ['Your projects', String(projects.length), 'Shared with you'],
        ['Shared documents', '0', 'Available files'],
        ['Active builds', String(activeProjectCount), 'In progress'],
      ];

  React.useEffect(() => {
    if (!supabase || !session) {
      setProjects([]);
      return undefined;
    }

    let isMounted = true;
    setIsLoadingProjects(true);
    setProjectsError('');

    supabase
      .from('client_projects')
      .select('id, name, client_name, status, summary, updated_at')
      .order('updated_at', { ascending: false })
      .then(({ data, error }) => {
        if (!isMounted) {
          return;
        }

        if (error) {
          setProjects([]);
          setProjectsError(error.message);
          setIsLoadingProjects(false);
          return;
        }

        setProjects(data || []);
        setIsLoadingProjects(false);
      });

    return () => {
      isMounted = false;
    };
  }, [session]);

  async function handleSignOut() {
    if (!supabase) {
      return;
    }

    setIsSigningOut(true);
    await supabase.auth.signOut();
    window.location.assign('/');
  }

  return (
    <PortalShell
      eyebrow={isConsultant ? 'Consultant workspace' : 'Client workspace'}
      title={isConsultant ? 'Client project control room.' : 'Your PathFlow projects.'}
    >
      {!isSupabaseConfigured && <SupabaseSetupNotice />}

      {isSupabaseConfigured && !authReady && (
        <div className="portal-card">
          <p className="text-sm text-white/65">Loading workspace...</p>
        </div>
      )}

      {isSupabaseConfigured && authReady && !session && (
        <div className="portal-card flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Sign in required.</h2>
            <p className="mt-3 text-white/65">Use your invited email to access this workspace.</p>
          </div>
          <a href="/login" className="btn btn-primary">
            Log in
          </a>
        </div>
      )}

      {isSupabaseConfigured && authReady && session && (
        <div className="space-y-6">
          <div className="portal-card flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-white/50">{role}</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{session.user.email}</h2>
            </div>
            <button className="btn btn-muted" disabled={isSigningOut} onClick={handleSignOut} type="button">
              {isSigningOut ? 'Signing out...' : 'Sign out'}
            </button>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {projectCards.map(([label, value, caption]) => (
              <div className="portal-card" key={label}>
                <p className="text-sm uppercase tracking-[0.18em] text-white/45">{label}</p>
                <p className="mt-6 text-5xl font-semibold text-white">{value}</p>
                <p className="mt-3 text-sm text-white/55">{caption}</p>
              </div>
            ))}
          </div>

          <div className="portal-card">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-white/45">Projects</p>
                <h2 className="mt-4 text-3xl font-semibold text-white">
                  {isLoadingProjects ? 'Loading projects...' : projects.length > 0 ? 'Client project workspaces.' : 'No projects yet.'}
                </h2>
              </div>
              <span className="text-sm text-white/45">PathFlow workspace</span>
            </div>

            {projectsError && (
              <p className="mt-5 max-w-3xl text-sm leading-6 text-white/50">
                {projectsError}
              </p>
            )}

            {projects.length > 0 && (
              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                {projects.map((project) => (
                  <article className="border border-white/[0.08] bg-black/30 p-5" key={project.id}>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                        {project.client_name && (
                          <p className="mt-2 text-sm text-white/50">{project.client_name}</p>
                        )}
                      </div>
                      {project.status && (
                        <span className="border border-white/[0.1] px-2.5 py-1 text-xs uppercase tracking-[0.14em] text-white/55">
                          {project.status}
                        </span>
                      )}
                    </div>
                    {project.summary && (
                      <p className="mt-5 leading-7 text-white/65">{project.summary}</p>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </PortalShell>
  );
}

function PortalShell({ eyebrow, title, children }) {
  return (
    <section className="relative isolate min-h-screen overflow-hidden pt-32 sm:pt-36">
      <div className="absolute inset-0 -z-10 circuit-grid opacity-40" />
      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-6 lg:px-8 lg:pb-32">
        <div className="mb-12 max-w-4xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-semibold leading-[1.04] tracking-normal text-white sm:text-6xl lg:text-7xl">
            {title}
          </h1>
        </div>
        {children}
      </div>
    </section>
  );
}

function SupabaseSetupNotice() {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.18em] text-white/50">Supabase</p>
      <h2 className="mt-4 text-2xl font-semibold text-white">Auth is ready for project keys.</h2>
      <p className="mt-4 leading-7 text-white/65">
        Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env.local`,
        then restart Vite.
      </p>
    </div>
  );
}

function getWorkspaceRole(user) {
  const role = user?.app_metadata?.role || user?.user_metadata?.role;

  if (role === 'consultant' || role === 'admin') {
    return 'consultant';
  }

  return 'client';
}

function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 sm:pt-36">
      <div className="mx-auto max-w-7xl px-5 pb-28 sm:px-6 lg:px-8 lg:pb-36">
        <div className="max-w-5xl">
          <p className="mb-6 max-w-md text-sm font-medium leading-6 text-white/80">Managed web systems for service businesses.</p>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl xl:text-8xl">
            Build the system behind every client.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
            Pathflow builds and manages the systems behind your business: lead
            intake forms, CRM workflows, document collection, follow-up automation,
            dashboards, and hosting.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-primary">
              <CalendarCheck size={18} />
              Book your free consultation
            </a>
            <a href="#services" className="btn btn-secondary">
              See services
              <ArrowDown size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CrmSystemsPage() {
  return (
    <>
      <section id="top" className="relative isolate overflow-hidden pt-32 sm:pt-36">
        <div className="absolute inset-0 -z-10 circuit-grid" />
        <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-6 lg:px-8 lg:pb-32">
          <div className="max-w-5xl">
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.18em] text-white/75">
              CRM Systems
            </p>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[1.04] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Clean CRM systems that keep leads moving.
            </h1>
            <div className="mt-8 max-w-3xl space-y-5 text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
              <p>
                Pathflow sets up, organizes, and improves CRM systems so leads,
                contacts, opportunities, follow-ups, and pipeline stages are easy
                to manage across tools like GoHighLevel, Salesforce, HubSpot, and
                Zoho.
              </p>
              <p>
                A well-structured CRM should show your team what needs attention,
                where each lead stands, and what happens next. Pathflow helps turn
                scattered contacts, unclear stages, and manual follow-up into a
                cleaner system your business can actually use.
              </p>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-primary">
                <CalendarCheck size={18} />
                Book a workflow consultation
              </a>
              <a href="/#services" className="btn btn-secondary">
                See all services
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <PageTextBlock title="What this solves">
            <p>
              Many businesses have a CRM, but the setup does not match how the
              business actually works. Leads may enter from different sources,
              follow-up can depend on memory, pipeline stages may be unclear, and
              reporting becomes difficult when fields, tags, and workflows are
              inconsistent.
            </p>
            <p>
              Pathflow helps clean up the structure and connect the CRM to the
              rest of your lead flow.
            </p>
          </PageTextBlock>

          <PageTextBlock title="How it connects">
            <p>
              Your CRM should not sit on its own. Pathflow can connect it with
              your website, intake forms, document collection, email/SMS follow-up,
              dashboards, and automation workflows.
            </p>
            <p>
              The goal is simple: every lead should have a clear path from first
              contact to next step.
            </p>
          </PageTextBlock>
        </div>
      </section>

      <ServiceDetailList
        eyebrow="What Pathflow can help with"
        title="CRM structure, automation, reporting foundations, and handoff."
        items={crmHelpItems}
      />

      <ServiceDetailList
        eyebrow="Common use cases"
        title="Practical CRM work for service businesses with active lead flow."
        items={crmUseCases}
      />

      <section className="border-y border-white/[0.06] bg-black">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow">Workflow consultation</p>
            <h2 className="section-title mt-4">
              Review your current CRM and find the stuck points.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/70">
              Book a workflow consultation to review your current CRM setup and
              identify where the system can be simplified, cleaned up, or better
              connected.
            </p>
          </div>
          <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-primary">
            <CalendarCheck size={18} />
            Book a workflow consultation
          </a>
        </div>
      </section>
    </>
  );
}

function LeadIntakePage() {
  return (
    <>
      <section id="top" className="relative isolate overflow-hidden pt-32 sm:pt-36">
        <div className="absolute inset-0 -z-10 circuit-grid" />
        <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-6 lg:px-8 lg:pb-32">
          <div className="max-w-5xl">
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.18em] text-white/75">
              Lead Intake
            </p>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[1.04] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Turn new leads into clean, trackable intake records.
            </h1>
            <div className="mt-8 max-w-3xl space-y-5 text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
              <p>
                Pathflow builds lead intake systems that collect the right
                information, update your CRM, trigger follow-up, and keep your
                team informed.
              </p>
              <p>
                Instead of relying on scattered forms, inboxes, spreadsheets, and
                manual reminders, your intake process becomes a connected flow
                from first submission to next step.
              </p>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-primary">
                <CalendarCheck size={18} />
                Book a workflow consultation
              </a>
              <a href="/#services" className="btn btn-secondary">
                See all services
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <PageTextBlock title="What this solves">
            <p>
              Many businesses capture leads, but the process after that is often
              manual or unclear.
            </p>
            <p>
              A form may send an email, but the CRM is not updated. A client may
              start an intake form but never finish it. Documents may be requested
              manually. Follow-up may depend on someone remembering to check an
              inbox or send a text.
            </p>
            <p>
              Pathflow helps turn that process into a structured system.
            </p>
          </PageTextBlock>

          <PageTextBlock title="How it connects">
            <p>
              Lead intake works best when it connects to the rest of your business
              system.
            </p>
            <p>
              Pathflow can connect your intake forms with your CRM, document
              collection, e-signature workflows, email/SMS follow-up, dashboards,
              and internal alerts.
            </p>
            <p>
              The goal is to make sure every lead is captured, tracked, and moved
              forward without unnecessary manual chasing.
            </p>
          </PageTextBlock>
        </div>
      </section>

      <ServiceDetailList
        eyebrow="What Pathflow can help with"
        title="Intake forms, CRM records, reminders, alerts, documents, and reporting."
        items={leadIntakeHelpItems}
      />

      <ServiceDetailList
        eyebrow="Common use cases"
        title="A cleaner path from first submission to the next step."
        items={leadIntakeUseCases}
      />

      <section className="border-y border-white/[0.06] bg-black">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow">Workflow consultation</p>
            <h2 className="section-title mt-4">
              Review your current intake process and find the manual gaps.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/70">
              Book a workflow consultation to review your current intake process
              and see where it can be simplified, automated, or better connected.
            </p>
          </div>
          <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-primary">
            <CalendarCheck size={18} />
            Book a workflow consultation
          </a>
        </div>
      </section>
    </>
  );
}

function N8nAutomationPage() {
  return (
    <>
      <section id="top" className="relative isolate overflow-hidden pt-32 sm:pt-36">
        <div className="absolute inset-0 -z-10 circuit-grid" />
        <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-6 lg:px-8 lg:pb-32">
          <div className="max-w-5xl">
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.18em] text-white/75">
              n8n Automation
            </p>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[1.04] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Powerful automations without the Zapier bill.
            </h1>
            <div className="mt-8 max-w-3xl space-y-5 text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
              <p>
                Pathflow sets up, hosts, and maintains n8n automation systems
                that connect your apps, move data between tools, and reduce
                manual work.
              </p>
              <p>
                For many businesses, Zapier and similar tools become expensive as
                workflows grow. n8n gives you more flexibility, more control, and
                the ability to run advanced automations without paying per task or
                constantly worrying about usage limits.
              </p>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-primary">
                <CalendarCheck size={18} />
                Book a workflow consultation
              </a>
              <a href="/#services" className="btn btn-secondary">
                See all services
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <PageTextBlock title="What this solves">
            <p>
              Many businesses start with simple automations, then slowly end up
              with a growing list of Zaps, tasks, filters, delays, webhooks, and
              monthly charges.
            </p>
            <p>
              Over time, those workflows can become hard to manage. Some
              automations break silently, some are difficult to modify, and the
              cost can keep increasing as the business adds more leads, forms,
              campaigns, and follow-up steps.
            </p>
            <p>
              Pathflow helps replace brittle or expensive automation chains with a
              managed n8n setup that is easier to expand and maintain.
            </p>
          </PageTextBlock>

          <PageTextBlock title="Why n8n">
            <p>
              n8n is a powerful workflow automation platform that can connect
              CRMs, websites, forms, email, SMS, spreadsheets, databases, APIs,
              and internal tools.
            </p>
            <p>
              Compared to many task-based automation platforms, n8n can be much
              more cost-effective for businesses that need multiple workflows or
              higher execution volume. It is also more flexible for custom API
              logic, webhook routing, data transformations, and multi-step
              business processes.
            </p>
          </PageTextBlock>
        </div>
      </section>

      <ServiceDetailList
        eyebrow="What Pathflow can help with"
        title="Managed n8n hosting, migrations, workflows, monitoring, and maintenance."
        items={n8nHelpItems}
      />

      <ServiceDetailList
        eyebrow="Common use cases"
        title="Automation work that connects the tools your business already uses."
        items={n8nUseCases}
      />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <PageTextBlock title="How it connects">
            <p>
              n8n becomes the automation layer between the tools your business
              already uses.
            </p>
            <p>
              Pathflow can connect n8n with your website, CRM, intake forms,
              email, SMS, dashboards, document workflows, and internal apps.
              Instead of relying on disconnected manual steps, your tools can work
              together through a managed automation system.
            </p>
          </PageTextBlock>

          <PageTextBlock title="Managed by Pathflow">
            <p>
              Pathflow can host and maintain your n8n instance so you do not need
              to manage servers, updates, SSL, backups, or monitoring yourself.
            </p>
            <p>
              That means you get the flexibility and cost advantages of n8n
              without having to become the technical admin for another tool.
            </p>
          </PageTextBlock>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-black">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow">Workflow consultation</p>
            <h2 className="section-title mt-4">
              Review your automations and find the expensive or fragile parts.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/70">
              Book a workflow consultation to review your current automations and
              see where n8n can reduce cost, improve flexibility, or replace
              manual work.
            </p>
          </div>
          <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-primary">
            <CalendarCheck size={18} />
            Book a workflow consultation
          </a>
        </div>
      </section>
    </>
  );
}

function AppIntegrationsPage() {
  return (
    <>
      <section id="top" className="relative isolate overflow-hidden pt-32 sm:pt-36">
        <div className="absolute inset-0 -z-10 circuit-grid" />
        <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-6 lg:px-8 lg:pb-32">
          <div className="max-w-5xl">
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.18em] text-white/75">
              App Integrations
            </p>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[1.04] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Connect the tools your business depends on.
            </h1>
            <div className="mt-8 max-w-3xl space-y-5 text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
              <p>
                Pathflow connects your existing apps, sets up new tools, and
                builds the workflows that help your systems work together.
              </p>
              <p>
                Whether you are using a CRM, website forms, SMS, email, voice AI,
                dashboards, document tools, cloud storage, or self-hosted software,
                the goal is the same: your data should move cleanly between
                systems without manual copying, duplicated work, or disconnected
                processes.
              </p>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-primary">
                <CalendarCheck size={18} />
                Book a workflow consultation
              </a>
              <a href="/#services" className="btn btn-secondary">
                See all services
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <PageTextBlock title="What this solves">
            <p>
              Many businesses rely on several apps to manage leads, clients,
              documents, communication, and reporting. The problem is that those
              tools often do not work together by default.
            </p>
            <p>
              A lead may submit a form, but the CRM is not updated. A call may
              happen, but the notes are not saved. A document may be signed, but
              the team is not notified. A dashboard may exist, but the data is
              incomplete.
            </p>
            <p>
              Pathflow helps connect those gaps so your tools support one clear
              workflow.
            </p>
          </PageTextBlock>

          <PageTextBlock title="How it connects">
            <p>
              App integrations are the connective layer between your website,
              CRM, intake process, documents, communication tools, dashboards, and
              internal systems.
            </p>
            <p>
              Pathflow can work with the tools you already use or help set up new
              tools when your current stack is missing something important.
            </p>
            <p>
              The goal is not to add more software for the sake of it. The goal is
              to make your tools work together in a way that supports the business
              process.
            </p>
          </PageTextBlock>
        </div>
      </section>

      <ServiceDetailList
        eyebrow="What Pathflow can help with"
        title="Integrations, setup, routing, syncs, monitoring, and custom logic."
        items={appIntegrationHelpItems}
      />

      <ServiceDetailList
        eyebrow="Tools Pathflow can connect or set up"
        title="Business apps, communication tools, document systems, dashboards, and APIs."
        items={appIntegrationTools}
      />

      <ServiceDetailList
        eyebrow="Common use cases"
        title="Cleaner handoffs between the apps your business already uses."
        items={appIntegrationUseCases}
      />

      <section className="border-y border-white/[0.06] bg-black">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow">Workflow consultation</p>
            <h2 className="section-title mt-4">
              Review your tools and find the disconnected parts.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/70">
              Book a workflow consultation to review your current tools and
              identify where better integrations could reduce manual work,
              improve visibility, or create a cleaner lead-to-client process.
            </p>
          </div>
          <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-primary">
            <CalendarCheck size={18} />
            Book a workflow consultation
          </a>
        </div>
      </section>
    </>
  );
}

function ConnectedWebsitesPage() {
  return (
    <>
      <section id="top" className="relative isolate overflow-hidden pt-32 sm:pt-36">
        <div className="absolute inset-0 -z-10 circuit-grid" />
        <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-6 lg:px-8 lg:pb-32">
          <div className="max-w-5xl">
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.18em] text-white/75">
              Connected Websites
            </p>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[1.04] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Websites built, hosted, and connected properly.
            </h1>
            <div className="mt-8 max-w-3xl space-y-5 text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
              <p>
                Pathflow builds custom websites, landing pages, and intake pages
                that connect to the systems behind your business.
              </p>
              <p>
                A website should do more than exist online. It should capture
                leads, send information to the right place, trigger the right
                follow-up, and give your team a clear process for what happens
                next.
              </p>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-primary">
                <CalendarCheck size={18} />
                Book a workflow consultation
              </a>
              <a href="/#services" className="btn btn-secondary">
                See all services
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <PageTextBlock title="What this solves">
            <p>
              Many small business websites are built as one-off pages, then left
              behind with unclear hosting, broken forms, no version history, and
              little connection to the rest of the business.
            </p>
            <p>
              A form may send an email, but not update the CRM. A domain may be
              connected through an old account nobody understands. Website changes
              may happen without backups or version history. Leads may come in
              without source tracking, follow-up, or reporting.
            </p>
            <p>
              Pathflow helps turn your website into a connected part of your
              business system.
            </p>
          </PageTextBlock>

          <PageTextBlock title="How it connects">
            <p>
              Your website is often the first step in the lead journey, but it
              should not be the last place the data goes.
            </p>
            <p>
              Pathflow can connect your website with your CRM, intake forms, n8n
              automations, email/SMS follow-up, analytics, dashboards, document
              workflows, and databases.
            </p>
            <p>
              The goal is to make sure every website visit, form submission, and
              campaign lead has a clear next step.
            </p>
          </PageTextBlock>
        </div>
      </section>

      <ServiceDetailList
        eyebrow="What Pathflow can help with"
        title="Websites, landing pages, hosting, domains, forms, analytics, and maintenance."
        items={connectedWebsitesHelpItems}
      />

      <ServiceDetailList
        eyebrow="Common use cases"
        title="Website work that connects the front door to the rest of the business."
        items={connectedWebsitesUseCases}
      />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <PageTextBlock title="Managed website infrastructure">
          <p>
            Pathflow can also manage the technical foundation behind your site,
            including hosting, deployment, version control, DNS, SSL, monitoring,
            and updates.
          </p>
          <p>
            Instead of relying on a fragile website setup that only one person
            understands, your site can be versioned, documented, hosted properly,
            and easier to maintain over time.
          </p>
        </PageTextBlock>
      </section>

      <section className="border-y border-white/[0.06] bg-black">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow">Workflow consultation</p>
            <h2 className="section-title mt-4">
              Review your website setup and find what should be connected.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/70">
              Book a workflow consultation to review your current website setup
              and see how it can be better hosted, connected, and maintained.
            </p>
          </div>
          <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-primary">
            <CalendarCheck size={18} />
            Book a workflow consultation
          </a>
        </div>
      </section>
    </>
  );
}

function DashboardsPage() {
  return (
    <>
      <section id="top" className="relative isolate overflow-hidden pt-32 sm:pt-36">
        <div className="absolute inset-0 -z-10 circuit-grid" />
        <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-6 lg:px-8 lg:pb-32">
          <div className="max-w-5xl">
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.18em] text-white/75">
              Dashboards
            </p>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[1.04] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Clear dashboards for the systems your business depends on.
            </h1>
            <div className="mt-8 max-w-3xl space-y-5 text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
              <p>
                Pathflow builds dashboards that help you see what is happening
                across your leads, intake process, CRM, workflows, documents, and
                operations.
              </p>
              <p>
                Dashboards can be created inside tools you already use or hosted
                as part of a managed Pathflow setup. The goal is to give your
                team a clearer view of what is working, what needs attention, and
                where leads or tasks may be getting stuck.
              </p>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-primary">
                <CalendarCheck size={18} />
                Book a workflow consultation
              </a>
              <a href="/#services" className="btn btn-secondary">
                See all services
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <PageTextBlock title="What this solves">
            <p>
              Many businesses have data spread across different tools: website
              forms, CRMs, spreadsheets, email, SMS, workflow tools, document
              systems, and ad platforms.
            </p>
            <p>
              The information may exist, but it is often hard to see in one
              place. Teams may not know which leads completed intake, which
              documents are missing, which campaigns are performing, or which
              workflows need attention.
            </p>
            <p>
              Pathflow helps turn scattered data into practical dashboards your
              business can actually use.
            </p>
          </PageTextBlock>

          <PageTextBlock title="How it connects">
            <p>
              Dashboards work best when they are connected to the systems that run
              your business.
            </p>
            <p>
              Pathflow can connect dashboards to your CRM, website forms, intake
              systems, n8n workflows, spreadsheets, databases, document tools, and
              custom apps.
            </p>
            <p>
              Depending on the project, dashboards can be built inside your
              existing tools or hosted separately using tools like Grafana,
              Metabase, custom web apps, or other reporting systems.
            </p>
          </PageTextBlock>
        </div>
      </section>

      <ServiceDetailList
        eyebrow="What Pathflow can help with"
        title="Lead, intake, CRM, document, workflow, uptime, and performance reporting."
        items={dashboardsHelpItems}
      />

      <ServiceDetailList
        eyebrow="Common use cases"
        title="Views that help your team see what needs attention."
        items={dashboardsUseCases}
      />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <PageTextBlock title="Managed reporting setup">
          <p>
            Pathflow can also help maintain the reporting layer behind your
            dashboards, including data connections, scheduled updates, hosted
            dashboard tools, monitoring, and ongoing improvements.
          </p>
          <p>
            Instead of manually checking multiple apps, your team can use a
            clearer view of the systems that matter most.
          </p>
        </PageTextBlock>
      </section>

      <section className="border-y border-white/[0.06] bg-black">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow">Workflow consultation</p>
            <h2 className="section-title mt-4">
              Review your reporting setup and find what your team cannot see.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/70">
              Book a workflow consultation to review your current reporting setup
              and see where dashboards can give you better visibility into leads,
              workflows, and business performance.
            </p>
          </div>
          <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-primary">
            <CalendarCheck size={18} />
            Book a workflow consultation
          </a>
        </div>
      </section>
    </>
  );
}

function ManagedHostingPage() {
  return (
    <>
      <section id="top" className="relative isolate overflow-hidden pt-32 sm:pt-36">
        <div className="absolute inset-0 -z-10 circuit-grid" />
        <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-6 lg:px-8 lg:pb-32">
          <div className="max-w-5xl">
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.18em] text-white/75">
              Managed Hosting
            </p>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[1.04] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Hosting for the systems your business depends on.
            </h1>
            <div className="mt-8 max-w-3xl space-y-5 text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
              <p>
                Pathflow hosts and maintains websites, automations, dashboards,
                forms, document tools, databases, and internal systems so your
                business does not have to manage the technical foundation alone.
              </p>
              <p>
                Managed hosting gives your business a cleaner setup for
                deployment, domains, SSL, monitoring, backups, updates, and
                ongoing support.
              </p>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-primary">
                <CalendarCheck size={18} />
                Book a workflow consultation
              </a>
              <a href="/#services" className="btn btn-secondary">
                See all services
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <PageTextBlock title="What this solves">
            <p>
              Many businesses rely on important systems that are hosted across
              different accounts, platforms, and providers. A website may live in
              one place, automations in another, dashboards somewhere else, and
              domain settings inside an account nobody checks until something
              breaks.
            </p>
            <p>
              This can make updates difficult, troubleshooting slow, and ownership
              unclear.
            </p>
            <p>
              Pathflow helps create a more organized hosting setup for the systems
              that support your lead flow, client intake, automations, reporting,
              and operations.
            </p>
          </PageTextBlock>

          <PageTextBlock title="How it connects">
            <p>
              Managed hosting works best when it supports the rest of your
              business system.
            </p>
            <p>
              Pathflow can host or manage the infrastructure behind your websites,
              intake forms, automations, dashboards, document workflows, databases,
              and custom apps.
            </p>
            <p>
              The goal is to make sure the systems behind your business are not
              only built, but also reachable, monitored, documented, and easier to
              maintain.
            </p>
          </PageTextBlock>
        </div>
      </section>

      <ServiceDetailList
        eyebrow="What Pathflow can help with"
        title="Hosting, domains, SSL, deployments, backups, monitoring, and infrastructure."
        items={managedHostingHelpItems}
      />

      <ServiceDetailList
        eyebrow="Common use cases"
        title="A more reliable foundation for the systems your business runs on."
        items={managedHostingUseCases}
      />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <PageTextBlock title="Managed infrastructure">
            <p>
              Depending on the project, Pathflow can use simple static hosting,
              GitHub-based deployments, Cloudflare, AWS, Docker, databases, or
              other infrastructure.
            </p>
            <p>
              For smaller projects, the setup can stay lightweight and
              cost-effective. For more advanced systems, Pathflow can support
              containerized deployments, Kubernetes-ready infrastructure, and
              scalable cloud architecture when the business needs higher
              availability, stronger isolation, or room to grow.
            </p>
          </PageTextBlock>

          <PageTextBlock title="Ongoing care">
            <p>
              Hosting does not end when a site, automation, or internal system
              goes live.
            </p>
            <p>
              Pathflow can provide ongoing care for hosted systems, including
              uptime checks, backups, workflow monitoring, SSL/DNS checks, updates,
              small fixes, and support requests.
            </p>
            <p>
              This gives your business a clearer point of responsibility when
              something needs to be changed, checked, or improved.
            </p>
          </PageTextBlock>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-black">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow">Workflow consultation</p>
            <h2 className="section-title mt-4">
              Review your hosting setup and find what needs a clearer foundation.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/70">
              Book a workflow consultation to review your current hosting setup
              and see where your websites, automations, dashboards, databases, or
              internal tools can be hosted and maintained more reliably.
            </p>
          </div>
          <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-primary">
            <CalendarCheck size={18} />
            Book a workflow consultation
          </a>
        </div>
      </section>
    </>
  );
}

function ESignaturesPage() {
  return (
    <>
      <section id="top" className="relative isolate overflow-hidden pt-32 sm:pt-36">
        <div className="absolute inset-0 -z-10 circuit-grid" />
        <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-6 lg:px-8 lg:pb-32">
          <div className="max-w-5xl">
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.18em] text-white/75">
              E-Signatures
            </p>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[1.04] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Cost-effective digital signing connected to your workflow.
            </h1>
            <div className="mt-8 max-w-3xl space-y-5 text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
              <p>
                Pathflow sets up and manages e-signature workflows for forms,
                agreements, authorizations, intake packages, and client documents.
              </p>
              <p>
                Instead of paying for more software than your business needs,
                Pathflow can help you create a leaner signing process that
                connects to your CRM, automations, document tracking, and
                follow-up workflows.
              </p>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-primary">
                <CalendarCheck size={18} />
                Book a workflow consultation
              </a>
              <a href="/#services" className="btn btn-secondary">
                See all services
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <PageTextBlock title="What this solves">
            <p>
              Many businesses still send documents manually, chase signatures over
              email, or rely on expensive signing tools that are not connected to
              the rest of their process.
            </p>
            <p>
              A document may be sent, but the CRM is not updated. A client may
              sign, but the team is not notified. A file may be completed, but
              nobody knows which stage should change next.
            </p>
            <p>
              Pathflow helps turn signing into a connected part of your lead,
              intake, or client workflow.
            </p>
          </PageTextBlock>

          <PageTextBlock title="How it connects">
            <p>
              E-signatures work best when they are part of the larger business
              process.
            </p>
            <p>
              Pathflow can connect signing workflows with your website, intake
              forms, CRM, n8n automations, email/SMS follow-up, dashboards, and
              document storage.
            </p>
            <p>
              The goal is to make sure every document request has a clear status,
              every signature triggers the right next step, and your team does not
              have to manually chase or update records.
            </p>
          </PageTextBlock>
        </div>
      </section>

      <ServiceDetailList
        eyebrow="What Pathflow can help with"
        title="Signing setup, templates, CRM triggers, notifications, tracking, and reporting."
        items={eSignatureHelpItems}
      />

      <ServiceDetailList
        eyebrow="Common use cases"
        title="A cleaner document signing process connected to your workflow."
        items={eSignatureUseCases}
      />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <PageTextBlock title="Managed signing setup">
          <p>
            Pathflow can host and maintain a signing system for your business,
            including templates, document flows, automation triggers, monitoring,
            and updates.
          </p>
          <p>
            This can be a more cost-effective option for businesses that need
            reliable digital signing without paying for a large enterprise
            document platform.
          </p>
        </PageTextBlock>
      </section>

      <section className="border-y border-white/[0.06] bg-black">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow">Workflow consultation</p>
            <h2 className="section-title mt-4">
              Review your signing process and find what should happen next.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/70">
              Book a workflow consultation to review your current document signing
              process and see how it can be simplified, automated, and connected
              to the rest of your business.
            </p>
          </div>
          <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-primary">
            <CalendarCheck size={18} />
            Book a workflow consultation
          </a>
        </div>
      </section>
    </>
  );
}

function CustomAppsPage() {
  return (
    <>
      <section id="top" className="relative isolate overflow-hidden pt-32 sm:pt-36">
        <div className="absolute inset-0 -z-10 circuit-grid" />
        <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-6 lg:px-8 lg:pb-32">
          <div className="max-w-5xl">
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.18em] text-white/75">
              Custom Apps
            </p>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[1.04] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Custom tools for the workflows your software does not cover.
            </h1>
            <div className="mt-8 max-w-3xl space-y-5 text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
              <p>
                Pathflow builds lightweight custom apps, portals, dashboards,
                admin panels, and workflow tools for businesses that need
                something more specific than off-the-shelf software.
              </p>
              <p>
                Sometimes your CRM, website, automation platform, or spreadsheet
                can handle most of the process, but there is still a missing
                piece. Pathflow can build that missing piece and connect it to
                the rest of your system.
              </p>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-primary">
                <CalendarCheck size={18} />
                Book a workflow consultation
              </a>
              <a href="/#services" className="btn btn-secondary">
                See all services
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <PageTextBlock title="What this solves">
            <p>
              Many businesses end up working around software limitations with
              spreadsheets, manual tasks, duplicate data entry, or long chains of
              disconnected tools.
            </p>
            <p>
              A team may need a better way to review intake submissions, track
              missing documents, route leads, manage internal requests, view
              client status, or trigger specific workflows. Existing tools may
              not provide the right interface, and building a full software
              product may be unnecessary.
            </p>
            <p>
              Pathflow helps create focused internal tools that solve the
              specific workflow problem without adding more complexity than
              needed.
            </p>
          </PageTextBlock>

          <PageTextBlock title="How it connects">
            <p>
              Custom apps work best when they are connected to the systems your
              business already uses.
            </p>
            <p>
              Pathflow can connect custom apps with your CRM, website forms,
              databases, n8n automations, document tools, dashboards, email/SMS
              workflows, and hosted infrastructure.
            </p>
            <p>
              The goal is to build the missing interface or workflow layer that
              helps your team work more clearly without forcing your business
              into a completely new platform.
            </p>
          </PageTextBlock>
        </div>
      </section>

      <ServiceDetailList
        eyebrow="What Pathflow can help with"
        title="Focused internal tools, portals, dashboards, panels, forms, and hosted apps."
        items={customAppsHelpItems}
      />

      <ServiceDetailList
        eyebrow="Common use cases"
        title="Small, useful software for the workflow gaps your current stack does not cover."
        items={customAppsUseCases}
      />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <PageTextBlock title="Built to fit the job">
          <p>
            Not every business problem needs a large software project.
          </p>
          <p>
            Some problems are best solved with a focused internal tool: a clean
            screen, a reliable workflow, a simple database, and the right
            integrations.
          </p>
          <p>
            Pathflow can help design, build, host, and maintain these tools so
            they fit into your existing process and can grow as your needs
            change.
          </p>
        </PageTextBlock>
      </section>

      <section className="border-y border-white/[0.06] bg-black">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow">Workflow consultation</p>
            <h2 className="section-title mt-4">
              Review the process you are trying to improve.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/70">
              Book a workflow consultation to review the process you are trying
              to improve and see whether a custom app, portal, dashboard, or
              internal tool is the right fit.
            </p>
          </div>
          <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-primary">
            <CalendarCheck size={18} />
            Book a workflow consultation
          </a>
        </div>
      </section>
    </>
  );
}

function PageTextBlock({ title, children }) {
  return (
    <article>
      <p className="eyebrow">{title}</p>
      <div className="mt-5 space-y-5 text-lg leading-8 text-white/70">
        {children}
      </div>
    </article>
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

function ProblemSection() {
  return (
    <Section id="problem" eyebrow="The real problem" title="Most businesses don't have a website problem. They have a flow problem.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((problem) => (
          <div className="problem-card group" key={problem}>
            <div className="mb-5 flex h-9 w-9 items-center justify-center border border-white/[0.08] bg-black group-hover:border-white/30">
              <CheckCircle2 size={18} className="text-white/75" />
            </div>
            <p className="text-lg font-medium text-white">{problem}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ServicesSection() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="Service modules for the full lead journey."
      intro="Websites are one part of the system. Pathflow connects the intake, CRM, documents, automation, reporting, and ongoing care around them."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map(({ title, description, icon: Icon }) => (
          <article className="service-card" key={title}>
            <Icon size={24} className="text-white/75" />
            <h3 className="mt-6 text-2xl font-semibold leading-tight text-white">{title}</h3>
            <p className="mt-3 leading-7 text-white/70">{description}</p>
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
    </Section>
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
      <div className="grid gap-5 lg:grid-cols-3">
        {work.map(({ label, title, description, icon: Icon }) => (
          <article className="work-card" key={title}>
            <div className="flex items-center justify-between gap-4">
              <span className="border border-white/20 bg-white/[0.04] px-2.5 py-1 text-xs text-white/75">{label}</span>
              <Icon size={21} className="text-white/60" />
            </div>
            <h3 className="mt-8 text-xl font-semibold text-white">{title}</h3>
            <p className="mt-3 leading-7 text-white/70">{description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function CarePlansSection() {
  return (
    <Section
      id="plans"
      eyebrow="Managed care plans"
      title="Keep the system working after launch."
      intro="Choose a project, keep the infrastructure healthy, or keep improving the operation month by month."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {plans.map(({ title, description, icon: Icon }) => (
          <article className="plan-card" key={title}>
            <Icon size={24} className="text-white/75" />
            <h3 className="mt-7 text-2xl font-semibold text-white">{title}</h3>
            <p className="mt-3 leading-7 text-white/70">{description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden border-y border-white/[0.06] bg-black">
      <div className="absolute inset-0 circuit-grid opacity-25" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-28">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 className="section-title mt-4">Find the gaps in your workflow.</h2>
        </div>
        <div className="border border-white/[0.08] bg-black p-6 sm:p-8">
          <p className="text-lg leading-8 text-white/70">
            Send a few details about your website, CRM, forms, and current process.
            I'll help identify where leads, documents, or follow-ups are getting stuck.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="mailto:vladimir@getpathflow.com?subject=Workflow%20audit&body=Name%3A%0ACompany%3A%0AWebsite%3A%0AWhat%20are%20you%20trying%20to%20fix%3A" className="btn btn-primary">
              <Mail size={18} />
              <span className="min-w-0 break-all sm:break-normal">Email vladimir@getpathflow.com</span>
            </a>
            <a href="#services" className="btn btn-secondary">
              <Map size={18} />
              Review services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({ id, eyebrow, title, intro, children }) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-28">
      <div className="mb-12 max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title mt-4">{title}</h2>
        {intro && <p className="mt-5 text-lg leading-8 text-white/70">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <p>Pathflow Web Services</p>
      <p>Connected web systems for service businesses.</p>
    </footer>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
