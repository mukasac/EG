'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function AuthButtons() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="flex items-center space-x-2">
        <Link href="/dashboard" className="hover:underline">
          {session.user?.name || 'Dashboard'}
        </Link>
        <button onClick={() => signOut()} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
          Sign out
        </button>
      </div>
    )
  }

  return (
    <div className="flex space-x-2">
      <button onClick={() => signIn()} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
        Sign in
      </button>
      <Link href="/auth/signup" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
        Sign up
      </Link>
    </div>
  )
}