import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import Button from '../../components/UI/Button';

// ProductCard component remains the same. The change is in how it's used.
const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    if (onAddToCart) onAddToCart(product);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative w-full h-48 bg-gray-200">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-500">
            No Image
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-xl mb-1 text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
        <p className="text-lg font-bold text-lime-600 mb-4">₹ {product.price}</p>
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </div>
    </div>
  );
};

const ShopProducts = ({ onNavigate, shopId, onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts(shopId);
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setError('Unexpected API response format.');
          console.error('API response is not an array:', data);
        }
      } catch (e) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [shopId]);

  // Updated handleAdd to pass the product and shopId to onAddToCart
  const handleAdd = (product) => {
    if (onAddToCart) onAddToCart(product, shopId); // Pass shopId here

    // Show toast
    setToastMessage(`Added "${product.name}" to cart`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000); // auto-hide after 2 sec
  };

  if (loading) {
    return (
      <div className="p-10 bg-white rounded-2xl shadow-2xl mt-8 text-center">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 bg-white rounded-2xl shadow-2xl mt-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-10 bg-white rounded-2xl shadow-2xl mt-8 relative">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Products</h2>
      <p className="text-gray-600 mb-6">
        Browse the available products from your selected shop.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={() => handleAdd(product)} // Pass product to handleAdd
            />
          ))
        ) : (
          <p className="text-gray-600">No products available at this time.</p>
        )}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-lime-600 text-white px-6 py-3 rounded-xl shadow-lg animate-fadeIn">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default ShopProducts;