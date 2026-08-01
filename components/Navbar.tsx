import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border)]">
      <div className="flex items-center justify-between h-14 px-4 sm:px-5">
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 no-underline min-w-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#37352f] dark:bg-[#e8e8e6] rounded-lg flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="sm:w-4 sm:h-4">
              <rect x="2" y="4" width="20" height="16" rx="3" className="stroke-[#FFD700] dark:stroke-[#37352f]" strokeWidth="2.5"/>
              <path d="M2 9l10 6 10-6" className="stroke-[#FFD700] dark:stroke-[#37352f]" strokeWidth="2.5"/>
            </svg>
          </div>
          <div className="truncate">
            <span className="text-[13px] sm:text-[14px] font-semibold text-[var(--text)]">Cold Mail</span>
            <span className="text-[13px] sm:text-[14px] text-[var(--text-tertiary)] ml-1 sm:ml-1.5">/</span>
            <span className="text-[13px] sm:text-[14px] text-[var(--text-tertiary)] ml-1 sm:ml-1.5">Docs</span>
          </div>
        </Link>
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          <a href="https://coldmail.host/blog" target="_blank" rel="noopener noreferrer"
            className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text)] no-underline transition-colors hidden sm:inline">
            Blog
          </a>
          <ThemeToggle />
          <a href="https://coldmail.host" target="_blank" rel="noopener noreferrer"
            className="text-[11px] sm:text-[12px] font-semibold text-[#37352f] bg-[#FFD700] hover:bg-[#f0cc00] px-2.5 sm:px-3.5 py-1.5 rounded-md transition-colors no-underline whitespace-nowrap">
            Get Cold Mail
          </a>
        </div>
      </div>
    </nav>
  )
}
