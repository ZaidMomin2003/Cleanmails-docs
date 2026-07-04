import DocsLayout from '@/components/DocsLayout'
import Callout from '@/components/Callout'
import Step from '@/components/Step'
import Link from 'next/link'

export const metadata = { title: 'Adding Senders' }

export default function SendersPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">
          Senders & Domains
        </span>
        <h1>Adding Senders</h1>
        <p>Senders are the mailbox accounts that actually send your campaign emails. You can create internal mailboxes (via the integrated mail server) or connect external SMTP accounts.</p>

        <h2>Internal Mailboxes (Recommended)</h2>
        <p>If you&apos;re using the integrated docker-mailserver (default setup), you can create mailboxes directly:</p>

        <Step number={1} title="Add a verified domain first">
          <p>You need at least one <Link href="/infrastructure/domains">verified domain</Link> before creating internal senders.</p>
        </Step>

        <Step number={2} title="Create the sender">
          <p>Go to <strong>Senders → Add Sender</strong>. Select your domain and enter a prefix (e.g., <code>alex</code> creates <code>alex@yourdomain.com</code>).</p>
        </Step>

        <Step number={3} title="Mailbox is auto-created">
          <p>Cleanmails automatically creates the mailbox on docker-mailserver with a secure random password, configures SMTP and IMAP credentials, and tests the connection.</p>
        </Step>

        <h2>External SMTP Accounts</h2>
        <p>Connect any external email account (Gmail, Outlook, custom SMTP):</p>

        <Step number={1} title="Click Add Sender → External">
          <p>Select &quot;External SMTP&quot; mode.</p>
        </Step>

        <Step number={2} title="Enter credentials">
          <p>Provide:</p>
          <ul>
            <li><strong>Email</strong> — The full email address</li>
            <li><strong>Name</strong> — Display name for the From header</li>
            <li><strong>SMTP Host</strong> — e.g., smtp.gmail.com</li>
            <li><strong>SMTP Port</strong> — Usually 587 (STARTTLS) or 465 (SSL)</li>
            <li><strong>Username</strong> — Usually the email address</li>
            <li><strong>Password</strong> — App password (for Gmail, generate at myaccount.google.com)</li>
            <li><strong>IMAP Host</strong> (optional) — For reply detection</li>
            <li><strong>IMAP Port</strong> — Usually 993</li>
          </ul>
        </Step>

        <Step number={3} title="Connection test">
          <p>Cleanmails tests both SMTP and IMAP connections before saving. If SMTP fails, the sender is not created.</p>
        </Step>

        <Callout type="info" title="Password encryption">
          <p>All sender passwords are encrypted with AES using your MASTER_KEY before storage. They are never exposed in API responses.</p>
        </Callout>

        <h2>Sender Properties</h2>
        <table>
          <thead><tr><th>Property</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><strong>Daily Limit</strong></td><td>Max emails per day (default: 50). Prevents over-sending.</td></tr>
            <tr><td><strong>Health Score</strong></td><td>0-100 reputation indicator. Decreases on bounces, increases on successful sends.</td></tr>
            <tr><td><strong>Warmup Mode</strong></td><td>When enabled, sender participates in warmup (not used for campaigns).</td></tr>
            <tr><td><strong>Status</strong></td><td>ready, warmup, or restricted</td></tr>
            <tr><td><strong>Cooldown</strong></td><td>Auto-paused for 30 min after 3 consecutive errors</td></tr>
          </tbody>
        </table>

        <h2>Sender Health</h2>
        <p>Health score changes:</p>
        <ul>
          <li><strong>Successful send:</strong> +1 (up to 100)</li>
          <li><strong>Soft bounce:</strong> -5</li>
          <li><strong>Hard bounce:</strong> -10 to -15</li>
          <li><strong>Permanent failure:</strong> -10</li>
        </ul>
        <p>Senders with health below 20 are excluded from campaign assignment.</p>

        <Callout type="warning" title="Cooldown system">
          <p>After 3 consecutive errors, a sender is automatically put in cooldown for 30 minutes. This prevents hammering a broken connection and protects reputation.</p>
        </Callout>
      </div>
    </DocsLayout>
  )
}
