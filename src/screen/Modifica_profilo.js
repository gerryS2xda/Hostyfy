import React, { useState } from 'react'
import {View, Text, Image, TextInput, StyleSheet,TouchableOpacity, ScrollView } from 'react-native'
import HeaderBar from '../components/CustomHeaderBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from "../components/CustomButton"

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {  
    flexDirection: 'column', 
    width: "100%",
  },
  scrollContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    height:100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:15
  },

  upperMiddleContainer: {
    
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 0.7,
    borderRadius: 10,
    width: 340,
    height: 200,
    marginTop:20
  },

  lowerMiddleContainer: {
    
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 0.7,
    borderRadius: 10,
    width: 340,
    height: 120,
    marginTop:20,
  },

  bottomContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  singleTextInput: {
    height: 40,
    width:300,
    borderColor: '#cc3881',
    borderWidth: 1.4,
    borderRadius: 8,
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
      <ScrollView style = {styles.container}>
        <View style={styles.scrollContent}> 
          <View style = {styles.topContainer}>
            <Icon name= "account-circle-outline" color={"#cc3881"} size={100}/>
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
                placeholder='Email'
            />
          </View>
          <View style = {styles.lowerMiddleContainer}>
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Vecchia password'
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
        </View>
      </ScrollView>
    </View>
  );
}

export default Modifica_profilo