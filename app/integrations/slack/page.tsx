import DocsLayout from '@/components/DocsLayout'
import CodeBlock from '@/components/CodeBlock'
import Callout from '@/components/Callout'

export const metadata = { title: 'Slack, Discord & Telegram' }

export default function SlackPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">AI & Integrations</span>
        <h1>Slack, Discord & Telegram</h1>
        <p>Get real-time notifications when leads reply, meetings are booked, emails bounce, or campaigns change status. All three platforms use webhook URLs for instant delivery.</p>

        <h2>Supported Platforms</h2>
        <table>
          <thead><tr><th>Platform</th><th>Connection</th><th>Message Format</th></tr></thead>
          <tbody>
            <tr><td><strong>Slack</strong></td><td>Incoming Webhook URL</td><td>Block Kit (rich formatting with headers, sections, code blocks)</td></tr>
            <tr><td><strong>Discord</strong></td><td>Webhook URL</td><td>Embeds (colored sidebars, fields, timestamps)</td></tr>
            <tr><td><strong>Telegram</strong></td><td>Bot Token + Chat ID</td><td>Markdown-formatted messages</td></tr>
          </tbody>
        </table>

        <h2>Events Notified</h2>
        <table>
          <thead><tr><th>Event</th><th>What You See</th></tr></thead>
          <tbody>
            <tr><td><strong>Lead replied</strong></td><td>Lead name, email, company, campaign name, and a snippet of the reply</td></tr>
            <tr><td><strong>Lead bounced</strong></td><td>Email, bounce type (hard/soft), campaign name</td></tr>
            <tr><td><strong>Meeting booked</strong></td><td>Lead name, email, company</td></tr>
            <tr><td><strong>Campaign started</strong></td><td>Campaign name, status change</td></tr>
            <tr><td><strong>Campaign paused</strong></td><td>Campaign name, reason (e.g., &quot;bounce rate exceeded 5%&quot;)</td></tr>
            <tr><td><strong>Campaign completed</strong></td><td>Campaign name, final status</td></tr>
          </tbody>
        </table>

        <h2>Setup: Slack</h2>
        <ol>
          <li>Create an Incoming Webhook at <a href="https://api.slack.com/messaging/webhooks" target="_blank" rel="noopener noreferrer">api.slack.com</a></li>
          <li>Go to <strong>Settings → Integrations</strong></li>
          <li>Click <strong>Connect</strong> on Slack</li>
          <li>Paste your webhook URL (format: <code>https://hooks.slack.com/services/T.../B.../xxx</code>)</li>
        </ol>

        <h2>Setup: Discord</h2>
        <ol>
          <li>In your Discord server, go to Channel Settings → Integrations → Webhooks</li>
          <li>Create a new webhook and copy the URL</li>
          <li>Go to <strong>Settings → Integrations</strong></li>
          <li>Click <strong>Connect</strong> on Discord</li>
          <li>Paste the webhook URL</li>
        </ol>

        <h2>Setup: Telegram</h2>
        <ol>
          <li>Create a bot via <a href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer">@BotFather</a> and get your bot token</li>
          <li>Add the bot to your group/channel and get the chat ID</li>
          <li>Go to <strong>Settings → Integrations</strong></li>
          <li>Click <strong>Connect</strong> on Telegram</li>
          <li>Enter the bot token as the webhook URL and configure the chat ID</li>
        </ol>

        <h2>API</h2>
        <CodeBlock language="bash" code={`# Connect Slack
curl -X POST https://YOUR_SERVER/api/v1/workspaces/1/integrations/slack/connect \\
  -H "Content-Type: application/json" \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN" \\
  -d '{"webhook_url": "https://hooks.slack.com/services/T.../B.../xxx"}'

# Connect Discord
curl -X POST https://YOUR_SERVER/api/v1/workspaces/1/integrations/discord/connect \\
  -H "Content-Type: application/json" \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN" \\
  -d '{"webhook_url": "https://discord.com/api/webhooks/..."}'

# Disconnect any platform
curl -X DELETE https://YOUR_SERVER/api/v1/workspaces/1/integrations/slack \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN"`} />

        <Callout type="info" title="Multiple platforms simultaneously">
          <p>You can connect all three platforms at the same time. Events are dispatched to all active integrations in parallel — connect Slack for your team, Discord for a community channel, and Telegram for mobile alerts.</p>
        </Callout>

        <h2>Message Examples</h2>
        <h3>Slack: Lead Replied</h3>
        <p>Shows a rich Block Kit message with header &quot;💬 New Reply Received&quot;, lead details, and a code block with the reply snippet (first 200 chars).</p>

        <h3>Slack: Meeting Booked</h3>
        <p>Shows &quot;🎉 Meeting Booked!&quot; with lead name, email, and company.</p>

        <h3>Slack: Campaign Paused</h3>
        <p>Shows &quot;⏸️ Campaign [name] is now paused&quot; with the reason (e.g., bounce rate exceeded threshold).</p>
      </div>
    </DocsLayout>
  )
}
