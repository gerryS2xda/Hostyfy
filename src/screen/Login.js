import React, { useState } from 'react'
import {View, Text, Image, TextInput, StyleSheet,TouchableOpacity, ScrollView } from 'react-native'
import CustomButton from "../components/CustomButton"

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
    width:"75%",
    borderColor: '#cc3881',
    borderBottomWidth: 1,
    marginTop:8,
    borderRadius: 8,
    fontFamily: "MontserrantSemiBold",
    paddingLeft: 5

  },

  paswordDimenticata: {
    alignContent: 'center',
    color: '#cc3881',
    marginTop:5,
    fontFamily: "MontserrantSemiBold",
    backgroundColor: '#000000'
  },

  nonReg: {
    alignContent: 'center',
    color: '#cc3881',
    marginBottom: 5,
    fontFamily: "MontserrantSemiBold",
  },

  image : {
    width:"60%",
    height:"40%", 
    marginTop:90,
    marginBottom: 30,
    backgroundColor: '#000000'
    
  },
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
        <CustomButton nome="Accedi" onPress={() => {
            if(email == "admin") props.navigation.navigate('HomeHost');
            else props.navigation.navigate('HomeGuest');
          }} />
          <Text style={styles.paswordDimenticata}>Password dimenticata?</Text>  
        </View> 
        <View style={styles.container_2}>
          <View style={{height:100}} >
          </View>
            <View style={styles.container_2}>
              <Text style={styles.nonReg}>Non hai un account?</Text>
              <CustomButton nome = "Registrati" onPress={() => props.navigation.navigate('Registratione')} />
            </View>
          </View>
       
      </ScrollView>

 
   
  );
}

export default Login