import React, { useState } from 'react'
import {View, Text, Image, TextInput, StyleSheet, Alert, ScrollView } from 'react-native'
import HeaderBar from '../components/CustomHeaderBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from "../components/CustomButton";
import DatePickerInputField from "../components/DatePickerInputField";
import * as GuestModel from "../firebase/datamodel/GuestModel"
import {firebase} from '../firebase/config';

const styles = StyleSheet.create({
  
  maincontainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  container: { 
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: "4%"
    
  },
  upperMiddleContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    width: '90%',
    borderColor: "#f0f0f0",
    paddingBottom: "5%",
    paddingTop: "5%"
  },
  lowerMiddleContainer: { 
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 0.7,
    borderRadius: 10,
    width: '90%',
    marginTop: "5%",
    borderColor: "#f0f0f0",
    paddingBottom: "4%",
    borderWidth: 2,
    paddingTop: "3%",
  },
  singleTextInput: {
    height: 40,
    width:"90%",
    borderColor: "#cc3881",
    borderBottomWidth: 1,
    paddingLeft: 5,
    fontFamily: "MontserrantSemiBold",
    marginBottom: "3%",   
  },

  finalContainer:{ 
    justifyContent: 'space-around',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.7,
    borderRadius: 10,
    width: '90%',
    marginTop: "5%",
    borderColor: "#f0f0f0",
    marginBottom: "5%",
    paddingTop: "3%",
    paddingBottom: "3%",
    borderWidth: 2,
  },

  bottonContainer: {
    width: "100%",
    alignItems: 'center',
    marginTop: "2%",
    marginBottom: "4%"
  },
  
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },

  singleText:{
    fontFamily: "MontserrantSemiBold",
  }
})

const Modifica_profilo = ({route, navigation}) => {
  //Ottieni info utente attualmente connesso
  const {user} = route.params;

  const createPositiveAlert = () =>
      Alert.alert(
      "Salva modifiche",
      "Le modifiche sono state memorizzate con successo!",
      [
          {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

    const [IsEditable, setEditable] = useState(false); 
    const [cf, setCodiceFiscale] = useState(user.cf);
    const [nome, setNome] = useState(user.nome);
    const [cognome, setCognome] = useState(user.cognome);
    const [dateNasc, setDateNascita] = useState(user.dataNascita);
    const [luogoNasc, setLuogoNascita] = useState(user.luogoNascita);
    const [email, setEmail] = useState(user.email);
    const [numCel, setNumeroCellulare] = useState(user.numCell);
    const [numTel, setNumeroTelefono] = useState(user.numTel);
    const [sesso, setSesso] = useState(user.sesso);
    const [nazionalita, setNazionalita] = useState(user.nazionalita);
    const [via, setVia] = useState(user.indirizzo.via);
    const [citta, setCitta] = useState(user.indirizzo.citta);
    const [provincia, setProvincia] = useState(user.indirizzo.provincia);
    const [regione, setRegione] = useState(user.indirizzo.regione);
    const [cap, setCAP] = useState(user.indirizzo.cap);
    const [confermaPassword, setConfermaPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    //Dati relativi al pagamento
    const [numCarta, setNumeroCarta] = useState(user.numeroCarta);
    const [ccv, setCCV] = useState(user.ccv);
    const [dateScadenza, setDateScadenza] = useState(user.dataScadenza);
    const [intestatario, setIntestatario] = useState(user.intestatario);
    
    
  return(
    <View style={styles.maincontainer}>
      <HeaderBar title="Il mio profilo" navigator={navigation} />
      <ScrollView contentContainerStyle = {styles.container}>
          <View style={styles.topContainer}> 
            <Icon name= "account-circle-outline" color={"#000000"} size={100}/>
          </View>
          <View style = {styles.upperMiddleContainer}>
          <Text style = {styles.singleText}>
              Informazioni Personali            
            </Text>
            <TextInput
                disabledInputStyle={{color: "black"}}
                style = {styles.singleTextInput}
                placeholder='Nome'
                editable={IsEditable}
                value={nome}
                onChangeText = {(nome) => setNome(nome)}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Cognome'
                editable={IsEditable}
                value={cognome}
                onChangeText = {(cognome) => setCognome(cognome)}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Codice fiscale'
                editable={IsEditable}
                value={cf}
                onChangeText = {(cf) => setCodiceFiscale(cf)}
            />
            <DatePickerInputField 
              styleContainer={{marginBottom: "3%"}} 
              styleField={{width: "80%"}} 
              date={dateNasc} 
              placeholder={"Data di nascita"}
              setDate={setDateNascita} 
              disabled={!IsEditable}
            />
           <TextInput
                style = {styles.singleTextInput}
                placeholder='Luogo nascita'
                editable={IsEditable}
                value={luogoNasc}
                onChangeText = {(luogoNasc) => setLuogoNascita(luogoNasc)}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Email'
                editable={IsEditable}
                value={email}
                onChangeText = {(email) => setEmail(email)}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Numero cellulare'
                editable={IsEditable}
                value={numCel}
                onChangeText = {(numCel) => setNumeroCellulare(numCel)}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Numero telefono'
                editable={IsEditable}
                value={numTel}
                onChangeText = {(numTel) => setNumeroTelefono(numTel)}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Sesso'
                editable={IsEditable}
                value={sesso}
                onChangeText = {(sesso) => setSesso(sesso)}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Nazionalità'
                editable={IsEditable}
                value={nazionalita}
                onChangeText = {(nazionalita) => setNazionalita(nazionalita)}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Via'
                editable={IsEditable}
                value={via}
                onChangeText = {(via) => setVia(via)}
            />
             <TextInput
                style = {styles.singleTextInput}
                placeholder='Città'
                editable={IsEditable}
                value={citta}
                onChangeText = {(citta) => setCitta(citta)}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Provincia'
                editable={IsEditable}
                value={provincia}
                onChangeText = {(provincia) => setProvincia(provincia)}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Regione'
                editable={IsEditable}
                value={regione}
                onChangeText = {(regione) => setRegione(regione)}
            />
             <TextInput
                style = {styles.singleTextInput}
                placeholder='CAP'
                editable={IsEditable}
                value={cap}
                onChangeText = {(cap) => setCAP(cap)}
            />
          </View>
          <View style = {styles.lowerMiddleContainer}>
            <Text style = {styles.singleText}>
              Modifica Password            
            </Text>
            <TextInput
                style = {styles.singleTextInput}
                ref = {input => {nuovaPasswordRef = input }}
                placeholder='Nuova password'
                editable={IsEditable}
                secureTextEntry = {true}
                onChangeText = {(newpassword) => setNewPassword(newpassword)}
            />

            <TextInput
                style = {styles.singleTextInput}
                ref = {input => {confermaPasswordRef = input }}
                placeholder='Conferma Nuova password'
                editable={IsEditable}
                secureTextEntry = {true}
                onChangeText = {(confermaPassword) => setConfermaPassword(confermaPassword)}
            />
          </View>
          <View style = {styles.finalContainer}>
          <Text style = {styles.singleText}>
              Dati Pagamento            
            </Text>
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Numero Carta'
                editable={IsEditable}
                value={numCarta}
                onChangeText = {(numCarta) => setNumeroCarta(numCarta)}
            />
            <DatePickerInputField 
              styleContainer={{marginBottom: "3%"}} 
              styleField={{width: "80%"}} 
              date={dateScadenza} 
              setDate={setDateScadenza} 
              placeholder={"Data scadenza"}
              disabled={!IsEditable}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='CCV'
                editable={IsEditable}
                value={ccv}
                onChangeText = {(ccv) => setCCV(ccv)}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Intestatario'
                editable={IsEditable}
                value={intestatario}
                onChangeText = {(intestatario) => setIntestatario(intestatario)}
            />    
          </View>

          
      </ScrollView>
      
      <View style = {styles.bottonContainer}>
            <CustomButton 
              styleBtn={{width: "90%"}} 
              nome = {IsEditable == true ? 'Applica modifiche' : 'Modifica dati'}
              onPress={()=> {
                if(!IsEditable)
                {
                  setEditable(previousState => !previousState)
                }
                else
                {               
                    if(newpassword!==confermaPassword)
                    {
                    
                      Alert.alert('Errore nell\'inserimento', 'Le nuove password non coincidono!', [{text: 'OK', onPress: ()=>{

                      }}]);
                    }
                    else
                    {
                      
                      var indirizzo = {via: via, citta: citta, provincia: provincia, cap: cap, regione: regione};
                      GuestModel.updateGuestDocument(user.userId, user.cf, cognome, nome, sesso, dateNasc, luogoNasc, numCel, numTel, nazionalita, indirizzo, user.isHost, email);
                      GuestModel.createCreditCardDocumentGuest(user.userId, numCarta, ccv, intestatario, dateScadenza); 
                      
                        var userLogin = firebase.auth().currentUser;
                        
                        userLogin.updatePassword(newpassword).then(function() {
                        Alert.alert('Modifica Password', 'Password modificata con successo!', [{text: 'OK', onPress: ()=>{
                          setEditable(previousState => !previousState)
                        }}]);})
                      .catch(function(error) {
                        Alert.alert('Modifica Password', 'Riprova, vi è stato un problema con la modifica della password!', [{text: 'OK'}]);})
                    }
                }     
                  nuovaPasswordRef.clear();  
                 confermaPasswordRef.clear();
                   
              }
              }/>
              
            </View>
    </View>
  );
}

export default Modifica_profilo;
