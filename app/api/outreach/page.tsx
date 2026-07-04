import DocsLayout from '@/components/DocsLayout'
import CodeBlock from '@/components/CodeBlock'
import Callout from '@/components/Callout'

export const metadata = { title: 'Outreach API Endpoints' }

export default function OutreachAPIPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">API Reference</span>
        <h1>Outreach Endpoints</h1>
        <p>API endpoints for managing campaigns, leads, mailboxes, threads, and settings. All require authentication and are scoped to a workspace.</p>

        <Callout type="info" title="URL Pattern">
          <p>All workspace-scoped endpoints use the pattern: <code>/api/v1/workspaces/:wid/...</code> where <code>:wid</code> is your workspace ID.</p>
        </Callout>

        <h2>Campaigns</h2>
        <table>
          <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>GET</td><td><code>/api/v1/workspaces/:wid/campaigns</code></td><td>List all campaigns</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/campaigns</code></td><td>Create a campaign</td></tr>
            <tr><td>GET</td><td><code>/api/v1/workspaces/:wid/campaigns/:id</code></td><td>Get campaign details</td></tr>
            <tr><td>PUT</td><td><code>/api/v1/workspaces/:wid/campaigns/:id</code></td><td>Update campaign</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/campaigns/:id/start</code></td><td>Start a campaign</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/campaigns/:id/pause</code></td><td>Pause a campaign</td></tr>
            <tr><td>DELETE</td><td><code>/api/v1/workspaces/:wid/campaigns/:id</code></td><td>Delete campaign and steps</td></tr>
          </tbody>
        </table>

        <h3>Campaign Steps</h3>
        <table>
          <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/campaigns/:id/steps</code></td><td>Create a step</td></tr>
            <tr><td>PUT</td><td><code>/api/v1/workspaces/:wid/campaigns/:id/steps/:stepId</code></td><td>Update a step</td></tr>
            <tr><td>DELETE</td><td><code>/api/v1/workspaces/:wid/campaigns/:id/steps/:stepId</code></td><td>Delete a step</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/campaigns/:id/steps/reorder</code></td><td>Reorder steps</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/campaigns/:id/mailboxes</code></td><td>Assign mailboxes to campaign</td></tr>
          </tbody>
        </table>

        <h2>Leads</h2>
        <table>
          <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>GET</td><td><code>/api/v1/workspaces/:wid/leads</code></td><td>List all leads (paginated)</td></tr>
            <tr><td>GET</td><td><code>/api/v1/workspaces/:wid/leads/:id</code></td><td>Get lead details</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/leads/upload</code></td><td>Upload CSV lead list</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/leads/validate</code></td><td>Start list validation</td></tr>
            <tr><td>PUT</td><td><code>/api/v1/workspaces/:wid/leads/:id</code></td><td>Update a lead</td></tr>
            <tr><td>DELETE</td><td><code>/api/v1/workspaces/:wid/leads/:id</code></td><td>Delete a lead</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/leads/add-to-campaign</code></td><td>Add leads to a campaign</td></tr>
          </tbody>
        </table>

        <h2>Mailboxes</h2>
        <table>
          <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>GET</td><td><code>/api/v1/workspaces/:wid/mailboxes</code></td><td>List all mailboxes</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/mailboxes</code></td><td>Create mailbox</td></tr>
            <tr><td>PUT</td><td><code>/api/v1/workspaces/:wid/mailboxes/:id</code></td><td>Update mailbox</td></tr>
            <tr><td>DELETE</td><td><code>/api/v1/workspaces/:wid/mailboxes/:id</code></td><td>Delete mailbox</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/mailboxes/:id/test</code></td><td>Test existing connection</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/mailboxes/test</code></td><td>Test new connection</td></tr>
            <tr><td>GET</td><td><code>/api/v1/workspaces/:wid/mailboxes/:id/health</code></td><td>Get mailbox health</td></tr>
            <tr><td>GET</td><td><code>/api/v1/workspaces/:wid/mailboxes/health</code></td><td>Get all mailbox health</td></tr>
          </tbody>
        </table>

        <h2>Unified Inbox (Threads)</h2>
        <table>
          <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>GET</td><td><code>/api/v1/workspaces/:wid/threads</code></td><td>List threads</td></tr>
            <tr><td>GET</td><td><code>/api/v1/workspaces/:wid/threads/:id</code></td><td>Get thread messages</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/threads/:id/reply</code></td><td>Reply to a thread</td></tr>
            <tr><td>PUT</td><td><code>/api/v1/workspaces/:wid/threads/:id/status</code></td><td>Update thread status</td></tr>
          </tbody>
        </table>

        <h2>Warmup</h2>
        <table>
          <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>GET</td><td><code>/api/v1/workspaces/:wid/warmup</code></td><td>List warmup status for all mailboxes</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/warmup/:mailboxId/start</code></td><td>Start warmup for a mailbox</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/warmup/:mailboxId/pause</code></td><td>Pause warmup</td></tr>
            <tr><td>DELETE</td><td><code>/api/v1/workspaces/:wid/warmup/:mailboxId</code></td><td>Remove from warmup</td></tr>
          </tbody>
        </table>

        <h2>Settings</h2>
        <table>
          <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>GET</td><td><code>/api/v1/workspaces/:wid/settings</code></td><td>Get workspace settings</td></tr>
            <tr><td>PUT</td><td><code>/api/v1/workspaces/:wid/settings</code></td><td>Update settings</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/settings/test-ai</code></td><td>Test AI connection</td></tr>
            <tr><td>PUT</td><td><code>/api/v1/workspaces/:wid/settings/tracking-domain</code></td><td>Set tracking domain</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/settings/verify-dns</code></td><td>Verify DNS records</td></tr>
          </tbody>
        </table>

        <h2>Webhooks</h2>
        <table>
          <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>GET</td><td><code>/api/v1/workspaces/:wid/webhooks</code></td><td>List webhook subscriptions</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/webhooks</code></td><td>Create webhook</td></tr>
            <tr><td>PUT</td><td><code>/api/v1/workspaces/:wid/webhooks/:id</code></td><td>Update webhook</td></tr>
            <tr><td>DELETE</td><td><code>/api/v1/workspaces/:wid/webhooks/:id</code></td><td>Delete webhook</td></tr>
            <tr><td>GET</td><td><code>/api/v1/workspaces/:wid/webhooks/:id/logs</code></td><td>Get delivery logs</td></tr>
          </tbody>
        </table>

        <h2>Integrations</h2>
        <table>
          <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>GET</td><td><code>/api/v1/workspaces/:wid/integrations</code></td><td>List integrations</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/integrations/:provider/connect</code></td><td>Connect integration</td></tr>
            <tr><td>DELETE</td><td><code>/api/v1/workspaces/:wid/integrations/:provider</code></td><td>Disconnect integration</td></tr>
          </tbody>
        </table>

        <h2>AI</h2>
        <table>
          <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/ai/enhance</code></td><td>AI email rewrite/enhance</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/ai/spam-check</code></td><td>Check email for spam words</td></tr>
          </tbody>
        </table>

        <h2>API Keys</h2>
        <table>
          <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>GET</td><td><code>/api/v1/workspaces/:wid/api-keys</code></td><td>List API keys</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/api-keys</code></td><td>Create API key</td></tr>
            <tr><td>DELETE</td><td><code>/api/v1/workspaces/:wid/api-keys/:id</code></td><td>Revoke API key</td></tr>
          </tbody>
        </table>

        <h2>Example: Create Campaign</h2>
        <CodeBlock language="bash" code={`curl -X POST https://YOUR_SERVER/api/v1/workspaces/1/campaigns \\
  -H "Content-Type: application/json" \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN" \\
  -d '{
    "name": "Q2 Outreach",
    "status": "draft",
    "check_reply": true,
    "track_opens": true,
    "track_clicks": true
  }'`} />

        <h2>Example: Upload Leads CSV</h2>
        <CodeBlock language="bash" code={`curl -X POST https://YOUR_SERVER/api/v1/workspaces/1/leads/upload \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN" \\
  -F "file=@leads.csv"`} />

        <h2>Example: Test Mailbox Connection</h2>
        <CodeBlock language="bash" code={`curl -X POST https://YOUR_SERVER/api/v1/workspaces/1/mailboxes/test \\
  -H "Content-Type: application/json" \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN" \\
  -d '{
    "smtp_host": "smtp.gmail.com",
    "smtp_port": 587,
    "smtp_username": "you@gmail.com",
    "smtp_password": "app-password",
    "imap_host": "imap.gmail.com",
    "imap_port": 993,
    "imap_username": "you@gmail.com",
    "imap_password": "app-password"
  }'`} />
      </div>
    </DocsLayout>
  )
}
