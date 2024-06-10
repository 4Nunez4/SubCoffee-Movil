import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const LinkBoton = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.boton}
        onPress={props.press}
      >
        {props.style}
        <Text style={styles.texto}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LinkBoton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 20, // Added padding to the container
  },
  boton: {
    width: 160,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 15,
    backgroundColor: '#39A800',
    borderRadius: 10,
    paddingHorizontal: 10, // Adjusted padding for better spacing
  },
  texto: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  }
});
