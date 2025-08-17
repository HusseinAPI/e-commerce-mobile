import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BackIcon from 'react-native-vector-icons/Feather';
import TrashIcon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

export default function ProductScreen() {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProp>();

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

      <View style={styles.imageWrapper}>
        <Image
          source={require('../../../../assets/images/xbox.png')} // replace with your shoe image
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>

      {/* Product Info */}
      <View style={styles.infoWrapper}>
        <View style={styles.ratingRow}>
          <Text style={styles.title}>Xbox Series X</Text>
          <View style={styles.rating}>
            <Icon name="star" size={19} color="#FFD700" />
            <Text style={styles.ratingText}>4.5</Text>
          </View>
        </View>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto,
          veritatis.
        </Text>

        {/* Bottom */}
        <View style={styles.bottomBar}>
          <Text style={styles.price}>$269.00</Text>
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
  trashIcon: { marginTop: 40, marginRight: 20, color: '#afafafff' },
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
    fontFamily: 'Inter Display Light',
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
