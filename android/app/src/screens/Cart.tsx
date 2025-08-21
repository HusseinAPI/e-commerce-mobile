/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import BackIcon from 'react-native-vector-icons/Feather';
import TrashIcon from 'react-native-vector-icons/FontAwesome5';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { selectPage, visibleNavbar } from '../store/productSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store';
import { ProductType } from '../types/productType';
import { images } from '../../../../assets/images';

export default function Cart() {
  const cart = useAppSelector((state: RootState) => state.productSlice.cart);

  const [quantity, setQuantity] = useState<number>(1);

  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();

  const subtotal = cart.reduce((acc, item) => acc + item.price * quantity, 0);
  const taxes = 40;
  const total = subtotal + taxes;

  const renderItem = ({ item }: { item: ProductType }) => (
    <View style={styles.card}>
      <View style={[styles.imageWrapper]}>
        <Image source={images[item.img]} style={styles.image} />
      </View>
      <View style={styles.details}>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.qtyContainer}>
        <TouchableOpacity
          onPress={() => {
            if (quantity > 1) {
              setQuantity(quantity - 1);
            }
          }}
          style={styles.qtyBtn}
        >
          <Text style={styles.qtyText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qty}>{quantity}</Text>
        <TouchableOpacity
          onPress={() => {
            setQuantity(quantity + 1);
          }}
          style={styles.qtyBtn}
        >
          <Text style={styles.qtyText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Select Cart Icon in NavBar when open the page

  useFocusEffect(
    React.useCallback(() => {
      dispatch(selectPage('cart'));
      dispatch(visibleNavbar(false));
    }, [dispatch]),
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackIcon
          name="arrow-left"
          size={28}
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>My Cart</Text>
        <TrashIcon name="trash" size={20} style={styles.trashIcon} />
      </View>

      <View
        style={{
          backgroundColor: '#a5affbff',
          height: 500,
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
        }}
      >
        <View style={{ marginTop: 30 }}>
          <FlatList
            data={cart}
            keyExtractor={item => item._id}
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
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => navigation.navigate('CheckOut')}
        >
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
    borderWidth: 1,
    borderColor: '#a6aa53ff',
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
