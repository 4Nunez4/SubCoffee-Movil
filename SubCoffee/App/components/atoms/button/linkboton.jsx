import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const LinkBoton = (props) => {
  return (
    <View>
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
  boton: {
    width: 160,
    height: 40,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#39A800',
    borderRadius: 10,
    marginTop:'35%'

  },
  texto: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  }
});
