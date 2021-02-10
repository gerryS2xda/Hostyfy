import React, { useState, useRef } from 'react'
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Button, ImageBackground, KeyboardAvoidingView, Dimensions} from 'react-native'
import CustomButton from "../components/CustomButton"
import CustomAlert from '../components/CustomAlert'
import { firebase } from "../firebase/config"

var db = firebase.firestore();

const styles = StyleSheet.create({
  maincontainer: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  titolo: {
    alignContent: 'center',
    fontFamily: "MontserrantBold",
    fontSize: 26,
    color: '#303a52',
    marginBottom: "8%",
    marginTop: "6%"
  },
  bodyScrollcontainer: {
    
    width: Dimensions.get('window').width,
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
    marginTop: "5%",
    marginBottom: "5%"
  },

  container_2: {
    flex: 1,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "30%",
    marginBottom: "20%",
    //backgroundColor: "#000000"

  },

  input: {
    minHeight: 30,
    height: 40,
    width: "75%",
    borderColor: '#303a52',
    borderWidth: 1.7,
    borderRadius: 20,
    fontFamily: 'MontserrantSemiBold',
    paddingLeft: "5%",
    marginTop: "4%",
    paddingRight: "5%",
  },

  paswordDimenticata: {
    color: '#cc3881',
    fontFamily: "MontserrantSemiBold",
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

  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: "3%",
  },

  passwordDimenticata: {
    color: '#303a52',
    fontFamily: "MontserrantSemiBold",
    fontSize: 12
  },

  scrollContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  imageBack:{
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000000",
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    
    
   },



})

const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errore, setErrore] = useState(false);

  const resetState = () =>{
    if(email !== "")
      setEmail("");
    if(password !== "")
      setPassword("");
  }

  return (
    
    <ImageBackground 
    source = {require("../../assets/Varie/Login.jpg")}
    style = {styles.imageBack}
    resizeMode = "cover">
    
    
    <View style={styles.maincontainer}>

      {errore && (<CustomAlert
        stato={errore}
        setStato={setErrore}
        titolo="Errore di accesso"
        testo="Username e/o Password Errati, ritenta!"
        buttonName="Ok"
        pagina="Home"
        navigator={props.navigation}></CustomAlert>)}

      <ScrollView style={styles.bodyScrollcontainer} contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
        <View style={styles.scrollContent}>
          <View style={styles.container_1}>

            <Text style={styles.titolo}>Login</Text>

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

            <CustomButton
              nome="Accedi"
              styleBtn={{ width: "75%", height: "7%", minHeight:40, marginTop: "5%", borderRadius: 20}}
              onPress={() => {
                firebase.auth().signInWithEmailAndPassword(email.trim(), password).then(function (user) {
                  const userId = firebase.auth().currentUser.uid; //user id si può usare nella collezione di un documento il cui id è uid
                
                  //resetta i campi di login resettando lo stato
                  resetState();

                  //Dopo il login, viene resettato lo stack navigator e settata come route iniziale la schermata Home
                  props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeGuest',  params: { userId: userId }}],
                  });
                }).catch(function (err) {
                  console.log("ERROR in Login.js:" + err);
                  if (!errore) setErrore(true);
                  resetState();
                });

              }} />
            <View style={styles.horizontalContainer}>
              <Text style={styles.passwordDimenticata}>Password dimenticata?  </Text>
              <TouchableOpacity onPress={() => props.navigation.navigate('PasswordDimenticata')}>
                <Text style={styles.clickTxt}>Clicca qui</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.container_2}>
              <Text style={styles.nonReg}>Non hai un account?</Text>
              <CustomButton
                nome="Registrati"
                styleBtn={{ width: "75%", height: 40, borderRadius: 20 }}
                onPress={() => props.navigation.navigate('Registratione')} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
</ImageBackground>

  );
}

export default Login;