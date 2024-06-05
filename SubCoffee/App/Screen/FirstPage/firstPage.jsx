import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground, Alert, Text, Image } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import LinkBoton from "../../components/atoms/button/linkboton";
import checkConnectivity from "../../components/error/errorHandler";
import firstPage from '../../resources/FirstPge1.jpg';
import TitleFirst from "../../components/atoms/Typography/TextFirstPage";
import { Typography } from "../../components/atoms/Typography/textGlobal";
import LoginScreen from "../LoginScreen";


export default function FirstPage() {
  const navigation = useNavigation();
  const [loginVisible, setLoginVisible] = useState(false);

  useEffect(() => {
    const onConnected = () => console.log("conectado a internet");
    const onDisconnected = () => {
      Alert.alert("Sin Conexion", "Conectese a internet nuevamente");
      console.log("sin conexion");
    };

    const unsubscribe = checkConnectivity(onConnected, onDisconnected);

    return () => unsubscribe();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setLoginVisible(false);
    }, [])
  );

  return (
    <View style={styles.Image}>
      <View style={styles.container}>
        <Image source={require('../../resources/IconoSubCoffee.png')} style={styles.logo}/>
        <TitleFirst />
        <Text style={[Typography.subtitle, styles.customSubtitle]}>
          Únete a nosotros en nuestras subastas de café especial y descubre una experiencia única.
        </Text>
      </View>
      <View style={styles.footer}>
        <LinkBoton press={() => setLoginVisible(true)} text={"Continuar"} />
        <LoginScreen visible={loginVisible} onClose={() => setLoginVisible(false)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingTop: 300,

  },
  Image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor:'white'
  },
  customSubtitle: {
    color: 'black',
    marginBottom: '110%',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  footer: {
    position: 'absolute', // Coloca el View en la parte inferior
    bottom: 0,            // Alinea al fondo
    width: '100%',        // Cubre el ancho completo
    alignItems: 'center', // Centra el contenido horizontalmente
    paddingBottom: 20,    // Espacio desde el borde inferior
  },
  logo:{
   
    width:170,
    height:170,
    marginBottom:5
  }
});
