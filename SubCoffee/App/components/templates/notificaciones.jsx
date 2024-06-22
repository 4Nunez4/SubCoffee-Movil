import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from '../../Api/context/ip';

const ip = IP;

const Notificaciones = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const url = `${ip}/v1/notificaciones`;

        //aqui obtengo el token de asyncstorage y lo verifico a ver si es valido 
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('Error', 'No se encontró el token de autenticación');
          setIsLoading(false);
          return;
        } else {
          console.log('Token encontrado:', token);
        }

        const response = await axios.get(url, { headers: { token: token } });

        if (response.status === 200) {
    
          setNotifications(response.data.data); 
        } else {
          Alert.alert('Error', 'Error al obtener las notificaciones');
        }
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'Hubo un error al obtener las notificaciones');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const renderNotification = ({ item }) => (
    <View style={styles.notificationContainer}>
      <Text style={styles.notificationTextTitle}>{item.nombre_user}</Text>
      <Text style={styles.notificationText}>{item.texto_not}</Text>
      <Text style={styles.notificationFecha}>{item.fecha_not}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
     
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.pk_id_not.toString()} 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  notificationContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: 'green',
  },
  notificationText: {
    fontSize: 18,
    color: 'black',
  },
  loadingText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
  notificationTextTitle:{
    fontSize: 18,
    color: 'black',
    marginBottom:10,
    fontWeight:'700'
  },
  notificationFecha:{
    fontSize: 12,
    color: 'black',
    marginBottom:3,
    // fontWeight:'700'
  }
});

export default Notificaciones;
