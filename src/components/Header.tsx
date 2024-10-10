import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-emerald-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-emerald-800">
          EG Business
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/marketplace" className="text-emerald-700 hover:text-emerald-900">Marketplace</Link></li>
            <li><Link href="/education" className="text-emerald-700 hover:text-emerald-900">Education</Link></li>
            <li><Link href="/partnerships" className="text-emerald-700 hover:text-emerald-900">Partnerships</Link></li>
            <li><Link href="/rewards" className="text-emerald-700 hover:text-emerald-900">Rewards</Link></li>
          </ul>
        </nav>
        <div>
          <Link href="/signin" className="bg-emerald-600 text-white hover:bg-emerald-700 px-4 py-2 rounded-lg font-semibold transition-colors duration-300">
            Sign In
          </Link>
        </div>
      </div>
    </header>
  )
}