import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';
import { api } from '../api';

const AdminFinancesPage = () => {
  const { userToken } = useContext(AppContext);
  const [finances, setFinances] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.adminFinancesGet(userToken).then(res => {
      setFinances(res.data);
      setLoading(false);
    });
  }, [userToken]);

  if (loading) return <p>Loading financial data...</p>;
  if (!finances) return <p>No financial data available.</p>;

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Financial Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Orders</p>
          <p className="text-2xl font-bold">{finances.totalOrders}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-2xl font-bold">₹{finances.totalRevenue}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Commission</p>
          <p className="text-2xl font-bold">₹{finances.totalCommission}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminFinancesPage;