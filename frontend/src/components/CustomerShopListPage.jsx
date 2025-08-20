import React, { useState, useEffect } from 'react';
import { api } from '../api';

const CustomerShopListPage = ({ onNavigate }) => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.shopsGet().then(res => {
      setShops(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading shops...</p>;

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Available Shops</h3>
      {shops.length === 0 ? (
        <p>No shops available.</p>
      ) : (
        <ul className="space-y-4">
          {shops.map(shop => (
            <li key={shop.id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => onNavigate({ name: 'shop-detail', params: { shopId: shop.id } })}>
              <div>
                <p className="font-semibold text-lg">{shop.name}</p>
                <p className="text-sm text-gray-600">{shop.description}</p>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full text-white ${shop.status === 'open' ? 'bg-green-500' : 'bg-red-500'}`}>
                {shop.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerShopListPage;