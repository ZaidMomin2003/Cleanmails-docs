import DocsLayout from '@/components/DocsLayout'
import Callout from '@/components/Callout'
import CodeBlock from '@/components/CodeBlock'
import Step from '@/components/Step'
import Link from 'next/link'

export const metadata = { title: 'Creating Campaigns' }

export default function CreatingCampaignsPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">
          Campaigns
        </span>
        <h1>Creating Campaigns</h1>
        <p>
          Campaigns are multi-step cold email sequences that automatically send to your leads based on 
          schedules, conditions, and mailbox rotation. This guide walks you through creating your first campaign.
        </p>

        <h2>Prerequisites</h2>
        <ul>
          <li>At least one <Link href="/infrastructure/senders">active mailbox</Link> with tested SMTP credentials</li>
          <li>At least one <Link href="/lists/uploading">lead list</Link> with uploaded contacts</li>
        </ul>

        <h2>Creating a Campaign (Dashboard)</h2>

        <Step number={1} title="Navigate to Campaigns">
          <p>From the dashboard sidebar, click <strong>Campaigns</strong> → <strong>New Campaign</strong>.</p>
        </Step>

        <Step number={2} title="Configure campaign settings">
          <p>Set the following:</p>
          <ul>
            <li><strong>Name</strong> — Internal name for your reference</li>
            <li><strong>Timezone</strong> — Used for send window enforcement (default: UTC)</li>
            <li><strong>Send Window</strong> — Start/end hours (e.g., 09:00 – 17:00)</li>
            <li><strong>Send Days</strong> — Which days to send (e.g., Monday–Friday = 1,2,3,4,5)</li>
            <li><strong>AI Auto-Reply</strong> — Toggle ON to auto-respond when leads reply</li>
            <li><strong>AI Context</strong> — Prompt telling the AI about your product/goals</li>
            <li><strong>Scheduled Start</strong> — Optional future date/time to begin sending</li>
          </ul>
        </Step>

        <Step number={3} title="Add sequence steps">
          <p>Add one or more email steps. Each step supports:</p>
          <ul>
            <li><strong>Subject</strong> — Primary subject line (with personalization variables)</li>
            <li><strong>Subject Variants</strong> — Additional subject lines for A/B rotation</li>
            <li><strong>Body</strong> — HTML email content with variables and spintax</li>
            <li><strong>Body Variants</strong> — Additional body versions for rotation</li>
            <li><strong>Delay Days / Hours</strong> — Wait time before this step (after previous)</li>
            <li><strong>Condition</strong> — When to send: <code>not_replied</code>, <code>replied</code>, <code>not_opened</code>, <code>opened</code></li>
            <li><strong>Is Reply</strong> — Thread this step as a reply (adds Re: prefix, In-Reply-To header)</li>
          </ul>
        </Step>

        <Step number={4} title="Assign mailboxes">
          <p>Select the mailbox accounts to use for sending. The dispatcher rotates between them using round-robin — picks the mailbox with the lowest <code>sent_today</code> that&apos;s under its daily limit.</p>
        </Step>

        <Step number={5} title="Add leads to the campaign">
          <p>Assign leads from your uploaded lists to this campaign. Only leads that are not bounced, unsubscribed, or blocklisted will receive messages.</p>
        </Step>

        <Step number={6} title="Start the campaign">
          <p>Click <strong>Start</strong> to activate. The dispatcher will begin sending when the next send window opens (or immediately if within window). Requirements to start:</p>
          <ul>
            <li>At least 1 step must exist</li>
            <li>At least 1 mailbox must be assigned</li>
          </ul>
        </Step>

        <h2>Creating via API</h2>

        <CodeBlock language="bash" code={`# Step 1: Create the campaign
curl -X POST https://YOUR_SERVER/api/v1/workspaces/1/campaigns \\
  -H "Content-Type: application/json" \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN" \\
  -d '{
    "name": "Q2 Outreach",
    "timezone": "America/New_York",
    "send_window_start": "09:00",
    "send_window_end": "17:00",
    "send_days": "1,2,3,4,5",
    "ai_auto_reply": true,
    "ai_context": "We sell project management software. Be helpful and concise."
  }'

# Step 2: Add a step
curl -X POST https://YOUR_SERVER/api/v1/workspaces/1/campaigns/CAMPAIGN_ID/steps \\
  -H "Content-Type: application/json" \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN" \\
  -d '{
    "step_type": "email",
    "subject": "Hey {{first_name}}, quick question",
    "subject_variants": ["{{first_name}} — saw your work at {{company}}"],
    "body": "<p>Hi {{first_name}},</p><p>{I noticed|I saw} your work at {{company}}...</p>",
    "delay_days": 0,
    "condition": "not_replied"
  }'

# Step 3: Assign mailboxes
curl -X POST https://YOUR_SERVER/api/v1/workspaces/1/campaigns/CAMPAIGN_ID/mailboxes \\
  -H "Content-Type: application/json" \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN" \\
  -d '{"mailbox_ids": ["MAILBOX_UUID_1", "MAILBOX_UUID_2"]}'

# Step 4: Start
curl -X POST https://YOUR_SERVER/api/v1/workspaces/1/campaigns/CAMPAIGN_ID/start \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN"`} />

        <h2>Campaign Lifecycle</h2>
        <table>
          <thead>
            <tr><th>Status</th><th>Behavior</th></tr>
          </thead>
          <tbody>
            <tr><td><code>draft</code></td><td>Not processing — safe to edit steps and settings</td></tr>
            <tr><td><code>active</code></td><td>Dispatcher is sending to leads per schedule</td></tr>
            <tr><td><code>paused</code></td><td>Stopped — can be resumed, leads retain their position</td></tr>
          </tbody>
        </table>

        <Callout type="warning" title="Auto-pause on high bounce rate">
          <p>If hard bounce rate exceeds 5% (after 100+ sends), the campaign is automatically paused to protect sender reputation. Fix your list quality before resuming.</p>
        </Callout>

        <h2>How the Dispatcher Works</h2>
        <p>The campaign dispatcher runs as a periodic Asynq task and:</p>
        <ol>
          <li>Finds leads with <code>next_send_at &lt;= now</code> (uses <code>FOR UPDATE SKIP LOCKED</code> to prevent races)</li>
          <li>Checks campaign is active and within its send window (timezone-aware)</li>
          <li>Checks scheduled start time (skips if not yet time)</li>
          <li>Picks the mailbox with lowest <code>sent_today</code> under its effective limit</li>
          <li>Checks blocklist (email + domain level)</li>
          <li>Picks subject/body variant (deterministic based on lead email hash)</li>
          <li>Renders spintax + variable substitution</li>
          <li>Builds threading headers for follow-ups (In-Reply-To, References)</li>
          <li>Injects tracking pixel + unsubscribe link</li>
          <li>Sends via SMTP with human-mimicry delay (30–90 seconds between sends)</li>
          <li>On success: advances lead to next step, updates stats</li>
          <li>On hard bounce: blocklists lead, pauses campaign if rate &gt; 5%</li>
          <li>On soft bounce: retries in 4 hours</li>
        </ol>
      </div>
    </DocsLayout>
  )
}
