/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store';
import { getOrders } from '../store/productSlice';
import { UserData } from '../types/UserData';

type OrderType = {
  _id: string;
  total: string;
  createdAt: Date;
};

const OrderHistory = () => {
  const orders = useAppSelector(
    (state: RootState) => state.productSlice.orders,
  );

  const user = useAppSelector(
    (state: RootState) => state.authSlice.user as UserData | null,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrders(user.token));
  }, [dispatch, user?.token]);

  const renderItem = ({ item }: { item: OrderType; index: number }) => (
    <View style={styles.card}>
      <View style={styles.icon}>
        <MaterialIcons name="credit-card" size={30} color="#a6aa53ff" />
      </View>
      <View style={styles.info}>
        <Text style={styles.type}>Order #{item._id.slice(12)}</Text>

        <Text style={styles.transactionId}>Transaction ID: {item._id}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>${item.total}</Text>
        <Text style={styles.date}>
          {item.createdAt.toString().slice(0, 10)}
        </Text>
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
          keyExtractor={item => item._id}
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
    backgroundColor: '#a5affbff',
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
    padding: 20,
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
    marginTop: 15,
  },
});

export default OrderHistory;
