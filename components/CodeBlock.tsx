'use client'

import { useState } from 'react'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
}

export default function CodeBlock({ code, language = 'bash', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-5 rounded-lg border border-[var(--border)] overflow-hidden max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 bg-[var(--bg-secondary)] border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-70" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-70" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-70" />
          </div>
          {filename && (
            <span className="text-[11px] font-medium text-[var(--text-tertiary)] ml-2">{filename}</span>
          )}
          {!filename && language && (
            <span className="text-[11px] font-medium text-[var(--text-tertiary)] ml-2 uppercase">{language}</span>
          )}
        </div>
        <button
          onClick={copy}
          className="text-[11px] font-medium text-[var(--text-tertiary)] hover:text-[var(--text)] px-2 py-1 rounded transition-colors cursor-pointer"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      {/* Code */}
      <pre className="!m-0 !rounded-none !border-0 bg-[var(--pre-bg)] p-3 sm:p-4 overflow-x-auto">
        <code className="text-[0.78rem] sm:text-[0.84rem] leading-[1.7] font-mono text-[#e8e8e8] whitespace-pre">{code}</code>
      </pre>
    </div>
  )
}
