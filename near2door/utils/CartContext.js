// utils/CartContext.js

import React, { createContext, useContext, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { API_BASE_URL } from './api';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ productId, shopId, name, price, qty }]

  const cartShopId = items.length > 0 ? items[0].shopId : null;

  const addItem = (newItem) => {
    if (!newItem || !newItem.productId || !newItem.shopId) return;

    if (items.length > 0 && newItem.shopId !== cartShopId) {
      Alert.alert(
        'Cart restriction',
        'Your cart contains items from a different shop. Please checkout or clear the cart before adding from another shop.'
      );
      return;
    }

    setItems((prev) => {
      const existing = prev.find((i) => i.productId === newItem.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === newItem.productId ? { ...i, qty: i.qty + (newItem.qty || 1) } : i
        );
      }
      return [...prev, { ...newItem, qty: newItem.qty || 1 }];
    });
  };

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const updateQuantity = (productId, qty) => {
    if (qty <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) => prev.map((i) => (i.productId === productId ? { ...i, qty } : i)));
  };

  const clearCart = () => setItems([]);

  const total = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items]);

  const placeOrder = async (userId) => {
    if (!userId) {
      Alert.alert('Not logged in', 'Please log in to place an order.');
      return { ok: false, message: 'Missing user' };
    }
    if (items.length === 0) {
      Alert.alert('Empty cart', 'Add some items before checking out.');
      return { ok: false, message: 'Empty cart' };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          shop_id: cartShopId,
          items: items.map(({ name, qty, price }) => ({ name, qty, price })),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        clearCart();
        Alert.alert('Success', 'Order placed successfully!');
        return { ok: true };
      }
      Alert.alert('Error', data.error || 'Failed to place order.');
      return { ok: false, message: data.error || 'Failed to place order' };
    } catch (err) {
      console.error('Failed to place order:', err);
      Alert.alert('Error', 'An error occurred. Please try again.');
      return { ok: false, message: 'Network error' };
    }
  };

  const value = {
    items,
    cartShopId,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    placeOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);


