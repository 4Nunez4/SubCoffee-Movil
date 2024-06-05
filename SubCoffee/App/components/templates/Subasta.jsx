import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SubastaScreen = () => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [imagen, setImagen] = useState('');
  const [precioInicial, setPrecioInicial] = useState('');
  const [precioFinal, setPrecioFinal] = useState('');
  const [unidadPeso, setUnidadPeso] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [estado, setEstado] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fkVariedad, setFkVariedad] = useState('');

  const handleRegistrarSubasta = () => {
    // Aquí puedes enviar los datos del formulario a tu API para registrar la subasta
    // Puedes usar axios u otra librería para hacer la solicitud HTTP
    // Ejemplo: axios.post('URL_API', { fechaInicio, fechaFin, ... })
    console.log('Datos de la subasta registrada:', {
      fechaInicio,
      fechaFin,
      imagen,
      precioInicial,
      precioFinal,
      unidadPeso,
      cantidad,
      estado,
      descripcion,
      fkVariedad
    });
  };

  return (
    <View style={styles.container}>
       <Text style={styles.title}>Registrar Subasta</Text>
      <Text style={styles.label}>Fecha de Inicio:</Text>
      <TextInput
        style={styles.input}
        value={fechaInicio}
        onChangeText={setFechaInicio}
        placeholder="YYYY-MM-DD HH:MM:SS"
      />

      <Text style={styles.label}>Fecha de Fin:</Text>
      <TextInput
        style={styles.input}
        value={fechaFin}
        onChangeText={setFechaFin}
        placeholder="YYYY-MM-DD HH:MM:SS"
      />

      <Text style={styles.label}>Imagen:</Text>
      <TextInput
        style={styles.input}
        value={imagen}
        onChangeText={setImagen}
        placeholder="URL de la imagen"
      />

      {/* Agrega más campos de entrada para el resto de los datos de la subasta */}

      <Button title="Registrar Subasta" onPress={handleRegistrarSubasta} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default SubastaScreen;
