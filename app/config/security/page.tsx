import DocsLayout from '@/components/DocsLayout'
import Callout from '@/components/Callout'

export const metadata = { title: 'Security' }

export default function SecurityPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">Configuration</span>
        <h1>Security</h1>
        <p>Cold mail implements multiple layers of security to protect your data and infrastructure.</p>

        <h2>Encryption</h2>
        <ul>
          <li><strong>Credentials at rest:</strong> All SMTP/IMAP passwords, integration tokens, and API keys are encrypted with AES-256-GCM using your <code>ENCRYPTION_KEY</code> (64-char hex = 32 bytes)</li>
          <li><strong>User passwords:</strong> Hashed with bcrypt</li>
          <li><strong>API keys:</strong> Hashed with bcrypt before storage; only the <code>cm_live_</code> prefix is displayed in the UI</li>
          <li><strong>JWT tokens:</strong> Signed with <code>JWT_SECRET</code> (HMAC), 7-day expiry</li>
        </ul>

        <Callout type="warning" title="Never lose your ENCRYPTION_KEY">
          <p>If you lose the ENCRYPTION_KEY, all stored SMTP passwords, IMAP credentials, and integration tokens become unrecoverable. Back up your <code>.env</code> file separately.</p>
        </Callout>

        <h2>Authentication</h2>
        <ul>
          <li><strong>JWT-based auth:</strong> Login returns a JWT token set as an HttpOnly cookie (<code>auth_token</code>)</li>
          <li><strong>API key fallback:</strong> Endpoints also accept <code>Authorization: Bearer cm_live_xxx</code> for programmatic access</li>
          <li><strong>Workspace access middleware:</strong> Every workspace-scoped request validates the user has access to that workspace</li>
          <li><strong>Role-based access:</strong> Admin endpoints require <code>super_admin</code> or <code>admin</code> role</li>
        </ul>

        <h2>Rate Limiting</h2>
        <table>
          <thead><tr><th>Scope</th><th>Limit</th><th>Window</th></tr></thead>
          <tbody>
            <tr><td>Login / Register (per IP)</td><td>5 requests</td><td>1 minute</td></tr>
            <tr><td>Authenticated endpoints (per user)</td><td>60 requests</td><td>1 minute</td></tr>
          </tbody>
        </table>

        <h2>HTTP Security Headers</h2>
        <p>The security headers middleware adds to every response:</p>
        <ul>
          <li><code>X-Content-Type-Options: nosniff</code></li>
          <li><code>X-Frame-Options: DENY</code></li>
          <li><code>Strict-Transport-Security: max-age=31536000</code> (via Caddy)</li>
        </ul>

        <h2>CORS</h2>
        <p>CORS is restricted to origins defined in the <code>ALLOWED_ORIGINS</code> environment variable (comma-separated). In production, this should only contain your domain (e.g., <code>https://app.yourdomain.com</code>).</p>

        <h2>License Guard</h2>
        <p>A middleware checks license status on every request. If the license is revoked, all API routes are blocked with a 403 response — protecting against unauthorized usage after license expiration.</p>

        <h2>Input Validation</h2>
        <ul>
          <li><strong>Request body limit:</strong> 10 MB max (<code>MaxMultipartMemory</code>)</li>
          <li><strong>Binding validation:</strong> Gin struct binding with required field annotations</li>
          <li><strong>UUID parsing:</strong> All resource IDs are validated as UUIDs</li>
          <li><strong>Workspace isolation:</strong> Queries always filter by workspace_id at the database layer</li>
        </ul>

        <h2>Webhook Security</h2>
        <ul>
          <li><strong>Outgoing webhooks:</strong> Signed with HMAC-SHA256 using per-subscription secrets</li>
          <li><strong>Incoming webhooks (SES/Resend):</strong> Public endpoints for bounce/complaint processing</li>
          <li><strong>Unsubscribe links:</strong> HMAC-signed tokens prevent enumeration attacks</li>
          <li><strong>Tracking links:</strong> Unique per-delivery tracking IDs</li>
        </ul>

        <h2>Data Isolation</h2>
        <ul>
          <li>All data queries are scoped by <code>workspace_id</code> — enforced by middleware</li>
          <li>Employees only see assigned workspaces (controlled via admin assignments)</li>
          <li>Clients only see their own workspace</li>
          <li>Campaign start validates step count and mailbox assignment</li>
          <li>Lead deduplication enforced by database unique index per workspace</li>
        </ul>

        <h2>Infrastructure Security</h2>
        <ul>
          <li><strong>.env file:</strong> Set to mode 640 (readable by root and docker group only)</li>
          <li><strong>Docker socket:</strong> Mounted read-only for self-update capability</li>
          <li><strong>No exposed ports:</strong> Only Caddy exposes 80/443; all services communicate internally</li>
          <li><strong>Health checks:</strong> Internal only (not exposed through Caddy except <code>/health</code>)</li>
          <li><strong>Redis:</strong> No authentication required (only accessible within Docker network)</li>
          <li><strong>PostgreSQL:</strong> Password-protected, only accessible within Docker network</li>
        </ul>

        <h2>Roles & Permissions</h2>
        <table>
          <thead><tr><th>Role</th><th>Access</th></tr></thead>
          <tbody>
            <tr><td><code>super_admin</code></td><td>Everything + system updates + impersonation</td></tr>
            <tr><td><code>admin</code></td><td>Admin panel + all workspaces + employee/client management</td></tr>
            <tr><td><code>employee</code></td><td>Only assigned workspaces (campaigns, leads, mailboxes, threads)</td></tr>
            <tr><td><code>client</code></td><td>Read-only view of their workspace</td></tr>
          </tbody>
        </table>
      </div>
    </DocsLayout>
  )
}
