import DocsLayout from '@/components/DocsLayout'
import Callout from '@/components/Callout'

export const metadata = { title: 'Sender Rotation' }

export default function RotationPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">
          Senders & Domains
        </span>
        <h1>Sender Rotation</h1>
        <p>Cleanmails automatically rotates between your mailbox accounts when sending campaign emails. This distributes volume, protects reputation, and avoids triggering provider rate limits.</p>

        <h2>How Rotation Works</h2>
        <p>When the dispatcher needs to send an email, it selects a mailbox using this algorithm:</p>
        <ol>
          <li><strong>Filter assigned mailboxes</strong> — Only mailboxes assigned to this campaign are considered</li>
          <li><strong>Filter active</strong> — Skip any mailbox with <code>is_active = false</code></li>
          <li><strong>Check daily limit</strong> — Skip mailboxes that have reached their effective daily limit</li>
          <li><strong>Round-robin selection</strong> — Pick the mailbox with the lowest <code>sent_today</code> count</li>
        </ol>
        <p>This ensures even distribution across all mailboxes and automatically shifts load away from maxed-out accounts.</p>

        <h2>Effective Daily Limit</h2>
        <p>The effective limit depends on whether warmup is active:</p>
        <table>
          <thead><tr><th>Warmup Status</th><th>Effective Limit</th></tr></thead>
          <tbody>
            <tr><td>Warmup disabled</td><td>Full configured daily limit</td></tr>
            <tr><td>Warmup day 1–3</td><td>5 emails/day</td></tr>
            <tr><td>Warmup day 4–7</td><td>15 emails/day</td></tr>
            <tr><td>Warmup day 8–14</td><td>30 emails/day</td></tr>
            <tr><td>Warmup day 15+</td><td>Full configured daily limit</td></tr>
          </tbody>
        </table>
        <p>The <code>sent_today</code> counter resets at midnight via a periodic background task.</p>

        <h2>Human-Mimicry Delay</h2>
        <p>Between each email sent, the dispatcher adds a random delay of <strong>30–90 seconds</strong>. This simulates human sending patterns and avoids triggering rate limits at the receiving end.</p>

        <Callout type="info" title="Batch size">
          <p>Each dispatcher cycle processes up to 50 leads (using <code>FOR UPDATE SKIP LOCKED</code> to prevent duplicate sends). With 30–90 second delays, a full batch takes ~25–75 minutes.</p>
        </Callout>

        <h2>Best Practices</h2>
        <ul>
          <li><strong>Use 3–10 mailboxes per campaign</strong> — More mailboxes means lower per-sender volume and better distribution</li>
          <li><strong>Mix domains</strong> — Use mailboxes across multiple sending domains for diversity</li>
          <li><strong>Set conservative daily limits</strong> — 30–50/day for warmup phase, 100–200/day for established mailboxes</li>
          <li><strong>Monitor in the dashboard</strong> — The mailbox health endpoint shows sent_today vs. limit for each account</li>
        </ul>

        <h2>What Happens When All Mailboxes Are Full</h2>
        <p>If every assigned mailbox has hit its daily limit, the dispatcher skips that lead for the current cycle. The lead stays in queue and will be sent to in the next cycle (or the next day when limits reset).</p>

        <h2>Blocklist Check</h2>
        <p>Before sending, the dispatcher checks the workspace blocklist for both the lead&apos;s email and domain. Blocklisted leads are permanently removed from the campaign queue.</p>

        <Callout type="warning" title="Bounce protection">
          <p>Hard bounces automatically blocklist the email and increment the campaign&apos;s bounce counter. If bounce rate exceeds 5% (after 100+ sends), the campaign is auto-paused.</p>
        </Callout>
      </div>
    </DocsLayout>
  )
}
