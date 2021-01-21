import React, { Component, useState, useEffect } from 'react';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ScrollView
} from 'react-native';
import HeaderBar from '../components/CustomHeaderBar'
import CustomListViewGeneralPrenotazione from '../components/CustomListViewGeneralPrenotazione';
import * as PrenotazioneModel from "../firebase/datamodel/PrenotazioneModel"
import * as AlloggioModel from "../firebase/datamodel/AlloggioModel"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    borderWidth: 1,
    borderRadius: 20, 
    borderColor: '#d3d9e3',
  },

  intestazione:{
    marginTop: 100,
    marginBottom: -60
  },

  title:
  {
    fontSize: 25,
    marginLeft: 20,
  },

  image:{
    width: 50,
    height:50,
  },

aggiungiStruttura:{
  marginLeft: 320,
  marginBottom: 55
},


containerExtra: {
  flex: 0,
  flexDirection: 'row',
  padding: 10,
  marginLeft:16,
  marginRight:16,
  marginTop: 8,
  marginBottom: 125,
  borderRadius: 5,
  backgroundColor: '#FFF',
  elevation: 2,
},
titleExtra: {
  fontSize: 16,
  color: '#000',
},
container_textExtra: {
  flex: 1,
  flexDirection: 'column',
  marginLeft: 12,
  justifyContent: 'center',
},
descriptionExtra: {
  fontSize: 11,
  fontStyle: 'italic',
},
photoExtra: {
  height: 50,
  width: 50,
},
arrowExtra: {
  marginLeft: 250,
  marginTop: -35
},

maincontainer: {
  flex: 1,
  backgroundColor: '#fff',
},
});

const VisualizzaStoricoPrenotazioni = ({route, navigation}) => {  
      const {user, isHost} = route.params; 
      const [list, setList] = useState([]);
      const isFocused = useIsFocused();

      useFocusEffect(
        React.useCallback(() => {
          // Do something when the screen is focused
          async function getStoricoPrenotazioni(){
            if(isHost){
              var dataOdierna = new Date();
              let docs = await PrenotazioneModel.getPrenotazioniHostQuery(user.userIdRef, dataOdierna);
              var itemList = [];
              var count = 1;
              if(docs.lenght==0){
                setList(itemList)
              }
              for(const doc of docs){
                var prenotazione = doc.data();
                var prenotazioneId = doc.id;
                var dataInizio = new Date(prenotazione.dataInizio.seconds * 1000).toLocaleString("it-IT").split(",")[0];
                var dataFine = new Date(prenotazione.dataFine.seconds * 1000).toLocaleString("it-IT").split(",")[0];
                let alloggio = await AlloggioModel.getAlloggioByStrutturaRef(prenotazione.strutturaRef, prenotazione.alloggioRef);
                var oggetto = {
                    key: count, 
                    title: alloggio.nomeAlloggio,
                    description: "" + dataInizio + " - " + dataFine,
                    image_url: require('../../assets/Struttura/struttura1.jpg'), //alloggio image
                    newPage: 'PrenotazioneDetail',
                    id: prenotazioneId,
                }
                itemList.push(oggetto);
                count++;
              };
              setList(itemList)
            } else {
              var dataOdierna = new Date();
              let docs = await PrenotazioneModel.getPrenotazioniGuestQuery(user.userId, dataOdierna);
              var itemList = [];
              var count = 1;
              if(docs.lenght==0){
                setList(itemList)
              }
              for(const doc of docs){
                var prenotazione = doc.data();
                var prenotazioneId = doc.id;
                var dataInizio = new Date(prenotazione.dataInizio.seconds * 1000).toLocaleString("it-IT").split(",")[0];
                var dataFine = new Date(prenotazione.dataFine.seconds * 1000).toLocaleString("it-IT").split(",")[0];
                let alloggio = await AlloggioModel.getAlloggioByStrutturaRef(prenotazione.strutturaRef, prenotazione.alloggioRef);
                var oggetto = {
                    key: count, 
                    title: alloggio.nomeAlloggio,
                    description: "" + dataInizio + "-" + dataFine,
                    image_url: require('../../assets/Struttura/struttura1.jpg'), //alloggio image
                    newPage: 'PrenotazioneDetail',
                    id: prenotazioneId,
                }
                itemList.push(oggetto);
                count++;
              };
              setList(itemList)
            }
          }
          getStoricoPrenotazioni();
          return () => {
            // Do something when the screen is unfocused
            // Useful for cleanup functions
          };
        }, [isFocused]))

      return (
        <View style={styles.maincontainer}>
        <HeaderBar title="Prenotazioni passate" navigator={navigation} /> 
        
          <View style={styles.container}>
            <CustomListViewGeneralPrenotazione
              nav = {navigation}
              itemList={list}
              user = {user}
            />
          </View>
      </View>

      
      
    );
}

export default VisualizzaStoricoPrenotazioni

