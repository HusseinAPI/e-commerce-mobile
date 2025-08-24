import React, { useRef } from 'react';
import { View, StyleSheet, Pressable, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeartIcon from 'react-native-vector-icons/FontAwesome';
import CartIcon from 'react-native-vector-icons/Ionicons';
import UserIcon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store';
import { selectPage } from '../store/productSlice';

type NavProps = NativeStackNavigationProp<RootStackParamList>;

type NavItem = {
  key: string;
  path: keyof RootStackParamList;
  IconComponent: typeof Icon;
  iconName: string;
  size: number;
};

const navItems: NavItem[] = [
  {
    key: 'home',
    path: 'Home',
    IconComponent: Icon,
    iconName: 'home',
    size: 30,
  },
  {
    key: 'devices',
    path: 'Products',
    IconComponent: Icon,
    iconName: 'devices',
    size: 28,
  },
  {
    key: 'heart',
    path: 'Favourite',
    IconComponent: HeartIcon,
    iconName: 'heart',
    size: 23,
  },
  {
    key: 'cart',
    path: 'Cart',
    IconComponent: CartIcon,
    iconName: 'cart',
    size: 28,
  },
  {
    key: 'user',
    path: 'SignIn',
    IconComponent: UserIcon,
    iconName: 'user',
    size: 23,
  },
];

export default function NavBar() {
  const pageSelected = useAppSelector(
    (state: RootState) => state.productSlice.pageSelected,
  );

  const visibilityOfNav = useAppSelector(
    (state: RootState) => state.productSlice.visibilityOfNav,
  );

  const navigation = useNavigation<NavProps>();
  const dispatch = useAppDispatch();

  const handleClickPage = (item: NavItem) => {
    navigation.navigate(item.path);
    dispatch(selectPage(item.key));
    animateScale(item.key, 1.2);
  };

  const scales = useRef(
    navItems.reduce((acc, item) => {
      acc[item.key] = new Animated.Value(1);
      return acc;
    }, {} as Record<string, Animated.Value>),
  ).current;

  const animateScale = (key: string, toValue: number) => {
    Animated.spring(scales[key], { toValue, useNativeDriver: true }).start();
  };

  const renderItem = (item: NavItem) => (
    <View key={item.key} style={styles.icon}>
      <Pressable
        style={({ pressed }) => [
          pageSelected === item.key
            ? styles.iconPressed
            : pressed && styles.iconPressed,
        ]}
        onPress={() => {
          handleClickPage(item);
        }}
        onPressOut={() => animateScale(item.key, 1)}
      >
        {({ pressed }) => (
          <Animated.View style={{ transform: [{ scale: scales[item.key] }] }}>
            <item.IconComponent
              name={item.iconName}
              size={item.size}
              color={
                pageSelected === item.key || pressed ? '#ffffffff' : '#cdcdcdff'
              }
            />
          </Animated.View>
        )}
      </Pressable>
    </View>
  );

  return (
    visibilityOfNav && (
      <View style={styles.card}>{navItems.map(renderItem)}</View>
    )
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 100,
    backgroundColor: '#fff',
    padding: 15,
  },
  icon: {
    width: 60,
    alignItems: 'center',
    padding: 5,
  },
  iconPressed: {
    backgroundColor: '#a6aa53ff',
    borderRadius: 10,
    padding: 5,
    paddingVertical: 15,
  },
});
