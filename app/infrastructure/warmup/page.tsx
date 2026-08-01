import DocsLayout from '@/components/DocsLayout'
import Callout from '@/components/Callout'

export const metadata = { title: 'Mailbox Warmup' }

export default function WarmupPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">
          Senders & Domains
        </span>
        <h1>Mailbox Warmup</h1>
        <p>
          New mailboxes have no sending reputation. Sending cold emails from a fresh mailbox will likely land in spam. 
          cold mail includes a coordinated warmup pool that builds reputation by exchanging real emails with other cold mail instances worldwide.
        </p>

        <h2>How the Pool Works</h2>
        <p>Unlike simple peer-to-peer warmup (sending between your own mailboxes), cold mail uses a <strong>coordinated cross-instance pool</strong>:</p>
        <ol>
          <li>Your mailboxes register with the central coordinator at <code>coldmail.host</code></li>
          <li>The coordinator assigns daily send/receive tasks — pairing your mailboxes with other instances&apos; mailboxes</li>
          <li>Your instance sends warmup emails to mailboxes on other servers (and receives from them)</li>
          <li>Received warmup emails are auto-opened and auto-replied to after a delay</li>
          <li>Warmup emails landing in spam are automatically rescued and moved to inbox</li>
          <li>Health scores (inbox rate, spam rate, reply rate) are synced from the coordinator</li>
        </ol>

        <Callout type="info" title="Why a pool?">
          <p>Sending between your own mailboxes trains ESPs that you only talk to yourself — not a real engagement signal. Pool warmup means your mailbox receives emails from diverse domains and IPs, which is what email providers see as genuine activity.</p>
        </Callout>

        <h2>Daily Volume Schedule</h2>
        <p>Volume increases progressively over 30 days:</p>
        <table>
          <thead>
            <tr><th>Day Range</th><th>Emails/Day</th><th>Purpose</th></tr>
          </thead>
          <tbody>
            <tr><td>Day 1-3</td><td>2</td><td>Initial reputation signal</td></tr>
            <tr><td>Day 4-7</td><td>5</td><td>Establishing sending pattern</td></tr>
            <tr><td>Day 8-14</td><td>10</td><td>Growing volume steadily</td></tr>
            <tr><td>Day 15-21</td><td>20</td><td>Approaching normal volume</td></tr>
            <tr><td>Day 22-30</td><td>30</td><td>Full warmup volume</td></tr>
            <tr><td>Day 31+</td><td>—</td><td>Auto-graduated, ready for campaigns</td></tr>
          </tbody>
        </table>

        <h2>Warmup Email Headers</h2>
        <p>
          All warmup emails include a hidden header (<code>X-Cleanmails-Warmup: pool-v1</code>) that identifies them as warmup traffic. 
          This header is invisible to users but allows the receiving instance to:
        </p>
        <ul>
          <li>Auto-mark as received and opened</li>
          <li>Schedule an auto-reply after 3–10 minutes</li>
          <li>Report engagement back to the coordinator</li>
          <li>Rescue the email from spam/junk folders if misclassified</li>
        </ul>

        <h2>Spam Rescue</h2>
        <p>
          The IMAP sync worker automatically scans spam/junk folders for warmup pool emails. 
          When found, it moves them to the inbox — this is the most powerful signal to ESPs that these emails are wanted.
        </p>
        <p>Supported spam folder names: <code>[Gmail]/Spam</code>, <code>Junk</code>, <code>Spam</code>, <code>Junk E-mail</code>, <code>Bulk Mail</code></p>

        <h2>Enabling Warmup</h2>
        <p>From the dashboard:</p>
        <ol>
          <li>Go to <strong>Warmup</strong> page (sidebar)</li>
          <li>Click <strong>Start Warmup</strong> on any mailbox</li>
          <li>The mailbox will register with the pool and begin receiving tasks within minutes</li>
        </ol>

        <Callout type="warning" title="License required">
          <p>Warmup requires an active license — the coordinator validates your instance ID and license key before assigning tasks.</p>
        </Callout>

        <h2>Monitoring Warmup Progress</h2>
        <p>The warmup dashboard shows per-mailbox metrics synced from the coordinator:</p>
        <ul>
          <li><strong>Warmup Day</strong> — Current day in the 30-day cycle</li>
          <li><strong>Sent Today / Received Today</strong> — Today&apos;s warmup volume</li>
          <li><strong>Inbox Rate</strong> — Percentage of warmup emails landing in inbox (not spam)</li>
          <li><strong>Spam Rate</strong> — Percentage landing in spam</li>
          <li><strong>Reply Rate</strong> — Percentage that received auto-replies</li>
          <li><strong>Health Score</strong> — 0–100 overall reputation indicator</li>
          <li><strong>Last 30 Days Chart</strong> — Daily breakdown of sent, received, opened, replied</li>
        </ul>

        <h2>Auto-Reply System</h2>
        <p>
          When a warmup email is received, the system schedules an automatic reply after a random delay (3–10 minutes). 
          The reply content is fetched from the coordinator to ensure natural-looking thread conversations. 
          This simulates real engagement and signals to email providers that the mailbox is active.
        </p>

        <h2>How It Integrates with Campaigns</h2>
        <p>
          While a mailbox is warming up, its effective daily send limit is reduced according to the schedule above. 
          The campaign dispatcher respects this — if a mailbox is on day 5 of warmup, it will only send up to 5 campaign emails per day 
          (not the full daily limit). After day 30, the mailbox graduates and uses its full configured limit.
        </p>

        <Callout type="tip" title="Best practice">
          <p>Start warmup 2–3 weeks before you plan to launch campaigns. This gives your mailboxes time to build solid reputation. You can run warmup and campaigns simultaneously — the dispatcher automatically accounts for warmup quotas.</p>
        </Callout>

        <h2>API Endpoints</h2>
        <table>
          <thead>
            <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td>GET</td><td><code>/api/v1/workspaces/:wid/warmup</code></td><td>List warmup status for all mailboxes</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/warmup/:id/start</code></td><td>Start warmup for a mailbox</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/warmup/:id/pause</code></td><td>Pause warmup</td></tr>
            <tr><td>DELETE</td><td><code>/api/v1/workspaces/:wid/warmup/:id</code></td><td>Remove from warmup pool</td></tr>
          </tbody>
        </table>
      </div>
    </DocsLayout>
  )
}
