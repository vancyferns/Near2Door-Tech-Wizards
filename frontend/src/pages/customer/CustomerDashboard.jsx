import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/api';
import MapTracker from '../../components/UI/MapTracker'; // ✅ use MapTracker

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
    <div className="p-4 sm:p-6 md:p-10 bg-gradient-to-b from-gray-50 to-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl mt-6 sm:mt-8 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 text-center sm:text-left">
        Customer Dashboard
      </h2>
      <p className="text-gray-600 mb-6 sm:mb-8 text-center sm:text-left text-base sm:text-lg">
        Welcome back, <span className="font-semibold text-lime-700">{user?.name}</span> 👋
      </p>

      {/* Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10">
        <button
          onClick={() => onNavigate('browse-shops')}
          className="group w-full p-6 sm:p-8 bg-white rounded-2xl shadow-md border border-gray-100 hover:border-lime-400 transition-all duration-300 text-left"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-lime-700">🛍 Featured Shops</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Discover trending shops and amazing new products curated for you.
          </p>
        </button>

        <div className="w-full p-6 sm:p-8 bg-white rounded-2xl shadow-md border border-gray-100">
          <h3 className="text-lg sm:text-xl font-semibold mb-2">📦 Recent Orders</h3>
          {loading ? (
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Loading orders...</p>
          ) : error ? (
            <p className="text-red-500 mt-2 text-sm sm:text-base">{error}</p>
          ) : recentOrders.length > 0 ? (
            <ul className="space-y-3 sm:space-y-4 mt-4">
              {recentOrders.map((order) => (
                <li
                  key={order.id}
                  className="bg-gray-50 p-4 sm:p-5 rounded-xl shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center hover:shadow-md transition"
                >
                  <div className="mb-2 sm:mb-0">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">Order #{order.id.slice(-6)}</p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Status:{' '}
                      <span
                        className={`font-medium ${
                          order.status === 'Delivered' ? 'text-green-600' : 'text-blue-600'
                        }`}
                      >
                        {order.status}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end space-x-3">
                    <p className="font-bold text-base sm:text-lg text-gray-900">₹{order.total_price.toFixed(2)}</p>
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
            <p className="text-gray-600 mt-2 text-sm sm:text-base">You have no recent orders.</p>
          )}
        </div>
      </div>

      {/* ✅ Live Map Tracking */}
      {tracking && selectedOrder && (
        <div className="mt-10 sm:mt-12">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center sm:text-left">
            Live Tracking for Order #{selectedOrder.slice(-6)}
          </h3>
          <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-200 aspect-[4/3] sm:aspect-[16/9] w-full">
            <MapTracker orderId={selectedOrder} role="customer" /> {/* ✅ swapped here */}
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
      <div className="text-center mt-10 sm:mt-12">
        <button
          onClick={() => onNavigate('cart')}
          className="px-8 sm:px-10 py-3 sm:py-4 bg-lime-600 text-white text-base sm:text-lg font-bold rounded-full shadow-lg transition-all duration-300 transform hover:bg-lime-700 hover:-translate-y-1"
        >
          🛒 Go to Cart
        </button>
      </div>
    </div>
  );
};

export default CustomerDashboard;
