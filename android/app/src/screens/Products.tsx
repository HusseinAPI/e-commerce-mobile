/* eslint-disable react-native/no-inline-styles */
import { useState } from 'react';
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

const categories = [
  'All',
  'Computers',
  'Accessories',
  'Shoes',
  'Mobiles',
  'Music',
  'Clothes',
  'Others',
];

export default function Products() {
  const [selected, setSelected] = useState('All');
  const [open, setOpen] = useState(false);

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
          <Product
            name="S24 Ultra Platanium"
            price="800"
            bckgColor="#ffffffff"
            containerHeight={250}
            imgSrc={require('../../../../assets/images/s24.png')}
            imgWidth={150}
            imgHeight={150}
            imgMargin={8}
          />
          <Product
            name="S24 Ultra Platanium"
            price="800"
            bckgColor="#ffffffff"
            containerHeight={250}
            imgSrc={require('../../../../assets/images/s24.png')}
            imgWidth={150}
            imgHeight={150}
            imgMargin={8}
          />
          <Product
            name="S24 Ultra Platanium"
            price="800"
            bckgColor="#ffffffff"
            containerHeight={250}
            imgSrc={require('../../../../assets/images/s24.png')}
            imgWidth={150}
            imgHeight={150}
            imgMargin={8}
          />
          <Product
            name="S24 Ultra Platanium"
            price="800"
            bckgColor="#ffffffff"
            containerHeight={250}
            imgSrc={require('../../../../assets/images/s24.png')}
            imgWidth={150}
            imgHeight={150}
            imgMargin={8}
          />
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
    backgroundColor: '#4ba9f1ff',
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
    backgroundColor: '#4ba9f1ff',
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
