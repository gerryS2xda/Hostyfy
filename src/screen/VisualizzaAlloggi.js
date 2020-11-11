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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    borderWidth: 1,
    borderColor: '#d3d9e3',
  },
  title:
  {
    fontSize: 25,
    marginLeft: 20,
  },

  aggiungiStruttura:{

    ...Platform.select({
        ios: {
          marginLeft: 310,
          marginBottom: 50
        },
        android: 
        {
          marginLeft: 320,
          marginBottom: 50
        }
    })
  },

  containerExtra: {
    flex: 0,
    flexDirection: 'row',
    padding: 10,
    marginLeft:16,
    marginRight:16,
    marginTop: 8,
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

const VisualizzaAlloggi = (props) => {  

      return (
        <View style={styles.maincontainer}>
      <HeaderBar title="Alloggi" navigator={props.navigation} /> 
      <View style={styles.container}>
        <CustomListViewGeneral
          nav = {props.navigation}
          itemList={[
            {
              key: 1, 
              title: 'Alloggio 1',
              description: '"Fantastica"',
              image_url: require('../../assets/Alloggio/Alloggio1.jpg'),
              newPage: 'Alloggio',
            },
            {
              key: 2,
              title: 'Alloggio 2',
              description: '"Esperienza meravigliosa"',
              image_url: require('../../assets/Alloggio/Alloggio2.jpg'),
              newPage: 'Alloggio',  
            },
            {
              key: 3,
              title: 'Alloggio 3',
              description: '"Eccezionale"',
              image_url: require('../../assets/Alloggio/Alloggio3.jpg'),
              newPage: 'Alloggio',
              
            },
            {
              key: 4,
              title: 'Alloggio 4',
              description: '"Eccellente"',
              image_url: require('../../assets/Alloggio/Alloggio4.jpg'),
              newPage: 'Alloggio',
              
            }
            
          ]

   
        }/>

    <View style = {styles.aggiungiStruttura}>
        <TouchableOpacity
          style = {styles.image}
          onPress={() => props.navigation.navigate('InserisciAlloggio')}>
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

export default VisualizzaAlloggi