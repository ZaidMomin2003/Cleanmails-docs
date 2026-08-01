import DocsLayout from '@/components/DocsLayout'
import CodeBlock from '@/components/CodeBlock'
import Callout from '@/components/Callout'

export const metadata = { title: 'Self-Update' }

export default function UpdatesPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">Operations</span>
        <h1>Self-Update</h1>
        <p>Cold mail can update itself from the admin dashboard or via the included update script. Updates download the latest release from S3, rebuild Docker images, and restart all services.</p>

        <h2>Update via Dashboard</h2>
        <p>From the admin panel: <strong>Admin → System → Check for Updates</strong></p>
        <p>The API endpoints for system updates (super_admin only):</p>
        <CodeBlock language="bash" code={`# Check for updates
curl https://YOUR_SERVER/api/v1/admin/system/check-update \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN"

# Trigger update
curl -X POST https://YOUR_SERVER/api/v1/admin/system/update \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN"

# Get current version
curl https://YOUR_SERVER/api/v1/admin/system/version \\
  -H "Cookie: auth_token=YOUR_JWT_TOKEN"`} />

        <h2>Update via Script</h2>
        <p>SSH into your server and run:</p>
        <CodeBlock language="bash" code={`cd /opt/cleanmails
bash scripts/update.sh`} />

        <p>The update script performs these steps:</p>
        <ol>
          <li>Downloads the latest release tarball from S3</li>
          <li>Backs up current binaries to <code>/opt/cleanmails/backup/</code></li>
          <li>Extracts new files over the existing installation</li>
          <li>Rebuilds all Docker images (API, Worker, Frontend) with <code>--no-cache</code></li>
          <li>Restarts all services with <code>--force-recreate --remove-orphans</code></li>
          <li>Waits for the API health check to confirm successful startup</li>
          <li>Cleans up the backup directory on success</li>
        </ol>

        <Callout type="info" title="Zero-downtime restart">
          <p>During updates, Docker Compose recreates containers with dependency-based health checks. PostgreSQL and Redis stay running while the application containers are rebuilt. Background tasks in Redis will resume after the worker restarts.</p>
        </Callout>

        <h2>Rollback</h2>
        <p>If an update fails, the previous binaries are preserved in <code>/opt/cleanmails/backup/</code>. To roll back:</p>
        <CodeBlock language="bash" code={`cd /opt/cleanmails

# Restore previous binaries
cp backup/cleanmails-api bin/
cp backup/cleanmails-worker bin/

# Rebuild images with previous code
docker build -t cleanmails-api:latest -f Dockerfile.api .
docker build -t cleanmails-worker:latest -f Dockerfile.worker .

# Restart
docker compose -f docker-compose.prod.yml up -d --force-recreate`} />

        <h2>Update Frequency</h2>
        <p>Updates are released as new tarballs to the S3 bucket. There is no auto-update — you always initiate updates manually either from the dashboard or via the script.</p>

        <Callout type="warning" title="Backup before updating">
          <p>Always run <code>bash scripts/backup.sh</code> before updating. While updates are designed to be safe, having a recent database backup gives you a recovery path.</p>
        </Callout>
      </div>
    </DocsLayout>
  )
}
