/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  Pressable,
} from 'react-native';
import NoFavIcon from 'react-native-vector-icons/FontAwesome';
import CartIcon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addToCart,
  addToFavourite,
  removeFromCart,
  removeFromFav,
  selectProduct,
} from '../store/productSlice';
import { ProductType } from '../types/productType';
import { RootState } from '../store';

type ProductProps = {
  name: string;
  price: string | number;
  bckgColor: string;
  containerHeight: number;
  imgSrc: ImageSourcePropType;
  imgWidth: number;
  imgHeight: number;
  imgMargin: number;
  product: ProductType;
};

export default function Product({
  name,
  price,
  bckgColor,
  containerHeight,
  imgSrc,
  imgWidth,
  imgHeight,
  imgMargin,
  product,
}: ProductProps) {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();

  const marginTop = Number(imgHeight) < 130 ? 30 : 0;

  // Click Product

  const selectProductHandler = (item: ProductType) => {
    dispatch(selectProduct(item));
    navigation.navigate('ProductScreen');
  };

  // Set the Favourite products icon

  const favourites = useAppSelector(
    (state: RootState) => state.productSlice.favourites,
  );

  const ExistInFav = favourites.some(fav => fav._id === product._id);

  // Set the Cart products icon

  const cart = useAppSelector((state: RootState) => state.productSlice.cart);

  const ExistInCart = cart.some(fav => fav._id === product._id);

  return (
    <Pressable onPress={() => selectProductHandler(product)}>
      {({ pressed }) => (
        <View
          style={[
            styles.container,
            {
              backgroundColor: bckgColor,
              height: containerHeight,
              opacity: pressed ? 1 : 0.9,
            },
          ]}
        >
          <Image
            source={imgSrc}
            style={{
              width: imgWidth,
              height: imgHeight,
              margin: imgMargin,
              marginTop: marginTop,
            }}
          />

          <View
            style={{
              marginTop: 20,
              position: 'absolute',
              bottom: 5,
            }}
          >
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>${price}</Text>
          </View>
          <View
            style={{
              marginTop: 20,
              position: 'absolute',
              bottom: 5,
            }}
          >
            <Pressable>
              {({ pressed }) =>
                ExistInFav ? (
                  <NoFavIcon
                    name="heart"
                    size={24}
                    style={{
                      color: pressed ? '#cc0000' : '#ff0000ff',
                      marginLeft: 110,
                    }}
                    onPress={() => dispatch(removeFromFav(product))}
                  />
                ) : (
                  <NoFavIcon
                    name="heart-o"
                    size={24}
                    style={{
                      color: '#858484ff',
                      marginLeft: 110,
                    }}
                    onPress={() => dispatch(addToFavourite(product))}
                  />
                )
              }
            </Pressable>
            <Pressable>
              {ExistInCart ? (
                <CartIcon
                  name="squared-plus"
                  size={24}
                  style={styles.rmvCartIcon}
                  onPress={() => dispatch(removeFromCart(product))}
                />
              ) : (
                <CartIcon
                  name="squared-plus"
                  size={24}
                  style={styles.addCartIcon}
                  onPress={() => dispatch(addToCart(product))}
                />
              )}
            </Pressable>
          </View>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    marginLeft: 24,
    marginBottom: 20,
    borderRadius: 20,
  },
  name: {
    width: 90,
    fontSize: 18,
    color: '#6e6c6cff',
    fontWeight: 700,
    marginLeft: 15,
  },
  price: {
    fontSize: 16,
    color: '#000',
    fontWeight: 700,
    marginLeft: 15,
  },
  addCartIcon: {
    marginLeft: 110,
    marginTop: 15,
    color: '#858484ff',
  },
  rmvCartIcon: {
    marginLeft: 110,
    marginTop: 15,
    color: '#6d6defff',
  },
});
