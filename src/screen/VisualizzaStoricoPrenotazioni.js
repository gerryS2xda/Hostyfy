import React, { Component, useState } from 'react';
import CustomListViewGeneral from '../components/CustomListViewGeneral'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ScrollView
} from 'react-native';
import HeaderBar from '../components/CustomHeaderBar'


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

const VisualizzaStoricoPrenotazioni = (props) => {  

      return (
        <View style={styles.maincontainer}>
        <HeaderBar title="Prenotazioni passate" navigator={props.navigation} /> 
        
          <View style={styles.container}>
            <CustomListViewGeneral
              nav = {props.navigation}
              itemList={[
                {
                  key: 1, 
                  title: 'Le Sirene',
                  description: '12/11/2019 - 18/11/2019',
                  image_url: require('../../assets/Struttura/struttura1.jpg'),
                  newPage: 'PrenotazioneDetail',
                },
                {
                  key: 2,
                  title: 'Exe Majestic',
                  description: '11/11/2019 - 17/11/2020',
                  image_url: require('../../assets/Struttura/struttura2.jpg'),
                  newPage: 'PrenotazioneDetail',  
                },
                {
                  key: 3,
                  title: 'Villa Domina',
                  description: '10/11/2019 - 16/11/2019',
                  image_url: require('../../assets/Struttura/struttura3.jpg'),
                  newPage: 'PrenotazioneDetail',
                  
                },
                {
                  key: 4,
                  title: 'Apartments Tudor',
                  description: '10/11/2020 - 15/11/2019',
                  image_url: require('../../assets/Struttura/struttura4.jpg'),
                  newPage: 'PrenotazioneDetail',
                  
                }              
              ]
            }/>

          </View>
      </View>

      
      
    );
}

export default VisualizzaStoricoPrenotazioni