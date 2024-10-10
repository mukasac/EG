'use client'

import { useState, useEffect } from 'react'

export default function AdminPanel() {
  const [products, setProducts] = useState([])
  const [resources, setResources] = useState([])
  const [applications, setApplications] = useState([])

  useEffect(() => {
    // Fetch data from API
    // This is where you'd normally make API calls
    setProducts([{ id: 1, name: 'Tomatoes' }, { id: 2, name: 'Corn' }])
    setResources([{ id: 1, title: 'Farming Techniques' }, { id: 2, title: 'Pest Control' }])
    setApplications([{ id: 1, org: 'Farm Co' }, { id: 2, org: 'Agri University' }])
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        <ul>
          {products.map(product => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Educational Resources</h2>
        <ul>
          {resources.map(resource => (
            <li key={resource.id}>{resource.title}</li>
          ))}
        </ul>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Partnership Applications</h2>
        <ul>
          {applications.map(app => (
            <li key={app.id}>{app.org}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}