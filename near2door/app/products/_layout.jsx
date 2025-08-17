// app/products/_layout.jsx

import { Stack } from 'expo-router';

export default function ProductsLayout() {
  return (
    <Stack>
      <Stack.Screen name="[shopId]" options={{ title: 'Products' }} />
      <Stack.Screen name="add" options={{ title: 'Add Product' }} />
    </Stack>
  );
}