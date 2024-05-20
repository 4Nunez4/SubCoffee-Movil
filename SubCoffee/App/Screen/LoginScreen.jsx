import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from './IP';
import NetInfo from '@react-native-community/netinfo'



 const ip = "10.0.2.3";

// const ip =IP

const LoginScreen = () => {
  const navigation = useNavigation();
  
  const [formData, setFormData] = useState({
    correo: '',
    password: '',
  });
  useEffect(()=>{
    const unsubscribe = NetInfo.addEventListener(state =>{
      console.log('Tipo de conexion', state.type);
      console.log('Is conected??', state.isConnected);
      if (!state.isConnected) {
        Alert.alert('Sin conexion ', 'Por favor,  verifica tu conexion a internet.')
    }
    }) 
    return()=>{
      unsubscribe();
    }
    
  },[])
    
  
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const Validacion = async () => {
    // Verificar el correo electrónico y la contraseña ingresados
    const { correo, password } = formData;
    
    // Verificar las credenciales para el usuario "andres@gmail.com"
    if (correo === "andres@gmail.com" && password === "123456789") {
      // Navegar a la vista de "Comprador" si el usuario es "andres@gmail.com"
      navigation.navigate("Comprador");
      return;
    }
    
    // Verificar las credenciales para el usuario "valen@gmail.com"
    if (correo === "valen@gmail.com" && password === "123456789") {
      // Navegar a la vista de "Vendedor" si el usuario es "valen@gmail.com"
      navigation.navigate("Vendedor");
      return;
    }
  
    // Mostrar un mensaje de error si las credenciales no son válidas
    Alert.alert('Credenciales incorrectas', 'Por favor, verifica tus credenciales');
  }
  

  // const Validacion = async () =>{
  //   const connectionInfo = await NetInfo.fetch()
  //   if (!connectionInfo.isConnected) {
  //     Alert.alert('Sin conexion ', 'Porfavor, verifica ti conexion a internet')
  //     return
  //   }
  //   console.log(formData)
  //   try {
  //     const baseURL = `http://${ip}:4000/auth/login`;

  //     const response = await axios.post(baseURL, formData);
  //     console.log(response.status);

      
  //       const { token } = response.data;
  //       await AsyncStorage.setItem('token', token);
  //       await AsyncStorage.setItem('user', JSON.stringify(response.data.user[0]));

  //       const storedUser = await AsyncStorage.getItem('usuarios')
  //       const user = JSON.parse(storedUser)
  //       const userRol= user.rol_user.toLowerCase()
  //       const userStatus = user.estado_user
  //       console.log(userStatus);
  //       console.log(userRol)
        
  //       const tokenAsyng = await AsyncStorage.getItem('token')


  //       if (userRol == 'vendedor' && userStatus=='activo') {
  //         navigation.navigate("Vendedor");
  //         console.log(tokenAsyng)
  //         Alert.alert('Bienvenido ');
  //       }else if (userRol === 'comprador' && userStatus=='activo'){
  //         navigation.navigate("Comprador");
  //         console.log(tokenAsyng)
  //         Alert.alert('Bienvenido ');
  //       }else{
  //         if (userRol=='vendedor'&& userStatus=='inactivo' || userRol=='comprador'&&userStatus=='inactivo') {
  //           Alert.alert("Lo sentimor pero no esta activo en el sistema. ");
  //         }else{
  //           Alert.alert('Credenciales incorrectas', 'Por favor, verifica tus credenciales');
  //         }

  //       }
  //       // navigation.navigate("vista1");
  //       // alert('Logueado');

      
  //   } catch (error) {
  //     if (error.response && error.response.status === 404) {
  //       Alert.alert('Usuario no registrado');
  //     } else {
  //       console.error(error);
  //       Alert.alert(error);
  //     }
  //   }
  // }

  return (
    <>
      <View style={styles.container}>
       
        <View style={styles.formulario}>
          <Text style={styles.titulo}>INICIAR SESION </Text>
          <Text style={styles.etiqueta}>Correo electronico:</Text>
          <TextInput style={styles.input} placeholderTextColor="#999"  value={formData.correo} onChangeText={(text) => handleInputChange('correo', text)} placeholder='Correo electronico'/>
          <Text style={styles.etiqueta}>Contraseña:</Text>
          <TextInput style={styles.input}  placeholderTextColor="#999"  value={formData.password} onChangeText={(text) => handleInputChange('password', text)} placeholder='Contraseña' secureTextEntry={true}/>

          <TouchableOpacity style={styles.boton} onPress={Validacion}>
            <Text style={styles.textoBoton}>Iniciar Sesion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fff',
    paddingHorizontal: 20,
    paddingTop:'5%',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:'center',
    marginBottom: 20,
    color: 'rgba(0,0,0,0.5)',
    // color:"#39A800",
    // backgroundColor:'#39A800'
  },
  formulario: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor:'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  etiqueta: {
    fontSize: 16,
    marginBottom: 5,
    color:"#000",
  },
  input: {
    height: 40,
    borderColor: '#9c9c9c',
    backgroundColor:'#fff',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color:'#000'
  },
  boton: {
    backgroundColor: '#39A800',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop:10,
    marginStart:60,
    height:40,
    width:180,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    textAlign:'center',
    fontWeight: 'bold',
  },

});

export default  LoginScreen 