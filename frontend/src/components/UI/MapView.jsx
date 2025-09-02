import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/api';
import Button from '../../components/UI/Button';
import MapView from '../../components/UI/MapView'; // Fixed Map component

const DeliveryDashboard = () => {
  const { user } = useAuth();
  const agentId = user?.id;

  const [assignedOrders, setAssignedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMapOrder, setActiveMapOrder] = useState(null);
  const [agentLocation, setAgentLocation] = useState(null);

  // --- Track agent live location ---
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      pos => setAgentLocation([pos.coords.latitude, pos.coords.longitude]),
      err => console.error('Geolocation error:', err),
      { enableHighAccuracy: true, maximumAge: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // --- Fetch assigned orders ---
  useEffect(() => {
    const fetchAssignedOrders = async () => {
      try {
        const res = await api.getAgentOrders(agentId);
        if (res?.data && Array.isArray(res.data)) {
          // Add default earning if missing
          const ordersWithEarnings = res.data.map(order => ({
            ...order,
            earning: order.earning || 50,
          }));
          setAssignedOrders(ordersWithEarnings);
        } else {
          setAssignedOrders([]);
          console.warn('Unexpected API response:', res);
        }
      } catch (e) {
        console.error('Error fetching assigned orders:', e);
        setError('Failed to fetch assigned orders.');
      } finally {
        setLoading(false);
      }
    };

    if (agentId) fetchAssignedOrders();
  }, [agentId]);

  // --- Update order status ---
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      // ⚠️ Make sure to use the correct API method for agent order updates
      await api.updateDeliveryStatus(orderId, newStatus);
      setAssignedOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      if (newStatus === 'delivered' && activeMapOrder === orderId) {
        setActiveMapOrder(null);
      }
    } catch (e) {
      console.error('Failed to update order status:', e);
      alert('Could not update order status. Please try again.');
    }
  };

  // --- Earnings ---
  const totalEarnings = assignedOrders.reduce(
    (sum, order) => sum + (order.earning || 0),
    0
  );
  const weeklyEarnings = assignedOrders
    .filter(order => order.status === 'delivered' && order.deliveredAt)
    .reduce((sum, order) => sum + (order.earning || 0), 0);

  if (loading) return <div className="p-10 text-center">Loading assigned orders...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

  return (
    <div className="p-10 bg-white rounded-2xl shadow-2xl mt-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Delivery Dashboard</h2>
      <p className="text-gray-600 mb-6">Hello, {user?.name}! Here are your assigned orders.</p>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-green-50 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Earnings</h3>
          <p className="text-2xl font-bold text-green-600">₹{totalEarnings.toFixed(2)}</p>
        </div>
        <div className="p-6 bg-blue-50 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Weekly Earnings</h3>
          <p className="text-2xl font-bold text-blue-600">₹{weeklyEarnings.toFixed(2)}</p>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {assignedOrders.length === 0 ? (
          <p className="text-gray-600 text-center text-lg font-medium">
            🚚 No assigned orders right now. Enjoy your break!
          </p>
        ) : (
          assignedOrders.map(order => {
            // Convert customerLocation to [lat, lng] if available
            const customerCoords = order.customerLocation
              ? [order.customerLocation.lat, order.customerLocation.lng]
              : null;

            return (
              <div
                key={order.id}
                className="bg-gray-50 p-6 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div className="mb-4 md:mb-0 md:mr-6 flex-grow">
                  <h3 className="text-xl font-bold text-gray-900">Order ID: {order.id}</h3>
                  <p className="text-gray-600 my-2">From: <span className="font-semibold">{order.shopName}</span></p>
                  <p className="text-gray-600 mb-2">To: <span className="font-semibold">{order.customerName}</span></p>
                  <p className="text-gray-600">Address: <span className="font-semibold">{order.customerAddress}</span></p>
                </div>

                <div className="flex flex-col items-start md:items-end">
                  <p className="text-lg font-bold text-lime-600 mb-2">
                    Status: <span className="font-semibold">{order.status}</span>
                  </p>
                  <p className="text-gray-700 mb-4">
                    Earning: <span className="font-semibold text-green-600">₹{order.earning}</span>
                  </p>

                  {/* Action buttons */}
                  <div className="flex space-x-2">
                    {order.status !== 'delivered' && (
                      <>
                        {order.status === 'pending' && (
                          <Button onClick={() => handleUpdateStatus(order.id, 'picked up')}>
                            Picked Up
                          </Button>
                        )}
                        {order.status === 'picked up' && (
                          <Button onClick={() => handleUpdateStatus(order.id, 'delivered')}>
                            Delivered
                          </Button>
                        )}
                        <Button onClick={() => setActiveMapOrder(order.id)}>
                          See Delivery Location
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Map */}
                {activeMapOrder === order.id && order.status !== 'delivered' && (
                  <div className="mt-4 w-full">
                    <MapView
                      userLocation={agentLocation}
                      otherLocation={customerCoords}
                    />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default DeliveryDashboard;
