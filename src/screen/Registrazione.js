import React, { useState } from 'react'
import {View, Text, Image, TextInput, Button, StyleSheet,TouchableOpacity, ScrollView, Alert} from 'react-native'

const styles = StyleSheet.create({
   

  first:{
    justifyContent: 'center',
    alignItems: 'center',
  },

  top:{
    justifyContent: 'center',
    alignItems: 'center',
  },

  image : {
    width:200,
    height:100, 
    marginTop:60,
    marginBottom: 30,

  },

  InformazioniPersonali: {
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 20,
    borderColor: '#d3d9e3',
    
  },

  container_2: {
    justifyContent: "flex-end",
    alignItems: 'center',
  },

  input: {
    height: 50,
    width:320,
    borderColor: '#cc3881',
    borderWidth: 1.4,
    marginTop:8,
    borderRadius: 8,
    fontSize: 40,
    fontFamily: 'Montserrant',
  },

  bottoneAvanti : {
    borderWidth: 1,
    width:320,
    height:40,  
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:8,
    backgroundColor: '#f2077d',
    marginTop: 40,
    fontSize: 10,
    fontFamily: 'Montserrant', 
  },
});


const Registrazione = (props) => {

const [nome, setNome] = useState('');
const [cognome, setCognome] = useState('');
const [lNascita, setLuogoNascita] = useState('');
const [dNascita, setDataNascita] = useState('');
const [errore, setErrore] = useState('');
const [confermaPassword, setConfermaPassword] = useState('');

  return(

    <ScrollView>
      <View style={styles.first}>
          <View style={styles.top}>
                  <Image
                    source = {require('../../assets/HOSTYFY.png')}
                    style = {styles.image} 
                  />
          </View>
          <View style={styles.InformazioniPersonali}>
              <TextInput
                style = {styles.input}
                placeholder = ' Nome'
                onChangeText = {(nome) => setNome(nome)}
              />
              <TextInput
                style = {styles.input}
                placeholder = ' Cognome'
                onChangeText = {(cognome) => setCognome(cognome)}
              />
              <TextInput
                style = {styles.input}
                placeholder = ' Email'
                onChangeText = {(email) => setEmail(email)}
              />
              <TextInput
                style = {styles.input}
                placeholder = ' Password'
                onChangeText = {(password) => setPassword(password)}
              />

              <TextInput
                style = {styles.input}
                placeholder = ' Conferma Password'
                onChangeText = {(confermaPassword) => setConfermaPassword(confermaPassword)}
              />        

              <View style={styles.buttonCustomizzato}>
                <TouchableOpacity
                    style = {styles.bottoneAvanti}
                    onPress={() => Alert.alert (
                      'Registrazione', 'Registrazione avvenuta con successo', [{text: 'Vai al login', onPress: ()=> props.navigation.navigate('Home')}])}>    
                                           <Text style={{color:'#ffffff'}}>Registrati</Text>
                </TouchableOpacity> 
              </View>
          
          </View>
          
      
      


     
    
  </View>
  </ScrollView>
   
  );
}

export default Registrazione;