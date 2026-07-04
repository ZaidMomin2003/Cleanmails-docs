import DocsLayout from '@/components/DocsLayout'
import CodeBlock from '@/components/CodeBlock'
import Callout from '@/components/Callout'

export const metadata = { title: 'API Authentication' }

export default function APIAuthPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">API Reference</span>
        <h1>Authentication</h1>
        <p>All API endpoints (except public tracking/unsubscribe URLs, webhooks, and reports) require authentication via JWT token or API key.</p>

        <h2>Login</h2>
        <CodeBlock language="bash" code={`curl -X POST https://YOUR_SERVER/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"username": "admin@company.com", "password": "yourpassword"}'`} />
        <p>Response sets an <code>auth_token</code> HttpOnly cookie (7-day expiry). The JWT token is used for subsequent requests.</p>

        <h2>Register</h2>
        <CodeBlock language="bash" code={`curl -X POST https://YOUR_SERVER/api/v1/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Admin User", "email": "admin@company.com", "password": "yourpassword"}'`} />
        <p>The first registered user automatically becomes <code>super_admin</code>. A default workspace is created on registration.</p>

        <h2>Using the Token</h2>
        <p>Two methods:</p>

        <h3>Cookie (browser/curl)</h3>
        <CodeBlock language="bash" code={`curl https://YOUR_SERVER/api/v1/workspaces \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN"`} />

        <h3>API Key (programmatic access)</h3>
        <CodeBlock language="bash" code={`curl https://YOUR_SERVER/api/v1/workspaces \\
  -H "Authorization: Bearer cm_live_YOUR_API_KEY"`} />
        <p>API keys use the <code>cm_live_</code> prefix and are hashed with bcrypt before storage. Generate them from Settings → API &amp; MCP.</p>

        <h2>Check Current User</h2>
        <CodeBlock language="bash" code={`curl https://YOUR_SERVER/api/v1/auth/me \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN"`} />

        <h2>Workspace Scoping</h2>
        <p>Most API endpoints are scoped to a workspace. Include the workspace ID in the URL path:</p>
        <CodeBlock language="bash" code={`# All workspace-scoped endpoints follow this pattern:
curl https://YOUR_SERVER/api/v1/workspaces/:workspace_id/campaigns \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN"

# Example: List campaigns in workspace 1
curl https://YOUR_SERVER/api/v1/workspaces/1/campaigns \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN"`} />

        <h2>Roles</h2>
        <table>
          <thead>
            <tr><th>Role</th><th>Access</th></tr>
          </thead>
          <tbody>
            <tr><td><code>super_admin</code></td><td>Full access to all workspaces, admin panel, system updates</td></tr>
            <tr><td><code>admin</code></td><td>Admin panel access, manage employees and clients</td></tr>
            <tr><td><code>employee</code></td><td>Access only assigned workspaces</td></tr>
            <tr><td><code>client</code></td><td>Limited access to their own workspace</td></tr>
          </tbody>
        </table>

        <Callout type="warning" title="Rate limiting">
          <p>Login/register attempts are rate-limited to <strong>5 requests per IP per minute</strong>. Authenticated endpoints are limited to <strong>60 requests per user per minute</strong>.</p>
        </Callout>

        <h2>Session Management</h2>
        <ul>
          <li>JWT tokens expire after 7 days</li>
          <li>API keys do not expire (revoke manually from the dashboard)</li>
          <li>Workspace access is enforced via middleware on every request</li>
          <li>Admin endpoints require <code>super_admin</code> or <code>admin</code> role</li>
        </ul>

        <h2>Public Endpoints (No Auth Required)</h2>
        <table>
          <thead>
            <tr><th>Endpoint</th><th>Purpose</th></tr>
          </thead>
          <tbody>
            <tr><td><code>GET /health</code></td><td>System health check</td></tr>
            <tr><td><code>POST /api/v1/auth/login</code></td><td>User login</td></tr>
            <tr><td><code>POST /api/v1/auth/register</code></td><td>User registration</td></tr>
            <tr><td><code>GET /api/v1/setup/status</code></td><td>Onboarding status check</td></tr>
            <tr><td><code>POST /api/v1/webhooks/ses</code></td><td>AWS SES bounce/complaint webhook</td></tr>
            <tr><td><code>POST /api/v1/webhooks/resend</code></td><td>Resend webhook</td></tr>
            <tr><td><code>GET /api/v1/report/:slug/*</code></td><td>Public campaign report</td></tr>
            <tr><td><code>GET /t/:id/pixel.png</code></td><td>Open tracking pixel</td></tr>
            <tr><td><code>GET /t/:id/link/*</code></td><td>Click tracking redirect</td></tr>
            <tr><td><code>GET /unsubscribe/:token</code></td><td>Unsubscribe page</td></tr>
          </tbody>
        </table>
      </div>
    </DocsLayout>
  )
}
