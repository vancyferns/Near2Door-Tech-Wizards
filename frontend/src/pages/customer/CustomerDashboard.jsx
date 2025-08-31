import React from 'react';

const CustomerDashboard = () => (
  <div className="p-10 bg-white rounded-2xl shadow-2xl mt-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Customer Dashboard</h2>
    <p className="text-gray-600 mb-6">Welcome! Browse featured shops or view your recent orders.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="p-8 bg-gray-50 rounded-xl shadow-md transform transition-transform hover:scale-105 duration-300">
        <h3 className="text-xl font-semibold mb-2">Featured Shops</h3>
        <p className="text-gray-600">Discover new shops and their amazing products.</p>
      </div>
      <div className="p-8 bg-gray-50 rounded-xl shadow-md transform transition-transform hover:scale-105 duration-300">
        <h3 className="text-xl font-semibold mb-2">Recent Orders</h3>
        <p className="text-gray-600">Track your latest purchases and view your order history.</p>
      </div>
    </div>
  </div>
);

export default CustomerDashboard;