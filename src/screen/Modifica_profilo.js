import React, { useState } from 'react'
import {View, Text, Image, TextInput, StyleSheet, Alert, ScrollView } from 'react-native'
import HeaderBar from '../components/CustomHeaderBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from "../components/CustomButton"

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: "100%",
  },
  container: {  
    flexDirection: 'column', 
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  topContainer: {
    height: '15%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'20%'
  },

  upperMiddleContainer: {
    
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 0.7,
    borderRadius: 10,
    width: '90%',
    height: '60%',
  },

  lowerMiddleContainer: {
    
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 0.7,
    borderRadius: 10,
    width: '90%',
    height: '13%',
    marginTop:20,
  },

  bottomContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '20%',
  },

  singleTextInput: {
    height: 40,
    width:300,
    borderColor: '#cc3881',
    borderBottomWidth: 1,
    paddingLeft: 5,
    fontFamily: "MontserrantSemiBold",
  },
})


const Modifica_profilo = (props) => {
  const createPositiveAlert = () =>
      Alert.alert(
      "Salva modifiche",
      "Le modifiche sono state memorizzate con successo!",
      [
          {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

  return(
    <View style={styles.maincontainer}>
      <HeaderBar title="Il mio profilo" navigator={props.navigation} />
      <ScrollView contentContainerStyle = {styles.container}>
          <View style={styles.topContainer}> 
            <Icon name= "account-circle-outline" color={"#000000"} size={100}/>
          </View>
          <View style = {styles.upperMiddleContainer}>
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Nome'
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Cognome'
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Data di nascita'
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Email'
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Cellulare'
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Telefono'
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Sesso'
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Nazione'
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Indirizzo'
            />
             <TextInput
                style = {styles.singleTextInput}
                placeholder='Città'
            />
             <TextInput
                style = {styles.singleTextInput}
                placeholder='Cap'
            />
          </View>
          <View style = {styles.lowerMiddleContainer}>
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Password attuale'
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Nuova password'
            />
          </View>
          <View style = {styles.bottomContainer}>
            <CustomButton styleBtn={{marginTop:40, marginBottom: 40}} 
              nome="Salva modifiche" 
              onPress={createPositiveAlert} 
            />
          </View>
      </ScrollView>
    </View>
  );
}

export default Modifica_profilo