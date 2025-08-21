import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import { api } from "../api";

const AdminDashboardPage = () => {
  const { userToken } = useContext(AppContext);
  const [stats, setStats] = useState({ shops: 0, agents: 0, orders: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [pendingShops, setPendingShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch orders
        const ordersRes = await api.adminOrdersGet(userToken);
        const orders = ordersRes.data || [];

        // Fetch shops
        const shopsRes = await api.adminShopsGet(null, userToken);
        const shops = shopsRes.data || [];

        // Fetch agents
        const agentsRes = await api.adminAgentsGet(userToken);
        const agents = agentsRes.data || [];

        // Fetch finances
        const financesRes = await api.adminFinancesGet(userToken);
        const finances = financesRes.data || {};

        // Update state
        setStats({
          shops: shops.length,
          agents: agents.length,
          orders: orders.length,
          revenue: finances.totalRevenue || 0,
        });

        setRecentOrders(orders.slice(-5).reverse()); // last 5 orders
        setPendingShops(shops.filter((s) => s.status === "pending"));

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch admin dashboard data", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [userToken]);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600">Total Shops</p>
          <p className="text-2xl font-bold">{stats.shops}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600">Total Agents</p>
          <p className="text-2xl font-bold">{stats.agents}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600">Total Orders</p>
          <p className="text-2xl font-bold">{stats.orders}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-2xl font-bold">₹{stats.revenue}</p>
        </div>
      </div>

      {/* Pending Shops */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Pending Shops</h3>
        {pendingShops.length === 0 ? (
          <p className="text-gray-600">No pending shops for approval.</p>
        ) : (
          <ul className="space-y-3">
            {pendingShops.map((shop) => (
              <li key={shop.id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-semibold">{shop.name}</p>
                  <p className="text-sm text-gray-600">Owner: {shop.ownerId}</p>
                </div>
                <span className="px-3 py-1 text-xs rounded-full bg-yellow-400 text-gray-900">
                  Pending
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Recent Orders */}
      <div>
        <h3 className="text-xl font-bold text-gray-700 mb-4">Recent Orders</h3>
        {recentOrders.length === 0 ? (
          <p className="text-gray-600">No recent orders found.</p>
        ) : (
          <ul className="space-y-3">
            {recentOrders.map((order) => (
              <li key={order.id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-semibold">Order #{order.id}</p>
                  <p className="text-sm text-gray-600">Status: {order.status}</p>
                </div>
                <span className="px-3 py-1 text-xs rounded-full bg-blue-500 text-white">
                  {order.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
