import React, { useState, useRef } from 'react';
import { View, StyleSheet, Pressable, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeartIcon from 'react-native-vector-icons/FontAwesome';
import CartIcon from 'react-native-vector-icons/Ionicons';
import UserIcon from 'react-native-vector-icons/FontAwesome5';

export default function NavBar() {
  const [isSelected, setIsSelected] = useState<String>('');

  const scaleHome = useRef(new Animated.Value(1)).current;
  const scaleHeart = useRef(new Animated.Value(1)).current;
  const scaleCart = useRef(new Animated.Value(1)).current;
  const scaleProducts = useRef(new Animated.Value(1)).current;
  const scaleUser = useRef(new Animated.Value(1)).current;

  const onPressIn = (scaleAnim: Animated.Value) => {
    Animated.spring(scaleAnim, {
      toValue: 1.2,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = (scaleAnim: Animated.Value) => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.card}>
      <View style={styles.icon}>
        <Pressable
          style={({ pressed }) => [
            isSelected === 'home'
              ? styles.iconPressed
              : pressed && styles.iconPressed,
          ]}
          onPressIn={() => {
            setIsSelected('home');
            onPressIn(scaleHome);
          }}
          onPressOut={() => onPressOut(scaleHome)}
        >
          {({ pressed }) => (
            <Animated.View style={{ transform: [{ scale: scaleHome }] }}>
              <Icon
                name="home"
                size={30}
                color={
                  isSelected === 'home'
                    ? '#ffffffff'
                    : pressed
                    ? '#ffffffff'
                    : '#cdcdcdff'
                }
              />
            </Animated.View>
          )}
        </Pressable>
      </View>
      <View style={styles.icon}>
        <Pressable
          style={({ pressed }) => [
            isSelected === 'heart'
              ? styles.iconPressed
              : pressed && styles.iconPressed,
          ]}
          onPressIn={() => {
            setIsSelected('heart');
            onPressIn(scaleHeart);
          }}
          onPressOut={() => onPressOut(scaleHeart)}
        >
          {({ pressed }) => (
            <Animated.View style={{ transform: [{ scale: scaleHeart }] }}>
              <HeartIcon
                name="heart"
                size={23}
                color={
                  isSelected === 'heart'
                    ? '#ffffffff'
                    : pressed
                    ? '#ffffffff'
                    : '#cdcdcdff'
                }
              />
            </Animated.View>
          )}
        </Pressable>
      </View>
      <View style={styles.icon}>
        <Pressable
          style={({ pressed }) => [
            isSelected === 'cart'
              ? styles.iconPressed
              : pressed && styles.iconPressed,
          ]}
          onPressIn={() => {
            setIsSelected('cart');
            onPressIn(scaleCart);
          }}
          onPressOut={() => onPressOut(scaleCart)}
        >
          {({ pressed }) => (
            <Animated.View style={{ transform: [{ scale: scaleCart }] }}>
              <CartIcon
                name="cart"
                size={28}
                color={
                  isSelected === 'cart'
                    ? '#ffffffff'
                    : pressed
                    ? '#ffffffff'
                    : '#cdcdcdff'
                }
              />
            </Animated.View>
          )}
        </Pressable>
      </View>
      <View style={styles.icon}>
        <Pressable
          style={({ pressed }) => [
            isSelected === 'devices'
              ? styles.iconPressed
              : pressed && styles.iconPressed,
          ]}
          onPressIn={() => {
            setIsSelected('devices');
            onPressIn(scaleProducts);
          }}
          onPressOut={() => onPressOut(scaleProducts)}
        >
          {({ pressed }) => (
            <Animated.View style={{ transform: [{ scale: scaleProducts }] }}>
              <Icon
                name="devices"
                size={28}
                color={
                  isSelected === 'devices'
                    ? '#ffffffff'
                    : pressed
                    ? '#ffffffff'
                    : '#cdcdcdff'
                }
              />
            </Animated.View>
          )}
        </Pressable>
      </View>
      <View style={styles.icon}>
        <Pressable
          style={({ pressed }) => [
            isSelected === 'user'
              ? styles.iconPressed
              : pressed && styles.iconPressed,
          ]}
          onPressIn={() => {
            setIsSelected('user');
            onPressIn(scaleUser);
          }}
          onPressOut={() => onPressOut(scaleUser)}
        >
          {({ pressed }) => (
            <Animated.View style={{ transform: [{ scale: scaleUser }] }}>
              <UserIcon
                name="user"
                size={23}
                color={
                  isSelected === 'user'
                    ? '#ffffffff'
                    : pressed
                    ? '#ffffffff'
                    : '#cdcdcdff'
                }
              />
            </Animated.View>
          )}
        </Pressable>
      </View>
    </View>
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
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
