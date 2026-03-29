import type { Metadata } from 'next'
import { Fraunces, DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  weight: ['200', '300', '400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  weight: ['300', '400'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const dmMono = DM_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sternes.dev — Full-Stack Engineering & AI Integration',
  description: 'Full-stack engineer and AI consultant based in Dallas, TX. Websites, web apps, and AI workflow integration for service businesses.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
