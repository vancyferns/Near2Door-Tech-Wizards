// app/products/[shopId].jsx

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import { API_BASE_URL } from '../../utils/api';
import { useAuth } from '../../utils/AuthContext';
import { useCart } from '../../utils/CartContext';

export default function ProductListScreen() {
  const { shopId } = useLocalSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();
  const { addItem } = useCart();
  const isShopOwner = user?.role === 'shop owner';

  const fetchProducts = useCallback(async () => {
    if (!shopId) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/shops/${shopId}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  }, [shopId]);

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [fetchProducts])
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      {isShopOwner && (
        <Pressable onPress={() => router.push({ pathname: `/products/add`, params: { shopId } })} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add New Product</Text>
        </Pressable>
      )}
      {products.length > 0 ? (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <View>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>₹{item.price}</Text>
              </View>
              {!isShopOwner && (
                <Pressable
                  style={styles.cartButton}
                  onPress={() => {
                    addItem({ productId: item.id, shopId: String(shopId), name: item.name, price: item.price, qty: 1 });
                    Alert.alert('Added', `${item.name} added to cart`);
                  }}
                >
                  <Text style={styles.cartButtonText}>Add to Cart</Text>
                </Pressable>
              )}
            </View>
          )}
        />
      ) : (
        <Text style={styles.noProductsText}>No products found. Add some!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  productItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: { fontSize: 18, fontWeight: '500' },
  productPrice: { fontSize: 16, color: 'gray' },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  cartButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  cartButtonText: { color: '#fff', fontWeight: '600' },
  noProductsText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: 'gray' },
});