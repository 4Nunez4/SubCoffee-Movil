import React, { useEffect } from "react";
import { View, StyleSheet, ImageBackground, Alert, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LinkBoton from "../../components/atoms/button/linkboton";
import checkConnectivity from "../../components/error/errorHandler";
import firstPage from '../../resources/FirstPge1.jpg';
import TitleFirst from "../../components/atoms/Typography/TextFirstPage";
import { Typography } from "../../components/atoms/Typography/textGlobal";

export default function FirstPage() {
  const navigation = useNavigation();

  useEffect(() => {
    const onConnected = () => console.log("conectado a internet");
    Alert.alert("Sin Conexion", "Conectese a internet nuevamente");
    const onDisconnected = () => console.log("sin conexion");

    const unsubscribe = checkConnectivity(onConnected, onDisconnected);

    return () => unsubscribe();
  }, []);

  return (
    <ImageBackground source={firstPage} style={styles.Image}>
      <View style={styles.container}>
        
        <TitleFirst />
        
        <Text style={[Typography.subtitle, styles.customSubtitle]}>Únete a nosotros en nuestras subastas de café especial y descubre una experiencia única.</Text>

        
          <LinkBoton press={() => navigation.navigate('Login')} text={"Continuar"} styles={styles.estilobuton} />
          
       
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  Image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // buttonContainer: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   zIndex: 1,
  //   backgroundColor: "#39A800",
  //   paddingVertical: 20,
  //   alignItems: 'center',
  // },
  estilobuton: {
    paddingBottom:'40%'
  
  },
  customSubtitle:{
    color:'white',
    paddingBottom:'70%',
    alignItems:'center',
    justifyContent:'center',
  }
  
});
