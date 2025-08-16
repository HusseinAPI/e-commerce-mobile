/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import BackIcon from 'react-native-vector-icons/Feather';
import TrashIcon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Nike Air Max 200',
      price: 240,
      qty: 1,
      image: require('../../../../assets/images/s24.png'),
      bg: '#ffe6e6',
    },
    {
      id: '2',
      name: 'Excee Sneakers',
      price: 260,
      qty: 1,
      image: require('../../../../assets/images/razerG.png'),
      bg: '#e6f0ff',
    },
    {
      id: '3',
      name: 'Air Max Motion 2',
      price: 290,
      qty: 1,
      image: require('../../../../assets/images/xbox.png'),
      bg: '#e6ffe6',
    },
    {
      id: '4',
      name: 'Leather Sneakers',
      price: 270,
      qty: 1,
      image: require('../../../../assets/images/s24.png'),
      bg: '#fff5e6',
    },
    {
      id: '5',
      name: 'Nike Air Max 200',
      price: 240,
      qty: 1,
      image: require('../../../../assets/images/s24.png'),
      bg: '#ffe6f0',
    },
  ]);

  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProp>();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );
  const taxes = 40;
  const total = subtotal + taxes;

  const updateQty = (id: string, change: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + change) }
          : item,
      ),
    );
  };

  type CartItem = {
    id: string;
    name: string;
    price: number;
    qty: number;
    image: ImageSourcePropType;
    bg: string;
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.card}>
      <View style={[styles.imageWrapper, { backgroundColor: item.bg }]}>
        <Image source={item.image} style={styles.image} />
      </View>
      <View style={styles.details}>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.qtyContainer}>
        <TouchableOpacity
          onPress={() => updateQty(item.id, -1)}
          style={styles.qtyBtn}
        >
          <Text style={styles.qtyText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qty}>{item.qty}</Text>
        <TouchableOpacity
          onPress={() => updateQty(item.id, 1)}
          style={styles.qtyBtn}
        >
          <Text style={styles.qtyText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackIcon
          name="arrow-left"
          size={28}
          style={styles.backIcon}
          onPress={() => navigation.navigate('Home')}
        />
        <Text style={styles.title}>My Cart</Text>
        <TrashIcon name="trash" size={20} style={styles.trashIcon} />
      </View>

      <View
        style={{
          backgroundColor: '#edededff',
          height: 500,
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
        }}
      >
        <View style={{ marginTop: 30 }}>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
          />
        </View>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Subtotal:</Text>
          <Text style={styles.summaryValue}>${subtotal}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Taxes:</Text>
          <Text style={styles.summaryValue}>${taxes}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.total}>${total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutText}>Check Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 5, flexDirection: 'row', justifyContent: 'space-between' },
  backIcon: { marginTop: 40, marginLeft: 20 },
  trashIcon: { marginTop: 40, marginRight: 20, color: '#afafafff' },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 35,
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#ffffff',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffffff',
    padding: 12,
    marginHorizontal: 20,
    borderRadius: 25,
    marginBottom: 8,
    elevation: 4,
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  image: { width: 110, height: 110, resizeMode: 'contain' },
  details: { flex: 1, flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontSize: 15, fontWeight: '500', color: '#333' },
  price: { fontSize: 15, fontWeight: 'bold', color: '#a6aa53ff', marginTop: 5 },
  qtyContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  qtyBtn: {
    backgroundColor: '#e6f0ff',
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  qtyText: { fontSize: 18, color: '#333' },
  qty: { marginHorizontal: 8, fontSize: 16, fontWeight: 'bold' },
  summary: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryRow: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  summaryText: {
    fontSize: 16,
    color: '#aaa9a9ff',
    fontWeight: 600,
    letterSpacing: 1.7,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 600,
    color: '#a6aa53ff',
    marginLeft: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  total: {
    fontSize: 36,
    color: '#000',
  },
  checkoutBtn: {
    backgroundColor: '#a6aa53ff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  checkoutText: { color: '#fff', fontWeight: 500, fontSize: 16 },
});
