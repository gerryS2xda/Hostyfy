/* 
    install this dependency before run: 
    1. npm install react
    2. npm install react native
    3. npm install @react-navigation/native 
    4. npm install @react-navigation/stack 
    5. npm install @react-navigation/drawer
    6. npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
    7. npm install --save react-native-calendar-picker
    8. npm install react-native-picker-select
    9. npm install moment
    10. npm install react-native-elements
    11. npm install react-native-snap-carousel
    12. npm install react-native-vector-icons
    13. npm install react-native-dialog
    14. npm install expo-font
    15. npm install expo-av
    16. npm install expo-video-player 
    17. npm install react-native-slider
    18. npm install @react-native-community/netinfo
    19. npm install @react-native-community/slider
    20. npm install react-native-popup-dialog
    21. npm install firebase
    22. npm install react-native-modalbox@latest --save
    23. npm i react-native-modalbox
    24. npm i react-native-modal-datetime-picker @react-native-community/datetimepicker
    25. npm i --save react-native-events-calendar
    Swipe right to open
*/
import {LogBox} from 'react-native'
import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SetupDB from "./src/firebase/setupFirestoreDB"
// import dedicati per utilizzare font personalizzati
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
// import dedicati per aggiungere schermate allo stack navigator 
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
import DrawerMenuSimple from "./src/components/DrawerMenuSimple"
import ModificaProfiloScreen from "./src/screen/Modifica_profilo"
import AlloggioScreen from "./src/screen/Alloggio"
import InserisciStrutturaScreen from "./src/screen/Inserisci_struttura"
import CheckInScreen from "./src/screen/CheckInScreen"
import VisualizzaAlloggi from "./src/screen/VisualizzaAlloggi"
import InserisciAlloggio from "./src/screen/Inserisci_alloggio"
import LeMieChiaviScreen from "./src/screen/LeMieChiavi"
import VisualizzaPrenotazioniScreen from "./src/screen/VisualizzaPrenotazioni"
import VisualizzaStoricoPrenScreen from "./src/screen/VisualizzaStoricoPrenotazioni"
import UpgradeHostScreen from "./src/screen/UpgradeHostScreen"
import WelcomeScreen from "./src/screen/WelcomeScreen"
import VisualizzaDateAlloggi from "./src/screen/Visualizza_date_alloggi"
import MoviePlayerScreen from "./src/screen/MediaPlayerScreen"
import Calendario_alloggio from "./src/screen/Calendario_alloggio"
import Visualizza_calendario_alloggio from "./src/screen/Visualizza_calendario_alloggio"
import NotificationScreen from "./src/screen/NotificationScreen"
import CheckOutScreen from "./src/screen/CheckOutScreen"
import PasswordDimenticata from "./src/screen/PasswordDimenticata"
import ImagePickerMultipleStruttura from "./src/components/ImagePickerMultipleStruttura"
import ImagePickerMultipleAlloggio from "./src/components/ImagePickerMultipleAlloggio"

const Stack = createStackNavigator();
LogBox.ignoreAllLogs();
const App = () => {
  
  //SetupDB.createFirestoreDB();

  let [fontsLoaded] = useFonts({
    'Montserrant': require('./assets/fonts/montserrant.ttf'),
    'MontserrantSemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'MontserrantBold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'MontserrantThin': require('./assets/fonts/Montserrat-Thin.ttf'),
    'MontserrantItalic': require('./assets/fonts/Montserrat-Italic.ttf'),
  });
  if (!fontsLoaded) { //se il font non e' stato caricato correttamente o semplicemente non e' pronto
    return <AppLoading />; //effettua rendering mentre l'app viene caricata usando questo <AppLoading>
  } else {
    return (
      <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen 
            name="DrawerMenuSimple" 
            component={DrawerMenuSimple} 
            options={{title: 'Home'}} 
          />
          <Stack.Screen 
            name="WelcomePage" 
            component={WelcomeScreen} 
            options={{title: 'Welcome'}} 
          />
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
            options={{title: 'Registrazione'}} 
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
          <Stack.Screen 
            name="ModificaProfilo" 
            component={ModificaProfiloScreen} 
            options={{title: 'Profilo'}} 
          />
          <Stack.Screen 
            name="Alloggio" 
            component={AlloggioScreen} 
            options={{title: 'Alloggio'}} 
          />
          <Stack.Screen 
            name="Inserisci struttura" 
            component={InserisciStrutturaScreen} 
            options={{title: 'Inserisci struttura'}} 
          />
          <Stack.Screen 
            name="EffettuaCheckIn" 
            component={CheckInScreen} 
            options={{title: 'Check-In'}} 
          />
          <Stack.Screen 
            name="VisualizzaAlloggi" 
            component={VisualizzaAlloggi} 
            options={{title: 'Visualizza Alloggi'}} 
          />
          <Stack.Screen 
            name="InserisciAlloggio" 
            component={InserisciAlloggio} 
            options={{title: 'Inserisci Alloggio'}} 
          />
          <Stack.Screen 
            name="LeMieChiavi" 
            component={LeMieChiaviScreen} 
            options={{title: 'Le mie chiavi'}} 
          />
          <Stack.Screen 
            name="VisualizzaPrenotazioni" 
            component={VisualizzaPrenotazioniScreen} 
            options={{title: 'Visualizza prenotazioni'}} 
          />
          <Stack.Screen 
            name="StoricoPrenotazioni" 
            component={VisualizzaStoricoPrenScreen} 
            options={{title: 'Storico prenotazioni'}} 
          />
          <Stack.Screen 
            name="UpgradeHost" 
            component={UpgradeHostScreen} 
            options={{title: 'Upgrade Host'}} 
          />
          <Stack.Screen 
            name="VisualizzaDateAlloggi" 
            component={VisualizzaDateAlloggi} 
            options={{title: 'Calendario'}} 
          />
          <Stack.Screen 
            name="MoviePlayer" 
            component={MoviePlayerScreen} 
            options={{title: 'Media player'}} 
          />
          <Stack.Screen 
            name="Calendario_Alloggio" 
            component={Calendario_alloggio} 
            options={{title: 'Calendario'}} 
          />
          <Stack.Screen 
            name="Visualizza_calendario_alloggio" 
            component={Visualizza_calendario_alloggio} 
            options={{title: 'Calendario'}} 
          />
          <Stack.Screen 
            name="Notifications" 
            component={NotificationScreen} 
            options={{title: 'Notifiche'}} 
          />
          <Stack.Screen 
            name="CheckOut" 
            component={CheckOutScreen} 
            options={{title: 'CheckOut'}} 
          />
          <Stack.Screen 
            name="PasswordDimenticata" 
            component={PasswordDimenticata} 
            options={{title: 'PasswordDimenticata'}} 
          />
          <Stack.Screen 
            name="ImagePickerMultipleStruttura" 
            component={ImagePickerMultipleStruttura} 
            options={{title: 'Selezionate 0 foto', headerShown: true}} 
          />
          <Stack.Screen 
            name="ImagePickerMultipleAlloggio" 
            component={ImagePickerMultipleAlloggio} 
            options={{title: 'Selezionate 0 foto', headerShown: true}} 
          />
        </Stack.Navigator>   
      </NavigationContainer>
    );
  }
};

export default App;
