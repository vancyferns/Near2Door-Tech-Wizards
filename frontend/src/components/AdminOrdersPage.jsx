import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';
import { api } from '../api';

const AdminOrdersPage = () => {
  const { userToken } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.adminOrdersGet(userToken).then(res => {
      setOrders(res.data);
      setLoading(false);
    });
  }, [userToken]);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-700 mb-4">All Orders</h3>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order.id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">Order #{order.id}</p>
                <p className="text-sm text-gray-600">Status: {order.status}</p>
                <p className="text-sm text-gray-600">Customer ID: {order.customerId}</p>
                <p className="text-sm text-gray-600">Shop ID: {order.shopId}</p>
                <p className="text-sm text-gray-600">Agent ID: {order.agentId}</p>
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

export default AdminOrdersPage;