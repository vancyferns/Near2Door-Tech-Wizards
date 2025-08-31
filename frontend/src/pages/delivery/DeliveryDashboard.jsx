import React from 'react';

const DeliveryDashboard = () => (
  <div className="p-10 bg-white rounded-2xl shadow-2xl mt-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Delivery Agent Dashboard</h2>
    <p className="text-gray-600 mb-6">Welcome to your dashboard. Here you can see your assigned orders.</p>
    <div className="p-8 bg-gray-50 rounded-2xl shadow-md">
      <h3 className="text-xl font-semibold mb-2">Assigned Orders</h3>
      <p className="text-gray-600">No orders assigned yet.</p>
    </div>
  </div>
);

export default DeliveryDashboard;