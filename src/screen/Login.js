import React, { useState } from 'react'
import {View, Text, Image, TextInput, Button, StyleSheet,TouchableOpacity, ScrollView } from 'react-native'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  container_1: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  container_2: {
    justifyContent: "flex-end",
    alignItems: 'center',
  },

  input: {
    height: 40,
    width:300,
    borderColor: '#cc3881',
    borderWidth: 1.4,
    marginTop:8,
    borderRadius: 8,
    fontFamily: "MontserrantSemiBold",
    paddingLeft: 5

  },

  bottone : {
    borderWidth: 1,
    width:300,
    height:40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:8,
    backgroundColor: '#f2077d',
    fontFamily: "MontserrantSemiBold",
  },

  bottoneRegistrati : {
    borderWidth: 1,
    width:300,
    height:40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:8,
    backgroundColor: '#f2077d',
    fontFamily: "MontserrantSemiBold",
    
    
  },

  paswordDimenticata: {
    alignContent: 'center',
    color: '#cc3881',
    marginTop:5,
    fontFamily: "MontserrantSemiBold",
  },

  nonReg: {
    alignContent: 'center',
    color: '#cc3881',
    marginBottom: 5,
    fontFamily: "MontserrantSemiBold",
  },

  image : {
    width:200,
    height:100, 
    marginTop:90,
    marginBottom: 20,
  },

  testo:{
    fontFamily: "MontserrantSemiBold",
    color: "#ffffff"
  }
})

const Login = (props) => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errore, setErrore] = useState('');


  return(
    
    <ScrollView>
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
        <TouchableOpacity
          style = {styles.bottone}
          onPress={() => {
            if(email == "admin") props.navigation.navigate('HomeHost');
            else props.navigation.navigate('HomeGuest');
            
          }}
          >
            <Text style={styles.testo}>Accedi</Text>
          </TouchableOpacity> 
          <Text style={styles.paswordDimenticata}>Password dimenticata?</Text>  
        </View> 
        <View style={styles.container_2}>
          <View style={{height:100}} >

          </View>
            <View style={styles.container_2}>
              <Text style={styles.nonReg}>Non hai un account?</Text>
              <TouchableOpacity
                style = {styles.bottoneRegistrati}
                onPress={() => props.navigation.navigate('Registratione')}>
                  <Text style={styles.testo}>Registrati</Text>
                </TouchableOpacity> 
            </View>
          </View>
       
      </ScrollView>

 
   
  );
}

export default Login