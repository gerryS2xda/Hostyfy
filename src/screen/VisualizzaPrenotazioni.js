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
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';


const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
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
    marginBottom: "10%",
  }

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
                      title: 'Suite Imperiale',
                      description: '01/11/2020 - 03/11/2020',
                      image_url: require('../../assets/Struttura/struttura1.jpg'),
                      newPage: 'PrenotazioneDetail',
                    },
                    {
                      key: 2,
                      title: 'Camera panoramica',
                      description: '11/11/2020 - 17/11/2020',
                      image_url: require('../../assets/Struttura/struttura2.jpg'),
                      newPage: 'PrenotazioneDetail',  
                    },
                    {
                      key: 3,
                      title: 'Camera 3',
                      description: '10/11/2020 - 16/11/2020',
                      image_url: require('../../assets/Struttura/struttura3.jpg'),
                      newPage: 'PrenotazioneDetail',
                      
                    },
                    {
                      key: 4,
                      title: 'Camera',
                      description: '10/11/2020 - 15/11/2020',
                      image_url: require('../../assets/Struttura/struttura4.jpg'),
                      newPage: 'PrenotazioneDetail', 
                    }
                  ]
                }/>
                <View style={styles.buttonContainer}>
                  <CustomButton
                      styleBtn={{width: "90%"}} 
                      nome="Storico prenotazioni" 
                      onPress={() => props.navigation.navigate('StoricoPrenotazioni')} 
                    />
                </View>
            </View>
          </View>      
    );
}

export default VisualizzaPrenotazioni