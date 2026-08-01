import DocsLayout from '@/components/DocsLayout'
import CodeBlock from '@/components/CodeBlock'
import Callout from '@/components/Callout'

export const metadata = { title: 'Docker Compose' }

export default function DockerPage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">Configuration</span>
        <h1>Docker Compose</h1>
        <p>Cold mail runs as a six-container Docker Compose stack: PostgreSQL, Redis, API server, background worker, Next.js frontend, and Caddy reverse proxy.</p>

        <h2>Services</h2>
        <table>
          <thead><tr><th>Service</th><th>Image</th><th>Purpose</th><th>Ports</th></tr></thead>
          <tbody>
            <tr><td><code>postgres</code></td><td>postgres:16-alpine</td><td>Primary database</td><td>5432 (internal)</td></tr>
            <tr><td><code>redis</code></td><td>redis:7-alpine</td><td>Task queue &amp; cache (Asynq)</td><td>6379 (internal)</td></tr>
            <tr><td><code>api</code></td><td>cleanmails-api:latest</td><td>Go API server (Gin)</td><td>8080 (internal)</td></tr>
            <tr><td><code>worker</code></td><td>cleanmails-worker:latest</td><td>Background job processor</td><td>None</td></tr>
            <tr><td><code>frontend</code></td><td>cleanmails-frontend:latest</td><td>Next.js dashboard</td><td>3000 (internal)</td></tr>
            <tr><td><code>caddy</code></td><td>caddy:2-alpine</td><td>Reverse proxy + auto SSL</td><td>80, 443</td></tr>
          </tbody>
        </table>

        <h2>Production Compose File</h2>
        <CodeBlock language="yaml" filename="docker-compose.prod.yml" code={`services:
  postgres:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_DB: cleanmails
      POSTGRES_USER: cleanmails
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U cleanmails"]
      interval: 5s
      timeout: 5s
      retries: 5
    deploy:
      resources:
        limits:
          memory: 512M

  redis:
    image: redis:7-alpine
    restart: always
    command: redis-server --maxmemory 128mb --maxmemory-policy allkeys-lru --appendonly yes
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 5s
      retries: 5
    deploy:
      resources:
        limits:
          memory: 192M

  api:
    image: cleanmails-api:latest
    restart: always
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    env_file: .env
    environment:
      - GIN_MODE=release
    volumes:
      - uploads_data:/app/uploads
      - /opt/cleanmails:/opt/cleanmails
      - /var/run/docker.sock:/var/run/docker.sock
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 10s
      timeout: 5s
      retries: 3
      start_period: 10s
    deploy:
      resources:
        limits:
          memory: 256M

  worker:
    image: cleanmails-worker:latest
    restart: always
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    env_file: .env
    deploy:
      resources:
        limits:
          memory: 256M

  frontend:
    image: cleanmails-frontend:latest
    restart: always
    depends_on:
      api:
        condition: service_healthy
    environment:
      - HOSTNAME=0.0.0.0
      - PORT=3000
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000"]
      interval: 10s
      timeout: 5s
      retries: 3
      start_period: 15s
    deploy:
      resources:
        limits:
          memory: 256M

  caddy:
    image: caddy:2-alpine
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy_data:/data
      - caddy_config:/config
    depends_on:
      frontend:
        condition: service_healthy
      api:
        condition: service_healthy
    deploy:
      resources:
        limits:
          memory: 64M

volumes:
  pgdata:
  redis_data:
  caddy_data:
  caddy_config:
  uploads_data:`} />

        <h2>Caddyfile</h2>
        <p>Caddy routes API requests to the Go backend and all other traffic to the Next.js frontend:</p>
        <CodeBlock language="text" filename="Caddyfile" code={`yourdomain.com {
    handle /api/* {
        reverse_proxy api:8080
    }
    handle /health {
        reverse_proxy api:8080
    }
    handle /t/* {
        reverse_proxy api:8080
    }
    handle /unsubscribe/* {
        reverse_proxy api:8080
    }
    handle {
        reverse_proxy frontend:3000
    }
    header {
        X-Content-Type-Options nosniff
        X-Frame-Options DENY
        Strict-Transport-Security "max-age=31536000"
    }
}`} />
        <p>Caddy auto-provisions Let&apos;s Encrypt certificates when a domain is configured.</p>

        <h2>Volumes</h2>
        <table>
          <thead><tr><th>Volume</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td><code>pgdata</code></td><td>PostgreSQL database files</td></tr>
            <tr><td><code>redis_data</code></td><td>Redis AOF persistence</td></tr>
            <tr><td><code>uploads_data</code></td><td>Uploaded files (logos, CSVs)</td></tr>
            <tr><td><code>caddy_data</code></td><td>SSL certificates</td></tr>
            <tr><td><code>caddy_config</code></td><td>Caddy configuration state</td></tr>
          </tbody>
        </table>

        <h2>Common Commands</h2>
        <CodeBlock language="bash" code={`# Start all services
cd /opt/cleanmails
docker compose -f docker-compose.prod.yml up -d

# View logs
docker compose -f docker-compose.prod.yml logs -f

# View logs for a specific service
docker compose -f docker-compose.prod.yml logs -f api

# Stop all services
docker compose -f docker-compose.prod.yml down

# Restart a single service
docker compose -f docker-compose.prod.yml restart api

# Check status
docker compose -f docker-compose.prod.yml ps

# Rebuild after update
docker compose -f docker-compose.prod.yml up -d --force-recreate`} />

        <Callout type="warning" title="Docker socket mount">
          <p>The API container mounts <code>/var/run/docker.sock</code> and <code>/opt/cleanmails</code>. This is required for the self-update feature and system management capabilities.</p>
        </Callout>

        <h2>Health Checks</h2>
        <p>All services include Docker health checks. The startup order is enforced via <code>depends_on</code> with <code>condition: service_healthy</code>:</p>
        <ol>
          <li><strong>PostgreSQL + Redis</strong> start first and must pass health checks</li>
          <li><strong>API + Worker</strong> start after database and cache are healthy</li>
          <li><strong>Frontend</strong> starts after the API is healthy</li>
          <li><strong>Caddy</strong> starts after both frontend and API are healthy</li>
        </ol>

        <h2>Development Compose</h2>
        <p>For local development, a simpler <code>docker-compose.yml</code> runs only PostgreSQL and Redis:</p>
        <CodeBlock language="yaml" filename="docker-compose.yml (dev)" code={`services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: cleanmails
      POSTGRES_USER: cleanmails
      POSTGRES_PASSWORD: cleanmails_secret
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    command: redis-server --maxmemory 128mb --maxmemory-policy allkeys-lru
    ports:
      - "6379:6379"`} />
        <p>Run the API and worker directly with <code>go run</code> during development.</p>
      </div>
    </DocsLayout>
  )
}
