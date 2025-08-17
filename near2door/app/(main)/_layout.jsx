import { Tabs } from 'expo-router';
import React from 'react';

// NOTE: In a real application, you would get the user's role from a global state
// or a securely stored token after login.
// We'll use a placeholder for now.
const userRole = 'shop owner'; // Change this to test different roles

const customerTabs = (
  <Tabs>
    <Tabs.Screen name="shops" options={{ title: 'Shops' }} />
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
  switch (userRole) {
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