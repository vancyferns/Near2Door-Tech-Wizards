import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { API_BASE_URL } from '../../utils/api';

// This is a simplified example. In a real app, this data would come from a shopping cart state.
const DUMMY_ORDER_DATA = {
  user_id: '68a16faeb8b67f5006194f17', // Replace with a real user ID
  shop_id: '68a16f22b8b67f5006194f0f', // Replace with a real shop ID
  items: [
    { name: 'Puma Socks', qty: 2, price: 500 },
    { name: 'Apple laptop', qty: 1, price: 150000 }
  ]
};

export default function PlaceOrderScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(DUMMY_ORDER_DATA),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Order placed successfully!');
        router.push('/(main)/orders'); // Navigate to the user's orders page
      } else {
        Alert.alert('Error', data.error || 'Failed to place order.');
      }
    } catch (error) {
      console.error('Failed to place order:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Place Your Order</Text>
      <Text>Review your items before placing the order.</Text>
      <Pressable onPress={handlePlaceOrder} style={styles.button}>
        <Text style={styles.buttonText}>{loading ? 'Placing Order...' : 'Place Order'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});