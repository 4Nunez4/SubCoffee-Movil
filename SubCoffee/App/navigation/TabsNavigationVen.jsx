import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SubastaScreen from "../Screen/SubastaScreen";
import PerfilScreen from "../components/templates/perfil";
import Home from "../components/templates/Home";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const TabNavigationVen = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarShowLabel: false,
      tabBarActiveTintColor: '#39A800',
      tabBarInactiveTintColor: 'grey',
      tabBarActiveBackgroundColor: 'rgba(57, 168, 0, 0.1)',
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Bienvenido Kata') {
          iconName = 'house';
          return <FontAwesome6 name={iconName} size={size} color={color} />;
        } else if (route.name === 'Perfil') {
          iconName = 'person-circle-sharp';
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      },
    })}
  >
       <Tab.Screen
        name={`Bienvenido Kata`}
        component={Home}
        // options={{
        //   tabBarIcon: ({ color, size }) => (
        //     <FontAwesome6 name="house" size={size} color={color} />
        //   ), 
        // }}
      />
       
      
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='person-circle-sharp' size={34} color={color} />
          ),
        }}
      />
       
    </Tab.Navigator>
  );
};

export default TabNavigationVen;
 {/* <Tab.Screen
        name="Subastar"
        component={SubastaScreen}
        options={{
          
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus" size={36} color={color} />
          ),
        }}
      /> */}