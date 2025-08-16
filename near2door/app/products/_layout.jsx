import { Stack } from 'expo-router';

export default function ProductsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="ProductListScreen"
        options={{
          title: "Product List",
        }}
      />
      <Stack.Screen
        name="AddProductScreen"
        options={{
          title: "Add Product",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}