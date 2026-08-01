import DocsLayout from '@/components/DocsLayout'
import Callout from '@/components/Callout'

export const metadata = { title: 'Multi-Step Sequences' }

export default function SequencesPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">
          Campaigns
        </span>
        <h1>Multi-Step Sequences</h1>
        <p>Campaigns support multiple email steps that are sent sequentially to each lead based on timing and conditions.</p>

        <h2>How Steps Work</h2>
        <ul>
          <li><strong>Step 1</strong> is always the initial email — sent to all leads in the attached lists</li>
          <li><strong>Step 2+</strong> are follow-ups — sent after a configurable delay, only if conditions are met</li>
          <li>Each step can have its own subject lines, body, and trigger condition</li>
          <li>If <strong>Check Reply</strong> is enabled, the sequence stops for a lead once they reply</li>
        </ul>

        <h2>Trigger Conditions</h2>
        <table>
          <thead><tr><th>Condition</th><th>Behavior</th></tr></thead>
          <tbody>
            <tr><td><code>not_replied</code></td><td>Send only if the lead has NOT replied yet (default)</td></tr>
            <tr><td><code>replied</code></td><td>Send only if the lead HAS replied</td></tr>
            <tr><td><code>not_opened</code></td><td>Send only if the lead did NOT open the previous email</td></tr>
            <tr><td><code>opened</code></td><td>Send only if the lead opened the previous email</td></tr>
          </tbody>
        </table>

        <h2>Wait Time</h2>
        <p>Each step has <strong>Wait Days</strong> and <strong>Wait Hours</strong> fields. The follow-up is only sent after this delay has passed since the previous step was delivered.</p>
        <p>Example: Step 2 with <code>wait_days: 3</code> means it sends 3 days after Step 1 was delivered to that specific lead.</p>

        <h2>Sequence Example</h2>
        <table>
          <thead><tr><th>Step</th><th>Wait</th><th>Condition</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>—</td><td>not_replied</td><td>Initial outreach</td></tr>
            <tr><td>2</td><td>3 days</td><td>not_replied</td><td>Follow-up for non-responders</td></tr>
            <tr><td>3</td><td>5 days</td><td>opened</td><td>Nudge for engaged leads who opened but didn&apos;t reply</td></tr>
            <tr><td>4</td><td>7 days</td><td>not_replied</td><td>Final breakup email</td></tr>
          </tbody>
        </table>

        <Callout type="tip" title="Best practice">
          <p>Keep sequences to 3-5 steps. More than that rarely improves reply rates and can hurt sender reputation. Space steps 2-5 days apart.</p>
        </Callout>

        <h2>Reply Detection</h2>
        <p>When <strong>Check Reply</strong> is enabled on the campaign, the inbox worker monitors sender mailboxes via IMAP. If a lead replies to any step, all subsequent steps are skipped for that lead.</p>

        <h2>Retry Logic</h2>
        <p>If a send fails with a temporary error (greylisting, rate limit), cold mail automatically retries after <strong>4 hours</strong>. Permanent errors (550, user unknown) are never retried — the lead is blocklisted and the sequence halts.</p>
      </div>
    </DocsLayout>
  )
}
