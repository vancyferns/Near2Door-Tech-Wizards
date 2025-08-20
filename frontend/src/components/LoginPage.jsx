import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { api } from '../api';

const LoginPage = ({ onNavigate }) => {
  const { setAuthData } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    const body = { email, password };
    const res = await api.authLoginPost(body);

    if (res.status === 200) {
      const { user, token } = res.data;

      let shopId = null;
      if (user.role === 'shop') {
        const shopsRes = await api.shopsGet();
        const shop = shopsRes.data.find(s => s.ownerId === user.id);
        if (shop) shopId = shop.id;
      }
      setAuthData(user.id, user.role, token, shopId);
      onNavigate({ name: 'home' });
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition-all"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <button onClick={() => onNavigate({ name: 'register' })} className="text-blue-500 hover:underline">
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;