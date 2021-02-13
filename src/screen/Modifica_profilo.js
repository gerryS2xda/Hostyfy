import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, ScrollView, Button, Dimensions, Alert } from 'react-native'
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from "../components/CustomButton";
import DatePickerInputField from "../components/DatePickerInputField";
import * as GuestModel from "../firebase/datamodel/GuestModel"
import { firebase } from '../firebase/config';
import CustomAlert from '../components/CustomAlert'
import { TextInput } from 'react-native-paper';
import { DefaultTheme } from '@react-navigation/native';
import CustomAlertGeneral from "../components/CustomAlertGeneral"

const styles = StyleSheet.create({

  maincontainer: {
    flex: 1,
    backgroundColor: '#344545',
    //justifyContent: 'center',
    //backgroundColor: "#000000"
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: "#000000"
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
    height: 45,
    marginBottom: "2%",
    fontFamily: "Monsterrant",
  },

  finalContainer: {
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

  singleText: {
    fontFamily: "MontserrantSemiBold",
    fontSize: 30,
    marginBottom: "3%",
    color: '#303a52',
  },

  page: {
    backgroundColor: "#ffffff",
    flex: 1,
    width: Dimensions.get('window').width,
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },

  singolaView: {

    paddingBottom: "5%",
    paddingTop: "5%",
    maxHeight: 550,
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",


    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#f0f0f0",
  },

  guidaView: {
    width: "88%",
    flexDirection: "row",
    marginTop: "5%",
    justifyContent: "space-between",
    //backgroundColor: "#000000"
  },

  titoloView: {},

  viewCampi: {
    width: "90%",
  },

  ButtonContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",

  },

  keyboard: {
    flex: 1,
  },

  secondScroll: {
    width: Dimensions.get('window').width,
  },
})



const theme = { ...DefaultTheme, roundness: 30, myOwnProperty: true, fonts: { regular: { fontFamily: 'MontserrantSemiBold', fontWeight: 'normal' } }, colors: { myOwnColor: '#303a52', primary: '#0692d4', text: '#303a52' } }



const Modifica_profilo = ({ route, navigation }) => {
  
  //Ottieni info utente attualmente connesso  
  const { user } = route.params;

  const scrollRef = useRef();
  const [IsEditable, setEditable] = useState(false);
  const [showAlertErrorField, setShowAlertErrorField] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");

  //Dati anagrafici
  const [nome, setNome] = useState(user.nome);
  const [cognome, setCognome] = useState(user.cognome);
  const [cf, setCodiceFiscale] = useState(user.cf);
  const [dateNasc, setDateNascita] = useState((user.dataNascita === "") ? "" : (new Date(user.dataNascita.seconds*1000)).toLocaleString("it-IT").split(",")[0]);
  const [luogoNasc, setLuogoNascita] = useState(user.luogoNascita);
  const [nazionalita, setNazionalita] = useState(user.nazionalita);

  //Credenziali
  const [passCompare, setPassCompare] = useState(false);
  const [confermaPassword, setConfermaPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [email, setEmail] = useState(user.email);
  const [numCel, setNumeroCellulare] = useState((user.numCell == 0) ? "" : ""+user.numCell);
  const [numTel, setNumeroTelefono] = useState((user.numTel == 0) ? "" : ""+user.numTel);

  //Riferimenti ai textInput
  var nuovaPasswordRef = useRef("");
  var confermaPasswordRef = useRef("");

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateErrorFailed, setUpdateErrorFailed] = useState(false);

  //Residenza
  const [via, setVia] = useState(user.indirizzo.via);
  const [citta, setCitta] = useState(user.indirizzo.citta);
  const [provincia, setProvincia] = useState(user.indirizzo.provincia);
  const [regione, setRegione] = useState(user.indirizzo.regione);
  const [cap, setCAP] = useState((user.indirizzo.cap == 0) ? "" : ""+user.indirizzo.cap);

  //Dati relativi al pagamento
  const [numCarta, setNumeroCarta] = useState((user.numeroCarta == 0) ? "" : ""+user.numeroCarta) 
  const [ccv, setCCV] = useState((user.ccv == 0) ? "" : ""+user.cvv);
  const [dateScadenza, setDateScadenza] = useState((user.dataScadenza === "") ? "" : (new Date(user.dataScadenza.seconds*1000)).toLocaleString("it-IT").split(",")[0])
  const [intestatario, setIntestatario] = useState(user.intestatario);

  //funzione per verificare che tutti i campi siano stati inseriti (controllo generale)
	const validateFormField = () => {
		var flag = true; //tutti i campi sono compilati
		var message = "Attenzione!! Uno dei campi obbligatori non è compilato. Il campo non compilato è ";
		if (nome === "") {
			message += "\"Nome\"";
			flag = false;
		} else if (cognome === "") {
			message += "\"Cognome\"";
			flag = false;
		} else if (cf === "") {
			message += "\"Codice Fiscale\"";
			flag = false;
		} else if (dateNasc === "") {
			message += "\"Data di nascita\"";
			flag = false;
		} else if (luogoNasc === "") {
			message += "\"Luogo di Nascita\"";
			flag = false;
		} else if (nazionalita === "") {
			message += "\"Nazionalità\"";
			flag = false;
		} else if (email === "") {
			message += "\"E-mail\"";
			flag = false;
		} else if (numCel === "") {
			message += "\"Cellulare\"";
			flag = false;
		} else if (via === "") {
			message += "\"Via\"";
			flag = false;
		} else if (citta === "") {
			message += "\"Città\"";
			flag = false;
		} else if (provincia === "") {
			message += "\"Provincia\"";
			flag = false;
		} else if (regione === "") {
			message += "\"Regione\"";
			flag = false;
		} else if (cap === "") {
			message += "\"CAP\"";
			flag = false;
		} 
		if (!flag) {
			setMessageAlert(message);
			setShowAlertErrorField(true);
		}
		return flag;
	}


  return (

    <View style={styles.maincontainer}>

      {passCompare && (<CustomAlert
        stato={passCompare}
        setStato={setPassCompare}
        titolo="Password non coincidenti"
        testo="Le password inserite non coindono, riprova con l'inserimento"
        buttonName="Ok"
        pagina="ModificaProfilo"
        navigator={navigation}></CustomAlert>)}

      {updateErrorFailed && (<CustomAlert
        stato={updateErrorFailed}
        setStato={setUpdateErrorFailed}
        titolo="Modifica non completata"
        testo="I dati non sono stati modificati con successo, riprova con l'inserimento!"
        buttonName="Ok"
        pagina="ModificaProfilo"
        navigator={navigation}></CustomAlert>)}

      <HeaderBar title="Il mio profilo" navigator={navigation} />
      <ScrollView
        style={styles.secondScroll}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>


        <ScrollView
          pagingEnabled={true}
          contentContainerStyle={styles.container}
          showOrizontalScrollIndicator={false}
          horizontal
          ref={scrollRef}
          bounces={false}
        >
          <View style={styles.page}>
            <View style={styles.singolaView}>
              <View style={styles.titoloView}>
                <Text style={styles.singleText}>
                  Dati anagrafici
            </Text>
              </View>
              <View style={styles.viewCampi}>

                <TextInput
                  mode='outlined'
                  label='Nome'
                  disabledInputStyle={{ color: "#303a52" }}
                  style={styles.singleTextInput}
                  editable={IsEditable}
                  value={nome}
                  onChangeText={(nome) => setNome(nome)}
                  theme={theme} />

                <TextInput
                  mode='outlined'
                  label='Cognome'
                  disabledInputStyle={{ color: "black" }}
                  editable={IsEditable}
                  value={cognome}
                  style={styles.singleTextInput}
                  onChangeText={(cognome) => setCognome(cognome)}
                  theme={theme}
                />

                <TextInput
                  mode='outlined'
                  label='Codice Fiscale'
                  disabledInputStyle={{ color: "black" }}
                  editable={IsEditable}
                  value={cf}
                  style={styles.singleTextInput}
                  onChangeText={(cf) => setCodiceFiscale(cf)}
                  theme={theme}
                  maxLength={16}
                />

                <DatePickerInputField
                  styleContainer={styles.singleTextInput}
                  styleField={{ width: "82%" }}
                  date={(dateNasc === "") ? "" : (new Date(dateNasc)).toDateString("it-IT")}
                  setDate={setDateNascita}
                  placeholder={"Data di nascita"}
                  disabled={!IsEditable}
                  
                />

              
                <TextInput
                  mode='outlined'
                  label='Luogo di Nascita'
                  disabledInputStyle={{ color: "black" }}
                  editable={IsEditable}
                  value={luogoNasc}
                  style={styles.singleTextInput}
                  onChangeText={(luogoNasc) => setLuogoNascita(luogoNasc)}
                  theme={theme}
                />

                <TextInput
                  mode='outlined'
                  label='Nazionalità'
                  disabledInputStyle={{ color: "black" }}
                  editable={IsEditable}
                  value={nazionalita}
                  style={styles.singleTextInput}
                  onChangeText={(nazionalita) => setNazionalita(nazionalita)}
                  theme={theme}
                />
              </View>
            </View>
            <View style={styles.guidaView}>
              <View style={styles.ButtonContainer}>
                <CustomButton
                  styleBtn={{ width: "100%", marginRight: "15%" }}
                  nome={IsEditable ? 'Applica modifiche' : 'Modifica dati'}
                  onPress={() => {
                    async function onPressEditProfile() {                      
                      if (newpassword !== confermaPassword) {
                        if (!passCompare) setPassCompare(true);
                      } else {

                        var indirizzo = { via: via, citta: citta, provincia: provincia, cap: cap, regione: regione };
                        await GuestModel.updateGuestDocument(user.userId, cf, cognome, nome, "x", dateNasc, luogoNasc, numCel, numTel, nazionalita, indirizzo, email);
                        await GuestModel.createCreditCardDocumentGuest(user.userId, numCarta, ccv, intestatario, dateScadenza);

                        var userLogin = firebase.auth().currentUser;

                        if (newpassword !== "") { //se la nuova password è stata inserita ed è soddisfatto il test di conferma
                          await userLogin.updatePassword(newpassword).catch(function (error) {
                              if (!updateErrorFailed) console.log(error)
                            })
                        }
                        setUpdateSuccess(true);
                        IsEditable ? setEditable(false) : setEditable(true);
                      }
                    }
                    if(IsEditable){
                      if(!validateFormField()){
                        return;
                      }
                      onPressEditProfile();
                    }else{
                      IsEditable ? setEditable(false) : setEditable(true);
                    }
                  }} />
              </View>
              <View style={styles.ButtonContainer}>
                <CustomButton
                  styleBtn={{ width: "100%", marginLeft: "15%" }}
                  nome={"Avanti"}
                  onPress={() => { scrollRef.current.scrollTo({ x: (Dimensions.get('window').width) }) }} />
              </View>
            </View>
          </View>
          <View style={styles.page}>
            <View style={styles.singolaView}>
              <View style={styles.titoloView}>
                <Text style={styles.singleText}>
                  Credenziali
            </Text>
              </View>
              <View style={styles.viewCampi}>
                <TextInput
                  mode='outlined'
                  label='E-mail'
                  disabledInputStyle={{ color: "black" }}
                  style={styles.singleTextInput}
                  editable={IsEditable}
                  value={email}
                  onChangeText={(email) => setEmail(email)}
                  theme={theme}
                  keyboardType="email-address"
                  />

                <TextInput
                  mode='outlined'
                  label='Cellulare'
                  disabledInputStyle={{ color: "black" }}
                  editable={IsEditable}
                  value={numCel}
                  style={styles.singleTextInput}
                  onChangeText={(numCel) => setNumeroCellulare(numCel)}
                  theme={theme}
                />

                <TextInput
                  mode='outlined'
                  label='Telefono'
                  disabledInputStyle={{ color: "black" }}
                  editable={IsEditable}
                  value={numTel}
                  style={styles.singleTextInput}
                  onChangeText={(numTel) => setNumeroTelefono(numTel)}
                  theme={theme}
                />

                <TextInput
                  mode='outlined'
                  label='Password'
                  disabledInputStyle={{ color: "black" }}
                  editable={IsEditable}
                  style={styles.singleTextInput}
                  ref={nuovaPasswordRef}
                  secureTextEntry={true}
                  onChangeText={(newpassword) => setNewPassword(newpassword)}
                  theme={theme}
                />

                <TextInput
                  mode='outlined'
                  label='Conferma Password'
                  disabledInputStyle={{ color: "black" }}
                  editable={IsEditable}
                  ref={confermaPasswordRef}
                  style={styles.singleTextInput}
                  onChangeText={(confermaPassword) => {
                    setConfermaPassword(confermaPassword);
                  }}
                  theme={theme}
                />
              </View>
            </View>
            <View style={styles.guidaView}>
              <View style={styles.ButtonContainer}>
                <CustomButton
                  styleBtn={{ width: "100%", marginRight: "15%" }}
                  nome={"Indietro"}
                  onPress={() => { scrollRef.current.scrollTo({ x: 0 }) }} />
              </View>
              <View style={styles.ButtonContainer}>
                <CustomButton
                  styleBtn={{ width: "100%", marginLeft: "15%" }}
                  nome={"Avanti"}
                  onPress={
                    () => {
                      scrollRef.current.scrollTo({ x: (Dimensions.get('window').width) * 2 });
                    }} />
              </View>
            </View>
          </View>
          <View style={styles.page}>
            <View style={styles.singolaView}>
              <View style={styles.titoloView}>
                <Text style={styles.singleText}>
                  Residenza
            </Text>
              </View>
              <View style={styles.viewCampi}>
                <TextInput
                  mode='outlined'
                  label='Via'
                  disabledInputStyle={{ color: "black" }}
                  style={styles.singleTextInput}
                  editable={IsEditable}
                  value={via}
                  onChangeText={(via) => setVia(via)}
                  theme={theme} />

                <TextInput
                  mode='outlined'
                  label='Città'
                  disabledInputStyle={{ color: "black" }}
                  editable={IsEditable}
                  value={citta}
                  style={styles.singleTextInput}
                  onChangeText={(citta) => setCitta(citta)}
                  theme={theme}
                />

                <TextInput
                  mode='outlined'
                  label='Provincia'
                  disabledInputStyle={{ color: "black" }}
                  editable={IsEditable}
                  value={provincia}
                  style={styles.singleTextInput}
                  onChangeText={(provincia) => setProvincia(provincia)}
                  theme={theme}
                />

                <TextInput
                  mode='outlined'
                  label='Regione'
                  disabledInputStyle={{ color: "black" }}
                  editable={IsEditable}
                  style={styles.singleTextInput}
                  onChangeText={(regione) => setRegione(regione)}
                  theme={theme}
                />

                <TextInput
                  mode='outlined'
                  label='CAP'
                  disabledInputStyle={{ color: "black" }}
                  editable={IsEditable}
                  style={styles.singleTextInput}
                  onChangeText={(cap) => setCAP(cap)}
                  theme={theme}
                  keyboardType={'numeric'}
                  maxLength={5}
                />
              </View>
            </View>
            <View style={styles.guidaView}>
              <View style={styles.ButtonContainer}>
                <CustomButton
                  styleBtn={{ width: "100%", marginRight: "15%" }}
                  nome={"Indietro"}
                  onPress={() => { scrollRef.current.scrollTo({ x: (Dimensions.get('window').width) }) }} />
              </View>
              <View style={styles.ButtonContainer}>
                <CustomButton
                  styleBtn={{ width: "100%", marginLeft: "15%" }}
                  nome={"Avanti"}
                  onPress={() => { scrollRef.current.scrollTo({ x: (Dimensions.get('window').width) * 4 }) }} />
              </View>
            </View>
          </View>
          <View style={styles.page}>
            <View style={styles.singolaView}>
              <View style={styles.titoloView}>
                <Text style={styles.singleText}>
                  Pagamenti
            </Text>
              </View>
              <View
                style={[styles.viewCampi, { paddingBottom: "15%" }]}>
                <TextInput
                  mode='outlined'
                  label='Numero Carta'
                  disabledInputStyle={{ color: "black" }}
                  style={styles.singleTextInput}
                  editable={IsEditable}
                  value={numCarta}
                  onChangeText={(numCarta) => setNumeroCarta(numCarta)}
                  theme={theme}
                  keyboardType={'numeric'} 
                  maxLength={16}
                />

                <DatePickerInputField
                  styleContainer={{ marginBottom: "3%" }}
                  styleField={{ width: "82%" }}
                  date={(dateScadenza === "") ? "" : (new Date(dateScadenza).toDateString("it-IT"))}
                  setDate={setDateScadenza}
                  placeholder={"Data scadenza"}
                  disabled={!IsEditable}
                />

                <TextInput
                  mode='outlined'
                  label='CCV'
                  disabledInputStyle={{ color: "black" }}
                  editable={IsEditable}
                  value={ccv}
                  style={styles.singleTextInput}
                  onChangeText={(ccv) => setCCV(ccv)}
                  maxLength={3}
                  theme={theme}
                />

                <TextInput
                  mode='outlined'
                  label='Intestatario'
                  disabledInputStyle={{ color: "black" }}
                  editable={IsEditable}
                  style={styles.singleTextInput}
                  onChangeText={(intestatario) => setIntestatario(intestatario)}
                  theme={theme}
                />

              </View>
            </View>

            <View style={styles.guidaView}>
              <View style={styles.ButtonContainer}>
                <CustomButton
                  styleBtn={{ width: "100%", marginLeft: "15%", marginRight: "10%" }}
                  nome={"Torna all'inizio"}
                  onPress={() => { scrollRef.current.scrollTo({ x: 0 }) }} />
              </View>
            </View>
          </View>
        </ScrollView>
      </ScrollView>
      <CustomAlertGeneral
        visibility={showAlertErrorField}
        titolo="Modifica profilo"
        testo= {messageAlert}
        hideNegativeBtn={true}
        buttonName="Ok"
        onOkPress={()=>{
				  setShowAlertErrorField(false);  
        }} />
      <CustomAlertGeneral
        visibility={updateSuccess}
        titolo="Modifica profilo"
        testo= "I dati sono stati modificati con successo!"
        hideNegativeBtn={true}
        buttonName="Ok"
        onOkPress={()=>{
				  setUpdateSuccess(false);
          navigation.goBack();  
        }} />
    </View>
  );
}

export default Modifica_profilo;
