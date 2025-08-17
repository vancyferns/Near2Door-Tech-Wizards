import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

// In a real app, this would come from a secure authentication system
// We'll simulate it for now.
const mockAuth = {
  isLoggedIn: true,
  userRole: 'shop owner', // Change this to 'customer', 'shop owner', 'agent', or 'admin' to test
};

export default function AppIndex() {
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    // Simulate an async check (e.g., getting a token from AsyncStorage)
    const checkAuthStatus = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsAuthReady(true);
    };
    checkAuthStatus();
  }, []);

  if (!isAuthReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (mockAuth.isLoggedIn) {
    switch (mockAuth.userRole) {
      case 'admin':
        return <Redirect href="/(main)/admin-dashboard" />;
      case 'shop owner':
        return <Redirect href="/(main)/shop-owner-dashboard" />;
      case 'agent':
        return <Redirect href="/(main)/agent-dashboard" />;
      case 'customer':
      default:
        return <Redirect href="/(main)/shops" />;
    }
  } else {
    return <Redirect href="/(auth)/login" />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});