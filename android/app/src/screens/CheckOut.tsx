/* eslint-disable react-native/no-inline-styles */
// CheckoutSummaryScreen.jsx
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type ProductType = {
  id: string;
  name: string;
  price: string;
  date: string;
};

const products: ProductType[] = [
  {
    id: '1',
    name: 'Purchase 1',
    price: '76.99',
    date: '22.09.2021',
  },
  {
    id: '2',
    name: 'Purchase 1',
    price: '76.99',
    date: '22.09.2021',
  },
  {
    id: '3',
    name: 'Purchase 1',
    price: '76.99',
    date: '22.09.2021',
  },
  {
    id: '4',
    name: 'Purchase 1',
    price: '76.99',
    date: '22.09.2021',
  },
];

export default function Checkout() {
  const renderProduct = ({ item }: { item: ProductType }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>{item.name}</Text>
        <Text style={styles.rowValue}>${item.price}</Text>
      </View>
      <Text style={styles.cardSub}>{item.date}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>CheckOut</Text>
        <View style={styles.arrowContainer}>
          <Icon name="arrow-back" size={24} color="#4ba9f1ff" />
        </View>
      </View>

      {/* Card Container  */}
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <View style={styles.cardsContainer}>
          <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={renderProduct}
            contentContainerStyle={{ padding: 16 }}
          />
        </View>

        {/* Subtotal */}
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Subtotal</Text>
          <Text style={styles.rowValue}>$189.99</Text>
        </View>

        {/* VAT */}
        <View style={styles.row}>
          <Text style={styles.rowLabel}>VAT (15%)</Text>
          <Text style={styles.rowValue}>$28.49</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Total */}
        <View style={styles.row}>
          <Text style={[styles.rowLabel, styles.bold]}>Total</Text>
          <Text style={[styles.rowValue, styles.bold]}>$218.48</Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity activeOpacity={0.9} style={styles.cta}>
          <Text style={styles.ctaText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const PURPLE = '#6A00FF';
const CARD_BG = '#ECECEC';
const BG = '#F6F6F8';
const TEXT = '#1C1C1C';
const MUTED = '#6B6B6B';
const PINK = '#a6aa53ff';

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  container: {
    paddingBottom: 28,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: TEXT,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 14,
  },
  header: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#4ba9f1ff',
  },
  arrowContainer: {
    backgroundColor: '#ffffffff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
    top: 50,
    zIndex: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 500,
    color: '#fff',
    fontStyle: 'italic',
  },

  stepperWrap: {
    height: 28,
    justifyContent: 'center',
    marginBottom: 18,
  },
  stepLine: {
    position: 'absolute',
    left: 10,
    right: 10,
    height: 4,
    borderRadius: 999,
    backgroundColor: '#DFDFE5',
  },
  stepLineActive: {
    width: '62%',
    backgroundColor: PURPLE,
  },
  steps: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 22,
    backgroundColor: '#E5E5EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotActive: { backgroundColor: PURPLE },
  dotMuted: { backgroundColor: '#D1CFD7' },
  dotCheck: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#C7B9FF',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: TEXT,
    marginBottom: 12,
  },
  cardsContainer: {
    height: 220,
    marginBottom: 20,
  },
  card: {
    backgroundColor: CARD_BG,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#a6aa53ff',
  },
  cardSub: {
    marginTop: 8,
    color: MUTED,
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  rowLabel: { fontSize: 16, color: TEXT },
  rowValue: { fontSize: 16, color: TEXT },
  bold: { fontWeight: '800' },
  divider: {
    height: 1,
    backgroundColor: '#E2E2E8',
    marginVertical: 8,
  },
  cta: {
    marginTop: 20,
    backgroundColor: PINK,
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: { color: 'white', fontWeight: '800', fontSize: 18 },
});
