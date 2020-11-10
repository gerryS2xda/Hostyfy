import React, { Component, useState } from 'react';
import CustomListViewGeneral from './CustomListViewGeneral'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Dialog from 'react-native-dialog';



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
  width:300,
  height:40,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius:8,
  backgroundColor: '#f2077d',
},

});

const LeMieChiavi = (props) => {  

      return (
      <View style={styles.container}>
        <View style = {styles.intestazione}>
          <Text style = {styles.title}>Le mie chiavi</Text>
        </View>
        <CustomListViewGeneral
          nav = {props.navigation}
          itemList={[
            {
              key: 1, 
              title: 'Chiave Alloggio 1',
              
              image_url: require('../../assets/Struttura/struttura1.jpg'),
              newPage: 'ChiaveScreen',
            },
            {
              key: 2,
              title: 'Chiave alloggio 2',
              image_url: require('../../assets/Struttura/struttura2.jpg'),
              newPage: 'ChiaveScreen',  
            },
            {
              key: 3,
              title: 'Chiave alloggio 3',
              image_url: require('../../assets/Struttura/struttura3.jpg'),
              newPage: 'ChiaveScreen',
              
            },
            {
              key: 4,
              title: 'Chiave alloggio 4',
              image_url: require('../../assets/Struttura/struttura4.jpg'),
              newPage: 'ChiaveScreen',
              
            }
            
          ]

   
        }/>


          <TouchableOpacity 
              style = {styles.bottone}
              onPress={() => props.navigation.navigate('VisualizzaStoricoPrenotazioni')}>
		
              <Text style={{color:'#ffffff'}}>Storico Prenotazioni</Text>
          </TouchableOpacity>
        
          
           
        


        
      </View>

      
      
    );
}

export default VisualizzaAlloggi