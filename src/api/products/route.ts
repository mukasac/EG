import { NextResponse } from 'next/server'

const products = [
  { id: 1, name: 'Organic Tomatoes', price: 2.99, farmer: 'John Doe' },
  { id: 2, name: 'Fresh Corn', price: 1.50, farmer: 'Jane Smith' },
  { id: 3, name: 'Grass-fed Beef', price: 15.99, farmer: 'Bob Johnson' },
]

export async function GET() {
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const newProduct = await request.json()
  // Here you would typically save the new product to a database
  products.push({ id: products.length + 1, ...newProduct })
  return NextResponse.json({ message: 'Product added successfully' }, { status: 201 })
}