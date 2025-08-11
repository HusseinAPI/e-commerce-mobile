import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function LoginScreen() {
  return <View style={styles.card}></View>;
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 55,
    maxWidth: 330,
    backgroundColor: '#fff',
    padding: 5,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {},
});
