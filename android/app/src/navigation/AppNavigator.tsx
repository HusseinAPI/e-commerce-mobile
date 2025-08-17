import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Products from '../screens/Products';
import Favourite from '../screens/Favourite';
import Cart from '../screens/Cart';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Orders from '../screens/Orders';
import CheckOut from '../screens/CheckOut';
import ProductScreen from '../screens/ProductScreen';
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
      <Stack.Screen name="Favourite" component={Favourite} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="CheckOut" component={CheckOut} />
    </Stack.Navigator>
  );
}
