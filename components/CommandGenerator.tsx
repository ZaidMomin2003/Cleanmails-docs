'use client'

import { useState } from 'react'

const INSTALL_COMMAND = 'curl -fsSL https://cleanmails.online/install.sh | sudo bash'

export default function CommandGenerator() {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(INSTALL_COMMAND)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="my-8 rounded-xl border border-[var(--border)] bg-[var(--cta-card-bg)] p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Badge */}
      <div className="absolute top-0 right-0 px-3 py-1.5 bg-[#FFD700] text-[#37352f] text-[10px] font-bold uppercase tracking-wider rounded-bl-lg">
        Auto-Deploy
      </div>

      <h3 className="text-lg font-bold text-[var(--cta-card-text)] mb-1">One-Command Installer</h3>
      <p className="text-[13px] text-[var(--text-secondary)] mb-6">
        SSH into your VPS as root and paste this. The installer will prompt for your domain, then handle Docker, the database, and SSL automatically.
      </p>

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
            {INSTALL_COMMAND}
          </code>
          <button
            onClick={copy}
            className="flex-shrink-0 bg-[#FFD700] text-[#37352f] px-4 py-2 rounded-md text-[11px] font-bold uppercase cursor-pointer hover:bg-[#f0cc00] transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* What happens next */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] p-3">
          <p className="text-[10px] font-bold text-[#FFD700] uppercase tracking-wider mb-1">Step 1</p>
          <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
            Point an A record at your VPS IP <em>before</em> running the command.
          </p>
        </div>
        <div className="rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] p-3">
          <p className="text-[10px] font-bold text-[#FFD700] uppercase tracking-wider mb-1">Step 2</p>
          <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
            Run the command. Enter your domain when prompted. Wait ~3–5 min.
          </p>
        </div>
        <div className="rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] p-3">
          <p className="text-[10px] font-bold text-[#FFD700] uppercase tracking-wider mb-1">Step 3</p>
          <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
            Open the dashboard URL and paste your license key on the welcome screen.
          </p>
        </div>
      </div>

      {/* rDNS note */}
      <div className="mt-5 rounded-lg border border-dashed border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.03)] p-4">
        <p className="text-[10px] font-bold text-[#FFD700] uppercase tracking-wider mb-1">rDNS Configuration</p>
        <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
          After install, set your server&apos;s Reverse DNS (PTR) record at your VPS provider to the same domain. Essential for inbox delivery.
        </p>
      </div>
    </div>
  )
}
