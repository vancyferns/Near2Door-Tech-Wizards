import { View, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function LandingPage() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Go to Products"
        onPress={() => router.push('products/ProductListScreen')}
      />
    </View>
  );
}