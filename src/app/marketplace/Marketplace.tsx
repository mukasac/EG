// app/marketplace/Marketplace.tsx
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Session } from 'next-auth'
import { ChevronDown, ChevronUp, ShoppingCart as CartIcon, Filter, X } from 'lucide-react'

type Category = {
  id: number;
  name: string;
  subcategories: string[];
}

type Product = {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  farmer: string;
  image: string;
}

type FilterState = {
  priceRange: { min: string; max: string };
  organicOnly: boolean;
}

type CartItem = Product & { quantity: number };

interface MarketplaceProps {
  session: Session | null
}

const categories: Category[] = [
  { id: 1, name: 'Fresh Produce', subcategories: ['Fruits', 'Vegetables', 'Herbs and Spices', 'Root Crops'] },
  { id: 2, name: 'Grains and Cereals', subcategories: ['Maize/Corn', 'Rice', 'Wheat', 'Sorghum', 'Millet'] },
  { id: 3, name: 'Legumes and Pulses', subcategories: ['Beans', 'Peas', 'Lentils'] },
  { id: 4, name: 'Animal Products', subcategories: ['Meat', 'Dairy', 'Eggs', 'Honey'] },
  { id: 5, name: 'Processed and Packaged Goods', subcategories: ['Jams and Preserves', 'Dried Fruits', 'Grain Flour', 'Packaged Spices and Herbs', 'Snacks'] },
]

const mockProducts: Product[] = [
  { id: 1, name: 'Fresh Tomatoes', category: 'Fresh Produce', subcategory: 'Vegetables', price: 2.99, farmer: 'John Doe', image: '/placeholder.svg?height=200&width=300' },
  { id: 2, name: 'Organic Maize', category: 'Grains and Cereals', subcategory: 'Maize/Corn', price: 1.50, farmer: 'Jane Smith', image: '/placeholder.svg?height=200&width=300' },
  { id: 3, name: 'Free-Range Eggs', category: 'Animal Products', subcategory: 'Eggs', price: 3.99, farmer: 'Bob Johnson', image: '/placeholder.svg?height=200&width=300' },
]

const AdvancedSearchFilter: React.FC<{ onFilter: (filters: FilterState) => void }> = ({ onFilter }) => {
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [organicOnly, setOrganicOnly] = useState(false)

  const handleFilter = () => {
    onFilter({ priceRange, organicOnly })
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Advanced Filters</h3>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min Price"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="organic"
            checked={organicOnly}
            onChange={(e) => setOrganicOnly(e.target.checked)}
            className="rounded text-emerald-600"
          />
          <label htmlFor="organic">Organic Only</label>
        </div>
        <button
          onClick={handleFilter}
          className="w-full bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-700 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  )
}

const ShoppingCart: React.FC<{ cart: CartItem[], session: Session | null }> = ({ cart, session }) => {
  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0)

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.name} (x{item.quantity})</span>
              <span>${(item.quantity * item.price).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center font-semibold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <Link 
            href={session ? "/checkout" : "/signin?redirect=/checkout"}
            className="mt-4 w-full bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-700 transition-colors inline-block text-center"
          >
            {session ? "Proceed to Checkout" : "Sign in to Checkout"}
          </Link>
        </>
      )}
    </div>
  )
}

const InfiniteScrollProducts: React.FC<{ 
  filters: FilterState & { category: string | null; subcategory: string | null },
  onAddToCart: (product: Product) => void
}> = ({ filters, onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  const loadMoreProducts = () => {
    setLoading(true)
    setTimeout(() => {
      const newProducts = mockProducts.filter(product => 
        (!filters.category || product.category === filters.category) &&
        (!filters.subcategory || product.subcategory === filters.subcategory) &&
        (!filters.priceRange.min || product.price >= parseFloat(filters.priceRange.min)) &&
        (!filters.priceRange.max || product.price <= parseFloat(filters.priceRange.max)) &&
        (!filters.organicOnly || product.name.toLowerCase().includes('organic'))
      )
      setProducts(prevProducts => [...prevProducts, ...newProducts])
      setPage(prevPage => prevPage + 1)
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    setProducts([])
    setPage(1)
    loadMoreProducts()
  }, [filters])

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-emerald-600 font-bold">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Farmer: {product.farmer}</p>
              <p className="text-sm text-gray-500">Category: {product.category}</p>
              <p className="text-sm text-gray-500">Subcategory: {product.subcategory}</p>
              <button 
                onClick={() => onAddToCart(product)}
                className="mt-4 w-full bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      {loading && <p className="text-center mt-4">Loading more products...</p>}
      {!loading && (
        <button
          onClick={loadMoreProducts}
          className="mt-8 w-full bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-700 transition-colors"
        >
          Load More
        </button>
      )}
    </div>
  )
}

export default function Marketplace({ session }: MarketplaceProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [advancedFilters, setAdvancedFilters] = useState<FilterState>({ priceRange: { min: '', max: '' }, organicOnly: false })
  const [showCart, setShowCart] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])

  const handleAdvancedFilter = (newFilters: FilterState) => {
    setAdvancedFilters(newFilters)
  }

  const combinedFilters = {
    ...advancedFilters,
    category: selectedCategory,
    subcategory: selectedSubcategory
  }

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-emerald-800">Marketplace</h1>
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="lg:w-1/4 mb-8 lg:mb-0">
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            {categories.map(category => (
              <div key={category.id} className="mb-4">
                <button
                  onClick={() => setSelectedCategory(prevCategory => prevCategory === category.name ? null : category.name)}
                  className="flex justify-between items-center w-full text-left p-2 hover:bg-emerald-100 rounded transition-colors"
                >
                  <span className={selectedCategory === category.name ? 'font-semibold' : ''}>{category.name}</span>
                  {selectedCategory === category.name ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {selectedCategory === category.name && (
                  <ul className="ml-4 mt-2 space-y-1">
                    {category.subcategories.map(sub => (
                      <li key={sub}>
                        <button
                          onClick={() => setSelectedSubcategory(prevSub => prevSub === sub ? null : sub)}
                          className={`w-full text-left p-2 hover:bg-emerald-100 rounded transition-colors ${selectedSubcategory === sub ? 'bg-emerald-100 font-semibold' : ''}`}
                        >
                          {sub}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <AdvancedSearchFilter onFilter={handleAdvancedFilter} />
        </div>

        <div className="lg:w-1/2">
          <InfiniteScrollProducts filters={combinedFilters} onAddToCart={addToCart} />
        </div>

        <div className="lg:w-1/4 mt-8 lg:mt-0">
          <button
            onClick={() => setShowCart(!showCart)}
            className="w-full mb-4 bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-700 transition-colors flex items-center justify-center"
          >
            <CartIcon className="mr-2 h-4 w-4" /> {showCart ? 'Hide Cart' : 'View Cart'}
          </button>
          {showCart && <ShoppingCart cart={cart} session={session} />}
        </div>
      </div>
    </div>
  )
}