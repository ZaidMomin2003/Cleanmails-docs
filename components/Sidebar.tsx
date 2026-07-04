'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sections = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction', href: '/' },
      { label: 'Installation', href: '/installation' },
      { label: 'Quick Deploy', href: '/quick-deploy' },
      { label: 'First Login & Setup', href: '/first-login' },
      { label: 'License Activation', href: '/license' },
    ],
  },
  {
    title: 'Email Validation',
    items: [
      { label: 'Overview', href: '/validation/overview' },
      { label: 'Validation Scoring', href: '/validation/levels' },
    ],
  },
  {
    title: 'Campaigns',
    items: [
      { label: 'Creating Campaigns', href: '/campaigns/creating' },
      { label: 'Multi-Step Sequences', href: '/campaigns/sequences' },
      { label: 'Scheduling', href: '/campaigns/scheduling' },
      { label: 'A/B Testing', href: '/campaigns/ab-testing' },
      { label: 'Spintax & Personalization', href: '/campaigns/personalization' },
      { label: 'AI Tags (Gemini)', href: '/campaigns/ai-tags' },
      { label: 'Tracking & Analytics', href: '/campaigns/tracking' },
    ],
  },
  {
    title: 'Senders & Domains',
    items: [
      { label: 'Adding Domains', href: '/infrastructure/domains' },
      { label: 'DNS Setup (SPF/DKIM/DMARC)', href: '/infrastructure/dns' },
      { label: 'Adding Senders', href: '/infrastructure/senders' },
      { label: 'Mailbox Warmup', href: '/infrastructure/warmup' },
      { label: 'Sender Rotation', href: '/infrastructure/rotation' },
    ],
  },
  {
    title: 'Lead Lists',
    items: [
      { label: 'Uploading Lists', href: '/lists/uploading' },
      { label: 'List Validation', href: '/lists/validation' },
      { label: 'Managing Leads', href: '/lists/managing' },
    ],
  },
  {
    title: 'Workspaces & Teams',
    items: [
      { label: 'Workspaces', href: '/workspaces' },
      { label: 'Team Management', href: '/teams' },
      { label: 'Client Portal', href: '/client-portal' },
    ],
  },

  {
    title: 'AI & Integrations',
    items: [
      { label: 'AI Features', href: '/ai/copilot' },
      { label: 'MCP Server', href: '/ai/mcp' },
      { label: 'Webhooks', href: '/integrations/webhooks' },
      { label: 'CRM Integrations', href: '/integrations/crm' },
      { label: 'Slack, Discord & Telegram', href: '/integrations/slack' },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { label: 'Authentication', href: '/api/authentication' },
      { label: 'Verification Endpoints', href: '/api/verification' },
      { label: 'Outreach Endpoints', href: '/api/outreach' },
      { label: 'Workspace Endpoints', href: '/api/workspaces' },
    ],
  },
  {
    title: 'Configuration',
    items: [
      { label: 'Environment Variables', href: '/config/env-variables' },
      { label: 'Docker Compose', href: '/config/docker' },
      { label: 'Security', href: '/config/security' },
    ],
  },
  {
    title: 'Operations',
    items: [
      { label: 'Monitoring & Health', href: '/operations/monitoring' },
      { label: 'Backups', href: '/operations/backups' },
      { label: 'Self-Update', href: '/operations/updates' },
      { label: 'Troubleshooting', href: '/operations/troubleshooting' },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Strip basePath for comparison
  const currentPath = pathname?.replace('/docs', '') || '/'

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed bottom-5 left-5 z-50 w-12 h-12 bg-[var(--text)] text-[var(--bg)] rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-transform hover:scale-105 active:scale-95"
        aria-label="Toggle navigation"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          {mobileOpen ? (
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          ) : (
            <>
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </>
          )}
        </svg>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/30" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-14 left-0 z-40 h-[calc(100vh-56px)] w-[280px] bg-[var(--sidebar-bg)] border-r border-[var(--border)]
        overflow-y-auto transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        lg:translate-x-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <nav className="p-5 pb-20">
          {sections.map((section) => (
            <div key={section.title} className="mb-6">
              <p className="text-[10px] font-semibold text-[var(--text-tertiary)] uppercase tracking-[0.1em] mb-2 px-3">
                {section.title}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = currentPath === item.href || (item.href !== '/' && currentPath.startsWith(item.href))
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`
                          block px-3 py-1.5 rounded-md text-[13px] font-medium no-underline transition-all duration-150
                          ${isActive
                            ? 'bg-[var(--sidebar-active)] text-[var(--text)] border-l-2 border-[var(--sidebar-active-border)]'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)]'
                          }
                        `}
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
