'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { ShoppingCart, Award, Book, TrendingUp, CreditCard } from 'lucide-react'

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Purchase {
  id: number;
  date: string;
  total: number;
  items: CartItem[];
}

interface PaymentMethod {
  id: number;
  type: string;
  last4: string;
}

interface Course {
  id: number;
  title: string;
  progress: number;
}

export default function Dashboard() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [points, setPoints] = useState(0)
  const [courses, setCourses] = useState<Course[]>([])
  const [recentPurchases, setRecentPurchases] = useState<Purchase[]>([])
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      fetchDashboardData()
    } else {
      setIsLoading(false)
    }
  }, [session])

  const fetchDashboardData = async () => {
    setIsLoading(true)
    try {
      const [cartResponse, pointsResponse, coursesResponse, purchasesResponse, paymentsResponse] = await Promise.all([
        fetch('/api/cart'),
        fetch('/api/loyalty-points'),
        fetch('/api/courses'),
        fetch('/api/recent-purchases'),
        fetch('/api/payment-methods')
      ])

      const [cart, points, courses, purchases, payments] = await Promise.all([
        cartResponse.json(),
        pointsResponse.json(),
        coursesResponse.json(),
        purchasesResponse.json(),
        paymentsResponse.json()
      ])

      setCartItems(cart)
      setPoints(points)
      setCourses(courses)
      setRecentPurchases(purchases)
      setPaymentMethods(payments)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addPaymentMethod = async () => {
    // This is a placeholder function. In a real application, you would open a modal or navigate to a page to add a payment method.
    alert("Add payment method functionality to be implemented")
  }

  const removePaymentMethod = async (id: number) => {
    try {
      await fetch(`/api/payment-methods/${id}`, { method: 'DELETE' })
      setPaymentMethods(prevMethods => prevMethods.filter(method => method.id !== id))
    } catch (error) {
      console.error('Failed to remove payment method:', error)
    }
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-emerald-50">
        <p className="text-xl text-emerald-800 mb-4">Please sign in to view your dashboard.</p>
        <Link href="/signin" className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
          Sign In
        </Link>
      </div>
    )
  }

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-emerald-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-emerald-800">Welcome, {session.user?.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <section className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-700 flex items-center">
            <Award className="mr-2" /> Your Loyalty Points
          </h2>
          <p className="text-3xl font-bold text-emerald-600">{points} points</p>
          <Link href="/rewards" className="mt-4 inline-block text-emerald-600 hover:text-emerald-800">
            View Rewards →
          </Link>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-700 flex items-center">
            <Book className="mr-2" /> Your Courses
          </h2>
          {courses.map(course => (
            <div key={course.id} className="mb-4">
              <p className="font-semibold">{course.title}</p>
              <div className="w-full bg-emerald-200 rounded-full h-2.5">
                <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
              </div>
              <p className="text-sm text-emerald-600 mt-1">{course.progress}% complete</p>
            </div>
          ))}
          <Link href="/education" className="mt-2 inline-block text-emerald-600 hover:text-emerald-800">
            Explore More Courses →
          </Link>
        </section>
        
        <section className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-700 flex items-center">
            <ShoppingCart className="mr-2" /> Recent Purchases
          </h2>
          {recentPurchases.length > 0 ? (
            <ul className="space-y-4">
              {recentPurchases.map(purchase => (
                <li key={purchase.id} className="border-b pb-2">
                  <p className="font-semibold">Order #{purchase.id} - {purchase.date}</p>
                  <p className="text-emerald-600">Total: ${purchase.total.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent purchases.</p>
          )}
          <Link href="/marketplace" className="mt-4 inline-block text-emerald-600 hover:text-emerald-800">
            Shop Now →
          </Link>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-700 flex items-center">
            <CreditCard className="mr-2" /> Payment Methods
          </h2>
          {paymentMethods.length > 0 ? (
            <ul className="space-y-4">
              {paymentMethods.map(method => (
                <li key={method.id} className="flex justify-between items-center">
                  <span>{method.type} ending in {method.last4}</span>
                  <button
                    onClick={() => removePaymentMethod(method.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No payment methods added.</p>
          )}
          <button
            onClick={addPaymentMethod}
            className="mt-4 bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-700 transition-colors"
          >
            Add Payment Method
          </button>
        </section>
      </div>

      <section className="mt-12 bg-emerald-700 p-6 rounded-xl shadow-lg text-white">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <TrendingUp className="mr-2" /> Farming Tip of the Day
        </h2>
        <p>Implementing crop rotation can significantly improve soil health and reduce pest problems. Consider rotating your crops every season for better yields.</p>
      </section>
    </div>
  )
}