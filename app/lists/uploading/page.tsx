import DocsLayout from '@/components/DocsLayout'
import CodeBlock from '@/components/CodeBlock'
import Callout from '@/components/Callout'

export const metadata = { title: 'Uploading Lists' }

export default function UploadingListsPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">
          Lead Lists
        </span>
        <h1>Uploading Lists</h1>
        <p>Lead lists are collections of contacts that you attach to campaigns. You can upload via the dashboard (CSV/XLSX) or the API (JSON).</p>

        <h2>Dashboard Upload</h2>
        <ol>
          <li>Go to <strong>Lists → New List</strong></li>
          <li>Name your list</li>
          <li>Upload a CSV or XLSX file</li>
          <li>Map columns to fields (email, first_name, last_name, company)</li>
          <li>Any unmapped columns are stored as custom fields in <code>extra_data</code></li>
        </ol>

        <Callout type="info" title="Required column">
          <p>The only required column is <strong>email</strong>. All other fields are optional but improve personalization.</p>
        </Callout>

        <h2>API Upload</h2>
        <CodeBlock language="bash" code={`curl -X POST http://YOUR_SERVER/v1/outreach/lists \\
  -H "Content-Type: application/json" \\
  -H "Cookie: auth_token=YOUR_SESSION" \\
  -d '{
    "name": "Enterprise Leads Q2",
    "leads": [
      {
        "email": "john@acme.com",
        "first_name": "John",
        "last_name": "Smith",
        "company": "Acme Corp",
        "extra_data": {"title": "VP Sales", "linkedin": "linkedin.com/in/john"}
      },
      {
        "email": "jane@startup.io",
        "first_name": "Jane",
        "last_name": "Doe",
        "company": "Startup Inc"
      }
    ]
  }'`} />

        <h2>CSV Format</h2>
        <CodeBlock language="text" filename="leads.csv" code={`email,first_name,last_name,company,title
john@acme.com,John,Smith,Acme Corp,VP Sales
jane@startup.io,Jane,Doe,Startup Inc,CEO
bob@enterprise.com,Bob,Johnson,Enterprise Ltd,CTO`} />

        <h2>Custom Fields</h2>
        <p>Any column not matching the standard fields (email, first_name, last_name, company) is stored as JSON in the lead&apos;s <code>extra_data</code> field. You can reference these in personalization:</p>
        <CodeBlock language="text" code={`Hi {{FIRST_NAME}}, I noticed you're the {{title}} at {{COMPANY}}...`} />

        <h2>List Properties</h2>
        <table>
          <thead><tr><th>Property</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><strong>Status</strong></td><td>active (default)</td></tr>
            <tr><td><strong>Validation Status</strong></td><td>unvalidated, processing, completed</td></tr>
            <tr><td><strong>Initial Count</strong></td><td>Number of leads when validation started</td></tr>
            <tr><td><strong>Processed Count</strong></td><td>Leads validated so far</td></tr>
            <tr><td><strong>Invalid Deleted</strong></td><td>Leads removed as invalid</td></tr>
            <tr><td><strong>Catchall Deleted</strong></td><td>Leads removed as catch-all (if strategy is &quot;delete&quot;)</td></tr>
          </tbody>
        </table>

        <h2>Downloading Lists</h2>
        <p>Export a validated list as CSV (includes validation results and all custom fields):</p>
        <CodeBlock language="bash" code={`curl http://YOUR_SERVER/v1/outreach/lists/LIST_ID/download \\
  -H "Cookie: auth_token=YOUR_SESSION" \\
  -o cleaned_list.csv`} />
      </div>
    </DocsLayout>
  )
}
