import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SubastaScreen from "../Screen/SubastaScreen";
import PerfilScreen from "../components/templates/perfil";
import Home from "../components/templates/Home";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
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
          if (route.name === 'SubCoffee') {
            iconName = 'house';
            return <FontAwesome6 name={iconName} size={size} color={color} />;
          } else if (route.name === 'Perfil') {
            iconName = 'person-circle-sharp';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Subastar') {
            iconName = 'plus';
            return <FontAwesome6 name={iconName} size={size} color={color} />;
          }
        },
      })}
    >
     <Tab.Screen
        name="SubCoffee"
        component={Home}
        options={{
          tabBarLabel: 'SubCoffee', 
          tabBarLabelStyle: { color: '#FFF' }, 
          headerTitle: 'SubCoffee', 
          headerStyle: { backgroundColor: '#4FBA18' },
          headerTitleStyle: { color: '#FFF' , fontSize:25, fontWeight:'bold'}, 
        }}
      />
      
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='person-circle-sharp' size={34} color={color} />
          ),
          tabBarLabelStyle: { color: '#FFF' }, 
          headerTitle: 'Perfil', 
          headerStyle: { backgroundColor: '#4FBA18' },
          headerTitleStyle: { color: '#FFF' , fontSize:25, fontWeight:'bold'}, 
        }}
      />
       
      {/* <Tab.Screen
        name="Subastar"
        component={SubastaScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="plus" size={36} color={color} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default TabNavigationVen;
