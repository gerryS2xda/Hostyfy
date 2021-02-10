import React, { useState, useCallback } from 'react';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Image, TouchableOpacity, Alert, Text } from 'react-native';
import HeaderBar from '../components/CustomHeaderBar'
import * as AlloggioModel from "../firebase/datamodel/AlloggioModel"
import * as PrenotazioneModel from "../firebase/datamodel/PrenotazioneModel"
import CustomButton from "../components/CustomButton"
import CustomAlertGeneral from "../components/CustomAlertGeneral"

const ChiaveScreen = ({ route, navigation }) => {
    const { user, strutturaId, alloggioId, prenotazioneId } = route.params;
    const [alloggio, setAlloggio] = useState({});
    const [doneCheckIn, setDoneCheckIn] = useState(false);
    const [showCustomAlert, setCustomAlertVisibility] = useState(false);
    const isFocused = useIsFocused();
   
    useFocusEffect(
        useCallback(() => {
            // Do something when the screen is focused
            // Ottieni info dell'utente da DB usando lo userId
            async function getAlloggioAndPrenotazioneData() {

                //Attendi finche' non ottieni dati di un alloggio
                var alloggioDoc = await AlloggioModel.getAlloggioByStrutturaRef(strutturaId, alloggioId);
                setAlloggio(alloggioDoc); //Memorizza i dati dell'alloggio nello state

                if (prenotazioneId !== "") {
                    //Attendi finche' non ottieni le informazioni relative a 'doneCheckIn' da una prenotazione
                    var prenotazioneDoc = await PrenotazioneModel.getPrenotazioneById(prenotazioneId);
                    setDoneCheckIn(prenotazioneDoc.doneCheckIn);
                }
            }
            getAlloggioAndPrenotazioneData();
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [isFocused])
    );

    return (
        <View style={styles.maincontainer}>
            <HeaderBar title="Chiave" navigator={navigation} />
            <View style={styles.bodyViewContent}>
                <View>
                    <Text style = {styles.titolo}>{alloggio.nomeAlloggio}</Text>
                </View>
                <View style={styles.buttonKeyContainer}>
                    <CustomButton
                        styleBtn={styles.buttonStyle}
                        styleTesto={{fontSize: 30, color: "#303a52", fontFamily: "MontserrantBold" }}
                        nome={"Apri"}
                        onPress={() => setCustomAlertVisibility(true)} />
                    <CustomAlertGeneral
                        visibility={showCustomAlert}
                        titolo="Ingresso alloggio"
                        testo= {"Benvenuto nella camera " + alloggio.nomeAlloggio}
                        hideNegativeBtn={true}
                        buttonName="Ok"
                        onOkPress={()=>{            
                            async function setNavigationScreenAfterPressKey () {
                                setCustomAlertVisibility(false);
                                if (!doneCheckIn && prenotazioneId !== "") {
                                    //Attendi finche' non viene aggiornato lo stato di doneCheckIn per indicare che e' stato fatto il primo accesso all'alloggio
                                    await PrenotazioneModel.updateCheckInStatusPrenotazione(prenotazioneId, true);
                                    navigation.navigate("MoviePlayer", {user: user, uriVideo: alloggio.pathvideo});
                                } //else{navigation.navigate("InfoCamera");} //rimosso nella versione base
                            }  
                            setNavigationScreenAfterPressKey();
                    }} />
                </View>
            </View>
        </View>
    );
}

export default ChiaveScreen;

//STYLE
const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bodyViewContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonKeyContainer: {
        flex: 1, //rimuovi per elimare spazio extra tra ID text e il pulsante
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle:{
        width: 220, 
        height: 220,
        borderRadius: 300, 
        borderColor: "#0692d4", 
        backgroundColor: "#e4eded", 
        borderWidth:3,
        shadowColor: "#003780",
        shadowOffset: {
            width: 10,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 80,
        marginBottom: "10%"
    },
    titolo:
    {
        fontFamily: "MontserrantSemiBold",
        fontSize: 25,
        color: "#303a52",
        marginTop: "8%",
        marginLeft: "10%",
        marginRight: "10%",
        textAlign: "center",
    }
    
});
