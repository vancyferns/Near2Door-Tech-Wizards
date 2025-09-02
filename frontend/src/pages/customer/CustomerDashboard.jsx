import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/api';
import MapView from '../../components/UI/MapView'; // ✅ Import map component

const CustomerDashboard = ({ onNavigate }) => {
  const { user } = useAuth();
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For tracking live order
  const [tracking, setTracking] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // For placing order with location
  const [placingOrder, setPlacingOrder] = useState(false);

  // Get the customer ID from the user context
  const customerId = user?.id;

  // Fetch recent orders
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
          console.error('Orders API response is not an array:', data);
        }
      } catch (e) {
        setError('Failed to fetch recent orders. Please try again later.');
        console.error('Error fetching recent orders:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentOrders();
  }, [customerId]);

  // ✅ Start tracking order
  const handleTrackOrder = (orderId) => {
    setSelectedOrder(orderId);
    setTracking(true);
  };

  // ✅ Stop tracking
  const stopTracking = () => {
    setTracking(false);
    setSelectedOrder(null);
  };

  // ✅ Place order with customer location
  const handlePlaceOrder = async (orderData) => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setPlacingOrder(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Attach location to order payload
        const payload = {
          ...orderData,
          customer_id: customerId,
          customer_location: { lat: latitude, lng: longitude },
        };

        try {
          const res = await api.placeOrder(payload);
          if (res.ok) {
            alert('Order placed successfully!');
            setRecentOrders((prev) => [res.data, ...prev]); // Add new order to recent
          } else {
            alert('Failed to place order');
            console.error('Order placement failed:', res.data);
          }
        } catch (err) {
          console.error('Error placing order:', err);
          alert('Something went wrong while placing the order.');
        } finally {
          setPlacingOrder(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Please enable location to place an order.');
        setPlacingOrder(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="p-10 bg-white rounded-2xl shadow-2xl mt-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Customer Dashboard</h2>
      <p className="text-gray-600 mb-6">
        Welcome back, {user?.name}! Here's a look at your recent activity.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <button
          onClick={() => onNavigate('browse-shops')}
          className="p-8 bg-gray-50 rounded-xl shadow-md transform transition-transform hover:scale-105 duration-300 text-left"
        >
          <h3 className="text-xl font-semibold mb-2">Featured Shops</h3>
          <p className="text-gray-600">Discover new shops and their amazing products.</p>
        </button>

        <div className="p-8 bg-gray-50 rounded-xl shadow-md transform transition-transform hover:scale-105 duration-300">
          <h3 className="text-xl font-semibold mb-2">Recent Orders</h3>
          {loading ? (
            <p className="text-gray-600">Loading orders...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : recentOrders.length > 0 ? (
            <ul className="space-y-4 mt-4">
              {recentOrders.map((order) => (
                <li
                  key={order.id}
                  className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-900">Order ID: {order.id.slice(-6)}</p>
                    <p className="text-sm text-gray-600">
                      Status: <span className="font-medium text-lime-600">{order.status}</span>
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <p className="font-bold text-lg text-gray-900">
                      ₹ {order.total_price.toFixed(2)}
                    </p>
                    {/* ✅ Track order button */}
                    {order.status !== 'Delivered' && (
                      <button
                        onClick={() => handleTrackOrder(order.id)}
                        className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg shadow hover:bg-blue-700 transition"
                      >
                        🚚 Track
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">You have no recent orders.</p>
          )}
        </div>
      </div>

      {/* ✅ Live Map Tracking */}
      {tracking && selectedOrder && (
        <div className="mt-10">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Tracking Order: {selectedOrder.slice(-6)}
          </h3>
          <MapView orderId={selectedOrder} role="customer" />
          <button
            onClick={stopTracking}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
          >
            ✖ Stop Tracking
          </button>
        </div>
      )}

      {/* Add a "Go to Cart" button for convenience */}
      <div className="text-center mt-8">
        <button
          onClick={() => onNavigate('cart')}
          className="px-8 py-4 bg-lime-600 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform hover:bg-lime-700 hover:-translate-y-1"
        >
          Go to Cart
        </button>
      </div>
    </div>
  );
};

export default CustomerDashboard;
