/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  Pressable,
} from 'react-native';

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
  return (
    <Pressable>
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

          <View style={{ marginTop: 20, position: 'absolute', bottom: 25 }}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>${price}</Text>
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
});
