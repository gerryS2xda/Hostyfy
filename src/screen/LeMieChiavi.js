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
    borderColor: '#d3d9e3',
    marginTop: 40
  },

  intestazione:{
    marginTop: 10,
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
  marginBottom: 125,
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
  width:300,
  height:40,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius:8,
  backgroundColor: '#f2077d',
},
maincontainer: {
  flex: 1,
  backgroundColor: '#fff',
},

});

const LeMieChiavi = (props) => {  

      return (
    <View style={styles.maincontainer}>
      <HeaderBar title="Le tue chiavi attive" navigator={props.navigation} /> 
      <View style={styles.container}>
        <View style = {styles.intestazione}>
        </View>
        <CustomListViewGeneral
          nav = {props.navigation}
          itemList={[
            {
              key: 1, 
              title: 'Chiave Alloggio 1',
              description: 'Struttura: Le Sirene',
              image_url: require('../../assets/Struttura/struttura1.jpg'),
              newPage: 'LaMiaChiave',
            },
            {
              key: 2,
              title: 'Chiave alloggio 2',
              image_url: require('../../assets/Struttura/struttura2.jpg'),
              newPage: 'LaMiaChiave',  
              description: 'Struttura: Exe Majestic',
            },
            {
              key: 3,
              title: 'Chiave alloggio 3',
              image_url: require('../../assets/Struttura/struttura3.jpg'),
              newPage: 'LaMiaChiave',
              description: 'Struttura: Villa Domina'
              
            },
            {
              key: 4,
              title: 'Chiave alloggio 4',
              image_url: require('../../assets/Struttura/struttura4.jpg'),
              newPage: 'LaMiaChiave',
              description: 'Struttura: Apartments Tudor'
              
            }
            
          ]

   
        }/>

      </View>
    </View>

      
      
    );
}

export default LeMieChiavi