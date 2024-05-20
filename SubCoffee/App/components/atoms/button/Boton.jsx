import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const Boton = (props) => {
  return (
    <View>
      <TouchableOpacity 
        style={styles.boton}
        onPress={props.press}
      >
        <Text style={styles.texto}>Enviar</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Boton
const styles = StyleSheet.create({
  boton: {
    width: 160,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    // marginLeft:'30%',
    backgroundColor: '#39A800',
    borderRadius: 10, // Deja solo una de estas líneas
 },
  texto: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',

  }
})
