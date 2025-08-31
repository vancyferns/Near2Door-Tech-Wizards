import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/api';

const ShopDashboard = ({ onNavigate }) => {
  const { user } = useAuth();
  const [salesSummary, setSalesSummary] = useState({ totalOrders: 0, totalProductsSold: 0 });

  // Use a placeholder shopId for now
  const shopId = user?.shop_id || '6686a3253b7074718817c1c2';

  useEffect(() => {
    const fetchSalesSummary = async () => {
      // In a real application, this would fetch data from the backend
      // We'll use a mock API call for now
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
    <div className="p-10 bg-white rounded-2xl shadow-2xl mt-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop Dashboard</h2>
      <p className="text-gray-600 mb-6">Welcome, {user?.email}! Here's an overview of your shop.</p>
      
      {/* Sales Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <div className="p-8 bg-lime-50 rounded-xl shadow-md text-center">
          <h3 className="text-4xl font-extrabold text-lime-600 mb-2">{salesSummary.totalOrders}</h3>
          <p className="text-gray-600 font-semibold">Total Orders</p>
        </div>
        <div className="p-8 bg-lime-50 rounded-xl shadow-md text-center">
          <h3 className="text-4xl font-extrabold text-lime-600 mb-2">{salesSummary.totalProductsSold}</h3>
          <p className="text-gray-600 font-semibold">Total Products Sold</p>
        </div>
        <div className="p-8 bg-lime-50 rounded-xl shadow-md text-center">
          <h3 className="text-4xl font-extrabold text-lime-600 mb-2">₹ {salesSummary.totalRevenue || '0'}</h3>
          <p className="text-gray-600 font-semibold">Total Revenue</p>
        </div>
      </div>

      {/* Action Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-gray-50 rounded-xl shadow-md transform transition-transform hover:scale-105 duration-300">
          <h3 className="text-xl font-semibold mb-2">Manage Profile</h3>
          <p className="text-gray-600 mb-4">Update your shop's details, location, and type of shop.</p>
          <button onClick={() => onNavigate('manage-shop-profile')} className="px-6 py-3 bg-lime-600 text-white rounded-lg font-bold hover:bg-lime-700 transition duration-300">Go to Profile</button>
        </div>
        <div className="p-8 bg-gray-50 rounded-xl shadow-md transform transition-transform hover:scale-105 duration-300">
          <h3 className="text-xl font-semibold mb-2">Manage Products</h3>
          <p className="text-gray-600 mb-4">Add, edit, and delete products in your inventory.</p>
          <button onClick={() => onNavigate('manage-products')} className="px-6 py-3 bg-lime-600 text-white rounded-lg font-bold hover:bg-lime-700 transition duration-300">Go to Products</button>
        </div>
        <div className="p-8 bg-gray-50 rounded-xl shadow-md transform transition-transform hover:scale-105 duration-300">
          <h3 className="text-xl font-semibold mb-2">Manage Orders</h3>
          <p className="text-gray-600 mb-4">View and update the status of incoming orders.</p>
          <button onClick={() => onNavigate('manage-orders')} className="px-6 py-3 bg-lime-600 text-white rounded-lg font-bold hover:bg-lime-700 transition duration-300">Go to Orders</button>
        </div>
      </div>
    </div>
  );
};

export default ShopDashboard;