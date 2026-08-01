import DocsLayout from '@/components/DocsLayout'
import CodeBlock from '@/components/CodeBlock'
import Callout from '@/components/Callout'

export const metadata = { title: 'Backups' }

export default function BackupsPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">Operations</span>
        <h1>Backups</h1>
        <p>Cold mail stores all data in PostgreSQL. The included backup script uses <code>pg_dump</code> to create compressed backups with automatic rotation.</p>

        <h2>Quick Backup</h2>
        <CodeBlock language="bash" code={`cd /opt/cleanmails
bash scripts/backup.sh`} />
        <p>This creates a gzipped SQL dump in <code>/opt/cleanmails/backups/</code> and automatically removes backups older than 7 (keeping the last 7).</p>

        <h2>Automated Daily Backup (Cron)</h2>
        <CodeBlock language="bash" code={`# Add to crontab (crontab -e)
0 3 * * * cd /opt/cleanmails && bash scripts/backup.sh`} />
        <p>This runs at 3 AM daily and creates a timestamped backup file.</p>

        <h2>Manual Backup (pg_dump)</h2>
        <CodeBlock language="bash" code={`cd /opt/cleanmails
docker compose -f docker-compose.prod.yml exec -T postgres \\
  pg_dump -U cleanmails cleanmails | gzip > backups/manual_backup.sql.gz`} />

        <h2>Restoring from Backup</h2>
        <CodeBlock language="bash" code={`cd /opt/cleanmails

# Stop the application (keep postgres running)
docker compose -f docker-compose.prod.yml stop api worker frontend

# Restore the database
gunzip -c backups/cleanmails_backup_20240101_030000.sql.gz | \\
  docker compose -f docker-compose.prod.yml exec -T postgres \\
  psql -U cleanmails cleanmails

# Restart all services
docker compose -f docker-compose.prod.yml up -d`} />

        <Callout type="warning" title="Stop the app before restoring">
          <p>Always stop the API and worker containers before restoring. This prevents data conflicts while the database is being restored.</p>
        </Callout>

        <h2>What&apos;s Included in PostgreSQL</h2>
        <p>The database contains all application data:</p>
        <ul>
          <li>Users, roles, and JWT sessions</li>
          <li>Workspaces and settings</li>
          <li>Campaigns, steps, and delivery logs</li>
          <li>Lead lists and all leads</li>
          <li>Mailboxes (including AES-256-GCM encrypted credentials)</li>
          <li>Email threads and replies</li>
          <li>Webhook subscriptions and delivery logs</li>
          <li>Integration configs</li>
          <li>API keys (bcrypt hashed)</li>
          <li>Warmup status and progress</li>
          <li>License information</li>
        </ul>

        <h2>What&apos;s NOT in the Database</h2>
        <ul>
          <li><strong>Uploaded files</strong> — Logos and CSVs in the <code>uploads_data</code> Docker volume</li>
          <li><strong>Redis data</strong> — Task queue state (reconstructed automatically)</li>
          <li><strong>SSL certificates</strong> — Stored in Caddy&apos;s <code>caddy_data</code> volume (auto-provisioned)</li>
          <li><strong>Environment file</strong> — <code>/opt/cleanmails/.env</code> (back this up separately!)</li>
        </ul>

        <h2>Full System Backup</h2>
        <p>For a complete backup including uploads and config:</p>
        <CodeBlock language="bash" code={`cd /opt/cleanmails

# Database
bash scripts/backup.sh

# Environment and config
cp .env backups/env_backup
cp Caddyfile backups/Caddyfile_backup

# Uploads volume (find actual mount path)
docker cp $(docker compose -f docker-compose.prod.yml ps -q api):/app/uploads ./backups/uploads_backup`} />

        <h2>Backup Retention</h2>
        <p>The backup script automatically keeps the last 7 backups and removes older ones. To change this, edit <code>MAX_BACKUPS=7</code> in <code>scripts/backup.sh</code>.</p>

        <h2>Backup File Sizes</h2>
        <p>Typical backup sizes (compressed with gzip):</p>
        <table>
          <thead><tr><th>Data Volume</th><th>Approximate Size</th></tr></thead>
          <tbody>
            <tr><td>Fresh install</td><td>&lt; 1 MB</td></tr>
            <tr><td>10k leads, 5 campaigns</td><td>5-10 MB</td></tr>
            <tr><td>100k leads, 50 campaigns</td><td>50-100 MB</td></tr>
          </tbody>
        </table>
      </div>
    </DocsLayout>
  )
}
