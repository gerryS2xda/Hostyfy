import React, { Component, useState } from 'react';
import CustomListViewGeneralAlloggio from '../components/CustomListViewGeneralAlloggio'
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

  maincontainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    borderWidth: 1,
    borderColor: '#d3d9e3',
  },
  
  aggiungiStruttura:{
    flexDirection: "column-reverse",
    alignItems: 'flex-end',
    marginBottom: "5%",
    marginRight: "3%",
  },

  
});

const VisualizzaAlloggi = (props) => {  
      const {list} = props.route.params
      return (
        <View style={styles.maincontainer}>
      <HeaderBar title="Alloggi" navigator={props.navigation} /> 
      <View style={styles.container}>
        <CustomListViewGeneralAlloggio
          nav = {props.navigation}
          itemList= {list}
        />

    <View style = {styles.aggiungiStruttura}>
        <TouchableOpacity
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