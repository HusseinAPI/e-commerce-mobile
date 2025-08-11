import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import tw from 'twrnc';
import { NavigationContainer } from '@react-navigation/native';
import Navbar from './android/app/src/components/Navbar';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Text style={styles.title}>Hello !</Text>
        <Navbar />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffe8ff',
  },
  title: {
    fontSize: 30,
    color: 'yellow',
    margin: 20,
  },
});

export default App;
