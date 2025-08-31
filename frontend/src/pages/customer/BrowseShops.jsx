import React from 'react';

const BrowseShops = () => (
  <div className="p-10 bg-white rounded-2xl shadow-2xl mt-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse Shops</h2>
    <p className="text-gray-600 mb-6">Explore a list of available shops.</p>
    <div className="bg-gray-50 rounded-2xl shadow-md p-8">
      <ul className="space-y-4">
        <li className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">Shop A</li>
        <li className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">Shop B</li>
        <li className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">Shop C</li>
      </ul>
    </div>
  </div>
);

export default BrowseShops;