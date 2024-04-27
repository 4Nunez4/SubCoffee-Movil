import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./LoginScreen";
import ChatScreen from "./ChatScreen";
import VariedadScreen from "./VariedadScreen";
import FincaScreen from "./FincaScreen";
import OfertaScreen from "./OfertaScreen";
import SubastaScreen from "./SubastaScreen";

const Tab = createBottomTabNavigator()

const TabNavigation = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen  name= 'Login' component={LoginScreen}/>  
            <Tab.Screen  name= 'Subasta' component={SubastaScreen}/>
            <Tab.Screen  name= 'Oferta' component={OfertaScreen}/>   
            <Tab.Screen  name= 'Variedad' component={VariedadScreen}/>  
            <Tab.Screen  name= 'Chat' component={ChatScreen}/>  
            <Tab.Screen  name= 'Finca' component={FincaScreen}/>   
        </Tab.Navigator>
    )
}
export default TabNavigation