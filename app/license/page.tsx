import DocsLayout from '@/components/DocsLayout'
import Callout from '@/components/Callout'

export const metadata = { title: 'License Activation' }

export default function LicensePage() {
  return (
    <DocsLayout>
      <div className="docs-prose">
        <span className="inline-block text-[10px] font-semibold text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2.5 py-1 rounded uppercase tracking-wider mb-4">
          Getting Started
        </span>
        <h1>License Activation</h1>
        <p>Cleanmails requires a valid license key to operate. The license is verified during the onboarding wizard and periodically checked by a background task.</p>

        <h2>Activating Your License</h2>
        <p>License activation happens during the onboarding wizard (Step 1):</p>
        <ol>
          <li>Open your Cleanmails instance in a browser</li>
          <li>Enter your license key on the first step of the setup wizard</li>
          <li>The system validates the key against the license server</li>
          <li>On success, proceed to branding and admin account creation</li>
        </ol>

        <Callout type="info" title="Instance binding">
          <p>Your license is associated with your instance ID. The system generates a unique instance identifier that&apos;s used for warmup pool registration and license validation.</p>
        </Callout>

        <h2>License Validation</h2>
        <p>A periodic background task (<code>system:license_check</code>) re-validates your license against the license server. Behavior:</p>
        <ul>
          <li><strong>Server unreachable:</strong> License remains active (fail-safe, no disruption)</li>
          <li><strong>License valid:</strong> Normal operation continues</li>
          <li><strong>License revoked:</strong> The license guard middleware blocks all API routes with a 403 response</li>
        </ul>

        <h2>License Guard</h2>
        <p>A middleware runs on every API request that checks the license status stored in the database. If the license is marked as revoked, all endpoints (except health and setup) return:</p>
        <pre><code>{`{"error": "License revoked or expired"}`}</code></pre>

        <h2>What Requires a License</h2>
        <p>All authenticated API endpoints are protected by the license guard. Without an active license:</p>
        <ul>
          <li>Campaigns cannot be created or started</li>
          <li>Leads cannot be uploaded or validated</li>
          <li>Mailboxes cannot be added</li>
          <li>Warmup pool registration fails</li>
          <li>AI features are disabled</li>
          <li>System updates are blocked</li>
        </ul>

        <h2>Always Accessible (No License Required)</h2>
        <ul>
          <li><code>GET /health</code> — System health check</li>
          <li><code>/api/v1/setup/*</code> — Onboarding wizard endpoints</li>
          <li><code>/api/v1/auth/login</code> — Login</li>
          <li><code>/api/v1/auth/register</code> — Registration</li>
          <li>Tracking pixels, click redirects, unsubscribe pages</li>
        </ul>

        <Callout type="warning" title="Don&apos;t share your license key">
          <p>Each license key is intended for a single instance. Sharing keys may result in revocation when multiple instances attempt to validate the same key.</p>
        </Callout>
      </div>
    </DocsLayout>
  )
}
