import DocsLayout from '@/components/DocsLayout'
import CodeBlock from '@/components/CodeBlock'
import Callout from '@/components/Callout'

export const metadata = { title: 'Team Management' }

export default function TeamsPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">Workspaces & Teams</span>
        <h1>Team Management</h1>
        <p>Manage employees and clients from the admin panel. Only <code>super_admin</code> and <code>admin</code> roles have access.</p>

        <h2>Roles</h2>
        <table>
          <thead><tr><th>Role</th><th>Permissions</th></tr></thead>
          <tbody>
            <tr><td><code>super_admin</code></td><td>Full access — all workspaces, admin panel, system updates, impersonation</td></tr>
            <tr><td><code>admin</code></td><td>Admin panel, all workspaces, employee/client management</td></tr>
            <tr><td><code>employee</code></td><td>Only assigned workspaces — campaigns, leads, mailboxes, threads</td></tr>
            <tr><td><code>client</code></td><td>Read-only access to their own workspace</td></tr>
          </tbody>
        </table>

        <h2>Adding an Employee</h2>
        <CodeBlock language="bash" code={`curl -X POST https://YOUR_SERVER/api/v1/admin/employees \\
  -H "Content-Type: application/json" \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN" \\
  -d '{"name": "John Smith", "email": "john@company.com", "password": "securepass123"}'`} />

        <h2>Onboarding a Client</h2>
        <CodeBlock language="bash" code={`curl -X POST https://YOUR_SERVER/api/v1/admin/clients \\
  -H "Content-Type: application/json" \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN" \\
  -d '{"name": "Client Corp", "company": "Client Corp", "email": "owner@clientcorp.com", "phone": "+1234567890"}'`} />
        <p>This creates a new workspace for the client and gives them <code>client</code> role access.</p>

        <h2>Assigning Employees to Workspaces</h2>
        <CodeBlock language="bash" code={`# Create assignment
curl -X POST https://YOUR_SERVER/api/v1/admin/assignments \\
  -H "Content-Type: application/json" \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN" \\
  -d '{"user_id": "EMPLOYEE_UUID", "workspace_id": "WORKSPACE_UUID"}'

# Remove assignment
curl -X DELETE https://YOUR_SERVER/api/v1/admin/assignments/ASSIGNMENT_ID \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN"`} />

        <Callout type="info" title="Multiple assignments">
          <p>An employee can be assigned to multiple workspaces. They&apos;ll see a workspace switcher in the dashboard showing only their assigned workspaces.</p>
        </Callout>

        <h2>Impersonation (super_admin only)</h2>
        <p>Super admins can log in as any user to debug issues or manage their workspace:</p>
        <CodeBlock language="bash" code={`curl -X POST https://YOUR_SERVER/api/v1/admin/impersonate/USER_UUID \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN"`} />
        <p>Returns a new JWT token for the target user&apos;s session.</p>

        <h2>Admin Panel API</h2>
        <table>
          <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>GET</td><td><code>/api/v1/admin/dashboard</code></td><td>Aggregate stats</td></tr>
            <tr><td>GET</td><td><code>/api/v1/admin/employees</code></td><td>List employees</td></tr>
            <tr><td>POST</td><td><code>/api/v1/admin/employees</code></td><td>Create employee</td></tr>
            <tr><td>DELETE</td><td><code>/api/v1/admin/employees/:id</code></td><td>Delete employee</td></tr>
            <tr><td>GET</td><td><code>/api/v1/admin/clients</code></td><td>List clients</td></tr>
            <tr><td>POST</td><td><code>/api/v1/admin/clients</code></td><td>Onboard client</td></tr>
            <tr><td>DELETE</td><td><code>/api/v1/admin/clients/:wid</code></td><td>Delete client</td></tr>
            <tr><td>GET</td><td><code>/api/v1/admin/assignments</code></td><td>List assignments</td></tr>
            <tr><td>POST</td><td><code>/api/v1/admin/assignments</code></td><td>Create assignment</td></tr>
            <tr><td>DELETE</td><td><code>/api/v1/admin/assignments/:id</code></td><td>Delete assignment</td></tr>
            <tr><td>POST</td><td><code>/api/v1/admin/impersonate/:uid</code></td><td>Impersonate user</td></tr>
          </tbody>
        </table>
      </div>
    </DocsLayout>
  )
}
