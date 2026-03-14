import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
