"use client";

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Marketplace from './marketplace/Marketplace'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-100 via-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-extrabold mb-4 text-center text-emerald-800 tracking-tight">
          Welcome to <span className="text-emerald-600">EG Business Marketplace</span>
        </h1>
        <p className="text-xl text-emerald-700 max-w-2xl mx-auto text-center leading-relaxed mb-12">
          Empowering African farmers through innovative technology and comprehensive education
        </p>

        <div className="mb-16 text-center">
          <Link href="/farmer" className="bg-emerald-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-emerald-600 transition-colors">
            For Farmers
          </Link>
          <p className="mt-4 text-emerald-700">
            Are you a farmer? Sign up or sign in to manage your products and access exclusive resources.
          </p>
        </div>

        <Marketplace session={session} />
      </div>
    </div>
  )
}