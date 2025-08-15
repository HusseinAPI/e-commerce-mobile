/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet } from 'react-native';
import CartIcon from 'react-native-vector-icons/Ionicons';
import UserIcon from 'react-native-vector-icons/FontAwesome5';
import VoltiqueTitle from './Title';

export default function Header({ title }: { title: string }) {
  return (
    <>
      <VoltiqueTitle />
      <Text style={{ fontSize: 27, fontWeight: 600 }}>{title}</Text>
      <View style={{ flexDirection: 'row' }}>
        <View style={[styles.cartIconContainer, { marginRight: 10 }]}>
          <CartIcon name="cart" size={24} color="#cdcdcdff" />
        </View>
        <View style={styles.cartIconContainer}>
          <UserIcon name="user" size={20} color="#cdcdcdff" />
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
