/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import BackIcon from 'react-native-vector-icons/Feather';
import TrashIcon from 'react-native-vector-icons/FontAwesome5';
import IsFavIcon from 'react-native-vector-icons/FontAwesome';
import AddtCart from 'react-native-vector-icons/Entypo';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import {
  selectPage,
  visibleNavbar,
  removeFromFav,
  addToCart,
  removeFromCart,
  setFavEmpty,
} from '../store/productSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store';
import { images } from '../../../../assets/images';
import { ProductType } from '../types/productType';

export default function Favourite() {
  const favourites = useAppSelector(
    (state: RootState) => state.productSlice.favourites,
  );

  const cart = useAppSelector((state: RootState) => state.productSlice.cart);

  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();

  const renderItem = ({ item }: { item: ProductType }) => (
    <View style={styles.card}>
      <View style={[styles.imageWrapper]}>
        <Image source={images[item.img]} style={styles.image} />
      </View>
      <View style={styles.details}>
        <View>
          <Text style={styles.name}>{item.name.slice(0, 15)}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
        <View>
          <Pressable
            onPress={() => dispatch(removeFromFav(item))}
            style={({ pressed }) => [
              { marginBottom: 10 },
              pressed && { transform: [{ scale: 1.2 }], opacity: 0.5 },
            ]}
          >
            <IsFavIcon
              name="heart"
              size={24}
              style={{ color: 'red' }}
              onPress={() => dispatch(removeFromFav(item))}
            />
          </Pressable>
          {cart.some(fav => fav._id === item._id) ? (
            <AddtCart
              name="squared-plus"
              size={27}
              style={{ color: '#6d6defff' }}
              onPress={() => dispatch(removeFromCart(item))}
            />
          ) : (
            <AddtCart
              name="squared-plus"
              size={27}
              onPress={() => dispatch(addToCart(item))}
            />
          )}
        </View>
      </View>
    </View>
  );

  // Select Favourite Icon in NavBar when open the page

  useFocusEffect(
    React.useCallback(() => {
      dispatch(selectPage('heart'));
      dispatch(visibleNavbar(true));
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
        <Text style={styles.title}>Watchlist</Text>
        <TrashIcon
          name="trash"
          size={20}
          style={styles.trashIcon}
          onPress={() => dispatch(setFavEmpty())}
        />
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
            data={favourites}
            keyExtractor={item => item._id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={() => (
              <View
                style={{
                  alignItems: 'center',
                  marginTop: 40,
                }}
              >
                <Text
                  style={{ fontSize: 26, fontWeight: 500, color: '#ffffffff' }}
                >
                  No products in Watchlist
                </Text>
              </View>
            )}
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
