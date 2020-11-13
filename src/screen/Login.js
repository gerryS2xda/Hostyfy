import React, { useState } from 'react'
import {View, Text, Image, TextInput, StyleSheet,TouchableOpacity, ScrollView, Alert } from 'react-native'
import CustomButton from "../components/CustomButton"

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bodyScrollcontainer: {
    width: "100%",
  },
  container_1: {
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center'
  },

  container_2: {
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "20%",
    marginBottom: "10%",
  },

  input: {
    height: 40,
    width:"75%",
    borderColor: '#cc3881',
    borderBottomWidth: 1,
    marginTop:"4%",
    fontFamily: "MontserrantSemiBold",
    paddingLeft: 5
  },

  paswordDimenticata: {
    color: '#cc3881',
    fontFamily: "MontserrantSemiBold",
  },
  clickTxt: {
    color: '#cc3881',
    fontFamily: "MontserrantSemiBold",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  nonReg: {
    alignContent: 'center',
    color: '#cc3881',
    marginBottom: "3%",
    fontFamily: "MontserrantSemiBold",
  },

  image : {
    width:"60%",
    height:120, 
    marginTop:"25%",
    marginBottom: "4%",    
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: "3%",
  },
})

const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errore, setErrore] = useState('');

  const createNextRealeaseFeatureAlert = () =>
      Alert.alert(
      "Funzionalità non disponibile",
      "Questa funzionalità sarà disponibile a seguito di sviluppi futuri!",
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
      <ScrollView style={styles.bodyScrollcontainer}>
        <View style={styles.scrollContent}>
          <View style={styles.container_1}>
            <Image
              source = {require('../../assets/HOSTYFY.png')}
              style = {styles.image} 
            />
            <TextInput
              style = {styles.input}
              placeholder = 'Email'
              onChangeText = {(email) => setEmail(email)}
            />
            <TextInput
              style = {styles.input}
              placeholder = 'Password'
              onChangeText = {(password) => setPassword(password)}
              secureTextEntry = {true}
            />
            <Text>{errore}</Text>
            <CustomButton 
                nome="Accedi" 
                styleBtn={{width: "75%"}}
                onPress={() => {
                  if(email == "admin") props.navigation.navigate('HomeHost');
                 else props.navigation.navigate('HomeGuest');
                }} />
            <View style={styles.horizontalContainer}>
              <Text style={styles.paswordDimenticata}>Password dimenticata?  </Text>
              <TouchableOpacity onPress={createNextRealeaseFeatureAlert}>
                <Text style={styles.clickTxt}>Clicca qui</Text>
              </TouchableOpacity>
            </View>  
          </View> 
          <View style={styles.container_2}>
                <Text style={styles.nonReg}>Non hai un account?</Text>
                <CustomButton 
                    nome = "Registrati" 
                    styleBtn={{width: "75%"}}
                    onPress={() => props.navigation.navigate('Registratione')} 
                />
            </View>  
          </View>
      </ScrollView>
    </View>
 
   
  );
}

export default Login