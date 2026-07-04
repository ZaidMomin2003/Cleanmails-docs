import DocsLayout from '@/components/DocsLayout'
import Callout from '@/components/Callout'
import CodeBlock from '@/components/CodeBlock'

export const metadata = { title: 'Workspaces' }

export default function WorkspacesPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">
          Workspaces & Teams
        </span>
        <h1>Workspaces</h1>
        <p>Workspaces provide isolated environments for managing multiple clients or projects. Each workspace has its own campaigns, leads, mailboxes, threads, settings, and analytics — completely separated at the database level.</p>

        <h2>How Workspaces Work</h2>
        <ul>
          <li>A default workspace is auto-created when the first user registers</li>
          <li>All data (campaigns, leads, mailboxes, threads, webhooks, integrations) is scoped by workspace</li>
          <li>API endpoints use the pattern <code>/api/v1/workspaces/:wid/...</code></li>
          <li>The workspace ID is validated on every request via middleware</li>
        </ul>

        <h2>Roles</h2>
        <table>
          <thead><tr><th>Role</th><th>Workspace Access</th><th>Admin Panel</th></tr></thead>
          <tbody>
            <tr><td><code>super_admin</code></td><td>All workspaces</td><td>Full access + system updates + impersonation</td></tr>
            <tr><td><code>admin</code></td><td>All workspaces</td><td>Employees, clients, assignments</td></tr>
            <tr><td><code>employee</code></td><td>Assigned workspaces only</td><td>No access</td></tr>
            <tr><td><code>client</code></td><td>Own workspace only</td><td>No access</td></tr>
          </tbody>
        </table>
        <p>The first user to register automatically becomes <code>super_admin</code>.</p>

        <h2>Creating a Workspace</h2>
        <CodeBlock language="bash" code={`curl -X POST https://YOUR_SERVER/api/v1/workspaces \\
  -H "Content-Type: application/json" \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN" \\
  -d '{"name": "Client Corp", "slug": "client-corp"}'`} />

        <h2>Workspace Scoping in API</h2>
        <p>All workspace-scoped endpoints require the workspace ID in the URL:</p>
        <CodeBlock language="bash" code={`# List campaigns in workspace 1
GET /api/v1/workspaces/1/campaigns

# Create a lead in workspace 1
POST /api/v1/workspaces/1/leads/upload

# Get workspace stats
GET /api/v1/workspaces/1/stats`} />

        <h2>Admin Panel</h2>
        <p>Users with <code>super_admin</code> or <code>admin</code> role access the admin panel:</p>
        <ul>
          <li><strong>Dashboard</strong> — Aggregate stats (employee count, client count)</li>
          <li><strong>Employees</strong> — Create/delete employees (name, email, password)</li>
          <li><strong>Clients</strong> — Onboard clients (creates a workspace for them)</li>
          <li><strong>Assignments</strong> — Assign employees to client workspaces</li>
          <li><strong>Impersonate</strong> — Log in as any user (super_admin only)</li>
        </ul>

        <h2>Employee Management</h2>
        <CodeBlock language="bash" code={`# Create an employee
curl -X POST https://YOUR_SERVER/api/v1/admin/employees \\
  -H "Content-Type: application/json" \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN" \\
  -d '{"name": "John Doe", "email": "john@company.com", "password": "securepass"}'

# Assign employee to a workspace
curl -X POST https://YOUR_SERVER/api/v1/admin/assignments \\
  -H "Content-Type: application/json" \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN" \\
  -d '{"user_id": "USER_UUID", "workspace_id": "WORKSPACE_UUID"}'`} />

        <Callout type="info" title="Workspace switcher">
          <p>Employees see a workspace switcher in the dashboard sidebar showing only their assigned workspaces. Admins see all workspaces.</p>
        </Callout>

        <h2>Public Report</h2>
        <p>Each workspace can generate a shareable public report page (no auth required). The report shows campaign stats and is accessible via a unique slug:</p>
        <CodeBlock language="text" code={`https://YOUR_SERVER/report/WORKSPACE_SLUG`} />
        <p>The report auto-refreshes every 60 seconds and shows: hero stats, campaign performance table, lead lists with progress bars.</p>

        <h2>API Endpoints</h2>
        <table>
          <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>GET</td><td><code>/api/v1/workspaces</code></td><td>List workspaces (filtered by role)</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces</code></td><td>Create workspace</td></tr>
            <tr><td>GET</td><td><code>/api/v1/workspaces/:wid</code></td><td>Get workspace details</td></tr>
            <tr><td>GET</td><td><code>/api/v1/workspaces/:wid/stats</code></td><td>Get workspace statistics</td></tr>
          </tbody>
        </table>
      </div>
    </DocsLayout>
  )
}
