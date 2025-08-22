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
import {
  addCheckOutInfo,
  selectPage,
  visibleNavbar,
} from '../store/productSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store';
import { ProductType } from '../types/productType';
import { images } from '../../../../assets/images';

export default function Cart() {
  const cart = useAppSelector((state: RootState) => state.productSlice.cart);

  const [quantities, setQuantities] = useState<number[]>(cart.map(() => 1));

  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();

  const subtotal = cart.reduce(
    (acc, item, i) => acc + item.price * quantities[i],
    0,
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: ProductType;
    index: number;
  }) => (
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
            if (quantities[index] > 1) {
              const newQuantities = [...quantities];
              newQuantities[index] -= 1;
              setQuantities(newQuantities);
            }
          }}
          style={styles.qtyBtn}
        >
          <Text style={styles.qtyText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qty}>{quantities[index]}</Text>
        <TouchableOpacity
          onPress={() => {
            const newQuantities = [...quantities];
            newQuantities[index] += 1;
            setQuantities(newQuantities);
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

  // Add info to CheckOut

  const addCheckInfoHanlder = () => {
    const now = new Date();
    const date = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;

    const checkoutInfo = cart.map((elem, i) => ({
      id: elem._id,
      name: elem.name,
      price: elem.price,
      date: date,
      quantity: quantities[i],
    }));
    dispatch(addCheckOutInfo(checkoutInfo));
    navigation.navigate('CheckOut');
  };

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

      <View style={styles.footer}>
        <Text style={styles.total}>${subtotal.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => navigation.navigate('CheckOut')}
        >
          <Text
            style={styles.checkoutText}
            onPress={() => addCheckInfoHanlder()}
          >
            Check Out
          </Text>
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 80,
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
