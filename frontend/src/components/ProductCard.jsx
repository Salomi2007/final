import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

function ProductCard({ product }) {
  const { isAuthenticated } = useAuth()
  const { addToCart, loading } = useCart()
  const navigate = useNavigate()

  const handleAddToCart = async () => {
    if (!isAuthenticated()) {
      alert('You need to login to continue')
      navigate('/login')
      return
    }

    const result = await addToCart(product)
    alert(result.message)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.category}</p>
        <p className="text-xl font-bold text-blue-600 mb-3">${product.price}</p>
        <div className="space-y-2">
          <button 
            onClick={handleAddToCart}
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add to Cart'}
          </button>
          <Link 
            to={`/product/${product._id}`}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors block text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductCard