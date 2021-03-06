import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import CustomListViewGeneralPrenotazione from '../components/CustomListViewGeneralPrenotazione'
import {
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';
import * as PrenotazioneModel from "../firebase/datamodel/PrenotazioneModel"
import * as AlloggioModel from "../firebase/datamodel/AlloggioModel"
import CustomAlertGeneral from "../components/CustomAlertGeneral"

//Style
const styles = StyleSheet.create({
  maincontainer: {
		flex: 1,
		backgroundColor: '#fff',
	},
  container: {
    flex: 1,
  },

  aggiungiStruttura:{
    flexDirection: "column-reverse",
    alignItems: 'flex-end',
    marginBottom: "5%",
    marginRight: "3%",
  },

  buttonContainer: {
    width: "100%", 
    alignItems: "center",
    justifyContent: 'center',
    marginTop: "5%",
    marginBottom: "5%",
  }

});

const VisualizzaPrenotazioni = ({route, navigation}) => {  

      const {user,isHost} = route.params; 
      const [list, setList] = useState([]);
      const [noResultVisibility, setNoResultVisibility] = useState(true);
      const [showAlertNoResult, setShowAlertNoResult] = useState(false);
      const isFocused = useIsFocused();

      useFocusEffect(
        React.useCallback(() => {
          // Do something when the screen is focused
          async function getData(){
            if(isHost){
              var dataOdierna = new Date(); 
              let docs = await PrenotazioneModel.getPrenotazioniAttualiHostQuery(user.userIdRef, dataOdierna); //NOTA: per guest usare 'user.userId'
              var itemList = [];
              var count = 1;
              if(docs.length == 0){
                setList(itemList);
                setShowAlertNoResult(true);
              }
              else{
              for(const doc of docs){
                var prenotazione = doc.data();
                var prenotazioneId = doc.id;
                var dataInizio = new Date(prenotazione.dataInizio.seconds * 1000).toLocaleString("it-IT").split(",")[0];
                var dataFine = new Date(prenotazione.dataFine.seconds * 1000).toLocaleString("it-IT").split(",")[0];
                let alloggio = await AlloggioModel.getAlloggioByStrutturaRef(prenotazione.strutturaRef, prenotazione.alloggioRef);
                //Prendi la prima foto presente per l'alloggio e salva nello state
                var fotoArray = Object.values(alloggio.fotoList); //restituisce gli URL delle foto in un array JS                         
                var imageURL = "";
                if(fotoArray.length == 0){
                    imageURL = require("../../assets/imagenotfound.png");
                }else{
                    imageURL = {uri: fotoArray[0]};
                }
                var oggetto = {
                  key: count, 
                  title: alloggio.nomeAlloggio,
                  description: "" + dataInizio + " - " + dataFine,
                  image_url: imageURL, //alloggio image
                  newPage: 'PrenotazioneDetail',
                  id: prenotazioneId,
                }
                itemList.push(oggetto)              
                count++;
                    
                }
                setList(itemList);
                setNoResultVisibility(false);
              }                        
            } else {
              var dataOdierna = new Date(); 
              let docs = await PrenotazioneModel.getPrenotazioniAttualiGuestQuery(user.userId, dataOdierna); //NOTA: per guest usare 'user.userId'
              var itemList = [];
              var count = 1;
              if(docs.length==0){
                setList(itemList);
                setShowAlertNoResult(true);
              }
              else{
              for(const doc of docs){
                var prenotazione = doc.data();
                var prenotazioneId = doc.id;
                var dataInizio = new Date(prenotazione.dataInizio.seconds * 1000).toLocaleString("it-IT").split(",")[0];
                var dataFine = new Date(prenotazione.dataFine.seconds * 1000).toLocaleString("it-IT").split(",")[0];
                let alloggio = await AlloggioModel.getAlloggioByStrutturaRef(prenotazione.strutturaRef, prenotazione.alloggioRef);
                //Prendi la prima foto presente per l'alloggio e salva nello state
                var fotoArray = Object.values(alloggio.fotoList); //restituisce gli URL delle foto in un array JS                         
                var imageURL = "";
                if(fotoArray.length == 0){
                    imageURL = require("../../assets/imagenotfound.png");
                }else{
                    imageURL = {uri: fotoArray[0]};
                }
                var oggetto = {
                  key: count, 
                  title: alloggio.nomeAlloggio,
                  description: "" + dataInizio + " - " + dataFine,
                  image_url: imageURL, //alloggio image
                  newPage: 'PrenotazioneDetail',
                  id: prenotazioneId,
                }
                itemList.push(oggetto)              
                count++;
                    
                }
                setList(itemList);
                setNoResultVisibility(false);
            }
           }
          }
          if(!noResultVisibility)  //resetta lo stato relativo ai risultati da mostrare
            setNoResultVisibility(true);
          getData();
          return () => {
            // Do something when the screen is unfocused
            // Useful for cleanup functions
          };
        }, [isFocused])
      );
    
      return (
        <View style={styles.maincontainer}>
          <HeaderBar title="Prenotazioni" navigator={navigation} /> 
          <View style={styles.container}>
            {!noResultVisibility && (
              <View style={styles.container}>
                <CustomListViewGeneralPrenotazione
                    nav = {navigation}
                    itemList={list}
                    user = {user}
                    isHost = {isHost}
                  />
                <View style={styles.buttonContainer}>
                  <CustomButton
                      styleBtn={{width: "90%", borderRadius: 20}} 
                      nome="Storico prenotazioni" 
                      onPress={() => {
                          navigation.navigate("StoricoPrenotazioni", {user:user,isHost:isHost});
                        }
                      }
                    />
                </View>
              </View>
            )}
          </View>
          <CustomAlertGeneral
              visibility={showAlertNoResult}
              titolo="Prenotazioni"
              testo= "Nessuna prenotazione da mostrare! Desidera visualizzare lo storico delle prenotazioni?"
              annullaBtnName="Home"
              onAnnullaBtn={()=>{
                setShowAlertNoResult(false);
                if(isHost){
                  navigation.reset({
                      index: 0,
                      routes: [{ name: 'HomeHost',  params: { userId: user.userId }}],
                  }); //resetta lo stack quando si ritorna nella Home
                }else{
                  navigation.reset({
                      index: 0,
                      routes: [{ name: 'HomeGuest',  params: { userId: user.userId }}],
                  }); //resetta lo stack quando si ritorna nella Home
                }
              }}
              buttonName="Storico"
              onOkPress={()=>{ 
                setShowAlertNoResult(false);
                navigation.navigate("StoricoPrenotazioni", {user:user,isHost:isHost});
              }} />
      </View>      
    );
}

export default VisualizzaPrenotazioni;

