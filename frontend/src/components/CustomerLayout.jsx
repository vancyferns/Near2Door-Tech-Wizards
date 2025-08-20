import React from 'react';

const CustomerLayout = ({ onNavigate, children }) => (
  <div className="flex">
    <nav className="w-1/4 bg-gray-200 p-4 min-h-screen">
      <h3 className="text-lg font-bold mb-4">Customer Menu</h3>
      <ul className="space-y-2">
        <li><button onClick={() => onNavigate({ name: 'shops' })} className="w-full text-left p-2 rounded hover:bg-gray-300">All Shops</button></li>
        <li><button onClick={() => onNavigate({ name: 'my-orders' })} className="w-full text-left p-2 rounded hover:bg-gray-300">My Orders</button></li>
      </ul>
    </nav>
    <main className="w-3/4 p-4">{children}</main>
  </div>
);

export default CustomerLayout;