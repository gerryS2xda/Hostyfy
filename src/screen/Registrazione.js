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

  var nomeRef = useRef(null);
  var cognomeRef = useRef(null);
  var passwordRef = useRef(null);
  var emailRef = useRef(null);
  var confermaPasswordRef = useRef(null);

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
                ref={nomeRef}
              />
              <TextInput
                style={styles.input}
                placeholder='Cognome'
                onChangeText={(cognome) => setCognome(cognome)}
                ref={cognomeRef}
              />
              <TextInput
                style={styles.input}
                placeholder='Email'
                onChangeText={(email) => setEmail(email)}
                ref={emailRef}
              />
              <TextInput
                style={styles.input}
                placeholder='Password'
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={true}
                ref={passwordRef}
              />

              <TextInput
                style={styles.input}
                placeholder='Conferma Password'
                onChangeText={(confermaPassword) => setConfermaPassword(confermaPassword)}
                secureTextEntry={true}
                ref={confermaPasswordRef}
              />

              <View style={styles.buttonCustomizzato}>
                <CustomButton
                  nome="Registrati"
                  styleBtn={{ width: "85%" }}
                  onPress={() => {
                    if (password === confermaPassword) {
                      firebase.auth().createUserWithEmailAndPassword(email, confermaPassword).then((user) => {
                        const userId = firebase.auth().currentUser.uid;
                        console.log("Registrazione - uid:" + userId);
                        GuestModel.createGuestDocumentForRegistration(userId, cognome, nome, email, confermaPassword);
                        GuestModel.createCreditCardDocumentGuest(userId, 0, 0, "", "");

                        db.collection("guest").doc(userId).get().then(function (guestdoc) {
                          var guest = guestdoc.data();
                          db.collection("guest").doc(userId).collection("cartaCredito").doc(userId).get().then(function (creditcarddoc) {
                            var creditcard = creditcarddoc.data();
                            props.navigation.navigate('HomeGuest', { user: { ...guest, ...creditcard } });

                            nomeRef.current.clear();
                            cognomeRef.current.clear();
                            emailRef.current.clear();
                            passwordref.current.clear();
                            confermaPasswordRef.clear();

                          }).catch(function (err) { console.log("ERROR with read guest/creditcard in Login.js:" + err); });
                        }).catch(function (err) { console.log("ERROR with read guest in Login.js:" + err); });
                      }).catch(function (error) {

                        if (!errore) setErrore(true);
                        nomeRef.current.clear();
                        cognomeRef.current.clear();
                        emailRef.current.clear();
                        passwordref.current.clear();
                        confermaPasswordRef.clear();

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