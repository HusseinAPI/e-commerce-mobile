import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navbar from './android/app/src/components/Navbar';
import Home from './android/app/src/screens/Home';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Home />
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Navbar />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edededff',
  },
  title: {
    fontSize: 30,
    color: 'yellow',
    margin: 20,
  },
});

export default App;
