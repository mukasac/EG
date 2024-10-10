'use client'

import { useState } from 'react'

interface MarketplaceSearchProps {
  onSearch: (query: string) => void;
}

export default function MarketplaceSearch({ onSearch }: MarketplaceSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products..."
        className="px-4 py-2 border rounded-l-md w-64"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600">
        Search
      </button>
    </form>
  )
}