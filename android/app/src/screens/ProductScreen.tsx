import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BackIcon from 'react-native-vector-icons/Feather';
import FavIcon from 'react-native-vector-icons/FontAwesome';
import AddtCart from 'react-native-vector-icons/Entypo';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store';
import { visibleNavbar } from '../store/productSlice';
import { images } from '../../../../assets/images';

export default function ProductScreen() {
  const productSelected = useAppSelector(
    (state: RootState) => state.productSlice.productSelected,
  );

  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();

  // Hidden NavBar when open the page

  useFocusEffect(
    React.useCallback(() => {
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
        <FavIcon name="heart-o" size={32} style={styles.favIcon} />
      </View>

      <View style={styles.imageWrapper}>
        <Image
          source={images[productSelected?.img ?? 'default.png']} // replace with your shoe image
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>

      {/* Product Info */}
      <View style={styles.infoWrapper}>
        <View style={styles.ratingRow}>
          <Text style={styles.title}>{productSelected?.name}</Text>
          <View style={styles.rating}>
            <Icon name="star" size={19} color="#FFD700" />
            <Text style={styles.ratingText}>4.5</Text>
          </View>
        </View>
        <Text style={styles.description}>{productSelected?.description}</Text>

        {/* Bottom */}
        <View style={styles.bottomBar}>
          <Text style={styles.price}>${productSelected?.price}</Text>
          <TouchableOpacity style={styles.cartButton}>
            <Text style={styles.cartText}> Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: { padding: 5, flexDirection: 'row', justifyContent: 'space-between' },
  backIcon: { marginTop: 40, marginLeft: 20 },
  favIcon: { marginTop: 40, marginRight: 20, color: '#000000ff' },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    marginLeft: 80,
    backgroundColor: '#eaec98ff',
    borderRadius: 100,
    width: 200,
    height: 200,
  },
  productImage: {
    width: 250,
    height: 180,
  },
  infoWrapper: {
    backgroundColor: '#a5affbff',
    paddingHorizontal: 10,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    height: 440,
    position: 'relative',
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 35,
    marginBottom: 20,
    marginLeft: 20,
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: '#444',
    width: 280,
    marginLeft: 20,
    fontFamily: 'sans-serif-light',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal: 50,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 18,
    color: '#444',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    backgroundColor: '#ffffffff',
  },
  price: {
    fontSize: 36,
    color: '#000',
  },
  cartButton: {
    backgroundColor: '#a6aa53ff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  cartText: { color: '#fff', fontWeight: 500, fontSize: 16 },
});
