import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { API_BASE_URL } from '../../utils/api';

// IMPORTANT: Replace with a real agent ID from a user's login state
const AGENT_ID = '68a25c1cb8b67f5006194f1c'; 

export default function AgentDashboardScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgentOrders = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/agents/${AGENT_ID}/orders`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch agent orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAgentOrders();
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
      <Text style={styles.title}>My Deliveries</Text>
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <Text style={styles.orderId}>Order ID: {item.id}</Text>
              <Text>Shop: {item.shop_id}</Text>
              <Text>Status: {item.status}</Text>
              <Text>Total: ₹{item.total}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noOrdersText}>No pending deliveries.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  orderItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderId: { fontWeight: 'bold', marginBottom: 5 },
  noOrdersText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: 'gray' },
});