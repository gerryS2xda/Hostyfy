import React, { useState } from 'react'
import {View, Text, Image, TextInput, Button, StyleSheet,TouchableOpacity, ScrollView, Alert} from 'react-native'
import CustomButton from '../components/CustomButton'

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
    marginTop:70,
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
    borderBottomWidth: 1,
    marginTop:8,
    borderRadius: 8,
    fontSize: 15,
    fontFamily: 'Montserrant',
    paddingLeft: 10
  },

  bottoneAvanti : {
    width:320,
    marginTop: 40,
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
                placeholder = 'Nome'
                onChangeText = {(nome) => setNome(nome)}
              />
              <TextInput
                style = {styles.input}
                placeholder = 'Cognome'
                onChangeText = {(cognome) => setCognome(cognome)}
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
              />

              <TextInput
                style = {styles.input}
                placeholder = 'Conferma Password'
                onChangeText = {(confermaPassword) => setConfermaPassword(confermaPassword)}
              />        

              <View style={styles.buttonCustomizzato}>
                <CustomButton nome="Registrati" styleBtn={styles.bottoneAvanti} onPress={() => Alert.alert (
                      'Registrazione', 'Registrazione avvenuta con successo', [{text: 'Vai al login', onPress: ()=> props.navigation.navigate('Home')}])} 
                />
              </View>
          
          </View>
    </View>
  </ScrollView>
  );
}

export default Registrazione;