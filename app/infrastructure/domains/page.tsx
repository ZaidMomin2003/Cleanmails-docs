import DocsLayout from '@/components/DocsLayout'
import Callout from '@/components/Callout'
import CodeBlock from '@/components/CodeBlock'
import Step from '@/components/Step'

export const metadata = { title: 'Adding Domains' }

export default function DomainsPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">
          Senders & Domains
        </span>
        <h1>Adding Domains</h1>
        <p>
          Before you can send emails, you need to add and verify at least one sending domain. 
          Cold mail automatically generates DKIM keys and provides the DNS records you need to configure.
        </p>

        <h2>Adding a Domain (Dashboard)</h2>

        <Step number={1} title="Navigate to Domains">
          <p>Go to <strong>Infrastructure → Domains</strong> and click <strong>Add Domain</strong>.</p>
        </Step>

        <Step number={2} title="Enter your domain name">
          <p>Enter the domain you want to send from (e.g., <code>outreach.yourcompany.com</code>). We recommend using a subdomain rather than your primary domain.</p>
        </Step>

        <Step number={3} title="Configure DNS records">
          <p>After adding, cold mail shows you the DNS records to add. Go to your domain registrar (Cloudflare, Namecheap, GoDaddy, etc.) and add these records:</p>
        </Step>

        <h3>Required DNS Records</h3>

        <h4>SPF Record</h4>
        <CodeBlock language="text" filename="TXT Record" code={`Type: TXT
Name: @ (or subdomain)
Value: v=spf1 ip4:YOUR_SERVER_IP ~all`} />

        <h4>DKIM Record</h4>
        <CodeBlock language="text" filename="TXT Record" code={`Type: TXT
Name: postal._domainkey
Value: v=DKIM1; k=rsa; p=YOUR_PUBLIC_KEY_FROM_DASHBOARD`} />

        <h4>DMARC Record</h4>
        <CodeBlock language="text" filename="TXT Record" code={`Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com`} />

        <h4>MX Record (for receiving replies)</h4>
        <CodeBlock language="text" filename="MX Record" code={`Type: MX
Name: @ (or subdomain)
Priority: 10
Value: mail.yourdomain.com`} />

        <Step number={4} title="Verify DNS">
          <p>Click <strong>Verify</strong> in the dashboard. Cold mail checks all DNS records in real-time. Once SPF and DKIM pass, the domain status changes to <strong>Active</strong>.</p>
        </Step>

        <Callout type="info" title="DNS Propagation">
          <p>DNS changes can take up to 24-48 hours to propagate globally. If verification fails, wait and try again. You can check propagation with <code>dig TXT yourdomain.com</code>.</p>
        </Callout>

        <h2>How DKIM Works</h2>
        <p>When you add a domain, cold mail:</p>
        <ol>
          <li>Generates a 2048-bit RSA key pair</li>
          <li>Stores the private key securely (encrypted with your MASTER_KEY)</li>
          <li>Shows you the public key to add as a DNS TXT record</li>
          <li>Signs every outgoing email with the private key</li>
          <li>Receiving servers verify the signature against your DNS public key</li>
        </ol>

        <h2>Domain Status</h2>
        <table>
          <thead>
            <tr><th>Status</th><th>Meaning</th></tr>
          </thead>
          <tbody>
            <tr><td><code>pending</code></td><td>DNS records not yet verified</td></tr>
            <tr><td><code>active</code></td><td>SPF + DKIM verified — ready to send</td></tr>
            <tr><td><code>faulty</code></td><td>Previously active but DNS check now failing</td></tr>
          </tbody>
        </table>

        <h2>Best Practices</h2>
        <ul>
          <li><strong>Use subdomains</strong> — Send from <code>outreach.company.com</code> not <code>company.com</code> to protect your main domain reputation</li>
          <li><strong>Multiple domains</strong> — Use 3-5 domains for rotation to spread reputation risk</li>
          <li><strong>Warm up first</strong> — New domains need 2-3 weeks of warmup before cold outreach</li>
          <li><strong>Monitor health</strong> — Check domain verification status regularly in the dashboard</li>
        </ul>

        <Callout type="warning" title="Deleting domains">
          <p>You cannot delete a domain that has active senders. Remove or reassign all senders first.</p>
        </Callout>
      </div>
    </DocsLayout>
  )
}
