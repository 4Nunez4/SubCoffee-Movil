// DataContainer.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const DataContainer = ({ imageUri, startDate, endDate, description, variety, onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.text}>FECHA INICIO: {new Date(startDate).toLocaleDateString()}</Text>
        <Text style={styles.text}>FECHA FIN: {new Date(endDate).toLocaleDateString()}</Text>
        <Text style={styles.text}>DESCRIPCIÓN: {description}</Text>
        <Text style={styles.text}>VARIEDAD: {variety}</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Ver más +</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 20,
    width: "90%",
    marginLeft: "5%",
    flexDirection: 'row',
  },
  imageContainer: {
    width: '50%',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  dataContainer: {
    width: '50%',
    padding: 10,
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    fontStyle: 'normal',
    color: '#000',
    marginBottom: 5,
  },
  button: {
    width: 180,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 15,
  },
});

export default DataContainer;
