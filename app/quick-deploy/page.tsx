import DocsLayout from '@/components/DocsLayout'
import Callout from '@/components/Callout'
import CodeBlock from '@/components/CodeBlock'
import Step from '@/components/Step'
import CommandGenerator from '@/components/CommandGenerator'
import Link from 'next/link'

export const metadata = { title: 'Quick Deploy' }

export default function QuickDeployPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">
          Getting Started
        </span>
        <h1>Quick Deploy</h1>
        <p>
          Go from zero to a fully working Cleanmails instance in under 10 minutes. 
          No coding required — just a VPS and your license key.
        </p>

        <h2>What is a VPS?</h2>
        <p>
          A <strong>VPS (Virtual Private Server)</strong> is a computer that stays on 24/7 in a data center. 
          Instead of running Cleanmails on your laptop, you run it on a VPS so it can handle thousands of emails while you sleep.
        </p>

        <Callout type="info" title="Recommended VPS Providers">
          <p>We recommend <strong>Contabo</strong>, <strong>Hetzner</strong>, or <strong>DigitalOcean</strong>. Choose a plan with at least 1GB RAM (4GB recommended) and Ubuntu 22.04 as the operating system.</p>
        </Callout>

        <h2>Step-by-Step Setup</h2>

        <Step number={1} title="Get your VPS & connect via SSH">
          <p>Purchase a VPS with Ubuntu 22.04. You&apos;ll receive an IP address and root password.</p>
          <p><strong>Windows users:</strong> Download <a href="https://www.putty.org/" target="_blank" rel="noopener noreferrer">Putty</a>, enter your VPS IP, click Open, login as <code>root</code>.</p>
          <p><strong>Mac/Linux users:</strong> Open Terminal and run:</p>
        </Step>

        <CodeBlock language="bash" code="ssh root@YOUR_VPS_IP" />

        <Callout type="tip" title="How to paste in terminal">
          <p>In most terminals (Putty, etc.), you don&apos;t use Ctrl+V. Just <strong>right-click</strong> inside the terminal window to paste.</p>
        </Callout>

        <Step number={2} title="Point your domain to your VPS IP">
          <p>Create an <strong>A record</strong> pointing your domain to your VPS IP address before running the installer. This is needed for SSL provisioning.</p>
        </Step>

        <table>
          <thead>
            <tr><th>Type</th><th>Name</th><th>Value</th></tr>
          </thead>
          <tbody>
            <tr><td>A</td><td>app (or @)</td><td>YOUR_VPS_IP</td></tr>
          </tbody>
        </table>

        <Step number={3} title="Run the installer">
          <p>Use the command generator below to create your personalized install command, then paste it into your terminal.</p>
        </Step>

        <CommandGenerator />

        <p>The installer will:</p>
        <ol>
          <li>Run preflight checks (root, RAM, disk, port availability)</li>
          <li>Install Docker Engine and Docker Compose (if not present)</li>
          <li>Download the latest release from the Cleanmails S3 bucket</li>
          <li>Build Docker images (API, Worker, Frontend)</li>
          <li>Generate secure secrets (AES-256 encryption key, JWT secret, DB password)</li>
          <li>Configure Caddy reverse proxy with security headers</li>
          <li>Start the full stack (PostgreSQL, Redis, API, Worker, Frontend, Caddy)</li>
          <li>Auto-provision SSL certificate via Let&apos;s Encrypt</li>
        </ol>

        <Step number={4} title="Point your domain">
          <p>Create an <strong>A record</strong> pointing your domain to your VPS IP address:</p>
        </Step>

        <table>
          <thead>
            <tr><th>Type</th><th>Name</th><th>Value</th></tr>
          </thead>
          <tbody>
            <tr><td>A</td><td>app (or @)</td><td>YOUR_VPS_IP</td></tr>
          </tbody>
        </table>

        <Step number={5} title="Set Reverse DNS (rDNS/PTR)">
          <p>Go to your VPS provider&apos;s control panel and set the PTR record to your domain. This is critical for email deliverability.</p>
        </Step>

        <Step number={6} title="Complete the setup wizard">
          <p>Open your domain in a browser. You&apos;ll see the initialization page where you create your admin account.</p>
        </Step>

        <Callout type="warning" title="Save your password!">
          <p>There is no &quot;Forgot Password&quot; button because your data is private and self-hosted. Write down your admin credentials.</p>
        </Callout>

        <h2>What&apos;s Next?</h2>
        <ul>
          <li><Link href="/license">Activate your license</Link></li>
          <li><Link href="/infrastructure/domains">Add a sending domain</Link></li>
          <li><Link href="/infrastructure/senders">Create mailboxes</Link></li>
          <li><Link href="/campaigns/creating">Launch your first campaign</Link></li>
        </ul>
      </div>
    </DocsLayout>
  )
}
