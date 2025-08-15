import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Products from '../screens/Products';
import Favourite from '../screens/Favourite';
import Cart from '../screens/Cart';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="Favourite" component={Favourite} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
}
