import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import TabNavigation from "./App/navigation/TabsNavigation";
import LoginScreen from "./App/Screen/LoginScreen.jsx";
import SplashScreen from "./splashScreen";
import { useEffect, useState } from "react";
import FirstPage from "./App/Screen/FirstPage/firstPage.jsx";
import TabNavigationCom from "./App/navigation/TabsNavigationCom.jsx";
import TabNavigationVen from "./App/navigation/TabsNavigationVen.jsx";
import Drawer from "./App/navigation/sidebar.jsx";

const Stack = createNativeStackNavigator();

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 2000);
  }, []);
    return(
    <>
  
        <NavigationContainer>
            <Stack.Navigator>
            {isShowSplash ? (
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen
                name="FirstPage"
                component={FirstPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  headerShown: false,
                  headerBackTitleVisible: false,
                }}
              />
              <Stack.Screen
                name="Comprador"
                component={TabNavigationCom}
                options={{
                  headerShown: false,
                  headerBackTitleVisible: false,
                }}
              />
              <Stack.Screen
                name="Vendedor"
                component={TabNavigationVen}
                options={{
                  headerShown: false,
                  headerBackTitleVisible: false,
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
export default App