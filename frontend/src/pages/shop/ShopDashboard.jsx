import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/api';

const ShopDashboard = ({ onNavigate }) => {
  const { user } = useAuth();
  const [salesSummary, setSalesSummary] = useState({ totalOrders: 0, totalProductsSold: 0, totalRevenue: 0 });

  const shopId = user?.shop_id || '6686a3253b7074718817c1c2';

  useEffect(() => {
    const fetchSalesSummary = async () => {
      if (shopId) {
        const data = await api.getShopSalesSummary(shopId);
        if (data) {
          setSalesSummary(data);
        }
      }
    };
    fetchSalesSummary();
  }, [shopId]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 sm:p-16 font-sans">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-lime-400 drop-shadow-lg mb-4 text-center sm:text-left">
          Shop Dashboard
        </h2>
        <p className="text-md text-gray-300 mb-8 text-center sm:text-left">
          Welcome, {user?.email}! Here's a quick overview of your shop's performance.
        </p>

        {/* Sales Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 mb-12">
          <div className="p-6 sm:p-8 bg-lime-500/10 rounded-2xl shadow-lg text-center transform transition-transform duration-300 hover:scale-[1.02] border border-lime-500/30">
            <h3 className="text-4xl sm:text-5xl font-extrabold text-lime-400 mb-2">
              {salesSummary.totalOrders}
            </h3>
            <p className="text-gray-200 font-semibold">Total Orders</p>
          </div>
          <div className="p-6 sm:p-8 bg-lime-500/10 rounded-2xl shadow-lg text-center transform transition-transform duration-300 hover:scale-[1.02] border border-lime-500/30">
            <h3 className="text-4xl sm:text-5xl font-extrabold text-lime-400 mb-2">
              {salesSummary.totalProductsSold}
            </h3>
            <p className="text-gray-200 font-semibold">Total Products Sold</p>
          </div>
          <div className="p-6 sm:p-8 bg-lime-500/10 rounded-2xl shadow-lg text-center transform transition-transform duration-300 hover:scale-[1.02] border border-lime-500/30">
            <h3 className="text-4xl sm:text-5xl font-extrabold text-lime-400 mb-2">
              ₹ {salesSummary.totalRevenue || '0'}
            </h3>
            <p className="text-gray-200 font-semibold">Total Revenue</p>
          </div>
        </div>

        {/* Action Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
          <div className="p-6 sm:p-8 bg-slate-800 rounded-2xl shadow-lg transform transition-transform hover:scale-105 duration-300">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">Manage Profile</h3>
            <p className="text-gray-400 mb-4">
              Update your shop's details, location, and type.
            </p>
            <button
              onClick={() => onNavigate('manage-shop-profile')}
              className="w-full sm:w-auto px-6 py-3 bg-lime-600 text-white rounded-xl font-bold hover:bg-lime-700 transition duration-300"
            >
              Go to Profile
            </button>
          </div>
          <div className="p-6 sm:p-8 bg-slate-800 rounded-2xl shadow-lg transform transition-transform hover:scale-105 duration-300">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">Manage Products</h3>
            <p className="text-gray-400 mb-4">
              Add, edit, and delete products in your inventory.
            </p>
            <button
              onClick={() => onNavigate('manage-products')}
              className="w-full sm:w-auto px-6 py-3 bg-lime-600 text-white rounded-xl font-bold hover:bg-lime-700 transition duration-300"
            >
              Go to Products
            </button>
          </div>
          <div className="p-6 sm:p-8 bg-slate-800 rounded-2xl shadow-lg transform transition-transform hover:scale-105 duration-300">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">Manage Orders</h3>
            <p className="text-gray-400 mb-4">
              View and update the status of incoming orders.
            </p>
            <button
              onClick={() => onNavigate('manage-orders')}
              className="w-full sm:w-auto px-6 py-3 bg-lime-600 text-white rounded-xl font-bold hover:bg-lime-700 transition duration-300"
            >
              Go to Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDashboard;
