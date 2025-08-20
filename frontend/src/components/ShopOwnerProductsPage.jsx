import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';
import { api } from '../api';

const ShopOwnerProductsPage = () => {
  const { userShopId, userToken } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userShopId) return;
    api.shopsShopIdProductsGet(userShopId, userToken).then(res => {
      setProducts(res.data);
      setLoading(false);
    });
  }, [userShopId, userToken]);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Shop Products</h3>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="space-y-4">
          {products.map(product => (
            <li key={product.id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">{product.name}</p>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
              <span className="text-sm text-gray-500">Stock: {product.stock}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShopOwnerProductsPage;