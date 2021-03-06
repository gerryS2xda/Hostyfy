import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Alert, Switch } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {firebase} from "../firebase/config"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as GuestModel from "../firebase/datamodel/GuestModel"
import * as HostModel from "../firebase/datamodel/HostModel"
import CustomAlertGeneral from "../components/CustomAlertGeneral"

//Import delle schermate da aggiungere al drawer navigator
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
import MoviePlayerScreen from "../screen/MediaPlayerScreen"
import VisualizzaDateAlloggi from "../screen/Visualizza_date_alloggi"
import VisualizzaCalendarioAlloggio from "../screen/Visualizza_calendario_alloggio"
import NotificationScreen from "../screen/NotificationScreen"
import CheckOutScreen from "../screen/CheckOutScreen"
import InserisciRecensioneScreen from "../screen/InserisciRecensioneScreen"
import VisualizzaCleanServices from "../screen/VisualizzaCleanServices"
import InserisciCleanService from "../screen/InserisciCleanService"
import ModificaCleanService from "../screen/ModificaCleanService"
import RecensioniHostScreen from "../screen/RecensioniHostScreen"
import RecensioniGuestScreen from "../screen/RecensioniGuestScreen"
import RecensioneScreen from "../screen/RecensioneScreen"
import ModificaStruttura from "../screen/ModificaStruttura"
import ModificaAlloggio from "../screen/ModificaAlloggio"

//Create Drawer navigator
const Drawer = createDrawerNavigator();
//Get Cloud firestore reference
var db = firebase.firestore();

const DrawerMenuSimple = ({navigation}) =>{
      
    const [user, setUser] = useState({});
    
    useEffect(() => {
        //NOTA: questa soluzione permette l'invocazione di useEffect ogni volta che si apre e chiude il drawer menu
        //Tuttavia, comporta un numero elevato di lettura 
        const unsubscribe = navigation.addListener('state', () => {
            // do something
            const getUserAccount = async ()=>{
                //NOTA: il valore di currentUser e' null alla prima lettura di questa pagina da parte di "App.js", viene settata ogni volta che si apre il drawer menu
                var userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : "unknown user"; 
                if(userId !== "unknown user"){
                    var guestDoc = await GuestModel.getGuestDocument(userId);
                    var creditcardDoc = await GuestModel.getGuestCreditCardDocument(userId);
                    if(guestDoc.isHost){ //verifica se guest e' anche un host
                        var hostDoc = await HostModel.getHostDocument(userId);
                        setUser({...guestDoc, ...creditcardDoc, ...hostDoc});
                    }else{
                        setUser({...guestDoc, ...creditcardDoc});
                    }
                }else{
                    return Promise.reject("UserID is 'unknown', please wait for login");
                }
            }
    
            getUserAccount().catch(function (err) { console.log("ERROR in DrawerMenuSimple: " + err); });
        });
        return unsubscribe;
      }, [navigation]); //la soluzione precedente si basava sul fatto che useEffect veniva invocato ogni volta che il contenuto di 'userId' subiva modifiche 

    return( 
        <Drawer.Navigator drawerContent={(props) => <DrawerContentCustom {...props} userId={user.userId} userProps={user} />}>
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
            <Drawer.Screen name="MoviePlayer" component={MoviePlayerScreen} options={{title: 'Movie player', swipeEnabled: false}} />
            <Drawer.Screen name="VisualizzaDateAlloggi" component={VisualizzaDateAlloggi} options={{title: 'Calendario', swipeEnabled: false}} />
            <Drawer.Screen name="Visualizza_calendario_alloggio" component={VisualizzaCalendarioAlloggio} options={{title: 'Calendario', swipeEnabled: false}} />
            <Drawer.Screen name="Notifications" component={NotificationScreen} options={{title: 'Notifiche', swipeEnabled: false}} />
            <Drawer.Screen name="CheckOut" component={CheckOutScreen} options={{title: 'CheckOut', swipeEnabled: false}} />
            <Drawer.Screen name="InserisciRecensione" component={InserisciRecensioneScreen} options={{title: 'Recensione', swipeEnabled: false}} />
            <Drawer.Screen name="VisualizzaCleanServices" component={VisualizzaCleanServices} options={{title: 'Clean Services', swipeEnabled: false}} />
            <Drawer.Screen name="InserisciCleanService" component={InserisciCleanService} options={{title: 'Inserisci Clean Service', swipeEnabled: false}} />
            <Drawer.Screen name="ModificaCleanService" component={ModificaCleanService} options={{title: 'Clean Service', swipeEnabled: false}} />
            <Drawer.Screen name="RecensioniHostScreen" component={RecensioniHostScreen} options={{title: 'Recensioni', swipeEnabled: false}} />
            <Drawer.Screen name="RecensioniGuestScreen" component={RecensioniGuestScreen} options={{title: 'Le mie recensioni', swipeEnabled: false}} />
            <Drawer.Screen name="RecensioneScreen" component={RecensioneScreen} options={{title: 'Recensioni', swipeEnabled: false}} />
            <Drawer.Screen name="ModificaStruttura" component={ModificaStruttura} options={{title: 'Modifica Struttura', swipeEnabled: false}} />
            <Drawer.Screen name="ModificaAlloggio" component={ModificaAlloggio} options={{title: 'Modifica Alloggio', swipeEnabled: false}} />
        </Drawer.Navigator>
    );
}

export default DrawerMenuSimple;

function DrawerContentCustom(props){
    
    //Parametri ricevuti
    var userId = props.userId;
    var userLogged = props.userProps;
    var isRealHost = userLogged.isHost;

    //Gestione dello stato dei CustomAlert
    const [showAlertNextFeature, setShowAlertNextFeature] = useState(false);
    const [showAlertDowngrade, setShowAlertDowngrade] = useState(false);

    //Style delle icone del menu
    const colorIcon = "black";
    const sizeIcon = 24;
    
    //gestione dello switch Guest<>Host
    const [isHost, setIsHost] = useState(userLogged.isHost);
    const toggleSwitchGuestHost = () => {
        setIsHost(previousState => !previousState);
        if(!isHost){
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'HomeHost',  params: { userId: userId }}],
            }); //resetta lo stack quando si ritorna nella Home
        }else{
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'HomeGuest',  params: { userId: userId }}],
            }); //resetta lo stack quando si ritorna nella Home
        }
    };
    if(!userLogged.isHost && isHost){ //se l'utente loggato non è host, setta isHost a false
        setIsHost(false);
    }

    if(!isHost){
        return(
            <View style={styles.drawerContainer}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSectionGuest}>
                        <View style={styles.avaterAndTxtContainerGuest}>
                            <Text style={styles.userInfo}>Ciao, {userLogged.nome}</Text>
                        </View>
                        {isRealHost && ( 
                            <View style={styles.horizontalViewSwitch}>
                                <Text style={styles.labelSwitchTxt}>Guest</Text>
                                <Switch style={styles.switchStyle}
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={isHost ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitchGuestHost}
                                    value={isHost}
                                />
                                <Text style={styles.labelSwitchTxt}>Host</Text>
                            </View>
                            )}
                    </View>   
                        <View style={styles.drawerSection}>
                            <DrawerItem 
                                icon={() => ( <Icon name="home-outline" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Home</Text>)}
                                onPress={() => {
                                    props.navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'HomeGuest',  params: { userId: userId }}],
                                    }); //resetta lo stack quando si ritorna nella Home
                                }}
                            />
                            <DrawerItem 
                                icon={() => (<Icon name="account" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Area personale</Text>)}
                                onPress={() => {
                                    props.navigation.navigate('ModificaProfilo', {user: userLogged});
                                }}
                            />
                            <DrawerItem 
                                icon={() => ( <Icon name="briefcase" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Prenotazioni</Text>)}
                                onPress={ () => {
                                    props.navigation.navigate('VisualizzaPrenotazioni', {user: userLogged,isHost:false});
                                }}
                            />
                            <DrawerItem 
                                icon={() => ( <Icon name="key-outline" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Le mie chiavi digitali</Text>)}
                                onPress={() => {
                                    props.navigation.navigate('LeMieChiavi', {user: userLogged,isHost:false});
                                }}
                            />
                            {!isRealHost && (
                            <DrawerItem 
                                icon={() => (<Icon name="arrow-up-bold-circle" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Upgrade host</Text>)}
                                onPress={() => { 
                                        props.navigation.navigate('UpgradeHost', {user: userLogged});
                                    }
                                }
                            />
                            )}
                        </View>
                    </View>
                </DrawerContentScrollView>
                <View style={styles.bottomDrawerSection}>
                    <DrawerItem 
                        icon={() => (<Icon name="exit-to-app" color={colorIcon} size={sizeIcon} /> )}
                        label={()=>(<Text style={styles.labelDrawerItemStyle}>Sign Out</Text>)}
                        onPress={() => {
                            firebase.auth().signOut().then(() => {
                                // Sign-out successful.
                                props.navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Home' }],
                                  });
                                
                            }).catch((error) => {
                                console.log("Error Sign-out in DrawerMenuSimple: " + error);
                            });
                        }} 
                    />
                </View>
            </View>
         );
    }else{
        return(
            <View style={styles.drawerContainer}>
                <DrawerContentScrollView {...props}>
                    <View style={styles.drawerContent}>
                        <View style={styles.userInfoSectionGuest}>
                            <View style={styles.avaterAndTxtContainer}>
                                <Text style={styles.userInfo}>Ciao, {userLogged.nome}</Text>
                            </View>                           
                            <View style={styles.horizontalViewSwitch}>
                                <Text style={styles.labelSwitchTxt}>Guest</Text>
                                <Switch style={styles.switchStyle}
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={isHost ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitchGuestHost}
                                    value={isHost}
                                />
                                <Text style={styles.labelSwitchTxt}>Host</Text>
                            </View>
                        </View>
                        <View style={styles.drawerSection}>
                            <DrawerItem 
                                icon={() => ( <Icon name="home-outline" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Home</Text>)}
                                onPress={() => {
                                    props.navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'HomeHost',  params: { userId: userId }}],
                                    }); //resetta lo stack quando si ritorna nella Home
                                }}
                            />
                            <DrawerItem 
                                icon={() => (<Icon name="account" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Area personale</Text>)}
                                onPress={() => {
                                    props.navigation.navigate('ModificaProfilo', {user: userLogged});
                                }}
                            />
                            <DrawerItem 
                                icon={() => ( <Icon name="briefcase" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Prenotazioni</Text>)}
                                onPress={ () => {
                                    props.navigation.navigate('VisualizzaPrenotazioni', {user: userLogged,isHost:true});
                                }}
                            />
                            <DrawerItem 
                                icon={() => ( <Icon name="key-outline" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Le mie chiavi digitali</Text>)}
                                onPress={() => {
                                    props.navigation.navigate('LeMieChiavi', {user: userLogged,isHost:true});
                                }}
                            />
                            <DrawerItem 
                                icon={() => ( <Icon name="hospital-building" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Le mie strutture</Text>)}
                                onPress={() => {
                                    props.navigation.navigate("LeMieStrutture", {user: userLogged}); 
                                }}
                            /> 
                            <DrawerItem 
                                icon={() => ( <Icon name="calendar-month" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Calendario prenotazioni</Text>)}
                                onPress={() => {
                                    props.navigation.navigate('Visualizza_calendario_alloggio', {user: userLogged});
                                }}
                            />
                            <DrawerItem 
                                icon={() => ( <Icon name="broom" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Clean service</Text>)}
                                onPress={() => {
                                    props.navigation.navigate('VisualizzaCleanServices', {user: userLogged});
                                }}
                            />
                            <DrawerItem 
                                icon={() => ( <Icon name="currency-usd" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Servizi premium</Text>)}
                                onPress={()=> setShowAlertNextFeature(true)}
                            />
                            <DrawerItem 
                                icon={() => (<Icon name="arrow-down-bold-circle" color={colorIcon} size={sizeIcon} /> )}
                                label={()=>(<Text style={styles.labelDrawerItemStyle}>Downgrade host</Text>)}
                                onPress={()=> setShowAlertDowngrade(true)}
                            />
                        </View>
                    </View>
                </DrawerContentScrollView>
                <View style={styles.bottomDrawerSection}>
                    <DrawerItem 
                        icon={() => (<Icon name="exit-to-app" color={colorIcon} size={sizeIcon} /> )}
                        label={()=>(<Text style={styles.labelDrawerItemStyle}>Sign Out</Text>)}
                        onPress={() => {
                            firebase.auth().signOut().then(() => {
                                // Sign-out successful.
                                props.navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Home' }],
                                  });
                            }).catch((error) => {
                                console.log("Error Sign-out in DrawerMenuSimple.js: " + error);
                            });
                        }} 
                    />
                </View>
                <CustomAlertGeneral
                  visibility={showAlertNextFeature}
                  titolo="Funzionalità non disponibile"
                  testo= "Questa funzionalità sarà disponibile a seguito di sviluppi futuri!"
                  hideNegativeBtn={true}
                  buttonName="Ok"
                  onOkPress={()=>{ 
                        setShowAlertNextFeature(false); 
                  }} />
                <CustomAlertGeneral
                  visibility={showAlertDowngrade}
                  titolo="Downgrade host"
                  testo= "Procedendo si perdono tutti i servizi dedicati all'host e quindi si ritorna ad essere un guest. Continuare?"
                  annullaBtnName="No"
                  onAnnullaBtn={()=>{
                    setShowAlertDowngrade(false);
                  }}
                  buttonName="Sì"
                  onOkPress={()=>{ 
                    async function effettuaDowngrade(){     
                        await GuestModel.updateisHost(userId, false);
                        await HostModel.deleteHostDocument(userId);
                        setShowAlertDowngrade(false);
                        props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'HomeGuest',  params: { userId: userId }}],
                        }); //resetta lo stack quando si ritorna nella Home
                    }
                    effettuaDowngrade();   
                  }} />
            </View>
        );
    }
}

//Style 
const styles = StyleSheet.create({
    drawerContainer: {
      flex: 1,
    },
    drawerContent: {
        flex: 1,
    },
    userInfoSectionGuest: {
        flexDirection: 'column',
        borderBottomColor: '#b2c2bf',
        borderBottomWidth: 1,
        paddingBottom: 6,
      },
      avaterAndTxtContainerGuest: {
        alignItems: 'flex-start',
        marginTop: "1%",
        marginBottom: "1%",
        paddingLeft: "5%"
    },
        avaterAndTxtContainer: {
        alignItems: 'flex-start',
        marginTop: "1%",
        marginBottom: "1%",
        paddingLeft: "5%"
    },
    userInfoSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#b2c2bf',
        borderBottomWidth: 1,
        paddingBottom: "2%",
      },
    userInfo: {
        justifyContent: 'center',
        fontSize: 16,
        marginTop: 1,
        color: 'black',
        fontFamily: 'MontserrantSemiBold',
    },
    labelDrawerItemStyle: {
        fontSize: 14, 
        color: 'black',
        fontFamily: 'Montserrant',
        marginLeft: -10,
        width: "120%"
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
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
    },
    horizontalViewSwitchGuest:{
        flexDirection: 'column',
        marginLeft: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
    },
    labelSwitchTxt: {
        fontSize: 16,
        color: 'black',
        fontFamily: 'Montserrant',
    },
    switchStyle: {
        marginLeft: 2,
    }
});

