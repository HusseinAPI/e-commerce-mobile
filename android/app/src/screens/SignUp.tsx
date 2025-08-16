/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../../assets/images/blue.jpg')}
        imageStyle={{ borderRadius: 12 }}
      >
        <View style={styles.header}>
          <View style={styles.arrowContainer}>
            <Icon name="arrow-forward" size={24} color="#fff" />
          </View>
        </View>
      </ImageBackground>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.signUpText}>Sign up</Text>

        <TextInput
          style={styles.input}
          placeholder="Muhammad Usman"
          placeholderTextColor="#666"
        />

        <TextInput
          style={styles.input}
          placeholder="+96548763213"
          placeholderTextColor="#666"
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="mobiledemo@gmail.com"
          placeholderTextColor="#666"
          keyboardType="email-address"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#666"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'visibility-off' : 'visibility'}
              size={22}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signIn}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ad9f7bff',
  },
  header: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 40,
  },
  arrowContainer: {
    backgroundColor: '#4ba9f1ff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 30,
    bottom: -30,
    zIndex: 10,
  },
  form: {
    height: 580,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingHorizontal: 25,
    paddingVertical: 95,
  },
  signUpText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4ba9f1ff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
    color: '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
    color: '#333',
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  footerText: {
    color: '#4ba9f1ff',
  },
  signIn: {
    fontWeight: 500,
    color: '#a6aa53ff',
    fontSize: 15,
  },
});
