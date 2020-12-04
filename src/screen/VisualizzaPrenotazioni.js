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

      const {user, list} = route.params; 
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
                      onPress={() => navigation.navigate('StoricoPrenotazioni', {user: user})} 
                    />
                </View>
          </View>      
    );
}

export default VisualizzaPrenotazioni