import React, { useState } from 'react'
import {View, Text, Image, TextInput, Button, StyleSheet,TouchableOpacity, ScrollView, Alert} from 'react-native'
import CustomButton from '../components/CustomButton'
import {firebase} from "../firebase/config"
import * as GuestModel from "../firebase/datamodel/GuestModel"
import CustomAlert from '../components/CustomAlert'

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
    borderWidth: 3,
    borderRadius: 20,
    paddingVertical: 20,
    borderColor: '#f0f0f0',
    
  },
  input: {
    height: 40,
    width: "85%",
    borderColor: '#666666',
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

var db = firebase.firestore();

const Registrazione = (props) => {

const [nome, setNome] = useState('');
const [cognome, setCognome] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errore, setErrore] = useState(false);
const [confermaPassword, setConfermaPassword] = useState('');

  return(

    <View style={styles.maincontainer}>

    {errore && (<CustomAlert
          stato = {errore}
          setStato = {setErrore}
          titolo = "Errore nella registrazione"
          testo = "Riprova a inserire i dati!"
          buttonName = "Ok"
          pagina = "Registratione"
          navigator = {props.navigation}></CustomAlert>)} 

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
                    ref = {input => {nomeref= input }}
                  />
                  <TextInput
                    style = {styles.input}
                    placeholder = 'Cognome'
                    onChangeText = {(cognome) => setCognome(cognome)}
                    ref = {input => {cognomeref= input }}
                  />
                  <TextInput
                    style = {styles.input}
                    placeholder = 'Email'
                    onChangeText = {(email) => setEmail(email)}
                    ref = {input => {emailref= input }}
                  />
                  <TextInput
                    style = {styles.input}
                    placeholder = 'Password'
                    onChangeText = {(password) => setPassword(password)}
                    secureTextEntry={true}
                    ref = {input => {passwordref= input }}
                  />

                  <TextInput
                    style = {styles.input}
                    placeholder = 'Conferma Password'
                    onChangeText = {(confermaPassword) => setConfermaPassword(confermaPassword)}
                    secureTextEntry={true}
                    ref = {input => {confermapasswordref= input }}
                  />        

                  <View style={styles.buttonCustomizzato}>
                    <CustomButton 
                      nome="Registrati" 
                      styleBtn={{width: "85%"}}
                      onPress={() => {
                        if(password === confermaPassword){
                          firebase.auth().createUserWithEmailAndPassword(email, confermaPassword).then((user) => {
                            const userId = firebase.auth().currentUser.uid;
                            console.log("Registrazione - uid:" + userId);
                            GuestModel.createGuestDocumentForRegistration(userId, cognome, nome, email, confermaPassword);
                            GuestModel.createCreditCardDocumentGuest(userId, 0, 0, "", "");
                            
                            db.collection("guest").doc(userId).get().then(function (guestdoc) { 
                              var guest = guestdoc.data();
                              db.collection("guest").doc(userId).collection("cartaCredito").doc(userId).get().then(function (creditcarddoc){
                                var creditcard = creditcarddoc.data();
                                props.navigation.navigate('HomeGuest', {user: {...guest, ...creditcard}});
                                
                                nomeref.clear();  
                                cognomeref.clear();
                                emailref.clear();
                                passwordref.clear();
                                confermapasswordref.clear();
                                
                              }).catch(function (err) { console.log("ERROR with read guest/creditcard in Login.js:" + err); });
                            }).catch(function (err) { console.log("ERROR with read guest in Login.js:" + err); });
                          }).catch(function (error) {

                            if(!errore) setErrore(true);
                                nomeref.clear();  
                                cognomeref.clear();
                                emailref.clear();
                                passwordref.clear();
                                confermapasswordref.clear();
                            
                          });                            
                        }                      
                      }
                    } 
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