import DocsLayout from '@/components/DocsLayout'
import CodeBlock from '@/components/CodeBlock'

export const metadata = { title: 'Troubleshooting' }

export default function TroubleshootingPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">
          Operations
        </span>
        <h1>Troubleshooting</h1>
        <p>Common issues and their solutions.</p>

        <h2>Common Issues</h2>

        <table>
          <thead>
            <tr><th>Problem</th><th>Solution</th></tr>
          </thead>
          <tbody>
            <tr><td>Server won&apos;t start</td><td>Check logs: <code>docker compose -f docker-compose.prod.yml logs api</code>. Usually a missing env var or database connection issue.</td></tr>
            <tr><td>Port 25 blocked</td><td>Contact your VPS provider to unblock outbound port 25. Test with <code>nc -zv gmail-smtp-in.l.google.com 25</code></td></tr>
            <tr><td>License activation fails</td><td>Ensure your server can reach the internet. Check <code>docker compose -f docker-compose.prod.yml logs api | grep license</code></td></tr>
            <tr><td>Emails going to spam</td><td>Ensure SPF/DKIM/DMARC are configured. Warm up mailboxes for 2–3 weeks before campaigns.</td></tr>
            <tr><td>Campaign not sending</td><td>Check: status is &quot;active&quot;, current time is within send window, mailboxes are assigned, leads have next_send_at set.</td></tr>
            <tr><td>Warmup not working</td><td>Requires active license. Check coordinator connectivity: worker logs should show &quot;[Warmup] Got X tasks&quot;</td></tr>
            <tr><td>SMTP test fails</td><td>Verify host/port/credentials. Try TLS port 587 or SSL port 465. Check if the provider requires an app password.</td></tr>
            <tr><td>IMAP sync not pulling replies</td><td>Check IMAP credentials are correct and port 993 is used. Check worker logs for &quot;[IMAP]&quot; errors.</td></tr>
            <tr><td>AI features not working</td><td>Check API key in Settings → AI. Use &quot;Test Connection&quot; to verify. Check daily token cap isn&apos;t exhausted.</td></tr>
            <tr><td>API returns 403</td><td>License may be revoked or expired. Check <code>/health</code> endpoint and license status in admin panel.</td></tr>
          </tbody>
        </table>

        <h2>Checking Logs</h2>

        <CodeBlock language="bash" code={`cd /opt/cleanmails

# All services
docker compose -f docker-compose.prod.yml logs -f

# API server only
docker compose -f docker-compose.prod.yml logs -f api

# Worker only (campaigns, warmup, IMAP, validation)
docker compose -f docker-compose.prod.yml logs -f worker

# Last 100 lines from API
docker compose -f docker-compose.prod.yml logs --tail=100 api

# PostgreSQL logs
docker compose -f docker-compose.prod.yml logs postgres`} />

        <h2>Health Check</h2>
        <CodeBlock language="bash" code={`# Basic health (checks DB connectivity)
curl http://localhost:8080/health

# Expected response:
# {"status":"ok"}

# If unhealthy:
# {"status":"error","detail":"db connection lost"}`} />

        <h2>Service Status</h2>
        <CodeBlock language="bash" code={`cd /opt/cleanmails
docker compose -f docker-compose.prod.yml ps

# Expected: all services should show "healthy" or "running"
# If a service is "restarting", check its logs`} />

        <h2>Database Issues</h2>

        <h3>Check PostgreSQL connectivity</h3>
        <CodeBlock language="bash" code={`# Test from host
docker compose -f docker-compose.prod.yml exec postgres pg_isready -U cleanmails

# Connect to database
docker compose -f docker-compose.prod.yml exec postgres psql -U cleanmails cleanmails`} />

        <h3>Restore from backup</h3>
        <CodeBlock language="bash" code={`cd /opt/cleanmails

# Stop app (keep postgres running)
docker compose -f docker-compose.prod.yml stop api worker frontend

# Restore
gunzip -c backups/cleanmails_backup_TIMESTAMP.sql.gz | \\
  docker compose -f docker-compose.prod.yml exec -T postgres psql -U cleanmails cleanmails

# Restart
docker compose -f docker-compose.prod.yml up -d`} />

        <h2>Redis Issues</h2>
        <CodeBlock language="bash" code={`# Check Redis is responding
docker compose -f docker-compose.prod.yml exec redis redis-cli ping
# Expected: PONG

# Check queue sizes
docker compose -f docker-compose.prod.yml exec redis redis-cli info clients`} />

        <h2>Email Deliverability Issues</h2>

        <h3>Check DNS records</h3>
        <CodeBlock language="bash" code={`# SPF
dig TXT yourdomain.com

# DKIM
dig TXT default._domainkey.yourdomain.com

# DMARC
dig TXT _dmarc.yourdomain.com

# MX
dig MX yourdomain.com`} />

        <h3>Check IP blacklists</h3>
        <p>Visit <a href="https://mxtoolbox.com/blacklists.aspx" target="_blank" rel="noopener noreferrer">MXToolbox Blacklist Check</a> and enter your server IP.</p>

        <h2>Resetting Admin Password</h2>
        <p>If you&apos;ve lost your admin password, reset it directly in PostgreSQL:</p>

        <CodeBlock language="bash" code={`cd /opt/cleanmails

# Generate a bcrypt hash (use an online tool or:)
docker compose -f docker-compose.prod.yml exec api sh -c \\
  'echo "UPDATE users SET password_hash=crypt(\\'NewPassword123\\', gen_salt(\\'bf\\')) WHERE email=\\'admin@example.com\\';" | psql -U cleanmails cleanmails'

# Or connect directly and update
docker compose -f docker-compose.prod.yml exec postgres psql -U cleanmails cleanmails

# Then restart to clear any cached sessions
docker compose -f docker-compose.prod.yml restart api`} />

        <h2>Force Restart All Services</h2>
        <CodeBlock language="bash" code={`cd /opt/cleanmails
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d`} />

        <h2>Getting Help</h2>
        <ul>
          <li>Check the <a href="https://cleanmails.online/support.html" target="_blank" rel="noopener noreferrer">Support page</a> for direct assistance</li>
          <li>Include your logs and health check output when reporting issues</li>
          <li>Mention your server OS, RAM, and Docker version</li>
        </ul>
      </div>
    </DocsLayout>
  )
}
