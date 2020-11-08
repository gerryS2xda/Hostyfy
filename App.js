/* 
    install this dependency before run: 
    1. npm install react
    2. npm install react native
    3. npm install @react-navigation/native 
    4. npm install @react-navigation/stack 
    5. npm install @react-navigation/drawer
    6. npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
    7. npm install react-native-calendar-picker
    8. npm install react-native-picker-select
    9. npm install moment
    10. npm install react-native-elements
    11. npm install react-native-snap-carousel
    Swipe right to open
*/

import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from "./src/screen/Login"
import HomeHostScreen from "./src/screen/Home_host"
import Registrazione from "./src/screen/Registrazione"
import Inserisci_prenotazione from "./src/screen/Inserisci_prenotazione"
import LeMieStrutture from "./src/screen/LeMieStrutture"
import HomeGuestScreen from "./src/screen/Home_guest"
import StrutturaScreen from "./src/screen/Struttura"
import PrenotazioneDetailScreen from "./src/screen/PrenotazioneScreen"
import DomoticaScreen from "./src/screen/DomoticaScreen"
import ChiaveScreen from "./src/screen/ChiaveScreen"

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen 
          name="Home" 
          component={LoginScreen} 
          options={{title: 'Home'}} 
        />
        <Stack.Screen 
          name="HomeHost" 
          component={HomeHostScreen} 
          options={{title: 'Home Host'}} 
        />
        <Stack.Screen 
          name="Registratione" 
          component={Registrazione} 
          options={{title: 'Registratione'}} 
        />
        <Stack.Screen 
          name="InserisciPrenotazione" 
          component={Inserisci_prenotazione} 
          options={{title: 'Prenotazione'}} 
        />
        <Stack.Screen 
          name="LeMieStrutture" 
          component={LeMieStrutture} 
          options={{title: 'Le mie strutture'}} 
        />
        <Stack.Screen 
          name="HomeGuest" 
          component={HomeGuestScreen} 
          options={{title: 'Home guest'}} 
        />
        <Stack.Screen 
          name="VisualizzaStruttura" 
          component={StrutturaScreen} 
          options={{title: 'Struttura'}} 
        />
        <Stack.Screen 
          name="PrenotazioneDetail" 
          component={PrenotazioneDetailScreen} 
          options={{title: 'Prenotazione'}} 
        />
        <Stack.Screen 
          name="InfoCamera" 
          component={DomoticaScreen} 
          options={{title: 'Informazioni camera'}} 
        />
        <Stack.Screen 
          name="LaMiaChiave" 
          component={ChiaveScreen} 
          options={{title: 'La mia chiave'}} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
