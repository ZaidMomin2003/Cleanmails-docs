import DocsLayout from '@/components/DocsLayout'
import CodeBlock from '@/components/CodeBlock'
import Callout from '@/components/Callout'

export const metadata = { title: 'List Validation' }

export default function ListValidationPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">Lead Lists</span>
        <h1>List Validation</h1>
        <p>Validate all emails in a lead list before using it in campaigns. This removes invalid addresses, disposable emails, and optionally catch-all domains.</p>

        <h2>Starting Validation</h2>
        <p>From the dashboard: go to <strong>Lists</strong>, click the <strong>Validate</strong> button on any list.</p>
        <p>Via API:</p>
        <CodeBlock language="bash" code={`curl -X POST http://YOUR_SERVER/v1/outreach/lists/validate/LIST_ID \\
  -H "Cookie: auth_token=YOUR_SESSION" \\
  -H "Content-Type: application/json" \\
  -d '{"catch_all_strategy": "keep"}'`} />

        <h3>Catch-All Strategy</h3>
        <table>
          <thead><tr><th>Strategy</th><th>Behavior</th></tr></thead>
          <tbody>
            <tr><td><code>keep</code></td><td>Keep catch-all emails in the list (default)</td></tr>
            <tr><td><code>delete</code></td><td>Remove catch-all emails from the list</td></tr>
          </tbody>
        </table>

        <h2>What Happens During Validation</h2>
        <ol>
          <li>List status changes to <code>processing</code></li>
          <li>Each lead is queued to the validation worker</li>
          <li>Workers perform Level 2 (SMTP) verification on each email</li>
          <li>Invalid emails are marked with <code>validation_status: "invalid"</code></li>
          <li>Catch-all emails are marked and optionally removed</li>
          <li>Role accounts and disposable emails are flagged</li>
          <li>List status changes to <code>completed</code> when all leads are processed</li>
        </ol>

        <h2>Validation Results Per Lead</h2>
        <table>
          <thead><tr><th>Status</th><th>Meaning</th></tr></thead>
          <tbody>
            <tr><td><code>valid</code></td><td>Email confirmed deliverable</td></tr>
            <tr><td><code>invalid</code></td><td>Email doesn&apos;t exist or domain has no MX</td></tr>
            <tr><td><code>catchall</code></td><td>Domain accepts all addresses</td></tr>
            <tr><td><code>disposable</code></td><td>Known disposable/temporary email provider</td></tr>
            <tr><td><code>role</code></td><td>Role-based address (info@, admin@, etc.)</td></tr>
          </tbody>
        </table>

        <h2>Monitoring Progress</h2>
        <p>The list shows real-time progress:</p>
        <ul>
          <li><strong>Initial Count</strong> — Total leads when validation started</li>
          <li><strong>Processed Count</strong> — Leads checked so far</li>
          <li><strong>Invalid Deleted</strong> — Leads removed as invalid</li>
          <li><strong>Catchall Deleted</strong> — Leads removed as catch-all (if strategy is &quot;delete&quot;)</li>
        </ul>
      </div>
    </DocsLayout>
  )
}
