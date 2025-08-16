/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';

type OrderType = {
  id: string;
  type: string;
  description: string;
  transactionId: string;
  amount: string;
  status: string;
  date: string;
};

const orders: OrderType[] = [
  {
    id: '1',
    type: 'Cash-in',
    description: 'From ABC Bank ATM',
    transactionId: '564925374920',
    amount: '$100.00',
    status: 'confirmed',
    date: '17 Sep 2023, 10:34 AM',
  },
  {
    id: '2',
    type: 'Cashback from purchase',
    description: 'Purchase from Amazon.com',
    transactionId: '685746354219',
    amount: '$1.75',
    status: 'confirmed',
    date: '16 Sep 2023, 16:08 PM',
  },
  {
    id: '3',
    type: 'Transfer to card',
    description: '',
    transactionId: '698094554317',
    amount: '$9000.00',
    status: 'confirmed',
    date: '16 Sep 2023, 11:21 AM',
  },
  {
    id: '4',
    type: 'Transfer to card',
    description: 'Not enough funds',
    transactionId: '097967542786',
    amount: '$9267.00',
    status: 'canceled',
    date: '15 Sep 2023, 10:11 AM',
  },
  {
    id: '5',
    type: 'Cashback from purchase',
    description: 'Purchase from Books.com',
    transactionId: '765230978421',
    amount: '$3.21',
    status: 'confirmed',
    date: '14 Sep 2023, 18:59 PM',
  },
  {
    id: '6',
    type: 'Transfer to card',
    description: '',
    transactionId: '123456789012',
    amount: '$70.00',
    status: 'confirmed',
    date: '13 Sep 2023, 09:30 AM',
  },
];

const OrderHistory = () => {
  const renderItem = ({ item }: { item: OrderType }) => (
    <View style={styles.card}>
      <View style={styles.icon}>
        <MaterialIcons name="credit-card" size={24} color="#a6aa53ff" />
      </View>
      <View style={styles.info}>
        <Text style={styles.type}>{item.type}</Text>
        {item.description ? (
          <Text style={styles.description}>{item.description}</Text>
        ) : null}
        <Text style={styles.transactionId}>
          Transaction ID: {item.transactionId}
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>{item.amount}</Text>
        <Text
          style={[
            styles.status,
            { color: item.status === 'confirmed' ? 'green' : 'red' },
          ]}
        >
          {item.status}
        </Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Orders{'\n'} history</Text>
        <View style={styles.arrowContainer}>
          <Icon name="arrow-back" size={24} color="#4ba9f1ff" />
        </View>
      </View>
      <View style={{ height: 450 }}>
        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  card: {
    flexDirection: 'row',
    backgroundColor: '#f8f8ff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  type: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  transactionId: {
    fontSize: 12,
    color: '#999',
  },
  right: {
    alignItems: 'flex-end',
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  status: {
    fontSize: 12,
    marginTop: 4,
    textTransform: 'capitalize',
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
});

export default OrderHistory;
