import React from 'react';

const ShopOwnerLayout = ({ onNavigate, children }) => (
  <div className="flex">
    <nav className="w-1/4 bg-gray-200 p-4 min-h-screen">
      <h3 className="text-lg font-bold mb-4">Shop Owner Menu</h3>
      <ul className="space-y-2">
        <li><button onClick={() => onNavigate({ name: 'shop-orders' })} className="w-full text-left p-2 rounded hover:bg-gray-300">View Orders</button></li>
        <li><button onClick={() => onNavigate({ name: 'shop-products' })} className="w-full text-left p-2 rounded hover:bg-gray-300">Manage Products</button></li>
        <li><button onClick={() => onNavigate({ name: 'add-product' })} className="w-full text-left p-2 rounded hover:bg-gray-300">Add New Product</button></li>
      </ul>
    </nav>
    <main className="w-3/4 p-4">{children}</main>
  </div>
);

export default ShopOwnerLayout;