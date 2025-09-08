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
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30';
      case 'ready': return 'bg-blue-500/20 text-blue-400 border border-blue-400/30';
      case 'picked up': return 'bg-purple-500/20 text-purple-400 border border-purple-400/30';
      case 'delivered': return 'bg-green-500/20 text-green-400 border border-green-400/30';
      default: return 'bg-gray-500/20 text-gray-400 border border-gray-400/30';
    }
  };

  if (loading) {
    return (
      <div className="p-10 bg-slate-800 rounded-3xl shadow-xl mt-8 text-center">
        <p className="text-gray-300 text-lg animate-pulse">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 bg-slate-800 rounded-3xl shadow-xl mt-8 text-center text-red-400 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-slate-900 min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-white font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-800 rounded-3xl shadow-xl p-6 sm:p-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-lime-400 mb-2 drop-shadow-lg">
            Manage Orders 📋
          </h2>
          <p className="text-gray-300 mb-6 sm:mb-8 text-lg">
            Track and update the status of your shop’s orders.
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
                  className={`p-6 bg-slate-700/50 border border-slate-600 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.01] ${
                    order.status === 'delivered' ? 'opacity-70' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        Order #{order.id.slice(-6)}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                        Total: <span className="font-semibold text-lime-400">₹{Number(order.total_price).toFixed(2)}</span>
                      </p>
                    </div>
                    <span
                      className={`py-1 px-3 rounded-full font-semibold text-sm ${getStatusColor(order.status)}`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-bold text-gray-200 mb-2">Items:</h4>
                    <ul className="space-y-1 text-sm text-gray-400">
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
                        className="bg-lime-600 hover:bg-lime-700 text-white font-semibold"
                      >
                        ✅ Mark as Ready
                      </Button>
                    )}
                    {order.status === 'ready' && (
                      <Button
                        onClick={() => updateOrderStatus(order.id, 'picked up')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                      >
                        📦 Picked Up
                      </Button>
                    )}
                    {order.status === 'picked up' && (
                      <Button
                        onClick={() => updateOrderStatus(order.id, 'delivered')}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold"
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
