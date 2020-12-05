import React, { Component, useState } from 'react';
import CustomListViewGeneralPrenotazione from '../components/CustomListViewGeneralPrenotazione'
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  Alert
} from 'react-native';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';
import * as PrenotazioneModel from "../firebase/datamodel/PrenotazioniModel" 
import {firebase} from '../firebase/config'

var db = firebase.firestore();

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

const VisualizzaPrenotazioni = ({route, navigation}) => {  

      const {user,isHost, list} = route.params; 
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
                        console.log(isHost)
                        if(isHost){
                            var dataOdierna = new Date(); 
                            db.collection('prenotazioni').where('hostRef','==',user.userIdRef).where('dataFine','<=',dataOdierna).get().then(async(querySnapshot)=>{
                                var itemList = [];
                                var count = 1;
                                if(querySnapshot.size==0){
                                  navigation.navigate('StoricoPrenotazioni', {user: user, list: itemList});
                                }
                                querySnapshot.forEach( (doc) =>{
                                    var prenotazione = doc.data();
                                    var prenotazioneId = doc.id;
                                    console.log(prenotazione)
                                    db.collection('struttura').doc(prenotazione.strutturaRef).collection('alloggi').doc(prenotazione.alloggioRef).get().then((doc1) =>{
                                        var alloggio = doc1.data();
                                        var oggetto = {
                                            key: count, 
                                            title: alloggio.nomeAlloggio,
                                            description: "" + prenotazione.dataInizio + "-" + prenotazione.dataFine,
                                            image_url: require('../../assets/Struttura/struttura1.jpg'), //alloggio image
                                            newPage: 'PrenotazioneDetail',
                                            id: prenotazioneId,
                                        }
                                        itemList.push(oggetto)
                                        if(count<querySnapshot.size){
                                            count++
                                        }
                                        else{
                                            console.log(itemList)
                                            navigation.navigate('StoricoPrenotazioni', {user: user, list: itemList});
                                        }
                                    })
                                })
                            })
                        } else{
                            var dataOdierna = new Date(); 
                            db.collection('prenotazioni').where('guestRef','==',user.userId).where('dataFine','<=',dataOdierna).get().then(async(querySnapshot)=>{
                                var itemList = [];
                                var count = 1;
                                if(querySnapshot.size==0){
                                  navigation.navigate('StoricoPrenotazioni', {user: user, list: itemList});
                                }
                                querySnapshot.forEach( (doc) =>{
                                    var prenotazione = doc.data();
                                    var prenotazioneId = doc.id;
                                    console.log(prenotazione)
                                    db.collection('struttura').doc(prenotazione.strutturaRef).collection('alloggi').doc(prenotazione.alloggioRef).get().then((doc1) =>{
                                        alloggio = doc1.data();
                                        var oggetto = {
                                            key: count, 
                                            title: alloggio.nomeAlloggio,
                                            description: "" + prenotazione.dataInizio + "-" + prenotazione.dataFine,
                                            image_url: require('../../assets/Struttura/struttura1.jpg'), //alloggio image
                                            newPage: 'PrenotazioneDetail',
                                            id: prenotazioneId,
                                        }
                                        itemList.push(oggetto)
                                        if(count<querySnapshot.size){
                                            count++
                                        }
                                        else{
                                            console.log(itemList)
                                            navigation.navigate('StoricoPrenotazioni', {user: user, list: itemList});
                                        }
                                    })
                                })
                            })
                        }}
                        }
                    />
                </View>
          </View>      
    );
}

export default VisualizzaPrenotazioni