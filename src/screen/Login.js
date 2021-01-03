import React, { useState, useRef } from 'react'
import {View, Text, Image, TextInput, StyleSheet,TouchableOpacity, ScrollView, Alert, Button, ImageBackground,KeyboardAvoidingView} from 'react-native'
import CustomButton from "../components/CustomButton"
import CustomAlert from '../components/CustomAlert'
import {firebase} from "../firebase/config"

const styles = StyleSheet.create({

  maincontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  imageBack:{
    flex: 1,
    justifyContent: "center",
    width: '100%',
    height: '38%',
   
  },

  bodyScrollcontainer: {
    width: "100%",
  },
  container_1: {
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "59%",
  },

  container_2: {
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "4%",
    marginBottom: "10%"
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

  titolo : {
    alignContent: 'center',
    fontFamily: "MontserrantBold",
    fontSize: 26,
    color: '#303a52',
    marginTop: "15%",
    marginBottom: "3%"
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: "3%",
  },

  input: {
    height: "9%",
    width: "75%",
    borderColor: '#666666',
    borderWidth: 1.7,
    borderRadius: 20,
    fontFamily: 'MontserrantSemiBold',
    paddingLeft: "5%",
    marginTop: "4%",
    paddingRight: "5%",
  }});

const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errore, setErrore] = useState(false);
  var emailRef = useRef(null);
  var passwordref = useRef(null);

  return(
  
    
    <KeyboardAvoidingView style = {styles.maincontainer}>

    {errore && (<CustomAlert
      stato = {errore}
      setStato = {setErrore}
      titolo = "Errore di accesso"
      testo = "Username e/o Password Errati, ritenta!"
      buttonName = "Ok"
      pagina = "Home"
      navigator = {props.navigation}></CustomAlert>)}


     

      <ImageBackground
          source = {require("../../assets/Varie/Login.png")}
          style = {styles.imageBack}
          resizeMode='stretch' >
      
        <View style={styles.scrollContent}>    
          <View style={styles.container_1}>
           
            <Text style = {styles.titolo}>Login</Text>
            
           
              <TextInput
                ref = {emailRef}
                style = {styles.input}
                placeholder = 'Email'
                onChangeText = {(email) => setEmail(email)}
               />
          

            <TextInput
              style = {styles.input}
              ref = {passwordref}
              placeholder = 'Password'
              onChangeText = {(password) => setPassword(password)}
              secureTextEntry = {true}
            />
            <Text>{errore}</Text>
            <CustomButton 
                nome="Accedi" 
                styleBtn={{width: "75%", height: "8%"}}
                onPress={() => {
                    firebase.auth().signInWithEmailAndPassword(email.trim(), password).then(function (user){
                      const userId = firebase.auth().currentUser.uid; //user id si può usare nella collezione di un documento il cui id è uid
                      props.navigation.navigate('HomeGuest', {userId: userId});
                      emailRef.current.clear();  
                      passwordref.current.clear();
                    }).catch(function (err) {
                          console.log("ERROR in Login.js:" + err);
                          emailRef.current.clear();  
                          passwordref.current.clear();
                          if(!errore) setErrore(true);
                    });
                  
                }} />
              <View style={styles.horizontalContainer}>
                <Text style={styles.paswordDimenticata}>Password dimenticata?  </Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('PasswordDimenticata')}>
                  <Text style={styles.clickTxt}>Clicca qui</Text>
                </TouchableOpacity>
              </View>  
           
              <View style={styles.container_2}>
                    <Text style={styles.nonReg}>Non hai un account?</Text>
                    <CustomButton 
                        nome = "Registrati" 
                        styleBtn={{width: "75%", height: "26%"}}
                        onPress={() => props.navigation.navigate('Registratione')} 
                    />
                </View>  
          </View>
          </View>
          </ImageBackground>
    </KeyboardAvoidingView>
  
   
  );
}

export default Login;