import { useAuth } from '../../utils/AuthContext';

export default function MainLayout() {
  const { user } = useAuth();

  const userRole = user ? user.role : null; // Get the real role

  switch (userRole) {
    case 'customer':
      return (
        <Tabs>
          <Tabs.Screen name="shops" options={{ title: 'Shops' }} />
          <Tabs.Screen name="orders" options={{ title: 'My Orders' }} />
        </Tabs>
      );
    case 'shop owner':
      return (
        <Tabs>
          <Tabs.Screen name="shop-owner-dashboard" options={{ title: 'Dashboard' }} />
          <Tabs.Screen name="shop-orders" options={{ title: 'Shop Orders' }} />
        </Tabs>
      );
    case 'agent':
      return (
        <Tabs>
          <Tabs.Screen name="agent-dashboard" options={{ title: 'Deliveries' }} />
        </Tabs>
      );
    case 'admin':
      return (
        <Tabs>
          <Tabs.Screen name="admin-dashboard" options={{ title: 'Admin' }} />
        </Tabs>
      );
    default:
      return null;
  }
}