import React from 'react';

const AdminLayout = ({ onNavigate, children }) => (
  <div className="flex">
    <nav className="w-1/4 bg-gray-200 p-4 min-h-screen">
      <h3 className="text-lg font-bold mb-4">Admin Menu</h3>
      <ul className="space-y-2">
        <li><button onClick={() => onNavigate({ name: 'admin-shops' })} className="w-full text-left p-2 rounded hover:bg-gray-300">Manage Shops</button></li>
        <li><button onClick={() => onNavigate({ name: 'admin-orders' })} className="w-full text-left p-2 rounded hover:bg-gray-300">View All Orders</button></li>
        <li><button onClick={() => onNavigate({ name: 'admin-agents' })} className="w-full text-left p-2 rounded hover:bg-gray-300">View Agents</button></li>
        <li><button onClick={() => onNavigate({ name: 'admin-finances' })} className="w-full text-left p-2 rounded hover:bg-gray-300">Finances</button></li>
      </ul>
    </nav>
    <main className="w-3/4 p-4">{children}</main>
  </div>
);

export default AdminLayout;