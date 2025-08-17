/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ImageSourcePropType,
} from 'react-native';
import BackIcon from 'react-native-vector-icons/Feather';
import TrashIcon from 'react-native-vector-icons/FontAwesome5';
import IsFavIcon from 'react-native-vector-icons/FontAwesome';
import AddtCart from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

export default function Favourite() {
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
      image: require('../../../../assets/images/s24.png'),
      bg: '#e6f0ff',
    },
    {
      id: '3',
      name: 'Air Max Motion 2',
      price: 290,
      qty: 1,
      image: require('../../../../assets/images/s24.png'),
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
    {
      id: '6',
      name: 'Nike Air Max 200',
      price: 240,
      qty: 1,
      image: require('../../../../assets/images/s24.png'),
      bg: '#ffe6f0',
    },
    {
      id: '7',
      name: 'Nike Air Max 200',
      price: 240,
      qty: 1,
      image: require('../../../../assets/images/s24.png'),
      bg: '#ffe6f0',
    },
  ]);

  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProp>();

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
        <View>
          <IsFavIcon
            name="heart"
            size={24}
            style={{ color: 'red', marginBottom: 10 }}
          />
          <AddtCart
            name="squared-plus"
            size={27}
            // style={{ color: '#a6aa53ff' }}
          />
        </View>
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
        <Text style={styles.title}>Watchlist</Text>
        <TrashIcon name="trash" size={20} style={styles.trashIcon} />
      </View>

      <View
        style={{
          height: 600,
          backgroundColor: '#a5affbff',
          borderRadius: 40,
        }}
      >
        <View style={{ marginTop: 30 }}>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
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
    marginBottom: 15,
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
});
