"use client"

import { useState } from "react"
import { Search, ShoppingCart, Heart, ChevronRight, Filter } from "lucide-react"

export default function EcommerceD() {
  const [cart, setCart] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showCheckout, setShowCheckout] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const products = [
    {
      id: "premium-headphones",
      name: "Premium Wireless Headphones",
      price: 299.99,
      category: "electronics",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: "smart-watch",
      name: "Smart Watch Pro",
      price: 199.99,
      category: "electronics",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: "wireless-speaker",
      name: "Wireless Speaker",
      price: 149.99,
      category: "electronics",
      image: "https://images.unsplash.com/photo-1606220588911-2b0d616f9d2a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    },
  ]

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === "all" || product.category === selectedCategory)
  )

  const addToCart = (productId: string) => {
    setCart([...cart, productId])
  }

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(id => id !== productId))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">TechStore</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <ShoppingCart className="h-6 w-6" />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showCheckout ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
            <div className="space-y-4">
              {cart.map(productId => {
                const product = products.find(p => p.id === productId)
                return (
                  <div key={productId} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <img src={product?.image} alt={product?.name} className="w-16 h-16 object-cover rounded" />
                      <div>
                        <h3 className="font-medium">{product?.name}</h3>
                        <p className="text-gray-600">${product?.price}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(productId)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                )
              })}
              <div className="flex justify-between items-center pt-4">
                <span className="text-lg font-medium">Total: ${cart.reduce((total, productId) => {
                  const product = products.find(p => p.id === productId)
                  return total + (product?.price || 0)
                }, 0).toFixed(2)}</span>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-6">
            {/* Sidebar */}
            <div className="w-64 bg-white rounded-lg shadow p-4 h-fit">
              <h3 className="font-medium text-lg mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    selectedCategory === "all" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
                  }`}
                >
                  All Products
                </button>
                <button
                  onClick={() => setSelectedCategory("electronics")}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    selectedCategory === "electronics" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
                  }`}
                >
                  Electronics
                </button>
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="relative">
                      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                      <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow">
                        <Heart className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg">{product.name}</h3>
                      <p className="text-gray-600 mt-1">${product.price}</p>
                      <button
                        onClick={() => addToCart(product.id)}
                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {cart.length > 0 && !showCheckout && (
          <div className="fixed bottom-4 right-4">
            <button
              onClick={() => setShowCheckout(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 hover:bg-blue-700"
            >
              <span>View Cart</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </main>
    </div>
  )
} 