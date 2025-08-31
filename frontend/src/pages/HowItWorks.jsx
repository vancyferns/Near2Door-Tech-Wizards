import React from 'react';

const HowItWorks = () => (
  <div className="p-8 bg-white rounded-2xl shadow-2xl mt-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">How It Works</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 shadow-md transform transition-transform hover:scale-105 duration-300">
        <span className="text-5xl mb-2">🛍️</span>
        <h3 className="text-xl font-semibold mb-2">For Customers</h3>
        <p className="text-gray-600">Browse products from various shops, add them to your cart, and place an order.</p>
      </div>
      <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 shadow-md transform transition-transform hover:scale-105 duration-300">
        <span className="text-5xl mb-2">🏪</span>
        <h3 className="text-xl font-semibold mb-2">For Shops</h3>
        <p className="text-gray-600">Manage your product inventory and track orders in a simple, intuitive dashboard.</p>
      </div>
      <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 shadow-md transform transition-transform hover:scale-105 duration-300">
        <span className="text-5xl mb-2">🛵</span>
        <h3 className="text-xl font-semibold mb-2">For Delivery Agents</h3>
        <p className="text-gray-600">Receive and update the status of your assigned delivery orders on the go.</p>
      </div>
    </div>
  </div>
);

export default HowItWorks;