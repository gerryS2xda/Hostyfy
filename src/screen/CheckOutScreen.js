import React, {useState, useCallback} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from "../components/CustomButton";
import CustomAlertGeneral from "../components/CustomAlertGeneral"
import * as PrenotazioneModel from "../firebase/datamodel/PrenotazioneModel"
import * as AlloggioModel from "../firebase/datamodel/AlloggioModel"
import * as NotificationModel from "../firebase/datamodel/NotificationModel"


const CheckOutScreen = ({route, navigation}) =>{
    const { userId, prenotazioneId } = route.params;
    const [checkOut, setCheckOutInfo] = useState({});
    const [showAlertCheckOut, setAlertCheckOutVisibility] = useState(false);

    const isFocused = useIsFocused();

    useFocusEffect(
      useCallback(() => {
        // Do something when the screen is focused
        // Ottieni dati necessari per effettuare il checkout di una prenotazione ricevuta in input
        async function getDataForCheckOut(){
            //Ottieni la prenotazione mediante id. Successivamente, i dati dell'alloggio
            var prenotazioneDoc = await PrenotazioneModel.getPrenotazioneById(prenotazioneId);
            var alloggioDoc = await AlloggioModel.getAlloggioByStrutturaRef(prenotazioneDoc.strutturaRef, prenotazioneDoc.alloggioRef);

            //Setta informazioni per check-out nello stato
            var dataFinepren = prenotazioneDoc.dataFine.toDate();
            var oraFinePren = dataFinepren.getHours();
            setCheckOutInfo({prenotazioneDoc: prenotazioneDoc, dataCheckOut: dataFinepren.toLocaleDateString('it-IT'), ora: oraFinePren, alloggioName: alloggioDoc.nomeAlloggio});

        }
        getDataForCheckOut();
        return () => {
          // Do something when the screen is unfocused
          // Useful for cleanup functions
        };
      }, [isFocused])
    );

    return(
        <View style={styles.maincontainer}>
            <HeaderBar title="Check-Out" navigator={navigation} /> 
            <ScrollView style={styles.bodyScrollcontainer}>
                <View style={styles.scrollContent}> 
                    <Text style={styles.categoryTxt}>Informazioni su check-out </Text>
                    <Text style={[styles.normalTxt, {marginLeft:0, marginBottom: 5}]}>Alle ore {checkOut.ora} del {checkOut.dataCheckOut} sarà eseguito il check-out per l'alloggio "{checkOut.alloggioName}":</Text>
                        <Text style={styles.normalTxt}>1. Sarà disabilitata automaticamente la chiave della camera; </Text>
                        <Text style={styles.normalTxt}>2. Sarà avvisato l'host che l'alloggio è di nuovo disponibile; </Text>
                        <Text style={styles.normalTxt}>3. I dispositivi intelligenti saranno spenti automaticamente; </Text>
                        <Text style={styles.normalTxt}>4. Sarà avviato il processo di sanificazione; </Text>
                        <Text style={styles.normalTxt}>5. Si invita l'ospite a scrivere una recensione. </Text>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                  <CustomButton
                      styleBtn={{width: "90%"}} 
                      nome="Completa procedura" 
                      onPress={() => {
                            async function effettuaCheckOut(){
                                //Setta doneCheckout flag a true in prenotazione per indicare che l'alloggio è libero
                                await PrenotazioneModel.updateCheckOutStatusPrenotazione(prenotazioneId, true);

                                //Rimuovi le notifiche associate a questo check-out
                                var notificationDocs = await NotificationModel.getNotificationDocumentByUserId(userId);
                                for(const noti of notificationDocs){
                                    if(noti.data().prenId === prenotazioneId)
                                        await NotificationModel.deleteNotificationDocument(noti.id);
                                }

                                setAlertCheckOutVisibility(true);
                            }
                            effettuaCheckOut();
                        }
                      }
                    />
            </View>
            {
              showAlertCheckOut && (
                <CustomAlertGeneral
                  visibility={showAlertCheckOut}
                  setVisibility={setAlertCheckOutVisibility}
                  titolo="Check-out"
                  testo= "Procedura completata! La ringraziamo per la sua ospitalità e desideriamo che lei rilasci una recensione."
                  annullaBtnName="Non ora"
                  onAnnullaBtn={()=>{
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'HomeGuest',  params: { userId: userId }}],
                    }); //resetta lo stack quando si ritorna nella Home
                  }}
                  buttonName="Recensione"
                  onOkPress={()=>{ 
                      setAlertCheckOutVisibility(false);    
                      navigation.navigate("InserisciRecensione", {userId: userId, prenotazione: checkOut.prenotazioneDoc});
                  }} />
              )
            }
        </View>
    );
}

export default CheckOutScreen;

const styles = StyleSheet.create({
    maincontainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    bodyScrollcontainer: {
      width: "100%",
    },
    scrollContent: {
        marginTop: 16,
        marginLeft:32,
        marginRight:24,
    },
    categoryTxt:{
        textAlign: "left",
        fontSize: 18,
        color: "black",
        marginTop: 16,
        marginBottom: 16,
        fontFamily: "MontserrantBold",
    },
    normalTxt: {
        fontSize: 16, 
        color: 'black',
        marginTop: 4,
        marginLeft: 6,
        fontFamily: "Montserrant",
    },
    buttonContainer: {
        width: "100%", 
        alignItems: "center",
        justifyContent: 'center',
        marginTop: "5%",
        marginBottom: "5%",
      }
});