'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products, resources..."
        className="px-2 py-1 border rounded-l text-black"
      />
      <button type="submit" className="bg-yellow-500 text-white px-3 py-1 rounded-r hover:bg-yellow-600">
        Search
      </button>
    </form>
  )
}