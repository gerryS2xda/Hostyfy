import React, {useState, useCallback} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import HeaderBar from '../components/CustomHeaderBar';
import CustomListViewNotification from '../components/CustomListViewNotification'
import CustomAlertGeneral from "../components/CustomAlertGeneral"
import * as NotificationModel from "../firebase/datamodel/NotificationModel"
import * as PrenotazioneModel from "../firebase/datamodel/PrenotazioneModel"
import * as AlloggioModel from "../firebase/datamodel/AlloggioModel"

//Style
const styles = StyleSheet.create({
 
    maincontainer: {
        flex: 1,
      },
      secondContainer: {
        flex: 1,
        backgroundColor: '#FCFCFC',
        borderWidth: 1,
        borderColor: '#d3d9e3',
      },
});

//Screen
const NotificationScreen = ({ route, navigation }) => {

    const {userId} = route.params;
    const [notiList, setNotificationList] = useState([]);
    const [showNoItem, setNoItemVisibility] = useState(false);
    const isFocused = useIsFocused();

    useFocusEffect(
      useCallback(() => {
        // Do something when the screen is focused
        async function getNotificationData(){
            var itemList = [];
            var count = 1;

            //Verifica se vi sono notifiche da cancellare in base alla data di fine della loro validità
            await NotificationModel.deleteNotificationDocumentScaduteByUserId(userId, new Date());

            var notiDocs = await NotificationModel.getNotificationDocumentByUserId(userId);
            if(notiDocs.length == 0){
                setNoItemVisibility(true);
                setNotificationList(itemList);
            }else{
                //Verifica se ci sono duplicati
                for(var i = 0; i < notiDocs.length; i++){
                    for(var j=i+1; j<notiDocs.length;j++){
                        if(notiDocs[i].data().prenId === notiDocs[j].data().prenId){ //vi è un duplicato
                            await NotificationModel.deleteNotificationDocument(notiDocs[j].id);
                            notiDocs.pop(j);
                        }
                    }
                };

                for(const doc of notiDocs){
                    var notification = doc.data(); //ottieni i dati di una notification

                    if(notification.categoria === "checkout"){
                        var iconName = require("../../assets/bell_black.png");
                        if(!notification.isRead){ //se vi è una notifica da leggere ed è nuova, cambia icona
                            iconName=require("../../assets/bell_badge_black.png");
                        }
                        var oggetto = {
                            key: count, 
                            title: notification.titolo, 
                            description: notification.descrizione,
                            iconName: iconName, //mostra icona nuova notifica se essa non è stata letta, altrimenti quella di default 
                            newPage: "CheckOut", //non viene usata questa proprietà, si è deciso di rimanere per sviluppi futuri
                            prenId: notification.prenId,
                            notificationId: doc.id,
                        }
                        count++;
                        itemList.push(oggetto);
                    }
                    if(notification.categoria === "alloggio"){
                        //prendi i dati della prenotazione per ottenere riferimento relativo alla pagina dell'alloggio
                        var iconName = require("../../assets/bell_black.png");
                        if(!notification.isRead){ //se vi è una notifica da leggere ed è nuova, cambia icona
                            iconName=require("../../assets/bell_badge_black.png");
                        }
                        var oggetto = {
                            key: count, 
                            title: notification.titolo, 
                            description: notification.descrizione,
                            iconName: iconName, //mostra icona nuova notifica se essa non è stata letta, altrimenti quella di default 
                            newPage: "VisualizzaAlloggi", //non viene usata questa proprietà, si è deciso di rimanere per sviluppi futuri
                            prenId: notification.prenId,
                            notificationId: doc.id,
                        }
                        count++;
                        itemList.push(oggetto);
                    }
                }
                setNotificationList(itemList);
            }
          }
          getNotificationData();
        return () => {
          // Do something when the screen is unfocused
          // Useful for cleanup functions
        };
      }, [isFocused])
    );

    return(
        <View style={styles.maincontainer}>
            <HeaderBar title="Notifiche" navigator={navigation} /> 
            {!showNoItem && (
                <View style={styles.secondContainer}> 
                <CustomListViewNotification 
                    nav= {navigation}
                    userId = {userId}
                    itemList = {notiList}
                />
            </View>
            )}
            {showNoItem && (
                <CustomAlertGeneral
                visibility={showNoItem}
                titolo="Notifiche"
                testo= "Nessuna notifica da leggere!"
                hideNegativeBtn={true}
                buttonName="Ok"
                onOkPress={()=>{ 
                    setNoItemVisibility(false);    
                    navigation.goBack();
                }} />
            )}
        </View> 
    );
}

export default NotificationScreen;
