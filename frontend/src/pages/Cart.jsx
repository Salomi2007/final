import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function Cart() {
  const { cartItems, removeFromCart, loading } = useCart()
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated()) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Please Login</h1>
        <p className="text-gray-600 mb-4">You need to login to view your cart</p>
        <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Login
        </Link>
      </div>
    )
  }

  const total = cartItems.reduce((sum, item) => {
    const price = item.product?.price || 0
    return sum + (price * item.quantity)
  }, 0)

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p>Loading cart...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link to="/products" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div>
          <div className="space-y-4 mb-8">
            {cartItems.map(item => (
              <div key={item.product?._id} className="flex items-center bg-white p-4 rounded-lg shadow">
                <img 
                  src={item.product?.image || '/placeholder.jpg'} 
                  alt={item.product?.name || 'Product'} 
                  className="w-16 h-16 object-cover rounded" 
                />
                <div className="flex-grow ml-4">
                  <h3 className="font-semibold">{item.product?.name || 'Unknown Product'}</h3>
                  <p className="text-gray-600">${item.product?.price || 0}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-gray-100 px-3 py-1 rounded">Qty: {item.quantity}</span>
                </div>
                <div className="ml-4 font-semibold">
                  ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                </div>
                <div className="ml-4 flex space-x-2">
                  <Link 
                    to="/checkout"
                    className="bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700 text-sm"
                  >
                    Buy Now
                  </Link>
                  <button 
                    onClick={() => removeFromCart(item.product?._id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold">Total: ${total.toFixed(2)}</span>
            </div>
            <Link 
              to="/checkout"
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors block text-center"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart