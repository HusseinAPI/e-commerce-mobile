/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet } from 'react-native';
import CartIcon from 'react-native-vector-icons/Ionicons';
import UserIcon from 'react-native-vector-icons/FontAwesome5';
import VoltiqueTitle from './Title';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

export default function Header({ title }: { title: string }) {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProp>();

  return (
    <>
      <VoltiqueTitle />
      <Text style={{ fontSize: 27, fontWeight: 600 }}>{title}</Text>
      <View style={{ flexDirection: 'row' }}>
        <View style={[styles.cartIconContainer, { marginRight: 10 }]}>
          <CartIcon
            name="cart"
            size={24}
            color="#cdcdcdff"
            onPress={() => navigation.navigate('Cart')}
          />
        </View>
        <View style={styles.cartIconContainer}>
          <UserIcon
            name="user"
            size={20}
            color="#cdcdcdff"
            onPress={() => navigation.navigate('SignIn')}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  cartIconContainer: {
    padding: 8,
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
});
