import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
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
      {/* Header background */}
      <View style={styles.header}>
        <Text style={styles.title}>Lets Start!</Text>
        <View style={styles.arrowContainer}>
          <Icon name="arrow-forward" size={24} color="#fff" />
        </View>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.signInText}>Sign In</Text>

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
          <Text style={styles.footerText}>Forget password?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signIn}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a6aa53ff',
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
    height: 500,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingHorizontal: 25,
    paddingVertical: 95,
  },
  signInText: {
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
