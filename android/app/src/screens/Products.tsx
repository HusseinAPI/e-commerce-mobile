/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Product from '../components/Product';
import Header from '../components/Header';
import {
  getProducts,
  selectCategory,
  selectPage,
  visibleNavbar,
} from '../store/productSlice';
import { images } from '../../../../assets/images';
import { RootState } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useFocusEffect } from '@react-navigation/native';

export default function Products() {
  const [open, setOpen] = useState<boolean>(false);
  const products = useAppSelector(
    (state: RootState) => state.productSlice.products,
  );

  const dispatch = useAppDispatch();

  const categories = [
    'All',
    ...new Set(
      products.map(p => p.category?.trim().toLowerCase()).filter(Boolean),
    ),
  ];

  // fetch Products Data
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Filter by Category
  const categSelected = useAppSelector(
    state => state.productSlice.categSelected,
  );
  const [selected, setSelected] = useState(categSelected || 'All');

  const filterdedProducts =
    selected === 'All'
      ? products
      : products.filter(
          product =>
            product.category.trim().toLowerCase() ===
            selected.trim().toLowerCase(),
        );

  useFocusEffect(
    useCallback(() => {
      return () => {
        // Runs when screen is unfocused (navigating away)
        dispatch(selectCategory('All'));
      };
    }, []),
  );

  // Select Products Icon in NavBar when open the page

  useFocusEffect(
    React.useCallback(() => {
      dispatch(selectPage('devices'));
      dispatch(visibleNavbar(true));
    }, [dispatch]),
  );

  return (
    <>
      <View style={styles.card}>
        <Header title="" />
      </View>

      <TouchableOpacity style={styles.selectBox} onPress={() => setOpen(!open)}>
        <Text style={styles.selectedText}>{selected}</Text>
      </TouchableOpacity>
      {open && (
        <View style={styles.dropdown}>
          <FlatList
            data={categories}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  setSelected(item);
                  setOpen(false);
                }}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {filterdedProducts.length
            ? filterdedProducts.map((elem, index) => (
                <Product
                  key={index}
                  name={elem.name.substr(0, 15)}
                  price={elem.price}
                  bckgColor="#ffffffff"
                  containerHeight={250}
                  imgSrc={images[elem.img]}
                  imgWidth={Number(elem.width)}
                  imgHeight={Number(elem.height)}
                  imgMargin={5}
                  product={elem}
                />
              ))
            : null}
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
  selectBox: {
    width: 100,
    marginLeft: '68%',
    marginBottom: 20,
    backgroundColor: '#a5affbff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e2e2ff',
  },
  selectedText: {
    color: '#ffffffff',
    fontWeight: 700,
  },
  dropdown: {
    position: 'absolute',
    top: 115,
    right: 115,
    width: '40%',
    backgroundColor: '#a5affbff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    maxHeight: 200,
    zIndex: 1000,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    color: '#ffffffff',
    fontWeight: 700,
  },
});
