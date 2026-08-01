import DocsLayout from '@/components/DocsLayout'
import Callout from '@/components/Callout'
import CodeBlock from '@/components/CodeBlock'

export const metadata = { title: 'Email Validation Overview' }

export default function ValidationOverviewPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">
          Email Validation
        </span>
        <h1>Email Validation Overview</h1>
        <p>
          cold mail includes a built-in email validation engine that checks addresses through multiple layers. 
          Validation runs as a background job when you trigger it on an uploaded lead list — results appear in real-time on the leads table.
        </p>

        <h2>Validation Pipeline</h2>
        <p>Each email in your lead list goes through these checks (in order):</p>

        <table>
          <thead>
            <tr><th>Step</th><th>Check</th><th>What It Does</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>Syntax validation</td><td>RFC 5322 compliant regex check — catches obvious typos</td></tr>
            <tr><td>2</td><td>Disposable detection</td><td>Checks against 120,000+ known disposable/throwaway domains</td></tr>
            <tr><td>3</td><td>Role-based filter</td><td>Identifies generic addresses (info@, admin@, support@, etc.)</td></tr>
            <tr><td>4</td><td>Free email flag</td><td>Flags Gmail, Yahoo, Outlook, and other free providers</td></tr>
            <tr><td>5</td><td>DNS MX lookup</td><td>Verifies the domain has valid mail exchange servers (5s timeout)</td></tr>
            <tr><td>6</td><td>A-record fallback</td><td>Falls back to DNS A record if no MX records found</td></tr>
            <tr><td>7</td><td>Domain suggestion</td><td>Suggests corrections for typos (e.g., gmial.com → gmail.com)</td></tr>
          </tbody>
        </table>

        <Callout type="info" title="How it runs">
          <p>Validation runs as a background job in the Asynq worker&apos;s <code>default</code> queue with 100 concurrent goroutines. Results are written to PostgreSQL as each lead is processed — the frontend shows progress in real-time.</p>
        </Callout>

        <h2>Scoring System</h2>
        <p>Each lead receives a score from 0–100 based on the checks above:</p>

        <table>
          <thead>
            <tr><th>Factor</th><th>Points</th></tr>
          </thead>
          <tbody>
            <tr><td>Valid syntax</td><td>+20</td></tr>
            <tr><td>Has MX records</td><td>+35</td></tr>
            <tr><td>Not a role account</td><td>+15</td></tr>
            <tr><td>Not a free email</td><td>+15 (free emails get +5)</td></tr>
            <tr><td>Reachable assessment</td><td>+10 to +15</td></tr>
            <tr><td>Disposable domain</td><td>Instant invalid (score: 5)</td></tr>
            <tr><td>No MX records</td><td>Instant invalid (score: 10)</td></tr>
          </tbody>
        </table>

        <h3>Score Categories</h3>
        <table>
          <thead>
            <tr><th>Score Range</th><th>Status</th><th>Color</th><th>Meaning</th></tr>
          </thead>
          <tbody>
            <tr><td>60–100</td><td>Valid</td><td>Green</td><td>Safe to send — high confidence deliverable</td></tr>
            <tr><td>35–59</td><td>Risky</td><td>Amber</td><td>May bounce — use with caution</td></tr>
            <tr><td>0–34</td><td>Invalid</td><td>Red</td><td>Will likely bounce — do not send</td></tr>
          </tbody>
        </table>

        <h2>How to Validate Leads</h2>
        <p>Upload a CSV list, then trigger validation from the dashboard or via API:</p>

        <CodeBlock language="bash" code={`# Step 1: Upload a CSV lead list
curl -X POST https://YOUR_SERVER/api/v1/workspaces/1/leads/upload \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN" \\
  -F "file=@leads.csv"

# Step 2: Trigger validation
curl -X POST https://YOUR_SERVER/api/v1/workspaces/1/leads/validate \\
  -H "Content-Type: application/json" \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN" \\
  -d '{"list_id": 1}'

# Step 3: Check results (updated in real-time as validation progresses)
curl https://YOUR_SERVER/api/v1/workspaces/1/leads \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN"`} />

        <Callout type="tip" title="From the dashboard">
          <p>You can also trigger validation directly from the lead list card in the dashboard — click the list, then hit the <strong>Validate</strong> button. A progress bar shows real-time status.</p>
        </Callout>

        <h2>CSV Format</h2>
        <p>The uploaded CSV should include at minimum an <code>email</code> column. Additional supported columns:</p>
        <table>
          <thead><tr><th>Column</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>email</code></td><td>Email address (required)</td></tr>
            <tr><td><code>first_name</code></td><td>First name (used in campaign personalization)</td></tr>
            <tr><td><code>last_name</code></td><td>Last name</td></tr>
            <tr><td><code>company</code></td><td>Company name</td></tr>
            <tr><td><code>job_title</code></td><td>Job title</td></tr>
            <tr><td><code>phone</code></td><td>Phone number</td></tr>
          </tbody>
        </table>
        <p>Duplicate emails within the same workspace are automatically deduplicated via a database unique index.</p>

        <h2>Performance</h2>
        <table>
          <thead>
            <tr><th>Metric</th><th>Value</th></tr>
          </thead>
          <tbody>
            <tr><td>Concurrency</td><td>100 parallel goroutines per validation job</td></tr>
            <tr><td>Disposable blocklist</td><td>120,000+ domains</td></tr>
            <tr><td>Score range</td><td>0–100 per email</td></tr>
            <tr><td>Queue priority</td><td>Default queue (weight 3)</td></tr>
            <tr><td>Max retry</td><td>2 attempts on failure</td></tr>
          </tbody>
        </table>
      </div>
    </DocsLayout>
  )
}
