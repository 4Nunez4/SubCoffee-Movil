import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomHeader = ({ navigation, userName, toggleModal }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        <Text style={styles.welcomeText}>Bienvenido {userName}</Text>
      </View>
      <TouchableOpacity onPress={toggleModal}>
        <Icon name="bell" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Icon name="bars" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff'
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 'auto'
  },
  welcomeText: {
    fontSize: 18,
    marginRight: 10
  }
});

export default CustomHeader;
