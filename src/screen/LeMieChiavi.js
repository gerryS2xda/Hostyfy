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
  maincontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bodyScrollcontainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    width: "100%",
    height: "100%",
  },
  scrollContent: {
    marginRight:"3%",
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

});

const LeMieChiavi = (props) => {  

      return (
    <View style={styles.maincontainer}>
      <HeaderBar title="Le tue chiavi attive" navigator={props.navigation} /> 
      <View style={styles.bodyScrollcontainer}>
          <View style={styles.scrollContent}>
            <View style={styles.container}>
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
        </View>
    </View>

      
      
    );
}

export default LeMieChiavi