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

  if (loading) return <p className="p-10 text-center">Loading orders...</p>;
  if (error) return <p className="p-10 text-center text-red-500">{error}</p>;

  return (
    <div className="p-10 bg-white rounded-2xl shadow-2xl mt-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Manage Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li
              key={order.id}
              className={`p-4 border rounded-lg shadow-sm transition ${
                order.status === 'delivered' ? 'opacity-50' : ''
              }`}
            >
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> ₹{order.total_price}</p>

              <div className="mt-2">
                <strong>Items:</strong>
                <ul className="ml-4 list-disc">
                  {order.items?.map((item, idx) => (
                    <li key={idx}>
                      {item.quantity} × {item.name} — ₹{item.price}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {order.status === 'pending' && (
                  <Button onClick={() => updateOrderStatus(order.id, 'ready')} className="bg-green-600 hover:bg-green-700">
                    Mark as Ready
                  </Button>
                )}
                {order.status === 'ready' && (
                  <Button onClick={() => updateOrderStatus(order.id, 'picked up')} className="bg-blue-600 hover:bg-blue-700">
                    Picked Up
                  </Button>
                )}
                {order.status === 'picked up' && (
                  <Button onClick={() => updateOrderStatus(order.id, 'delivered')} className="bg-lime-600 hover:bg-lime-700">
                    Delivered
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageOrders;
