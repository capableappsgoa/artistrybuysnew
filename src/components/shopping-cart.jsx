"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Trash2, Plus, Minus } from "lucide-react"

// Sample product data (in a real app, this would come from an API)
const sampleProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 599.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Laptop",
    price: 1299.99,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function ShoppingCart() {
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    } else {
      // For demo purposes, initialize with one item
      const initialCart = [{ ...sampleProducts[0], quantity: 1 }]
      setCart(initialCart)
      localStorage.setItem("cart", JSON.stringify(initialCart))
    }
  }, [])

  // Update localStorage and total whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
    calculateTotal()
  }, [cart])

  // Calculate total price of all items in cart
  const calculateTotal = () => {
    const sum = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    setTotal(sum)
  }

  // Add a product to the cart
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id)

    if (existingItem) {
      // If item already exists, increase quantity
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      // Otherwise add new item with quantity 1
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  // Remove a product from the cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId))
  }

  // Increase quantity of a product
  const increaseQuantity = (productId) => {
    setCart(cart.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item)))
  }

  // Decrease quantity of a product
  const decreaseQuantity = (productId) => {
    setCart(cart.map((item) => (item.id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item)))
  }

  // Handle place order
  const placeOrder = () => {
    alert(`Order placed! Total: $${total.toFixed(2)}`)
    setCart([])
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-2/3">
        {cart.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 relative">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-sm text-gray-900 w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Add More Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sampleProducts.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 flex flex-col">
                <div className="relative h-32 mb-4">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain" />
                </div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:w-1/3">
        <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-2 mb-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={placeOrder}
            disabled={cart.length === 0}
            className={`w-full mt-6 py-3 px-4 rounded-lg text-white font-medium ${
              cart.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  )
}

