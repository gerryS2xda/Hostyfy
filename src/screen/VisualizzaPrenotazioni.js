import React, { Component, useState } from 'react';
import CustomListViewGeneral from '../components/CustomListViewGeneral'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Dialog from 'react-native-dialog';
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
    height:50
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

bottone : {
  borderWidth: 1,
  width:340,
  height:40,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius:8,
  backgroundColor: '#f2077d',
  marginBottom: 30,
  marginLeft: 35
},

maincontainer: {
  flex: 1,
  backgroundColor: '#fff',
},

});

const VisualizzaPrenotazioni = (props) => {  

      return (
        <View style={styles.maincontainer}>
        <HeaderBar title="Le tue prenotazioni" navigator={props.navigation} /> 
        <View style={styles.container}>
          <CustomListViewGeneral
            nav = {props.navigation}
            itemList={[
              {
                key: 1, 
                title: 'Alloggio 1',
                description: '12/11/2020 - 18/11/2020',
                image_url: require('../../assets/Struttura/struttura1.jpg'),
                newPage: 'PrenotazioneDetail',
              },
              {
                key: 2,
                title: 'Alloggio 2',
                description: '11/11/2020 - 17/11/2020',
                image_url: require('../../assets/Struttura/struttura2.jpg'),
                newPage: 'PrenotazioneDetail',  
              },
              {
                key: 3,
                title: 'Alloggio 3',
                description: '10/11/2020 - 16/11/2020',
                image_url: require('../../assets/Struttura/struttura3.jpg'),
                newPage: 'PrenotazioneDetail',
                
              },
              {
                key: 4,
                title: 'Alloggio 4',
                description: '10/11/2020 - 15/11/2020',
                image_url: require('../../assets/Struttura/struttura4.jpg'),
                newPage: 'PrenotazioneDetail', 
              }
            ]
          }/>

          


          <TouchableOpacity 
              style = {styles.bottone}
              onPress={() => props.navigation.navigate('StoricoPrenotazioni')}>
              <Text style={{color:'#ffffff'}}>Storico Prenotazioni</Text>
          </TouchableOpacity>
        
          
           
        


        
      </View>
</View>
      
      
    );
}

export default VisualizzaPrenotazioni