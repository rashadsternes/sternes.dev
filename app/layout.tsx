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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sternes.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Sternes.dev — Full-Stack Engineering & AI Integration',
    template: '%s | Sternes.dev'
  },
  description: 'Full-stack engineer and AI consultant based in Dallas, TX. Websites, web apps, and AI workflow integration for service businesses.',
  keywords: ['full-stack developer', 'AI integration', 'Next.js', 'TypeScript', 'web development', 'Dallas', 'Texas', 'e-commerce', 'Sanity CMS'],
  authors: [{ name: 'Rashad Sternes' }],
  creator: 'Rashad Sternes',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Sternes.dev — Full-Stack Engineering & AI Integration',
    description: 'Full-stack engineer and AI consultant based in Dallas, TX. Websites, web apps, and AI workflow integration for service businesses.',
    siteName: 'Sternes.dev',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sternes.dev - Full-Stack Engineering & AI Integration',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sternes.dev — Full-Stack Engineering & AI Integration',
    description: 'Full-stack engineer and AI consultant based in Dallas, TX. Websites, web apps, and AI workflow integration for service businesses.',
    images: ['/images/og-image.png'],
  },
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
