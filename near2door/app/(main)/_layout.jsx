import { Tabs } from 'expo-router';
import React from 'react';
import { useAuth } from '../../utils/AuthContext';

// Determine role from auth context
function useUserRole() {
  const { user } = useAuth();
  return user?.role || 'customer';
}

const customerTabs = (
  <Tabs>
    <Tabs.Screen name="shops" options={{ title: 'Shops' }} />
    <Tabs.Screen name="cart" options={{ title: 'Cart' }} />
    <Tabs.Screen name="orders" options={{ title: 'My Orders' }} />
  </Tabs>
);

const shopOwnerTabs = (
  <Tabs>
    <Tabs.Screen name="shop-owner-dashboard" options={{ title: 'Dashboard' }} />
    <Tabs.Screen name="orders" options={{ title: 'Shop Orders' }} />
    {/* Additional tabs for managing products can go here */}
  </Tabs>
);

const agentTabs = (
  <Tabs>
    <Tabs.Screen name="agent-dashboard" options={{ title: 'Deliveries' }} />
  </Tabs>
);

const adminTabs = (
  <Tabs>
    <Tabs.Screen name="admin-dashboard" options={{ title: 'Admin' }} />
    {/* Admins could have additional tabs for managing users, shops, etc. */}
  </Tabs>
);

export default function MainLayout() {
  const role = useUserRole();
  switch (role) {
    case 'customer':
      return customerTabs;
    case 'shop owner':
      return shopOwnerTabs;
    case 'agent':
      return agentTabs;
    case 'admin':
      return adminTabs;
    default:
      // Fallback for an unknown role or if the role isn't set
      return null;
  }
}