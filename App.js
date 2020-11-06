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

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

/*
  NOTA: Per usare il drawer navigator insieme allo stack navigator si e' reso necessario creare una 
  funzione per ogni screen in modo tale da poter usare la header bar in ogni schermata, quindi
  per ogni nuova schermata occorre aggiungere un <Drawer.Screen ...> element e settare la props 'component' 
  con una funzione che restituisce <StackNavigator di tale schermata la cui prop 'component' =  {NomeScreen} 
*/

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen 
          name="Home" 
          component={stackNavigatorForHome} 
          options={{title: 'Home'}} 
        />
        <Drawer.Screen 
          name="HomeHost" 
          component={stackNavigatorForHomeHost} 
          options={{title: 'Home Host'}} 
        />
        <Drawer.Screen 
          name="Registratione" 
          component={stackNavigatorForRegistrazione} 
          options={{title: 'Registratione'}} 
        />
        <Drawer.Screen 
          name="InserisciPrenotazione" 
          component={stackNavigatorForInsertPrenotazione} 
          options={{title: 'Prenotazione'}} 
        />
        <Drawer.Screen 
          name="LeMieStrutture" 
          component={stackNavigatorForMieStrutture} 
          options={{title: 'Le mie strutture'}} 
        />
        <Drawer.Screen 
          name="HomeGuest" 
          component={stackNavigatorForHomeGuest} 
          options={{title: 'Home guest'}} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

//Functions for use Stack Navigator (now back button on header bar is disable)
function stackNavigatorForHome(){
  return(
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: "#9AC4F8",
      },
      headerTintColor: "white",
      headerBackTitle: "Back",
    }}>
      <Stack.Screen
      name="Home1"
      component={LoginScreen}
      options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function stackNavigatorForHomeHost(){
  return(
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: "#9AC4F8",
      },
      headerTintColor: "white",
      headerBackTitle: "Back",
    }}>
      <Stack.Screen
      name="HomeHost1"
      component={HomeHostScreen}
      options={{ 
        title: 'Home Host' 
      }}
      />
    </Stack.Navigator>
  );
}

function stackNavigatorForRegistrazione(){
  return(
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: "#9AC4F8",
      },
      headerTintColor: "white",
      headerBackTitle: "Back",
    }}>
      <Stack.Screen
      name="Registratione1"
      component={Registrazione}
      options={{ title: 'Registrazione' }}
      />
    </Stack.Navigator>
  );
}

function stackNavigatorForInsertPrenotazione(){
  return(
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: "#9AC4F8",
      },
      headerTintColor: "white",
      headerBackTitle: "Back",
    }}>
      <Stack.Screen
      name="InserisciPrenotazione1"
      component={Inserisci_prenotazione}
      options={{ title: 'Prenotazione' }}
      />
    </Stack.Navigator>
  );
}

function stackNavigatorForMieStrutture(){
  return(
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: "#9AC4F8",
      },
      headerTintColor: "white",
      headerBackTitle: "Back",
    }}>
      <Stack.Screen
      name="LeMieStrutture1"
      component={LeMieStrutture}
      options={{ title: 'Le mie Strutture' }}
      />
    </Stack.Navigator>
  );
}

function stackNavigatorForHomeGuest(){
  return(
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: "#9AC4F8",
      },
      headerTintColor: "white",
      headerBackTitle: "Back",
    }}>
      <Stack.Screen
      name="HomeGuest1"
      component={HomeGuestScreen}
      options={{ title: 'Home guest' }}
      />
    </Stack.Navigator>
  );
}

export default App;
