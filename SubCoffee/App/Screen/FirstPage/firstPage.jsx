import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, Text, Image } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import LinkBoton from "../../components/atoms/button/linkboton";
import checkConnectivity from "../../components/error/errorHandler";
import TitleFirst from "../../components/atoms/Typography/TextFirstPage";
import { Typography } from "../../components/atoms/Typography/textGlobal";
import LoginScreen from "../LoginScreen";
import LinearGradient from "react-native-linear-gradient";

export default function FirstPage() {
  const navigation = useNavigation();
  const [loginVisible, setLoginVisible] = useState(null)

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

  const onSuccess = () => {
    setLoginVisible(false); // Cerrar el modal de inicio de sesión
    // Aquí podrías realizar acciones adicionales después del inicio de sesión
  };

  return (
    <View style={styles.container}>
      <View style={styles.waveTop} />
      <View style={styles.waveBottom} />
      <View style={styles.content}>
        <Image source={require('../../resources/IconoSubCoffee.png')} style={styles.logo} />
        <TitleFirst />
        <Text style={[Typography.subtitle, styles.customSubtitle]}>
          Únete a nosotros en nuestras subastas de café especial y descubre una experiencia única.
        </Text>
        <View style={styles.footer}>
         <LinkBoton press={() => setLoginVisible(true)} text={"Continuar"} />
         {loginVisible && <LoginScreen visible={true} onClose={() =>  setLoginVisible(false)} onSuccess={onSuccess} />}
      </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#39A800',
    position: 'relative',
  },
  waveTop: {
    position: 'absolute',
    top: 30,
    left: 0,
    bottom:0,
    right: 0, 
    height: 750, 
    backgroundColor: 'white',
    borderTopLeftRadius: 200, 
    borderBottomRightRadius:200,
   
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 300,
  },
  customSubtitle: {
    color: 'black',
    marginBottom: '110%',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 140,
  },
  logo: {
    width: 170,
    height: 170,
    marginBottom: 5,
  },
});

