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
    borderWidth: 2,
    borderRadius: 10,
    width: '90%',
    height: '60%',
    borderColor: "#f0f0f0",
    paddingBottom: "5%"
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
    borderColor: "#f0f0f0",
    paddingBottom: "5%",
    borderWidth: 2,
  },

  singleTextInput: {
    height: 40,
    width:"90%",
    borderColor: "#cc3881",
    borderBottomWidth: 1,
    paddingLeft: 5,
    fontFamily: "MontserrantSemiBold",
  },

  bottomContainer: {
    width: "100%",
    marginBottom: "30%",
    alignItems: 'center',
    marginTop:20,
    paddingBottom: "5%",
  },

  finalContainer:{
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 0.7,
    borderRadius: 10,
    width: '90%',
    height: '18%',
    marginTop:20,
    borderColor: "#f0f0f0",
    paddingBottom: "5%",
    borderWidth: 2,
  }
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

    const[IsEditable, setEditable] = useState(false);
     
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
                editable={IsEditable}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Cognome'
                editable={IsEditable}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Data di nascita'
                editable={IsEditable}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Email'
                editable={IsEditable}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Cellulare'
                editable={IsEditable}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Telefono'
                editable={IsEditable}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Sesso'
                editable={IsEditable}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Nazione'
                editable={IsEditable}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Indirizzo'
                editable={IsEditable}
            />
             <TextInput
                style = {styles.singleTextInput}
                placeholder='Città'
                editable={IsEditable}
            />
             <TextInput
                style = {styles.singleTextInput}
                placeholder='Cap'
                editable={IsEditable}
            />
          </View>
          <View style = {styles.lowerMiddleContainer}>
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Password attuale'
                editable={IsEditable}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Nuova password'
                editable={IsEditable}
            />
          </View>

          <View style = {styles.finalContainer}>
          
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Numero Carta'
                editable={IsEditable}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Data Scadenza'
                editable={IsEditable}
            />

            <TextInput
                style = {styles.singleTextInput}
                placeholder='CCV'
                editable={IsEditable}
            />    
          </View>

          <View style = {styles.bottomContainer}>
            <CustomButton 
              styleBtn={{width: "90%"}} 
              nome= {IsEditable == true ? 'Applica modifiche' : 'Modifica dati'}
              onPress={()=> {setEditable(previousState => !previousState)}}/>
              
            </View>
      </ScrollView>
    </View>
  );
}

export default Modifica_profilo