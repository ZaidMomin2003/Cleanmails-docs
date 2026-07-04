import DocsLayout from '@/components/DocsLayout'
import Callout from '@/components/Callout'
import Step from '@/components/Step'
import Link from 'next/link'

export const metadata = { title: 'First Login & Setup' }

export default function FirstLoginPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">
          Getting Started
        </span>
        <h1>First Login & Setup</h1>
        <p>After installation, open your domain in a browser to complete the onboarding wizard.</p>

        <h2>Onboarding Wizard (4 Steps)</h2>

        <Step number={1} title="Verify License">
          <p>Enter your license key to activate the instance. The system validates against the license server and binds to your instance ID.</p>
        </Step>

        <Step number={2} title="Branding">
          <p>Configure your platform appearance:</p>
          <ul>
            <li><strong>Platform Name</strong> — Displayed in the dashboard header</li>
            <li><strong>Logo</strong> — Upload your company logo (shown in sidebar and login page)</li>
          </ul>
          <p>A live preview shows how the branding will look.</p>
        </Step>

        <Step number={3} title="Create Admin Account">
          <p>Create the first user account:</p>
          <ul>
            <li><strong>Name</strong> — Your display name</li>
            <li><strong>Email</strong> — Login email address</li>
            <li><strong>Password</strong> — Choose a strong password</li>
          </ul>
          <p>This user automatically becomes <code>super_admin</code> with full access to everything. A default workspace is created automatically.</p>
        </Step>

        <Callout type="warning" title="Save your credentials!">
          <p>There is no password reset flow because your data is private and self-hosted. Write down your admin email and password.</p>
        </Callout>

        <Step number={4} title="Done">
          <p>Setup is complete. You&apos;ll see a summary and a button to go to the dashboard.</p>
        </Step>

        <h2>Dashboard Overview</h2>
        <p>Once setup is complete, you&apos;ll see the main dashboard with:</p>
        <ul>
          <li><strong>Dashboard</strong> — Stats cards (sent, opens, replies, bounces, leads, unread)</li>
          <li><strong>Campaigns</strong> — Create and manage cold email sequences</li>
          <li><strong>Leads</strong> — Upload, validate, and manage lead lists</li>
          <li><strong>Mailboxes</strong> — Add SMTP/IMAP accounts for sending</li>
          <li><strong>Warmup</strong> — Monitor and control mailbox warmup</li>
          <li><strong>Unibox</strong> — Unified inbox for all replies across mailboxes</li>
          <li><strong>Settings</strong> — DNS, AI, integrations, automation, API keys</li>
        </ul>

        <h2>Recommended First Steps</h2>
        <ol>
          <li><Link href="/infrastructure/senders">Add mailboxes</Link> (SMTP + IMAP credentials)</li>
          <li><Link href="/infrastructure/warmup">Start warmup</Link> on your new mailboxes (2–3 weeks before campaigns)</li>
          <li><Link href="/lists/uploading">Upload a lead list</Link> and validate it</li>
          <li><Link href="/campaigns/creating">Create your first campaign</Link></li>
        </ol>

        <h2>Setup API (for automation)</h2>
        <p>The onboarding wizard uses these public endpoints:</p>
        <table>
          <thead><tr><th>Endpoint</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td><code>GET /api/v1/setup/status</code></td><td>Check if onboarding is complete</td></tr>
            <tr><td><code>POST /api/v1/setup/verify-license</code></td><td>Validate license key</td></tr>
            <tr><td><code>POST /api/v1/setup/branding</code></td><td>Save logo and platform name</td></tr>
            <tr><td><code>POST /api/v1/setup/complete</code></td><td>Create admin account and finish setup</td></tr>
          </tbody>
        </table>
      </div>
    </DocsLayout>
  )
}
