import React, { Component } from 'react';
import CustomListView from './CustomListView'
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useLinkProps } from '@react-navigation/native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },

  intestazione:{
    marginTop: 60,
    marginBottom: -60
  },

  title:
  {
    fontSize: 25,
    marginLeft: 20,
  }
});

const LeMieStrutture = (props) => {  
    return (
      <View style={styles.container}>
        <View style = {styles.intestazione}>
          <Text style = {styles.title}>Le mie Strutture</Text>
        </View>
        <CustomListView
          nav= {props.navigation}
          itemList={[
            {
              key: 1, 
              title: 'Le Sirene',
              description: '"Fantastica"',
              image_url: require('../../assets/Struttura/struttura1.jpg'),
              newPage: 'VisualizzaStruttura'
            },
            {
              key: 2,
              title: 'Exe Majestic',
              description: '"Esperienza meravigliosa"',
              image_url: require('../../assets/Struttura/struttura2.jpg'),
              newPage: 'VisualizzaStruttura'
            },
            {
              key: 3,
              title: 'Villa Domina',
              description: '"Eccezionale"',
              image_url: require('../../assets/Struttura/struttura3.jpg'),
              newPage: 'VisualizzaStruttura'
            },
            {
              key: 4,
              title: 'Apartments Tudor',
              description: '"Eccellente"',
              image_url: require('../../assets/Struttura/struttura4.jpg'),
              newPage: 'VisualizzaStruttura'
            }
            
          ]
        }
        />
      </View>
    );
}

export default LeMieStrutture