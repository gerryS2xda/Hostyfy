import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from "../screen/Login"
import HomeHostScreen from "../screen/Home_host"
import Registrazione from "../screen/Registrazione"
import Inserisci_prenotazione from "../screen/Inserisci_prenotazione"
import LeMieStrutture from "../screen/LeMieStrutture"
import HomeGuestScreen from "../screen/Home_guest"
import StrutturaScreen from "../screen/Struttura"
import PrenotazioneDetailScreen from "../screen/PrenotazioneScreen"
import DomoticaScreen from "../screen/DomoticaScreen"
import ChiaveScreen from "../screen/ChiaveScreen"

const Drawer = createDrawerNavigator();

const DrawerMenuSimple = () =>{
    return(
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={LoginScreen} options={{
            title: 'Home', 
            swipeEnabled: false, //disabila lo swipe per aprire la drawer bar in quella schermata
            }} 
            />
            <Drawer.Screen name="HomeHost" component={HomeHostScreen} options={{title: 'Home host'}} />
            <Drawer.Screen name="Registratione" component={Registrazione} options={{title: 'Registrazione'}} />
            <Drawer.Screen name="InserisciPrenotazione" component={Inserisci_prenotazione} options={{title: 'Prenotazione'}} />
            <Drawer.Screen name="LeMieStrutture" component={LeMieStrutture} options={{title: 'Le mie strutture'}} />
            <Drawer.Screen name="HomeGuest" component={HomeGuestScreen} options={{title: 'Home guest'}} />
            <Drawer.Screen name="VisualizzaStruttura" component={StrutturaScreen} options={{title: 'Struttura'}} />
            <Drawer.Screen name="PrenotazioneDetail" component={PrenotazioneDetailScreen} options={{title: 'Prenotazione'}} />
            <Drawer.Screen name="InfoCamera" component={DomoticaScreen} options={{title: 'Informazioni camera'}} />
            <Drawer.Screen name="LaMiaChiave" component={ChiaveScreen} options={{title: 'La mia chiave'}} />
        </Drawer.Navigator>
    );
}

export default DrawerMenuSimple;

