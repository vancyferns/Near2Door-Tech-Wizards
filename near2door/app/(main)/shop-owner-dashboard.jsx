import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function ShopOwnerDashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop Owner Dashboard</Text>
      <Pressable
        style={styles.button}
        onPress={() => router.push('/products/ProductListScreen')}
      >
        <Text style={styles.buttonText}>Manage My Products</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => router.push('/(main)/shop-orders')}
      >
        <Text style={styles.buttonText}>View My Orders</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});