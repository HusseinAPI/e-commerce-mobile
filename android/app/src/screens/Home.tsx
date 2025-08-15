/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
  ScrollView,
} from 'react-native';
import SearchIcon from 'react-native-vector-icons/Feather';
import ComputerIcon from 'react-native-vector-icons/MaterialIcons';
import WatchIcon from 'react-native-vector-icons/Feather';
import TshirtIcon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MobileIcon from 'react-native-vector-icons/FontAwesome';
import Product from '../components/Product';
import Header from '../components/Header';

export default function Home() {
  const categories = [
    { id: 1, name: 'Computer', iconName: 'computer', icon: ComputerIcon },
    { id: 2, name: 'Accesories', iconName: 'watch', icon: WatchIcon },
    {
      id: 3,
      name: 'Shoes',
      iconName: 'shoe-sneaker',
      icon: MaterialCommunityIcons,
    },
    { id: 4, name: 'Mobile', iconName: 'mobile', icon: MobileIcon },
    {
      id: 5,
      name: 'Music',
      iconName: 'headphones',
      icon: MaterialCommunityIcons,
    },
    { id: 6, name: 'Clothes', iconName: 'tshirt', icon: TshirtIcon },
    {
      id: 7,
      name: 'Others',
      iconName: 'devices',
      icon: MaterialCommunityIcons,
    },
  ];

  return (
    <>
      <View style={styles.card}>
        <Header title="Home" />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Search..."
            placeholderTextColor="#cdcdcdff"
          />
          <SearchIcon
            name="search"
            size={20}
            color="#cdcdcdff"
            style={{ marginTop: 8 }}
          />
        </View>
      </View>

      <View style={styles.list}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            const Icon = item.icon;
            return (
              <Pressable
                style={({ pressed }) => [
                  styles.category,
                  pressed && styles.categoryHover,
                ]}
              >
                {({ pressed }) => (
                  <>
                    <Icon
                      name={item.iconName}
                      size={20}
                      color={pressed ? '#ffffff' : '#3b3232ff'}
                    />
                    <Text
                      style={[
                        styles.text,
                        { color: pressed ? '#ffffff' : '#3b3232ff' },
                      ]}
                    >
                      {item.name}
                    </Text>
                  </>
                )}
              </Pressable>
            );
          }}
        />
      </View>
      <Pressable>
        {({ pressed }) => (
          <Text
            style={{
              color: pressed
                ? 'rgba(134, 134, 230, 1)'
                : 'rgba(184, 184, 250, 1)',
              fontWeight: 500,
              marginLeft: '80%',
              marginBottom: 15,
            }}
          >
            View All
          </Text>
        )}
      </Pressable>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 120, paddingRight: 23 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 1 }}>
            <Product
              name="S24 Ultra Platanium"
              price="800"
              bckgColor="#8df1b0ff"
              containerHeight={250}
              imgSrc={require('../../../../assets/images/s24.png')}
              imgWidth={150}
              imgHeight={150}
              imgMargin={5}
            />
            <Product
              name="Razer G"
              price="450"
              bckgColor="#abd4d8ff"
              containerHeight={280}
              imgSrc={require('../../../../assets/images/razerG.png')}
              imgWidth={130}
              imgHeight={170}
              imgMargin={8}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Product
              name="Xbox Series X"
              price="450"
              bckgColor="#c2befdff"
              containerHeight={300}
              imgSrc={require('../../../../assets/images/xbox.png')}
              imgWidth={130}
              imgHeight={190}
              imgMargin={8}
            />
            <Product
              name="S24 Ultra Platanium"
              price="800"
              bckgColor="#8df1b0ff"
              containerHeight={250}
              imgSrc={require('../../../../assets/images/s24.png')}
              imgWidth={150}
              imgHeight={150}
              imgMargin={5}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    height: 100,
    padding: 15,
    marginTop: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 5,
    paddingRight: 5,
    marginLeft: 8,
    width: '97%',
    borderRadius: 10,
    marginTop: 20,
    color: '#cdcdcdff',
  },
  inputText: {
    padding: 10,
    width: '90%',
    color: '#cdcdcdff',
  },
  list: {
    marginLeft: 22,
    height: 130,
  },
  category: {
    width: 100,
    height: 50,
    backgroundColor: '#ffffff',
    marginTop: 50,
    marginRight: 10,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryHover: {
    backgroundColor: '#ff8674ff',
  },
  text: {
    color: '#827b7bff',
    fontWeight: 'bold',
  },
});
