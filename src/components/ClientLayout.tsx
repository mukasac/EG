'use client'

import { SessionProvider } from 'next-auth/react'
import Link from 'next/link'
import SearchBar from './SearchBar'
import AuthButtons from './AuthButtons'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <header className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">EG Business</Link>
          <nav className="flex items-center space-x-4">
            <Link href="/marketplace" className="hover:underline">Marketplace</Link>
            <Link href="/education" className="hover:underline">Education</Link>
            <Link href="/partnerships" className="hover:underline">Partnerships</Link>
            <Link href="/loyalty-program" className="hover:underline">Loyalty Program</Link>
            <SearchBar />
            <AuthButtons />
          </nav>
        </div>
      </header>
      <main className="container mx-auto py-8">
        {children}
      </main>
      <footer className="bg-gray-100 p-4 mt-8">
        <div className="container mx-auto text-center">
          &copy; 2024 EG Business. All rights reserved.
        </div>
      </footer>
    </SessionProvider>
  )
}