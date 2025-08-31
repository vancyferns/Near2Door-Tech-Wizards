import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import Button from '../../components/UI/Button';

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    console.log(`Adding ${product.name} to cart.`);
    // Add cart logic here
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative w-full h-48 bg-gray-200">
        {product.images && product.images.length > 0 ? (
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-500">No Image</div>
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

const ShopProducts = ({ onNavigate, shopId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div className="p-10 bg-white rounded-2xl shadow-2xl mt-8 text-center">Loading products...</div>;
  }

  if (error) {
    return <div className="p-10 bg-white rounded-2xl shadow-2xl mt-8 text-center text-red-500">{error}</div>;
  }
  
  return (
    <div className="p-10 bg-white rounded-2xl shadow-2xl mt-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Products</h2>
      <p className="text-gray-600 mb-6">Browse the available products from your selected shop.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-600">No products available at this time.</p>
        )}
      </div>
    </div>
  );
};

export default ShopProducts;