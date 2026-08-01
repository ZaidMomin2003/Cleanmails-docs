import DocsLayout from '@/components/DocsLayout'
import Callout from '@/components/Callout'
import CodeBlock from '@/components/CodeBlock'

export const metadata = { title: 'Spintax & Personalization' }

export default function PersonalizationPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">
          Campaigns
        </span>
        <h1>Spintax & Personalization</h1>
        <p>
          Cleanmails supports three layers of dynamic content in your campaign emails: 
          spintax for variation, personalization tags for lead data, and AI tags for Gemini-powered content generation.
        </p>

        <h2>Spintax</h2>
        <p>
          Spintax creates random variations of your email so each recipient gets a slightly different version. 
          This improves deliverability by avoiding duplicate content detection.
        </p>

        <h3>Syntax</h3>
        <CodeBlock language="text" code={`{option1|option2|option3}`} />

        <h3>Examples</h3>
        <CodeBlock language="text" filename="Subject Line" code={`{Hey|Hi|Hello} {{FIRST_NAME}}, {quick question|wanted to reach out|thought of you}`} />

        <CodeBlock language="html" filename="Email Body" code={`<p>{I noticed|I saw|I came across} your work at {{COMPANY}} and {wanted to reach out|thought we should connect}.</p>

<p>{Would you be open to|Are you interested in|Could we schedule} a {quick call|brief chat|15-min conversation} this week?</p>

<p>{Best regards|Cheers|Thanks},<br>{Alex|Jordan|Sam}</p>`} />

        <p>Spintax can be nested and used in both subject lines and body content. Each send picks a random combination.</p>

        <h2>Personalization Tags</h2>
        <p>Insert lead-specific data using double curly braces:</p>

        <table>
          <thead>
            <tr><th>Tag</th><th>Resolves To</th></tr>
          </thead>
          <tbody>
            <tr><td><code>{`{{NAME}}`}</code> or <code>{`{{FIRST_NAME}}`}</code></td><td>Lead&apos;s first name</td></tr>
            <tr><td><code>{`{{LAST_NAME}}`}</code></td><td>Lead&apos;s last name</td></tr>
            <tr><td><code>{`{{COMPANY}}`}</code></td><td>Lead&apos;s company</td></tr>
            <tr><td><code>{`{{EMAIL}}`}</code></td><td>Lead&apos;s email address</td></tr>
            <tr><td><code>{`{{custom_field}}`}</code></td><td>Any field from lead&apos;s ExtraData JSON</td></tr>
          </tbody>
        </table>

        <h3>Fallback Values</h3>
        <p>If a field is empty, provide a fallback with the pipe character:</p>

        <CodeBlock language="text" code={`{{FIRST_NAME | "there"}}
{{COMPANY | "your company"}}`} />

        <p>If the lead has no first name, it renders as &quot;there&quot; instead of blank.</p>

        <h2>AI Tags (Gemini Integration)</h2>
        <p>
          Generate dynamic, AI-personalized content for each lead using the Gemini API. 
          AI tags are processed at send time with the lead&apos;s context.
        </p>

        <h3>Syntax</h3>
        <CodeBlock language="text" code={`{{AI:prompt|fallback}}`} />

        <h3>Examples</h3>
        <CodeBlock language="html" filename="AI-Personalized Email" code={`<p>Hi {{FIRST_NAME}},</p>

<p>{{AI:Write a one-sentence compliment about their company based on what they do|I've been following your company's growth}}</p>

<p>{{AI:Generate a personalized reason why our email tool would help them|We help companies like yours scale outreach without monthly fees}}.</p>

<p>Would love to chat — are you free this week?</p>`} />

        <Callout type="info" title="How AI Tags Work">
          <p>Each AI tag sends a prompt to Gemini with the lead&apos;s name, company, and your instruction. Results are cached for 24 hours to avoid duplicate API calls for similar leads.</p>
        </Callout>

        <h3>Configuration</h3>
        <p>To use AI tags, configure your Gemini API key in <strong>Settings → AI Settings</strong>:</p>
        <ul>
          <li><strong>Gemini API Key</strong> — Get from <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer">Google AI Studio</a></li>
          <li><strong>Model</strong> — Default: <code>gemini-2.5-flash</code> (options: gemini-2.5-pro, gemini-2.5-flash-lite)</li>
        </ul>

        <h3>Safety Features</h3>
        <ul>
          <li><strong>Rate limiting</strong> — Configurable requests/second (default: 10)</li>
          <li><strong>Circuit breaker</strong> — After 5 consecutive failures, AI tags fall back to the fallback text</li>
          <li><strong>Caching</strong> — Results cached for 24h (up to 1000 entries) to reduce API costs</li>
          <li><strong>Graceful degradation</strong> — If no API key is set, AI tags silently use the fallback value</li>
        </ul>

        <h2>Processing Order</h2>
        <p>When an email is sent, content is processed in this order:</p>
        <ol>
          <li><strong>Personalization</strong> — <code>{`{{NAME}}`}</code>, <code>{`{{COMPANY}}`}</code> replaced with lead data</li>
          <li><strong>Spintax</strong> — <code>{`{option1|option2}`}</code> randomly resolved</li>
          <li><strong>AI Tags</strong> — <code>{`{{AI:prompt|fallback}}`}</code> sent to Gemini with lead context</li>
          <li><strong>Link wrapping</strong> — URLs wrapped for click tracking (if enabled)</li>
          <li><strong>Unsubscribe footer</strong> — Added automatically</li>
          <li><strong>Open pixel</strong> — Inserted (if tracking enabled)</li>
        </ol>
      </div>
    </DocsLayout>
  )
}
