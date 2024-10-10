import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientProvider from '@/components/ClientProvider'
import ClientHeader from '@/components/ClientHeader'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'EG Business - Empowering African Farmers',
    template: '%s | EG Business'
  },
  description: 'EG Business: Revolutionizing African agriculture through an innovative marketplace, educational resources, and strategic partnerships.',
  keywords: ['African farmers', 'agriculture', 'marketplace', 'education', 'partnerships'],
  authors: [{ name: 'EG Business Team' }],
  creator: 'EG Business',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.egbusiness.com',
    siteName: 'EG Business',
    title: 'EG Business - Empowering African Farmers',
    description: 'Revolutionizing African agriculture through an innovative marketplace, educational resources, and strategic partnerships.',
    images: [
      {
        url: 'https://www.egbusiness.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EG Business - Empowering African Farmers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EG Business - Empowering African Farmers',
    description: 'Revolutionizing African agriculture through an innovative marketplace, educational resources, and strategic partnerships.',
    images: ['https://www.egbusiness.com/twitter-image.jpg'],
    creator: '@EGBusiness',
  },
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
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>
          <div className="min-h-screen flex flex-col">
            <ClientHeader />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ClientProvider>
      </body>
    </html>
  )
}