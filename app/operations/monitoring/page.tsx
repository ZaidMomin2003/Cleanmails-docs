import DocsLayout from '@/components/DocsLayout'
import CodeBlock from '@/components/CodeBlock'

export const metadata = { title: 'Monitoring & Health' }

export default function MonitoringPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">Operations</span>
        <h1>Monitoring & Health</h1>
        <p>Cleanmails provides health endpoints and Docker-native monitoring for your instance.</p>

        <h2>Basic Health Check</h2>
        <CodeBlock language="bash" code={`curl http://YOUR_SERVER/health`} />
        <p>Returns <code>200 OK</code> with <code>{`{"status":"ok"}`}</code> if the API server and PostgreSQL database are healthy. Returns <code>500</code> if the database connection is lost or ping fails.</p>

        <h2>Docker Health Checks</h2>
        <p>All containers have built-in health checks that Docker monitors continuously:</p>
        <table>
          <thead><tr><th>Service</th><th>Health Check</th><th>Interval</th></tr></thead>
          <tbody>
            <tr><td>PostgreSQL</td><td><code>pg_isready -U cleanmails</code></td><td>5s</td></tr>
            <tr><td>Redis</td><td><code>redis-cli ping</code></td><td>5s</td></tr>
            <tr><td>API</td><td><code>curl -f http://localhost:8080/health</code></td><td>10s</td></tr>
            <tr><td>Frontend</td><td><code>wget --spider http://localhost:3000</code></td><td>10s</td></tr>
          </tbody>
        </table>

        <h2>Checking Service Status</h2>
        <CodeBlock language="bash" code={`cd /opt/cleanmails
docker compose -f docker-compose.prod.yml ps`} />
        <p>This shows all containers with their current state and health status.</p>

        <h2>Queue Monitoring</h2>
        <p>The admin dashboard includes a Queue Health Monitor at <code>/dashboard/admin/queues</code> showing pending, active, completed, and failed jobs per queue. The background worker uses three priority queues:</p>
        <table>
          <thead><tr><th>Queue</th><th>Priority</th><th>Tasks</th></tr></thead>
          <tbody>
            <tr><td><code>critical</code></td><td>6</td><td>Bounce/complaint handling</td></tr>
            <tr><td><code>default</code></td><td>3</td><td>Campaign dispatch, lead validation</td></tr>
            <tr><td><code>low</code></td><td>1</td><td>IMAP sync, AI replies, warmup</td></tr>
          </tbody>
        </table>

        <h2>Application Logs</h2>
        <CodeBlock language="bash" code={`cd /opt/cleanmails

# All services
docker compose -f docker-compose.prod.yml logs -f

# API only
docker compose -f docker-compose.prod.yml logs -f api

# Worker only
docker compose -f docker-compose.prod.yml logs -f worker

# Last 100 lines
docker compose -f docker-compose.prod.yml logs --tail=100 api`} />

        <h2>Worker Tasks</h2>
        <p>The worker processes these background tasks (logged at startup):</p>
        <table>
          <thead><tr><th>Task</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>imap:sync</code></td><td>Sync inbound emails from IMAP mailboxes</td></tr>
            <tr><td><code>imap:schedule_sync</code></td><td>Schedule periodic IMAP syncs for all mailboxes</td></tr>
            <tr><td><code>ai:reply</code></td><td>Generate and send AI auto-replies</td></tr>
            <tr><td><code>ai:reset_daily_tokens</code></td><td>Reset daily AI token budgets</td></tr>
            <tr><td><code>campaign:dispatch</code></td><td>Send scheduled campaign emails</td></tr>
            <tr><td><code>system:reset_daily_caps</code></td><td>Reset daily send limits per mailbox</td></tr>
            <tr><td><code>webhook:dispatch</code></td><td>Deliver webhook payloads to subscribers</td></tr>
            <tr><td><code>leads:validate</code></td><td>Validate lead email addresses</td></tr>
            <tr><td><code>system:license_check</code></td><td>Periodic license validation</td></tr>
            <tr><td><code>warmup:cycle</code></td><td>Send warmup emails on schedule</td></tr>
            <tr><td><code>warmup:reply</code></td><td>Auto-reply to warmup emails</td></tr>
          </tbody>
        </table>

        <h2>Resource Usage</h2>
        <CodeBlock language="bash" code={`# Check memory usage per container
docker stats --no-stream

# Check disk usage
docker system df`} />
        <p>Production memory limits are set per container (total ~1.5GB for the full stack). See the <a href="/config/docker">Docker Compose</a> page for details.</p>

        <h2>Common Alerts to Watch</h2>
        <ul>
          <li><strong>API unhealthy</strong> — Check PostgreSQL connectivity and disk space</li>
          <li><strong>Worker not processing</strong> — Check Redis connectivity and worker logs</li>
          <li><strong>High bounce rate</strong> — Campaign auto-pauses at 5% bounce rate</li>
          <li><strong>IMAP sync failures</strong> — Mailbox credentials may have expired</li>
          <li><strong>License check failures</strong> — Network connectivity to license server</li>
        </ul>
      </div>
    </DocsLayout>
  )
}
