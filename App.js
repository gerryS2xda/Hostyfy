/* 
    install this dependency before run: 
    1. npm install @react-navigation/native @react-navigation/stack 
    2. npm install @react-navigation/drawer
    3. npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
    4. npm install react-native-calendar-picker
    5. npm install react
    6. npm install react native
    7. npm install react-native-picker-select
    8. npm install moment
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