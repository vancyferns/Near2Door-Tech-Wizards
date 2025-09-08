import React, { useEffect, useState } from 'react';
import api from '../../api/api';

const AdminDashboard = () => {
  const [pendingShops, setPendingShops] = useState([]);
  const [approvedShops, setApprovedShops] = useState([]);
  const [pendingAgents, setPendingAgents] = useState([]);
  const [approvedAgents, setApprovedAgents] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await api.getUsers();

      setPendingShops(allUsers.filter(u => u.role === 'shop' && u.status === 'pending'));
      setApprovedShops(allUsers.filter(u => u.role === 'shop' && u.status === 'open'));

      setPendingAgents(allUsers.filter(u => u.role === 'agent' && u.status === 'pending'));
      setApprovedAgents(allUsers.filter(u => u.role === 'agent' && u.status === 'approved'));
    };

    fetchUsers();
  }, [refresh]);

  const handleApproveUser = async (userId) => {
    try {
      await fetch(`${api.API_BASE_URL}/users/${userId}/approve`, { method: 'PUT' });
      setRefresh(r => !r);
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const renderUserList = (users, isPending) =>
    users.length === 0 ? (
      <p className="text-gray-500 mb-2">{isPending ? 'No pending items.' : 'No approved items.'}</p>
    ) : (
      <ul className="space-y-2">
        {users.map(user => (
          <li key={user.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2">
            <span className="font-semibold">{user.name || user.email}</span>
            {isPending ? (
              <button
                onClick={() => handleApproveUser(user.id)}
                className="bg-lime-500 text-white px-3 py-1 rounded font-bold hover:bg-lime-600 transition"
              >
                Approve
              </button>
            ) : (
              <span className="text-green-600 font-bold">Approved</span>
            )}
          </li>
        ))}
      </ul>
    );

  return (
    <div className="p-4 sm:p-8 bg-white rounded-2xl shadow-2xl mt-4 sm:mt-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h2>
      <p className="text-gray-600 mb-6">Welcome, Administrator. Review and approve new shops and agents below.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-bold text-lime-600 mb-2">Pending Shops</h3>
          {renderUserList(pendingShops, true)}
        </div>
        <div>
          <h3 className="text-xl font-bold text-lime-600 mb-2">Approved Shops</h3>
          {renderUserList(approvedShops, false)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold text-lime-600 mb-2">Pending Agents</h3>
          {renderUserList(pendingAgents, true)}
        </div>
        <div>
          <h3 className="text-xl font-bold text-lime-600 mb-2">Approved Agents</h3>
          {renderUserList(approvedAgents, false)}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
