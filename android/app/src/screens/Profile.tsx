import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectPage, visibleNavbar } from '../store/productSlice';
import { logout } from '../store/authSlice';
import { RootState } from '../store';

const ProfileScreen = () => {
  const menuItems = [
    { id: 1, label: 'Edit Profile', icon: 'user', path: 'EditProfile' },
    { id: 3, label: 'Wishlist', icon: 'heart', path: 'Favourite' },
    { id: 4, label: 'Order History', icon: 'clipboard', path: 'Orders' },
    { id: 5, label: 'Notification', icon: 'bell', path: '' },
    { id: 2, label: 'Logout', icon: 'log-out', path: 'logout' },
  ];

  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();

  // routing of Profile pages

  const navigateTo = (page: string) => {
    navigation.navigate(page);
  };

  // Select Profile Icon in NavBar when open the page

  useFocusEffect(
    React.useCallback(() => {
      dispatch(selectPage('user'));
      dispatch(visibleNavbar(true));
    }, [dispatch]),
  );

  // LogOut settings
  const user = useAppSelector((state: RootState) => state.authSlice.user);

  useEffect(() => {
    if (!user) navigation.navigate('SignIn');
    console.log(user);
  }, [user, navigation]);

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={require('../../../../assets/images/user1.jpg')}
          style={styles.avatar}
        />
        <Text style={styles.name}>Jack Robertson</Text>
      </View>

      {/* Menu List */}
      <View style={styles.menuContainer}>
        {menuItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => {
              item.path === 'logout'
                ? dispatch(logout())
                : navigateTo(item.path);
            }}
          >
            <View style={styles.menuLeft}>
              <Icon name={item.icon} size={20} color="#a6aa53ff" />
              <Text style={styles.menuLabel}>{item.label}</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#a6aa53ff" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  menuContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: 400,
    marginLeft: 15,
    color: '#333',
  },
});

export default ProfileScreen;
