import DocsLayout from '@/components/DocsLayout'
import Callout from '@/components/Callout'
import CodeBlock from '@/components/CodeBlock'

export const metadata = { title: 'A/B Testing' }

export default function ABTestingPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">
          Campaigns
        </span>
        <h1>A/B Testing</h1>
        <p>Test multiple subject lines per step to find what resonates best with your audience. Cleanmails automatically picks the winner after enough data.</p>

        <h2>How It Works</h2>
        <ol>
          <li>Add multiple subject lines to any campaign step (stored as a JSON array)</li>
          <li>Cleanmails distributes sends evenly across variants (round-robin)</li>
          <li>Once each variant reaches 100 sends, the system compares open rates</li>
          <li>The variant with the highest open rate becomes the auto-winner</li>
          <li>All subsequent sends use only the winning subject</li>
        </ol>

        <h2>Setting Up A/B Test</h2>
        <p>In the campaign step editor, add multiple subjects:</p>
        <CodeBlock language="json" filename="Step subjects (JSON array)" code={`[
  "Hey {{FIRST_NAME}}, quick question about {{COMPANY}}",
  "{{FIRST_NAME}} — saw your work at {{COMPANY}}",
  "Idea for {{COMPANY}}'s outreach"
]`} />

        <h2>Viewing Results</h2>
        <p>Check per-variant stats via the API:</p>
        <CodeBlock language="bash" code={`curl http://YOUR_SERVER/v1/outreach/campaigns/ab-stats/CAMPAIGN_ID`} />

        <p>Returns:</p>
        <CodeBlock language="json" code={`[
  {"subject_variant": 0, "sends": 150, "opens": 45, "clicks": 12, "replies": 5, "open_rate": 30.0, "click_rate": 8.0, "reply_rate": 3.3},
  {"subject_variant": 1, "sends": 148, "opens": 52, "clicks": 15, "replies": 8, "open_rate": 35.1, "click_rate": 10.1, "reply_rate": 5.4},
  {"subject_variant": 2, "sends": 147, "opens": 38, "clicks": 9, "replies": 3, "open_rate": 25.9, "click_rate": 6.1, "reply_rate": 2.0}
]`} />

        <h2>Auto-Winner Threshold</h2>
        <p>The auto-winner is selected when <strong>all variants have at least 100 sends</strong>. The variant with the highest open rate (excluding bot opens) wins.</p>

        <Callout type="info" title="Bot detection">
          <p>Cleanmails filters out bot opens (Barracuda, Proofpoint, Apple Privacy Proxy, etc.) and suspiciously fast opens (&lt;2 seconds after delivery) from A/B calculations.</p>
        </Callout>

        <Callout type="tip" title="Best practice">
          <p>Test 2-3 variants max. More variants means more sends needed before a winner is declared. Focus on testing one variable at a time (e.g., personalization vs. curiosity gap).</p>
        </Callout>
      </div>
    </DocsLayout>
  )
}
