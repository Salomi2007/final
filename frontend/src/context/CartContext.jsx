import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const { isAuthenticated } = useAuth()

  // Get cart count
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  // Add item to cart
  const addToCart = async (product) => {
    if (!isAuthenticated()) {
      throw new Error('You need to login to add items to cart')
    }

    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:3001/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          productId: product._id || product.id, 
          quantity: 1 
        })
      })

      if (response.ok) {
        const updatedCart = await response.json()
        setCartItems(updatedCart)
        return { success: true, message: 'Added to cart successfully!' }
      } else {
        const data = await response.json()
        throw new Error(data.message || 'Failed to add to cart')
      }
    } catch (error) {
      return { success: false, message: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Remove item from cart
  const removeFromCart = async (productId) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:3001/api/cart/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const updatedCart = await response.json()
        setCartItems(updatedCart)
      }
    } catch (error) {
      console.error('Error removing from cart:', error)
    } finally {
      setLoading(false)
    }
  }

  // Get cart items
  const fetchCart = async () => {
    if (!isAuthenticated()) return

    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:3001/api/cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const cart = await response.json()
        setCartItems(cart)
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setLoading(false)
    }
  }

  // Clear cart on logout
  useEffect(() => {
    if (isAuthenticated()) {
      fetchCart()
    } else {
      setCartItems([])
    }
  }, [isAuthenticated()])

  const value = {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    fetchCart,
    getCartCount
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}