import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, Alert, Switch } from 'react-native';
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
import UpgradeHostScreen from "../screen/UpgradeHostScreen"
import WelcomeScreen from "../screen/WelcomeScreen"

const Drawer = createDrawerNavigator();

const DrawerMenuSimple = (props) =>{

    return( 
        <Drawer.Navigator drawerContent={props =>  <DrawerContentCustom {...props}/>}>
            <Drawer.Screen name="WelcomePage" component={WelcomeScreen} options={{title: 'Welcome', swipeEnabled: false}} />
            <Drawer.Screen name="Home" component={LoginScreen} options={{
                title: 'Home', 
                swipeEnabled: false, //disabila lo swipe per aprire la drawer bar in quella schermata
             }} 
            />
            <Drawer.Screen name="HomeHost" component={HomeHostScreen} options={{title: 'Home host', swipeEnabled: false}} />
            <Drawer.Screen name="Registratione" component={Registrazione} options={{title: 'Registrazione', swipeEnabled: false}} />
            <Drawer.Screen name="InserisciPrenotazione" component={Inserisci_prenotazione} options={{title: 'Prenotazione', swipeEnabled: false}} />
            <Drawer.Screen name="LeMieStrutture" component={LeMieStrutture} options={{title: 'Le mie strutture', swipeEnabled: false}} />
            <Drawer.Screen name="HomeGuest" component={HomeGuestScreen} options={{title: 'Home guest', swipeEnabled: false}} />
            <Drawer.Screen name="VisualizzaStruttura" component={StrutturaScreen} options={{title: 'Struttura', swipeEnabled: false}} />
            <Drawer.Screen name="PrenotazioneDetail" component={PrenotazioneDetailScreen} options={{title: 'Prenotazione', swipeEnabled: false}} />
            <Drawer.Screen name="InfoCamera" component={DomoticaScreen} options={{title: 'Informazioni camera', swipeEnabled: false}} />
            <Drawer.Screen name="LaMiaChiave" component={ChiaveScreen} options={{title: 'La mia chiave', swipeEnabled: false}} />
            <Drawer.Screen name="ModificaProfilo" component={ModificaProfiloScreen} options={{title: 'Profilo', swipeEnabled: false}} />
            <Drawer.Screen name="Alloggio" component={AlloggioScreen} options={{title: 'Alloggio', swipeEnabled: false}} />
            <Drawer.Screen name="Inserisci struttura" component={InserisciStrutturaScreen} options={{title: 'Inserisci struttura', swipeEnabled: false}} />
            <Drawer.Screen name="EffettuaCheckIn" component={CheckInScreen} options={{title: 'Check-In', swipeEnabled: false}} />
            <Drawer.Screen name="VisualizzaAlloggi" component={VisualizzaAlloggi} options={{title: 'Visualizza Alloggi', swipeEnabled: false}} />
            <Drawer.Screen name="InserisciAlloggio" component={InserisciAlloggio} options={{title: 'Inserisci alloggio', swipeEnabled: false}} />
            <Drawer.Screen name="LeMieChiavi" component={LeMieChiaviScreen} options={{title: 'Le mie chiavi', swipeEnabled: false}} />
            <Drawer.Screen name="VisualizzaPrenotazioni" component={VisualizzaPrenotazioniScreen} options={{title: 'Visualizza prenotazioni', swipeEnabled: false}} />
            <Drawer.Screen name="StoricoPrenotazioni" component={VisualizzaStoricoPrenScreen} options={{title: 'Storico prenotazioni', swipeEnabled: false}} />
            <Drawer.Screen name="UpgradeHost" component={UpgradeHostScreen} options={{title: 'Upgrade host', swipeEnabled: false}} />
        </Drawer.Navigator>
    );
}

export default DrawerMenuSimple;

function DrawerContentCustom(props){
    //<Icon>
    const colorIcon = "black";
    const sizeIcon = 24;
    //gestione dello switch Guest<>Host
    const [isHost, setIsHost] = useState(false); //NOTA: questi valori dovranno essere letti dal DB
    const toggleSwitchGuestHost = () => {
        setIsHost(previousState => !previousState);
    };
    const [isUpgradePay, setIsUpgradePay] = useState(true); 

    const createNextRealeaseFeatureAlert = () =>
        Alert.alert(
        "Funzionalità non disponibile",
        "Questa funzionalità sarà disponibile a seguito di sviluppi futuri!",
        [
            {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
    );

    const createDowngradeHostAlert = () =>
        Alert.alert(
        "Downgrade host",
        "Procedendo si perdono tutti i servizi dedicati all'host e quindi si ritorna ad essere un guest. Premi Ok per continuare",
        [
            {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            { text: "OK", onPress: () =>{
                    setIsHost(false);
                    setIsUpgradePay(false);
                } 
            }
        ],
        { cancelable: false }
    );


    if(!isHost){
        return(
            <View style={styles.drawerContainer}>
                <DrawerContentScrollView {...props}>
                    <View style={styles.drawerContent}>
                        <View style={styles.userInfoSection}>
                            <View style={styles.horizontalView}>
                                <Image style = {styles.avatarImage} source ={require('../../assets/user.png')}/>
                                <Text style={styles.userInfo}>Tizio Caio</Text>
                                <View style={styles.horizontalViewSwitch}>
                                    <Text style={styles.labelSwitchTxt}>Guest</Text>
                                    <Switch style={styles.switchStyle}
                                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                                        thumbColor={isHost ? "#f5dd4b" : "#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                        disabled={!isUpgradePay} //logica inversa in quanto se disabled= true, rendi non accessibile lo switch
                                        onValueChange={toggleSwitchGuestHost}
                                        value={isHost}
                                    />
                                    <Text style={styles.labelSwitchTxt}>Host</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.drawerSection}>
                            <DrawerItem 
                                icon={() => ( <Icon name="home-outline" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Home</Text>)}
                                onPress={() => {props.navigation.navigate('HomeHost')}}
                            />
                            <DrawerItem 
                                icon={() => (<Icon name="account" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Area personale</Text>)}
                                onPress={() => {props.navigation.navigate('ModificaProfilo')}}
                            />
                            <DrawerItem 
                                icon={() => ( <Icon name="briefcase" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Prenotazioni</Text>)}
                                onPress={() => {props.navigation.navigate('VisualizzaPrenotazioni')}}
                            />
                            <DrawerItem 
                                icon={() => ( <Icon name="key-outline" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Le mie chiavi digitali</Text>)}
                                onPress={() => {props.navigation.navigate('LeMieChiavi')}}
                            />
                            <DrawerItem 
                                icon={() => (<Icon name="arrow-up-bold-circle" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Upgrade host</Text>)}
                                onPress={() => {
                                        setIsHost(true); //dovra' essere rimosso non appena si perfeziona implementazione
                                        setIsUpgradePay(true); //per la demo (si dovra' gestire in altro modo questo)    
                                        props.navigation.navigate('UpgradeHost');
                                    }
                                }
                            />
                        </View>
                    </View>
                </DrawerContentScrollView>
                <View style={styles.bottomDrawerSection}>
                    <DrawerItem 
                        icon={() => (<Icon name="exit-to-app" color={colorIcon} size={sizeIcon} /> )}
                        label={()=>(<Text style={styles.labelDrawerItemStyle}>Sign Out</Text>)}
                        onPress={() => {props.navigation.navigate('Home')}} 
                    />
                </View>
            </View>
         );
    }else{
        return(
            <View style={styles.drawerContainer}>
                <DrawerContentScrollView {...props}>
                    <View style={styles.drawerContent}>
                        <View style={styles.userInfoSection}>
                            <View style={styles.horizontalView}>
                                <Image style = {styles.avatarImage} source ={require('../../assets/user.png')}/>
                                <Text style={styles.userInfo}>Tizio Caio</Text>
                                <View style={styles.horizontalViewSwitch}>
                                    <Text style={styles.labelSwitchTxt}>Guest</Text>
                                    <Switch style={styles.switchStyle}
                                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                                        thumbColor={isHost ? "#f5dd4b" : "#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                        disabled={!isUpgradePay} //logica inversa in quanto se disabled= true, rendi non accessibile lo switch
                                        onValueChange={toggleSwitchGuestHost}
                                        value={isHost}
                                    />
                                    <Text style={styles.labelSwitchTxt}>Host</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.drawerSection}>
                            <DrawerItem 
                                icon={() => ( <Icon name="home-outline" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Home</Text>)}
                                onPress={() => {props.navigation.navigate('HomeHost')}}
                            />
                            <DrawerItem 
                                icon={() => (<Icon name="account" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Area personale</Text>)}
                                onPress={() => {props.navigation.navigate('ModificaProfilo')}}
                            />
                            <DrawerItem 
                                icon={() => ( <Icon name="briefcase" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Prenotazioni</Text>)}
                                onPress={() => {props.navigation.navigate('VisualizzaPrenotazioni')}}
                            />
                            <DrawerItem 
                                icon={() => ( <Icon name="key-outline" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Le mie chiavi digitali</Text>)}
                                onPress={() => {props.navigation.navigate('LeMieChiavi')}}
                            />
                            <DrawerItem 
                                icon={() => ( <Icon name="hospital-building" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Le mie strutture</Text>)}
                                onPress={() => {props.navigation.navigate('LeMieStrutture')}}
                            />
                            <DrawerItem 
                                icon={() => ( <Icon name="calendar-month" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Calendario prenotazioni</Text>)}
                                onPress={createNextRealeaseFeatureAlert}
                            />
                            <DrawerItem 
                                icon={() => ( <Icon name="broom" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Clean service</Text>)}
                                onPress={createNextRealeaseFeatureAlert}
                            />
                            <DrawerItem 
                                icon={() => ( <Icon name="currency-usd" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Servizi premium</Text>)}
                                onPress={createNextRealeaseFeatureAlert}
                            />
                            <DrawerItem 
                                icon={() => (<Icon name="arrow-down-bold-circle" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Downgrade host</Text>)}
                                onPress={createDowngradeHostAlert}
                            />
                        </View>
                    </View>
                </DrawerContentScrollView>
                <View style={styles.bottomDrawerSection}>
                    <DrawerItem 
                        icon={() => (<Icon name="exit-to-app" color={colorIcon} size={sizeIcon} /> )}
                        label={()=>(<Text style={styles.labelDrawerItemStyle}>Sign Out</Text>)}
                        onPress={() => {props.navigation.navigate('Home')}} 
                    />
                </View>
            </View>
        );
    }
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
      borderBottomColor: '#b2c2bf',
      borderBottomWidth: 1,
      paddingBottom: 6,
    },
    horizontalView: {
        flexDirection: 'row',
        marginTop: 20,
    },
    avatarImage: {
        width: 24,
        height: 24,
        marginRight: 12,
    },
    userInfo: {
        fontSize: 16,
        marginTop: 1,
        color: 'black',
        fontFamily: 'Montserrant',
    },
    labelDrawerItemStyle: {
        fontSize: 14, 
        color: 'black',
        fontFamily: 'Montserrant',
    },
    drawerSection: {
        marginTop: 8,
    },
    bottomDrawerSection: {
        marginBottom: 8,
        borderTopColor: '#b2c2bf',
        borderTopWidth: 1,
    },
    horizontalViewSwitch: {
        flexDirection: 'row',
        marginLeft: 12,
    },
    labelSwitchTxt: {
        fontSize: 16,
        marginTop: 1,
        color: 'black',
        fontFamily: 'Montserrant',
    },
    switchStyle: {
        marginRight: 2,
        marginTop: 0,
    }
});

