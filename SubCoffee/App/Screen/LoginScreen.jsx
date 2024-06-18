import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinkBoton from '../components/atoms/button/linkboton';
import NetInfo from '@react-native-community/netinfo';
import CustomModal from '../components/modal/modal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from '../Api/context/ip';
import jwtDecode from 'jwt-decode'


// const ip = "192.168.11.238";
const ip = IP;

const LoginScreen = ({ visible, onClose }) => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    correo: '',
    password: '',
  });

  const verificarToken = async (token) => {
    if (!token) return false;

    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp;
    const currentTime = Date.now() / 1000;

    if (expirationTime < currentTime) {
      return false;
    }

    return true;
  };
  useEffect(() => {
    const verificarTokenStorage = async () => {
      const token = await AsyncStorage.getItem('token');
      const esTokenValido = await verificarToken(token);

      if (!esTokenValido) {
        setFormData({ correo: '', password: '' });
        // Mostrar modal de inicio de sesión aquí
      } else {
        navigation.navigate("Comprador");
      }
    };

    verificarTokenStorage();
  }, []);
  
  useEffect(() => {
    if (!visible) {
      setFormData({ correo: '', password: '' });
    }
  }, [visible]);

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

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  // const obtenerTodosUsuarios = async () => {
  //   try {
  //     const response = await axios.get(`http://${ip}:4000/v1/users`);
  //     console.log('Todos los usuarios:', response.data);
  //   } catch (error) {
  //     console.error('Error al obtener todos los usuarios:', error.message);
  //     if (error.response) {
      
  //       console.log(error.response.data);
  //       console.log(error.response.status);
  //       console.log(error.response.headers);
  //     } else if (error.request) {
      
  //       console.log(error.request);
  //     } else {
  //       console.log('Error', error.message);
  //     }
  //     console.log(error.config);
  //   }
  // };
  
  const Validacion = async () => {
    const connectionInfo = await NetInfo.fetch();
    if (!connectionInfo.isConnected) {
      Alert.alert('Sin conexión', 'Por favor, verifica tu conexión a internet');
      return;
    }
    if (!formData.correo || !formData.password) {
      Alert.alert('Campos vacíos', 'Por favor, complete todos los campos');
      return;
    }
    if (!formData.correo.includes('@')) {
      Alert.alert('Correo inválido', 'Por favor, ingrese un correo electrónico válido');
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

          console.log(token);
  
          // await obtenerTodosUsuarios();
  
          const usuario = JSON.parse(await AsyncStorage.getItem('usuarios'));
          const userRol = usuario.rol_user.toLowerCase();
          const userStatus = usuario.estado_user;
  
          if (userRol === 'vendedor' && userStatus === 'activo') {
            navigation.navigate("Comprador");
            Alert.alert('SubCoffee',"Bienvenido Comprador");
          } else if (userRol === 'comprador' && userStatus === 'activo') {
            navigation.navigate("Vendedor");
            Alert.alert('SubCoffee',"Bienvenido Vendedor");
          } else {
            if ((userRol === 'vendedor' && userStatus === 'inactivo') || (userRol === 'comprador' && userStatus === 'inactivo')) {
              Alert.alert("Lo sentimos pero no está activo en el sistema.");
            } else {
              Alert.alert("Error", "Datos incorrectos");
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
      } else {
        Alert.alert('404','Usuario no registrado');
      }
  
      // await obtenerTodosUsuarios();
    }
  };
  
  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)',
    paddingTop: '5%',
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
 
});

export default LoginScreen;