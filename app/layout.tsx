import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const lora = Lora({ subsets: ['latin'], variable: '--font-lora', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Documentation — Cleanmails', template: '%s | Cleanmails Docs' },
  description: 'Complete documentation for Cleanmails — self-hosted cold email infrastructure. Installation, campaigns, email validation, MCP, API reference, and more.',
  metadataBase: new URL('https://cleanmails.online'),
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.svg',
  },
  openGraph: { type: 'website', siteName: 'Cleanmails Docs', locale: 'en_US', title: 'Cleanmails Documentation', description: 'Complete documentation for Cleanmails — self-hosted cold email infrastructure platform.' },
  twitter: { card: 'summary_large_image', title: 'Cleanmails Documentation', description: 'Installation, campaigns, email validation, MCP server, API reference, and more.' },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://cleanmails.online/docs' },
  keywords: ['cleanmails', 'cold email', 'email validation', 'self-hosted', 'documentation', 'MCP', 'sender rotation', 'email warmup', 'campaign automation'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${lora.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/docs/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/docs/apple-icon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()` }} />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-QWXBBLS661" strategy="afterInteractive" />
        <Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-QWXBBLS661');`}</Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
