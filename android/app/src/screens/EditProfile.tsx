/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { RootState } from '../store';
import { updateUserInfo } from '../store/authSlice';

export default function ProfileScreen() {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();

  const user = useAppSelector((state: RootState) => state.authSlice.user);

  const [isEditing, SetEditng] = useState<boolean>(false);

  const [name, setName] = useState<string>(user?.fullName || '');
  const [phone, setPhone] = useState<string>(user?.phone);
  const [email, setEmail] = useState<string>(user?.email);

  const dispatch = useAppDispatch();

  const confirmEditHandler = () => {
    const data = {
      userId: user._id,
      token: user.token,
      fullName: name,
      phone: phone,
      email: email,
    };

    if (data.fullName && data.phone && data.email) {
      dispatch(updateUserInfo(data));
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
        >
          <View style={styles.arrowContainer}>
            <Icon name="arrow-back" size={24} color="#a6aa53ff" />
          </View>
        </Pressable>
        <Text style={styles.profileText}>Profile</Text>
        {isEditing ? (
          <Icon
            name="close"
            size={35}
            color="#000"
            style={styles.editIcon}
            onPress={() => SetEditng(false)}
          />
        ) : (
          <Icon
            name="edit"
            size={25}
            color="#000"
            style={styles.editIcon}
            onPress={() => SetEditng(true)}
          />
        )}
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('../../../../assets/images/user.png')}
          style={styles.avatar}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={80}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.infoContainer}>
            <View style={styles.row}>
              <Icon name="person" size={32} color="#a6aa53ff" />
              <View style={styles.textBlock}>
                <Text style={styles.label}>Full Name</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.input}
                    placeholder={`Enter Name`}
                    placeholderTextColor="#999"
                    onChangeText={text => setName(text)}
                  />
                ) : (
                  <Text style={styles.value}>{name}</Text>
                )}
              </View>
            </View>

            <View style={styles.row}>
              <Icon name="call" size={32} color="#a6aa53ff" />
              <View style={styles.textBlock}>
                <Text style={styles.label}>Phone no.</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.input}
                    placeholder={`Enter Phone Number`}
                    placeholderTextColor="#999"
                    onChangeText={text => setPhone(text)}
                  />
                ) : (
                  <Text style={styles.value}>{phone}</Text>
                )}
              </View>
            </View>

            <View style={styles.row}>
              <Icon name="email" size={32} color="#a6aa53ff" />
              <View style={styles.textBlock}>
                <Text style={styles.label}>E-Mail</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.input}
                    placeholder={`Enter Phone Number`}
                    placeholderTextColor="#999"
                    onChangeText={text => setEmail(text)}
                  />
                ) : (
                  <Text style={styles.value}>{email}</Text>
                )}
              </View>
            </View>

            {isEditing ? (
              <TouchableOpacity
                style={styles.button}
                onPress={confirmEditHandler}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#a6aa53ff',
    height: 150,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  arrowContainer: {
    backgroundColor: '#ffffffff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 100,
    zIndex: 10,
  },
  profileText: {
    fontSize: 27,
    fontWeight: '500',
    color: '#fff',
    fontStyle: 'italic',
    marginBottom: 40,
  },
  editIcon: {
    position: 'absolute',
    right: 20,
    top: 40,
    color: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: -50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
  },
  infoContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    borderBottomWidth: 0.5,
    borderColor: '#333',
    padding: 11,
    marginTop: 10,
  },
  textBlock: {
    marginLeft: 25,
  },
  label: {
    fontWeight: 500,
    fontSize: 18,
    color: '#4f4545ff',
  },
  value: {
    fontSize: 14,
    color: '#333',
    marginTop: 2,
  },
  input: {
    width: 240,
    backgroundColor: '#e6dadaff',
    fontSize: 14,
    padding: 10,
    borderRadius: 10,
    color: '#000',
  },
  button: {
    backgroundColor: '#4A90E2', // primary color
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6, // for Android shadow
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
