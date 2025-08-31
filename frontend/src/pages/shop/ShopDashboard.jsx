import React from 'react';
import { useAuth } from '../../context/AuthContext';

const ShopDashboard = ({ onNavigate }) => {
  const { user } = useAuth();
  return (
    <div className="p-10 bg-white rounded-2xl shadow-2xl mt-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop Dashboard</h2>
      <p className="text-gray-600 mb-6">Welcome, {user?.email}! Here's an overview of your shop.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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