import React, { useState } from 'react'
import {View, Text, Image, TextInput, StyleSheet,TouchableOpacity, ScrollView, Alert, ImagePropTypes } from 'react-native'
import CustomButton from "../components/CustomButton"
import {firebase} from "../firebase/config"
import CustomAlert from "../components/CustomAlert"

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

  passwordDimenticata: {
    color: '#000000',
    fontFamily: "MontserrantSemiBold",
    alignContent: 'flex-start',
  },
  clickTxt: {
    color: '#cc3881',
    fontFamily: "MontserrantSemiBold",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  nonReg: {
    alignContent: 'center',
    color: '#cc3881',
    marginBottom: "3%",
    fontFamily: "MontserrantSemiBold",
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
  informazioniPersonali: {
    width: "90%",
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 20,
    borderColor: '#f0f0f0',
    
  },
})

const Login = (props) => {

  const [email, setEmail] = useState('');
  const [positivWrite, setPositiveWrite] = useState(false)
  const [value, setValue] = useState(false)
                          
  return(
    <View style={styles.maincontainer}>

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

      <ScrollView style={styles.bodyScrollcontainer}>
        <View style={styles.scrollContent}>
          <View style={styles.container_1}>
            <Image
              source = {require('../../assets/HOSTYFY.png')}
              style = {styles.image} 
            />
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
            </View>  
          </View>
      </ScrollView>
    </View>
 
   
  );
}

export default Login