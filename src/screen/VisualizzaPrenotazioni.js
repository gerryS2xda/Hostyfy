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

const VisualizzaPrenotazioni = ({route, navigation}) => {  

      const {user,isHost} = route.params; 
      console.log(isHost)
      const [list, setList] = useState([]);
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
              if(docs.length==0){
                console.log("loop");
                setList(itemList);
              }
              else{
                console.log("Ciao");
              for(const doc of docs){
                var prenotazione = doc.data();
                var prenotazioneId = doc.id;
                var dataInizio = new Date(prenotazione.dataInizio.seconds * 1000).toLocaleString("it-IT").split(",")[0];
                var dataFine = new Date(prenotazione.dataFine.seconds * 1000).toLocaleString("it-IT").split(",")[0];
                console.log(prenotazione)
                let alloggio = await AlloggioModel.getAlloggioByStrutturaRef(prenotazione.strutturaRef, prenotazione.alloggioRef);
                var oggetto = {
                  key: count, 
                  title: alloggio.nomeAlloggio,
                  description: "" + dataInizio + " - " + dataFine,
                  image_url: require('../../assets/Struttura/struttura1.jpg'), //alloggio image
                  newPage: 'PrenotazioneDetail',
                  id: prenotazioneId,
                }
                itemList.push(oggetto)              
                count++;
                    
                }
                console.log(itemList)
                setList(itemList);
              }                        
            } else {
              var dataOdierna = new Date(); 
              let docs = await PrenotazioneModel.getPrenotazioniAttualiGuestQuery(user.userId, dataOdierna); //NOTA: per guest usare 'user.userId'
              var itemList = [];
              var count = 1;
              if(docs.length==0){
                console.log("loop");
                setList(itemList);
              }
              else{
                console.log("Ciao");
              for(const doc of docs){
                var prenotazione = doc.data();
                var prenotazioneId = doc.id;
                var dataInizio = new Date(prenotazione.dataInizio.seconds * 1000).toLocaleString("it-IT").split(",")[0];
                var dataFine = new Date(prenotazione.dataFine.seconds * 1000).toLocaleString("it-IT").split(",")[0];
                console.log(prenotazione)
                let alloggio = await AlloggioModel.getAlloggioByStrutturaRef(prenotazione.strutturaRef, prenotazione.alloggioRef);
                var oggetto = {
                  key: count, 
                  title: alloggio.nomeAlloggio,
                  description: "" + dataInizio + " - " + dataFine,
                  image_url: require('../../assets/Struttura/struttura1.jpg'), //alloggio image
                  newPage: 'PrenotazioneDetail',
                  id: prenotazioneId,
                }
                itemList.push(oggetto)              
                count++;
                    
                }
                console.log(itemList)
                setList(itemList);
            }
          }
        }
          getData();
          return () => {
            // Do something when the screen is unfocused
            // Useful for cleanup functions
          };
        }, [isFocused])
      );
    
      console.log("lista2: " +list);
      return (
        <View style={styles.maincontainer}>
          <HeaderBar title="Le tue prenotazioni" navigator={navigation} /> 
          <View style={styles.container}>
                <CustomListViewGeneralPrenotazione
                    nav = {navigation}
                    itemList={list}
                    user = {user}
                  />
                <View style={styles.buttonContainer}>
                  <CustomButton
                      styleBtn={{width: "90%"}} 
                      nome="Storico prenotazioni" 
                      onPress={() => {
                          navigation.navigate("StoricoPrenotazioni", {user:user});
                        }
                      }
                    />
              </View>
          </View>
      </View>      
    );
}

export default VisualizzaPrenotazioni;

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

