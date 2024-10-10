// src/app/farmer/page.tsx

import Link from 'next/link'

export default function FarmerEntryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-emerald-800 mb-8">
          Welcome, Farmers!
        </h1>
        <p className="text-xl text-center text-emerald-600 mb-12">
          Join our community of innovative farmers and start selling your products directly to consumers.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/farmer/signin" className="bg-emerald-500 text-white text-center py-3 px-6 rounded-lg text-lg font-semibold hover:bg-emerald-600 transition-colors">
            Sign In
          </Link>
          <Link href="/farmer/signup" className="bg-white text-emerald-500 text-center py-3 px-6 rounded-lg text-lg font-semibold border-2 border-emerald-500 hover:bg-emerald-50 transition-colors">
            Sign Up
          </Link>
        </div>
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-emerald-800 mb-4">Why Join Us?</h2>
          <ul className="list-disc list-inside space-y-2 text-emerald-700">
            <li>Direct access to a wide customer base</li>
            <li>Easy-to-use platform for managing your products</li>
            <li>Educational resources to enhance your farming practices</li>
            <li>Support from our community of farmers and experts</li>
          </ul>
        </div>
      </div>
    </div>
  )
}