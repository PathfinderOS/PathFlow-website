export const resourceArticles = [
  {
    path: '/resources/github-self-hosted-runner-brownouts-2026',
    slug: 'github-self-hosted-runner-brownouts-2026',
    category: 'DevOps',
    type: 'guide',
    topics: ['DevOps', 'Infrastructure', 'Operations'],
    status: 'published',
    publishedAt: '2026-08-22',
    eyebrow: 'Resources / DevOps',
    title: 'GitHub Self-Hosted Runner Brownouts Start August 24: Check Your Deployment Infrastructure',
    shortTitle: 'GitHub Self-Hosted Runner Brownouts',
    description:
      'GitHub begins brownouts for outdated self-hosted Actions runners on August 24, 2026. Check runner versions, update behavior, deployment tests and fallback plans before enforcement.',
    dek:
      'Your CI/CD pipeline has dependencies too. A deployment can stop working even when the application has not changed, simply because the self-hosted runner under it is no longer supported.',
    readingTime: '11 min read',
    tags: ['GitHub Actions', 'Self-hosted runners', 'CI/CD', 'Deployment infrastructure'],
    image: {
      src: '/resources/github-self-hosted-runner-brownouts-2026.png',
      alt: 'Dark server rack with a single amber status light representing self-hosted runner brownout risk.',
    },
    seo: {
      title: 'GitHub Self-Hosted Runner Brownouts Start August 24, 2026',
      description:
        'GitHub begins brownouts for outdated self-hosted Actions runners on August 24, 2026. Learn how to inventory runners, verify updates, test deployments, and avoid surprise CI/CD failures.',
      ogTitle: 'GitHub Self-Hosted Runner Brownouts Start August 24, 2026',
    },
    sections: [
      {
        id: 'intro',
        type: 'intro',
        paragraphs: [
          'GitHub is beginning brownouts for outdated self-hosted GitHub Actions runners on August 24, 2026 for GitHub Enterprise Cloud.',
          'The brownouts increase through September, and full enforcement begins September 25, 2026.',
          'During the rollout, unsupported runners may be unable to register. Existing registered runners can also eventually stop accepting workflow jobs if they fall behind the supported runner version window.',
          'That failure can look confusing from the application side. The repository did not change. The deployment workflow did not change. The runner became an unsupported operational dependency.',
        ],
        questionsLabel: 'Runner brownout risk questions',
        questions: [
          'Where are the self-hosted runners?',
          'Which workflows depend on them?',
          'Are they actually updating?',
          'What happens if one stops accepting jobs?',
        ],
        closing:
          'The application can be healthy while the deployment path underneath it is aging out.',
      },
      {
        id: 'short-version',
        type: 'short',
        title: 'The short version',
        paragraphs: [
          'For GitHub Enterprise Cloud, brownouts start August 24, 2026 and increase through September.',
          'Full enforcement starts September 25, 2026.',
          'Runner version 2.329.0 is the minimum for configuration and registration, but job execution has a moving support window because runners must keep up with new releases.',
          'Do not only update the live machine. Update the scripts, images, templates and manifests that recreate it.',
          'Run a real deployment before the brownout window. "Online" is not the same thing as "able to deploy production."',
        ],
      },
      {
        id: 'why-consultants-should-care',
        type: 'prose',
        title: 'Why consultants should care',
        paragraphs: [
          'Self-hosted runners are easy to lose track of once deployments start passing.',
          'Someone installs a GitHub self-hosted runner on a VPS, EC2 instance, Proxmox VM, Kubernetes node, Docker host, on-prem server or client-owned machine. The workflow goes green. The client stops thinking about it. Six months later, the runner may no longer have an active maintenance owner.',
          'That becomes a problem when GitHub changes the supported runner window.',
          'If you manage client infrastructure, the runner is not just a CI/CD detail. It is part of the deployment path. It may hold access to build secrets, cloud credentials, SSH keys, container registries, production hosts and release automation.',
        ],
        diagram: {
          kind: 'flow',
          label: 'Deployment path with a self-hosted runner dependency',
          items: ['GitHub workflow', 'Self-hosted runner', 'Build and test', 'Deploy target', 'Production'],
        },
        emphasis:
          'A common ticket is: "Nothing changed. Why did production stop deploying?" Sometimes the change is in the deployment infrastructure, not the application.',
      },
      {
        id: 'inventory-now',
        type: 'checklist',
        title: 'What to inventory now',
        paragraphs: [
          'Start with a runner inventory that records ownership, maintenance state and deployment dependencies.',
          'For each GitHub self-hosted runner, record enough information that someone else can find it, understand what depends on it and decide how it should be maintained.',
        ],
        listLabel: 'Self-hosted runner inventory checklist',
        groups: [
          {
            title: 'Runner record',
            items: [
              'Runner name',
              'Hostname or infrastructure location',
              'Environment: production, staging or development',
              'Current GitHub Actions runner version',
              'Runner labels',
              'Repository, organization or enterprise ownership',
              'Workflows that target the runner labels',
              'Secrets, credentials or deployment permissions available to jobs',
            ],
          },
          {
            title: 'Maintenance record',
            items: [
              'Whether auto-update is enabled',
              'Whether auto-update is actually working',
              'Who owns runner maintenance',
              'How runner updates are tested',
              'Fallback deployment method',
              'Date the record was last verified',
            ],
          },
        ],
        closing:
          'If the runner location and owner are not written down, recovery depends on memory instead of process.',
      },
      {
        id: 'stale-provisioning',
        type: 'prose',
        title: 'Check the provisioning source, not only the live runner',
        paragraphs: [
          'Manually updating the live runner is useful, but it is not enough if the next rebuild installs the old version again.',
          'Consultants often inherit systems where the production VM is newer than the template that creates it. That works until a recovery event, migration or rebuild reinstalls the unsupported runner.',
        ],
        listTitle: 'Look for stale runner installation logic in:',
        list: [
          'Terraform',
          'cloud-init',
          'Dockerfiles',
          'VM templates',
          'AMIs or other machine images',
          'Ansible roles and playbooks',
          'Shell installation scripts',
          'Kubernetes manifests',
          'Actions Runner Controller values or Helm releases',
        ],
        emphasis:
          'The source of truth has to be current, not just the machine that happens to be alive today.',
      },
      {
        id: 'check-installed-version',
        type: 'prose',
        title: 'How to check the installed runner version on Linux',
        paragraphs: [
          'Do not rely on a single GitHub CLI command here. Start from the runner host and the runner installation directory.',
          'The examples below assume a common install path such as /opt/actions-runner or ~/actions-runner. Adjust the path for your environment.',
        ],
        codeBlocks: [
          {
            label: 'Find runner services and installation hints',
            code: `systemctl --type=service --all | grep actions.runner || true

sudo find /opt /home -maxdepth 3 -name svc.sh -path '*actions-runner*' 2>/dev/null`,
          },
          {
            label: 'Inspect the runner directory and service status',
            code: `cd /opt/actions-runner

cat .service 2>/dev/null || true
./svc.sh status

SERVICE="$(cat .service 2>/dev/null)"
test -n "$SERVICE" && systemctl status "$SERVICE" --no-pager`,
          },
          {
            label: 'Look for installed version and update activity',
            code: `cd /opt/actions-runner

ls -d bin.* externals.* 2>/dev/null || true
grep -hE 'Current runner version|SelfUpdater|update|Runner.Listener' _diag/*.log 2>/dev/null | tail -50`,
          },
          {
            label: 'Screenshot placeholder',
            code: `[Screenshot: terminal showing installed GitHub Actions runner version and service status]`,
          },
        ],
        paragraphsAfter: [
          'GitHub also shows registered self-hosted runners in repository, organization or enterprise settings under Actions, then Runners. That view is useful for name, labels and status.',
          'For larger organizations, GitHub notes that audit log registration events include runner version information, but those events are not a complete inventory of every connected runner. Treat them as one input, not the whole map.',
        ],
      },
      {
        id: 'verify-update-behavior',
        type: 'prose',
        title: 'Verify update behavior',
        paragraphs: [
          'A runner that currently works is not necessarily a runner that is being maintained.',
          'GitHub says runners with auto-update enabled satisfy the 30-day update requirement automatically as long as they can reach the update service. That last clause matters. Network rules, proxies, pinned containers and broken permissions can make "auto-update" misleading.',
          'If automatic runner updates are deliberately disabled, the organization needs a real upgrade process. "We will remember to do it manually" is not a reliable control.',
        ],
        listTitle: 'Confirm:',
        list: [
          'Auto-update policy for each runner',
          'Network access to GitHub runner update endpoints',
          'Recent SelfUpdate logs in the runner _diag directory',
          'Whether containerized runners rebuild from a current image',
          'Whether Kubernetes or ARC-managed runners have update behavior intentionally configured',
          'Who receives alerts when runner updates fail',
        ],
        emphasis:
          'Version 2.329.0 is the registration floor, not a forever-safe version for running jobs.',
      },
      {
        id: 'test-real-deployment',
        type: 'prose',
        title: 'Test a real deployment before the brownout window',
        paragraphs: [
          'Seeing the runner as online is not enough validation.',
          'Run a controlled deployment before the brownout window. Use a workflow that looks like the real production path, not a minimal smoke test that only proves the runner can start.',
        ],
        examples: [
          {
            label: 'Deployment validation',
            title: 'Representative workflow test',
            items: [
              'Trigger a representative workflow.',
              'Confirm the intended self-hosted runner accepts the job.',
              'Confirm checkout, build and test steps succeed.',
              'Confirm secrets and deployment credentials still work.',
              'Confirm the actual deployment completes.',
              'Verify production health afterward.',
            ],
          },
        ],
        emphasis:
          'The deployment path is only proven when it deploys something real enough to exercise the dependencies that matter.',
      },
      {
        id: 'document-fallback',
        type: 'prose',
        title: 'Document the fallback',
        paragraphs: [
          'If the self-hosted Actions runner becomes unavailable during a client deployment, what happens next?',
          'That answer should exist before production is waiting. Defining the fallback while a release is blocked creates avoidable operational risk.',
        ],
        listTitle: 'Possible fallback strategies include:',
        list: [
          'Temporary GitHub-hosted runner if the workflow and network model allow it',
          'Secondary self-hosted runner with the same required labels and permissions',
          'Manual deployment procedure with clear rollback steps',
          'Alternate deployment environment',
          'Rebuilding a runner from a current image or template',
          'Pausing noncritical releases until the runner is updated and validated',
        ],
        emphasis:
          'A fallback that only exists in someone\'s memory is not a fallback yet.',
      },
      {
        id: 'deployment-dependencies',
        type: 'prose',
        title: 'Deployment infrastructure has dependencies too',
        paragraphs: [
          'Teams are usually better at documenting application dependencies than operational dependencies.',
          'They know the Node version, database version and external API used by the app. They are less likely to document the CI runner, deployment agent, container image, cloud API assumptions, credentials, certificates, webhook endpoints and upstream support deadlines that make the deployment path work.',
          'The GitHub self-hosted runner brownouts are a reminder that deployment infrastructure has a lifecycle. It can age out even while the application is untouched.',
        ],
        listTitle: 'Operational dependencies worth tracking:',
        list: [
          'CI runners',
          'Runtime versions',
          'Container images',
          'Cloud APIs',
          'Credentials and token expiry',
          'Deployment agents',
          'Certificates',
          'External services',
          'Upstream support deadlines',
        ],
      },
      {
        id: 'pathflow-connection',
        type: 'prose',
        title: 'Make deprecations actionable',
        paragraphs: [
          'A useful infrastructure record should track lifecycle state, not only architecture.',
          'For a deployment resource, that means recording the runner version, update strategy, infrastructure location, owner, upstream deadline, dependent workflows and fallback procedure.',
        ],
        codeBlocks: [
          {
            label: 'Deployment resource record',
            code: `Deployment
|-- GitHub Actions Runner
|-- Version: 2.x.x
|-- Host: production-vps-01
|-- Owner: Consultant
|-- Update policy: Automatic
|-- Dependent workflows: Deploy Production
\\-- Upstream deadline: September 25, 2026`,
          },
        ],
        paragraphsAfter: [
          'That is the useful Pathflow angle: this upstream deadline affects this client deployment path, and someone owns the update.',
          'Deprecations should become actionable client alerts instead of late-stage discovery work.',
        ],
      },
      {
        id: 'final-checklist',
        type: 'checklist',
        title: 'Final checklist',
        paragraphs: [
          'Before August 24, make the runner inventory complete enough that September enforcement does not block a deployment.',
        ],
        listLabel: 'GitHub self-hosted runner brownout checklist',
        items: [
          'Inventory every self-hosted runner.',
          'Check installed runner versions.',
          'Confirm auto-update behavior or document the manual update process.',
          'Fix stale provisioning templates, scripts, images and manifests.',
          'Identify workflows that depend on self-hosted runner labels.',
          'Run a representative deployment test.',
          'Document runner ownership.',
          'Document the fallback deployment path.',
          'Record September 25, 2026 as the GitHub Enterprise Cloud full enforcement date.',
        ],
      },
      {
        id: 'related-resources',
        type: 'prose',
        title: 'Related resources',
        paragraphs: [
          'These related resources cover the infrastructure baseline and handoff context around client systems that need to keep deploying after the initial build.',
        ],
        relatedLinks: [
          {
            label: 'How to Secure a Client VPS Before You Deploy Anything',
            href: '/resources/secure-client-vps-before-deployment',
            description: 'Establish the access, patching, Docker, secrets, backup, monitoring and ownership baseline before deployment.',
          },
          {
            label: 'What to Document Before an Automation Consultant Leaves',
            href: '/resources/automation-consultant-handoff-documentation',
            description: 'Document ownership, credentials, hosting, deployments, monitoring and recovery paths before the work is handed off.',
          },
        ],
      },
      {
        id: 'sources',
        type: 'sources',
        title: 'Sources',
      },
    ],
    sources: [
      {
        label: 'GitHub Actions: Minimum version enforcement timeline for self-hosted runners',
        provider: 'GitHub Changelog',
        href: 'https://github.blog/changelog/2026-06-12-github-actions-minimum-version-enforcement-timeline-for-self-hosted-runners/',
        description:
          'Official GitHub announcement for the self-hosted runner minimum version requirements, brownout schedule and September 25, 2026 enforcement date for GitHub Enterprise Cloud.',
      },
      {
        label: 'Monitoring and troubleshooting self-hosted runners',
        provider: 'GitHub Docs',
        href: 'https://docs.github.com/en/actions/how-tos/manage-runners/self-hosted-runners/monitor-and-troubleshoot',
        description:
          'Official GitHub documentation for checking runner status, using systemd and journalctl, reviewing _diag logs and monitoring automatic update activity.',
      },
    ],
  },
  {
    path: '/resources/github-outage-retry-storm-workflow-design',
    slug: 'github-outage-retry-storm-workflow-design',
    category: 'Automation',
    type: 'guide',
    topics: ['Automation', 'Reliability', 'n8n', 'Architecture', 'Incident Analysis'],
    status: 'published',
    publishedAt: '2026-08-22',
    eyebrow: 'Resources / Automation Reliability',
    title: "GitHub's 8-Hour Outage Is a Workflow Design Lesson: Retries Can Make Failures Worse",
    shortTitle: 'Retries Can Make Failures Worse',
    description:
      "GitHub's August 17 outage showed how retries can amplify failures. Design safer n8n and automation workflows with backoff, jitter, retry budgets, idempotency and queue limits.",
    dek:
      'Retries are not automatically resilience. A retry is another request, and when a dependency is already unhealthy, uncontrolled retries can turn a partial failure into a wider outage.',
    readingTime: '13 min read',
    tags: ['Automation', 'Reliability', 'n8n', 'Architecture', 'Incident Analysis'],
    image: {
      src: '/resources/github-outage-retry-storm-workflow-design.png',
      alt: 'Network cables and server lights representing retry traffic through overloaded automation dependencies.',
    },
    seo: {
      title: "GitHub's 8-Hour Outage Is a Workflow Design Lesson",
      description:
        "GitHub's August 17 outage showed how retries can amplify failures. Learn how to design safer n8n and automation workflows with backoff, jitter, retry budgets, idempotency, and queue limits.",
      ogTitle: "GitHub's 8-Hour Outage Is a Workflow Design Lesson",
    },
    sections: [
      {
        id: 'intro',
        type: 'intro',
        paragraphs: [
          'On August 17, 2026, GitHub experienced a major outage that lasted 7 hours and 47 minutes.',
          'GitHub.com, authentication, GitHub Actions, APIs, pull requests, issues and Copilot were disrupted. The incident began when traffic reached a new peak and a critical component in GitHub\'s Central US infrastructure failed to scale with it.',
          'The workflow-design lesson is not only the initial capacity failure. During recovery, errors in some Copilot services triggered retry behavior that increased traffic and complicated restoration.',
          'That recovery phase is the part automation consultants should focus on.',
        ],
        questionsLabel: 'Retry storm questions',
        questions: [
          'What should retry?',
          'How often?',
          'For how long?',
          'What happens when retrying makes the dependency worse?',
        ],
        closing:
          'Retries are not automatically resilience. A retry is another request.',
      },
      {
        id: 'short-version',
        type: 'short',
        title: 'The short version',
        paragraphs: [
          'GitHub\'s August 17 outage was a GitHub-scale event, but the failure pattern is familiar at much smaller scale.',
          'An API slows down. Workflows fail. The workflows retry. More workflows fail and retry. Queues grow. Workers stay occupied. The dependency receives even more traffic exactly when it has the least spare capacity.',
          'That can happen in n8n, custom background jobs, Zapier-style automations, CRM integrations, document workflows, webhook processors and client deployment pipelines.',
          'A resilient workflow is not one that retries forever. It is one that knows when to retry, when to wait and when to stop.',
        ],
      },
      {
        id: 'github-incident',
        type: 'prose',
        title: 'Start with the GitHub incident',
        paragraphs: [
          'GitHub reported that a critical infrastructure component in Central US failed to scale during record traffic. The resulting capacity pressure contributed to authentication failures and broader service degradation across GitHub.com and dependent services.',
          'Most services recovered earlier in the day, while some Copilot services took longer. GitHub said errors in those services triggered a client-side retry loop that increased traffic during recovery and had to be mitigated before normal traffic could safely return.',
          'GitHub\'s remediation is also revealing: consistent retry limits, retry budgets and variable timeouts across service-to-service interactions, along with work to isolate critical systems and reduce shared dependencies.',
        ],
        emphasis:
          'The postmortem is a reminder that retry behavior is part of system architecture, not a checkbox at the bottom of an HTTP node.',
      },
      {
        id: 'retry-amplification',
        type: 'prose',
        title: 'Why retries can make outages worse',
        paragraphs: [
          'A single failed request is usually harmless. Twenty active workflows each retrying five times against an already overloaded dependency is different.',
          'The original failure may be small. The retry traffic is self-inflicted. Every retry competes for the same constrained resources that are already failing.',
          'In a client automation system, retries consume more than API capacity. They can consume worker slots, queue capacity, database connections, memory, execution time and third-party rate limits.',
        ],
        codeBlocks: [
          {
            label: 'Retry amplification',
            code: `API slows down
    |
Workflow request fails
    |
Workflow retries
    |
Other workflows fail and retry
    |
API receives even more traffic
    |
Queue grows
    |
Workers stay occupied
    |
More retries accumulate
    |
The failure becomes a retry storm`,
          },
        ],
        emphasis:
          '"Retry on failure" is not a complete reliability strategy. Without limits, it can add load to the dependency that is already failing.',
      },
      {
        id: 'classify-errors',
        type: 'prose',
        title: 'Not every error should be retried',
        paragraphs: [
          'The first design choice is error classification.',
          'Some failures are likely temporary. Others are telling you the request is wrong, the credentials are invalid or the business rule cannot be satisfied. Retrying those blindly just produces the same failure with extra load.',
        ],
        records: [
          {
            title: 'Usually do not retry blindly',
            fields: [
              { label: '400 Bad Request', value: 'The payload may be malformed or missing required fields.' },
              { label: '401 Unauthorized', value: 'Credentials may be invalid, expired or unavailable.' },
              { label: '403 Forbidden', value: 'The caller may not have permission.' },
              { label: 'Validation failure', value: 'The business input may need correction before another attempt.' },
              { label: 'Permanent business-rule failure', value: 'The operation may be rejected until the underlying record changes.' },
            ],
          },
          {
            title: 'Often reasonable to retry carefully',
            fields: [
              { label: 'Network timeout', value: 'The dependency may have been slow or temporarily unreachable.' },
              { label: 'Transient 5xx response', value: 'The provider may be degraded.' },
              { label: 'Temporary connection failure', value: 'Network or service availability may recover.' },
              { label: '429 Too Many Requests', value: 'Retry only according to provider guidance, such as Retry-After when available.' },
            ],
          },
        ],
        paragraphsAfter: [
          'Exact policies depend on the API. The point is to decide intentionally instead of letting every error take the same path.',
        ],
      },
      {
        id: 'exponential-backoff',
        type: 'prose',
        title: 'Use exponential backoff',
        paragraphs: [
          'Immediate retries are dangerous because they concentrate traffic during the worst moment.',
          'Backoff increases the delay between attempts. That gives the dependency time to recover and gives your own workers a chance to stop piling up around a failing call.',
        ],
        codeBlocks: [
          {
            label: 'Bad: fixed short retry delay',
            code: `Attempt 1
|-- wait 5 sec
Attempt 2
|-- wait 5 sec
Attempt 3
|-- wait 5 sec
Attempt 4`,
          },
          {
            label: 'Better: increasing retry delay',
            code: `Attempt 1
|-- wait 30 sec
Attempt 2
|-- wait 2 min
Attempt 3
|-- wait 10 min
Attempt 4`,
          },
        ],
        emphasis:
          'The goal is not to keep sending requests until something works. The goal is to give recovery a chance.',
      },
      {
        id: 'jitter',
        type: 'prose',
        title: 'Add jitter',
        paragraphs: [
          'Backoff alone can still synchronize traffic.',
          'If 500 workflows all fail at 12:00:00 and all wait exactly 60 seconds, they may all retry together at 12:01:00. The retry policy has created a second traffic spike.',
          'Jitter adds controlled randomness to the delay so retries spread across a window instead of forming another spike.',
        ],
        codeBlocks: [
          {
            label: 'Concept',
            code: `retry delay = exponential backoff + random jitter`,
          },
        ],
      },
      {
        id: 'retry-ceilings-budgets',
        type: 'prose',
        title: 'Set retry ceilings and retry budgets',
        paragraphs: [
          'GitHub specifically called out retry limits and retry budgets in its remediation work.',
          'A retry ceiling limits one operation. A retry budget limits aggregate retry traffic. You need both ideas, even if the small-client implementation is simple.',
        ],
        records: [
          {
            title: 'Retry ceiling',
            fields: [
              { label: 'Scope', value: 'One operation or execution.' },
              { label: 'Example', value: 'No invoice creation attempt retries more than four times.' },
              { label: 'Purpose', value: 'Prevent one item from looping forever.' },
            ],
          },
          {
            title: 'Retry budget',
            fields: [
              { label: 'Scope', value: 'A workflow, dependency or system.' },
              { label: 'Example', value: 'Only three concurrent retries may target one CRM API.' },
              { label: 'Purpose', value: 'Prevent many items from collectively overwhelming a dependency.' },
            ],
          },
        ],
        listTitle: 'For consultant-scale systems, a retry budget can be practical:',
        list: [
          'No workflow retries more than four times.',
          'Only three concurrent retries against one dependency.',
          'Stop retrying after 30 minutes.',
          'Pause non-critical jobs while a dependency is degraded.',
          'Escalate to an operator when the retry budget is exhausted.',
        ],
        emphasis:
          'Infinite retries are not resilience. They are an uncontrolled load source.',
      },
      {
        id: 'idempotency',
        type: 'prose',
        title: 'Make retried writes safe with idempotency',
        paragraphs: [
          'Retries introduce a second problem: the first request may actually have succeeded even if the workflow did not receive the response.',
          'A workflow sends POST /create-invoice. The API creates the invoice, but the response times out. The workflow retries. Now the client has two invoices for one intended operation.',
          'Idempotency means repeated attempts can produce one intended result. Some APIs support idempotency keys directly. In other systems, you may need your own stable external ID, duplicate lookup or write-ahead record before making the call.',
        ],
        listTitle: 'Write operations that deserve special care:',
        list: [
          'Payment creation',
          'Contact creation',
          'Invoice generation',
          'Document uploads',
          'CRM updates',
          'Lead creation',
          'Webhook processing',
        ],
        codeBlocks: [
          {
            label: 'Idempotency record',
            code: `operation:
create_invoice

idempotency_key:
client-123:invoice:2026-08

external_status:
pending | succeeded | failed

provider_record:
[invoice id when known]`,
          },
        ],
      },
      {
        id: 'dead-letter-handling',
        type: 'prose',
        title: 'Define dead-letter handling',
        paragraphs: [
          'When retries are exhausted, the item should not disappear.',
          'A dead-letter queue is simply a place where failed work goes after the automatic path gives up. It does not have to be Kafka to count. It can be a database table, a CRM task, a Notion queue, a Slack alert linked to stored payload data or a Pathflow request record.',
        ],
        listTitle: 'After retries are exhausted:',
        list: [
          'Move the item to a failed-job queue.',
          'Store the payload for later replay.',
          'Create a manual-review task.',
          'Send an operator alert.',
          'Record the failure against the client or project.',
          'Allow explicit retry after the dependency recovers.',
        ],
        emphasis:
          'Automatic failure handling should create a better human decision point, not a quieter data-loss event.',
      },
      {
        id: 'queue-concurrency-limits',
        type: 'prose',
        title: 'Use queue and concurrency limits',
        paragraphs: [
          'Cascading failure often reaches automation platforms through execution slots.',
          'Twenty workflows talk to one API. That API becomes slow. All 20 executions remain active. New workflows keep entering the system. Soon unrelated automations cannot run because every worker is waiting on the same degraded dependency.',
          'This is where queue design and concurrency controls matter. The goal is to stop one failing dependency from consuming the whole automation environment.',
        ],
        listTitle: 'Controls to consider:',
        list: [
          'Global concurrency limits',
          'Per-dependency concurrency limits',
          'Worker queues',
          'Execution timeouts',
          'Separate high-priority and low-priority workloads',
          'Backpressure for new jobs when a dependency is degraded',
        ],
      },
      {
        id: 'circuit-breakers',
        type: 'prose',
        title: 'Add dependency health checks and circuit breakers',
        paragraphs: [
          'A circuit breaker prevents every workflow from discovering the same outage independently.',
          'Instead of letting each execution call the dependency, fail and retry, the system notices repeated failures and temporarily changes behavior.',
        ],
        examples: [
          {
            label: 'Circuit breaker flow',
            title: 'Dependency-aware execution',
            items: [
              'Detect repeated dependency failures.',
              'Mark the dependency degraded.',
              'Temporarily stop non-critical requests.',
              'Periodically probe for recovery.',
              'Resume once healthy.',
            ],
          },
        ],
        paragraphsAfter: [
          'Many small deployments do not need a formal circuit-breaker library. The architectural principle matters more than the terminology.',
          'In n8n, for example, a workflow can check a dependency-health record before processing another batch and route non-critical work into a wait or review path when the dependency is unhealthy.',
        ],
      },
      {
        id: 'some-workflows-should-wait',
        type: 'prose',
        title: 'Some workflows should simply wait',
        paragraphs: [
          'Consultants often build workflows as if every task must complete immediately.',
          'Many do not.',
          'If a dependency is degraded, the safest response may be to queue the work and revisit it later. That is not failure. That is the workflow distinguishing immediate work from work that can be delayed.',
        ],
        records: [
          {
            title: 'Often safe to wait',
            fields: [
              { label: 'Analytics synchronization', value: 'Delay until the provider recovers.' },
              { label: 'CRM enrichment', value: 'Queue enrichment without blocking lead capture.' },
              { label: 'Reporting', value: 'Run later instead of retrying through an outage.' },
              { label: 'Document classification', value: 'Preserve the document and classify asynchronously.' },
              { label: 'Nightly exports', value: 'Skip or defer rather than overload the dependency.' },
            ],
          },
          {
            title: 'May need faster escalation',
            fields: [
              { label: 'Payment processing', value: 'Avoid duplicate writes and alert quickly.' },
              { label: 'Authentication', value: 'Treat as client-facing availability risk.' },
              { label: 'Security events', value: 'Escalate instead of waiting silently.' },
              { label: 'Transactional client operations', value: 'Define user-visible behavior and support response.' },
            ],
          },
        ],
        emphasis:
          'Ask the operational question: does this workflow actually need to retry right now?',
      },
      {
        id: 'failure-policy',
        type: 'prose',
        title: 'A practical failure policy',
        paragraphs: [
          'A good failure policy makes the workflow predictable under stress.',
          'The exact implementation depends on the platform, but the shape should be explicit: classify the failure, retry only where useful, back off with jitter, stop at a ceiling and preserve failed work for review.',
        ],
        codeBlocks: [
          {
            label: 'Example failure policy',
            code: `HTTP Request
    |
Classify failure
    |-- 400 / validation -> stop + record error
    |-- 401 / 403       -> stop + alert owner
    |-- 429             -> respect Retry-After
    |-- timeout / 5xx
    |       |
    |   retry budget
    |       |
    |   30s + jitter
    |       |
    |   2m + jitter
    |       |
    |   10m + jitter
    |
    |-- retries exhausted
            |
       dead-letter queue
            |
       operator review`,
          },
        ],
      },
      {
        id: 'n8n-translation',
        type: 'prose',
        title: 'How this translates to n8n',
        paragraphs: [
          'In n8n, the principle is not "turn on every retry setting." The principle is to make failure behavior visible in the workflow design.',
          'The HTTP Request node supports retry settings such as max tries and wait between tries. Workflow settings can include error workflows and timeouts. Wait nodes can pause an execution and resume later. Queue mode and concurrency settings matter when self-hosting or running larger deployments.',
          'Those are ingredients. The recipe still needs judgment.',
        ],
        listTitle: 'In practical n8n terms, consider:',
        list: [
          'Use error workflows for alerting and persistent failure records.',
          'Use Wait nodes for controlled delays instead of tight retry loops.',
          'Keep explicit retry counters when building custom retry branches.',
          'Respect Retry-After or provider rate-limit guidance when available.',
          'Use execution timeout settings so slow dependencies do not occupy workers forever.',
          'Use queue mode and worker concurrency deliberately where applicable.',
          'Store failed payloads for review and replay.',
          'Avoid uncontrolled loops that keep calling the same failing API.',
        ],
        emphasis:
          'The workflow canvas should show how the system behaves when the normal path is unavailable.',
      },
      {
        id: 'pathflow-connection',
        type: 'prose',
        title: 'Document failure behavior, not only components',
        paragraphs: [
          'Architecture documentation often stops at "Workflow talks to Google Drive API."',
          'That is useful, but incomplete. The more operational question is: what happens when Google Drive stops responding, rate-limits the workflow or accepts the write but times out before returning a response?',
          'A client system map becomes more useful when it records failure policy, ownership and degraded behavior beside the dependency itself.',
        ],
        codeBlocks: [
          {
            label: 'Workflow failure record',
            code: `Workflow:
Client Document Sync

Dependency:
Google Drive API

Failure policy:
Retry transient 5xx / timeout

Retry limit:
4

Backoff:
Exponential + jitter

Max concurrency:
3

On exhaustion:
Manual review queue

Owner:
Consultant

Degraded behavior:
Queue new uploads`,
          },
        ],
        paragraphsAfter: [
          'Understanding what talks to what is useful. Understanding what happens when one of those systems stops responding is more operationally valuable.',
        ],
      },
      {
        id: 'consultant-checklist',
        type: 'checklist',
        title: 'Consultant checklist',
        paragraphs: [
          'Use this as a review pass for API integrations, n8n workflows, background jobs and client automations that talk to external services.',
        ],
        listLabel: 'Workflow reliability checklist',
        items: [
          'Classify retryable and permanent failures.',
          'Use exponential backoff.',
          'Add jitter.',
          'Set a hard retry ceiling.',
          'Define a retry budget.',
          'Respect provider rate-limit guidance.',
          'Make write operations idempotent.',
          'Define dead-letter handling.',
          'Set queue and concurrency limits.',
          'Prevent one dependency from consuming every worker.',
          'Decide which workflows can wait.',
          'Document ownership and escalation behavior.',
          'Test failure scenarios intentionally.',
        ],
        closing:
          'A resilient workflow is not one that retries forever. It is one that knows when to retry, when to wait, and when to stop.',
      },
      {
        id: 'related-resources',
        type: 'prose',
        title: 'Related resources',
        paragraphs: [
          'These pieces cover adjacent parts of the same operational picture: deployment infrastructure, automation ownership, n8n delivery choices and runtime failure response.',
        ],
        relatedLinks: [
          {
            label: 'GitHub Self-Hosted Runner Brownouts Start August 24',
            href: '/resources/github-self-hosted-runner-brownouts-2026',
            description: 'Deployment infrastructure has lifecycle dependencies too.',
          },
          {
            label: 'Zapier vs n8n for Client Automation',
            href: '/resources/zapier-vs-n8n-client-automation',
            description: 'Choose an automation platform by ownership, complexity and maintenance model.',
          },
          {
            label: 'What to Document Before an Automation Consultant Leaves',
            href: '/resources/automation-consultant-handoff-documentation',
            description: 'Document ownership, credentials, hosting, deployments, monitoring and recovery paths.',
          },
          {
            label: 'Your VPS Is Running XMRig. Now What?',
            href: '/resources/your-vps-is-running-xmrig-now-what',
            description: 'Respond to runtime failure as an operational incident, not only a symptom.',
          },
        ],
      },
      {
        id: 'sources',
        type: 'sources',
        title: 'Sources',
      },
    ],
    sources: [
      {
        label: 'The August 17 outage, and the work ahead',
        provider: 'GitHub Blog',
        href: 'https://github.blog/news-insights/company-news/the-august-17-outage-and-the-work-ahead/',
        description:
          'Official GitHub postmortem and reliability update covering the August 17, 2026 outage, affected services, Central US capacity failure, retry-loop impact during Copilot recovery and remediation work.',
      },
      {
        label: 'GitHub Status',
        provider: 'GitHub Status',
        href: 'https://www.githubstatus.com/',
        description:
          'Official GitHub status page with incident timing and affected service updates for GitHub.com incidents.',
      },
      {
        label: 'HTTP Request common issues',
        provider: 'n8n Docs',
        href: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/common-issues/',
        description:
          'Official n8n documentation covering HTTP Request batching and Retry on Fail settings.',
      },
      {
        label: 'Waiting',
        provider: 'n8n Docs',
        href: 'https://docs.n8n.io/build/flow-logic/wait/',
        description:
          'Official n8n documentation for using the Wait node to pause workflow execution and resume later.',
      },
      {
        label: 'Executions environment variables',
        provider: 'n8n Docs',
        href: 'https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/executions/',
        description:
          'Official n8n execution configuration reference covering queue mode, execution timeout and concurrency-related settings.',
      },
    ],
  },
  {
    path: '/resources/zapier-vs-n8n-client-automation',
    slug: 'zapier-vs-n8n-client-automation',
    category: 'Automation',
    type: 'guide',
    topics: ['Automation', 'Delivery'],
    status: 'published',
    publishedAt: '2026-08-16',
    eyebrow: 'Resources / Automation',
    title: 'Zapier vs n8n for Client Automation: Which Should You Actually Deliver?',
    shortTitle: 'Zapier vs n8n for Client Automation',
    description:
      'Both can automate client work. The more important question is what happens after the automation is delivered.',
    dek:
      'A practical comparison of ownership, operational complexity, self-hosting, maintainability and handoff when choosing between Zapier and n8n for client work.',
    readingTime: '14 min read',
    tags: ['Automation', 'Client delivery', 'Infrastructure'],
    seo: {
      title: 'Zapier vs n8n for Client Automation | Pathflow',
      description:
        'Compare Zapier and n8n for client automation, including ownership, self-hosting, maintenance, workflow complexity and handoff.',
      ogTitle: 'Zapier vs n8n for Client Automation',
    },
    caseStudyReference: {
      company: 'Debt Shield Canada',
      title: 'Debt Shield Canada case study',
      href: '/work/debt-shield-canada',
      available: false,
      status: 'Coming later',
      description:
        'A future Debt Shield Canada case study will show how client automation, integrations, intake infrastructure and operational context were documented so another consultant could understand and continue the system.',
    },
    sections: [
      {
        id: 'intro',
        type: 'intro',
        paragraphs: [
          'Zapier and n8n can both move data between applications, trigger workflows, call APIs and automate repetitive work.',
          'For consultants, that is not the most important difference.',
          'The harder question is what happens after the automation is delivered to the client.',
        ],
        questions: [
          'Who owns it?',
          'Who maintains it?',
          'What happens when the workflow grows?',
          'Where do credentials live?',
          'How easy is it for someone else to understand?',
          'When something fails six months later, who is expected to fix it?',
        ],
        closing:
          'That is where the choice between Zapier and n8n becomes much more interesting.',
      },
      {
        id: 'short-version',
        type: 'short',
        title: 'The short version',
        paragraphs: [
          'Use Zapier when the automation is relatively straightforward, the client should be able to own and maintain it themselves, and minimizing infrastructure responsibility matters more than maximum flexibility.',
          'Use n8n when the workflow is becoming a small software system: branching logic, APIs, code, transformations, multiple services, larger execution volumes, or requirements around hosting and operational control.',
          'For many client engagements, neither is universally better.',
          'They represent different delivery models.',
        ],
      },
      {
        id: 'zapier-minimizes-ownership',
        type: 'prose',
        title: 'Zapier minimizes operational ownership',
        paragraphs: [
          'Zapier is often strongest when the main client-delivery requirement is to avoid creating new infrastructure.',
          'A consultant can deliver a useful workflow without asking the client to inherit a server, a container stack, a reverse proxy, a database backup plan or an operating-system maintenance schedule.',
          'That matters. A small automation can fail as a client delivery if the handoff quietly creates infrastructure responsibility the client never asked to own.',
        ],
        diagram: {
          kind: 'flow',
          label: 'Simple Zapier workflow example',
          items: ['New Facebook lead', 'Create CRM contact', 'Send Slack notification'],
        },
        listTitle: 'The advantage is less infrastructure to operate:',
        list: [
          'No VPS',
          'No Docker deployment',
          'No reverse proxy',
          'No operating-system updates',
          'No database backup responsibility',
          'Less infrastructure knowledge required for handoff',
        ],
      },
      {
        id: 'zapier-gets-uncomfortable',
        type: 'prose',
        title: 'Where Zapier starts becoming uncomfortable',
        paragraphs: [
          'Zapier can support serious automation work, but the delivery model starts to feel different as the workflow accumulates more steps, more branching, larger payloads, transformations, custom API calls, code and complicated failure handling.',
          'The uncomfortable point is rarely a single feature gap. It is the moment the automation becomes hard to understand, test, change and support after delivery.',
        ],
        emphasis:
          'At some point the automation stops behaving like a few connected SaaS actions and starts behaving like an application.',
        paragraphsAfter: [
          'At that point, the editor is no longer the only decision. Maintainability, observability, credential handling, ownership and failure recovery start to become part of the deliverable.',
        ],
      },
      {
        id: 'n8n-gives-control',
        type: 'prose',
        title: 'n8n gives more control',
        paragraphs: [
          'n8n becomes more compelling when the workflow needs more control over APIs, transformations, code, complex branches, self-hosted environments or consultant-managed infrastructure.',
          'The extra control can be useful when the automation is close to the operational center of the client business, especially when the workflow touches several systems and needs clearer logic than a chain of simple SaaS actions can comfortably express.',
        ],
        diagram: {
          kind: 'topology',
          label: 'n8n as an automation control point',
          groups: ['Client systems', 'n8n', 'APIs / CRM / telephony / email / databases'],
        },
        listTitle: 'That control may extend to:',
        list: [
          'Hosting location',
          'Networking',
          'Data residency',
          'Backups',
          'TLS',
          'Monitoring',
          'Updates',
          'Access control',
        ],
        paragraphsAfter: [
          'That does not make self-hosting automatically superior. It means n8n can expose more operational choices, and those choices need an owner.',
        ],
      },
      {
        id: 'complex-n8n-workflow',
        type: 'prose',
        title: 'A complex n8n workflow starts looking like application logic',
        paragraphs: [
          'Consider a call workflow where the automation is not just passing one event into one application.',
        ],
        diagram: {
          kind: 'branch',
          label: 'Complex n8n workflow example',
          beforeBranch: [
            'RingCentral call completed',
            'Retrieve recording / transcript',
            'Normalize call metadata',
            'Run classification',
            'Generate summary',
            'Update CRM',
            'Route based on outcome',
          ],
          branches: [
            { title: 'Success', items: ['Notify team'] },
            { title: 'Error', items: ['Alert operator'] },
          ],
        },
        paragraphsAfter: [
          'This is application logic rather than simple SaaS glue.',
        ],
        emphasis:
          'Once the workflow contains meaningful branching, external APIs, AI processing, retries and structured failure handling, maintainability starts to matter more than initial setup speed.',
      },
      {
        id: 'self-hosting',
        type: 'prose',
        title: 'Self-hosting is not automatically an advantage',
        paragraphs: [
          'Self-hosting can be the correct choice, but it creates real responsibilities. The client or consultant needs to own instance availability, HTTPS, persistent storage, backups, application upgrades, operating-system updates, credentials, monitoring, failure recovery, capacity and access.',
          'Dropping Docker onto a cheap VPS and handing the address to a client is not a mature deployment strategy.',
        ],
        emphasis:
          'If nobody owns maintenance, self-hosting simply converts a SaaS subscription into technical debt.',
      },
      {
        id: 'management-models',
        type: 'models',
        title: 'The real question: who should manage the automation?',
        intro:
          'The tool decision should usually follow the management model. A workflow that is technically impressive but operationally ownerless is not a strong client delivery.',
        models: [
          {
            title: 'Client-managed',
            description:
              'The client owns the platform, can make routine changes, and does not want infrastructure responsibility. Zapier is often a strong fit when the workflow is straightforward and the client should operate it directly.',
          },
          {
            title: 'Consultant-managed',
            description:
              'The consultant continues operating the automation environment. n8n becomes more compelling when standardized hosting, maintenance, backups, updates and monitoring can be packaged as an ongoing service.',
          },
          {
            title: 'Client-owned, consultant-operated',
            description:
              'The client ultimately owns the infrastructure and data while the consultant operates the system under agreement. This can create a cleaner long-term exit path for important systems.',
          },
        ],
      },
      {
        id: 'ownership',
        type: 'questions',
        title: 'Ownership matters more than the editor',
        intro:
          'Before comparing editors, consultants should answer the operational questions around the workflow.',
        questions: [
          'Who owns the account?',
          'Who pays for it?',
          'Where are the credentials?',
          'What applications are connected?',
          'What triggers the workflow?',
          'What happens when it fails?',
          'Who receives failure notifications?',
          'How can another consultant modify it?',
        ],
        emphasis:
          'Those questions matter far more than whether one editor has prettier nodes.',
      },
      {
        id: 'zapier-fit',
        type: 'fit',
        title: 'When Zapier is usually the better fit',
        intro:
          'Zapier is often the practical default when the automation should remain easy for a non-engineering client team to understand and maintain.',
        points: [
          'Small or medium workflow complexity',
          'Strong native integrations',
          'Client wants to maintain it',
          'Avoiding infrastructure management matters',
          'Modest execution volume',
          'Primarily SaaS-to-SaaS orchestration',
          'Fast delivery is more valuable than deep customization',
        ],
        diagram: {
          kind: 'flow',
          label: 'Client-owned Zapier workflow example',
          items: [
            'Form submission',
            'Create CRM contact',
            'Send confirmation email',
            'Notify salesperson',
          ],
        },
        closing:
          'Adding a VPS, container stack and monitoring system around this can easily become engineering theater.',
      },
      {
        id: 'n8n-fit',
        type: 'fit',
        title: 'When n8n is usually the better fit',
        intro:
          'n8n is often a stronger fit as workflow logic becomes more technical, more branched or more operationally important.',
        points: [
          'Significant branching',
          'Custom APIs',
          'Substantial transformations',
          'Code',
          'Many workflow steps',
          'Larger execution volume',
          'Hosting location matters',
          'Consultant-managed automation',
          'Workflow is becoming an operational system',
        ],
        diagram: {
          kind: 'flow',
          label: 'Operational n8n workflow example',
          items: [
            'Incoming lead',
            'Enrichment',
            'Validation',
            'AI classification',
            'Product matching',
            'CRM synchronization',
            'Conditional routing',
            'Notifications',
            'Reporting',
          ],
        },
        closing:
          'That does not mean every complex workflow requires n8n. It means the added control can become worth the added responsibility.',
      },
      {
        id: 'tradeoff',
        type: 'comparison',
        title: 'The tradeoff is control versus responsibility',
        intro:
          'The comparison is not a contest with one permanent winner. It is a delivery tradeoff.',
        sides: [
          {
            title: 'Zapier',
            top: 'Less operational responsibility',
            bottom: 'More platform constraints',
          },
          {
            title: 'n8n',
            top: 'More operational control',
            bottom: 'More operational responsibility',
          },
        ],
      },
      {
        id: 'documentation',
        type: 'documentation',
        title: 'Document the system either way',
        intro:
          'The strongest automation choice still needs documentation. Without it, Zapier can become an opaque account full of mystery Zaps, and n8n can become a private service nobody else understands.',
        points: [
          'Workflow purpose',
          'Triggers',
          'Connected systems',
          'Account ownership',
          'Credential ownership',
          'Important branches',
          'External APIs',
          'Data flow',
          'Failure paths',
          'Notifications',
          'Deployment location',
          'Maintenance responsibility',
        ],
        architectureDiagram: true,
        closing:
          'This is where a system map becomes useful. Pathflow Architecture can document the services and data flows behind the workflow instead of leaving the workflow editor to carry the entire explanation.',
      },
      {
        id: 'handoff',
        type: 'prose',
        title: 'Think about handoff before implementation',
        paragraphs: [
          'The handoff decision should happen before implementation, not at the end. Consultants should decide whose account contains the automation, who owns connected credentials, who pays recurring costs, who performs upgrades, who responds to failures, how another consultant obtains access and what happens when maintenance ends.',
          'A technically elegant n8n workflow can still be a terrible client delivery if nobody has agreed to maintain its infrastructure.',
          'A basic Zapier workflow can be excellent engineering if the client can understand and operate it without the original consultant.',
        ],
        relatedLink: {
          label: 'See Pathflow Handoffs',
          href: '/platform/handoffs',
          description: 'A connected place for delivery notes, resources, instructions, project history and client-facing handoff context.',
        },
      },
      {
        id: 'practical-default',
        type: 'default',
        title: 'A practical default',
        paragraphs: [
          'For simple client-owned SaaS automation, the first question should usually be whether Zapier is enough.',
          'If it is, there is value in keeping the solution boring.',
          'As complexity increases, n8n becomes progressively more attractive.',
          'Once the automation contains meaningful custom logic, APIs, branching, AI processing, or operational requirements, the additional control of n8n can justify the extra responsibility.',
        ],
        completeStack: [
          'Automation',
          'hosting',
          'backups',
          'monitoring',
          'documentation',
          'ownership',
          'handoff',
        ],
        shortcut: 'docker compose up -d',
      },
      {
        id: 'right-tool',
        type: 'prose',
        title: 'The right tool is the one that can be delivered responsibly',
        paragraphs: [
          'Zapier and n8n are both capable automation platforms.',
          'The important question for client work is not which product has the longest feature list.',
          'It is which operating model fits the system being delivered.',
          'Choose Zapier when simplicity and client ownership are the advantage.',
          'Choose n8n when control and workflow complexity justify the additional operational responsibility.',
          'And whichever one is chosen, leave behind enough context that the next person does not have to reverse-engineer the work.',
        ],
      },
      {
        id: 'client-work-pattern',
        type: 'proof-placeholder',
        title: 'See the pattern in real client work',
      },
      {
        id: 'architecture-next',
        type: 'architecture-cta',
        title: 'Building automations for clients?',
        description:
          'Pathflow Architecture can document the systems, services and data flows behind a client automation so the implementation stays understandable beyond the workflow editor itself.',
        cta: {
          label: 'See Pathflow Architecture',
          href: '/solutions/architecture',
        },
      },
      {
        id: 'sources',
        type: 'sources',
        title: 'Sources',
      },
    ],
    sources: [
      {
        label: 'Zapier Help: How is task usage measured in Zapier?',
        href: 'https://help.zapier.com/hc/en-us/articles/8496196837261-How-is-task-usage-measured-in-Zapier',
        description:
          'Official Zapier task usage documentation, including how successful actions, triggers, search actions and task limits are counted.',
      },
      {
        label: 'n8n Pricing',
        href: 'https://n8n.io/pricing/',
        description:
          'Official n8n pricing page describing workflow-execution-based pricing and hosted or self-hosted plan availability.',
      },
      {
        label: 'n8n Docs: Self-hosting n8n',
        href: 'https://docs.n8n.io/deploy/',
        description:
          'Official n8n hosting documentation covering self-hosting options such as Docker, Kubernetes, npm and cloud providers.',
      },
      {
        label: 'n8n Docs: Docker installation',
        href: 'https://docs.n8n.io/deploy/host-n8n/install-options/install-with-docker/',
        description:
          'Official n8n Docker installation guidance, including persistent volume setup and updating guidance.',
      },
      {
        label: 'n8n Docs: Securing n8n',
        href: 'https://docs.n8n.io/deploy/host-n8n/configure-n8n/security/',
        description:
          'Official n8n security guidance covering SSL, SSO, 2FA, encryption key rotation, execution data redaction and related hardening options.',
      },
    ],
  },
  {
    path: '/resources/automation-consultant-handoff-documentation',
    slug: 'automation-consultant-handoff-documentation',
    category: 'Delivery',
    type: 'guide',
    topics: ['Automation', 'Delivery', 'Security', 'Operations'],
    status: 'published',
    publishedAt: '2026-08-16',
    eyebrow: 'Resources / Delivery',
    title: 'What to Document Before an Automation Consultant Leaves',
    shortTitle: 'Automation Consultant Handoff Documentation',
    description:
      'A practical handoff guide for automation systems that need to survive beyond the person who originally built them.',
    dek:
      'A workflow can keep running while the operational knowledge behind it quietly disappears. Good handoff documentation should let another competent person understand, maintain and troubleshoot the system without reconstructing the project from old messages and browser history.',
    readingTime: '16 min read',
    tags: ['Automation', 'Handoff', 'Operations', 'Documentation'],
    seo: {
      title: 'What to Document Before an Automation Consultant Leaves | Pathflow',
      description:
        'A practical handoff checklist for documenting client automation systems, including ownership, credentials, hosting, deployments, data flow, monitoring, failure recovery and ongoing maintenance.',
      ogTitle: 'What to Document Before an Automation Consultant Leaves',
    },
    caseStudyReference: {
      company: 'Debt Shield Canada',
      title: 'Debt Shield Canada case study',
      href: '/work/debt-shield-canada',
      available: false,
      status: 'Coming later',
      description:
        'A future Debt Shield Canada case study will show client automation, integrations, intake infrastructure and operational context documented and delivered so another consultant could understand and continue the work.',
    },
    sections: [
      {
        id: 'intro',
        type: 'intro',
        paragraphs: [
          'A working automation can become surprisingly fragile. Leads keep entering the CRM, emails keep sending, call records keep moving and reports keep updating.',
          'The risk is often hidden. If nobody else understands how the system works, where it runs, which accounts support it and what happens when it fails, the automation is carrying operational debt.',
          'Good handoff documentation should make it possible for another competent person to understand, maintain and eventually replace the automation without reconstructing the project from browser history, old chat messages and half-remembered credentials.',
        ],
        questions: [
          'What does the automation do?',
          'What triggers it?',
          'Which systems does it touch?',
          'Who owns each account?',
          'Where does it run?',
          'What happens when it fails?',
        ],
        closing:
          'The goal is not a large binder. The goal is continuity.',
      },
      {
        id: 'start-with-purpose',
        type: 'prose',
        title: 'Start with the purpose',
        paragraphs: [
          'Start with the business reason for the automation before documenting nodes, tasks or code. A future maintainer needs to know what business process the system supports and what successful completion looks like.',
          'The first page should answer what starts the workflow, who relies on the result, which systems participate and what breaks if the automation stops.',
        ],
        listTitle: 'Document the purpose with plain answers:',
        list: [
          'Business process supported',
          'Workflow starting point',
          'Successful outcome',
          'People or teams affected',
          'Systems involved',
          'Operational impact if the automation stops',
        ],
        examples: [
          {
            title: 'Purpose summary',
            description:
              'When a new lead enters the CRM, the workflow validates the source, enriches the record, assigns the correct pipeline owner and sends an internal notification so follow-up starts without manual intake work.',
          },
        ],
      },
      {
        id: 'document-every-trigger',
        type: 'prose',
        title: 'Document every trigger',
        paragraphs: [
          'Triggers are where future troubleshooting usually begins. If a workflow does not run, the first question is whether the trigger fired, whether the payload changed or whether the receiving endpoint is still valid.',
          'Record every place the automation can start, including webhooks, scheduled jobs, CRM events, form submissions, incoming emails, API callbacks, database changes, telephony events, queue messages, manual executions and workflows started by another workflow.',
        ],
        listTitle: 'For each trigger, capture:',
        list: [
          'Source system',
          'Trigger event',
          'Receiving endpoint or workflow',
          'Filters and conditions',
          'Schedule or expected frequency',
          'Expected payload',
          'Authentication method',
          'Safe test procedure',
        ],
        records: [
          {
            title: 'Trigger example',
            fields: [
              { label: 'Trigger', value: 'Meta Lead Ads webhook' },
              { label: 'Destination', value: 'Cloudflare Worker' },
              { label: 'Condition', value: 'Only forms associated with the relevant campaign' },
              { label: 'Next step', value: 'Forward the validated payload to the CRM intake webhook' },
            ],
          },
        ],
      },
      {
        id: 'map-connected-systems',
        type: 'prose',
        title: 'Map every connected system',
        paragraphs: [
          'A workflow editor shows part of the implementation, but it rarely explains the surrounding system. Document the services, accounts and applications that participate in the automation.',
          'A high-level architecture diagram is usually more useful than a screenshot of workflow nodes because it shows where the system begins, where data travels and which services are operational dependencies.',
        ],
        diagram: {
          kind: 'branch',
          label: 'Connected lead intake automation example',
          beforeBranch: ['Facebook Lead Ads', 'Cloudflare Worker', 'CRM', 'n8n'],
          branches: [
            { title: 'Classification', items: ['OpenAI'] },
            { title: 'Notification', items: ['Email'] },
          ],
        },
        listTitle: 'For each connected system, record:',
        list: [
          'Service name',
          'Purpose in the automation',
          'Account owner',
          'Operational owner',
          'Billing owner',
          'Environment',
          'Administrative URL',
          'Integration method',
          'Authentication method',
          'Developer application',
          'Dependencies',
        ],
      },
      {
        id: 'record-ownership',
        type: 'prose',
        title: 'Record ownership separately from access',
        paragraphs: [
          'Who can access a system is not necessarily who owns it.',
          'A consultant may have admin access to a workflow platform while the client owns the account. A consultant may also own infrastructure that the client depends on. Those are different operational and contractual situations, and the handoff should make the distinction explicit.',
        ],
        listTitle: 'Document ownership roles separately:',
        list: [
          'Account owner',
          'Billing owner',
          'Operational manager',
          'Admin users',
          'Client-managed or consultant-managed status',
          'What happens to access when the engagement ends',
        ],
        records: [
          {
            title: 'Illustrative ownership table',
            fields: [
              { label: 'GoHighLevel', value: 'Owner: client. Managed by: client. Consultant access: admin user.' },
              { label: 'Cloudflare', value: 'Owner: consultant. Managed by: consultant. Use: Worker and Turnstile configuration.' },
              { label: 'OpenAI', value: 'Owner: consultant. Managed by: consultant. Use: classification workflow.' },
            ],
          },
        ],
      },
      {
        id: 'document-credentials',
        type: 'prose',
        title: 'Document credentials without exposing them',
        paragraphs: [
          'Handoff documentation should never become a secret store. Do not paste API keys, OAuth secrets, passwords or recovery codes into project notes, screenshots or email.',
          'Document where access is managed, who owns the credential, what scope it has and how it can be rotated or reauthorized. The next maintainer needs a retrieval and rotation path, not a copied token.',
        ],
        listTitle: 'For credentials, record:',
        list: [
          'Credential type',
          'Service',
          'Account owner',
          'Secure storage location',
          'Scopes and permissions',
          'Rotation process',
          'Expiration or renewal behavior',
          'Workflows depending on it',
        ],
        records: [
          {
            title: 'Credential examples',
            fields: [
              { label: 'RingCentral OAuth application', value: 'Stored in the automation platform credential store. Owned by the client developer account. Scopes cover calls, recordings and transcripts. If revoked, reauthorize through the client account.' },
              { label: 'GitHub deployment credential', value: 'Stored as a repository or environment secret for the deployment workflow. Used by production deployment. Do not copy the value into documentation.' },
            ],
          },
        ],
      },
      {
        id: 'where-it-runs',
        type: 'prose',
        title: 'Document where the automation actually runs',
        paragraphs: [
          'Many automation systems are not only workflow definitions. They may include a hosted instance, database, reverse proxy, worker service, queue, cron job or deployment pipeline.',
          'For self-hosted systems, record the hosting provider, server name, region, operating system, sizing, container runtime, compose files or manifests, reverse proxy, DNS, TLS, volumes, database, backups, monitoring and update procedure.',
        ],
        records: [
          {
            title: 'Self-hosted runtime example',
            fields: [
              { label: 'Host', value: 'Managed VPS' },
              { label: 'Services', value: 'n8n, PostgreSQL and Caddy' },
              { label: 'TLS', value: 'Caddy with DNS pointed at the host' },
              { label: 'Persistence', value: 'Docker volumes for application and database data' },
              { label: 'Backups', value: 'Nightly database backup with restore procedure documented' },
              { label: 'Updates', value: 'Scheduled maintenance window with rollback notes' },
            ],
          },
        ],
      },
      {
        id: 'deployment-path',
        type: 'prose',
        title: 'Record the deployment path',
        paragraphs: [
          'The next person should know not only what to change, but how a safe change reaches production.',
          'Document whether changes are deployed through source control, a CI/CD workflow, SSH, a hosted editor, a publish button or a manual operational process.',
        ],
        examples: [
          {
            title: 'Common deployment paths',
            items: [
              'Git push -> GitHub Actions -> build -> deploy',
              'Docker configuration change -> SSH or SSM -> docker compose pull -> docker compose up -d',
              'Workflow edit -> publish -> production execution',
            ],
          },
        ],
        listTitle: 'Capture the deployment controls:',
        list: [
          'Source repository',
          'Branch',
          'CI/CD workflow',
          'Target environment',
          'Approval process',
          'Secrets involved by reference',
          'Rollback method',
          'Post-deploy verification',
        ],
      },
      {
        id: 'data-flow',
        type: 'prose',
        title: 'Document the data flow',
        paragraphs: [
          'A maintainer needs to understand what enters the system, how it changes and where it lands. This matters most when the automation creates new identifiers, maps records across tools or calls AI services as part of the process.',
        ],
        diagram: {
          kind: 'flow',
          label: 'Call transcript data flow',
          items: [
            'RingCentral transcript',
            'Normalize metadata',
            'Send transcript to LLM',
            'Parse structured result',
            'Update CRM contact',
            'Send internal summary',
          ],
        },
        listTitle: 'For each flow, document:',
        list: [
          'Inputs',
          'Transformations',
          'Field mappings',
          'Generated identifiers',
          'API calls',
          'Outputs',
          'Destinations',
          'Storage locations',
        ],
        examples: [
          {
            title: 'Identity mapping',
            description:
              'CRM Contact ID <-> phone number <-> workflow execution data. The mapping should explain which value is authoritative when records disagree.',
          },
        ],
      },
      {
        id: 'business-rules',
        type: 'prose',
        title: 'Explain the business rules',
        paragraphs: [
          'Business logic should not be trapped inside nested workflow conditions. The next maintainer should be able to read the rule before inspecting the implementation.',
          'Common rules include routing by geography, deduplication windows, minimum call duration, CRM status conditions, retry thresholds, consent checks and product mapping.',
        ],
        emphasis:
          'The next maintainer should not have to reverse-engineer business logic from nested workflow conditions.',
      },
      {
        id: 'failure-paths',
        type: 'prose',
        title: 'Document failure paths',
        paragraphs: [
          'A handoff is incomplete if it only describes the happy path. Document what happens when an API times out, a credential expires, a duplicate arrives, a required field is missing or a downstream system rejects the update.',
        ],
        listTitle: 'Failure documentation should cover:',
        list: [
          'Retries',
          'Timeout behavior',
          'Error branches',
          'Alerts',
          'Log locations',
          'Manual recovery',
          'Duplicate protection',
          'Idempotency behavior',
        ],
        records: [
          {
            title: 'CRM update failure example',
            fields: [
              { label: 'Retry', value: 'Retry twice before marking the execution as failed.' },
              { label: 'Record', value: 'Store the failed contact ID, source payload ID and error response.' },
              { label: 'Alert', value: 'Notify the operations address.' },
              { label: 'Duplicate protection', value: 'Do not repeat enrichment automatically after the CRM failure.' },
              { label: 'Recovery', value: 'Retry manually from the failed execution after confirming the CRM record state.' },
            ],
          },
        ],
      },
      {
        id: 'logs',
        type: 'prose',
        title: 'Record where logs live',
        paragraphs: [
          'Logs are only useful if the next operator knows where to look. Document workflow execution history, application logs, server or container logs, cloud logs, reverse proxy logs, database logs, alerting history and retention windows.',
        ],
        examples: [
          {
            title: 'Log locations',
            items: [
              'n8n executions: Executions -> Failed',
              'Docker logs: docker compose logs -f n8n',
              'Caddy logs: docker compose logs -f caddy',
            ],
          },
        ],
      },
      {
        id: 'monitoring-alerts',
        type: 'prose',
        title: 'Document monitoring and alerts',
        paragraphs: [
          'If monitoring is not documented, the client often becomes the monitoring system. Someone notices only after a lead is missing, an email was not sent or a report did not arrive.',
          'Record what is monitored, the expected frequency, the alert threshold, the alert destination, the operator responsible and the expected recovery action.',
        ],
        records: [
          {
            title: 'Monitoring example',
            fields: [
              { label: 'Expected event', value: 'Weekday report generated by 08:00.' },
              { label: 'Alert threshold', value: 'No successful run by 08:15.' },
              { label: 'Destination', value: 'Operations team notification channel.' },
              { label: 'Recovery expectation', value: 'Confirm source data availability, rerun the workflow and record the incident note.' },
            ],
          },
        ],
      },
      {
        id: 'workflow-dependencies',
        type: 'prose',
        title: 'Record dependencies between workflows',
        paragraphs: [
          'Automation systems often grow into chains of workflows. A lead intake workflow may call validation, enrichment, product matching and CRM update workflows. Changing one part can affect several others.',
          'Document upstream dependencies, downstream dependencies, shared credentials, shared data stores and the blast radius of each workflow.',
        ],
        diagram: {
          kind: 'flow',
          label: 'Dependent workflow chain',
          items: ['Lead intake', 'Validation', 'Enrichment', 'Product matching', 'CRM update'],
        },
        relatedLink: {
          label: 'See Pathflow Architecture',
          href: '/solutions/architecture',
          description:
            'Architecture maps help keep services, infrastructure, owners and workflow dependencies understandable outside the workflow editor.',
        },
      },
      {
        id: 'environment-differences',
        type: 'prose',
        title: 'Document environment differences',
        paragraphs: [
          'Development, staging and production environments may have different webhook URLs, API credentials, CRM accounts, sandbox endpoints, databases, callback domains, test numbers and disabled outbound messages.',
          'Naming alone is not enough. A future consultant should know which environment is safe to test against.',
        ],
        listTitle: 'Environment notes should include:',
        list: [
          'Webhook URLs',
          'API credential ownership',
          'CRM account or pipeline',
          'Sandbox versus production endpoint',
          'Database name',
          'Callback domain',
          'Test phone numbers or email addresses',
          'Outbound messages disabled or enabled',
        ],
      },
      {
        id: 'recurring-costs',
        type: 'prose',
        title: 'Record recurring costs',
        paragraphs: [
          'Automation systems can depend on small recurring services that become critical over time. Cancellation or billing failure can disable the system just as surely as a code bug.',
          'Do not rely on exact pricing in the handoff unless the amount is kept current elsewhere. Document the service, billing owner, billing model, renewal responsibility and operational impact if the service is cancelled.',
        ],
        listTitle: 'Common recurring costs include:',
        list: [
          'Automation platform',
          'Hosting',
          'Database',
          'Email provider',
          'Telephony',
          'LLM or API usage',
          'Monitoring',
          'Domain',
          'Backup storage',
          'Integration subscriptions',
        ],
      },
      {
        id: 'common-changes',
        type: 'prose',
        title: 'Explain how to make common changes',
        paragraphs: [
          'Most future maintenance is not dramatic. Someone needs to add a salesperson, update a notification recipient, change a routing rule, revise an email template, rotate a credential, add a branch, change a webhook, update an LLM prompt, restart a service or deploy a workflow version.',
          'Document the recurring changes that are likely after handoff. Include the location, required access, safety checks and verification steps.',
        ],
      },
      {
        id: 'do-not-change',
        type: 'prose',
        title: 'Record what should not be changed casually',
        paragraphs: [
          'Some values look ordinary but are load-bearing. Changing them casually can disable production traffic, break OAuth, orphan persistent data or invalidate encrypted credentials.',
          'Flag the pieces that require extra care before edits happen.',
        ],
        listTitle: 'Common examples:',
        list: [
          'OAuth callback URL',
          'Production webhook path',
          'Database volume configuration',
          'Encryption key',
          'Workflow execution mode',
        ],
      },
      {
        id: 'architecture-diagram',
        type: 'prose',
        title: 'Create an architecture diagram',
        paragraphs: [
          'A handoff should include a diagram that shows systems, direction of data flow, ownership or management boundaries, APIs, the automation platform, storage and important external services.',
          'Do not try to reproduce every node in the workflow editor. The diagram should orient a future maintainer before they open the implementation.',
        ],
        diagram: {
          kind: 'topology',
          label: 'Handoff architecture orientation',
          groups: ['Client systems', 'Automation platform', 'External services', 'Storage and logs'],
        },
        emphasis:
          'The goal is orientation, not a screenshot of the implementation.',
      },
      {
        id: 'operating-checklist',
        type: 'checklist',
        title: 'Final operating checklist',
        paragraphs: [
          'Before the engagement ends, the handoff should answer the operational questions that another qualified person would ask on day one.',
        ],
        listLabel: 'Automation handoff checklist',
        items: [
          'What does the automation do?',
          'What triggers it?',
          'Which systems does it touch?',
          'Who owns each account?',
          'Where does it run?',
          'How is it deployed?',
          'Where are credentials managed?',
          'Where do logs live?',
          'What happens when it fails?',
          'Who receives alerts?',
          'Where are backups?',
          'How are common changes made?',
          'Which access should be revoked?',
          'What recurring costs support it?',
          'Is the architecture documented?',
          'Who is responsible after handoff?',
        ],
        closing:
          'If several of those answers exist only in the departing consultant\'s head, the handoff is not finished.',
      },
      {
        id: 'continuity',
        type: 'prose',
        title: 'The real goal is continuity',
        paragraphs: [
          'The point of handoff documentation is not to create a huge binder or describe every implementation detail forever.',
          'The point is to make the system continuable. Another qualified consultant should be able to arrive, understand the automation, make a safe change and recover from a routine failure without needing the original builder.',
          'That is the standard worth designing for from the beginning.',
        ],
        relatedLinks: [
          {
            label: 'Browse Pathflow Resources',
            href: '/resources',
            description:
              'More practical guides for connected systems, automation, documentation and client delivery.',
          },
          {
            label: 'Read the Zapier vs n8n guide',
            href: '/resources/zapier-vs-n8n-client-automation',
            description:
              'Compare automation platform choices through ownership, operational responsibility, maintainability and handoff.',
          },
        ],
      },
      {
        id: 'client-work-pattern',
        type: 'proof-placeholder',
        title: 'See this in real client work',
      },
      {
        id: 'architecture-next',
        type: 'contextual-cta',
        eyebrow: 'Architecture',
        title: 'Map the system before the context disappears',
        description:
          'Pathflow Architecture keeps services, infrastructure, integrations and relationships documented alongside the project so the system remains understandable after delivery.',
        cta: {
          label: 'Explore Pathflow Architecture',
          href: '/solutions/architecture',
          description: 'Document the systems, ownership boundaries and dependencies behind client automation.',
        },
      },
      {
        id: 'handoffs-next',
        type: 'contextual-cta',
        eyebrow: 'Handoffs',
        title: 'Deliver the project with its context intact',
        description:
          'Pathflow Handoffs keeps delivery notes, resources, instructions and project history connected to the work so completed projects do not lose their operational context.',
        cta: {
          label: 'Explore Pathflow Handoffs',
          href: '/platform/handoffs',
          description: 'Package completed work with the resources and decisions clients need after delivery.',
        },
      },
    ],
  },
  {
    path: '/resources/connect-website-lead-forms-to-crm',
    slug: 'connect-website-lead-forms-to-crm',
    category: 'Integrations',
    type: 'guide',
    topics: ['Web', 'CRM', 'Automation', 'Security'],
    status: 'published',
    publishedAt: '2026-08-16',
    eyebrow: 'Resources / Integrations',
    title: 'How to Connect Website Lead Forms Directly to a CRM',
    shortTitle: 'Connect Website Lead Forms to a CRM',
    description:
      'A practical pattern for sending public website leads securely into the system where they will actually be worked.',
    dek:
      'A direct CRM integration should protect privileged credentials, validate incoming data, resist obvious abuse, preserve attribution and leave behind enough context that another developer can understand the lead path later.',
    readingTime: '18 min read',
    tags: ['Websites', 'CRM', 'Lead intake', 'Security'],
    seo: {
      title: 'How to Connect Website Lead Forms Directly to a CRM | Pathflow',
      description:
        'Learn how to connect public website lead forms securely to a CRM using server-side validation, bot protection, least-privilege credentials, deduplication, routing and reliable handoff patterns.',
      ogTitle: 'How to Connect Website Lead Forms Directly to a CRM',
    },
    caseStudyReference: {
      company: 'Farm Financing Ontario',
      title: 'Read the Farm Financing Ontario case study',
      href: '/work/farm-financing-ontario',
      available: true,
      description:
        'Farm Financing Ontario uses a public website lead form with a secured intake layer between the browser and the CRM, including bot protection and the surrounding project architecture.',
    },
    sections: [
      {
        id: 'intro',
        type: 'intro',
        paragraphs: [
          'A website lead form should not create another inbox to monitor.',
          'When someone submits a financing inquiry, consultation request, quote form or contact form, the useful destination is usually the system where the lead will actually be worked.',
          'That means the CRM.',
          'The implementation can stay fairly simple, but only if a few boundaries are handled correctly. Private CRM credentials should stay out of the browser, validation should happen server-side, attribution should survive the handoff, and failures should be possible to diagnose later.',
        ],
        questionsLabel: 'Website to CRM integration requirements',
        questions: [
          'Keep private CRM credentials out of the browser',
          'Validate server-side',
          'Normalize data before the CRM',
          'Resist obvious abuse',
          'Preserve attribution',
          'Document the lead path',
        ],
        closing:
          'A direct CRM integration is mostly about putting the trust boundary in the right place.',
      },
      {
        id: 'lead-lifecycle',
        type: 'prose',
        title: 'Start with the lead lifecycle',
        paragraphs: [
          'Before choosing APIs, workers or webhook formats, define what should happen after the visitor presses Submit. The website form is only the first step.',
          'These decisions should come before API implementation because they determine which CRM objects need to exist and which business rules must run.',
        ],
        diagram: {
          kind: 'flow',
          label: 'Lead lifecycle after form submission',
          items: [
            'Website visitor',
            'Submit financing inquiry',
            'Create CRM contact',
            'Create opportunity',
            'Assign pipeline stage',
            'Notify salesperson',
            'Start follow-up workflow',
          ],
        },
        listTitle: 'Answer the lifecycle questions first:',
        list: [
          'What CRM object should be created?',
          'Should an existing contact be updated instead?',
          'Should a deal or opportunity also be created?',
          'Which pipeline and stage should receive it?',
          'How should the lead be assigned?',
          'What happens when the same person submits twice?',
          'Which consent fields need to be preserved?',
          'What happens if the CRM is temporarily unavailable?',
        ],
      },
      {
        id: 'browser-credentials',
        type: 'prose',
        title: 'Do not put CRM credentials in the browser',
        paragraphs: [
          'A public frontend should not contain privileged CRM credentials. Avoid designs where browser code calls the CRM API directly with a private API key, long-lived bearer token or credential with meaningful permissions.',
          'Browser code is public. Frontend build-time environment variables are not secrets if they are bundled into the client. Obfuscation is not a security boundary.',
        ],
        diagrams: [
          {
            kind: 'flow',
            label: 'Unsafe browser to CRM model',
            items: ['Browser', 'CRM API'],
          },
          {
            kind: 'flow',
            label: 'Safer server-side CRM handoff model',
            items: ['Browser', 'Server-side endpoint', 'CRM API'],
          },
        ],
        listTitle: 'Possible server-side boundaries include:',
        list: [
          'API route',
          'Serverless function',
          'Edge function',
          'Cloudflare Worker',
          'Small backend service',
          'Appropriately protected automation webhook',
        ],
        emphasis:
          'Anything shipped to the browser should be treated as public.',
      },
      {
        id: 'lightweight-architecture',
        type: 'prose',
        title: 'A useful lightweight architecture',
        paragraphs: [
          'For static or mostly static websites, an edge or serverless function is often enough. A Cloudflare Worker is one useful example, not a requirement.',
          'This avoids standing up an application server solely to receive a contact form while still keeping secrets and validation behind a server-side boundary.',
        ],
        diagram: {
          kind: 'flow',
          label: 'Lightweight website to CRM architecture',
          items: [
            'Website',
            'POST /lead',
            'Cloudflare Worker',
            'Validate / protect / normalize',
            'CRM API',
          ],
        },
        listTitle: 'Why this pattern is attractive:',
        list: [
          'No application server required solely for intake',
          'Secrets remain server-side',
          'A clear integration boundary',
          'A simple deployment model',
        ],
      },
      {
        id: 'request-contract',
        type: 'prose',
        title: 'Define a clear request contract',
        paragraphs: [
          'Do not forward whatever arbitrary object the browser sends. Define exactly which fields the endpoint accepts, then validate each field server-side.',
          'Browser validation is useful for visitor experience, but server-side validation is the actual trust boundary.',
        ],
        codeBlocks: [
          {
            label: 'Accepted request shape',
            code: `{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "phone": "+13065551234",
  "message": "Looking for financing options",
  "consent": true
}`,
          },
        ],
        listTitle: 'Useful server-side checks include:',
        list: [
          'Required fields are present',
          'Email resembles a valid email address',
          'Phone numbers are normalized',
          'Maximum string lengths are enforced',
          'Payload size is limited',
          'Consent values are explicit',
          'Unexpected fields are ignored or rejected',
        ],
      },
      {
        id: 'normalize-data',
        type: 'prose',
        title: 'Normalize data before it reaches the CRM',
        paragraphs: [
          'Website forms and CRM APIs rarely use exactly the same representation. Normalize those differences at the integration boundary.',
        ],
        codeBlocks: [
          {
            label: 'Phone normalization',
            code: `Website:
(306) 555-1234

CRM:
+13065551234`,
          },
          {
            label: 'CRM enum mapping',
            code: `Website:
"Farm Purchase"

CRM:
financing_type = "farm_purchase"`,
          },
        ],
        listTitle: 'Common transformations include:',
        list: [
          'Trimming whitespace',
          'Normalizing phone numbers',
          'Lowercasing email addresses where appropriate',
          'Converting checkbox values to booleans',
          'Mapping display labels to CRM enums',
          'Combining or splitting names',
          'Mapping website fields to CRM custom fields',
          'Generating source metadata',
        ],
        emphasis:
          'Keep frontend presentation concerns separate from CRM schema concerns.',
      },
      {
        id: 'lead-attribution',
        type: 'prose',
        title: 'Preserve lead source information',
        paragraphs: [
          'A direct form integration should tell the CRM where the lead came from. Otherwise, leads arrive successfully while marketing attribution disappears.',
          'That becomes painful later when source performance, campaign quality or landing page conversion needs to be measured.',
        ],
        listTitle: 'At minimum, consider recording:',
        list: [
          'Website or domain',
          'Form name',
          'Landing page',
          'Campaign',
          'UTM source',
          'UTM medium',
          'UTM campaign',
          'Referrer',
          'Submission timestamp',
        ],
        codeBlocks: [
          {
            label: 'Attribution fields',
            code: `source:
Website

source_detail:
Farm financing contact form

utm_source:
google

utm_campaign:
farm_land_financing`,
          },
        ],
      },
      {
        id: 'duplicates',
        type: 'prose',
        title: 'Decide how duplicates should work',
        paragraphs: [
          'A visitor may submit more than once, and the integration should have an intentional duplicate policy.',
          'Creating a new opportunity can be independent of creating a new contact. A returning contact can still represent a new sales opportunity.',
        ],
        diagram: {
          kind: 'branch',
          label: 'Duplicate handling by contact lookup',
          beforeBranch: ['Submission', 'Search CRM by email / phone'],
          branches: [
            { title: 'Found', items: ['Update contact'] },
            { title: 'Not found', items: ['Create contact'] },
          ],
        },
        listTitle: 'Common strategies include:',
        list: [
          'Always create a new lead',
          'Match by email',
          'Match by phone',
          'Match by external or stable identifier',
        ],
      },
      {
        id: 'contact-vs-opportunity',
        type: 'prose',
        title: 'Separate contact creation from opportunity creation',
        paragraphs: [
          'Many CRM integrations become confusing because create a lead is treated as one vague action. It may actually involve several objects.',
          'Document each object explicitly so the integration remains easy to reason about later.',
        ],
        diagram: {
          kind: 'flow',
          label: 'CRM objects created from a form submission',
          items: ['Form submission', 'Contact', 'Opportunity', 'Pipeline', 'Stage'],
        },
        records: [
          {
            title: 'Example intake policy',
            fields: [
              { label: 'Contact', value: 'Create or update by phone or email.' },
              { label: 'Opportunity', value: 'Create for every qualified website inquiry.' },
              { label: 'Pipeline', value: 'Farm Financing.' },
              { label: 'Initial stage', value: 'New Website Lead.' },
            ],
          },
        ],
      },
      {
        id: 'routing',
        type: 'prose',
        title: 'Route leads intentionally',
        paragraphs: [
          'A lead entering the CRM is not useful if nobody owns it. Routing should be a documented business rule, not a surprise hidden inside nested CRM automation logic.',
        ],
        diagram: {
          kind: 'branch',
          label: 'Product-based lead routing example',
          beforeBranch: ['Website inquiry', 'Product rule'],
          branches: [
            { title: 'Farm purchase', items: ['Agricultural financing team'] },
            { title: 'Equipment financing', items: ['Commercial lending team'] },
          ],
        },
        listTitle: 'Possible routing rules include:',
        list: [
          'Geography',
          'Product',
          'Language',
          'Campaign',
          'Round robin',
          'Existing account owner',
          'Business hours',
          'Source',
        ],
        emphasis:
          'The rule should be understandable without opening twenty nested workflow steps.',
      },
      {
        id: 'endpoint-abuse',
        type: 'prose',
        title: 'Protect the public endpoint from abuse',
        paragraphs: [
          'A form endpoint exposed to the internet will eventually receive junk. No anti-abuse layer is perfect; the objective is to reduce low-effort automated submissions while preserving normal user experience.',
        ],
        diagram: {
          kind: 'flow',
          label: 'Protected public form endpoint',
          items: [
            'Visitor',
            'Form',
            'Turnstile token',
            'Worker verifies / validates / rate limits',
            'CRM',
          ],
        },
        listTitle: 'At minimum, consider:',
        list: [
          'Rate limiting',
          'Bot protection',
          'Turnstile or equivalent challenge',
          'Honeypot field',
          'Payload size limits',
          'Allowed HTTP methods',
          'Schema validation',
          'Origin checking where useful',
        ],
      },
      {
        id: 'honeypot',
        type: 'prose',
        title: 'A honeypot is cheap and useful',
        paragraphs: [
          'A honeypot is a field hidden from normal users but visible to many simplistic bots. The endpoint rejects submissions where that field contains a value.',
        ],
        codeBlocks: [
          {
            label: 'Illustrative honeypot field',
            code: `<input
  type="text"
  name="company_website"
  tabindex="-1"
  autocomplete="off"
/>`,
          },
        ],
        paragraphsAfter: [
          'It should not be the only defense, but it is nearly free and catches a surprising amount of low-effort spam.',
          'Make sure the field is hidden accessibly rather than simply confusing screen-reader users.',
        ],
      },
      {
        id: 'bot-token-verification',
        type: 'prose',
        title: 'Verify bot-protection tokens server-side',
        paragraphs: [
          'If using Turnstile, reCAPTCHA or another challenge system, verification belongs on the server side. The browser sends the form fields plus a challenge token, and the server verifies that token before calling the CRM.',
        ],
        codeBlocks: [
          {
            label: 'Browser submission contents',
            code: `form fields
+
challenge token`,
          },
          {
            label: 'Do not trust this',
            code: `{
  "captchaPassed": true
}`,
          },
        ],
        emphasis:
          'The browser is not a trusted authority.',
      },
      {
        id: 'least-privilege',
        type: 'prose',
        title: 'Keep CRM permissions narrow',
        paragraphs: [
          'The credential used by the website integration should have only the permissions required for that workflow.',
          'Least privilege limits the damage if the integration credential is ever exposed. Documenting required scopes also makes the credential easier to recreate later.',
        ],
        records: [
          {
            title: 'Likely required',
            fields: [
              { label: 'Contacts', value: 'Read/search contacts and create or update contacts.' },
              { label: 'Opportunities', value: 'Create opportunities when the lifecycle requires them.' },
            ],
          },
          {
            title: 'Probably not required',
            fields: [
              { label: 'Administration', value: 'Administer users, change billing or modify unrelated locations/accounts.' },
              { label: 'Broad data access', value: 'Delete unrelated data or export the full CRM.' },
            ],
          },
        ],
      },
      {
        id: 'server-side-secrets',
        type: 'prose',
        title: 'Store server-side secrets properly',
        paragraphs: [
          'Depending on the deployment platform, CRM credentials might live in encrypted environment variables, runtime secret bindings, serverless secret storage or a cloud secret manager.',
          'Avoid committing secrets to Git, embedding them in frontend JavaScript, storing them in public config files, pasting them into project documentation or including them in screenshots.',
        ],
        codeBlocks: [
          {
            label: 'Useful credential documentation',
            code: `Credential:
CRM private integration token

Owned by:
Client CRM account

Stored in:
Cloudflare Worker secret

Required scopes:
Contacts read/write
Opportunities write`,
          },
        ],
        emphasis:
          'The token itself is not documentation.',
      },
      {
        id: 'safe-errors',
        type: 'prose',
        title: 'Return useful errors without leaking internals',
        paragraphs: [
          'The browser needs enough information to show the visitor what happened. It does not need raw CRM error payloads, internal URLs or stack traces.',
        ],
        codeBlocks: [
          {
            label: 'Visitor-facing response',
            code: `{
  "success": false,
  "message": "Unable to submit the form. Please try again."
}`,
          },
          {
            label: 'Server-side structured log',
            code: `crm_contact_create_failed
status=429
request_id=abc123`,
          },
        ],
        listTitle: 'Avoid returning:',
        list: [
          'Bearer tokens',
          'Raw stack traces',
          'Internal service URLs',
          'Unnecessary account IDs',
          'Complete upstream response bodies',
        ],
        paragraphsAfter: [
          'Good debugging information belongs in logs, not in the visitor browser.',
        ],
      },
      {
        id: 'crm-down',
        type: 'prose',
        title: 'Decide what happens when the CRM is down',
        paragraphs: [
          'The simplest implementation fails the form when the CRM is unavailable. That may be acceptable for low-value contact forms.',
          'For higher-value leads, consider whether submissions should be buffered. Resilience should correspond to lead value and business requirements.',
        ],
        diagrams: [
          {
            kind: 'flow',
            label: 'Simple CRM outage behavior',
            items: ['CRM unavailable', 'Form fails'],
          },
          {
            kind: 'flow',
            label: 'Buffered CRM outage behavior',
            items: ['Form', 'Endpoint', 'Queue', 'CRM'],
          },
        ],
        listTitle: 'Possible buffering approaches include:',
        list: [
          'Durable queue',
          'Small database',
          'Message queue',
          'Retry layer',
          'Email fallback where appropriate',
        ],
        emphasis:
          'Do not add a queue just because distributed systems are interesting.',
      },
      {
        id: 'avoid-email-transport',
        type: 'prose',
        title: 'Avoid making email the primary integration',
        paragraphs: [
          'Email can be useful as a notification channel, but it does not need to become the transport layer for structured lead data.',
          'Email-based intake works, but it turns data entry into an operational dependency or introduces an unnecessary intermediate representation when a direct API or webhook integration is available.',
        ],
        diagrams: [
          {
            kind: 'flow',
            label: 'Manual email lead intake',
            items: ['Form', 'Send email', 'Human sees email', 'Human creates CRM lead'],
          },
          {
            kind: 'flow',
            label: 'Email parser lead intake',
            items: ['Form', 'Email parser', 'Automation', 'CRM'],
          },
          {
            kind: 'flow',
            label: 'Direct validated lead intake',
            items: ['Form', 'Validated endpoint', 'CRM'],
          },
        ],
      },
      {
        id: 'generic-form-services',
        type: 'prose',
        title: 'Be careful with generic form services',
        paragraphs: [
          'Generic form services can be excellent when a simple website only needs form submission handling. They can also be useful as an intermediate layer when direct backend development is not justified.',
          'Once the lead needs to become structured CRM data, consider whether the additional hop is helping.',
        ],
        diagrams: [
          {
            kind: 'flow',
            label: 'Form service as an extra hop',
            items: ['Website', 'Form service', 'Email', 'Automation', 'CRM'],
          },
          {
            kind: 'flow',
            label: 'Direct server-side CRM integration',
            items: ['Website', 'Server-side integration', 'CRM'],
          },
        ],
        emphasis:
          'Fewer components are not automatically better, but every component should earn its place.',
      },
      {
        id: 'logging',
        type: 'prose',
        title: 'Log enough to troubleshoot the lead path',
        paragraphs: [
          'A lead integration should produce useful operational events. Logs should let an operator understand where the pipeline failed without copying sensitive form contents into every line.',
          'A request ID or correlation ID can connect related events without spreading personal data through the log stream.',
        ],
        codeBlocks: [
          {
            label: 'Successful path events',
            code: `form_submission_received
turnstile_verified
crm_contact_found
crm_contact_updated
crm_opportunity_created
submission_completed`,
          },
          {
            label: 'Failure path events',
            code: `turnstile_verification_failed
invalid_payload
crm_rate_limited
crm_contact_create_failed
crm_opportunity_create_failed`,
          },
        ],
      },
      {
        id: 'safe-retries',
        type: 'prose',
        title: 'Make retries safe',
        paragraphs: [
          'If the browser retries after a timeout, the backend may receive the same submission more than once. Without care, that can create duplicate contacts or opportunities.',
          'This becomes more important as lead value increases.',
        ],
        diagram: {
          kind: 'branch',
          label: 'Idempotent submission handling',
          beforeBranch: ['Submission ID: 8f23...', 'Already processed?'],
          branches: [
            { title: 'Yes', items: ['Return success'] },
            { title: 'No', items: ['Process submission'] },
          ],
        },
        listTitle: 'Possible protections include:',
        list: [
          'Idempotency keys',
          'Short-lived submission IDs',
          'Deduplication by email or phone',
          'CRM-side duplicate detection',
          'Persistent request records',
        ],
      },
      {
        id: 'consent',
        type: 'prose',
        title: 'Keep consent attached to the lead',
        paragraphs: [
          'If the form captures marketing consent, SMS consent, terms acceptance or another meaningful acknowledgement, preserve it deliberately.',
          'Keep this technical and operational unless legal review has defined jurisdiction-specific requirements.',
        ],
        listTitle: 'Consent records may include:',
        list: [
          'Consent value',
          'Timestamp',
          'Form or source',
          'Communication channel',
          'Consent text or version where required',
          'Evidence only where appropriate and legally justified',
        ],
        emphasis:
          'Submitting a contact form should not silently become blanket consent for every communication channel.',
      },
      {
        id: 'unhappy-paths',
        type: 'checklist',
        title: 'Test the unhappy paths',
        paragraphs: [
          'A successful test submission is not enough. Before launch, test the situations that make integrations fail in production.',
        ],
        listLabel: 'Website to CRM unhappy-path test list',
        items: [
          'Missing required field',
          'Invalid email',
          'Invalid phone',
          'Failed bot verification',
          'Honeypot triggered',
          'CRM authentication failure',
          'CRM rate limit',
          'Duplicate contact',
          'Opportunity creation failure',
          'Network timeout',
          'Malformed CRM response',
          'Browser retry',
          'Double-click submission',
        ],
        closing:
          'A production integration should fail predictably.',
      },
      {
        id: 'monitoring',
        type: 'prose',
        title: 'Monitor the integration',
        paragraphs: [
          'The form page can appear perfectly healthy while every CRM API call is failing. Website uptime alone is not enough.',
          'For higher-value forms, monitor the full path rather than only the web page.',
        ],
        codeBlocks: [
          {
            label: 'Useful monitoring signals',
            code: `Expected:
Lead submissions reach CRM successfully

Alert:
Repeated CRM API failures

Alert:
Authentication failure

Alert:
Unusual spike in rejected bot submissions`,
          },
        ],
        paragraphsAfter: [
          'The useful question is not: is the form page online?',
        ],
        emphasis:
          'Can a lead successfully reach the CRM?',
      },
      {
        id: 'documentation',
        type: 'prose',
        title: 'Document the system',
        paragraphs: [
          'A direct lead integration should leave behind enough context that another developer can understand the lead path later.',
          'A small architecture diagram can make most of this immediately understandable.',
        ],
        diagram: {
          kind: 'branch',
          label: 'Documented website lead intake architecture',
          beforeBranch: ['Website', 'Lead form', 'Cloudflare Worker'],
          branches: [
            { title: 'Worker controls', items: ['Turnstile verification', 'Validation', 'Field mapping'] },
            { title: 'CRM results', items: ['Contact', 'Opportunity', 'Workflow'] },
          ],
        },
        listTitle: 'Document these details:',
        list: [
          'Form location',
          'Receiving endpoint',
          'Endpoint deployment location',
          'CRM API used',
          'Credential storage',
          'Created CRM objects',
          'Duplicate behavior',
          'Routing rules',
          'Bot protection',
          'Log locations',
          'Failure behavior',
          'Ownership',
        ],
        emphasis:
          'The implementation should not become mysterious merely because it works.',
      },
      {
        id: 'default-architecture',
        type: 'prose',
        title: 'A practical default architecture',
        paragraphs: [
          'For many small-business websites, a good starting architecture keeps responsibilities clear without reducing security to hiding an API key in JavaScript and hoping nobody notices.',
        ],
        diagram: {
          kind: 'flow',
          label: 'Practical default website to CRM architecture',
          items: [
            'Static website',
            'Serverless / edge endpoint',
            'Bot verification',
            'Schema validation',
            'CRM API',
            'CRM-native workflow',
          ],
        },
        records: [
          {
            title: 'Separation of concerns',
            fields: [
              { label: 'Website', value: 'Presentation.' },
              { label: 'Server-side endpoint', value: 'Trust, validation, normalization and credentials.' },
              { label: 'CRM', value: 'Sales workflow.' },
            ],
          },
        ],
      },
      {
        id: 'automation-platform-middle',
        type: 'prose',
        title: 'When an automation platform belongs in the middle',
        paragraphs: [
          'Sometimes the lead needs more processing than a direct CRM call. An automation platform can make sense when significant workflow logic exists outside the CRM.',
          'Avoid inserting Zapier or n8n solely because automations should go through the automation platform.',
        ],
        diagram: {
          kind: 'branch',
          label: 'Automation platform in the lead intake path',
          beforeBranch: ['Website', 'Secure endpoint', 'n8n'],
          branches: [
            { title: 'Workflow logic', items: ['Enrichment', 'Validation', 'Product matching', 'Conditional routing', 'Notifications'] },
            { title: 'Destination', items: ['CRM'] },
          ],
        },
        listTitle: 'This can make sense for:',
        list: [
          'Meaningful enrichment',
          'Custom logic',
          'Multi-system orchestration',
          'Complex routing',
          'Data transformation',
          'AI processing',
        ],
        paragraphsAfter: [
          'Every extra runtime adds another account, credential, failure mode, recurring cost and thing to document and hand off.',
        ],
        emphasis:
          'Use the extra layer when it performs meaningful work.',
      },
      {
        id: 'boring-to-operate',
        type: 'prose',
        title: 'The best integration is boring to operate',
        paragraphs: [
          'A successful website-to-CRM integration should eventually become almost invisible.',
          'A visitor submits a form. The lead appears in the correct CRM location. The right person is notified. Follow-up begins. Spam is filtered. Failures can be diagnosed. Credentials remain protected.',
          'And another developer can understand the path without summoning the original implementer from the void.',
          'That is the standard worth aiming for.',
        ],
      },
      {
        id: 'client-work-pattern',
        type: 'proof-placeholder',
        title: 'See this pattern in real client work',
      },
      {
        id: 'architecture-next',
        type: 'contextual-cta',
        eyebrow: 'Architecture',
        title: 'Map the full lead path',
        description:
          'Pathflow Architecture can document the website, server-side integration, CRM, automation services, external APIs and data flow behind a lead intake system.',
        cta: {
          label: 'Explore Pathflow Architecture',
          href: '/solutions/architecture',
          description: 'Map the systems and trust boundaries behind website-to-CRM lead intake.',
        },
      },
      {
        id: 'handoffs-next',
        type: 'contextual-cta',
        eyebrow: 'Handoffs',
        title: 'Keep the implementation understandable after delivery',
        description:
          'Pathflow Handoffs can keep resource ownership, implementation notes and operational context connected to the client project after the integration is delivered.',
        cta: {
          label: 'Explore Pathflow Handoffs',
          href: '/platform/handoffs',
          description: 'Keep the lead path understandable after the project leaves implementation mode.',
        },
      },
      {
        id: 'related-resources',
        type: 'prose',
        title: 'Related resources',
        paragraphs: [
          'These related guides cover the operating model around the integration once the form is connected.',
        ],
        relatedLinks: [
          {
            label: 'Zapier vs n8n for Client Automation',
            href: '/resources/zapier-vs-n8n-client-automation',
            description: 'Compare automation platforms through ownership, responsibility, maintainability and handoff.',
          },
          {
            label: 'What to Document Before an Automation Consultant Leaves',
            href: '/resources/automation-consultant-handoff-documentation',
            description: 'Use a practical handoff checklist for automation systems that need to survive after delivery.',
          },
        ],
      },
      {
        id: 'sources',
        type: 'sources',
        title: 'Sources',
      },
    ],
    sources: [
      {
        label: 'Cloudflare Turnstile docs: Validate the token',
        href: 'https://developers.cloudflare.com/turnstile/get-started/server-side-validation/',
        description:
          'Official Cloudflare guidance for server-side Turnstile token validation using the Siteverify API.',
      },
      {
        label: 'Cloudflare Workers docs: Secrets',
        href: 'https://developers.cloudflare.com/workers/configuration/secrets/',
        description:
          'Official Cloudflare Workers documentation describing secrets as encrypted text bindings for sensitive values such as API keys and auth tokens.',
      },
      {
        label: 'Cloudflare Workers docs: Environment variables',
        href: 'https://developers.cloudflare.com/workers/configuration/environment-variables/',
        description:
          'Official Cloudflare Workers documentation distinguishing plaintext environment variables from secrets for sensitive information.',
      },
    ],
  },
  {
    path: '/resources/secure-client-vps-before-deployment',
    slug: 'secure-client-vps-before-deployment',
    category: 'Security',
    type: 'guide',
    topics: ['Security', 'Infrastructure', 'Operations', 'Cloud'],
    status: 'published',
    publishedAt: '2026-08-16',
    eyebrow: 'Resources / Security',
    title: 'How to Secure a Client VPS Before You Deploy Anything',
    shortTitle: 'Secure a Client VPS Before Deployment',
    description:
      'A practical baseline for access, network exposure, patching, containers, secrets, backups, monitoring and operational ownership before a client workload goes live.',
    dek:
      'A fresh VPS is a computer on a network, not a finished production environment. The exact controls change between AWS, a conventional VPS provider and an on-premises VM, but the same question should come first: what is this server supposed to do, and what can be removed or restricted because it does not need to do anything else?',
    readingTime: '24 min read',
    tags: ['Security', 'Infrastructure', 'Operations', 'Cloud', 'DevOps'],
    seo: {
      title: 'How to Secure a Client VPS Before You Deploy Anything | Pathflow',
      description:
        'A practical VPS security baseline for client workloads covering SSH, firewalls, patching, Docker, secrets, backups, monitoring, AWS EC2, Hostinger and on-prem deployments.',
      ogTitle: 'How to Secure a Client VPS Before You Deploy Anything',
    },
    sections: [
      {
        id: 'intro',
        type: 'intro',
        paragraphs: [
          'A fresh VPS is not a production environment.',
          'It is a computer on a network with an operating system, a set of default behaviors and whatever exposure the hosting provider gave it at creation.',
          'Before deploying Docker, n8n, a website, an API or anything else for a client, establish a security baseline first.',
          'AWS may provide security groups, IAM and Systems Manager. A conventional VPS provider may leave more of the host directly in the operator hands. An on-premises VM may depend on a client firewall, VLAN design, hypervisor and physical infrastructure.',
        ],
        questionsLabel: 'Client VPS baseline questions',
        questions: [
          'What is this server supposed to do?',
          'What exposure is actually required?',
          'Who can administer it?',
          'What data persists?',
          'How is it patched?',
          'How is reality checked later?',
        ],
        closing:
          'Different perimeter. Same need for an intentional baseline.',
      },
      {
        id: 'server-job',
        type: 'prose',
        title: "Start with the server's job",
        paragraphs: [
          'Hardening starts with scope. A server that should only reverse-proxy traffic to one application, run n8n and store PostgreSQL data has a very different normal state than a general-purpose development machine.',
          'Write down the intended job before installing the application stack. That inventory gives every later control a reason to exist.',
        ],
        records: [
          {
            title: 'Example inventory',
            fields: [
              { label: 'Purpose', value: 'Client automation server.' },
              { label: 'Expected services', value: 'Caddy, n8n and PostgreSQL.' },
              { label: 'Public exposure', value: '80/tcp and 443/tcp.' },
              { label: 'Administrative access', value: 'AWS Systems Manager.' },
              { label: 'Expected outbound destinations', value: 'CRM API, telephony API, LLM API and email provider.' },
              { label: 'Persistent data', value: 'PostgreSQL, n8n data and Caddy state.' },
            ],
          },
        ],
        emphasis:
          'Security gets substantially harder when nobody knows what normal means.',
      },
      {
        id: 'responsibility-layers',
        type: 'prose',
        title: 'Understand which layer belongs to whom',
        paragraphs: [
          'A VPS is not protected by one control. The responsibility model spans provider infrastructure, network boundaries, the guest operating system, the runtime, the application and the data.',
          'The surrounding provider controls change, but the Linux guest still needs deliberate ownership.',
        ],
        diagram: {
          kind: 'flow',
          label: 'Client VPS responsibility layers',
          items: [
            'Provider / physical infrastructure',
            'Network perimeter',
            'Virtual machine',
            'Operating system',
            'Container / runtime',
            'Application',
            'Data and credentials',
          ],
        },
        records: [
          {
            title: 'AWS EC2',
            fields: [
              { label: 'Provider layer', value: 'AWS handles physical infrastructure and the underlying managed cloud platform.' },
              { label: 'Customer layer', value: 'The operator owns EC2 guest configuration, security groups, IAM use, operating-system patching, applications, credentials, storage protection and monitoring choices.' },
            ],
          },
          {
            title: 'Hostinger / conventional VPS',
            fields: [
              { label: 'Provider layer', value: 'The provider owns physical hosts, virtualization and any platform-level firewall features included with the service.' },
              { label: 'Operator layer', value: 'The operator still owns guest Linux, SSH, host firewall policy, Docker, backups, monitoring, secrets and the application lifecycle.' },
            ],
          },
          {
            title: 'On-premises virtualization',
            fields: [
              { label: 'Expanded layer', value: 'Physical host, hypervisor, switches, router, firewall, VLANs, storage, UPS, firmware, physical access and remote administration may all belong to the client environment.' },
              { label: 'Risk', value: 'Do not assume an on-premises VM inherits the same surrounding controls as an EC2 instance.' },
            ],
          },
        ],
      },
      {
        id: 'patch-before-deploying',
        type: 'prose',
        title: 'Patch before deploying',
        paragraphs: [
          'A newly provisioned image may not be current by the time it is used. Patch the operating system before the application stack becomes the main concern.',
          'Automatic security updates can help, but they are not the entire maintenance strategy. Reboots may still be required, application upgrades may need maintenance windows and Docker image updates should be reviewed before production rollout.',
        ],
        codeBlocks: [
          {
            label: 'Ubuntu package refresh',
            code: `sudo apt update
sudo apt upgrade`,
          },
          {
            label: 'Optional automatic security updates',
            code: `sudo apt install unattended-upgrades`,
          },
        ],
        records: [
          {
            title: 'Update ownership block',
            fields: [
              { label: 'OS security updates', value: 'Automatic.' },
              { label: 'Application updates', value: 'Maintenance window.' },
              { label: 'Docker image updates', value: 'Reviewed before deployment.' },
              { label: 'Reboot responsibility', value: 'Named operator.' },
            ],
          },
        ],
        emphasis:
          '"Someone should probably update it occasionally" is not an operating model.',
      },
      {
        id: 'administrative-identity',
        type: 'prose',
        title: 'Create a named administrative user',
        paragraphs: [
          'Avoid treating root as the normal human login. Create a named administrative account, validate that access works and only then retire or restrict older access paths.',
          'Separate operator accounts are preferable where practical because they make access review and departure cleanup simpler.',
        ],
        codeBlocks: [
          {
            label: 'Ubuntu operator account example',
            code: `sudo adduser operator
sudo usermod -aG sudo operator`,
          },
        ],
        listTitle: 'Administrative account checks:',
        list: [
          'Named user exists',
          'Sudo access is intentional',
          'New access works before old access is disabled',
          'Routine direct root login is avoided',
          'Departed operators can be removed cleanly',
        ],
        emphasis:
          'Administrative activity should be attributable to an identity.',
      },
      {
        id: 'administrative-access',
        type: 'prose',
        title: 'Prefer key-based or identity-based administration',
        paragraphs: [
          'Conventional VPS administration often begins with SSH. Use key authentication, disable unnecessary password authentication, avoid routine direct root login and restrict source networks where practical.',
          'On AWS, Systems Manager Session Manager can be a stronger default when it fits the environment. It can remove the need for a public SSH listener, persistent SSH keys and a bastion host in some architectures. That does not make it mandatory, but it is worth considering before opening port 22 to the internet.',
          'Changing SSH ports can reduce background noise. It should not be mistaken for an authentication boundary.',
        ],
        records: [
          {
            title: 'Conventional VPS pattern',
            fields: [
              { label: 'Identity', value: 'Named user.' },
              { label: 'Authentication', value: 'SSH key.' },
              { label: 'Source', value: 'Restricted source network where practical.' },
            ],
          },
          {
            title: 'AWS pattern',
            fields: [
              { label: 'Identity', value: 'IAM identity.' },
              { label: 'Administration', value: 'Systems Manager Session Manager.' },
              { label: 'Exposure', value: 'No public SSH listener when the design allows it.' },
            ],
          },
        ],
      },
      {
        id: 'default-deny-inbound',
        type: 'prose',
        title: 'Default-deny inbound traffic',
        paragraphs: [
          'A production client server should have a short, explainable list of inbound paths. Public database ports, dashboards, debug ports and the Docker API should not be exposed casually.',
          'Internal services can usually communicate over local or private networks. Public access should be something the server needs, not something it inherited.',
        ],
        codeBlocks: [
          {
            label: 'Illustrative inbound policy',
            code: `Inbound

80/tcp   -> public
443/tcp  -> public
22/tcp   -> restricted or absent
everything else -> denied`,
          },
        ],
        records: [
          {
            title: 'AWS',
            fields: [
              { label: 'Control', value: 'Use security groups deliberately. Document the reason, source and owner for each rule.' },
            ],
          },
          {
            title: 'Hostinger / conventional VPS',
            fields: [
              { label: 'Control', value: 'Use the provider firewall plus a host firewall where appropriate.' },
            ],
          },
          {
            title: 'On-premises',
            fields: [
              { label: 'Control', value: 'Understand the full path through edge firewall, VLAN, hypervisor, VM firewall and application. On-prem does not automatically mean segmented.' },
            ],
          },
        ],
      },
      {
        id: 'host-firewall',
        type: 'prose',
        title: 'Keep the host firewall simple enough to understand',
        paragraphs: [
          'A host firewall is useful only when the operator understands what it allows. Keep the initial policy small and make sure administrative access is accounted for before enabling it.',
          'The example below is an illustration, not universal production guidance. SSH, VPN, private interfaces and provider firewall behavior can change what should be allowed.',
        ],
        codeBlocks: [
          {
            label: 'Simple UFW shape',
            code: `sudo ufw default deny incoming
sudo ufw default allow outgoing

sudo ufw allow 80/tcp
sudo ufw allow 443/tcp`,
          },
        ],
        listTitle: 'Ask before opening a port:',
        list: [
          'Why is this port open?',
          'Who needs it?',
          'From where?',
          'What breaks if it closes?',
        ],
      },
      {
        id: 'fail2ban',
        type: 'prose',
        title: 'Fail2Ban can help, but understand what problem it solves',
        paragraphs: [
          'Fail2Ban can reduce repeated authentication attempts against exposed services. That can be useful for a conventional VPS with public SSH.',
          'It is not a replacement for strong authentication, a smaller attack surface or a design where the administrative service is not publicly exposed in the first place.',
        ],
        listTitle: 'Use it where it matches the architecture:',
        list: [
          'Useful for repeated login attempts against exposed services',
          'Less relevant when SSH is not publicly reachable',
          'Not a patching strategy',
          'Not protection against application vulnerabilities',
        ],
        emphasis:
          'Security controls should correspond to the actual architecture.',
      },
      {
        id: 'temporary-directories',
        type: 'prose',
        title: 'Harden temporary directories, but understand the boundary',
        paragraphs: [
          'Mount options such as noexec, nosuid and nodev can be useful defense-in-depth controls for temporary directories. They remove common conveniences that attackers and sloppy scripts may rely on.',
          'A noexec mount should not be interpreted as arbitrary code can no longer run from this workflow. Linux supports memory-backed execution paths through existing processes, and public memexec-style tooling demonstrates why noexec removes one execution path rather than creating a complete code-execution boundary.',
          'Do not treat this as a bypass tutorial. Treat it as a reminder that host hardening needs layers.',
        ],
        listTitle: 'Temporary-directory controls can include:',
        list: [
          'noexec',
          'nosuid',
          'nodev',
        ],
        diagram: {
          kind: 'flow',
          label: 'Layered host hardening controls',
          items: [
            'Reduced exposure',
            'Patched software',
            'Least privilege',
            'Application isolation',
            'Host controls',
            'Monitoring',
            'Known-good state',
          ],
        },
        emphasis:
          'noexec can remove a convenient execution path. It does not repair an application that already gives an attacker arbitrary code execution.',
      },
      {
        id: 'listening-services',
        type: 'prose',
        title: 'Know what is listening',
        paragraphs: [
          'Check listening services before and after deployment. The goal is not to memorize every process forever, but to know what should be reachable and what deserves investigation.',
        ],
        codeBlocks: [
          {
            label: 'Listening services',
            code: `ss -lntup`,
          },
        ],
        records: [
          {
            title: 'Expected listeners',
            fields: [
              { label: '22/tcp', value: 'SSH. Restricted administration.' },
              { label: '80/tcp', value: 'HTTP redirect.' },
              { label: '443/tcp', value: 'HTTPS.' },
              { label: '5432/tcp', value: 'PostgreSQL. Internal only.' },
            ],
          },
        ],
        emphasis:
          'Unexplained listeners deserve investigation before the server becomes production.',
      },
      {
        id: 'docker-threat-model',
        type: 'prose',
        title: 'Docker deserves its own threat model',
        paragraphs: [
          'Docker is often the runtime for client automation servers, websites and internal tools. It is also a powerful administrative interface to the host.',
          'Treat the Docker daemon, socket, remote API, filesystem mounts, networking mode, Linux capabilities and container users as part of the security model.',
        ],
        listTitle: 'Review these Docker boundaries:',
        list: [
          'Docker daemon privilege',
          '/var/run/docker.sock exposure',
          'Remote daemon access',
          'Rootful versus rootless compatibility',
          'Privileged containers',
          'Host network mode',
          'Host PID namespace',
          'Host filesystem mounts',
          'Linux capabilities',
          'Containers running as root',
          'Secrets accessible to containers',
        ],
        emphasis:
          '/var/run/docker.sock is not just another file mount.',
      },
      {
        id: 'privileged-containers',
        type: 'prose',
        title: 'Avoid privileged containers unless they are actually required',
        paragraphs: [
          'Privileged containers, Docker socket mounts and broad host mounts often appear during hurried deployments because they make errors disappear. They also change the trust boundary dramatically.',
          'Rootless Docker can be an option where compatible, but it does not eliminate every container security risk.',
        ],
        listTitle: 'Review before launch:',
        list: [
          'privileged: true',
          'Docker socket mounts',
          'Host filesystem mounts',
          'Unnecessary Linux capabilities',
          'Root user inside the container',
          'Host networking',
        ],
      },
      {
        id: 'secrets',
        type: 'prose',
        title: 'Keep secrets out of the repository',
        paragraphs: [
          'Private values do not belong in Git, project notes, screenshots, frontend bundles or casual README examples.',
          'Document the credential without documenting the secret. A future operator needs to know how a credential is managed. They do not need the secret pasted into a README.',
        ],
        listTitle: 'Common secret material includes:',
        list: [
          '.env files',
          'Private keys',
          'API tokens',
          'Database passwords',
          'OAuth secrets',
          'Cloud credentials',
        ],
        codeBlocks: [
          {
            label: 'Useful credential documentation',
            code: `Credential:
RingCentral OAuth application

Owner:
Client developer account

Used by:
Call-processing workflow

Stored in:
n8n credential store

Rotation:
Reauthorize application

Secret value:
Not documented here`,
          },
        ],
      },
      {
        id: 'aws-controls',
        type: 'prose',
        title: 'AWS instances need AWS-specific controls',
        paragraphs: [
          'An EC2 instance is still a Linux server, but AWS adds surrounding controls that should be reviewed as part of the baseline.',
          'Use AWS-native identity and network controls where they fit instead of recreating every boundary inside the guest operating system.',
        ],
        records: [
          {
            title: 'AWS controls to review',
            fields: [
              { label: 'IMDSv2', value: 'Review whether the EC2 Instance Metadata Service should require IMDSv2 for the instance.' },
              { label: 'IAM instance roles', value: 'Prefer appropriately scoped instance roles over long-lived static AWS access keys on the server where practical.' },
              { label: 'EBS encryption', value: 'Review volume encryption, snapshot encryption, KMS ownership and backup retention.' },
              { label: 'Security groups', value: 'Keep rules intentional and periodically reviewed. A security group should not become a graveyard of historical exceptions.' },
              { label: 'Systems Manager', value: 'Consider Session Manager for administration when it fits the account and network model.' },
              { label: 'Cloud monitoring and audit', value: 'Use CloudWatch and CloudTrail concepts where appropriate for operational visibility.' },
            ],
          },
        ],
      },
      {
        id: 'conventional-vps',
        type: 'prose',
        title: 'Conventional VPS deployments require stronger host ownership',
        paragraphs: [
          'Hostinger is a useful concrete example of a conventional VPS environment, but the lesson is broader than one provider. Understand the exact service boundary for the product being used.',
          'A convenient hosting control panel does not mean the provider is maintaining the Linux guest.',
        ],
        listTitle: 'The operator commonly owns:',
        list: [
          'Provider firewall review',
          'Host firewall policy',
          'SSH access lifecycle',
          'OS updates',
          'Application updates',
          'Docker configuration',
          'Reverse proxy',
          'TLS',
          'Backups',
          'Monitoring',
          'Secrets',
        ],
      },
      {
        id: 'on-premises',
        type: 'prose',
        title: 'On-prem adds physical and network dependencies',
        paragraphs: [
          'An on-premises VM can be excellent when the client has the surrounding operational discipline. It can also inherit a flat office LAN, weak remote access and unclear ownership.',
          'Document the network path, management path and physical dependencies before treating the VM like a normal cloud server.',
        ],
        diagram: {
          kind: 'branch',
          label: 'On-premises application and management paths',
          beforeBranch: ['Internet', 'Firewall'],
          branches: [
            { title: 'Application path', items: ['DMZ / application VLAN', 'Reverse proxy', 'Application VM'] },
            { title: 'Management path', items: ['Management VPN', 'Management VLAN', 'Hypervisor / VM administration'] },
          ],
        },
        listTitle: 'On-prem dependencies can include:',
        list: [
          'Physical host',
          'Hypervisor',
          'Management network',
          'Application network',
          'Firewall',
          'VLANs',
          'VPN',
          'Storage',
          'Backups',
          'UPS',
          'Remote administration',
          'Physical access',
        ],
        emphasis:
          'An on-prem VM should not gain broad access to the rest of the office network simply because that was the easiest default.',
      },
      {
        id: 'backups',
        type: 'prose',
        title: 'Backups are not complete until restore is understood',
        paragraphs: [
          'Snapshots are useful, but they are not always application-aware. Database workloads may need a backup strategy beyond whole-server snapshots.',
          'Document recovery with the same seriousness as the backup schedule. The operational question is whether the service can be restored, not whether a checkbox says backup succeeded.',
        ],
        listTitle: 'Backup documentation should cover:',
        list: [
          'Scope',
          'Destination',
          'Frequency',
          'Retention',
          'Encryption',
          'Access',
          'Restore process',
          'Last restore test',
        ],
        emphasis:
          'A successful backup job proves that a backup ran. It does not prove that the service can be recovered.',
      },
      {
        id: 'monitoring',
        type: 'prose',
        title: 'Monitor more than uptime',
        paragraphs: [
          'Website uptime is only one signal. A server can respond to HTTP while memory is exhausted, disk is filling, containers are restarting or outbound traffic is abnormal.',
          'When a client says, "The application feels slow," the useful baseline should help narrow the cause instead of turning every incident into guesswork.',
        ],
        listTitle: 'Useful monitoring signals include:',
        list: [
          'CPU',
          'Memory',
          'Swap',
          'Disk',
          'Disk throughput',
          'Load',
          'Restarts',
          'Failed services',
          'Container state',
          'Authentication failures',
          'TLS expiry',
          'Backup failures',
          'Listening ports',
          'Unusual outbound traffic',
        ],
        records: [
          {
            title: 'Possible causes of slowness',
            fields: [
              { label: 'Resource pressure', value: 'Memory exhaustion, traffic spike, runaway logs or disk failure.' },
              { label: 'Application behavior', value: 'Bad query, app loop or repeated service restarts.' },
              { label: 'Abuse', value: 'Miner, compromised process or unexpected outbound activity.' },
            ],
          },
        ],
        emphasis:
          'Availability is one dimension of health, not the definition of health.',
      },
      {
        id: 'expected-state',
        type: 'prose',
        title: 'Establish expected process and container state',
        paragraphs: [
          'A future operator should be able to compare what is running against what was intentionally deployed.',
          'Unexpected containers, unfamiliar services or new listeners should trigger investigation, even if the application still appears to work.',
        ],
        codeBlocks: [
          {
            label: 'Expected containers',
            code: `caddy
n8n
postgres`,
          },
          {
            label: 'Drift example',
            code: `caddy
n8n
postgres
mystery-container-7df1`,
          },
        ],
        emphasis:
          'Is this part of the system that was intentionally deployed?',
      },
      {
        id: 'outbound-behavior',
        type: 'prose',
        title: 'Pay attention to outbound behavior',
        paragraphs: [
          'Not every VPS needs a strict outbound allowlist, but expected outbound behavior should be understood. A small automation server usually has a limited set of legitimate destinations.',
          'Compromised hosts may generate activity that is expensive, abusive or damaging to client reputation.',
        ],
        listTitle: 'Unexpected outbound behavior can include:',
        list: [
          'Scanning remote systems',
          'Sending spam',
          'Attacking credentials',
          'Contacting command-and-control infrastructure',
          'Mining cryptocurrency',
          'Exfiltrating data',
          'Generating expensive egress',
        ],
      },
      {
        id: 'logs',
        type: 'prose',
        title: 'Keep logs long enough to answer basic questions',
        paragraphs: [
          'Logs need a retention and rotation plan. Keeping too little history makes incidents opaque. Keeping logs until the disk fills can create its own outage.',
        ],
        codeBlocks: [
          {
            label: 'Questions logs should help answer',
            code: `Who logged in?
What changed?
When did the service restart?
What failed?
Which requests reached the reverse proxy?
Which containers were running?
When did unusual behavior begin?`,
          },
        ],
        listTitle: 'Common log sources:',
        list: [
          'Authentication logs',
          'System logs',
          'Proxy logs',
          'Application logs',
          'Container logs',
          'Cloud audit logs',
          'Retention policy',
          'Rotation policy',
        ],
        emphasis:
          'A server filling its own disk with logs is an embarrassingly effective availability incident.',
      },
      {
        id: 'mandatory-access-control',
        type: 'prose',
        title: 'Use mandatory access control where it provides value',
        paragraphs: [
          'Ubuntu commonly includes AppArmor. It can provide additional policy boundaries around processes through profiles and enforcement modes.',
          'Do not disable default protections without understanding the reason. Also avoid elaborate custom profiles for tiny workloads unless the operational value justifies the extra maintenance.',
        ],
        listTitle: 'Review MAC controls deliberately:',
        list: [
          'Which profiles exist',
          'Which profiles are enforced',
          'Which profiles are in complain mode',
          'Which services depend on default protections',
          'Who owns future profile changes',
        ],
        emphasis:
          'Use controls deliberately.',
      },
      {
        id: 'access-inventory',
        type: 'prose',
        title: 'Document administrative access',
        paragraphs: [
          'Access should be reviewable and revocable when a consultant leaves. Documenting only the server IP is not enough.',
        ],
        codeBlocks: [
          {
            label: 'Access inventory example',
            code: `AWS account:
Client owned

EC2:
Consultant operated

Interactive administration:
AWS Systems Manager

GitHub:
Consultant repository access

DNS:
Client Cloudflare account

n8n:
Client application account

Root:
No routine remote login`,
          },
        ],
        listTitle: 'Review access across:',
        list: [
          'Linux users',
          'SSH keys',
          'IAM identities',
          'GitHub collaborators',
          'Provider access',
          'VPN access',
          'Application admins',
          'API credentials',
        ],
      },
      {
        id: 'tool-accumulation',
        type: 'prose',
        title: 'Do not install security software for decoration',
        paragraphs: [
          'Security tools are operational commitments. More agents and daemons can mean more configuration, updates, alerts, failure modes and support burden.',
          'Start with the boring controls that reduce obvious exposure and make the system understandable. Then add tools because the architecture needs them, not because the tool list feels more serious.',
        ],
        codeBlocks: [
          {
            label: 'Tools that should earn their place',
            code: `Fail2Ban
UFW
AppArmor
antivirus
IDS
EDR
SIEM agent
five monitoring daemons`,
          },
        ],
        diagram: {
          kind: 'flow',
          label: 'Practical security priority path',
          items: [
            'Know the workload',
            'Reduce exposure',
            'Control access',
            'Patch',
            'Protect secrets',
            'Isolate applications',
            'Back up',
            'Monitor',
            'Document',
          ],
        },
      },
      {
        id: 'minimum-baseline',
        type: 'checklist',
        title: 'A practical minimum baseline',
        paragraphs: [
          'This checklist is not a universal compliance standard. It is a practical starting point for a client VPS before a workload becomes a production dependency.',
        ],
        listLabel: 'Client VPS minimum baseline checklist',
        groups: [
          {
            title: 'Access',
            items: [
              'Named admin user exists',
              'No routine root administration',
              'Key-based or identity-based access',
              'Password SSH disabled where appropriate',
              'Source restrictions applied where practical',
              'Session Manager considered for EC2',
            ],
          },
          {
            title: 'Network',
            items: [
              'Required public ports documented',
              'Provider or cloud firewall reviewed',
              'Host firewall configured where appropriate',
              'Database and internal services are not unnecessarily public',
              'Listening services reviewed',
            ],
          },
          {
            title: 'Operating System',
            items: [
              'Patched before deployment',
              'Update policy documented',
              'Maintenance and reboot owner named',
              'Unnecessary services reviewed',
              'Temporary-directory hardening considered',
              'Default MAC controls retained unless deliberately changed',
            ],
          },
          {
            title: 'Runtime',
            items: [
              'Docker daemon not exposed insecurely',
              'Privileged containers reviewed',
              'Host mounts reviewed',
              'Socket exposure reviewed',
              'Users and permissions reviewed',
            ],
          },
          {
            title: 'Secrets',
            items: [
              'No secrets in Git',
              'Server-side secret handling documented',
              'Credential ownership recorded',
              'Rotation path known',
              'IAM roles used instead of static keys where practical',
            ],
          },
          {
            title: 'Data',
            items: [
              'Backup scope documented',
              'Backup destination documented',
              'Retention policy documented',
              'Restore process understood',
              'Encryption reviewed',
            ],
          },
          {
            title: 'Operations',
            items: [
              'CPU, memory and disk monitoring configured',
              'Service and container health checked',
              'Logs and rotation planned',
              'Alert destination assigned',
              'Expected process and container state documented',
              'Access inventory recorded',
            ],
          },
        ],
        closing:
          'If most of these questions cannot be answered before deployment, the environment is probably not ready to become a client production dependency.',
      },
      {
        id: 'environment-comparison',
        type: 'prose',
        title: 'Different environments, same problem',
        paragraphs: [
          'AWS, Hostinger-style VPS hosting and on-premises virtualization place controls in different places. None removes the need to define the baseline.',
        ],
        records: [
          {
            title: 'AWS',
            fields: [
              { label: 'Typical control locations', value: 'IAM, security groups, Systems Manager, IMDSv2, encrypted EBS, native monitoring and audit capabilities.' },
            ],
          },
          {
            title: 'Hostinger / conventional VPS',
            fields: [
              { label: 'Typical control locations', value: 'Provider firewall, SSH, host firewall, guest patching, Docker, backups, monitoring and direct operational ownership.' },
            ],
          },
          {
            title: 'On-premises',
            fields: [
              { label: 'Typical control locations', value: 'Physical server, hypervisor, firewall, VLANs, remote-access path, storage, backup, power and physical access.' },
            ],
          },
        ],
        emphasis:
          'The environment changes where the controls live. It does not remove the need to define them.',
      },
      {
        id: 'hardening-failures',
        type: 'prose',
        title: 'Hardening should make failures easier to see',
        paragraphs: [
          'The goal is not an unhackable server. The goal is a baseline that makes unnecessary access harder, obvious abuse harder, patching easier, restoration easier, monitoring clearer, investigation faster and handoff less fragile.',
          'If a client reports poor performance and the server is running something that was never intentionally deployed, the response should not begin with "Maybe restart it?"',
          'The environment should contain enough context to determine whether reality has diverged from the intended system.',
        ],
      },
      {
        id: 'secure-not-finished',
        type: 'prose',
        title: 'Secure does not mean finished',
        paragraphs: [
          'Know what should be running. Expose only what needs to be exposed. Keep it patched. Keep access attributable. Keep secrets out of the wrong places. Back it up. Watch it. Document it.',
          'Then deploy the application.',
        ],
      },
      {
        id: 'architecture-next',
        type: 'contextual-cta',
        eyebrow: 'Architecture',
        title: 'Map what is actually being protected',
        description:
          'Pathflow Architecture can document the server, network boundaries, applications, databases, external services and management relationships surrounding a client deployment.',
        cta: {
          label: 'Explore Pathflow Architecture',
          href: '/solutions/architecture',
          description: 'Map the systems, boundaries and ownership context around client infrastructure.',
        },
      },
      {
        id: 'runtime-next',
        type: 'contextual-cta',
        eyebrow: 'Runtime',
        title: 'Operating the baseline should eventually be the boring part',
        description:
          'Many of these controls are configured and monitored manually today. Pathflow Runtime is intended to make more of the operational baseline visible and repeatable over time: expected workloads, resource state, deployment context, health, drift, and the relationship between what was documented and what is actually running.',
        cta: {
          label: 'Pathflow Runtime',
          href: '/solutions/runtime',
          available: false,
          status: 'Not public yet',
          description: 'Future runtime visibility for expected workloads, health, resource state and drift.',
        },
      },
      {
        id: 'related-resources',
        type: 'prose',
        title: 'Related resources',
        paragraphs: [
          'These guides cover adjacent delivery and integration context once the server baseline is in place.',
        ],
        relatedLinks: [
          {
            label: 'What to Document Before an Automation Consultant Leaves',
            href: '/resources/automation-consultant-handoff-documentation',
            description: 'Document ownership, credentials, hosting, deployments, data flow, monitoring and maintenance before handoff.',
          },
          {
            label: 'How to Connect Website Lead Forms Directly to a CRM',
            href: '/resources/connect-website-lead-forms-to-crm',
            description: 'Design the trust boundary between a public website form and a private CRM integration.',
          },
        ],
      },
      {
        id: 'sources',
        type: 'sources',
        title: 'Sources',
      },
    ],
    sources: [
      {
        label: 'Security group rules',
        provider: 'AWS',
        href: 'https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html',
        description:
          'Official AWS VPC documentation for security group rule behavior, inbound and outbound rules, sources, destinations and stale rule review.',
      },
      {
        label: 'AWS Systems Manager Session Manager',
        provider: 'AWS',
        href: 'https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html',
        description:
          'Official AWS documentation describing Session Manager administration for EC2 instances, on-premises servers and VMs without opening inbound ports.',
      },
      {
        label: 'Configure the Instance Metadata Service options',
        provider: 'AWS',
        href: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-options.html',
        description:
          'Official EC2 documentation for configuring instance metadata options, including IMDSv2 requirements.',
      },
      {
        label: 'IAM roles for Amazon EC2',
        provider: 'AWS',
        href: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html',
        description:
          'Official EC2 documentation for attaching IAM roles to instances instead of relying on long-lived access keys.',
      },
      {
        label: 'Amazon EBS encryption',
        provider: 'AWS',
        href: 'https://docs.aws.amazon.com/ebs/latest/userguide/ebs-encryption.html',
        description:
          'Official EBS documentation covering volume encryption, snapshots and KMS key considerations.',
      },
      {
        label: 'Automatic updates',
        provider: 'Ubuntu',
        href: 'https://ubuntu.com/server/docs/how-to/software/automatic-updates/',
        description:
          'Official Ubuntu Server documentation for unattended upgrades and automatic package update behavior.',
      },
      {
        label: 'Firewalls',
        provider: 'Ubuntu',
        href: 'https://ubuntu.com/server/docs/security-firewall/',
        description:
          'Official Ubuntu Server firewall documentation, including UFW guidance.',
      },
      {
        label: 'AppArmor',
        provider: 'Ubuntu',
        href: 'https://ubuntu.com/server/docs/how-to/security/apparmor/',
        description:
          'Official Ubuntu Server AppArmor documentation for mandatory access control profiles and enforcement concepts.',
      },
      {
        label: 'Protect the Docker daemon socket',
        provider: 'Docker',
        href: 'https://docs.docker.com/engine/security/protect-access/',
        description:
          'Official Docker documentation for securing daemon socket access and remote daemon connections.',
      },
      {
        label: 'Configure remote access for Docker daemon',
        provider: 'Docker',
        href: 'https://docs.docker.com/engine/daemon/remote-access/',
        description:
          'Official Docker documentation describing remote daemon access and the security implications of opening Docker to the network.',
      },
      {
        label: 'Rootless mode',
        provider: 'Docker',
        href: 'https://docs.docker.com/engine/security/rootless/',
        description:
          'Official Docker documentation for running the Docker daemon and containers as a non-root user where compatible.',
      },
      {
        label: 'docker container run',
        provider: 'Docker',
        href: 'https://docs.docker.com/reference/cli/docker/container/run/',
        description:
          'Official Docker CLI reference for container run options including privileged mode, capabilities, users, mounts and networking choices.',
      },
      {
        label: 'How to use a managed VPS firewall at Hostinger',
        provider: 'Hostinger',
        href: 'https://www.hostinger.com/support/8172641-how-to-use-a-managed-vps-firewall-at-hostinger/',
        description:
          'Official Hostinger support documentation for managed VPS firewall use in Hostinger environments.',
      },
      {
        label: 'How to set up a VPS',
        provider: 'Hostinger',
        href: 'https://www.hostinger.com/ng/tutorials/how-to-set-up-vps/',
        description:
          'Official Hostinger tutorial covering VPS setup concepts such as SSH access, firewall setup and operational basics.',
      },
      {
        label: 'Introduction of non-executable mfd',
        provider: 'Linux Kernel',
        href: 'https://www.kernel.org/doc/html/latest/userspace-api/mfd_noexec.html',
        description:
          'Official Linux kernel documentation for non-executable memory file descriptor behavior, used here to frame noexec as defense in depth.',
      },
    ],
  },
  {
    path: '/resources/your-vps-is-running-xmrig-now-what',
    slug: 'your-vps-is-running-xmrig-now-what',
    category: 'Security',
    type: 'field-note',
    topics: ['Security', 'Infrastructure', 'Operations', 'Cloud'],
    status: 'published',
    publishedAt: '2026-08-16',
    eyebrow: 'Resources / Security Field Note',
    title: 'Your VPS is running XMRig. Now what?',
    shortTitle: 'Your VPS is running XMRig. Now what?',
    description:
      'A practical incident-response field note for unauthorized cryptomining on a client VPS.',
    dek:
      'An unexpected XMRig process is usually not the incident. It is a loud symptom that something unauthorized may have gained the ability to execute code on the server.',
    readingTime: '22 min read',
    tags: ['Security', 'Incident response', 'Infrastructure', 'Cloud', 'Operations'],
    seo: {
      title: 'Your VPS is running XMRig. Now what? | Pathflow',
      description:
        'A practical incident response guide for unauthorized XMRig or cryptomining activity on a client VPS, covering containment, evidence, credentials, root cause, rebuilds and monitoring.',
      ogTitle: 'Your VPS is running XMRig. Now what?',
    },
    sections: [
      {
        id: 'intro',
        type: 'intro',
        paragraphs: [
          'The first symptom may not look like a security incident.',
          'A client reports that an application has become slow. CPU usage is pinned. An automation that normally finishes in seconds takes minutes. SSH feels sluggish. A monitoring graph suddenly looks very different from its normal baseline.',
          'Then a process view shows something that was never part of the deployment.',
        ],
        media: {
          src: '/resources/security/xmrig/terminal-xmrig.png',
          alt: 'Terminal screenshot showing top on an Ubuntu VPS with xmrig consuming high CPU alongside expected system services.',
          caption:
            'Unexpected sustained CPU usage may be the first visible symptom. The process itself is only the beginning of the investigation.',
          loading: 'eager',
        },
        closing:
          'At that point, killing the process is tempting. It is also not enough.',
      },
      {
        id: 'symptom-not-incident',
        type: 'prose',
        title: 'XMRig is the symptom, not the incident',
        paragraphs: [
          'XMRig itself is a legitimate open-source cryptocurrency miner. Its presence is not inherently malicious.',
          'Finding an unapproved XMRig process on a client production server is different. That is strong evidence that the host may have been compromised and should be treated accordingly.',
          'MITRE ATT&CK classifies unauthorized cryptomining as compute-resource hijacking, and XMRig has been observed in real intrusions.',
        ],
        listTitle: 'An attacker who can execute a miner may also have been able to:',
        list: [
          'Read application configuration',
          'Access environment variables',
          'Retrieve API credentials',
          'Modify SSH keys',
          'Establish persistence',
          'Deploy additional payloads',
          'Inspect cloud credentials',
          'Access databases',
          'Scan other systems',
          'Use the host as infrastructure for further activity',
        ],
        paragraphsAfter: [
          'CISA has documented an intrusion in which attackers exploited an unpatched internet-facing VMware Horizon system, installed XMRig, compromised credentials, moved laterally and established additional persistence.',
        ],
        codeBlocks: [
          {
            label: 'Not remediation',
            code: `kill -9 <xmrig-pid>`,
          },
        ],
        emphasis:
          'Stopping one process does not answer how it arrived, whether it will return, or what happened before discovery.',
      },
      {
        id: 'first-signals',
        type: 'prose',
        title: 'How XMRig may first reveal itself',
        paragraphs: [
          'Cryptocurrency mining is computationally expensive by design. On a small VPS, sustained CPU use that sits far above the normal baseline deserves investigation.',
          'The process may literally be named xmrig. Do not depend on that. A miner can be renamed or launched through another mechanism.',
        ],
        codeBlocks: [
          {
            label: 'Useful first checks',
            code: `top

ps aux --sort=-%cpu | head`,
          },
          {
            label: 'Baseline versus suspicious CPU',
            code: `Normal:
CPU 5-20%

Suspicious:
CPU 90-400%+`,
          },
        ],
        emphasis:
          'The durable indicator is unexpected sustained compute consumption by a workload that does not belong to the documented system.',
      },
      {
        id: 'expected-workload',
        type: 'prose',
        title: 'Compare reality with the expected workload',
        paragraphs: [
          'A small production host should have a reasonably understandable baseline. The question is not only whether the filename looks suspicious. The question is whether the workload is part of the intentionally deployed system.',
        ],
        codeBlocks: [
          {
            label: 'Expected',
            code: `caddy
n8n
postgres
node-exporter`,
          },
          {
            label: 'Obviously unexpected',
            code: `caddy
n8n
postgres
node-exporter
xmrig`,
          },
          {
            label: 'Less obvious',
            code: `caddy
n8n
postgres
node-exporter
system-update`,
          },
        ],
        emphasis:
          'Is this process part of an intentionally deployed workload?',
      },
      {
        id: 'network-connections',
        type: 'prose',
        title: 'Look for unexpected network connections',
        paragraphs: [
          'Mining software usually needs somewhere to submit work. Current connections can show whether the host is communicating with destinations outside the expected application pattern.',
          'Do not assume that blocking a known mining pool solves the compromise. The attacker may change endpoints, tunnel traffic or have installed other tooling. Treat network activity as evidence.',
        ],
        codeBlocks: [
          {
            label: 'Connection review',
            code: `ss -ntup`,
          },
        ],
        listTitle: 'Normal outbound destinations for a small automation server may include:',
        list: [
          'CRM provider',
          'Telephony provider',
          'Email provider',
          'LLM API',
          'Package repositories',
          'DNS',
        ],
      },
      {
        id: 'containers',
        type: 'prose',
        title: 'Check whether the miner is inside a container',
        paragraphs: [
          'On Docker hosts, compare running containers with the documented deployment. An unfamiliar container, image or process inside a legitimate container deserves investigation.',
          'Cryptomining activity has repeatedly targeted container and cloud environments. MITRE documents TeamTNT as a threat group focused heavily on cloud and container infrastructure for cryptocurrency mining, including persistence through SSH authorized keys.',
        ],
        codeBlocks: [
          {
            label: 'Docker state',
            code: `docker ps`,
          },
          {
            label: 'Expected containers',
            code: `caddy
n8n
postgres`,
          },
          {
            label: 'Unexpected container',
            code: `caddy
n8n
postgres
worker-update-1`,
          },
        ],
      },
      {
        id: 'persistence',
        type: 'prose',
        title: 'Look for persistence',
        paragraphs: [
          'If XMRig disappears after being killed and then returns, something is launching it.',
          'The objective is not merely to find a file named xmrig.service. It is to identify anything added or modified that would allow unauthorized execution to survive a restart.',
        ],
        codeBlocks: [
          {
            label: 'Service review',
            code: `systemctl --type=service --state=running

systemctl list-unit-files --state=enabled`,
          },
        ],
        listTitle: 'Common persistence locations worth reviewing defensively include:',
        list: [
          'systemd services',
          'cron',
          'user crontabs',
          'startup scripts',
          'container restart policies',
          'modified application startup scripts',
          'unexpected users',
          'SSH authorized_keys',
        ],
      },
      {
        id: 'authentication-activity',
        type: 'prose',
        title: 'Check authentication activity',
        paragraphs: [
          'Review authentication history around the likely compromise window. Build a timeline rather than jumping to a conclusion from one log entry.',
          'A successful login from an unfamiliar IP is interesting. It is not automatically proof that the login belongs to the attacker.',
        ],
        listTitle: 'Look for:',
        list: [
          'Logins from unexpected addresses',
          'Unusual login times',
          'New users',
          'SSH keys added unexpectedly',
          'Repeated authentication failures followed by success',
          'Unexpected privilege escalation',
          'Administrative actions by stale accounts',
        ],
        records: [
          {
            title: 'Useful sources',
            fields: [
              { label: 'System', value: 'System journal, SSH logs, authentication logs and sudo activity.' },
              { label: 'Cloud / provider', value: 'Cloud access logs, hosting-provider access logs and provider activity history.' },
            ],
          },
        ],
      },
      {
        id: 'initial-access-paths',
        type: 'prose',
        title: 'How attackers may have gained access',
        paragraphs: [
          'Finding XMRig does not identify the initial-access method. Several paths are common enough to investigate before recovery begins.',
        ],
        records: [
          {
            title: 'Stolen or weak administrative credentials',
            fields: [
              { label: 'Review', value: 'Linux users, SSH keys, cloud IAM users and roles, hosting-provider users, VPN access, old contractor accounts and CI/CD credentials.' },
              { label: 'Why it matters', value: 'Valid credentials can make malicious activity resemble normal administration.' },
            ],
          },
          {
            title: 'Exposed SSH',
            fields: [
              { label: 'Review', value: 'Password authentication, root login, old keys, broad internet exposure, shared credentials and login records around the compromise window.' },
              { label: 'AWS note', value: 'For EC2, ask whether Session Manager could remove the need for public SSH in the first place.' },
            ],
          },
          {
            title: 'Unpatched internet-facing application',
            fields: [
              { label: 'Review', value: 'Web apps, admin interfaces, CMS installations, automation platforms, reverse proxies, development servers, dashboards and middleware.' },
              { label: 'Why it matters', value: 'Cryptomining may be the payload while the root failure is exposed vulnerable software.' },
            ],
          },
          {
            title: 'Exposed management interface',
            fields: [
              { label: 'Review', value: 'Docker daemon, database administration, orchestration dashboards, internal admin panels, debug servers and application management interfaces.' },
              { label: 'Why it matters', value: 'A management API that can create containers or execute workloads can become direct host compromise when exposed improperly.' },
            ],
          },
          {
            title: 'Leaked secrets',
            fields: [
              { label: 'Review', value: 'Public repositories, committed .env files, CI logs, screenshots, shell history, shared documents, application logs and artifact storage.' },
              { label: 'Why it matters', value: 'The environment may have accepted a credential that was valid but exposed.' },
            ],
          },
          {
            title: 'Compromised application',
            fields: [
              { label: 'Review', value: 'Application-level code execution, writeable directories, plugin ecosystems, uploaded files and application users with access to secrets.' },
              { label: 'Why it matters', value: 'Mining can run as an ordinary user. Root is not required for the incident to matter.' },
            ],
          },
          {
            title: 'Supply-chain or deployment compromise',
            fields: [
              { label: 'Review', value: 'Unexpected dependencies, untrusted images, replaced artifacts, compromised CI/CD credentials, unauthorized commits or workflow runs and unexpected base images.' },
              { label: 'Why it matters', value: 'The server may have faithfully deployed something malicious.' },
            ],
          },
        ],
      },
      {
        id: 'do-not-destroy',
        type: 'prose',
        title: 'Do not immediately destroy the host',
        paragraphs: [
          'Once compromise is suspected, there is tension between stopping ongoing harm and preserving enough evidence to understand what happened.',
          'NIST incident-response and forensic guidance emphasizes deliberate evidence collection, analysis and documentation. Simply terminating an instance can destroy volatile evidence and make root-cause analysis harder.',
          'That does not mean leaving a compromised internet-facing server happily mining cryptocurrency while everyone schedules a meeting. It means contain first, then preserve and investigate deliberately.',
        ],
        emphasis:
          'Contain first. Preserve what matters. Rebuild from trust, not from panic.',
      },
      {
        id: 'containment',
        type: 'prose',
        title: 'Contain the host',
        paragraphs: [
          'The containment objective is to prevent the suspected system from serving normal production traffic, communicating freely with the internet, reaching adjacent systems or continuing abusive activity while preserving enough evidence for investigation.',
        ],
        records: [
          {
            title: 'AWS EC2',
            fields: [
              { label: 'Containment shape', value: 'AWS GuardDuty guidance recommends isolating a potentially compromised EC2 instance with a dedicated isolation security group whose inbound and outbound access is tightly restricted.' },
              { label: 'Caution', value: 'Changing security groups affects future traffic, but existing tracked connections may not immediately terminate.' },
            ],
          },
          {
            title: 'Conventional VPS',
            fields: [
              { label: 'Containment shape', value: 'Use provider firewall rules, host firewall controls, load balancer or DNS withdrawal, and provider-level network isolation where supported.' },
              { label: 'Caution', value: 'Do not depend only on controls inside the compromised operating system when stronger provider-level controls exist.' },
            ],
          },
          {
            title: 'On-premises',
            fields: [
              { label: 'Containment shape', value: 'Use switch or VLAN changes, hypervisor networking, firewall policy, VM network disconnection or an isolated forensic network.' },
              { label: 'Caution', value: 'Avoid powering off before deciding whether volatile evidence matters.' },
            ],
          },
        ],
        diagram: {
          kind: 'flow',
          label: 'Compromised host containment path',
          items: [
            'Performance complaint',
            'XMRig discovered',
            'Host isolated',
            'Evidence preserved',
            'Initial access investigated',
            'Credentials rotated',
            'Clean rebuild',
            'Monitoring improved',
          ],
        },
      },
      {
        id: 'volatile-evidence',
        type: 'prose',
        title: 'Preserve volatile evidence when appropriate',
        paragraphs: [
          'Some evidence exists only while the machine is running. Continued system activity, log rotation or shutdown can remove useful context.',
          'Capture volatile state after or as part of containment, depending on severity and response procedures. Do not delay containment solely to gather perfect evidence while the host continues attacking other systems.',
        ],
        listTitle: 'Useful observations to record:',
        list: [
          'Current time',
          'Running processes',
          'Network connections',
          'Logged-in users',
          'Mounted filesystems',
          'Active containers',
          'Running services',
          'System load',
        ],
      },
      {
        id: 'forensic-copy',
        type: 'prose',
        title: 'Take a forensic copy before rebuilding',
        paragraphs: [
          'For a VM, preserving disk state is often straightforward. The exact process depends on the environment and incident severity.',
        ],
        records: [
          {
            title: 'AWS',
            fields: [
              { label: 'Preserve', value: 'Create snapshots of relevant EBS volumes after containment according to the incident-response process.' },
              { label: 'Record', value: 'Instance ID, volume IDs, snapshot IDs, timestamps, security groups, IAM role, AMI, instance metadata and relevant GuardDuty or CloudTrail findings.' },
            ],
          },
          {
            title: 'Conventional VPS',
            fields: [
              { label: 'Preserve', value: 'Create a provider snapshot where appropriate and export available access records, firewall logs, provider activity and console history.' },
              { label: 'Record', value: 'Document whether taking the snapshot modified meaningful state and what actions were performed.' },
            ],
          },
          {
            title: 'On-premises',
            fields: [
              { label: 'Preserve', value: 'Snapshot or clone the virtual disk through the hypervisor where appropriate.' },
              { label: 'Record', value: 'For higher-stakes incidents, use established forensic acquisition procedures instead of casually copying files from a live system.' },
            ],
          },
        ],
      },
      {
        id: 'analyze-copy',
        type: 'prose',
        title: 'Investigate a copy, not the production host',
        paragraphs: [
          'A useful rule is to preserve the original evidence and perform deeper analysis against a copy.',
          'Do not mount a suspected disk read-write on a normal administrator workstation and explore it casually. Prefer an isolated investigation environment, especially where sensitive credentials or production networks are involved.',
          'Avoid executing suspicious binaries. Static inspection is usually preferable unless dynamic analysis is intentionally performed in an appropriate sandbox.',
        ],
        diagram: {
          kind: 'flow',
          label: 'Forensic analysis path',
          items: [
            'Compromised host',
            'Preserved snapshot / image',
            'Forensic copy',
            'Isolated analysis environment',
          ],
        },
      },
      {
        id: 'investigative-record',
        type: 'prose',
        title: 'Document every investigative action',
        paragraphs: [
          'If the incident matters enough to investigate, record what was done. If legal, insurance, regulatory or law-enforcement concerns may arise, formal chain-of-custody requirements may apply.',
        ],
        codeBlocks: [
          {
            label: 'Minimum investigation log fields',
            code: `timestamp
operator
action
resource
reason
result`,
          },
          {
            label: 'Example timeline entries',
            code: `11:13  VM isolated from public network
11:17  Running process list captured
11:21  Disk snapshot created
11:28  Production credentials scheduled for rotation
11:35  Replacement instance deployment started`,
          },
        ],
      },
      {
        id: 'build-timeline',
        type: 'prose',
        title: 'Build a timeline',
        paragraphs: [
          'The investigation should correlate several sources. Do not build the entire conclusion around one timestamp from one file.',
        ],
        codeBlocks: [
          {
            label: 'Timeline questions',
            code: `When was the first suspicious activity?
What happened immediately before it?
When did XMRig start?
What account executed it?
What files appeared around that time?
Were SSH keys added?
Were services created?
Were containers created?
What external addresses were contacted?
Were cloud credentials used elsewhere?
Did the attacker move to another system?`,
          },
        ],
        listTitle: 'Evidence sources may include:',
        list: [
          'Authentication logs',
          'System journal',
          'Application logs',
          'Reverse-proxy logs',
          'Docker events and logs',
          'Filesystem timestamps',
          'Cloud audit logs',
          'Firewall and network logs',
          'CI/CD history',
          'Git history',
          'Hosting-provider activity',
          'Monitoring history',
        ],
      },
      {
        id: 'unexpected-files',
        type: 'prose',
        title: 'Check for unexpected files and changes',
        paragraphs: [
          'Look for recently modified files in areas relevant to the application and operating system.',
          'Do not delete suspicious files during evidence collection. Record metadata and preserve them as part of the investigation where appropriate.',
        ],
        listTitle: 'The objective is to identify:',
        list: [
          'Unexpected executables',
          'New scripts',
          'Changed service definitions',
          'Modified startup files',
          'New SSH keys',
          'Unfamiliar configuration',
          'Altered application artifacts',
        ],
      },
      {
        id: 'credentials-exposed',
        type: 'prose',
        title: 'Treat credentials as potentially exposed',
        paragraphs: [
          'If an attacker achieved code execution on the server, assume they may have been able to access credentials available to that execution context.',
          'Do not rotate everything blindly before evidence collection if doing so would destroy information needed for the investigation. Once appropriate evidence has been preserved, rotate credentials that may have been accessible and investigate whether any credential was used from another system.',
        ],
        listTitle: 'Potentially exposed credentials can include:',
        list: [
          '.env values',
          'Database passwords',
          'API tokens',
          'OAuth credentials',
          'GitHub tokens',
          'Cloud credentials',
          'SSH keys',
          'Application secrets',
          'Webhook secrets',
          'Session-signing keys',
        ],
      },
      {
        id: 'aws-instance-role',
        type: 'prose',
        title: 'AWS: investigate the instance role',
        paragraphs: [
          'If the compromised EC2 instance had an IAM role, determine what permissions it had, what credentials could have been obtained and what AWS API calls occurred during the incident window.',
          'The scope of the incident may extend beyond the EC2 instance. A compromised workload with broad IAM permissions can turn a Linux compromise into a cloud-account incident.',
        ],
        emphasis:
          'Review CloudTrail and other relevant AWS telemetry rather than treating the VM as an isolated object.',
      },
      {
        id: 'lateral-movement',
        type: 'prose',
        title: 'Check for lateral movement',
        paragraphs: [
          'Do not assume the incident ends at the miner. A miner may be the loudest thing the attacker installed. It does not have to be the most important thing.',
          'MITRE documents cloud-focused mining actors engaging in broader credential and persistence activity, and the CISA XMRig incident included credential compromise and lateral movement beyond the initially exploited host.',
        ],
        listTitle: 'Investigate whether the compromised host had access to:',
        list: [
          'Databases',
          'Private APIs',
          'Adjacent servers',
          'Shared storage',
          'Management networks',
          'Cloud control-plane APIs',
          'CI/CD',
          'Internal SSH',
          'Client systems',
        ],
      },
      {
        id: 'do-not-clean',
        type: 'prose',
        title: 'Do not clean a compromised production server and trust it again',
        paragraphs: [
          'Once unauthorized code execution has occurred, proving that every modification and persistence mechanism has been removed can be harder than rebuilding.',
          'For many ordinary VPS workloads, the safer recovery model is to preserve evidence, identify the likely entry point, fix the vulnerability or configuration failure, rotate exposed credentials, build a new host from known-good sources, restore validated data, redeploy, verify and monitor closely.',
        ],
        codeBlocks: [
          {
            label: 'Avoid this recovery model',
            code: `kill xmrig
rm suspicious-file
reboot
declare victory`,
          },
        ],
      },
      {
        id: 'known-good-rebuild',
        type: 'prose',
        title: 'Rebuild from known-good sources',
        paragraphs: [
          'A trustworthy rebuild should come from inputs that were not taken blindly from the compromised host.',
          'Avoid copying an entire compromised filesystem into the replacement and calling it recovery. Restore business data and intentional configuration, not unknown attacker modifications.',
        ],
        listTitle: 'Prefer:',
        list: [
          'Known-good OS image',
          'Reviewed infrastructure configuration',
          'Trusted container images',
          'Known-good application repository',
          'Validated backups',
          'Freshly issued credentials',
        ],
      },
      {
        id: 'fix-entry-path',
        type: 'prose',
        title: 'Fix the initial access path before restoring service',
        paragraphs: [
          'Do not rebuild the same vulnerable architecture. Otherwise the new instance may simply become the next miner host.',
        ],
        records: [
          {
            title: 'Examples',
            fields: [
              { label: 'SSH password authentication', value: 'Disable or restrict it according to the access model.' },
              { label: 'Internet-exposed Docker daemon', value: 'Remove the exposure and secure daemon access.' },
              { label: 'Vulnerable application version', value: 'Patch, upgrade, replace or remove the exposed component.' },
              { label: 'Leaked API or hosting credential', value: 'Rotate it and fix the leakage source.' },
              { label: 'Former contractor access', value: 'Repair the offboarding process.' },
            ],
          },
        ],
      },
      {
        id: 'validate-replacement',
        type: 'checklist',
        title: 'Validate the clean replacement',
        paragraphs: [
          'Before restoring full production traffic, compare the replacement against the intended baseline.',
        ],
        listLabel: 'Clean replacement validation checklist',
        items: [
          'Expected users',
          'Expected SSH keys',
          'Expected services',
          'Expected containers',
          'Expected listeners',
          'Expected outbound behavior',
          'Patch level',
          'Firewall rules',
          'Secrets',
          'Monitoring',
          'Backups',
          'Application health',
        ],
        closing:
          'The replacement should have an explicit answer to: what should be running here?',
      },
      {
        id: 'monitor-after-recovery',
        type: 'prose',
        title: 'Monitor more closely after recovery',
        paragraphs: [
          'After an incident, temporarily increase visibility around the affected environment. A second occurrence often means the initial access path was not actually closed.',
        ],
        listTitle: 'Watch:',
        list: [
          'CPU',
          'Load',
          'Memory',
          'Process state',
          'Containers',
          'Outbound connections',
          'Authentication',
          'Application failures',
          'Cloud or API activity',
          'Newly created users or keys',
          'Unusual spend',
        ],
      },
      {
        id: 'earlier-detection',
        type: 'prose',
        title: 'What should have detected this earlier?',
        paragraphs: [
          'After containment and recovery, ask why the client discovered the problem before the system did.',
        ],
        records: [
          {
            title: 'Useful preventive controls',
            fields: [
              { label: 'CPU and load alerts', value: 'A server that normally runs at 15% CPU should not sit at 100% for hours unnoticed.' },
              { label: 'Expected-process monitoring', value: 'Alert when unexpected long-running workloads appear.' },
              { label: 'Container inventory', value: 'Know which containers should exist.' },
              { label: 'Network visibility', value: 'Understand unusual outbound connection volume or destinations.' },
              { label: 'Authentication alerts', value: 'Watch abnormal administrative activity.' },
              { label: 'Cloud threat detection', value: 'For AWS workloads, GuardDuty can identify classes of suspicious EC2 activity and provide response guidance.' },
              { label: 'Cost anomaly detection', value: 'Unauthorized mining may surface as increased utilization, unexpected resources, unusual bandwidth or changed spend.' },
            ],
          },
        ],
      },
      {
        id: 'incident-record',
        type: 'prose',
        title: 'What a useful incident record should contain',
        paragraphs: [
          'Do not let the incident end as: server was slow, found miner, fixed. Record the incident so it becomes useful organizational knowledge instead of a strange story somebody remembers six months later.',
        ],
        codeBlocks: [
          {
            label: 'Incident record',
            code: `Incident:
Unauthorized cryptomining workload

First observed:
Date/time

Initial symptom:
Sustained CPU saturation

Affected system:
Client automation VPS

Unexpected workload:
XMRig or suspected mining process

Containment:
Host isolated

Evidence preserved:
Process/network capture
Disk snapshot
Relevant logs

Probable initial access:
[determined / unknown]

Credentials potentially exposed:
[list]

Remediation:
Replacement host deployed
Credentials rotated
Initial access path closed

Validation:
Expected workloads confirmed
Monitoring enabled

Follow-up:
[actions]`,
          },
        ],
      },
      {
        id: 'what-not-to-do',
        type: 'prose',
        title: 'What not to do',
        paragraphs: [
          'These are the traps that turn a visible symptom into an unresolved incident.',
        ],
        listTitle: 'Avoid:',
        list: [
          'Do not just kill XMRig. The execution mechanism may remain.',
          'Do not immediately terminate the instance. Important evidence may disappear.',
          'Do not leave it connected while investigating casually. A compromised host can continue causing harm.',
          'Do not trust the host because CPU returned to normal. The attacker may have stopped mining or left another persistence mechanism behind.',
          'Do not copy suspicious binaries onto a normal workstation and run them. Use an isolated analysis environment.',
          'Do not rotate one password and assume the incident is contained. Determine what the compromised workload could access.',
          'Do not rebuild before understanding enough to avoid recreating the same exposure.',
        ],
      },
      {
        id: 'response-sequence',
        type: 'prose',
        title: 'A practical response sequence',
        paragraphs: [
          'For an ordinary client VPS where unauthorized cryptomining is discovered, this sequence is a practical starting point. The exact ordering can change depending on severity, business continuity requirements and evidence needs.',
          'For a serious incident involving sensitive client data, regulatory exposure, significant financial loss or evidence that the attacker moved beyond the original host, bring in qualified incident-response professionals.',
        ],
        codeBlocks: [
          {
            label: 'Response sequence',
            code: `1. Recognize the host as potentially compromised
2. Record the incident and current time
3. Contain network access
4. Preserve useful volatile state where safe
5. Snapshot or image relevant disks
6. Preserve cloud, provider and system logs
7. Investigate a forensic copy
8. Determine likely initial access
9. Identify potentially exposed credentials
10. Check adjacent and cloud systems for related activity
11. Rotate affected credentials
12. Fix the original weakness
13. Rebuild from known-good sources
14. Restore validated data
15. Verify the intended runtime baseline
16. Return service gradually
17. Monitor for recurrence
18. Document lessons and preventive controls`,
          },
        ],
      },
      {
        id: 'loud-symptom',
        type: 'prose',
        title: 'The miner may be doing the system a favor',
        paragraphs: [
          'Cryptomining is loud. It consumes CPU, hurts performance and gets noticed.',
          'That makes it easier to discover than many forms of compromise. An unexpected XMRig process may be the server saying something more important: an unauthorized party may have gained the ability to execute code here.',
          'The right response is not to make the process disappear. It is to understand what trust was lost, then rebuild that trust deliberately.',
        ],
      },
      {
        id: 'healthy-more-than-uptime',
        type: 'prose',
        title: 'Healthy is more than uptime',
        paragraphs: [
          'A compromised server can still return HTTP 200. It can still process client requests. It can still look online.',
          'A useful runtime baseline should make unexpected processes, containers, network behavior, deployment drift and resource usage visible before the client has to report that something feels wrong.',
        ],
        emphasis:
          'The application being reachable is not the same thing as the system being healthy.',
      },
      {
        id: 'architecture-next',
        type: 'contextual-cta',
        eyebrow: 'Architecture',
        title: 'Map the affected system',
        description:
          'Pathflow Architecture can document the server, applications, network relationships, credential ownership, external services and dependencies surrounding a client deployment. During an incident, that context helps answer what else the host could reach.',
        cta: {
          label: 'Explore Pathflow Architecture',
          href: '/solutions/architecture',
          description: 'Map the systems, access paths and dependencies around a client deployment.',
        },
      },
      {
        id: 'runtime-next',
        type: 'contextual-cta',
        eyebrow: 'Runtime',
        title: 'Runtime should know what does not belong',
        description:
          'Pathflow Runtime is intended to eventually make expected workloads, expected containers, expected ports, deployment state, resource health, unexpected drift and operational events easier to define and observe.',
        cta: {
          label: 'Pathflow Runtime',
          href: '/solutions/runtime',
          available: false,
          status: 'Not public yet',
          description: 'Future runtime visibility for expected state and unexpected drift.',
        },
      },
      {
        id: 'related-resources',
        type: 'prose',
        title: 'Related resources',
        paragraphs: [
          'These related resources cover the baseline that should exist before a client VPS goes live and the handoff context that should survive after implementation.',
        ],
        relatedLinks: [
          {
            label: 'How to Secure a Client VPS Before You Deploy Anything',
            href: '/resources/secure-client-vps-before-deployment',
            description: 'Establish the access, network, patching, Docker, secrets, backup, monitoring and ownership baseline before deployment.',
          },
          {
            label: 'What to Document Before an Automation Consultant Leaves',
            href: '/resources/automation-consultant-handoff-documentation',
            description: 'Document ownership, credentials, hosting, deployments, monitoring and recovery paths before the work is handed off.',
          },
        ],
      },
      {
        id: 'sources',
        type: 'sources',
        title: 'Sources',
      },
    ],
    sources: [
      {
        label: 'Incident Response Recommendations and Considerations for Cybersecurity Risk Management',
        provider: 'NIST',
        href: 'https://csrc.nist.gov/pubs/sp/800/61/r3/final',
        description:
          'NIST SP 800-61 Rev. 3, the current NIST incident-response recommendations and considerations aligned to the Cybersecurity Framework 2.0.',
      },
      {
        label: 'Guide to Integrating Forensic Techniques into Incident Response',
        provider: 'NIST',
        href: 'https://csrc.nist.gov/pubs/sp/800/86/final',
        description:
          'NIST SP 800-86 guidance for incorporating forensic techniques, evidence handling and data-source analysis into incident response.',
      },
      {
        label: 'Remediating a potentially compromised Amazon EC2 instance',
        provider: 'AWS GuardDuty',
        href: 'https://docs.aws.amazon.com/guardduty/latest/ug/compromised-ec2.html',
        description:
          'Official GuardDuty remediation guidance for identifying, isolating and investigating potentially compromised EC2 instances.',
      },
      {
        label: 'Architecture overview',
        provider: 'AWS Automated Forensics Orchestrator',
        href: 'https://docs.aws.amazon.com/solutions/latest/automated-forensics-orchestrator-for-amazon-ec2/architecture-overview.html',
        description:
          'AWS solution guidance for forensic memory and disk acquisition workflows for EC2 and EKS environments.',
      },
      {
        label: 'Iranian Government-Sponsored APT Actors Compromise Federal Network, Deploy Crypto Miner, Credential Harvester',
        provider: 'CISA',
        href: 'https://www.cisa.gov/news-events/cybersecurity-advisories/aa22-320a',
        description:
          'CISA advisory documenting XMRig deployment after exploitation of an internet-facing VMware Horizon system, with credential compromise and lateral movement.',
      },
      {
        label: 'StopRansomware Guide',
        provider: 'CISA',
        href: 'https://www.cisa.gov/stopransomware/ransomware-guide',
        description:
          'CISA guidance that includes incident containment, system imaging, memory capture, log collection and preservation of volatile evidence.',
      },
      {
        label: 'Resource Hijacking: Compute Hijacking',
        provider: 'MITRE ATT&CK',
        href: 'https://attack.mitre.org/techniques/T1496/001/',
        description:
          'MITRE ATT&CK sub-technique T1496.001 describing adversary use of compute resources for cryptocurrency mining and related activity.',
      },
      {
        label: 'TeamTNT',
        provider: 'MITRE ATT&CK',
        href: 'https://attack.mitre.org/groups/G0139/',
        description:
          'MITRE ATT&CK group profile describing TeamTNT activity in cloud and container environments, including cryptocurrency mining, credential access and persistence.',
      },
      {
        label: 'xmrig/xmrig',
        provider: 'XMRig',
        href: 'https://github.com/xmrig/xmrig',
        description:
          'Official XMRig repository describing the project as an open-source cross-platform cryptocurrency miner and benchmark.',
      },
      {
        label: 'AWS Systems Manager Session Manager',
        provider: 'AWS',
        href: 'https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html',
        description:
          'Official AWS documentation for Session Manager, including identity-based administration without opening inbound SSH ports.',
      },
      {
        label: 'Configure remote access for Docker daemon',
        provider: 'Docker',
        href: 'https://docs.docker.com/engine/daemon/remote-access/',
        description:
          'Official Docker documentation warning about the security implications of opening Docker daemon access to the network.',
      },
    ],
  },
];

export const resourceTypeLabels = {
  guide: 'Guide',
  pattern: 'Pattern',
  'field-note': 'Field Note',
};

export const resourceTypeDescriptions = {
  guide:
    'Deep practical guides for building and delivering systems that someone else can actually maintain.',
  pattern:
    'Reusable architecture and delivery approaches for common client-system problems.',
  'field-note':
    'Short operational lessons for when systems break, drift or start behaving strangely.',
};

const resourceTypeOrder = ['guide', 'pattern', 'field-note'];
const preferredTopicOrder = [
  'Infrastructure',
  'Automation',
  'Security',
  'DevOps',
  'Agents',
  'Delivery',
  'Cloud',
  'Web',
  'CRM',
  'Operations',
];

function topicSlug(topic) {
  return topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function resourceTypeSlug(type) {
  return type;
}

function compareResources(a, b) {
  const dateDelta = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  if (dateDelta !== 0) return dateDelta;
  return b.sourceOrder - a.sourceOrder;
}

function toResourceIndexItem(article) {
  return {
    ...article,
    typeLabel: resourceTypeLabels[article.type] || 'Resource',
    typeSlug: resourceTypeSlug(article.type),
    topicSlugs: article.topics.map(topicSlug),
    description: article.dek || article.description,
  };
}

export const publishedResourceArticles = resourceArticles
  .map((article, sourceOrder) => ({ ...article, sourceOrder }))
  .filter((article) => article.status === 'published')
  .sort(compareResources);

export const resourceArticlesByPath = Object.fromEntries(
  publishedResourceArticles.map((article) => [article.path, article]),
);

export const resourceIndexItems = publishedResourceArticles.map(toResourceIndexItem);

export const latestResourceIndexItems = resourceIndexItems.slice(0, 3);

export const resourceArticleNavItems = latestResourceIndexItems.map((article) => ({
  label: article.shortTitle,
  href: article.path,
  description: article.description,
  directional: false,
}));

export const resourceNavItems = [
  { type: 'heading', label: 'Latest' },
  ...resourceArticleNavItems,
  { type: 'separator' },
  {
    label: 'View all resources',
    href: '/resources',
    description: 'Open the full field manual.',
    directional: true,
  },
];

export const resourceSections = resourceTypeOrder
  .map((type) => ({
    type,
    typeLabel: resourceTypeLabels[type],
    title: resourceTypeLabels[type] === 'Guide' ? 'Guides' : `${resourceTypeLabels[type]}s`,
    description: resourceTypeDescriptions[type],
    items: resourceIndexItems.filter((article) => article.type === type),
  }))
  .filter((section) => section.items.length > 0);

export const resourceTypeFilters = [
  {
    label: 'All',
    value: '',
    href: '/resources',
    count: resourceIndexItems.length,
  },
  ...resourceTypeOrder
    .map((type) => ({
      label: resourceTypeLabels[type],
      value: type,
      href: `/resources?type=${encodeURIComponent(type)}`,
      count: resourceIndexItems.filter((article) => article.type === type).length,
    }))
    .filter((filter) => filter.count > 0),
];

export const resourceTopicItems = Object.values(
  resourceIndexItems.reduce((topics, article) => {
    article.topics.forEach((topic) => {
      const slug = topicSlug(topic);
      topics[slug] ||= {
        label: topic,
        slug,
        href: `/resources?topic=${encodeURIComponent(slug)}`,
        count: 0,
      };
      topics[slug].count += 1;
    });
    return topics;
  }, {}),
).sort((a, b) => {
  const aIndex = preferredTopicOrder.indexOf(a.label);
  const bIndex = preferredTopicOrder.indexOf(b.label);
  if (aIndex !== -1 || bIndex !== -1) {
    return (aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex) - (bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex);
  }
  return a.label.localeCompare(b.label);
});
