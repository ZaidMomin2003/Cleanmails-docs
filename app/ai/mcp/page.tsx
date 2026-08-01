import DocsLayout from '@/components/DocsLayout'
import Callout from '@/components/Callout'
import CodeBlock from '@/components/CodeBlock'
import Step from '@/components/Step'

export const metadata = { title: 'MCP Server' }

export default function MCPPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">
          AI & Integrations
        </span>
        <h1>MCP Server</h1>
        <p>
          Cold mail includes a built-in <strong>Model Context Protocol (MCP)</strong> server that lets you 
          control your outreach platform directly from AI coding assistants like Claude Desktop, Cursor, or any MCP-compatible client.
        </p>

        <h2>What is MCP?</h2>
        <p>
          MCP (Model Context Protocol) is an open standard that allows AI assistants to interact with external tools. 
          The cold mail MCP server exposes your campaigns, mailboxes, leads, and inbox as tools that an AI can read and control.
        </p>

        <h2>Available Tools</h2>
        <table>
          <thead>
            <tr><th>Tool</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>get_stats</code></td><td>Get overall outreach statistics (sent, opens, replies, bounces)</td></tr>
            <tr><td><code>list_campaigns</code></td><td>List all campaigns with current status and stats</td></tr>
            <tr><td><code>start_campaign</code></td><td>Start a draft or paused campaign</td></tr>
            <tr><td><code>pause_campaign</code></td><td>Pause a running campaign</td></tr>
            <tr><td><code>list_leads</code></td><td>List leads with filtering options</td></tr>
            <tr><td><code>get_inbox</code></td><td>Get recent email threads/replies</td></tr>
            <tr><td><code>send_reply</code></td><td>Send a reply to a thread</td></tr>
            <tr><td><code>get_mailboxes</code></td><td>List all mailbox accounts with health status</td></tr>
          </tbody>
        </table>

        <h2>Architecture</h2>
        <p>
          The MCP server is built into the cold mail API as an HTTP endpoint at <code>/api/v1/mcp</code>. 
          It uses JSON-RPC 2.0 protocol and requires authentication (JWT token or API key).
        </p>
        <p>
          A standalone MCP binary (<code>cleanmails-mcp</code>) is included in your installation that bridges 
          between the stdio transport (used by Claude/Cursor) and the HTTP endpoint.
        </p>

        <h2>Setup for Claude Desktop</h2>

        <Step number={1} title="Download the MCP binary">
          <p>The MCP server binary is included in your cold mail installation at <code>/opt/cleanmails/cleanmails-mcp</code>. Copy it to your local machine.</p>
        </Step>

        <Step number={2} title="Get your API key">
          <p>Go to your cold mail dashboard → Settings → API &amp; MCP tab, and generate an API key. It will have the format <code>cm_live_xxx</code>.</p>
        </Step>

        <Step number={3} title="Configure Claude Desktop">
          <p>Edit your Claude Desktop MCP config file:</p>
        </Step>

        <CodeBlock language="json" filename="claude_desktop_config.json" code={`{
  "mcpServers": {
    "coldmail": {
      "command": "/path/to/cleanmails-mcp",
      "args": [
        "--api-url", "https://your-coldmail-domain.com",
        "--api-key", "cm_live_YOUR_API_KEY"
      ]
    }
  }
}`} />

        <Step number={4} title="Restart Claude Desktop">
          <p>After saving the config, restart Claude Desktop. You should see &quot;coldmail&quot; appear in the available tools list.</p>
        </Step>

        <h2>Setup for Cursor</h2>
        <p>The same binary works with Cursor. Add it to your <code>.cursor/mcp.json</code>:</p>

        <CodeBlock language="json" filename=".cursor/mcp.json" code={`{
  "mcpServers": {
    "coldmail": {
      "command": "/path/to/cleanmails-mcp",
      "args": ["--api-url", "https://your-domain.com", "--api-key", "cm_live_YOUR_KEY"]
    }
  }
}`} />

        <h2>Environment Variables</h2>
        <p>Instead of CLI flags, you can use environment variables:</p>
        <table>
          <thead>
            <tr><th>Variable</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>COLDMAIL_API_URL</code></td><td>Your cold mail server URL (e.g., https://app.yourdomain.com)</td></tr>
            <tr><td><code>COLDMAIL_API_KEY</code></td><td>Your API key (cm_live_xxx format)</td></tr>
          </tbody>
        </table>

        <h2>Direct HTTP Usage</h2>
        <p>You can also call the MCP endpoint directly via HTTP for custom integrations:</p>
        <CodeBlock language="bash" code={`curl -X POST https://YOUR_SERVER/api/v1/mcp \\
  -H "Content-Type: application/json" \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "get_stats",
      "arguments": {}
    }
  }'`} />

        <h2>Example Usage</h2>
        <p>Once connected, you can ask your AI assistant things like:</p>
        <ul>
          <li>&quot;Show me my campaign stats&quot;</li>
          <li>&quot;Pause the Q2 Outreach campaign&quot;</li>
          <li>&quot;List my mailboxes and their health status&quot;</li>
          <li>&quot;Check my inbox for new replies&quot;</li>
          <li>&quot;Send a reply to the latest thread&quot;</li>
          <li>&quot;Start the Enterprise campaign&quot;</li>
        </ul>

        <Callout type="info" title="Protocol Version">
          <p>The cold mail MCP server implements JSON-RPC 2.0. The standalone binary uses stdio transport (stdin/stdout) for compatibility with Claude Desktop and Cursor.</p>
        </Callout>

        <h2>Troubleshooting</h2>
        <table>
          <thead>
            <tr><th>Issue</th><th>Solution</th></tr>
          </thead>
          <tbody>
            <tr><td>Tools not appearing</td><td>Check that the binary path is correct and executable (<code>chmod +x</code>)</td></tr>
            <tr><td>API errors (401)</td><td>Your API key may be invalid — generate a new one from the dashboard</td></tr>
            <tr><td>Connection refused</td><td>Ensure your cold mail server is running and accessible from your machine</td></tr>
            <tr><td>Wrong workspace</td><td>API keys are scoped to a workspace — ensure you&apos;re using the right key</td></tr>
          </tbody>
        </table>
      </div>
    </DocsLayout>
  )
}
