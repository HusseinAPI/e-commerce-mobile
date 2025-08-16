import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Header*/}
      <View style={styles.header}>
        <View style={styles.arrowContainer}>
          <Icon name="arrow-back" size={24} color="#a6aa53ff" />
        </View>
        <Text style={styles.profileText}>Profile</Text>
        <Icon name="edit" size={25} color="#000" style={styles.editIcon} />
      </View>

      {/* Profile Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../../assets/images/user1.jpg')}
          style={styles.avatar}
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Icon name="person" size={32} color="#a6aa53ff" />
          <View style={styles.textBlock}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>Jack Robertson</Text>
            {/* <TextInput
              style={styles.input}
              placeholder={`Enter Name`}
              placeholderTextColor="#999"
            /> */}
          </View>
        </View>

        <View style={styles.row}>
          <Icon name="apartment" size={32} color="#a6aa53ff" />
          <View style={styles.textBlock}>
            <Text style={styles.label}>Department</Text>
            <Text style={styles.value}>Technology</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Icon name="call" size={32} color="#a6aa53ff" />
          <View style={styles.textBlock}>
            <Text style={styles.label}>Phone no.</Text>
            <Text style={styles.value}>+98 1245560090</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Icon name="email" size={32} color="#a6aa53ff" />
          <View style={styles.textBlock}>
            <Text style={styles.label}>E-Mail</Text>
            <Text style={styles.value}>JackRobertson@random.com</Text>
          </View>
        </View>
      </View>
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
    left: 20,
    top: 50,
    zIndex: 10,
  },
  profileText: {
    fontSize: 27,
    fontWeight: '500',
    color: '#fff',
    fontStyle: 'italic',
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
    color: '#a6aa53ff',
  },
});
