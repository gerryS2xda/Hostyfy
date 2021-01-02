import React, { useState, useCallback } from 'react';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import HeaderBar from '../components/CustomHeaderBar'
import * as AlloggioModel from "../firebase/datamodel/AlloggioModel"

const ChiaveScreen = ({route, navigation}) =>{
    const {user, strutturaId, alloggioId} = route.params;
    const [alloggio, setAlloggio] = useState({});
    const [chiave, setChiave] = useState({});
    const isFocused = useIsFocused();
  
    useFocusEffect(
        useCallback(() => {
        // Do something when the screen is focused
        // Ottieni info dell'utente da DB usando lo userId
            async function getAlloggioAndChiaveData(){

                //Attendi finche' non ottieni dati di un alloggio
                var alloggioDoc = await AlloggioModel.getAlloggioByStrutturaRef(strutturaId, alloggioId);
                setAlloggio(alloggioDoc); //Memorizza i dati dell'alloggio nello state

                //Attendi finche' non si ottiene l'Id di una chiave attiva per aprire alloggio
                var chiaviDoc = await AlloggioModel.getChiaviCollectionOfAlloggio(strutturaId, alloggioId);
                var chiaveId = "";
                for(const chiaveDoc of chiaviDoc){
                    var chiave = chiaveDoc.data();
                    if(chiave.isActive){
                        chiaveId = chiaveDoc.id;
                        setChiave({id: chiaveId, ...chiave});
                        break;
                    }
                }
                
            }
            getAlloggioAndChiaveData();
        return () => {
            // Do something when the screen is unfocused
            // Useful for cleanup functions
        };
        }, [isFocused])
    );

    const setNavigationScreenAfterPressKey = async () =>{
        if(chiave.isFirstAccess){
            //Attendi finche' non viene aggiornato lo stato della chiave relativo al primo access
            await AlloggioModel.updateFirstAccessChiaveDocument(strutturaId, alloggioId, chiave.id, false);
            navigation.navigate("MoviePlayer");
        }else{
            navigation.navigate("InfoCamera");
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
