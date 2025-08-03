import React from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.input}>
        <TextInput style={styles.buttonText} placeholder="Search...">
          {''}
        </TextInput>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 330,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    marginLeft: 12,
    marginTop: 45,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#007BFF',
    color: '#333',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
