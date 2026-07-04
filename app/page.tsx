import DocsLayout from '@/components/DocsLayout'
import Callout from '@/components/Callout'
import CodeBlock from '@/components/CodeBlock'
import Link from 'next/link'

export default function DocsHome() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <div className="mb-8">
          <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">
            Documentation
          </span>
          <h1>Cleanmails Documentation</h1>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed">
            Cleanmails is a self-hosted cold email infrastructure platform. It combines email validation, 
            multi-step campaign automation, sender rotation, mailbox warmup, AI personalization, and a full 
            outreach CRM — all deployed on your own VPS with a single command. No monthly fees, no usage caps.
          </p>
        </div>

        <Callout type="tip" title="New to Cleanmails?">
          <p>Start with the <Link href="/quick-deploy">Quick Deploy</Link> guide to get up and running in under 10 minutes.</p>
        </Callout>

        <h2>What You Get</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-6 not-prose">
          {[
            { icon: '✉️', title: 'Email Validation', desc: '33k+ disposable blocklist, MX checks, role detection, scoring', href: '/validation/overview' },
            { icon: '🚀', title: 'Campaign Automation', desc: 'Multi-step sequences, A/B variants, scheduling, AI tags', href: '/campaigns/creating' },
            { icon: '🔄', title: 'Sender Rotation', desc: 'Unlimited mailboxes, round-robin rotation, daily limits', href: '/infrastructure/rotation' },
            { icon: '🔥', title: 'Mailbox Warmup', desc: 'Coordinated pool warmup with auto-reply and spam rescue', href: '/infrastructure/warmup' },
            { icon: '🤖', title: 'AI & MCP', desc: '6 providers (OpenAI, Claude, Gemini, Groq, Bedrock, OpenRouter)', href: '/ai/mcp' },
            { icon: '🔗', title: 'Integrations', desc: 'Webhooks, Slack/Discord/Telegram, HubSpot CRM', href: '/integrations/webhooks' },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="no-underline group">
              <div className="border border-[var(--border)] rounded-lg p-4 bg-[var(--card-bg)] hover:bg-[var(--bg-hover)] transition-colors h-full">
                <span className="text-xl mb-2 block">{item.icon}</span>
                <p className="text-[14px] font-semibold text-[var(--text)] mb-1 group-hover:underline group-hover:decoration-[var(--border-strong)] group-hover:underline-offset-2">{item.title}</p>
                <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <h2>Quick Start</h2>
        <p>Deploy Cleanmails on any Ubuntu/Debian VPS with a single command:</p>

        <CodeBlock
          language="bash"
          code={`curl -fsSL https://cleanmails.online/install.sh | sudo bash -s -- --domain app.yourdomain.com`}
        />

        <p>This installs Docker, downloads the latest release from S3, builds the container images, generates secure encryption keys, configures Caddy for automatic SSL, and starts the full stack. The whole process takes 2-5 minutes.</p>

        <h2>Requirements</h2>
        <table>
          <thead>
            <tr><th>Requirement</th><th>Minimum</th><th>Recommended</th></tr>
          </thead>
          <tbody>
            <tr><td>OS</td><td>Ubuntu 22.04 / Debian 12</td><td>Ubuntu 22.04 LTS</td></tr>
            <tr><td>CPU</td><td>1 vCPU</td><td>4 vCPU</td></tr>
            <tr><td>RAM</td><td>1 GB</td><td>4 GB</td></tr>
            <tr><td>Storage</td><td>5 GB SSD</td><td>50 GB SSD</td></tr>
            <tr><td>Port 25</td><td colSpan={2}>Must be unblocked by VPS provider</td></tr>
          </tbody>
        </table>

        <Callout type="warning" title="Port 25 is critical">
          <p>Most VPS providers block outbound port 25 by default. You must request it be unblocked before deploying. Without it, email validation and sending will not work.</p>
        </Callout>

        <h2>Architecture Overview</h2>
        <p>Cleanmails runs as a single Docker Compose stack with six containers:</p>
        <ul>
          <li><strong>API Server</strong> — Go (Gin) backend handling all REST endpoints (port 8080 internal)</li>
          <li><strong>Worker</strong> — Background job processor (campaign dispatch, IMAP sync, AI replies, warmup, validation)</li>
          <li><strong>Frontend</strong> — Next.js React dashboard (port 3000 internal)</li>
          <li><strong>PostgreSQL 16</strong> — Primary database for all application data</li>
          <li><strong>Redis 7</strong> — Task queue (Asynq) and caching layer</li>
          <li><strong>Caddy</strong> — Reverse proxy with automatic Let&apos;s Encrypt SSL (ports 80/443)</li>
        </ul>
        <p>All data is stored in PostgreSQL with workspace-level isolation. Redis powers the Asynq background job system with priority queues (critical, default, low). Backups use <code>pg_dump</code> with automatic rotation.</p>

        <h2>Support</h2>
        <p>
          Need help? Reach out via the <a href="https://cleanmails.online/support.html" target="_blank" rel="noopener noreferrer">support page</a> or 
          use the AI Copilot built into your dashboard for instant answers about your workspace.
        </p>
      </div>
    </DocsLayout>
  )
}
