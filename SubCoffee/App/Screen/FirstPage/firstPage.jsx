import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground, Alert, Text } from "react-native";
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
    <ImageBackground source={firstPage} style={styles.Image}>
      <View style={styles.container}>
        <TitleFirst />
        <Text style={[Typography.subtitle, styles.customSubtitle]}>
          Únete a nosotros en nuestras subastas de café especial y descubre una experiencia única.
        </Text>
      </View>
      <View style={styles.footer}>
        <LinkBoton press={() => setLoginVisible(true)} text={"Continuar"} />
        <LoginScreen visible={loginVisible} onClose={() => setLoginVisible(false)} />
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
    paddingTop: 1,
  },
  Image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  customSubtitle: {
    color: 'white',
    marginBottom: '120%',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  footer: {
    position: 'absolute', // Coloca el View en la parte inferior
    bottom: 0,            // Alinea al fondo
    width: '100%',        // Cubre el ancho completo
    alignItems: 'center', // Centra el contenido horizontalmente
    paddingBottom: 20,    // Espacio desde el borde inferior
  }
});
