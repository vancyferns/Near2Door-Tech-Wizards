import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddProductScreen from './screens/AddProductScreen';
import ProductListScreen from './screens/ProductListScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Add Product">
        <Stack.Screen name="Add Product" component={AddProductScreen} />
        <Stack.Screen name="Product List" component={ProductListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
