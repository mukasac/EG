'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      // Fetch cart items from API
      fetchCartItems()
    }
  }, [session])

  const fetchCartItems = async () => {
    // In a real app, this would be an API call
    const items = await fetch('/api/cart').then(res => res.json())
    setCartItems(items)
  }

  const updateQuantity = async (id: number, quantity: number) => {
    // Update quantity in API
    await fetch(`/api/cart/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    })
    // Update local state
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ))
  }

  const removeItem = async (id: number) => {
    // Remove item from API
    await fetch(`/api/cart/${id}`, { method: 'DELETE' })
    // Update local state
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                <span className="mx-2">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                <button onClick={() => removeItem(item.id)} className="ml-4 text-red-500">Remove</button>
              </div>
            </div>
          ))}
          <div className="border-t pt-4 mt-4">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <button className="w-full mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}