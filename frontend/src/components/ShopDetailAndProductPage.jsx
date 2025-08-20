import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';
import { api } from '../api';

const ShopDetailAndProductPage = ({ shopId }) => {
  const { userToken } = useContext(AppContext);
  const [shopDetails, setShopDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.shopsShopIdGet(shopId).then(res => {
      setShopDetails(res.data);
      setLoading(false);
    });
  }, [shopId, userToken]);

  if (loading) return <p>Loading shop details...</p>;
  if (!shopDetails) return <p>Shop not found.</p>;

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-700 mb-4">{shopDetails.name}</h3>
      <p className="text-sm text-gray-600 mb-4">{shopDetails.description}</p>
      <div className="my-4">
        <h4 className="text-lg font-semibold mb-2">Products</h4>
        <ul className="space-y-2">
          {shopDetails.products.length === 0 ? <p>No products found.</p> : shopDetails.products.map(product => (
            <li key={product.id} className="p-3 bg-gray-100 rounded flex justify-between items-center">
              <span className="font-medium">{product.name}</span>
              <span className="text-sm text-gray-500">₹{product.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShopDetailAndProductPage;