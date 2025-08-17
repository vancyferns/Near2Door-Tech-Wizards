import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { API_BASE_URL } from '../../utils/api';

// IMPORTANT: Replace this with the shop ID from the logged-in user's data
const SHOP_ID = '68a16f22b8b67f5006194f0f'; 

export default function ShopOrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopOrders = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/shops/${SHOP_ID}/orders`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch shop orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchShopOrders();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.orderId}>Order ID: {item.id}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Total: ₹{item.total}</Text>
            {/* You could add a button here to update the order status */}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  orderItem: { padding: 15, backgroundColor: '#fff', borderRadius: 8, marginBottom: 10 },
  orderId: { fontWeight: 'bold' },
});