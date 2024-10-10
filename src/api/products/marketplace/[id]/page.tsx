import { notFound } from 'next/navigation'

// This would typically come from an API or database
const products = [
  { id: 1, name: 'Organic Tomatoes', price: 2.99, farmer: 'John Doe', description: 'Fresh, locally grown organic tomatoes.' },
  { id: 2, name: 'Fresh Corn', price: 1.50, farmer: 'Jane Smith', description: 'Sweet and juicy corn, perfect for grilling.' },
  { id: 3, name: 'Grass-fed Beef', price: 15.99, farmer: 'Bob Johnson', description: 'High-quality, grass-fed beef from local farms.' },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === parseInt(params.id))

  if (!product) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-xl mb-2">Price: ${product.price.toFixed(2)}</p>
      <p className="text-lg mb-4">Farmer: {product.farmer}</p>
      <p className="mb-6">{product.description}</p>
      <button className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600">
        Add to Cart
      </button>
    </div>
  )
}