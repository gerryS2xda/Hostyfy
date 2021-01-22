import React, { useState } from 'react'
import {View, Text, Image, TextInput, StyleSheet,TouchableOpacity, ScrollView, Alert, ImagePropTypes, KeyboardAvoidingView, ImageBackground} from 'react-native'
import CustomButton from "../components/CustomButton"
import {firebase} from "../firebase/config"
import CustomAlert from "../components/CustomAlert"

var db = firebase.firestore();

const styles = StyleSheet.create({
  
  maincontainer: {
     flex:1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: "center",
      backgroundColor: 'rgba(0,0,0,0.6)',
      
  },

  container_2: {
    flex:1,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "10%",
  },

  input: {
    width: "100%",
    minHeight: 40,
    borderColor: '#303a52',
    borderWidth: 1.7,
    borderRadius: 20,
    fontFamily: 'MontserrantSemiBold',
    paddingLeft: "4%",
    marginTop: "7%",
    paddingRight: "5%",
    marginBottom: "10%"
  },

  passwordDimenticata: {
    color: '#303a52',
    fontFamily: "MontserrantBold",
    alignContent: 'flex-start',
    fontSize: 18,
    marginRight: "10%"
  },
   image : {
    flex:1,
    backgroundColor: "#000000",
    justifyContent: "center",    
  },
  informazioniPersonali: {
    width: "100%",
    alignItems: 'center',
    borderRadius: 20,
    padding:"10%",
    borderColor: '#303a52',
    borderWidth: 2,
    backgroundColor: 'rgba(255,255,255,0.6)',
    //backgroundColor: "#000000"
    
  },
  container:{
    justifyContent: "center",
    
  }
})

const Login = (props) => {

  const [email, setEmail] = useState('');
  const [positivWrite, setPositiveWrite] = useState(false)
  const [value, setValue] = useState(false)
                          
  return(
    <ImageBackground 
          source = {require("../../assets/Varie/PasswordDimenticata.jpg")}
          style = {styles.image}> 
    
          <View style = {styles.maincontainer}>

          <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "position" : "position"}
              keyboardVerticalOffset = {-200}
              style={styles.container}>

            {positivWrite && (<CustomAlert
              titolo = "Operazione completata"
              testo = "L'email è stata inviata con successo"
              pagina = "Home"
              buttonName = "Ok"
              navigator = {props.navigation} 
              stato = {value}
              setStato ={setValue}></CustomAlert>)}

              {!positivWrite && (<CustomAlert
              titolo = "Operazione non completata"
              testo = "Email non presente nei nostri sistemi"
              pagina = "PasswordDimenticata"
              buttonName = "Ok"
              navigator = {props.navigation} 
              stato = {value}
              setStato ={setValue}></CustomAlert>)}                
            
           
              <View style={styles.informazioniPersonali}>
                  
                  <Text style={styles.passwordDimenticata}>Inserisci la tua email:</Text>
                  
                  <TextInput
                    style = {styles.input}
                    placeholder = 'Email'
                    onChangeText = {(email) => setEmail(email)}
                    ref = {input => { emailref = input }}
                  />
            
          
              <View style={styles.container_2}>
                    <CustomButton 
                        nome = "Conferma" 
                        styleBtn={{width: "75%"}}
                        onPress={()=>{
                            var auth = firebase.auth();  
                            auth.sendPasswordResetEmail(email.trim()).then(function() {
                            
                              if(!value) setValue(true);
                              setPositiveWrite(true);
                              emailref.clear();
                            
                            }).catch(function(error) { 
                              setPositiveWrite(false);
                              if(!value) setValue(true);
                            });
                        }} 
                    />
                </View> 
              </View>
             
              </KeyboardAvoidingView>
          </View>
      
      </ImageBackground>
   
 
   
  );
}

export default Login