"use client";

import Link from 'next/link'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, LogIn, LogOut } from 'lucide-react'

const ClientHeader = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <header className="bg-emerald-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-emerald-800">
          EG Business
        </Link>
        <nav className="hidden md:flex space-x-4 items-center">
          <Link href="/marketplace" className="text-emerald-800 hover:text-emerald-600">
            Marketplace
          </Link>
          <Link href="/farmer" className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600">
            Farmers
          </Link>
          {session ? (
            <button onClick={() => signOut()} className="text-emerald-800 hover:text-emerald-600">
              Sign Out
            </button>
          ) : (
            <Link href="/signin" className="text-emerald-800 hover:text-emerald-600">
              Sign In
            </Link>
          )}
        </nav>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-emerald-800 hover:text-emerald-600 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-2 px-4">
          <Link href="/marketplace" className="block py-2 text-emerald-800 hover:text-emerald-600">
            Marketplace
          </Link>
          <Link href="/farmer" className="block py-2 text-emerald-800 hover:text-emerald-600">
            Farmers
          </Link>
          {session ? (
            <button onClick={() => signOut()} className="block w-full text-left py-2 text-emerald-800 hover:text-emerald-600">
              Sign Out
            </button>
          ) : (
            <Link href="/signin" className="block py-2 text-emerald-800 hover:text-emerald-600">
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  )
}

export default ClientHeader