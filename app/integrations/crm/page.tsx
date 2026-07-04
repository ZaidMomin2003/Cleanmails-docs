import DocsLayout from '@/components/DocsLayout'
import Callout from '@/components/Callout'

export const metadata = { title: 'CRM Integrations' }

export default function CRMPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">AI & Integrations</span>
        <h1>CRM Integrations</h1>
        <p>Sync leads and events with your CRM. When a lead replies, bounces, or books a meeting, Cleanmails can automatically create or update records in your CRM.</p>

        <h2>Native Integrations</h2>
        <table>
          <thead><tr><th>CRM</th><th>Connection Method</th><th>Capabilities</th></tr></thead>
          <tbody>
            <tr><td><strong>HubSpot</strong></td><td>OAuth2</td><td>Create/update contacts, create deals, associate deals to contacts, sync lead status</td></tr>
          </tbody>
        </table>

        <h3>HubSpot Integration</h3>
        <p>The HubSpot integration syncs automatically on these events:</p>
        <ul>
          <li><strong>Lead replied</strong> — Creates or updates the contact in HubSpot, sets status to &quot;OPEN&quot;</li>
          <li><strong>Meeting booked</strong> — Creates a deal in the default pipeline + associates to contact</li>
          <li><strong>Lead bounced</strong> — Updates contact status to &quot;UNQUALIFIED&quot;</li>
        </ul>
        <p>Contact fields synced: email, first name, last name, company, job title, lead status.</p>

        <h2>OAuth2 CRMs (URL Generation)</h2>
        <p>The following CRMs have OAuth2 authorization URL generation built in. Full token exchange is being expanded:</p>
        <table>
          <thead><tr><th>CRM</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>Salesforce</td><td>OAuth URL ready — requires <code>SALESFORCE_CLIENT_ID</code> env var</td></tr>
            <tr><td>Pipedrive</td><td>OAuth URL ready — requires <code>PIPEDRIVE_CLIENT_ID</code> env var</td></tr>
          </tbody>
        </table>

        <h2>Via Automation Platforms</h2>
        <p>For CRMs without native integration, connect through webhooks and automation platforms:</p>
        <table>
          <thead><tr><th>CRM</th><th>Connect Via</th></tr></thead>
          <tbody>
            <tr><td>Salesforce</td><td>Zapier, Make, n8n</td></tr>
            <tr><td>Pipedrive</td><td>Zapier, Make, n8n</td></tr>
            <tr><td>GoHighLevel</td><td>Webhooks, Zapier</td></tr>
            <tr><td>Zoho CRM</td><td>Zapier, Make</td></tr>
            <tr><td>Close</td><td>Zapier, n8n</td></tr>
            <tr><td>Freshsales</td><td>Zapier, Make</td></tr>
          </tbody>
        </table>
        <p>Use Cleanmails webhooks (9 event types with HMAC-signed payloads) as triggers in your automation platform to push data to any CRM.</p>

        <h2>Connecting HubSpot</h2>
        <ol>
          <li>Go to <strong>Settings → Integrations</strong></li>
          <li>Click <strong>Connect</strong> on HubSpot</li>
          <li>Complete the OAuth2 authorization flow</li>
          <li>Grant permissions: <code>crm.objects.contacts.write</code>, <code>crm.objects.deals.write</code></li>
          <li>You&apos;ll be redirected back to the settings page</li>
        </ol>

        <Callout type="info" title="Token security">
          <p>All OAuth tokens and API keys are encrypted with AES-256-GCM using your ENCRYPTION_KEY before storage. They are never exposed in API responses.</p>
        </Callout>

        <h2>Connection Types</h2>
        <p>The integration system supports three connection methods:</p>
        <table>
          <thead><tr><th>Type</th><th>Providers</th><th>How It Works</th></tr></thead>
          <tbody>
            <tr><td><strong>OAuth2</strong></td><td>HubSpot, Salesforce, Pipedrive</td><td>User authorizes via redirect → tokens stored encrypted</td></tr>
            <tr><td><strong>Webhook</strong></td><td>Slack, Discord, Telegram, Notion, Google Sheets</td><td>Paste webhook URL → events POST to that URL</td></tr>
            <tr><td><strong>API Key</strong></td><td>Any provider without OAuth</td><td>Enter API key → stored encrypted</td></tr>
          </tbody>
        </table>

        <h2>API</h2>
        <table>
          <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>GET</td><td><code>/api/v1/workspaces/:wid/integrations</code></td><td>List all integrations</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/integrations/:provider/connect</code></td><td>Connect (returns OAuth URL or saves key)</td></tr>
            <tr><td>DELETE</td><td><code>/api/v1/workspaces/:wid/integrations/:provider</code></td><td>Disconnect</td></tr>
            <tr><td>GET</td><td><code>/api/v1/workspaces/:wid/integrations/:provider/callback</code></td><td>OAuth callback handler</td></tr>
          </tbody>
        </table>
      </div>
    </DocsLayout>
  )
}
