import React, { Component, useState } from 'react';
import CustomListView from './CustomListView'
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

dialog:{
  
}
});

const VisualizzaAlloggi = (props) => {  

      return (
      <View style={styles.container}>
        <View style = {styles.intestazione}>
          <Text style = {styles.title}>Gli alloggi a dispo</Text>
        </View>
        <CustomListView
          nav= {props.navigation}
          itemList={[
            {
              key: 1, 
              title: 'Le Sirene',
              description: '"Fantastica"',
              image_url: require('../../assets/Struttura/struttura1.jpg'),
              newPage: 'VisualizzaStruttura',
              OTP: 'true'
            },
            {
              key: 2,
              title: 'Exe Majestic',
              description: '"Esperienza meravigliosa"',
              image_url: require('../../assets/Struttura/struttura2.jpg'),
              newPage: 'VisualizzaStruttura',
              OTP: 'false'
            },
            {
              key: 3,
              title: 'Villa Domina',
              description: '"Eccezionale"',
              image_url: require('../../assets/Struttura/struttura3.jpg'),
              newPage: 'VisualizzaStruttura',
              OTP: 'true'
            },
            {
              key: 4,
              title: 'Apartments Tudor',
              description: '"Eccellente"',
              image_url: require('../../assets/Struttura/struttura4.jpg'),
              newPage: 'VisualizzaStruttura',
              OTP: 'true'
            }
            
          ]

   
        }/>

           
        
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Inserisci alloggio')}>
          <View style = {styles.aggiungiStruttura}>
            <Image
                source = {require('../../assets/plus.png')}
                style = {styles.image} 
                
            />
            </View> 
        </TouchableOpacity>


        
      </View>

      
      
    );
}

export default LeMieStrutture