interface CalloutProps {
  type?: 'info' | 'warning' | 'tip'
  title?: string
  children: React.ReactNode
}

const icons = {
  info: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  ),
  warning: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  tip: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
    </svg>
  ),
}

export default function Callout({ type = 'info', title, children }: CalloutProps) {
  return (
    <div className={`
      my-5 sm:my-6 rounded-lg border-l-4 p-3.5 sm:p-4 md:p-5
      ${type === 'info' ? 'bg-[var(--callout-info-bg)] border-[var(--callout-info-border)]' : ''}
      ${type === 'warning' ? 'bg-[var(--callout-warning-bg)] border-[var(--callout-warning-border)]' : ''}
      ${type === 'tip' ? 'bg-[var(--callout-tip-bg)] border-[var(--callout-tip-border)]' : ''}
    `}>
      {title && (
        <div className="flex items-center gap-2 mb-2">
          <span className={`
            ${type === 'info' ? 'text-[var(--callout-info-border)]' : ''}
            ${type === 'warning' ? 'text-[var(--callout-warning-border)]' : ''}
            ${type === 'tip' ? 'text-[var(--callout-tip-border)]' : ''}
          `}>
            {icons[type]}
          </span>
          <span className="text-[13px] font-semibold text-[var(--text)]">{title}</span>
        </div>
      )}
      <div className="text-[12px] sm:text-[13px] text-[var(--text-secondary)] leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}
