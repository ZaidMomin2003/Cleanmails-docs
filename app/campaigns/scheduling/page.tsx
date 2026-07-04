import DocsLayout from '@/components/DocsLayout'
import CodeBlock from '@/components/CodeBlock'
import Callout from '@/components/Callout'

export const metadata = { title: 'Campaign Scheduling' }

export default function SchedulingPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">
          Campaigns
        </span>
        <h1>Campaign Scheduling</h1>
        <p>Control when your campaigns send emails by configuring time windows, days of the week, and timezone-aware schedules.</p>

        <h2>Schedule Configuration</h2>
        <p>Each campaign can have a schedule that restricts sending to specific days and hours:</p>

        <CodeBlock language="json" filename="Example: Business hours EST" code={`{
  "timezone": "America/New_York",
  "send_window_start": "09:00",
  "send_window_end": "17:00",
  "send_days": "1,2,3,4,5"
}`} />

        <h3>Fields</h3>
        <table>
          <thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>send_days</code></td><td>Comma-separated string</td><td>1=Monday, 2=Tuesday, ..., 7=Sunday</td></tr>
            <tr><td><code>send_window_start</code></td><td>String (HH:MM)</td><td>Start of sending window</td></tr>
            <tr><td><code>send_window_end</code></td><td>String (HH:MM)</td><td>End of sending window</td></tr>
            <tr><td><code>timezone</code></td><td>IANA timezone</td><td>e.g., America/New_York, Europe/London, Asia/Tokyo</td></tr>
          </tbody>
        </table>

        <h2>Overnight Schedules</h2>
        <p>Schedules where <code>start</code> is after <code>end</code> are treated as overnight windows:</p>

        <CodeBlock language="json" filename="Example: Evening to morning" code={`{
  "days": [1, 2, 3, 4, 5],
  "start": "22:00",
  "end": "06:00",
  "timezone": "UTC"
}`} />

        <p>This sends from 10 PM to 6 AM UTC on weekdays.</p>

        <h2>No Schedule (24/7)</h2>
        <p>If you leave the send window and days at defaults (09:00–17:00, Mon–Fri), the campaign uses these defaults. The dispatcher always checks the window in the campaign&apos;s configured timezone.</p>

        <h2>Scheduled Start (Delayed Launch)</h2>
        <p>Set a <code>scheduled_start_at</code> timestamp (ISO 8601) to delay campaign start. The campaign must be in &quot;active&quot; status, but the dispatcher won&apos;t process leads until the scheduled time arrives.</p>

        <Callout type="tip" title="Timezone tip">
          <p>Always set the timezone to match your recipients&apos; location, not your own. Sending during their business hours dramatically improves open rates.</p>
        </Callout>
      </div>
    </DocsLayout>
  )
}
