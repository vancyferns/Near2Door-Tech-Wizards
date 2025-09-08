import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/api';
import MapTracker from '../../components/UI/MapTracker';

const CustomerDashboard = ({ onNavigate }) => {
  const { user } = useAuth();
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const customerId = user?.id;

  useEffect(() => {
    const fetchRecentOrders = async () => {
      if (!customerId) {
        setLoading(false);
        return;
      }
      try {
        const data = await api.getCustomerOrders(customerId);
        if (Array.isArray(data)) {
          setRecentOrders(data);
        } else {
          setError('Unexpected API response format for orders.');
        }
      } catch (e) {
        setError('Failed to fetch recent orders.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentOrders();
  }, [customerId]);

  const handleTrackOrder = (orderId) => {
    setSelectedOrder(orderId);
    setTracking(true);
  };

  const stopTracking = () => {
    setTracking(false);
    setSelectedOrder(null);
  };

  return (
    <div className="bg-slate-950 text-white min-h-[calc(100vh-140px)] py-14 px-5 sm:px-8 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-lime-400 drop-shadow-md mb-3 tracking-tight">
            Customer Dashboard
          </h2>
          <p className="text-base sm:text-lg text-gray-400">
            Welcome back, <span className="font-semibold text-white">{user?.name}</span> 👋
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Featured Shops */}
          <button
            onClick={() => onNavigate('browse-shops')}
            className="group w-full p-7 sm:p-9 bg-slate-900 rounded-2xl shadow-lg border border-slate-800 hover:border-lime-500 transition-all duration-300 text-left"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white group-hover:text-lime-400 transition">
              🛍 Featured Shops
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Discover trending shops and amazing new products curated for you.
            </p>
          </button>

          {/* Recent Orders */}
          <div className="w-full p-7 sm:p-9 bg-slate-900 rounded-2xl shadow-lg border border-slate-800">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">📦 Recent Orders</h3>
            {loading ? (
              <p className="text-gray-400 mt-2 text-sm sm:text-base">Loading orders...</p>
            ) : error ? (
              <p className="text-red-500 mt-2 text-sm sm:text-base">{error}</p>
            ) : recentOrders.length > 0 ? (
              <ul className="space-y-4">
                {recentOrders.map((order) => (
                  <li
                    key={order.id}
                    className="bg-slate-800/80 p-4 sm:p-5 rounded-xl shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center hover:shadow-md hover:bg-slate-800 transition"
                  >
                    <div className="mb-2 sm:mb-0">
                      <p className="font-semibold text-white text-sm sm:text-base">
                        Order #{order.id.slice(-6)}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400">
                        Status:{' '}
                        <span
                          className={`font-medium ${
                            order.status === 'Delivered'
                              ? 'text-green-400'
                              : 'text-blue-400'
                          }`}
                        >
                          {order.status}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-4">
                      <p className="font-bold text-base sm:text-lg text-lime-400">
                        ₹{order.total_price.toFixed(2)}
                      </p>
                      {order.status !== 'Delivered' && (
                        <button
                          onClick={() => handleTrackOrder(order.id)}
                          className="px-3 sm:px-4 py-2 bg-lime-600 text-white text-xs sm:text-sm rounded-lg shadow hover:bg-lime-700 transition"
                        >
                          🚚 Track
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 mt-2 text-sm sm:text-base">
                You have no recent orders.
              </p>
            )}
          </div>
        </div>

        {/* Live Map Tracking */}
        {tracking && selectedOrder && (
          <div className="mt-12">
            <h3 className="text-xl sm:text-2xl font-bold text-lime-400 mb-4 text-center sm:text-left">
              Live Tracking for Order #{selectedOrder.slice(-6)}
            </h3>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-800 aspect-[4/3] sm:aspect-[16/9] w-full">
              <MapTracker orderId={selectedOrder} role="customer" />
            </div>
            <div className="flex justify-center sm:justify-start">
              <button
                onClick={stopTracking}
                className="mt-6 px-5 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white text-sm sm:text-base rounded-lg shadow hover:bg-red-700 transition"
              >
                ✖ Stop Tracking
              </button>
            </div>
          </div>
        )}

        {/* Go to Cart */}
        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('cart')}
            className="px-8 sm:px-10 py-3 sm:py-4 bg-lime-600 text-white text-base sm:text-lg font-bold rounded-full shadow-lg transition-all duration-300 transform hover:bg-lime-700 hover:-translate-y-1"
          >
            🛒 Go to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
