import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import axios from 'axios';
import { Ionicons } from 'react-native-vector-icons';

const ip = "192.168.11.238"; 

const Notificaciones = ({ isVisible, onClose }) => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const cargarNotificaciones = async () => {
      try {
        const response = await axios.get(`http://${ip}:4000/v1/notificaciones`);
        setNotificaciones(response.data);
      } catch (error) {
        console.error('Error al cargar las notificaciones:', error);
      }
    };

    cargarNotificaciones();
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
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
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  notificationItem: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: "#f9c2ff",
  },
  notificationText: {
    fontSize: 16,
  },
});

export default Notificaciones;
