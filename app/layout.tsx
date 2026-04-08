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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sternes.dev'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Dallas Website Designer | Beautifully Designed Sites & AI Integration | Sternes.dev',
    template: '%s | Sternes.dev'
  },
  description: 'Professional website designer in Dallas, TX. Modern site design that gets you more customers and makes your business look its best. Plus AI automation to save time on repetitive tasks.',
  keywords: ['website designer dallas', 'dallas website design', 'custom website design', 'professional website designer', 'small business website', 'modern website design', 'modern site design', 'beautifully designed websites', 'christian website designer dallas', 'christian business website design', 'ai automation', 'business automation tools', 'dallas web designer', 'website design dallas tx'],
  authors: [{ name: 'Rashad Sternes' }],
  creator: 'Rashad Sternes',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Website Design for Business Owners | Sternes.dev',
    description: 'Professional website design that gets you more customers and makes your business look its best. Plus AI automation to save time on repetitive tasks.',
    siteName: 'Sternes.dev',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sternes.dev - Website Design for Business Owners',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Design for Business Owners | Sternes.dev',
    description: 'Professional website design that gets you more customers and makes your business look its best. Plus AI automation to save time on repetitive tasks.',
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
