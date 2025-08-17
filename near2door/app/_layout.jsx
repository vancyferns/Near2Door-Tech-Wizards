// app/_layout.jsx

import { Stack } from 'expo-router';
import { AuthProvider } from './../utils/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        <Stack.Screen name="products" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}