import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SubastaScreen from "../Screen/SubastaScreen";
import PerfilScreen from "../components/templates/perfil";
import Home from "../components/templates/Home";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import SideBar from "./sidebar";


const Tab = createBottomTabNavigator()

const userName = "Kata";

const TabNavigationCom = () => {
    return(
        
        <Tab.Navigator screenOptions={{
            tabBarShowLabel:false,
            tabBarActiveTintColor:'#39A800',
            tabBarInactiveTintColor:'grey'
        }}>
           
            <Tab.Screen  name={`Bienvenido ${userName}`} component={Home} options={{
                tabBarIcon:({color,size})=> (
                    <FontAwesome6 name='house' size={size} color={color} />
    )
            }}/>
            {/* <Tab.Screen  name= 'Oferta' component={OfertaScreen}/>    */}
            <Tab.Screen  name= 'Subastar' component={SubastaScreen}options={{
                tabBarIcon:({color,size})=> (
                    <FontAwesome name='plus' size={36} color={color} />
    )
            }}/> 
            <Tab.Screen  name= 'Perfil' component={PerfilScreen}options={{
                tabBarIcon:({color,size})=> (
                    <Ionicons name='person-circle-sharp' size={34} color={color} />
    )
            }}/> 
        </Tab.Navigator>
    )
}
export default TabNavigationCom