import React, { useState, useCallback, useRef } from 'react'
import {View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native'
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from "../components/CustomButton";
import DatePickerInputField from "../components/DatePickerInputField";
import * as PrenotazioneModel from "../firebase/datamodel/PrenotazioneModel"; 
import * as StrutturaModel from "../firebase/datamodel/StrutturaModel";
import * as AlloggioModel from "../firebase/datamodel/AlloggioModel";
import * as GuestModel from "../firebase/datamodel/GuestModel";
import * as CleanServiceModel from "../firebase/datamodel/CleanServiceModel";
import {Dropdown} from 'sharingan-rn-modal-dropdown';

//npm install react-native-picker-select per la combo box

const styles = StyleSheet.create({
	maincontainer: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center'
	},
	bodyScrollcontainer: {
		width: "100%",
	},
	scrollContent: {
        marginLeft:32,
        marginRight:32,
    },
	topContainer: {
		width: "100%",
		marginTop: 32,
	},
	normalContainer: {
		width: "100%",
	},
	middleUpperContainer: {
		marginTop: 16, 
	},

	middleLowerContainer: {
		marginTop: 16, 
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	bottomContainer: {
		marginTop: "15%",
		marginBottom: 30,
	},

	singleTextInput: {
		height: 40,
		width:"100%",
		borderColor: '#cc3881',
		borderBottomWidth: 1,
		marginTop: 16,
		fontFamily: "MontserrantSemiBold",
		paddingLeft: 9
	  },

	  middleTextInput: {
		height: 40,
		width:"45%",
		borderColor: '#cc3881',
		borderBottomWidth: 1,
		fontFamily: "MontserrantSemiBold",
    	paddingLeft: 9
	  },
})


const Inserisci_prenotazione = ({route, navigation}) => {
	
	//Dichiarazione variabili
	const {user} = route.params;
	const [strutturaId, setStrutturaId] = useState('');
	const [struttureList, setStruttureList] = useState([]);
	const [isAlloggioDropDisabled, setAlloggioDropDisabled] = useState(true);
	const [isCleanServiceDropDisabled, setCleanServiceDropDisabled] = useState(true);
	const [alloggiList, setAlloggiList] = useState([]);
	const [alloggioId, setAlloggioId] = useState('');
	const [cleanServiceId, setCleanServiceId] = useState('');
	const [cleanServiceList, setCleanServiceList] = useState([]);
	const [numTel, setNumTelefono] = useState(0);
	const [numPers, setNumeroPersone] = useState(0);
	const [email, setEmail] = useState('');
	const [costo, setCosto] = useState(0);
	const [dateStart, setDateStart] = useState("");
	const [dateEnd, setDateEnd] = useState("");
	const [disableInsertPrenButton, setInsertPrenButtonStatus] = useState(false); //per prevenire doppio click che comporta doppio inserimento
	const isFocused = useIsFocused();

	//Variabili per 'useRef'
	const alloggioRef = useRef();
	const numTelRef = useRef(null);
	const numPersRef = useRef(null);
	const emailRef = useRef(null);
	const costoRef = useRef(null);

	//Caricamento dei dati non appena inizia il rendering dell'applicazione
	useFocusEffect(
        useCallback(() => {
          // Do something when the screen is focused
			async function getStruttureData(){
				var itemList = [];
				var struttureDocs = await StrutturaModel.getStruttureOfAHostQuery(user.userIdRef);
				if(struttureDocs.length == 0){
					setStruttureList(itemList);
				}else{
					for(const doc of struttureDocs){
						var struttura = doc.data();
						var oggetto = {
							value: doc.id, 
							label: struttura.denominazione,
						}
						itemList.push(oggetto);
					}
					setStruttureList(itemList);
				}
			}
			async function getCleanServiceData(){
				var itemList = [];
				//Attendi finche' non ottieni tutte le ditte di clean service associate a quell'host
				var cleanServiceDocs = await CleanServiceModel.getCleanServiceByHost(user.userIdRef); 
				if(cleanServiceDocs.length == 0){
					setCleanServiceList(itemList);
				}else{
					for(const doc of cleanServiceDocs){
						var cleanService = doc.data();
						var oggetto = {
							value: doc.id, 
							label: cleanService.ditta,
						}
						itemList.push(oggetto);
					}
					setCleanServiceList(itemList);
				}
			}
			getStruttureData();
			getCleanServiceData();
          return () => {
            // Do something when the screen is unfocused
            // Useful for cleanup functions
          };
        }, [isFocused])
      );

	//Caricamento dei dati relativi ad un alloggio non appena viene scelta una struttura
	const onChangeStrutturaDropDown = (value) => {
		setStrutturaId(value);
		setAlloggioId(""); //resetta campo alloggio
		setAlloggioDropDisabled(true); 
		setCleanServiceId(""); //resetta campo cleanservice
		setCleanServiceDropDisabled(true); 
		async function getAlloggiData(){
			var itemList = [];
			
			//Attendi finche' non ottiene tutti gli alloggi di una struttura
			var alloggiDocs = await AlloggioModel.getAllAlloggiOfStruttura(value);

			if(alloggiDocs.length == 0){
				setAlloggiList(itemList);
			}else{
				for(const doc of alloggiDocs){
					var alloggio = doc.data();
					var oggetto = {
						value: doc.id, 
						label: alloggio.nomeAlloggio
					}
					itemList.push(oggetto);
				}
				setAlloggiList(itemList);
				setAlloggioDropDisabled(false);
			}
		}
		getAlloggiData();
	};
	
	const onChangeAlloggioDropDown = (value) => {
		setAlloggioId(value);
		setCleanServiceDropDisabled(false);
	};

	const onChangeCleanServiceDropDown = (value) => {
		setCleanServiceId(value);
	};
	
  	return(
	<View style={styles.maincontainer}>
		<HeaderBar title="Nuova prenotazione" navigator={navigation} />
		<ScrollView style={styles.bodyScrollcontainer}>
            <View style={styles.scrollContent}> 
				<View style = {styles.topContainer}>
					<Dropdown
						label="Struttura"
						data={struttureList}
						enableSearch
						value={strutturaId}
						onChange={onChangeStrutturaDropDown}
					/>
					<Dropdown
						label="Alloggio"
						data={alloggiList}
						enableSearch
						disabled={isAlloggioDropDisabled}
						value={alloggioId}
						onChange={onChangeAlloggioDropDown}
					/>
					<Dropdown
						label="Ditta di pulizia"
						data={cleanServiceList}
						enableSearch
						disabled={isCleanServiceDropDisabled}
						value={cleanServiceId}
						onChange={onChangeCleanServiceDropDown}
					/>
				</View>
				<View style = {styles.middleUpperContainer}>
						<DatePickerInputField  //data inizio
							styleContainer={{marginTop: 0, marginLeft: -5}}
							styleField={{width: "85%"}} 
							date={dateStart} 
							placeholder={"Data di inizio"}
							setDate={setDateStart} 
							disabled={false}
							dateMode={"datetime"}
						/>
						<DatePickerInputField  //data fine 
							styleContainer={{marginTop: 16, marginLeft: -5}}
							styleField={{width: "85%"}}
							date={dateEnd} 
							setDate={setDateEnd} 
							placeholder={"Data di fine"}
							disabled={false}
							dateMode={"datetime"}
						/>
				</View>
				<View style = {styles.middleLowerContainer}>
					<TextInput
						ref = {numPersRef}
						style = {[styles.middleTextInput, {width: "35%"}]}
						placeholder = "N. persone"
						onChangeText = {(numPers) => setNumeroPersone(numPers)}
					/>
					<TextInput
						ref = {numTelRef}
						style = {[styles.middleTextInput, {width: "55%"}]}
						placeholder = "N. telefono"
						onChangeText = {(numTel) => setNumTelefono(numTel)}
					/>
				</View>
				<View style={styles.normalContainer}>
					<TextInput
						ref = {costoRef}
						style = {styles.singleTextInput}
						placeholder = "Costo"
						onChangeText = {(costo) => setCosto(costo)}
					/>
				</View>
				<View style={styles.normalContainer}>
					<TextInput
						ref = {emailRef}
						style = {styles.singleTextInput}
						placeholder = "Email dell'ospite"
						onChangeText = {(email) => setEmail(email)}
					/>
				</View>
				<View style = {styles.bottomContainer}>
					<CustomButton 
						nome="Inserisci" 
						disabled = {disableInsertPrenButton}
						styleBtn={{width: "100%"}}
						onPress={()=>{ 
							if(!validateFormField(strutturaId, alloggioId, cleanServiceId, numTel, numPers, email, costo, dateStart, dateEnd)){
								return;
							}
							

							setInsertPrenButtonStatus(true); //rendi pulsante non cliccabile se e' stato fatto un primo click

							// Ottieni riferimento dell'utente guest
							async function createAndSavePrenotazione(){
								
								// Ottieni riferimento dell'utente guest mediante l'email
								var guestDocs = await GuestModel.getGuestDocumentByEmail(email);
								if(guestDocs.length == 0){
									Alert.alert(
										"Nuova prenotazione",
										"Non è possibile memorizzare la nuova prenotazione perche' l'utente non utilizza Hostyfy!",
										[
											{
											text: "Cancel",
											onPress: () => console.log("Cancel Pressed"),
											style: "cancel"
											},
											{ text: "OK", onPress: () => navigation.navigate('HomeHost') }
										],
										{ cancelable: false }
									);
								}else{
									for(const doc of guestDocs){
										var guest = doc.data();
										await PrenotazioneModel.createPrenotazioniDocument(user.userIdRef, guest.userId, strutturaId, alloggioId, dateStart, dateEnd, email, numPers, numTel, costo, cleanServiceId);
										
										//Resetta i campi
										numTelRef.current.clear();  
										numPersRef.current.clear();
										costoRef.current.clear();
										emailRef.current.clear();
										setDateStart("");
										setDateEnd("");
										setStrutturaId("");
										setAlloggioId("");
										setCleanServiceId("");
										setAlloggioDropDisabled(true);
										

										Alert.alert(
											"Nuova prenotazione",
											"La nuova prenotazione e' stata memorizzata con successo!",
											[
												{
												text: "Cancel",
												onPress: () => console.log("Cancel Pressed"),
												style: "cancel"
												},
												{ text: "OK", onPress: () => navigation.navigate('HomeHost') }
											],
											{ cancelable: false }
										);
									}
								}
								setInsertPrenButtonStatus(false); //rendi pulsante nuovamente cliccabile
							}
							createAndSavePrenotazione();
						}} 
					/>
				</View>
			</View>
		</ScrollView>
	</View>
  );
}

export default Inserisci_prenotazione;

//funzione per verificare che tutti i campi siano stati inseriti (controllo generale)
function validateFormField (strutturaId, alloggioId, cleanServiceId, numTel, numPers, email, costo, dateStart, dateEnd){

	var flag = true; //tutti i campi sono compilati
	var message = "Attenzione!! Uno dei campi obbligatori non è compilato. Il campo non compilato è ";
	if(strutturaId === ""){
		message += "\"Struttura\"";
		flag = false;
	}else if(alloggioId === ""){
		message += "\"Alloggio\"";
		flag = false;
	}else if(cleanServiceId === ""){
		message += "\"Ditta di pulizia\"";
		flag = false;
	}else if(numTel === "" || numTel == 0){
		message += "\"N. telefono\"";
		flag = false;
	}else if(numPers === "" || numPers == 0){
		message += "\"N. persone\"";
		flag = false;
	}else if(email === ""){
		message += "\"Email dell'ospite\"";
		flag = false;
	}else if(costo === "" || costo == 0){
		message += "\"Costo\"";
		flag = false;
	}else if(dateStart === ""){
		message += "\"Data di inizio\"";
		flag = false;
	}else if(dateEnd === ""){
		message += "\"Data di fine\"";
		flag = false;
	}
	if(!flag){
		Alert.alert("Nuova prenotazione", message,
					[{ text: "Cancel", style: "cancel"},
					{ text: "OK" }],
					{ cancelable: false });
	}
	return flag;
}