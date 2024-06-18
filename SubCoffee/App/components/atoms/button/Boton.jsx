import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const Boton = (props) => {
  return (
    <View style={styles.contenedor}>
      <TouchableOpacity 
        style={styles.boton}
        onPress={props.press}
      >
        <Text style={styles.texto}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Boton;

const styles = StyleSheet.create({
  boton: {
    width: 160,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#39A800',
    borderRadius: 10,
  },
  texto: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  contenedor: {
    justifyContent:'center',
    alignItems:'center'
  }
});
