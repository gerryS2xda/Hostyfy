import React, { Component, useState } from 'react';
import CustomListViewGeneral from '../components/CustomListViewGeneral'
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

      const {user} = route.params;
      const [prenotazioneList, setPrenotazioneList] = useState([]);

      if(prenotazioneList.length == 0){
        //Dammi tutti i documenti presenti nella collection "prenotazioni"
        PrenotazioneModel.getPrenotazioniCollection().then((querySnapshot)=>{
          querySnapshot.forEach((doc)=>{
            prenotazioneList.push(doc);
            console.log("Test");
          });
          setPrenotazioneList(prenotazioneList);
        });
      }
      
     
      prenotazioneList.forEach((item, index)=>{
        console.log(item.data().email);
      });
      console.log("Length: " + prenotazioneList.length);
      console.log("Testing outer" + prenotazioneList.toString());

      return (
        <View style={styles.maincontainer}>
          <HeaderBar title="Le tue prenotazioni" navigator={navigation} /> 
          <ScrollView style={styles.bodyScrollcontainer}>
            <View style={styles.scrollContent}>
              <View style={styles.container}>
                {
                  prenotazioneList.map((item, key)=>(
                          <CustomListViewGeneral
                            nav = {navigation}
                            itemList={[
                              {
                                key: key+1, 
                                title: item.data().email,
                                description: "" + item.data().dataInizio + "-" + item.data().dataFine,
                                image_url: require('../../assets/Struttura/struttura1.jpg'), //alloggio image
                                newPage: 'PrenotazioneDetail',
                                data: item.data(),
                              }]}
                          />
                      )
                    )}
              </View>
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
                  <CustomButton
                      styleBtn={{width: "90%"}} 
                      nome="Storico prenotazioni" 
                      onPress={() => navigation.navigate('StoricoPrenotazioni', {user: user})} 
                    />
                </View>
          </View>      
    );
}

export default VisualizzaPrenotazioni