import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native';
import LinkBoton from '../components/atoms/button/linkboton';
import Input from '../components/atoms/inputs/Inputs';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';

const SubastaScreen = () => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  // Función para manejar la selección de fecha de inicio
  const handleFechaInicioSeleccionada = (day) => {
    setFechaInicio(day.dateString);
  };

  // Función para manejar la selección de fecha de fin
  const handleFechaFinSeleccionada = (day) => {
    setFechaFin(day.dateString);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registrar Subasta</Text>

      <View style={styles.rowContainer}>
        <View style={styles.column}>
          <Text style={styles.label}>Fecha de Inicio:</Text>
          <TouchableOpacity onPress={() => setMostrarCalendario(true)}>
            <Icon name="calendar" size={20} color="#39A800" style={styles.iconoCalendario} />
          </TouchableOpacity>
          <Modal visible={mostrarCalendario} animationType="slide">
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => setMostrarCalendario(false)}>
                <Text style={{ fontSize: 20, color: '#39A800', marginVertical: 10 }}>Cerrar</Text>
              </TouchableOpacity>
              <Calendar
                onDayPress={handleFechaInicioSeleccionada}
                markedDates={{ [fechaInicio]: { selected: true, selectedColor: '#39A800' } }}
                theme={{ textDayFontSize: 12, textMonthFontSize: 12, textDayHeaderFontSize: 12 }}
              />
            </View>
          </Modal>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Fecha de Fin:</Text>
          <TouchableOpacity onPress={() => setMostrarCalendario(true)}>
            <Icon name="calendar" size={20} color="#39A800" style={styles.iconoCalendario} />
          </TouchableOpacity>
          <Modal visible={mostrarCalendario} animationType="slide">
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => setMostrarCalendario(false)}>
                <Text style={{ fontSize: 20, color: '#39A800', marginVertical: 10 }}>Cerrar</Text>
              </TouchableOpacity>
              <Calendar
                onDayPress={handleFechaInicioSeleccionada}
                markedDates={{ [fechaInicio]: { selected: true, selectedColor: '#39A800' } }}
                theme={{ textDayFontSize: 12, textMonthFontSize: 12, textDayHeaderFontSize: 12 }}
              />
            </View>
          </Modal>

          
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Text style={styles.label}>Imagen:</Text>
        {/* Agregar el componente para cargar la imagen */}
        <View style={styles.imageUploadContainer}>
          {/* Aquí puedes colocar el componente para cargar la imagen */}
          <Text style={styles.imageUploadText}>Seleccionar imagen</Text>
        </View>
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.column}>
          <Text style={styles.label}>Precio Inicial:</Text>
          <TextInput
            style={styles.input1}
            placeholder="Precio inicial de la subasta"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Precio Final:</Text>
          <TextInput
            style={styles.input1}
            placeholder="Precio final de la subasta"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.column}>
          <Text style={styles.label}>Cantidad:</Text>
          <TextInput
            style={styles.input1}
            placeholder="Cantidad disponible"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Unidad de Peso:</Text>
          <TextInput
            style={styles.input1}
            placeholder="Cantidad disponible"
            keyboardType="numeric"
          />
        </View>
      </View>

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={[styles.input2, { height: 100 }]}
        multiline
        placeholder="Descripción de la subasta"
      />

      <Text style={styles.label}>ID de la Variedad:</Text>
      <TextInput
        style={styles.input1}
        placeholder="ID de la variedad"
        keyboardType="numeric"
      />

      <LinkBoton text="Registrar Subasta" styles={styles.boton} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 35,
    color:'#39A800',
    
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  input1: {
    marginTop: 10,
    height: 40,
    width:100,
    borderBottomWidth: 1,
    color:'#39A800',
    borderColor:'gray',
    borderRadius:10,
  },
  input2: {
    marginTop: 10,
    height: 40,
    width:320,
    borderColor: 'gray',
    borderWidth: 1,
    color:'black',
    borderRadius:10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  imageUploadContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: 200, // ajusta el ancho según tu preferencia
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageUploadText: {
    fontSize: 16,
    color: 'black',
  },
  iconoCalendario: {
    marginRight: 10,
    marginTop: 10,
  },
});

export default SubastaScreen;
