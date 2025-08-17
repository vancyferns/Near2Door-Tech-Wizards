import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { API_BASE_URL } from '../../utils/api';

export default function AdminDashboardScreen() {
  const [data, setData] = useState({ agents: [], shops: [], finances: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [agentsRes, shopsRes, financesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/admin/agents`),
          fetch(`${API_BASE_URL}/admin/shops`),
          fetch(`${API_BASE_URL}/admin/finances`),
        ]);

        const [agentsData, shopsData, financesData] = await Promise.all([
          agentsRes.json(),
          shopsRes.json(),
          financesRes.json(),
        ]);

        setData({ agents: agentsData, shops: shopsData, finances: financesData });
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Agents ({data.agents.length})</Text>
        <Text>Approved Agents: {data.agents.filter(a => a.status === 'approved').length}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Shops ({data.shops.length})</Text>
        <Text>Pending Shops: {data.shops.filter(s => s.status === 'pending').length}</Text>
        <Text>Approved Shops: {data.shops.filter(s => s.status === 'approved').length}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Finances</Text>
        <Text>Total Transactions: {data.finances.length}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
});