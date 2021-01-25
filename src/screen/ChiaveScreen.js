import React, { useState, useCallback } from 'react';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import HeaderBar from '../components/CustomHeaderBar'
import * as AlloggioModel from "../firebase/datamodel/AlloggioModel"
import * as PrenotazioneModel from "../firebase/datamodel/PrenotazioneModel"

const ChiaveScreen = ({route, navigation}) =>{
    const {user, strutturaId, alloggioId, prenotazioneId} = route.params;
    const [alloggio, setAlloggio] = useState({});
    const [doneCheckIn, setDoneCheckIn] = useState(false);
    const isFocused = useIsFocused();
  
    useFocusEffect(
        useCallback(() => {
        // Do something when the screen is focused
        // Ottieni info dell'utente da DB usando lo userId
            async function getAlloggioAndPrenotazioneData(){

                //Attendi finche' non ottieni dati di un alloggio
                var alloggioDoc = await AlloggioModel.getAlloggioByStrutturaRef(strutturaId, alloggioId);
                setAlloggio(alloggioDoc); //Memorizza i dati dell'alloggio nello state

                if(prenotazioneId !== ""){
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

    const setNavigationScreenAfterPressKey = async () =>{
        if(!doneCheckIn && prenotazioneId !== ""){
            //Attendi finche' non viene aggiornato lo stato di doneCheckIn per indicare che e' stato fatto il primo accesso all'alloggio
            await PrenotazioneModel.updateCheckInStatusPrenotazione(prenotazioneId,true);
            navigation.navigate("MoviePlayer");
        }else{
            //navigation.navigate("InfoCamera");
        }
    }

    const createTwoButtonAlert = () =>
    Alert.alert(
      "Ingresso alloggio",
      "Benvenuto nella camera " + JSON.stringify(alloggio.nomeAlloggio),
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () =>{ setNavigationScreenAfterPressKey()}
        }
      ],
      { cancelable: false }
    );


    return(
        <View style={styles.maincontainer}>
            <HeaderBar title="La mia chiave" navigator={navigation} />
            <View style={styles.bodyViewContent}>
                <View style={styles.buttonKeyContainer}>
                    <TouchableOpacity onPress={createTwoButtonAlert} >
                        <Image style={styles.keyImage} source={require("../../assets/electronicKeyHotel.png")}/>
                    </TouchableOpacity>
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
        marginTop: 16,
        marginBottom: 16,
    },
    keyImageIDcontainer: {
        marginTop:32,
        marginBottom: 16,
    },
    keyImage: {
        width: 250,
        height: 250,
    },
    idkeyText: {
        fontSize: 16,
        color: "black",
        textAlign: "center",
        marginTop: 8
    },
    buttonKeyContainer:{
        flex: 1, //rimuovi per elimare spazio extra tra ID text e il pulsante
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
        marginBottom: 24,
    },
    bottoneStyle : {
        borderWidth: 1,
        width: 120,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:8,
        backgroundColor: '#f2077d',
    },
});
