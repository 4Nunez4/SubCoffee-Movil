import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import SubastaScreen from '../Screen/SubastaScreen.jsx';
import OfertaScreen from '../Screen/OfertaScreen.jsx';
const Drawer = createDrawerNavigator();

const SideBar = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Feed" component={SubastaScreen} />
        <Drawer.Screen name="Article" component={OfertaScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );    
}

export default SideBar;