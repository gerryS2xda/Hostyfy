import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
import ModificaProfiloScreen from "../screen/Modifica_profilo"
import AlloggioScreen from "../screen/Alloggio"
import InserisciStrutturaScreen from "../screen/Inserisci_struttura"
import CheckInScreen from "../screen/CheckInScreen"
import VisualizzaAlloggi from "../screen/VisualizzaAlloggi"
import InserisciAlloggio from "../screen/Inserisci_alloggio"
import LeMieChiaviScreen from "../screen/LeMieChiavi"
import VisualizzaPrenotazioniScreen from "../screen/VisualizzaPrenotazioni"
import VisualizzaStoricoPrenScreen from "../screen/VisualizzaStoricoPrenotazioni"

const Drawer = createDrawerNavigator();

const DrawerMenuSimple = (props) =>{
    return( 
        <Drawer.Navigator drawerContent={props =>  <DrawerContentCustom {...props}/>}>
            <Drawer.Screen name="Home" component={LoginScreen} options={{
            title: 'Home', 
            swipeEnabled: false, //disabila lo swipe per aprire la drawer bar in quella schermata
            }} 
            />
            <Drawer.Screen name="HomeHost" component={HomeHostScreen} options={{title: 'Home host'}} />
            <Drawer.Screen name="Registratione" component={Registrazione} options={{title: 'Registrazione', swipeEnabled: false}} />
            <Drawer.Screen name="InserisciPrenotazione" component={Inserisci_prenotazione} options={{title: 'Prenotazione'}} />
            <Drawer.Screen name="LeMieStrutture" component={LeMieStrutture} options={{title: 'Le mie strutture'}} />
            <Drawer.Screen name="HomeGuest" component={HomeGuestScreen} options={{title: 'Home guest'}} />
            <Drawer.Screen name="VisualizzaStruttura" component={StrutturaScreen} options={{title: 'Struttura'}} />
            <Drawer.Screen name="PrenotazioneDetail" component={PrenotazioneDetailScreen} options={{title: 'Prenotazione'}} />
            <Drawer.Screen name="InfoCamera" component={DomoticaScreen} options={{title: 'Informazioni camera'}} />
            <Drawer.Screen name="LaMiaChiave" component={ChiaveScreen} options={{title: 'La mia chiave'}} />
            <Drawer.Screen name="ModificaProfilo" component={ModificaProfiloScreen} options={{title: 'Profilo'}} />
            <Drawer.Screen name="Alloggio" component={AlloggioScreen} options={{title: 'Alloggio'}} />
            <Drawer.Screen name="Inserisci struttura" component={InserisciStrutturaScreen} options={{title: 'Inserisci struttura'}} />
            <Drawer.Screen name="EffettuaCheckIn" component={CheckInScreen} options={{title: 'Check-In'}} />
            <Drawer.Screen name="VisualizzaAlloggi" component={VisualizzaAlloggi} options={{title: 'Visualizza Alloggi'}} />
            <Drawer.Screen name="InserisciAlloggio" component={InserisciAlloggio} options={{title: 'Inserisci alloggio'}} />
            <Drawer.Screen name="LeMieChiavi" component={LeMieChiaviScreen} options={{title: 'Le mie chiavi'}} />
            <Drawer.Screen name="VisualizzaPrenotazioni" component={VisualizzaPrenotazioniScreen} options={{title: 'Visualizza prenotazioni'}} />
            <Drawer.Screen name="StoricoPrenotazioni" component={VisualizzaStoricoPrenScreen} options={{title: 'Storico prenotazioni'}} />
        </Drawer.Navigator>
    );
}

export default DrawerMenuSimple;

function DrawerContentCustom(props){
    return(
        <View style={styles.drawerContainer}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={styles.horizontalView}>
                            <Image style = {styles.avatarImage} source ={require('../../assets/user.png')}/>
                            <Text style={styles.userInfo}>Tizio Caio</Text>
                        </View>
                    </View>
                    <View style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('HomeHost')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Area personale"
                            onPress={() => {props.navigation.navigate('ModificaProfilo')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="briefcase" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Prenotazioni"
                            onPress={() => {props.navigation.navigate('VisualizzaPrenotazioni')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="key-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Le mie chiavi digitali"
                            onPress={() => {props.navigation.navigate('LeMieChiavi')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="arrow-up-bold-circle" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Upgrade Host"
                            onPress={() => {props.navigation.navigate('LeMieChiavi')}}
                        />
                    </View>
                </View>
            </DrawerContentScrollView>
            <View style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {signOut()}}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContainer: {
      flex: 1,
    },
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
      paddingLeft: 16,
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      paddingBottom: 6,
    },
    horizontalView: {
        flexDirection: 'row',
        marginTop: 20,
    },
    avatarImage: {
        width: 32,
        height: 32,
        marginRight: 16,
    },
    userInfo: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
        color: 'black'
    },
    drawerSection: {
        marginTop: 8,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
});

