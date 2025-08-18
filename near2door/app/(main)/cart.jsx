import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useCart } from '../../utils/CartContext';
import { useAuth } from '../../utils/AuthContext';
import { useRouter } from 'expo-router';

export default function CartScreen() {
  const { items, total, updateQuantity, removeItem, clearCart, placeOrder } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      {items.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => String(item.productId)}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>₹{item.price}</Text>
                </View>
                <View style={styles.qtyRow}>
                  <Pressable style={styles.qtyButton} onPress={() => updateQuantity(item.productId, item.qty - 1)}>
                    <Text style={styles.qtyText}>-</Text>
                  </Pressable>
                  <Text style={styles.qtyValue}>{item.qty}</Text>
                  <Pressable style={styles.qtyButton} onPress={() => updateQuantity(item.productId, item.qty + 1)}>
                    <Text style={styles.qtyText}>+</Text>
                  </Pressable>
                </View>
                <Pressable style={styles.removeButton} onPress={() => removeItem(item.productId)}>
                  <Text style={styles.removeText}>Remove</Text>
                </Pressable>
              </View>
            )}
          />
          <View style={styles.summary}>
            <Text style={styles.total}>Total: ₹{total}</Text>
            <Pressable
              style={[styles.button, { backgroundColor: '#16a34a' }]}
              onPress={async () => {
                const result = await placeOrder(user?.id || user?._id || '68a16faeb8b67f5006194f17');
                if (result.ok) {
                  router.push('/(main)/orders');
                }
              }}
            >
              <Text style={styles.buttonText}>Checkout</Text>
            </Pressable>
            <Pressable style={[styles.button, { backgroundColor: '#ef4444' }]} onPress={clearCart}>
              <Text style={styles.buttonText}>Clear Cart</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  empty: { textAlign: 'center', marginTop: 40, color: 'gray' },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  itemName: { fontSize: 16, fontWeight: '500' },
  itemPrice: { color: 'gray', marginTop: 4 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 },
  qtyButton: { backgroundColor: '#e5e7eb', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  qtyText: { fontSize: 16, fontWeight: 'bold' },
  qtyValue: { marginHorizontal: 8, minWidth: 20, textAlign: 'center' },
  removeButton: { marginLeft: 8, backgroundColor: '#fee2e2', paddingVertical: 6, paddingHorizontal: 8, borderRadius: 6 },
  removeText: { color: '#b91c1c' },
  summary: { borderTopWidth: 1, borderTopColor: '#e5e7eb', paddingTop: 12 },
  total: { fontSize: 18, fontWeight: '600', marginBottom: 12, textAlign: 'right' },
  button: { padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  buttonText: { color: '#fff', fontWeight: '700' },
});


