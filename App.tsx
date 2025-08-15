import { StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navbar from './android/app/src/components/Navbar';
import AppNavigation from './android/app/src/navigation/AppNavigator';

export default function App() {
  const isCart = false;

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <AppNavigation />
        <StatusBar />
        {isCart ? null : <Navbar />}
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edededff',
  },
});
