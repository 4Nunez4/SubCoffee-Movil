import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import SubastaScreen from '../Screen/SubastaScreen';
import OfertaScreen from '../Screen/OfertaScreen';
import TabNavigationCom from './TabsNavigationCom';
import TabNavigationVen from './TabsNavigationVen';
import icono from '../resources/IconoSubCoffee.png';
import subasta from '../resources/auction.png';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => (
  
  <DrawerContentScrollView {...props}>
    <View style={{ padding: 12, alignItems: 'center' }}>
      <Image 
        source={icono}  
        style={{ width: 90, height: 90 }}
      />
      <View style={styles.divider} />
    </View>
    <DrawerItemList {...props} />
    <TouchableOpacity
      style={styles.logoutButton}
      onPress={() => {
        // Aquí puedes añadir la lógica para cerrar sesión
        console.log('Cerrar sesión clickeado');

      }}
    >
      <Text style={styles.logoutText}>Cerrar Sesión</Text>
    </TouchableOpacity>
  </DrawerContentScrollView>
);

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#d3d3d3',
    marginVertical: 10,
  },
  logoutButton: {
    padding: 10,
    marginTop: 15,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    borderRadius: 5
  },
  logoutText: {
    color: 'red',
    fontSize: 16,
  }
});

const DrawerNavigatorOptions = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Inicio";
  return {
    swipeEnabled: routeName === "Inicio",
    gestureEnabled: routeName === "Inicio",
  };
};

const CompradorDrawer = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={({ route }) => ({
      ...DrawerNavigatorOptions(route),
      headerShown: false, // Ocultar el encabezado superior
      drawerIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Subastas') {
          return <Image source={subasta} style={{ width: size, height: size, tintColor: color }} />;
        }
        if (route.name === 'Inicio') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Perfil') {
          iconName = focused ? 'person' : 'person-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      drawerActiveTintColor: 'green',
      drawerInactiveTintColor: 'gray',
      drawerStyle: {
        backgroundColor: '#f0f0f0',
      },
    })}
  >
    <Drawer.Screen name="Inicio" component={TabNavigationCom} />
    <Drawer.Screen name="Subastas" component={SubastaScreen} />
  </Drawer.Navigator>
);

const VendedorDrawer = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={({ route }) => ({
      ...DrawerNavigatorOptions(route),
      headerShown: false,
      drawerIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Ofertas') {
          iconName = focused ? 'pricetag' : 'pricetag-outline';
        } else if (route.name === 'Perfil') {
          iconName = focused ? 'person' : 'person-outline';
        } else if (route.name === 'Inicio') {
          iconName = focused ? 'home' : 'home-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      drawerActiveTintColor: 'green',
      drawerInactiveTintColor: 'gray',
      drawerStyle: {
        backgroundColor: '#f0f0f0',
      },
    })}
  >
    <Drawer.Screen name="Inicio" component={TabNavigationVen} />
    <Drawer.Screen name="Ofertas" component={OfertaScreen} />
  </Drawer.Navigator>
);

const SideBar = ({ userType }) => {
  return userType === "comprador" ? <CompradorDrawer /> : <VendedorDrawer />;
};

export default SideBar;
