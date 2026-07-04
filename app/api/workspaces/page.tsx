import DocsLayout from '@/components/DocsLayout'
import CodeBlock from '@/components/CodeBlock'

export const metadata = { title: 'Workspace & Admin API Endpoints' }

export default function WorkspaceAPIPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">API Reference</span>
        <h1>Workspace & Admin Endpoints</h1>
        <p>API endpoints for managing workspaces, the admin panel, and system operations.</p>

        <h2>Workspaces</h2>
        <table>
          <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>GET</td><td><code>/api/v1/workspaces</code></td><td>List all workspaces (scoped by role)</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces</code></td><td>Create workspace</td></tr>
            <tr><td>GET</td><td><code>/api/v1/workspaces/:wid</code></td><td>Get workspace details</td></tr>
            <tr><td>GET</td><td><code>/api/v1/workspaces/:wid/stats</code></td><td>Get workspace statistics</td></tr>
          </tbody>
        </table>

        <h2>Setup / Onboarding (Public)</h2>
        <p>These endpoints are used during initial setup before any user exists:</p>
        <table>
          <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>GET</td><td><code>/api/v1/setup/status</code></td><td>Check if setup is complete</td></tr>
            <tr><td>GET</td><td><code>/api/v1/setup/branding</code></td><td>Get branding settings</td></tr>
            <tr><td>POST</td><td><code>/api/v1/setup/verify-license</code></td><td>Verify license key</td></tr>
            <tr><td>POST</td><td><code>/api/v1/setup/branding</code></td><td>Save branding (logo, name)</td></tr>
            <tr><td>POST</td><td><code>/api/v1/setup/complete</code></td><td>Complete onboarding (creates admin)</td></tr>
          </tbody>
        </table>

        <h2>Admin Panel (super_admin / admin only)</h2>
        <table>
          <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>GET</td><td><code>/api/v1/admin/dashboard</code></td><td>Admin dashboard stats</td></tr>
            <tr><td>GET</td><td><code>/api/v1/admin/employees</code></td><td>List all employees</td></tr>
            <tr><td>POST</td><td><code>/api/v1/admin/employees</code></td><td>Create employee</td></tr>
            <tr><td>DELETE</td><td><code>/api/v1/admin/employees/:id</code></td><td>Delete employee</td></tr>
            <tr><td>GET</td><td><code>/api/v1/admin/clients</code></td><td>List all clients</td></tr>
            <tr><td>POST</td><td><code>/api/v1/admin/clients</code></td><td>Create (onboard) a client</td></tr>
            <tr><td>DELETE</td><td><code>/api/v1/admin/clients/:wid</code></td><td>Delete client</td></tr>
            <tr><td>GET</td><td><code>/api/v1/admin/assignments</code></td><td>List employee-client assignments</td></tr>
            <tr><td>POST</td><td><code>/api/v1/admin/assignments</code></td><td>Create assignment</td></tr>
            <tr><td>DELETE</td><td><code>/api/v1/admin/assignments/:id</code></td><td>Delete assignment</td></tr>
            <tr><td>POST</td><td><code>/api/v1/admin/impersonate/:uid</code></td><td>Impersonate a user</td></tr>
          </tbody>
        </table>

        <h2>System Updates (super_admin only)</h2>
        <table>
          <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>GET</td><td><code>/api/v1/admin/system/check-update</code></td><td>Check for available updates</td></tr>
            <tr><td>POST</td><td><code>/api/v1/admin/system/update</code></td><td>Trigger self-update</td></tr>
            <tr><td>GET</td><td><code>/api/v1/admin/system/version</code></td><td>Get current version</td></tr>
          </tbody>
        </table>

        <h2>MCP (Model Context Protocol)</h2>
        <table>
          <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>POST</td><td><code>/api/v1/mcp</code></td><td>MCP JSON-RPC endpoint (authenticated)</td></tr>
          </tbody>
        </table>

        <h2>Public Report</h2>
        <table>
          <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>GET</td><td><code>/api/v1/report/:slug/stats</code></td><td>Public report statistics (no auth)</td></tr>
            <tr><td>GET</td><td><code>/api/v1/report/:slug/campaigns</code></td><td>Public report campaigns (no auth)</td></tr>
          </tbody>
        </table>

        <h2>Example: Create Workspace</h2>
        <CodeBlock language="bash" code={`curl -X POST https://YOUR_SERVER/api/v1/workspaces \\
  -H "Content-Type: application/json" \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN" \\
  -d '{"name": "Client Corp", "slug": "client-corp"}'`} />

        <h2>Example: Create Employee</h2>
        <CodeBlock language="bash" code={`curl -X POST https://YOUR_SERVER/api/v1/admin/employees \\
  -H "Content-Type: application/json" \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN" \\
  -d '{"name": "John Doe", "email": "john@company.com", "password": "securepass123"}'`} />
      </div>
    </DocsLayout>
  )
}
