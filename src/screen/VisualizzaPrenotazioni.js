import React, { useState, useEffect, useCallback } from 'react';
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
      const [list, setList] = useState([]);
       
      useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // Screen was focused -> Do something
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
                console.log(prenotazione)
                let alloggio = await AlloggioModel.getAlloggioByStrutturaRef(prenotazione.strutturaRef, prenotazione.alloggioRef);
                var oggetto = {
                  key: count, 
                  title: alloggio.nomeAlloggio,
                  description: "" + prenotazione.dataInizio + "-" + prenotazione.dataFine,
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
    
            }
          }
          getData();
        });
    
        return unsubscribe;
      }, [navigation]);
    
      console.log("lista2: " +list);
      return (
        <View style={styles.maincontainer}>
          <HeaderBar title="Le tue prenotazioni" navigator={navigation} /> 
          <ScrollView style={styles.bodyScrollcontainer}>
            <View style={styles.scrollContent}>
              <View style={styles.container}>
                  <CustomListViewGeneralPrenotazione
                    nav = {navigation}
                    itemList={list}
                />
              </View>
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
                  <CustomButton
                      styleBtn={{width: "90%"}} 
                      nome="Storico prenotazioni" 
                      onPress={() => {
                        getPrenotazioni(user, navigation, isHost).catch(function (err) { console.log("ERROR in VisualizzaPrenotazioni: " + err); });
                        }
                      }
                    />
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
	bodyScrollcontainer: {
		width: "100%",
	},

  container: {
    width: "100%",
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

//Async function for query
async function getPrenotazioni(user, navigation, isHost){
  if(isHost){
    var dataOdierna = new Date();
    let docs = await PrenotazioneModel.getPrenotazioniHostQuery(user.userIdRef, dataOdierna);
    var itemList = [];
    var count = 1;
    if(docs.size==0){
      navigation.navigate('StoricoPrenotazioni', {user: user, list: itemList});
    }
    for(const doc of docs){
      var prenotazione = doc.data();
      var prenotazioneId = doc.id;
      let alloggio = await AlloggioModel.getAlloggioByStrutturaRef(prenotazione.strutturaRef, prenotazione.alloggioRef);
      var oggetto = {
          key: count, 
          title: alloggio.nomeAlloggio,
          description: "" + prenotazione.dataInizio + "-" + prenotazione.dataFine,
          image_url: require('../../assets/Struttura/struttura1.jpg'), //alloggio image
          newPage: 'PrenotazioneDetail',
          id: prenotazioneId,
      }
      itemList.push(oggetto);
    };
    console.log(itemList);
    navigation.navigate('StoricoPrenotazioni', {user: user, list: itemList});
  } else {
    var dataOdierna = new Date();
    let docs = await PrenotazioneModel.getPrenotazioniGuestQuery(user.userId, dataOdierna);
    var itemList = [];
    var count = 1;
    if(docs.size==0){
      navigation.navigate('StoricoPrenotazioni', {user: user, list: itemList});
    }
    for(const doc of docs){
      var prenotazione = doc.data();
      var prenotazioneId = doc.id;
      let alloggio = await AlloggioModel.getAlloggioByStrutturaRef(prenotazione.strutturaRef, prenotazione.alloggioRef);
      var oggetto = {
          key: count, 
          title: alloggio.nomeAlloggio,
          description: "" + prenotazione.dataInizio + "-" + prenotazione.dataFine,
          image_url: require('../../assets/Struttura/struttura1.jpg'), //alloggio image
          newPage: 'PrenotazioneDetail',
          id: prenotazioneId,
      }
      itemList.push(oggetto);
    };
    console.log(itemList);
    navigation.navigate('StoricoPrenotazioni', {user: user, list: itemList});
  }
}

