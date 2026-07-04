import DocsLayout from '@/components/DocsLayout'
import CodeBlock from '@/components/CodeBlock'

export const metadata = { title: 'Managing Leads' }

export default function ManagingLeadsPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">Lead Lists</span>
        <h1>Managing Leads</h1>
        <p>View, add, remove, and inspect individual leads within your lists.</p>

        <h2>Viewing a Lead</h2>
        <p>Click any lead in the dashboard to see their full profile:</p>
        <ul>
          <li>Contact info (email, name, company, custom fields)</li>
          <li>Validation status and results</li>
          <li>Full delivery history (every email sent, opens, clicks, replies)</li>
          <li>Click log (which links they clicked and when)</li>
          <li>Unsubscribe status</li>
        </ul>

        <h2>Adding a Single Lead</h2>
        <CodeBlock language="bash" code={`curl -X POST http://YOUR_SERVER/v1/outreach/lists/LIST_ID/leads \\
  -H "Content-Type: application/json" \\
  -H "Cookie: auth_token=YOUR_SESSION" \\
  -d '{
    "email": "new@example.com",
    "first_name": "New",
    "last_name": "Lead",
    "company": "Acme Corp",
    "extra_data": {"title": "CEO"}
  }'`} />

        <h2>Deleting a Lead</h2>
        <CodeBlock language="bash" code={`curl -X DELETE http://YOUR_SERVER/v1/outreach/leads/LEAD_ID \\
  -H "Cookie: auth_token=YOUR_SESSION"`} />

        <h2>Unsubscribed Leads</h2>
        <p>When a lead unsubscribes (via the unsubscribe link in emails), they are marked with <code>unsubscribed: true</code>. Unsubscribed leads are automatically excluded from all future campaign sends across all lists.</p>

        <h2>Lead Properties</h2>
        <table>
          <thead><tr><th>Field</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>email</code></td><td>Email address (required)</td></tr>
            <tr><td><code>first_name</code></td><td>First name (for personalization)</td></tr>
            <tr><td><code>last_name</code></td><td>Last name</td></tr>
            <tr><td><code>company</code></td><td>Company name</td></tr>
            <tr><td><code>extra_data</code></td><td>JSON object with custom fields (title, linkedin, etc.)</td></tr>
            <tr><td><code>valid</code></td><td>Whether the email is valid (updated by validation)</td></tr>
            <tr><td><code>validation_status</code></td><td>pending, valid, invalid, catchall, disposable, role</td></tr>
            <tr><td><code>unsubscribed</code></td><td>Whether the lead has opted out</td></tr>
          </tbody>
        </table>
      </div>
    </DocsLayout>
  )
}
