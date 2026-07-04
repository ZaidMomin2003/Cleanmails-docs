import DocsLayout from '@/components/DocsLayout'
import CodeBlock from '@/components/CodeBlock'
import Callout from '@/components/Callout'
import Link from 'next/link'

export const metadata = { title: 'Verification API Endpoints' }

export default function VerificationAPIPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">API Reference</span>
        <h1>Verification Endpoints</h1>
        <p>Email verification in Cleanmails is handled through the lead validation system. Upload a lead list and trigger validation as a background job.</p>

        <h2>Validate Leads</h2>
        <CodeBlock language="bash" code={`POST /api/v1/workspaces/:wid/leads/validate`} />
        <p>Triggers email validation on uploaded leads. This enqueues a background job that processes leads through the validation pipeline.</p>

        <CodeBlock language="bash" code={`curl -X POST https://YOUR_SERVER/api/v1/workspaces/1/leads/validate \\
  -H "Content-Type: application/json" \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN" \\
  -d '{"list_id": 1}'`} />

        <h2>Validation Pipeline</h2>
        <p>Each email goes through a multi-step validation process:</p>
        <table>
          <thead><tr><th>Step</th><th>Check</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>Regex syntax</td><td>RFC 5322 compliant format check</td></tr>
            <tr><td>2</td><td>Disposable domain</td><td>Checked against 120,000+ known disposable providers</td></tr>
            <tr><td>3</td><td>Role-based filter</td><td>Detects info@, admin@, support@, etc.</td></tr>
            <tr><td>4</td><td>Free email flag</td><td>Identifies Gmail, Yahoo, Outlook addresses</td></tr>
            <tr><td>5</td><td>DNS MX lookup</td><td>Verifies domain has mail servers (5s timeout)</td></tr>
            <tr><td>6</td><td>DNS A-record fallback</td><td>Falls back to A record if no MX found</td></tr>
            <tr><td>7</td><td>Gravatar check</td><td>MD5 ping to verify human account exists</td></tr>
          </tbody>
        </table>

        <h2>Score Output</h2>
        <p>Each lead receives a score from 0–100 with a detailed breakdown:</p>
        <table>
          <thead><tr><th>Score Range</th><th>Status</th><th>Meaning</th></tr></thead>
          <tbody>
            <tr><td>80–100</td><td>Valid (green)</td><td>High confidence deliverable</td></tr>
            <tr><td>50–79</td><td>Risky (amber)</td><td>May bounce, use with caution</td></tr>
            <tr><td>0–49</td><td>Invalid (red)</td><td>Likely to bounce, do not send</td></tr>
          </tbody>
        </table>

        <h2>Upload + Validate Flow</h2>
        <p>The typical workflow is to upload a CSV list, then trigger validation:</p>

        <CodeBlock language="bash" code={`# Step 1: Upload CSV lead list
curl -X POST https://YOUR_SERVER/api/v1/workspaces/1/leads/upload \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN" \\
  -F "file=@leads.csv"

# Step 2: Trigger validation on the uploaded list
curl -X POST https://YOUR_SERVER/api/v1/workspaces/1/leads/validate \\
  -H "Content-Type: application/json" \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN" \\
  -d '{"list_id": 1}'

# Step 3: Check lead status (results update in real-time)
curl https://YOUR_SERVER/api/v1/workspaces/1/leads \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN"`} />

        <Callout type="info" title="Background processing">
          <p>Validation runs as a background job in the worker&apos;s <code>default</code> priority queue. Results are written to the database as each lead is processed. The frontend shows a real-time progress bar.</p>
        </Callout>

        <h2>CSV Format</h2>
        <p>The uploaded CSV should include at minimum an <code>email</code> column. Additional supported columns:</p>
        <table>
          <thead><tr><th>Column</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>email</code></td><td>Email address (required)</td></tr>
            <tr><td><code>first_name</code></td><td>First name</td></tr>
            <tr><td><code>last_name</code></td><td>Last name</td></tr>
            <tr><td><code>company</code></td><td>Company name</td></tr>
            <tr><td><code>job_title</code></td><td>Job title</td></tr>
            <tr><td><code>phone</code></td><td>Phone number</td></tr>
          </tbody>
        </table>
        <p>Duplicate emails within the same workspace are automatically deduplicated (enforced by a database unique index).</p>

        <p>See <Link href="/validation/overview">Validation Overview</Link> for more details on the verification engine.</p>
      </div>
    </DocsLayout>
  )
}
