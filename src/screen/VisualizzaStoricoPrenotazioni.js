import React, { Component, useState } from 'react';
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
      const {user, list} = route.params; 
      return (
        <View style={styles.maincontainer}>
        <HeaderBar title="Prenotazioni passate" navigator={navigation} /> 
        
          <View style={styles.container}>
            <CustomListViewGeneralPrenotazione
              nav = {navigation}
              itemList={list}
            />
          </View>
      </View>

      
      
    );
}

export default VisualizzaStoricoPrenotazioni