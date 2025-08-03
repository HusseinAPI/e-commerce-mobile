import { View, StyleSheet, Text, TextInput } from 'react-native';

const Login = () => {
  return (
    <>
      <View style={styles.title}>
        <Text>username:</Text>
        <TextInput>name</TextInput>
      </View>
      <View style={styles.title}>
        <Text>password:</Text>
        <TextInput>name</TextInput>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: 'blue',
    margin: 50,
  },
});

export default Login;
