import React, { Component, useState } from 'react';
import CustomListView from '../components/CustomListView'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Platform,
  ScrollView
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Dialog from 'react-native-dialog';
import HeaderBar from '../components/CustomHeaderBar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {firebase} from '../firebase/config'

var db = firebase.firestore();

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
});

const LeMieStrutture = (props) => {  
      const {user, list} = props.route.params;

      return (
      <View style={styles.maincontainer}>
        <HeaderBar title="Le tue Strutture" navigator={props.navigation} /> 
            <View style={styles.container}>
              <CustomListView 
                nav= {props.navigation}
                itemList = {list}
                /*
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
                
              } *//>

              <View style = {styles.aggiungiStruttura}>
                <TouchableOpacity 
            
                  onPress={() => {
                  props.navigation.navigate('Inserisci struttura', {user:user}),
                  console.log({user})}}
                  >
                    <Icon
                      name = "plus-circle-outline"
                      color = {"#f2077d"}
                      size = {65}
                    />
                    </TouchableOpacity>
                </View>
            </View>
          </View>   
      
    );
}

export default LeMieStrutture