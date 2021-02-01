import React, { useState,useRef } from 'react'
import { View, Text, ImageBackground, TextInput, Button, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native'
import CustomButton from '../components/CustomButton'
import { firebase } from "../firebase/config"
import * as GuestModel from "../firebase/datamodel/GuestModel"
import CustomAlert from '../components/CustomAlert'

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  bodyScrollcontainer: {
    width: Dimensions.get('window').width,
  },

  titolo: {
    alignContent: 'center',
    fontFamily: "MontserrantBold",
    fontSize: 26,
    color: '#303a52',
    marginBottom: "8%",
    marginTop: "6%"
  },

  first: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    marginBottom: "10%",
  },

  top: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
  },

  image: {
    width: "60%",
    height: 120,
    marginTop: "25%",
    marginBottom: "4%",

  },

  informazioniPersonali: {
    width: "90%",
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 20,
    paddingVertical: 20,
    borderColor: '#f0f0f0',

  },
  input: {
    minHeight: 30,
    height: 40,
    width: "80%",
    borderColor: '#303a52',
    borderWidth: 1.7,
    borderRadius: 20,
    fontFamily: 'MontserrantSemiBold',
    paddingLeft: "5%",
    marginTop: "4%",
    paddingRight: "5%",
  },

  buttonCustomizzato: {
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "10%",
    marginBottom: "5%",
  },

  scrollContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  imageBack: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000000",
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  container_1: {
    flex: 1,
    maxHeight: 550,
    width: "90%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingTop: "5%",
    borderColor: '#303a52',
    borderWidth: 2,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginVertical: "5%"
  },

});

var db = firebase.firestore();

const Registrazione = (props) => {

  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errore, setErrore] = useState(false);
  const [confermaPassword, setConfermaPassword] = useState('');

  const resetState = () =>{
    if(nome !== "")
      setNome("");
    if(cognome !== "")
      setCognome("");
    if(email !== "")
      setEmail("");
    if(password !== "")
      setPassword("");
    if(confermaPassword !== "")
      setConfermaPassword("");
    
  }

  return (

    <ImageBackground
      source={require("../../assets/Varie/Registrazione.jpg")}
      style={styles.imageBack}
      resizeMode="cover">

      <View style={styles.maincontainer}>

        {errore && (<CustomAlert
          stato={errore}
          setStato={setErrore}
          titolo="Errore nella registrazione"
          testo="Riprova a inserire i dati!"
          buttonName="Ok"
          pagina="Registratione"
          navigator={props.navigation}></CustomAlert>)}

        <ScrollView style={styles.bodyScrollcontainer} contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
          <View style={styles.scrollContent}>
            <View style={styles.container_1}>

              <Text style={styles.titolo}>Registrazione</Text>

              <TextInput
                style={styles.input}
                placeholder='Nome'
                onChangeText={(nome) => setNome(nome)}
              />
              <TextInput
                style={styles.input}
                placeholder='Cognome'
                onChangeText={(cognome) => setCognome(cognome)}
              />
              <TextInput
                style={styles.input}
                placeholder='Email'
                onChangeText={(email) => setEmail(email)}
              />
              <TextInput
                style={styles.input}
                placeholder='Password'
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={true}
              />

              <TextInput
                style={styles.input}
                placeholder='Conferma Password'
                onChangeText={(confermaPassword) => setConfermaPassword(confermaPassword)}
                secureTextEntry={true}
              />

              <View style={styles.buttonCustomizzato}>
                <CustomButton
                  nome="Registrati"
                  styleBtn={{ width: "85%" }}
                  onPress={() => {
                    if (password === confermaPassword) {
                      firebase.auth().createUserWithEmailAndPassword(email, confermaPassword).then(async (user) => {
                        const userId = firebase.auth().currentUser.uid;
                        
                        await GuestModel.createGuestDocumentForRegistration(userId, cognome, nome, email);
                        await GuestModel.createCreditCardDocumentGuest(userId, 0, 0, "", new Date());
                        
                        //resetta i campi di login resettando lo stato
                         resetState();

                        //Dopo il login, viene resettato lo stack navigator e settata come route iniziale la schermata Home
                        props.navigation.reset({
                          index: 0,
                          routes: [{ name: 'HomeGuest',  params: { userId: userId }}],
                        });

                      }).catch(function (error) {
                        if (!errore) setErrore(true);
                        resetState();
                      });
                    }
                  }
                  }
                />
              </View>

            </View>

          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

export default Registrazione;