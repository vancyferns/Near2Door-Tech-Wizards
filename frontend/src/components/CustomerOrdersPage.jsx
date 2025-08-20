import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';
import { api } from '../api';

const CustomerOrdersPage = () => {
  const { userId, userToken } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    api.usersUserIdOrdersGet(userId, userToken).then(res => {
      setOrders(res.data);
      setLoading(false);
    });
  }, [userId, userToken]);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-700 mb-4">My Orders</h3>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order.id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">Order #{order.id}</p>
                <p className="text-sm text-gray-600">Total: ₹{order.totalPrice}</p>
              </div>
              <span className="px-3 py-1 text-sm rounded-full bg-blue-500 text-white">
                {order.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerOrdersPage;