'use client'

import { useState } from 'react'

export default function CommandGenerator() {
  const [license, setLicense] = useState('')
  const [domain, setDomain] = useState('')
  const [copied, setCopied] = useState(false)

  const command = `curl -sSL https://cleanmails.online/install.sh | bash -s -- --key ${license || '{LICENSE_KEY}'} --domain ${domain || '{YOUR_DOMAIN}'}`

  const copy = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="my-8 rounded-xl border border-[var(--border)] bg-[var(--cta-card-bg)] p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Badge */}
      <div className="absolute top-0 right-0 px-3 py-1.5 bg-[#FFD700] text-[#37352f] text-[10px] font-bold uppercase tracking-wider rounded-bl-lg">
        Auto-Deploy
      </div>

      <h3 className="text-lg font-bold text-[var(--cta-card-text)] mb-1">Installation Command Generator</h3>
      <p className="text-[13px] text-[var(--text-secondary)] mb-6">
        Fill in your details to generate a one-click installation command with automatic SSL.
      </p>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-[10px] font-semibold text-[#FFD700] uppercase tracking-wider mb-2">
            License Key
          </label>
          <input
            type="text"
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            placeholder="CK-XXXX-XXXX"
            className="w-full px-4 py-3 rounded-lg border-2 border-[var(--border-strong)] bg-transparent text-[var(--cta-card-text)] placeholder:text-[var(--text-tertiary)] text-sm outline-none focus:border-[#FFD700] transition-colors"
          />
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-[#FFD700] uppercase tracking-wider mb-2">
            Your App Domain
          </label>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="app.yourdomain.com"
            className="w-full px-4 py-3 rounded-lg border-2 border-[var(--border-strong)] bg-transparent text-[var(--cta-card-text)] placeholder:text-[var(--text-tertiary)] text-sm outline-none focus:border-[#FFD700] transition-colors"
          />
        </div>
      </div>

      {/* Command output */}
      <div className="rounded-lg bg-[#111] border border-[rgba(255,255,255,0.1)] p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          <span className="text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase ml-2">Terminal</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <code className="text-[13px] font-mono text-white leading-relaxed break-all flex-1">
            curl -sSL https://cleanmails.online/install.sh | bash -s -- --key{' '}
            <span className={license ? 'text-white' : 'text-[#FFD700]'}>{license || '{LICENSE_KEY}'}</span>
            {' '}--domain{' '}
            <span className={domain ? 'text-white' : 'text-[#FFD700]'}>{domain || '{YOUR_DOMAIN}'}</span>
          </code>
          <button
            onClick={copy}
            className="flex-shrink-0 bg-[#FFD700] text-[#37352f] px-4 py-2 rounded-md text-[11px] font-bold uppercase cursor-pointer hover:bg-[#f0cc00] transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* rDNS note */}
      <div className="mt-5 rounded-lg border border-dashed border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.03)] p-4">
        <p className="text-[10px] font-bold text-[#FFD700] uppercase tracking-wider mb-1">rDNS Configuration</p>
        <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
          Set your server&apos;s Reverse DNS (PTR) record to:{' '}
          <code className="bg-[#000] text-[#FFD700] px-2 py-0.5 rounded text-[12px] font-mono">
            {domain || '{YOUR_DOMAIN}'}
          </code>
        </p>
      </div>
    </div>
  )
}
