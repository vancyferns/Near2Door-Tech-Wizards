import React from 'react';

const AdminDashboard = () => (
  <div className="p-10 bg-white rounded-2xl shadow-2xl mt-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h2>
    <p className="text-gray-600 mb-6">Welcome, Administrator. Here are the key statistics for the platform.</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="p-8 bg-gray-50 rounded-2xl shadow-md text-center transform transition-transform hover:scale-105 duration-300">
        <h3 className="text-4xl font-extrabold text-lime-600 mb-2">15</h3>
        <p className="text-gray-600">Total Shops</p>
      </div>
      <div className="p-8 bg-gray-50 rounded-2xl shadow-md text-center transform transition-transform hover:scale-105 duration-300">
        <h3 className="text-4xl font-extrabold text-lime-600 mb-2">250</h3>
        <p className="text-gray-600">Total Orders</p>
      </div>
      <div className="p-8 bg-gray-50 rounded-2xl shadow-md text-center transform transition-transform hover:scale-105 duration-300">
        <h3 className="text-4xl font-extrabold text-lime-600 mb-2">$5,000</h3>
        <p className="text-gray-600">Total Revenue</p>
      </div>
    </div>
  </div>
);

export default AdminDashboard;