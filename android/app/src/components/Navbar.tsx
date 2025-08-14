import React, { useState, useRef } from 'react';
import { View, StyleSheet, Pressable, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeartIcon from 'react-native-vector-icons/FontAwesome';
import CartIcon from 'react-native-vector-icons/Ionicons';
import UserIcon from 'react-native-vector-icons/FontAwesome5';

type NavItem = {
  key: string;
  IconComponent: typeof Icon;
  iconName: string;
  size: number;
};

const navItems: NavItem[] = [
  { key: 'home', IconComponent: Icon, iconName: 'home', size: 30 },
  { key: 'devices', IconComponent: Icon, iconName: 'devices', size: 28 },
  { key: 'heart', IconComponent: HeartIcon, iconName: 'heart', size: 23 },
  { key: 'cart', IconComponent: CartIcon, iconName: 'cart', size: 28 },
  { key: 'user', IconComponent: UserIcon, iconName: 'user', size: 23 },
];

export default function NavBar() {
  const [selected, setSelected] = useState<string>('home');

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
          selected === item.key
            ? styles.iconPressed
            : pressed && styles.iconPressed,
        ]}
        onPress={() => {
          setSelected(item.key);
          animateScale(item.key, 1.2);
        }}
        onPressOut={() => animateScale(item.key, 1)}
      >
        {({ pressed }) => (
          <Animated.View style={{ transform: [{ scale: scales[item.key] }] }}>
            <item.IconComponent
              name={item.iconName}
              size={item.size}
              color={
                selected === item.key || pressed ? '#ffffffff' : '#cdcdcdff'
              }
            />
          </Animated.View>
        )}
      </Pressable>
    </View>
  );

  return <View style={styles.card}>{navItems.map(renderItem)}</View>;
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
    backgroundColor: '#ff8674ff',
    borderRadius: 10,
    padding: 5,
    paddingVertical: 15,
  },
});
