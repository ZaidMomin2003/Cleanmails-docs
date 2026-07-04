import DocsLayout from '@/components/DocsLayout'
import Callout from '@/components/Callout'
import CodeBlock from '@/components/CodeBlock'

export const metadata = { title: 'Webhooks' }

export default function WebhooksPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">
          Integrations
        </span>
        <h1>Webhooks</h1>
        <p>
          Cleanmails fires real-time webhook events when things happen in your outreach. 
          Use webhooks to sync with CRMs, trigger automation platforms (Zapier, Make, n8n), or build custom dashboards.
        </p>

        <h2>Event Types</h2>
        <table>
          <thead>
            <tr><th>Event</th><th>Fired When</th></tr>
          </thead>
          <tbody>
            <tr><td><code>lead.replied</code></td><td>A lead replies to a campaign email</td></tr>
            <tr><td><code>lead.bounced</code></td><td>Email bounces (hard or soft)</td></tr>
            <tr><td><code>lead.opened</code></td><td>Recipient opens the email (tracking pixel loaded)</td></tr>
            <tr><td><code>lead.clicked</code></td><td>Recipient clicks a tracked link</td></tr>
            <tr><td><code>lead.unsubscribed</code></td><td>Lead clicks the unsubscribe link</td></tr>
            <tr><td><code>campaign.started</code></td><td>Campaign status changes to active</td></tr>
            <tr><td><code>campaign.paused</code></td><td>Campaign is paused (manual or auto due to bounce rate)</td></tr>
            <tr><td><code>campaign.completed</code></td><td>All leads processed through all steps</td></tr>
            <tr><td><code>meeting.booked</code></td><td>Lead thread marked as &quot;Meeting Booked&quot; in unibox</td></tr>
          </tbody>
        </table>

        <h2>Creating a Webhook</h2>
        <CodeBlock language="bash" code={`curl -X POST https://YOUR_SERVER/api/v1/workspaces/1/webhooks \\
  -H "Content-Type: application/json" \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN" \\
  -d '{
    "url": "https://your-app.com/webhook/cleanmails",
    "secret": "your-hmac-signing-secret",
    "events": ["lead.replied", "lead.bounced", "meeting.booked"]
  }'`} />

        <Callout type="info" title="Event filtering">
          <p>Specify which events you want to receive. Only matching events will be delivered to your endpoint.</p>
        </Callout>

        <h2>Webhook Payload</h2>
        <CodeBlock language="json" filename="POST to your URL" code={`{
  "event": "lead.replied",
  "workspace_id": "uuid-here",
  "timestamp": "2026-05-12T14:30:00Z",
  "data": {
    "lead_email": "john@example.com",
    "lead_name": "John Smith",
    "company": "Acme Inc",
    "campaign_name": "Q2 Outreach",
    "snippet": "Thanks for reaching out! I'd love to learn more about..."
  }
}`} />

        <h2>Signature Verification</h2>
        <p>Every delivery includes an HMAC-SHA256 signature header for payload verification:</p>
        <CodeBlock language="text" code={`X-Webhook-Signature: sha256=a1b2c3d4e5f6...`} />

        <p>Verify it server-side:</p>
        <CodeBlock language="javascript" filename="Node.js verification" code={`const crypto = require('crypto');

function verifyWebhook(body, signature, secret) {
  const expected = 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}`} />

        <h2>Retry & Auto-Deactivate</h2>
        <ul>
          <li><strong>Retries:</strong> Automatic retry with exponential backoff on failure</li>
          <li><strong>Auto-deactivate:</strong> After 10 consecutive failures, the webhook is automatically deactivated</li>
          <li><strong>Delivery logs:</strong> Each delivery attempt is logged with status code and response body</li>
          <li><strong>Re-enable:</strong> Fix your endpoint, then update the webhook to re-activate</li>
        </ul>

        <h2>Delivery Logs</h2>
        <CodeBlock language="bash" code={`# View delivery history for a webhook
curl https://YOUR_SERVER/api/v1/workspaces/1/webhooks/WEBHOOK_ID/logs \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN"`} />
        <p>Logs include: timestamp, event type, HTTP status code, response body, and delivery duration.</p>

        <h2>Webhook Dispatch</h2>
        <p>Webhook payloads are delivered as background jobs via the Asynq worker queue. This ensures:</p>
        <ul>
          <li>Webhook delivery doesn&apos;t block the main request flow</li>
          <li>Failed deliveries are retried automatically</li>
          <li>High-volume events don&apos;t overwhelm your endpoint</li>
        </ul>

        <h2>API Endpoints</h2>
        <table>
          <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>GET</td><td><code>/api/v1/workspaces/:wid/webhooks</code></td><td>List all webhooks</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/webhooks</code></td><td>Create webhook</td></tr>
            <tr><td>PUT</td><td><code>/api/v1/workspaces/:wid/webhooks/:id</code></td><td>Update webhook</td></tr>
            <tr><td>DELETE</td><td><code>/api/v1/workspaces/:wid/webhooks/:id</code></td><td>Delete webhook</td></tr>
            <tr><td>GET</td><td><code>/api/v1/workspaces/:wid/webhooks/:id/logs</code></td><td>View delivery logs</td></tr>
          </tbody>
        </table>

        <h2>Using with Automation Platforms</h2>
        <p>Webhooks are the bridge to automation platforms:</p>
        <table>
          <thead><tr><th>Platform</th><th>Setup</th></tr></thead>
          <tbody>
            <tr><td><strong>Zapier</strong></td><td>Use &quot;Catch Hook&quot; trigger → paste the Zap webhook URL into Cleanmails</td></tr>
            <tr><td><strong>Make (Integromat)</strong></td><td>Use &quot;Custom Webhook&quot; module → paste the Make webhook URL</td></tr>
            <tr><td><strong>n8n</strong></td><td>Use &quot;Webhook&quot; node → paste the n8n webhook URL</td></tr>
            <tr><td><strong>Activepieces</strong></td><td>Use &quot;Webhook Trigger&quot; → paste the webhook URL</td></tr>
          </tbody>
        </table>
        <p>This lets you push Cleanmails events into any of the 5,000+ apps these platforms support.</p>
      </div>
    </DocsLayout>
  )
}
