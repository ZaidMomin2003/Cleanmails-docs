import DocsLayout from '@/components/DocsLayout'
import Link from 'next/link'

export const metadata = { title: 'AI Tags (Gemini)' }

export default function AITagsPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">
          Campaigns
        </span>
        <h1>AI Tags (Gemini)</h1>
        <p>AI Tags are covered in detail on the <Link href="/campaigns/personalization">Spintax & Personalization</Link> page under the &quot;AI Tags&quot; section. They allow you to generate dynamic, per-lead content using Google&apos;s Gemini API at send time.</p>
        <p>Key points:</p>
        <ul>
          <li>Syntax: <code>{`{{AI:your prompt here|fallback text}}`}</code></li>
          <li>Requires Gemini API key configured in Settings → AI Settings</li>
          <li>Results are cached for 24 hours per lead+prompt combination</li>
          <li>Circuit breaker disables after 5 consecutive failures</li>
          <li>Rate limited (default 10 requests/second)</li>
        </ul>
        <p>See <Link href="/campaigns/personalization">full documentation →</Link></p>
      </div>
    </DocsLayout>
  )
}
