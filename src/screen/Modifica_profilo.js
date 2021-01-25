import React, { useState, useRef } from 'react'
import {View, Text, TextInput, StyleSheet, ScrollView } from 'react-native'
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from "../components/CustomButton";
import DatePickerInputField from "../components/DatePickerInputField";
import * as GuestModel from "../firebase/datamodel/GuestModel"
import {firebase} from '../firebase/config';
import CustomAlert from '../components/CustomAlert'

const styles = StyleSheet.create({
  
  maincontainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    //backgroundColor: "#000000"
  },
  container: { 
    marginTop: "5%",
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
    borderColor: "#303a52",
    borderBottomWidth: 1,
    paddingLeft: 5,
    borderRadius: 0, 
    fontFamily: "Montserrant",
    marginBottom: "2%", 
    color: "#000000"  
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
    fontSize: 20,
    marginBottom: "3%"
  }, 
})

const Modifica_profilo = ({route, navigation}) => {
    //Ottieni info utente attualmente connesso
    const {user} = route.params;

    const [IsEditable, setEditable] = useState(false); 
    const [cf, setCodiceFiscale] = useState(user.cf);
    const [nome, setNome] = useState(user.nome);
    const [cognome, setCognome] = useState(user.cognome);
    const [dateNasc, setDateNascita] = useState( (new Date(user.dataNascita.seconds * 1000)).toLocaleString("it-IT").split(",")[0]);
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
    const [password, setPassword] = useState(user.password);
    const [passCompare, setPassCompare] = useState(false);
    const [updateErrorSuccess, setUpdateErrorSuccess] = useState(false);
    const [updateErrorFailed, setUpdateErrorFailed] = useState(false);

    //Riferimenti ai textInput
    var nuovaPasswordRef = useRef("");
    var confermaPasswordRef = useRef("");
      
   return(
    <View style={styles.maincontainer}>
      
          {passCompare && (<CustomAlert
          stato = {passCompare}
          setStato = {setPassCompare}
          titolo = "Password non coincidenti"
          testo = "Le password inserite non coindono, riprova con l'inserimento"
          buttonName = "Ok"
          pagina = "ModificaProfilo"
          navigator = {navigation}></CustomAlert>)}

          {updateErrorSuccess && (<CustomAlert
          stato = {updateErrorSuccess}
          setStato = {setUpdateErrorSuccess}
          titolo = "Modifica completata"
          testo = "I dati sono stati modificati con successo!"
          buttonName = "Ok"
          pagina = "ModificaProfilo"
          navigator = {navigation}></CustomAlert>)}

          {updateErrorFailed && (<CustomAlert
          stato = {updateErrorFailed}
          setStato = {setUpdateErrorFailed}
          titolo = "Modifica non completata"
          testo = "I dati non sono stati modificati con successo, riprova con l'inserimento!"
          buttonName = "Ok"
          pagina = "ModificaProfilo"
          navigator = {navigation}></CustomAlert>)}      

      <HeaderBar title="Il mio profilo" navigator={navigation} />
      <ScrollView contentContainerStyle = {styles.container}>
         
          <View style = {styles.upperMiddleContainer}>
          <Text style = {styles.singleText}>
              Informazioni Personali            
            </Text>
            <TextInput
                disabledInputStyle={{color: "black"}}
                style = {styles.singleTextInput}
                placeholder='Nome'
                editable={IsEditable}
                value={nome.toString()}
                onChangeText = {(nome) => setNome(nome)}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Cognome'
                editable={IsEditable}
                value={cognome.toString()}
                onChangeText = {(cognome) => setCognome(cognome)}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Codice fiscale'
                editable={IsEditable}
                value={cf.toString()}
                onChangeText = {(cf) => setCodiceFiscale(cf)}
            />
            <DatePickerInputField 
              styleContainer={{marginBottom: "2%"}} 
              styleField={{width: "81.5%"}} 
              date={dateNasc} 
              placeholder={"Data di nascita"}
              setDate={setDateNascita} 
              disabled={!IsEditable}
              
            />
           <TextInput
                style = {styles.singleTextInput}
                placeholder='Luogo nascita'
                editable={IsEditable}
                value={luogoNasc.toString()}
                onChangeText = {(luogoNasc) => setLuogoNascita(luogoNasc)}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Email'
                editable={IsEditable}
                value={email.toString()}
                onChangeText = {(email) => setEmail(email)}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Numero cellulare'
                editable={IsEditable}
                value={numCel.toString()}
                onChangeText = {(numCel) => setNumeroCellulare(numCel)}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Numero telefono'
                editable={IsEditable}
                value={numTel.toString()}
                onChangeText = {(numTel) => setNumeroTelefono(numTel)}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Sesso'
                editable={IsEditable}
                value={sesso.toString()}
                onChangeText = {(sesso) => setSesso(sesso)}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Nazionalità'
                editable={IsEditable}
                value={nazionalita.toString()}
                onChangeText = {(nazionalita) => setNazionalita(nazionalita)}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Via'
                editable={IsEditable}
                value={via.toString()}
                onChangeText = {(via) => setVia(via)}
            />
             <TextInput
                style = {styles.singleTextInput}
                placeholder='Città'
                editable={IsEditable}
                value={citta.toString()}
                onChangeText = {(citta) => setCitta(citta)}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Provincia'
                editable={IsEditable}
                value={provincia.toString()}
                onChangeText = {(provincia) => setProvincia(provincia)}
            />
            <TextInput
                style = {styles.singleTextInput}
                placeholder='Regione'
                editable={IsEditable}
                value={regione.toString()}
                onChangeText = {(regione) => setRegione(regione)}
            />
             <TextInput
                style = {styles.singleTextInput}
                placeholder='CAP'
                editable={IsEditable}
                value={cap.toString()}
                onChangeText = {(cap) => setCAP(cap)}
            />
          </View>
          <View style = {styles.lowerMiddleContainer}>
            <Text style = {styles.singleText}>
              Modifica Password            
            </Text>
            <TextInput
                style = {styles.singleTextInput}
                ref = {nuovaPasswordRef}
                placeholder='Nuova password'
                editable={IsEditable}
                secureTextEntry = {true}
                onChangeText = {(newpassword) => setNewPassword(newpassword)}
            />

            <TextInput
                style = {styles.singleTextInput}
                ref = {confermaPasswordRef}
                placeholder='Conferma nuova password'
                editable={IsEditable}
                secureTextEntry = {true}
                onChangeText = {(confermaPassword) => setConfermaPassword(confermaPassword)}
            />
          </View>
          <View style = {styles.finalContainer}>
            <Text style = {styles.singleText}> Dati Pagamento </Text>
              <TextInput
                  style = {styles.singleTextInput}
                  placeholder='Numero Carta'
                  editable={IsEditable}
                  value={numCarta.toString()}
                  onChangeText = {(numCarta) => setNumeroCarta(numCarta)}
              />
              <DatePickerInputField 
                styleContainer={{marginBottom: "3%"}} 
                styleField={{width: "82%"}} 
                date={dateScadenza.toString()} 
                setDate={setDateScadenza} 
                placeholder={"Data scadenza"}
                disabled={!IsEditable}
              />
              <TextInput
                  style = {styles.singleTextInput}
                  placeholder='CCV'
                  editable={IsEditable}
                  value={ccv.toString()}
                  onChangeText = {(ccv) => setCCV(ccv)}
              />
              <TextInput
                  style = {styles.singleTextInput}
                  placeholder='Intestatario'
                  editable={IsEditable}
                  value={intestatario.toString()}
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
                      if(!passCompare) setPassCompare(true);
                    }
                    else
                    {
                      
                      var indirizzo = {via: via, citta: citta, provincia: provincia, cap: cap, regione: regione};
                      GuestModel.updateGuestDocument(user.userId, user.cf, cognome, nome, sesso, dateNasc, luogoNasc, numCel, numTel, nazionalita, indirizzo, user.isHost, email);
                      GuestModel.createCreditCardDocumentGuest(user.userId, numCarta, ccv, intestatario, dateScadenza); 
                      
                        var userLogin = firebase.auth().currentUser;
                        
                        //viene controllato se entrambi i campi sono vuoti
                        var tempPassword = "";
                        if(newpassword === "")
                        {
                            tempPassword = password;
                        }
                        else
                        {
                           tempPassword = newpassword;
                        }
                        
                        userLogin.updatePassword(tempPassword).then(function() {
                          
                          if(!updateErrorSuccess) setUpdateErrorSuccess(true);
                          setEditable(previousState => !previousState)
                        })
                      .catch(function(error) {
                        if(!updateErrorFailed) console.log(error)
                      })
                    }
                }     
                nuovaPasswordRef.current.clear();  
                confermaPasswordRef.current.clear();
                   
              }
              }/>
              
            </View>
    </View>
  );
}

export default Modifica_profilo;
