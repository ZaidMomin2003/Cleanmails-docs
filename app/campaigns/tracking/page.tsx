import DocsLayout from '@/components/DocsLayout'
import Callout from '@/components/Callout'

export const metadata = { title: 'Tracking & Analytics' }

export default function TrackingPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">
          Campaigns
        </span>
        <h1>Tracking & Analytics</h1>
        <p>Cleanmails tracks opens, clicks, replies, bounces, and unsubscribes for every email sent.</p>

        <h2>Open Tracking</h2>
        <p>When enabled, a 1x1 transparent pixel is appended to each email. When the recipient loads images, the pixel fires and records the open.</p>
        <ul>
          <li><strong>Bot detection</strong> — Filters out opens from Barracuda, Proofpoint, Google Safe Browsing, Apple Privacy Proxy, and 20+ other known bots</li>
          <li><strong>Timing detection</strong> — Opens within 2 seconds of delivery are flagged as bot opens</li>
          <li><strong>Per-step tracking</strong> — Each step has its own pixel URL for accurate attribution</li>
        </ul>

        <h2>Click Tracking</h2>
        <p>When enabled, all links in your email body are wrapped with tracking redirects. When a recipient clicks, Cleanmails logs the click and redirects to the original URL.</p>
        <ul>
          <li>Uses secure SHA-256 hashed link IDs (not Base64) to prevent bot pre-fetching</li>
          <li>Bot clicks are detected and excluded from stats</li>
          <li>Click logs include IP, user agent, and timestamp</li>
        </ul>

        <h2>Reply Detection</h2>
        <p>The inbox worker monitors sender mailboxes via IMAP every few seconds. When a reply is detected:</p>
        <ol>
          <li>The delivery log is updated with <code>replied_at</code> timestamp</li>
          <li>The reply message content is stored</li>
          <li>Campaign reply count is incremented</li>
          <li>If &quot;Check Reply&quot; is enabled, subsequent steps are skipped for that lead</li>
          <li>An event is emitted for webhooks and CRM sync</li>
        </ol>

        <h2>Bounce Handling</h2>
        <p>Bounces are categorized into:</p>
        <table>
          <thead><tr><th>Type</th><th>Examples</th><th>Impact</th></tr></thead>
          <tbody>
            <tr><td><strong>Hard bounce</strong></td><td>User unknown, mailbox not found, address rejected</td><td>Lead marked invalid, sender health -15, cross-list invalidation</td></tr>
            <tr><td><strong>Soft bounce</strong></td><td>Mailbox full, try again later, rate limited</td><td>Retried with backoff, sender health -5</td></tr>
          </tbody>
        </table>

        <Callout type="warning" title="Auto-pause on high bounce rate">
          <p>If hard bounce rate exceeds 5% of total sends, the campaign is automatically paused. This protects your sender reputation from list quality issues.</p>
        </Callout>

        <h2>Unsubscribe Tracking</h2>
        <p>Every email includes an unsubscribe footer with an HMAC-signed link. When clicked:</p>
        <ul>
          <li>Lead is shown a confirmation page (prevents bot auto-unsubscribe)</li>
          <li>On confirmation, lead is marked as unsubscribed across all campaigns</li>
          <li>Supports RFC 8058 one-click unsubscribe for email clients that support it</li>
        </ul>

        <h2>Analytics Dashboard</h2>
        <p>The dashboard shows:</p>
        <ul>
          <li><strong>Overall stats</strong> — Total sent, open rate, reply rate, bounce rate, unsubscribe rate</li>
          <li><strong>Activity chart</strong> — Daily sends, replies, and unsubscribes over time</li>
          <li><strong>Per-campaign stats</strong> — Breakdown for each campaign</li>
          <li><strong>Per-lead timeline</strong> — Full delivery history for any individual lead</li>
          <li><strong>A/B test results</strong> — Per-variant open/click/reply rates</li>
        </ul>
      </div>
    </DocsLayout>
  )
}
