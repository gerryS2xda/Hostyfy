import React, { useState } from 'react'
import {View, Text, Image, TextInput, StyleSheet,TouchableOpacity, ScrollView, Alert } from 'react-native'
import CustomButton from "../components/CustomButton"
import {firebase} from "../firebase/config"

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
    borderColor: '#cc3881',
    borderBottomWidth: 1,
    marginTop:"4%",
    fontFamily: "MontserrantSemiBold",
    paddingLeft: 5
  },

  passwordDimenticata: {
    color: '#000000',
    fontFamily: "MontserrantSemiBold",
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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 20,
    paddingVertical: 20,
    borderColor: '#f0f0f0',
    
  },
})

const Login = (props) => {

  const [email, setEmail] = useState('');

  return(
    <View style={styles.maincontainer}>
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
                            Alert.alert('Operazione completata', 'L\'email è stata inviata con successo', [{text: 'OK', onPress: ()=>{
                                emailref.clear();
                                props.navigation.navigate('Home');  
                              }}]);
                        }).catch(function(error) {
                            Alert.alert('Errore nell\'invio dell\'email', 'L\'email inserita non è presente nei nostri sistemi', [{text: 'OK', onPress: ()=>{
                                emailref.clear();  
                              }}]);
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