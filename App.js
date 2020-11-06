/* 
    install this dependency before run: 
    1. npm install react-navigation
    2. npm install @react-navigation/native 
    3. npm install @react-navigation/drawer
    4. npm install react-navigation-stack
    Swipe right to open
*/

import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "./src/screen/Login"
import HomeHostScreen from "./src/screen/Home_host"
import RegPersonalData from "./src/screen/RegistrazioneDatiPersonali"
import RegResidenceData from "./src/screen/RegistrazioneDatiResidenza"
import Inserisci_prenotazione from "./src/screen/Inserisci_prenotazione"

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
           name="Home"
           component={LoginScreen}
           options={{ headerShown: false }}
          />
          <Stack.Screen
           name="HomeHost"
           component={HomeHostScreen}
           options={{ title: 'Home Host' }}
          />
          <Stack.Screen
           name="RegistrationPersonalData"
           component={RegPersonalData}
           options={{ title: 'Registrazione' }}
          />
          <Stack.Screen
           name="RegistrationResidenzaData"
           component={RegResidenceData}
           options={{ title: 'Registrazione' }}
          />
          <Stack.Screen
           name="Inserisci"
           component={Inserisci_prenotazione}
           options={{ title: 'Prenotazione' }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

/*
const navigator = createStackNavigator(
  {
    Home: LoginScreen,
    HomeHost: HomeHostScreen,
    RegistrationPersonalData: RegPersonalData,
    RegistrationResidenzaData: RegResidenceData,
    Inserisci: Inserisci_prenotazione
  },
  {
    initialRouteName: "Home"
  }
);
export default createAppContainer(navigator);
*/