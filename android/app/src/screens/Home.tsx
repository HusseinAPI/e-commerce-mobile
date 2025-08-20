/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
  ScrollView,
} from 'react-native';
import SearchIcon from 'react-native-vector-icons/Feather';
import Product from '../components/Product';
import Header from '../components/Header';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import {
  getProducts,
  selectCategory,
  selectPage,
  visibleNavbar,
} from '../store/productSlice';
import { images } from '../../../../assets/images';
import { categoryIcons } from '../../../../assets/icons';
import { RootState } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export default function Home() {
  const products = useAppSelector(
    (state: RootState) => state.productSlice.products,
  );
  const dispatch = useAppDispatch();

  const categories = [
    ...new Set(
      products.map(p => p.category?.trim().toLowerCase()).filter(Boolean),
    ),
  ].map(cat => ({
    name: cat,
    iconData: categoryIcons[cat],
  }));

  // buuton Rounting

  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProp>();

  // fetch Products data

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Select Category to filter by them in Products

  const handleSelectCategory = (category: String) => {
    dispatch(selectCategory(category));
    navigation.navigate('Products');
  };

  // Select Home Icon in NavBar when open the page

  useFocusEffect(
    React.useCallback(() => {
      dispatch(selectPage('home'));
      dispatch(visibleNavbar(true));
    }, [dispatch]),
  );

  return (
    <>
      <View style={styles.card}>
        <Header title="Home" />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Search..."
            placeholderTextColor="#cdcdcdff"
          />
          <SearchIcon
            name="search"
            size={20}
            color="#cdcdcdff"
            style={{ marginTop: 8 }}
          />
        </View>
      </View>

      <View style={styles.list}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.name}
          renderItem={({ item }) => {
            const Icon = item.iconData.icon;
            const iconName = item.iconData.iconName;

            return (
              <Pressable
                onPress={() => handleSelectCategory(item.name)}
                style={({ pressed }) => [
                  styles.category,
                  pressed && styles.categoryHover,
                ]}
              >
                {({ pressed }) => (
                  <>
                    <Icon
                      name={iconName}
                      size={20}
                      color={pressed ? '#ffffff' : '#3b3232ff'}
                    />
                    <Text
                      style={[
                        styles.text,
                        { color: pressed ? '#ffffff' : '#3b3232ff' },
                      ]}
                    >
                      {item.name}
                    </Text>
                  </>
                )}
              </Pressable>
            );
          }}
        />
      </View>
      <Pressable onPress={() => navigation.navigate('Products')}>
        {({ pressed }) => (
          <Text
            style={{
              color: pressed
                ? 'rgba(134, 134, 230, 1)'
                : 'rgba(184, 184, 250, 1)',
              fontWeight: 500,
              marginLeft: '80%',
              marginBottom: 15,
            }}
          >
            View All
          </Text>
        )}
      </Pressable>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 120, paddingRight: 23 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 1 }}>
            {products.length
              ? products.map((elem, index) => {
                  if (index < 4)
                    return (
                      <Product
                        key={index}
                        name={elem.name.substr(0, 15)}
                        price={elem.price}
                        bckgColor="#8df1b0ff"
                        containerHeight={250}
                        imgSrc={images[elem.img]}
                        imgWidth={Number(elem.width)}
                        imgHeight={Number(elem.height)}
                        imgMargin={5}
                        product={elem}
                      />
                    );
                })
              : null}
          </View>

          <View style={{ flex: 1 }}>
            {products.length
              ? products.map((elem, index) => {
                  if (index > 4 && index < 9)
                    return (
                      <Product
                        key={index}
                        name={elem.name.substr(0, 15)}
                        price={elem.price}
                        bckgColor="#8df1b0ff"
                        containerHeight={250}
                        imgSrc={images[elem.img]}
                        imgWidth={Number(elem.width)}
                        imgHeight={Number(elem.height)}
                        imgMargin={5}
                        product={elem}
                      />
                    );
                })
              : null}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    height: 100,
    padding: 15,
    marginTop: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 5,
    paddingRight: 5,
    marginLeft: 8,
    width: '97%',
    borderRadius: 10,
    marginTop: 20,
    color: '#cdcdcdff',
  },
  inputText: {
    padding: 10,
    width: '90%',
    color: '#cdcdcdff',
  },
  list: {
    marginLeft: 22,
    height: 130,
  },
  category: {
    width: 100,
    height: 50,
    backgroundColor: '#ffffff',
    marginTop: 50,
    marginRight: 10,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryHover: {
    backgroundColor: '#ff8674ff',
  },
  text: {
    color: '#827b7bff',
    fontWeight: 'bold',
  },
});
