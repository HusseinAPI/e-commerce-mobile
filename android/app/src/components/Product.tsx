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
import IsFavIcon from 'react-native-vector-icons/FontAwesome';
import AddtCart from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type ProductProps = {
  name: string;
  price: string | number;
  bckgColor: string;
  containerHeight: number;
  imgSrc: ImageSourcePropType;
  imgWidth: number;
  imgHeight: number;
  imgMargin: number;
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
}: ProductProps) {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProp>();

  return (
    <Pressable onPress={() => navigation.navigate('ProductScreen')}>
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
            style={{ width: imgWidth, height: imgHeight, margin: imgMargin }}
          />

          <View
            style={{
              marginTop: 20,
              position: 'absolute',
              bottom: 25,
            }}
          >
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>${price}</Text>
          </View>
          <NoFavIcon name="heart-o" size={24} style={styles.favIcon} />
          <AddtCart name="squared-plus" size={24} style={styles.addIcon} />
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
  favIcon: {
    marginLeft: 110,
    color: '#2b2a2aff',
  },
  addIcon: {
    marginLeft: 110,
    marginTop: 15,
    color: '#2b2a2aff', // #6d6defff
  },
});
