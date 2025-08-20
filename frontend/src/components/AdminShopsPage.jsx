import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';
import { api } from '../api';

const AdminShopsPage = () => {
  const { userToken } = useContext(AppContext);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.adminShopsGet(null, userToken).then(res => {
      setShops(res.data);
      setLoading(false);
    });
  }, [userToken]);

  const handleApproveShop = (shopId) => {
    api.adminShopsShopIdApprovePut(shopId, userToken).then(() => {
      api.adminShopsGet(null, userToken).then(res => setShops(res.data));
    });
  };

  if (loading) return <p>Loading shops...</p>;

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Shops</h3>
      {shops.length === 0 ? (
        <p>No shops found.</p>
      ) : (
        <ul className="space-y-4">
          {shops.map(shop => (
            <li key={shop.id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">{shop.name}</p>
                <p className="text-sm text-gray-600">Status: {shop.status}</p>
                <p className="text-sm text-gray-600">Owner ID: {shop.ownerId}</p>
              </div>
              {shop.status === 'pending' && (
                <button
                  onClick={() => handleApproveShop(shop.id)}
                  className="px-3 py-1 text-sm rounded-full bg-green-500 text-white hover:bg-green-600"
                >
                  Approve
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminShopsPage;