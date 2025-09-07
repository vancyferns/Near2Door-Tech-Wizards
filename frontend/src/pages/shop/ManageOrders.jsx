import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/UI/Button';

const ManageOrders = () => {
  const { user } = useAuth();
  const shopId = user?.shop_id || '68b43e4e35675d3a5d493292';
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await api.getShopOrders(shopId);
        if (Array.isArray(res)) {
          setOrders(res);
        } else {
          setOrders([]);
          console.warn('Unexpected API response:', res);
        }
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setOrders([]);
        setError('Failed to fetch orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [shopId]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.updateOrderStatus(shopId, orderId, newStatus);
      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error('Failed to update order status:', err);
      alert('Could not update order status. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'ready': return 'bg-blue-100 text-blue-800';
      case 'picked up': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="p-10 bg-white rounded-3xl shadow-lg mt-8 text-center">
        <p className="text-gray-600 text-lg animate-pulse">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 bg-white rounded-3xl shadow-lg mt-8 text-center text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            Order Management 📋
          </h2>
          <p className="text-gray-600 mb-6 sm:mb-8 text-lg">
            View and update the status of incoming orders.
          </p>

          {orders.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">No orders found.</p>
            </div>
          ) : (
            <ul className="space-y-6">
              {orders.map(order => (
                <li
                  key={order.id}
                  className={`p-6 border border-gray-200 rounded-2xl shadow-sm transition-all duration-300 transform hover:shadow-lg ${
                    order.status === 'delivered' ? 'opacity-70' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                        Order #{order.id.slice(-6)}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Total: <span className="font-semibold text-gray-900">₹{Number(order.total_price).toFixed(2)}</span>
                      </p>
                    </div>
                    <span className={`py-1 px-3 rounded-full font-semibold text-sm ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-bold text-gray-900 mb-2">Items:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {order.items?.map((item, idx) => (
                        <li key={idx} className="flex justify-between">
                          <span>{item.quantity} × {item.name}</span>
                          <span>₹{Number(item.price).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    {order.status === 'pending' && (
                      <Button
                        onClick={() => updateOrderStatus(order.id, 'ready')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        ✅ Mark as Ready
                      </Button>
                    )}
                    {order.status === 'ready' && (
                      <Button
                        onClick={() => updateOrderStatus(order.id, 'picked up')}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        📦 Picked Up
                      </Button>
                    )}
                    {order.status === 'picked up' && (
                      <Button
                        onClick={() => updateOrderStatus(order.id, 'delivered')}
                        className="bg-lime-600 hover:bg-lime-700"
                      >
                        🎉 Delivered
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;