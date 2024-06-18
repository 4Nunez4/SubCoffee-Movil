import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from '../../Api/context/ip';

const ip = IP;

const Notificaciones = ({ isVisible, onClose }) => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const obtenerToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        } else {
          Alert.alert('Sesión expirada', 'Por favor, inicia sesión nuevamente.');
          onClose(); // Cierra el modal si no hay token
        }
      } catch (error) {
        console.error('Error al obtener el token:', error);
      }
    };

    if (isVisible) {
      obtenerToken();
    }
  }, [isVisible, onClose]);

  useEffect(() => {
    const cargarNotificaciones = async () => {
      try {
        if (token) {
          const response = await axios.get(`${ip}/v1/notificaciones`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setNotificaciones(response.data);
        }
      } catch (error) {
        console.error('Error al cargar las notificaciones:', error);
      }
    };

    if (token) {
      cargarNotificaciones();
    }
  }, [token]);

  if (!isVisible) {
    return null; // Si isVisible es false, no renderiza nada
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notificaciones}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>{item.titulo}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
        <Text style={styles.textStyle}>Cerrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  notificationItem: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: "#f9c2ff",
    borderRadius: 8,
  },
  notificationText: {
    fontSize: 16,
  },
});

export default Notificaciones;
