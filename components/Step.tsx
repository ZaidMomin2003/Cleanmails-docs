interface StepProps {
  number: number
  title: string
  children: React.ReactNode
}

export default function Step({ number, title, children }: StepProps) {
  return (
    <div className="flex gap-3 sm:gap-4 my-6 sm:my-8">
      <div className="flex-shrink-0">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[var(--step-bg)] text-[var(--step-text)] flex items-center justify-center text-[12px] sm:text-[13px] font-bold">
          {number}
        </div>
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <h4 className="text-[14px] sm:text-[15px] font-semibold text-[var(--text)] mb-2">{title}</h4>
        <div className="text-[13px] sm:text-[14px] text-[var(--text-secondary)] leading-relaxed [&>p]:mb-3 [&>p:last-child]:mb-0 [&>ul]:text-[13px] [&>ul]:sm:text-[14px]">
          {children}
        </div>
      </div>
    </div>
  )
}
