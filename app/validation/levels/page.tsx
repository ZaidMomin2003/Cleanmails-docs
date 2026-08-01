import DocsLayout from '@/components/DocsLayout'
import Callout from '@/components/Callout'

export const metadata = { title: 'Validation Scoring' }

export default function LevelsPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">Email Validation</span>
        <h1>Validation Scoring</h1>
        <p>cold mail assigns a score from 0–100 to each validated lead. This page explains exactly how the scoring algorithm works.</p>

        <h2>Scoring Breakdown</h2>
        <p>Points are added based on each check that passes:</p>
        <table>
          <thead><tr><th>Check</th><th>Points</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>Valid syntax (RFC 5322)</td><td>+20</td><td>If syntax fails → score is 0, status: invalid</td></tr>
            <tr><td>Has MX records</td><td>+35</td><td>If no MX → score is 10, status: invalid</td></tr>
            <tr><td>Not a role account</td><td>+15</td><td>Role accounts (info@, admin@) get 0 here</td></tr>
            <tr><td>Not a free email</td><td>+15</td><td>Free providers (Gmail, Yahoo) get +5 instead</td></tr>
            <tr><td>Reachable: yes</td><td>+15</td><td>Domain suggestion / inference indicates reachable</td></tr>
            <tr><td>Reachable: unknown</td><td>+10</td><td>Can&apos;t determine reachability</td></tr>
            <tr><td>Reachable: no</td><td>-20</td><td>Strong signal that address doesn&apos;t exist</td></tr>
          </tbody>
        </table>

        <h2>Instant Failures</h2>
        <p>Some checks bypass the scoring and mark the lead as invalid immediately:</p>
        <table>
          <thead><tr><th>Condition</th><th>Score</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>Invalid syntax</td><td>0</td><td>Invalid</td></tr>
            <tr><td>Disposable domain</td><td>5</td><td>Invalid</td></tr>
            <tr><td>No MX records</td><td>10</td><td>Invalid</td></tr>
          </tbody>
        </table>

        <h2>Status Categories</h2>
        <table>
          <thead><tr><th>Score Range</th><th>Status</th><th>Dashboard Color</th><th>Recommendation</th></tr></thead>
          <tbody>
            <tr><td>60–100</td><td>Valid</td><td>Green</td><td>Safe to include in campaigns</td></tr>
            <tr><td>35–59</td><td>Risky</td><td>Amber</td><td>May bounce — consider excluding from cold outreach</td></tr>
            <tr><td>0–34</td><td>Invalid</td><td>Red</td><td>Do not send — will damage sender reputation</td></tr>
          </tbody>
        </table>

        <h2>Example Scores</h2>
        <table>
          <thead><tr><th>Email</th><th>Score</th><th>Reason</th></tr></thead>
          <tbody>
            <tr><td>john@company.com</td><td>85</td><td>Valid syntax (+20), MX found (+35), not role (+15), not free (+15)</td></tr>
            <tr><td>john@gmail.com</td><td>75</td><td>Valid syntax (+20), MX found (+35), not role (+15), free email (+5)</td></tr>
            <tr><td>info@company.com</td><td>70</td><td>Valid syntax (+20), MX found (+35), role account (+0), not free (+15)</td></tr>
            <tr><td>john@throwaway.io</td><td>5</td><td>Disposable domain → instant invalid</td></tr>
            <tr><td>john@nonexistentdomain.xyz</td><td>10</td><td>No MX records → instant invalid</td></tr>
          </tbody>
        </table>

        <h2>Validation Checks in Detail</h2>
        <table>
          <thead><tr><th>Check</th><th>Speed</th><th>What It Does</th></tr></thead>
          <tbody>
            <tr><td>Syntax</td><td>&lt;1ms</td><td>RFC 5322 regex validation</td></tr>
            <tr><td>Disposable</td><td>&lt;1ms</td><td>In-memory lookup against 120,000+ known throwaway domains</td></tr>
            <tr><td>Role Account</td><td>&lt;1ms</td><td>Pattern match: info@, admin@, support@, etc.</td></tr>
            <tr><td>Free Provider</td><td>&lt;1ms</td><td>Known free providers: Gmail, Yahoo, Outlook, ProtonMail, etc.</td></tr>
            <tr><td>DNS MX Lookup</td><td>~50-100ms</td><td>Queries domain for mail exchange records</td></tr>
            <tr><td>DNS A Fallback</td><td>~50ms</td><td>If no MX, checks for an A record (implicit MX)</td></tr>
            <tr><td>Domain Suggestion</td><td>~5ms</td><td>Levenshtein distance to suggest typo corrections</td></tr>
          </tbody>
        </table>

        <Callout type="info" title="Concurrency">
          <p>Validation runs 100 leads in parallel. Each goroutine performs one DNS lookup (~50-100ms) — no heavy CPU or memory usage. A 5,000-lead list typically completes in under 30 seconds.</p>
        </Callout>

        <h2>Filtering by Status</h2>
        <p>In the dashboard, the lead list view shows a validation summary bar with clickable filters:</p>
        <ul>
          <li><strong>All</strong> — Show all leads regardless of status</li>
          <li><strong>Valid</strong> — Only leads scored 60+</li>
          <li><strong>Risky</strong> — Only leads scored 35–59</li>
          <li><strong>Invalid</strong> — Only leads scored 0–34</li>
        </ul>
        <p>Use these filters to quickly exclude bad leads before assigning them to campaigns.</p>
      </div>
    </DocsLayout>
  )
}
