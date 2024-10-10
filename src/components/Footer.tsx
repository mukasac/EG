import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-emerald-100 border-t border-emerald-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-emerald-800 mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-emerald-700 hover:text-emerald-900 transition-colors">Our Story</Link></li>
              <li><Link href="/team" className="text-emerald-700 hover:text-emerald-900 transition-colors">Our Team</Link></li>
              <li><Link href="/careers" className="text-emerald-700 hover:text-emerald-900 transition-colors">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-emerald-800 mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/marketplace" className="text-emerald-700 hover:text-emerald-900 transition-colors">Marketplace</Link></li>
              <li><Link href="/education" className="text-emerald-700 hover:text-emerald-900 transition-colors">Education</Link></li>
              <li><Link href="/partnerships" className="text-emerald-700 hover:text-emerald-900 transition-colors">Partnerships</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-emerald-800 mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-emerald-700 hover:text-emerald-900 transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-emerald-700 hover:text-emerald-900 transition-colors">Contact Us</Link></li>
              <li><Link href="/terms" className="text-emerald-700 hover:text-emerald-900 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-emerald-800 mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="https://facebook.com" className="text-emerald-700 hover:text-emerald-900 transition-colors">Facebook</a></li>
              <li><a href="https://twitter.com" className="text-emerald-700 hover:text-emerald-900 transition-colors">Twitter</a></li>
              <li><a href="https://linkedin.com" className="text-emerald-700 hover:text-emerald-900 transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-emerald-200 text-center text-emerald-700">
          <p>&copy; 2024 EG Business. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}