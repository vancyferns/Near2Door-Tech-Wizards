// utils/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { API_BASE_URL } from './api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Load user from storage on app start
  useEffect(() => {
    // In a real app, you would load a token and user data from secure storage here
    // For this example, we'll start with no user
    setUser(null); 
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user); // Set the user object, including the role
        // In a real app, save the token and user to secure storage
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    // Clear token from storage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};