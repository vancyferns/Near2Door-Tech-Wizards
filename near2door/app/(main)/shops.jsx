import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { API_BASE_URL } from '../../utils/api';

export default function ShopsScreen() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/shops`);
        const data = await response.json();
        setShops(data);
      } catch (error) {
        console.error('Failed to fetch shops:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
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
      <Text style={styles.title}>All Shops</Text>
      <FlatList
        data={shops}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push({ pathname: `/products/[shopId]`, params: { shopId: item.id } })} style={styles.shopItem}>
            <Text style={styles.shopName}>{item.name}</Text>
            <Text style={styles.shopStatus}>{item.status}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  shopItem: { padding: 15, backgroundColor: '#fff', borderRadius: 8, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  shopName: { fontSize: 18, fontWeight: '500' },
  shopStatus: { fontSize: 14, color: 'gray' },
});