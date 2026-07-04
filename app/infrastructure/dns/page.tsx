import DocsLayout from '@/components/DocsLayout'
import Link from 'next/link'

export const metadata = { title: 'DNS Setup (SPF/DKIM/DMARC)' }

export default function DNSPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">
          Senders & Domains
        </span>
        <h1>DNS Setup (SPF/DKIM/DMARC)</h1>
        <p>Proper DNS configuration is critical for email deliverability. This page explains each record and how Cleanmails uses them.</p>
        <p>For step-by-step instructions on adding these records, see <Link href="/infrastructure/domains">Adding Domains</Link>.</p>

        <h2>SPF (Sender Policy Framework)</h2>
        <p>SPF tells receiving servers which IPs are authorized to send email for your domain.</p>
        <ul>
          <li>Cleanmails auto-generates the SPF value using your server&apos;s public IP</li>
          <li>Format: <code>v=spf1 ip4:YOUR_IP ~all</code></li>
          <li>The <code>~all</code> (softfail) is recommended over <code>-all</code> (hardfail) during initial setup</li>
        </ul>

        <h2>DKIM (DomainKeys Identified Mail)</h2>
        <p>DKIM cryptographically signs each email so receivers can verify it wasn&apos;t tampered with.</p>
        <ul>
          <li>Cleanmails generates a 2048-bit RSA key pair when you add a domain</li>
          <li>The private key is stored encrypted in the database</li>
          <li>Every outgoing email is signed with the private key</li>
          <li>Selector: <code>postal</code> (configurable per domain)</li>
          <li>DNS record: <code>postal._domainkey.yourdomain.com</code></li>
        </ul>

        <h2>DMARC (Domain-based Message Authentication)</h2>
        <p>DMARC tells receivers what to do when SPF or DKIM fails.</p>
        <ul>
          <li>Default policy: <code>p=none</code> (monitor only, no blocking)</li>
          <li>Recommended to start with <code>none</code> and move to <code>quarantine</code> after confirming deliverability</li>
          <li>The <code>rua</code> tag specifies where aggregate reports are sent</li>
        </ul>

        <h2>MX Records</h2>
        <p>MX records are needed if you want to receive replies through your domain (recommended for reply detection).</p>
        <ul>
          <li>Point MX to your mail server hostname</li>
          <li>Priority 10 is standard</li>
        </ul>

        <h2>Verification</h2>
        <p>Cleanmails performs real DNS lookups when you click &quot;Verify&quot;:</p>
        <ul>
          <li><strong>SPF:</strong> Looks up TXT records for <code>v=spf1</code></li>
          <li><strong>DKIM:</strong> Looks up TXT at <code>postal._domainkey.yourdomain.com</code> and compares the <code>p=</code> value</li>
          <li><strong>MX:</strong> Checks for any MX records on the domain</li>
          <li><strong>DMARC:</strong> Looks up TXT at <code>_dmarc.yourdomain.com</code></li>
        </ul>
        <p>Domain status becomes <strong>active</strong> when both SPF and DKIM pass.</p>
      </div>
    </DocsLayout>
  )
}
