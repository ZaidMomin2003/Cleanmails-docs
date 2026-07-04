import DocsLayout from '@/components/DocsLayout'
import Callout from '@/components/Callout'

export const metadata = { title: 'Client Portal (Public Report)' }

export default function ClientPortalPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">Workspaces & Teams</span>
        <h1>Client Portal (Public Report)</h1>
        <p>Share campaign performance with clients without giving them dashboard access. Each workspace can generate a public report page accessible via a unique URL slug.</p>

        <h2>How It Works</h2>
        <p>The public report is a read-only page that shows workspace stats and campaign performance. It requires no authentication — anyone with the link can view it.</p>

        <h2>Report URL</h2>
        <p>Format: <code>https://YOUR_DOMAIN/report/WORKSPACE_SLUG</code></p>
        <p>The report page auto-refreshes every 60 seconds.</p>

        <h2>What the Report Shows</h2>
        <ul>
          <li><strong>Hero stats</strong> — Total emails sent, open rate, reply rate, bounce rate</li>
          <li><strong>Campaign performance table</strong> — Each campaign with sends, opens, replies, status</li>
          <li><strong>Lead lists</strong> — List names with progress bars showing validation status</li>
          <li><strong>Overall summary</strong> — Aggregate metrics across all campaigns</li>
        </ul>

        <h2>Sharing with Clients</h2>
        <p>From the dashboard, click <strong>Share View-Only Link</strong> to copy the report URL. Send it to your client via email or messaging.</p>

        <Callout type="info" title="No login required">
          <p>The report page uses public API endpoints (<code>/api/v1/report/:slug/stats</code> and <code>/api/v1/report/:slug/campaigns</code>) that don&apos;t require authentication.</p>
        </Callout>

        <h2>Security</h2>
        <ul>
          <li>Report pages are read-only — no actions can be taken</li>
          <li>The workspace slug acts as the access token</li>
          <li>Reports only show aggregate stats — no individual lead emails or personal data</li>
          <li>The report is responsive (works on mobile and desktop)</li>
        </ul>

        <h2>Client Role</h2>
        <p>Alternatively, you can onboard clients with the <code>client</code> role (via Admin → Clients). This gives them:</p>
        <ul>
          <li>A login account with access to their workspace</li>
          <li>Read-only view of campaigns, leads, and stats in the dashboard</li>
          <li>No access to admin panel, other workspaces, or system settings</li>
        </ul>
      </div>
    </DocsLayout>
  )
}
