import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinkBoton from '../components/atoms/button/linkboton';
import NetInfo from '@react-native-community/netinfo';
import CustomModal from '../components/modal/modal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from '../Api/context/ip';
import { jwtDecode } from 'jwt-decode';


// const ip = "192.168.11.238";
const ip = IP;

const LoginScreen = ({ visible, onClose, onSuccess }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false); 
  const [formData, setFormData] = useState({
    correo: '',
    password: '',
  });
  // const verificarToken = async (token) => {
  //   if (!token) return false;
  //   try {
  //     const decodedToken = jwtDecode(token);
  //     const expirationTime = decodedToken.exp;
  //     const currentTime = Date.now() / 1000;
  //     return expirationTime >= currentTime;
  //   } catch (error) {
  //     console.error('Error al decodificar el token:', error.message);
  //     return false;
  //   }
  // };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };



  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Tipo de conexión', state.type);
      console.log('¿Está conectado?', state.isConnected);
      if (!state.isConnected) {
        Alert.alert('Sin conexión', 'Por favor, verifica tu conexión a internet.');
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);



  
  const Validacion = async () => {
    setIsLoading(true);

    const connectionInfo = await NetInfo.fetch();
    if (!connectionInfo.isConnected) {
      Alert.alert('Sin conexión', 'Por favor, verifica tu conexión a internet');
      setIsLoading(false);
      return;
    }
    if (!formData.correo || !formData.password) {
      Alert.alert('Campos vacíos', 'Por favor, complete todos los campos');
      setIsLoading(false);
      return;
    }
    if (!formData.correo.includes('@')) {
      Alert.alert('Correo inválido', 'Por favor, ingrese un correo electrónico válido');
      setIsLoading(false);
      return;
    }
  
    try {
      const baseURL = `${ip}/auth/login`;
  
      const response = await axios.post(baseURL, formData);
  
      if (response.status === 200) {
        const { token, user } = response.data;
        if (token && user) {

          await AsyncStorage.setItem('token', token);

          console.log('Token obtenido al iniciar sesión:', token);

          await AsyncStorage.setItem('usuarios', JSON.stringify(user));
          setLoginSuccess(true);
          setIsLoading(false); 
          console.log(token);
  
          // await obtenerTodosUsuarios();
  
          const usuario = JSON.parse(await AsyncStorage.getItem('usuarios'));
          const userRol = usuario.rol_user.toLowerCase();
          const userStatus = usuario.estado_user;
          setIsLoading(false);

  
          if (userRol === 'vendedor' && userStatus === 'activo') {
            navigation.navigate("Comprador");
            Alert.alert('SubCoffee',"Bienvenido Comprador");
          } else if (userRol === 'comprador' && userStatus === 'activo') {
            navigation.navigate("Vendedor");
            Alert.alert('SubCoffee',"Bienvenido Vendedor");
          } else {
            if ((userRol === 'vendedor' && userStatus === 'inactivo') || (userRol === 'comprador' && userStatus === 'inactivo')) {
              Alert.alert("Lo sentimos pero no está activo en el sistema.");
              setIsLoading(false);
            } else {
              Alert.alert("Error", "Datos incorrectos");
              setIsLoading(false);
            }
          }
        } else {
          throw new Error('Datos de respuesta inválidos');
          
        }
      } else {
        throw new Error('Usuario no registrado');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      setIsLoading(false);
      if (error.response) {
      
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
      
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
  
      if (error.response && error.response.status === 400) {
        Alert.alert('Usuario no registrado');
        setIsLoading(false);
      } else {
        Alert.alert('404','Usuario no registrado');
        setIsLoading(false);
      }
  
      // await obtenerTodosUsuarios();
    }
  };
  if (!loginSuccess) {
    
  }
  return (
    <View style={{ flex: 1 }}>
    <CustomModal visible={visible} onClose={onClose}>
      <View style={styles.formulario}>
        <Text style={styles.titulo}>INICIAR SESIÓN</Text>
        <Text style={styles.etiqueta}>Correo electrónico:</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          value={formData.correo}
          onChangeText={(text) => handleInputChange('correo', text)}
          placeholder='Correo electrónico'
        />
        <Text style={styles.etiqueta}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          value={formData.password}
          onChangeText={(text) => handleInputChange('password', text)}
          placeholder='Contraseña'
          secureTextEntry={true}
        />
        <LinkBoton press={Validacion} text="Iniciar Sesión" styles={styles.boton} />

        <TouchableOpacity style={styles.recuperarPass} onPress={() => navigation.navigate('Recuperar-Password')}>
        <Text style={styles.olvidaste}>¿Olvidaste tu Contraseña?</Text>
        </TouchableOpacity>

        
      </View>
      
    </CustomModal>
    <Modal
      transparent={true}
      animationType="fade"
      visible={isLoading}
      onRequestClose={() => {}}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator size="large" color="#39A800" />
        </View>
      </View>
    </Modal>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)',
    paddingTop: '5%',
    paddingBottom:'5%'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'rgba(0,0,0,0.5)',
  },
  formulario: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  etiqueta: {
    fontSize: 16,
    marginBottom: 5,
    color: "#000",
  },
  input: {
    height: 40,
    borderColor: '#9c9c9c',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: '#000'
  },
  recuperarPass: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  olvidaste:{
    fontSize: 14,
    marginTop:30,
    color: "#559EB4",
  
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  activityIndicatorWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
 
});

export default LoginScreen;