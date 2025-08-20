import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';
import { api } from '../api';

const ShopOwnerOrdersPage = () => {
  const { userShopId, userToken } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userShopId) return;
    api.shopsShopIdOrdersGet(userShopId, userToken).then(res => {
      setOrders(res.data);
      setLoading(false);
    });
  }, [userShopId, userToken]);

  const handleUpdateStatus = (orderId, status) => {
    api.shopsShopIdOrdersOrderIdStatusPut(userShopId, orderId, { status }, userToken).then(() => {
      api.shopsShopIdOrdersGet(userShopId, userToken).then(res => setOrders(res.data));
    });
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Shop Orders</h3>
      {orders.length === 0 ? (
        <p>No new orders.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order.id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">Order #{order.id}</p>
                <p className="text-sm text-gray-600">Status: {order.status}</p>
                <p className="text-sm text-gray-600">Total: ₹{order.totalPrice}</p>
              </div>
              {order.status === 'pending' && (
                <div className="space-x-2">
                  <button
                    onClick={() => handleUpdateStatus(order.id, 'accepted')}
                    className="px-3 py-1 text-sm rounded-full bg-green-500 text-white hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                    className="px-3 py-1 text-sm rounded-full bg-red-500 text-white hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShopOwnerOrdersPage;