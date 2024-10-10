"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Plus, Edit, Trash, User } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  image: string;
};

export default function FarmerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/farmer/signin');
    } else if (status === 'authenticated') {
      fetchProducts();
    }
  }, [status, router]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/farmer/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch('/api/farmer/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) throw new Error('Failed to add product');
      const addedProduct = await response.json();
      setProducts([...products, addedProduct]);
      setIsAddingProduct(false);
      setNewProduct({});
    } catch (err) {
      setError('Failed to add product. Please try again.');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/farmer/products?id=${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete product');
        setProducts(products.filter(product => product.id !== id));
      } catch (err) {
        setError('Failed to delete product. Please try again.');
      }
    }
  };

  if (status === 'loading' || isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (!session) {
    return <div className="text-center mt-8">Please sign in to access the farmer dashboard.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Farmer Dashboard</h1>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Products</h2>
        <button
          onClick={() => setIsAddingProduct(true)}
          className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 mb-4"
        >
          <Plus className="inline-block mr-2" size={20} /> Add New Product
        </button>
        {isAddingProduct && (
          <div className="bg-white p-4 rounded shadow mb-4">
            <h3 className="text-xl font-semibold mb-3">Add New Product</h3>
            <input
              type="text"
              placeholder="Product Name"
              className="w-full p-2 mb-2 border rounded"
              value={newProduct.name || ''}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Category"
              className="w-full p-2 mb-2 border rounded"
              value={newProduct.category || ''}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            />
            <input
              type="text"
              placeholder="Subcategory"
              className="w-full p-2 mb-2 border rounded"
              value={newProduct.subcategory || ''}
              onChange={(e) => setNewProduct({ ...newProduct, subcategory: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              className="w-full p-2 mb-2 border rounded"
              value={newProduct.price || ''}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            />
            <input
              type="text"
              placeholder="Image URL"
              className="w-full p-2 mb-2 border rounded"
              value={newProduct.image || ''}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            <button
              onClick={handleAddProduct}
              className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
            >
              Add Product
            </button>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded shadow">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-1">Category: {product.category}</p>
              <p className="text-gray-600 mb-1">Subcategory: {product.subcategory}</p>
              <p className="text-emerald-600 font-bold mb-2">${product.price.toFixed(2)}</p>
              <div className="flex justify-between">
                <button className="text-blue-500 hover:text-blue-700">
                  <Edit size={20} />
                </button>
                <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500 hover:text-red-700">
                  <Trash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Farmer Profile</h2>
        <div className="bg-white p-4 rounded shadow">
          <div className="flex items-center mb-4">
            <User className="mr-2" size={24} />
            <span className="text-lg font-semibold">{session.user?.name}</span>
          </div>
          <p className="text-gray-600 mb-2">Email: {session.user?.email}</p>
          {/* Add more profile information here */}
          <button className="mt-4 bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}