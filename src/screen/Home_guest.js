import React, { useState, useCallback } from 'react'
import { View, Text, StyleSheet, Alert, Image } from 'react-native'
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import HeaderBar from '../components/CustomHeaderBar'
import ButtonMenu from "../components/ButtonMenu";
import CustomAlertGeneral from "../components/CustomAlertGeneral"
import { firebase } from '../firebase/config'
import * as GuestModel from "../firebase/datamodel/GuestModel"
import * as HostModel from "../firebase/datamodel/HostModel"
import * as PrenotazioneModel from "../firebase/datamodel/PrenotazioneModel"
import * as AlloggioModel from "../firebase/datamodel/AlloggioModel"
import * as NotificationModel from "../firebase/datamodel/NotificationModel"

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: "#fffefc",
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: "#000000"
  },
  container: {
    flex: 1,
    width: "100%",
    flexDirection: 'column',
    marginRight: "3%",
    marginLeft: "3%",
    //backgroundColor: "#000000"
  },

  firstContainer: {
    height: "28%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: '4%',
    paddingLeft: "4%",
    paddingBottom: "2%",
    //backgroundColor: "#000000",
    paddingTop: "4%",
  },

  secondContainer: {
    height: "28%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: '4%',
    paddingLeft: "4%",
    //backgroundColor: "#034000",
    paddingTop: "2%",
    paddingBottom: "4%"
    
  },

  topcontainer:{
    flex:1,
    justifyContent: 'flex-end',
    //marginBottom: "5%",
    //backgroundColor: "#000000"
  },

  image:{
    marginLeft: "7%",
    width: "80%",
    height: "40%",

  },
})

const HomeGuest = ({ route, navigation }) => {

  const { userId } = route.params;
  const [user, setUser] = useState({});
  const [checkOut, setCheckOutInfo] = useState({});
  const [showAlertCheckOut, setAlertCheckOutVisibility] = useState(false);
  const isFocused = useIsFocused();

  
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      // Ottieni info dell'utente da DB usando lo userId
      async function getUserData() {
        var guestDoc = await GuestModel.getGuestDocument(userId);
        var creditcardDoc = await GuestModel.getGuestCreditCardDocument(userId);
        if (guestDoc.isHost) { //verifica se guest e' anche un host
          var hostDoc = await HostModel.getHostDocument(userId);
          setUser({ ...guestDoc, ...creditcardDoc, ...hostDoc });
        } else {
          setUser({ ...guestDoc, ...creditcardDoc });
        }
      }
      //Verifica se vi sono prenotazioni in scadenza (un'ora associato a data fine), mostra un Alert e crea notifica
      async function verifyCheckOut(){
        //Ottieni le prenotazioni in scandenza di quell'ospite
        var dataOdierna = new Date();
        var prenotazioniDocs = await PrenotazioneModel.getPrenotazioniForCheckOut(userId, dataOdierna);
        for(const pren of prenotazioniDocs){
          var prenotazione = pren.data();
          if(prenotazione.doneCheckOut) //verifica se il checkout di quella prenotazione è stato già eseguito
            continue;

          var dataFinepren = prenotazione.dataFine.toDate(); //Convert timestamp JS in Date object 
          if(dataOdierna.toLocaleDateString() !== dataFinepren.toLocaleDateString()) //considera solo le prenotazioni della data odierna
            continue;

          //A partire dalla prenotazione trovata, ottieni i dati dell'alloggio 
          var alloggioDoc = await AlloggioModel.getAlloggioByStrutturaRef(prenotazione.strutturaRef, prenotazione.alloggioRef);

          //Verifica se la prenotazione e' in scadenza (un'ora prima)
          var oraAttuale = dataOdierna.getHours(); 
          var oraFinePren = dataFinepren.getHours(); 
          if((oraAttuale+1) == oraFinePren){ //se manca un'ora alla fine della prenotazione
            
            //Crea notifica per checkout, prima verifica che non sia stata già creata
            var notificationDocs = await NotificationModel.getNotificationDocumentByUserId(userId);
            if(notificationDocs.length == 0){ //se non vi sono notifiche
              await NotificationModel.createNotificationDocument("checkout", dataOdierna, "Check-out \"" + alloggioDoc.nomeAlloggio+"\"", 
              "Alle ore " + oraFinePren + " del \""+ dataOdierna.toLocaleDateString('it-IT') + "\" sarà eseguito il check-out...", userId, pren.id);
            }else{
              for(const noti of notificationDocs){
                var notifica = noti.data();
                if(notifica.prenId !== pren.id){ //non è presente una notifica associata alla prenotazione in scadenza -> aggiungila
                  await NotificationModel.createNotificationDocument("checkout", dataOdierna, "Check-out \"" + alloggioDoc.nomeAlloggio+"\"", 
                    "Alle ore " + oraFinePren + " del \""+ dataOdierna.toLocaleDateString('it-IT') + "\" sarà eseguito il check-out...", userId, pren.id);
                }
              }
            }

            //mostra Alert e salva check-out info
            setCheckOutInfo({prenId: pren.id, ora: oraFinePren, alloggioName: alloggioDoc.nomeAlloggio});
            setAlertCheckOutVisibility(true);
          }
        }
      }
      getUserData();
      verifyCheckOut();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [isFocused])
  );

  return (
    <View style={styles.maincontainer}>
      <HeaderBar title="Home" navigator={navigation} />
      <View style={styles.container}>
          <View style = {styles.topcontainer}>
          <Image 
              source = {require("../../assets/Varie/Homepage.jpg")}
              style = {styles.image}/>
            <View style={styles.firstContainer}>
              <ButtonMenu styleBtn={{ width: "47%", height: "100%" }} nameIcon={"pencil"} nome='Modifica Profilo' onPress={() => navigation.navigate("ModificaProfilo", { user: user })} />
              <ButtonMenu styleBtn={{ width: "47%", height: "100%" }} nameIcon={"briefcase"} nome='Prenotazioni' onPress={() => navigation.navigate("VisualizzaPrenotazioni", { user: user, isHost: false })} />
            </View>

            <View style={styles.secondContainer}>
              <ButtonMenu styleBtn={{ width: "47%", height: "100%" }} nameIcon={"emoticon-happy-outline"} nome='Recensioni' onPress={()=>navigation.navigate("RecensioniGuestScreen", {user: user})} />
              <ButtonMenu styleBtn={{ width: "47%", height: "100%" }} nameIcon={"logout"}nome="Logout" onPress={() => {
                firebase.auth().signOut().then(function () {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                  }); // Sign-out successful.
                }).catch(function (error) { // An error happened.
                  console.log("Error Sign-out in HomeGuest.js: " + error);
                });
              }} />
            </View>
            </View>
            {
              showAlertCheckOut && (
                <CustomAlertGeneral
                  visibility={showAlertCheckOut}
                  setVisibility={setAlertCheckOutVisibility}
                  titolo="Check-out"
                  testo= {"Alle ore " + checkOut.ora + " della data odierna sarà eseguito il check-out per l'alloggio \""+ checkOut.alloggioName + 
                  "\"! Si invita l'ospite a procede con il check-out!"}
                  hideNegativeBtn={true}
                  buttonName="Procedi"
                  onOkPress={()=>{ 
                      setAlertCheckOutVisibility(false);    
                      navigation.navigate("CheckOut", {userId: userId, prenotazioneId: checkOut.prenId})
                  }} />
              )
            }
      </View>
    </View>
    
  );
}

export default HomeGuest