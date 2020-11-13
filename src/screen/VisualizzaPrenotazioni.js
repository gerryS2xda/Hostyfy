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
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  bodyScrollcontainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    width: "96%", //ridotto da 100%
    height: "100%",
  },

  image:{
    width: 50,
    height:50
  },
  buttonContainer: {
    width: "104%", //da sistemare (fa riferimento a 96%)
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: "10%",
  }

});

const VisualizzaPrenotazioni = (props) => {  

      return (
        <View style={styles.maincontainer}>
          <HeaderBar title="Le tue prenotazioni" navigator={props.navigation} /> 
          <View style={styles.bodyScrollcontainer}>
            <View style={styles.scrollContent}></View>
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
                <View style={styles.buttonContainer}>
                  <CustomButton
                      styleBtn={{width: "90%"}} 
                      nome="Storico prenotazioni" 
                      onPress={() => props.navigation.navigate('StoricoPrenotazioni')} 
                    />
                </View>
            </View>
          </View>
      </View>      
    );
}

export default VisualizzaPrenotazioni