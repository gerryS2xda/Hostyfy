import React, { useState } from 'react'
import {View, Text, Image, TextInput, Button, StyleSheet,TouchableOpacity, ScrollView, Alert} from 'react-native'
import CustomButton from '../components/CustomButton'

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

  first:{
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    marginBottom: "10%",
  },

  top:{
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
  },

  image : {
    width:"60%",
    height:120, 
    marginTop:"25%",
    marginBottom: "4%",  

  },

  informazioniPersonali: {
    width: "90%",
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 20,
    borderColor: '#d3d9e3',
    
  },
  input: {
    height: 40,
    width: "85%",
    borderColor: '#cc3881',
    borderBottomWidth: 1,
    fontFamily: 'MontserrantSemiBold',
    paddingLeft: 5,
    marginTop: "4%"
  },
  buttonCustomizzato:{
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "10%",
    marginBottom: "5%",
  }
});


const Registrazione = (props) => {

const [nome, setNome] = useState('');
const [cognome, setCognome] = useState('');
const [lNascita, setLuogoNascita] = useState('');
const [dNascita, setDataNascita] = useState('');
const [errore, setErrore] = useState('');
const [confermaPassword, setConfermaPassword] = useState('');

  return(

    <View style={styles.maincontainer}>
      <ScrollView style={styles.bodyScrollcontainer}>
        <View style={styles.scrollContent}>
          <View style={styles.first}>
              <View style={styles.top}>
                <Image
                    source = {require('../../assets/HOSTYFY.png')}
                    style = {styles.image} 
                />
              </View>
              <View style={styles.informazioniPersonali}>
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
                    <CustomButton 
                      nome="Registrati" 
                      styleBtn={{width: "85%"}}
                      onPress={() => Alert.alert (
                        'Registrazione', 'Registrazione avvenuta con successo', [{text: 'Vai al login', onPress: ()=> props.navigation.navigate('Home')}])} 
                    />
                  </View>
              
              </View>
          </View>
       </View>
    </ScrollView>
  </View>
  );
}

export default Registrazione;