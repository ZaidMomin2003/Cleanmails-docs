import DocsLayout from '@/components/DocsLayout'
import Callout from '@/components/Callout'

export const metadata = { title: 'AI Features' }

export default function AICopilotPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">AI & Integrations</span>
        <h1>AI Features</h1>
        <p>Cleanmails supports 6 LLM providers for AI auto-reply, email enhancement, and the MCP integration. Bring your own API key — no usage fees from Cleanmails.</p>

        <h2>Supported Providers</h2>
        <table>
          <thead><tr><th>Provider</th><th>Models</th></tr></thead>
          <tbody>
            <tr><td><strong>OpenAI</strong></td><td>gpt-5.4-nano, gpt-5.4-mini, gpt-oss-20b, gpt-4.1, gpt-4.1-mini</td></tr>
            <tr><td><strong>Claude (Anthropic)</strong></td><td>claude-haiku-4-5, claude-sonnet-4-6, claude-opus-4, claude-sonnet-4, claude-3-5-haiku</td></tr>
            <tr><td><strong>Gemini (Google)</strong></td><td>gemini-3.1-flash-lite, gemini-3-flash-preview, gemini-2.5-flash, gemini-2.5-pro</td></tr>
            <tr><td><strong>Groq</strong></td><td>llama-3.1-8b-instant, llama-4-scout-17b, gpt-oss-20b, llama-3.3-70b, qwen-qwq-32b</td></tr>
            <tr><td><strong>AWS Bedrock</strong></td><td>amazon.nova-micro, amazon.nova-lite, claude-haiku-4-5, amazon.nova-pro, claude-sonnet-4</td></tr>
            <tr><td><strong>OpenRouter</strong></td><td>openrouter/free, gpt-oss-20b, llama-3.3-70b, claude-haiku-4-5, gemini-3.1-flash-lite</td></tr>
          </tbody>
        </table>

        <h2>Setup</h2>
        <ol>
          <li>Go to <strong>Settings → AI</strong> tab</li>
          <li>Select your provider from the dropdown</li>
          <li>Enter your API key</li>
          <li>Select a model (each provider shows 5 options)</li>
          <li>Click <strong>Test Connection</strong> to verify</li>
          <li>Save</li>
        </ol>

        <Callout type="info" title="Key security">
          <p>API keys are encrypted with AES-256-GCM before storage. They are never exposed in API responses — the dashboard only shows whether a key is configured (has_ai_key: true/false).</p>
        </Callout>

        <h2>AI Auto-Reply</h2>
        <p>When enabled per campaign, the AI will automatically draft and send replies to inbound emails from leads:</p>
        <ul>
          <li>Triggered when a lead replies to a campaign email</li>
          <li>Uses the last 5 messages in the thread for context</li>
          <li>Respects a per-campaign AI context prompt (you define the tone, product, goals)</li>
          <li>Adds a human-mimicry delay (1–5 minutes) before sending</li>
          <li>Sends with correct threading headers (In-Reply-To, References)</li>
          <li>Max 3 AI replies per thread (loop prevention)</li>
          <li>Never replies to bounces or system emails</li>
        </ul>

        <h3>Enabling Auto-Reply</h3>
        <p>In the campaign builder (Step 6: Scheduler):</p>
        <ol>
          <li>Toggle <strong>AI Auto-Reply</strong> ON</li>
          <li>Write an AI context prompt explaining your product/service and reply guidelines</li>
        </ol>

        <h2>AI Email Enhancer</h2>
        <p>Rewrite email content in the campaign builder without losing personalization variables:</p>
        <ul>
          <li><strong>Rewrite</strong> — Full rewrite maintaining intent</li>
          <li><strong>Shorten</strong> — Make the email more concise</li>
          <li><strong>Formal</strong> — Adjust tone to professional</li>
          <li><strong>Remove Spam</strong> — Rephrase spam trigger words</li>
        </ul>
        <p>The enhancer extracts <code>{'{'}{'{'}</code> variables and spintax before sending to the LLM, then restores them in the output — so your personalization is preserved.</p>

        <h2>Token Budget</h2>
        <p>Each workspace has a configurable daily token cap (default: 10,000 tokens). This prevents runaway costs from AI auto-replies:</p>
        <ul>
          <li>Token usage is tracked per request (prompt + completion)</li>
          <li>When the cap is reached, AI features are disabled until the next daily reset</li>
          <li>The reset runs as a periodic background task</li>
          <li>Configure the cap in Settings → AI → Daily Token Cap</li>
        </ul>

        <h2>Settings API</h2>
        <table>
          <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>GET</td><td><code>/api/v1/workspaces/:wid/settings</code></td><td>Get AI config (provider, model, has_key, tokens_used)</td></tr>
            <tr><td>PUT</td><td><code>/api/v1/workspaces/:wid/settings</code></td><td>Update provider, key, model, token cap</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/settings/test-ai</code></td><td>Test AI connection (sends &quot;Say hello&quot;)</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/ai/enhance</code></td><td>Enhance/rewrite email content</td></tr>
            <tr><td>POST</td><td><code>/api/v1/workspaces/:wid/ai/spam-check</code></td><td>Check email for 200+ spam trigger words</td></tr>
          </tbody>
        </table>

        <Callout type="tip" title="Cost-effective setup">
          <p>For auto-reply, use a fast/cheap model (Gemini 3.1 Flash Lite, GPT-5.4-nano, or Groq Llama). For email enhancement, use a higher-quality model (GPT-4.1, Claude Sonnet 4). You can switch models anytime from Settings.</p>
        </Callout>
      </div>
    </DocsLayout>
  )
}
