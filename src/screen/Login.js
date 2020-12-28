import React, { useState } from 'react'
import {View, Text, Image, TextInput, StyleSheet,TouchableOpacity, ScrollView, Alert, Button } from 'react-native'
import CustomButton from "../components/CustomButton"
import {firebase} from "../firebase/config"
import Modal from 'react-native-modalbox'
import CustomAlert from '../components/CustomAlert'

var db = firebase.firestore();

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
    borderColor: '#666666',
    borderBottomWidth: 1,
    marginTop:"4%",
    fontFamily: "MontserrantSemiBold",
    paddingLeft: 5
  },

  paswordDimenticata: {
    color: '#303a52',
    fontFamily: "MontserrantSemiBold",
    fontSize: 12
  },
  clickTxt: {
    color: '#303a52',
    fontFamily: "MontserrantSemiBold",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    fontSize: 12
  },
  nonReg: {
    alignContent: 'center',
    color: '#303a52',
    marginBottom: "3%",
    fontFamily: "MontserrantSemiBold",
    fontSize: 15
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
  const [errore, setErrore] = useState(false);

  return(
    <View style={styles.maincontainer}>

    {errore && (<CustomAlert
      stato = {errore}
      setStato = {setErrore}
      titolo = "Errore di accesso"
      testo = "Username e/o Password Errati, ritenta!"
      buttonName = "Ok"
      pagina = "Home"
      navigator = {props.navigation}></CustomAlert>)}


      <ScrollView style={styles.bodyScrollcontainer}>
        <View style={styles.scrollContent}>
          <View style={styles.container_1}>
            <Image
              source = {require('../../assets/HOSTYFY.png')}
              style = {styles.image} 
            />
            <TextInput
              ref = {ref => {emailref=ref}}
              style = {styles.input}
              placeholder = 'Email'
              onChangeText = {(email) => setEmail(email)}
              
            />
            <TextInput
              style = {styles.input}
              ref = {ref => {passwordref=ref}}
              placeholder = 'Password'
              onChangeText = {(password) => setPassword(password)}
              secureTextEntry = {true}
            />
            <Text>{errore}</Text>
            <CustomButton 
                nome="Accedi" 
                styleBtn={{width: "75%"}}
                onPress={() => {
                    firebase.auth().signInWithEmailAndPassword(email.trim(), password).then(function (user){
                    const userId = firebase.auth().currentUser.uid; //user id si può usare nella collezione di un documento il cui id è uid
                    console.log("Login - uid:" + userId);

                    db.collection("guest").doc(userId).get().then(function (guestdoc) { 
                      var guest = guestdoc.data();
                      db.collection("guest").doc(userId).collection("cartaCredito").doc(userId).get().then(function (creditcarddoc){
                        var creditcard = creditcarddoc.data();
                        //verifica se e' host oppure no
                        if(guest.isHost)
                        {
                          db.collection("host").doc(userId).get().then(function (hostdoc){
                            var host = hostdoc.data();
                            props.navigation.navigate('HomeGuest', {user: {...guest, ...host, ...creditcard}});
                            //fai il merge tra field di guest e di host
                          }).catch(function (err) { console.log("ERROR with read host in Login.js:" + err); });
                        } 
                        else
                        {
                          props.navigation.navigate('HomeGuest', {user: {...guest, ...creditcard}}); 
                        } 
                        emailref.clear();  
                        passwordref.clear();
                        
                      }).catch(function (err) { console.log("ERROR with read guest/creditcard in Login.js:" + err); });
                    }).catch(function (err) { console.log("ERROR with read guest in Login.js:" + err); });
                  }).catch(function (error) {
                        emailref.clear();  
                        passwordref.clear();
                    if(!errore) setErrore(true);
                  });
                  
                }} />
            <View style={styles.horizontalContainer}>
              <Text style={styles.paswordDimenticata}>Password dimenticata?  </Text>
              <TouchableOpacity onPress={() => props.navigation.navigate('PasswordDimenticata')}>
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