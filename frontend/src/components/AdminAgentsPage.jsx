import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';
import { api } from '../api';

const AdminAgentsPage = () => {
  const { userToken } = useContext(AppContext);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.adminAgentsGet(userToken).then(res => {
      setAgents(res.data);
      setLoading(false);
    });
  }, [userToken]);

  if (loading) return <p>Loading agents...</p>;

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Delivery Agents</h3>
      {agents.length === 0 ? (
        <p>No agents found.</p>
      ) : (
        <ul className="space-y-4">
          {agents.map(agent => (
            <li key={agent.id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">{agent.name}</p>
                <p className="text-sm text-gray-600">{agent.email}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminAgentsPage;