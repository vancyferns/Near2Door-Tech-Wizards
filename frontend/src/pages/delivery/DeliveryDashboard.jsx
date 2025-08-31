import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/api';
import Button from '../../components/UI/Button';

const DeliveryDashboard = () => {
  const { user } = useAuth();
  const [assignedOrders, setAssignedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Agent ID comes from logged-in user
  const agentId = user?.id;

  useEffect(() => {
    const fetchAssignedOrders = async () => {
      try {
        const res = await api.getAgentOrders(agentId); // { response, data }

        if (Array.isArray(res.data)) {
          // If backend doesn't provide earnings, assign default ₹50 per order
          const ordersWithEarnings = res.data.map(order => ({
            ...order,
            earning: order.earning || 50,
          }));

          setAssignedOrders(ordersWithEarnings);
        } else {
          setError('Unexpected API response format.');
          console.error('API response is not an array:', res);
        }
      } catch (e) {
        setError('Failed to fetch assigned orders. Please try again later.');
        console.error('Error fetching assigned orders:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedOrders();
  }, [agentId]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await api.updateOrderStatus(orderId, newStatus);
      const updatedOrders = assignedOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setAssignedOrders(updatedOrders);
    } catch (e) {
      console.error('Failed to update order status:', e);
    }
  };

  // --- Earnings Calculation ---
  const totalEarnings = assignedOrders.reduce(
    (sum, order) => sum + (order.earning || 0),
    0
  );

  const weeklyEarnings = assignedOrders
    .filter(order => {
      if (!order.deliveredAt) return false;
      const date = new Date(order.deliveredAt);
      const now = new Date();
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      return order.status === 'delivered' && date >= oneWeekAgo;
    })
    .reduce((sum, order) => sum + (order.earning || 0), 0);

  if (loading) {
    return (
      <div className="p-10 bg-white rounded-2xl shadow-2xl mt-8 text-center">
        Loading assigned orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 bg-white rounded-2xl shadow-2xl mt-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-10 bg-white rounded-2xl shadow-2xl mt-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Delivery Dashboard</h2>
      <p className="text-gray-600 mb-6">
        Hello, {user?.name}! Here are your assigned orders.
      </p>

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
        {assignedOrders.length > 0 ? (
          assignedOrders.map(order => (
            <div
              key={order.id}
              className="bg-gray-50 p-6 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div className="mb-4 md:mb-0 md:mr-6 flex-grow">
                <h3 className="text-xl font-bold text-gray-900">Order ID: {order.id}</h3>
                <p className="text-gray-600 my-2">
                  From: <span className="font-semibold">{order.shopName}</span>
                </p>
                <p className="text-gray-600 mb-2">
                  To: <span className="font-semibold">{order.customerName}</span>
                </p>
                <p className="text-gray-600">
                  Address: <span className="font-semibold">{order.customerAddress}</span>
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end">
                <p className="text-lg font-bold text-lime-600 mb-2">
                  Status: <span className="font-semibold">{order.status}</span>
                </p>
                <p className="text-gray-700 mb-4">
                  Earning: <span className="font-semibold text-green-600">₹{order.earning}</span>
                </p>
                <div className="flex space-x-2">
                  <Button onClick={() => handleUpdateStatus(order.id, 'picked up')}>
                    Picked Up
                  </Button>
                  <Button onClick={() => handleUpdateStatus(order.id, 'delivered')}>
                    Delivered
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center text-lg font-medium">
            🚚 No assigned orders right now. Enjoy your break!
          </p>
        )}
      </div>
    </div>
  );
};

export default DeliveryDashboard;
