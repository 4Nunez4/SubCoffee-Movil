import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import LoginScreen from "../Screen/LoginScreen";
 import ChatScreen from "../Screen/share/ChatScreen";
 import VariedadScreen from "../Screen/VariedadScreen";
 import FincaScreen from "../Screen/buyer/FincaScreen";
// import OfertaScreen from "../Screen/OfertaScreen";
import SubastaScreen from "../Screen/SubastaScreen";

const Tab = createBottomTabNavigator()

const TabNavigationVen = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen  name= 'Subasta' component={SubastaScreen}/>
            {/* <Tab.Screen  name= 'Oferta' component={OfertaScreen}/>    */}
            <Tab.Screen  name= 'Variedad' component={VariedadScreen}/>  
            <Tab.Screen  name= 'Chat' component={ChatScreen}/>  
            <Tab.Screen  name= 'Finca' component={FincaScreen}/>    
             
        </Tab.Navigator>
    )
}
export default TabNavigationVen