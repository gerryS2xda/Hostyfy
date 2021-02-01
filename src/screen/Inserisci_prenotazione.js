import React, { useState, useCallback, useRef } from 'react'
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native'
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from "../components/CustomButton";
import DatePickerInputField from "../components/DatePickerInputField";
import * as PrenotazioneModel from "../firebase/datamodel/PrenotazioneModel";
import * as StrutturaModel from "../firebase/datamodel/StrutturaModel";
import * as AlloggioModel from "../firebase/datamodel/AlloggioModel";
import * as GuestModel from "../firebase/datamodel/GuestModel";
import * as CleanServiceModel from "../firebase/datamodel/CleanServiceModel";
import { Dropdown } from 'sharingan-rn-modal-dropdown';
import { DefaultTheme } from '@react-navigation/native';

//npm install react-native-picker-select per la combo box

const styles = StyleSheet.create({

	maincontainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	bodyScrollcontainer: {
		width: "100%",
	},
	scrollContent: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	topContainer: {
		//paddingHorizontal: 10,
		width: "90%",
		borderColor: '#e4eded',
		borderRadius: 25,
		borderWidth: 2,
		marginTop: "5%",
		paddingHorizontal: "5%",
		paddingTop: "4%",
		paddingBottom: "5%",
		justifyContent: "center"

	},
	middleUpperContainer: {
		marginTop: "5%",
		width: "85%"
	},
	normalContainer: {
		width: "85%",
	},


	middleLowerContainer: {
		flex: 1,
		marginTop: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',

	},

	bottomContainer: {
		marginTop: "15%",
		marginBottom: 30,
		width: "90%"
	},

	singleTextInput: {
		height: 45,
		width: "100%",
		borderColor: '#303a52',
		borderWidth: 1,
		marginTop: "4%",
		fontFamily: "MontserrantSemiBold",
		paddingLeft: 9,
		borderRadius: 25,
	},

	middleTextInput: {
		height: 45,
		width: "45%",
		borderColor: '#303a52',
		borderWidth: 1,
		borderRadius: 25,
		fontFamily: "MontserrantSemiBold",
		paddingLeft: 10
	},
	dropdownStyle: {
		fontFamily: "MontserrantSemiBold"
	},

	viewContainer:{
		width: "90%",
		marginTop: "3%",
		flex:1,
		justifyContent: 'center',
		alignItems: "center",
		borderColor: '#e4eded',
		borderRadius: 25,
		borderWidth: 2,
	}

})


const Inserisci_prenotazione = ({ route, navigation }) => {

	//Dichiarazione variabili
	const { user } = route.params;
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
			async function getStruttureData() {
				var itemList = [];
				var struttureDocs = await StrutturaModel.getStruttureOfAHostQuery(user.userIdRef);
				if (struttureDocs.length == 0) {
					setStruttureList(itemList);
				} else {
					for (const doc of struttureDocs) {
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
			async function getCleanServiceData() {
				var itemList = [];
				//Attendi finche' non ottieni tutte le ditte di clean service associate a quell'host
				var cleanServiceDocs = await CleanServiceModel.getCleanServiceByHost(user.userIdRef);
				if (cleanServiceDocs.length == 0) {
					setCleanServiceList(itemList);
				} else {
					for (const doc of cleanServiceDocs) {
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
		async function getAlloggiData() {
			var itemList = [];

			//Attendi finche' non ottiene tutti gli alloggi di una struttura
			var alloggiDocs = await AlloggioModel.getAllAlloggiOfStruttura(value);

			if (alloggiDocs.length == 0) {
				setAlloggiList(itemList);
			} else {
				for (const doc of alloggiDocs) {
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

	return (
		<View style={styles.maincontainer}>
			<HeaderBar title="Nuova prenotazione" navigator={navigation} />
			<ScrollView
				style={styles.bodyScrollcontainer}
				contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>

				<View style={styles.topContainer}>
					<Dropdown
						textInputStyle={{ fontFamily: "MontserrantSemiBold" }}
						itemTextStyle={{ fontFamily: "MontserrantSemiBold" }}
						selectedItemViewStyle={{ fontFamily: "MontserrantSemiBold" }}
						borderRadius={20}
						style={styles.dropdownStyle}
						label={"Struttura"}
						data={struttureList}
						enableSearch
						value={strutturaId}
						onChange={onChangeStrutturaDropDown}
					/>
					<Dropdown
						textInputStyle={{ fontFamily: "MontserrantSemiBold" }}
						itemTextStyle={{ fontFamily: "MontserrantSemiBold" }}
						selectedItemViewStyle={{ fontFamily: "MontserrantSemiBold" }}
						mainContainerStyle={{ fontFamily: "MontserrantSemiBold" }}
						borderRadius={10}
						label="Alloggio"
						style={styles.dropdownStyle}
						data={alloggiList}
						enableSearch
						disabled={isAlloggioDropDisabled}
						value={alloggioId}
						onChange={onChangeAlloggioDropDown}
					/>
					<Dropdown
						textInputStyle={{ fontFamily: "MontserrantSemiBold" }}
						itemTextStyle={{ fontFamily: "MontserrantSemiBold" }}
						selectedItemViewStyle={{ fontFamily: "MontserrantSemiBold" }}
						mainContainerStyle={{ fontFamily: "MontserrantSemiBold" }}
						borderRadius={10}
						style={styles.dropdownStyle}
						label="Ditta di pulizia"
						data={cleanServiceList}
						enableSearch
						disabled={isCleanServiceDropDisabled}
						value={cleanServiceId}
						onChange={onChangeCleanServiceDropDown}
					/>
				</View>
				<View style={styles.viewContainer}>
					<View style={styles.middleUpperContainer}>
						<DatePickerInputField  //data inizio
							styleContainer={{ borderColor: '#303a52', borderRadius: 25 }}
							styleField={{ width: "85%" }}
							date={(dateStart == "") ? ""  : (new Date(dateStart)).toLocaleString("it-IT")}
							placeholder={"Data di inizio"}
							setDate={setDateStart}
							disabled={false}
							dateMode={"datetime"}
						/>
						<DatePickerInputField  //data fine 
							styleContainer={{ borderColor: '#303a52', borderRadius: 25, marginTop: 14 }}
							styleField={{ width: "85%" }}
							date={(dateEnd == "") ? "" : (new Date(dateEnd)).toLocaleString("it-IT")}
							setDate={setDateEnd}
							placeholder={"Data di fine"}
							disabled={false}
							dateMode={"datetime"}
						/>
					</View>
					<View style={styles.middleLowerContainer}>
						<TextInput
							ref={numPersRef}
							style={[styles.middleTextInput, { width: "40%", marginRight: "4%" }]}
							placeholder="N. persone"
							onChangeText={(numPers) => setNumeroPersone(numPers)}
							keyboardType={'numeric'}
						/>
						<TextInput
							ref={costoRef}
							style={[styles.middleTextInput, { width: "40%" }]}
							placeholder="Costo"
							onChangeText={(costo) => setCosto(costo)}
							keyboardType={'numeric'}
						/>
					</View>
					<View style={styles.normalContainer}>
						<TextInput
							ref={numTelRef}
							style={[styles.singleTextInput, { width: "100%" }]}
							placeholder="N. telefono"
							onChangeText={(numTel) => setNumTelefono(numTel)}
							keyboardType={'numeric'}
						/>
						<TextInput
							ref={emailRef}
							style={styles.singleTextInput}
							placeholder="Email dell'ospite"
							onChangeText={(email) => setEmail(email)}
						/>
					</View>
					<View style={styles.bottomContainer}>
						<CustomButton
							nome="Inserisci"
							disabled={disableInsertPrenButton}
							styleBtn={{ width: "100%"}}
							onPress={() => {
								async function carica() {
									if (!validateFormField(strutturaId, alloggioId, cleanServiceId, numTel, numPers, email, costo, dateStart, dateEnd)) {
										return;
									}

									var dataOdierna = new Date();
									var newDateStart = new Date(dateStart);
									var newDateEnd = new Date(dateEnd);

									if (newDateStart < dataOdierna) {
										Alert.alert(
											"Data non valida",
											"Non puoi inserire una prenotazione con data di inizio antecedente alla data odierna!",
											[
												{ text: "OK", onPress: () => console.log("OK Pressed") }
											],
											{ cancelable: false }
										);
										return;
									}
									if (newDateEnd < dataOdierna) {
										Alert.alert(
											"Data non valida",
											"Non puoi inserire una prenotazione con data di fine antecedente alla data odierna!",
											[
												{ text: "OK", onPress: () => console.log("OK Pressed") }
											],
											{ cancelable: false }
										);
										return;
									}
									if (newDateEnd < newDateStart) {
										Alert.alert(
											"Data non valida",
											"Non puoi inserire una prenotazione con data di inizio antecedente alla data di fine!",
											[
												{ text: "OK", onPress: () => console.log("OK Pressed") }
											],
											{ cancelable: false }
										);
										return;
									}

									async function checkInterleaved(newDateStart, newDateEnd) {
										console.log(newDateEnd);
										console.log(newDateStart);
										//controlliamo che non si sovrapponga con una prenotazione gia esistente
										let prenotazioni = await PrenotazioneModel.getPrenotazioniAttualiHostQueryAlloggio(user.userIdRef, new Date(), alloggioId);

										console.log(prenotazioni.length)
										for (const doc of prenotazioni) {
											var pren = doc.data();
											var prenStart = new Date(pren.dataInizio.seconds * 1000);
											var prenEnd = new Date(pren.dataFine.seconds * 1000);
											console.log(prenStart);
											if ((newDateStart >= prenStart) && (newDateStart <= prenEnd)) {
												console.log("hello");
												return true;
											}
											else if ((newDateEnd >= prenStart) && (newDateEnd <= prenEnd)) {
												console.log("ciao");
												return true;
											}
										}
										return false;
									}

									let interleaved = await checkInterleaved(newDateStart, newDateEnd);
									if (interleaved) {
										Alert.alert(
											"Data non valida",
											"Questo alloggio è già occupato nelle date selezionate!",
											[
												{ text: "OK", onPress: () => console.log("OK Pressed") }
											],
											{ cancelable: false }
										);
										return;
									}

									setInsertPrenButtonStatus(true); //rendi pulsante non cliccabile se e' stato fatto un primo click

									// Ottieni riferimento dell'utente guest
									async function createAndSavePrenotazione() {

										// Ottieni riferimento dell'utente guest mediante l'email
										var guestDocs = await GuestModel.getGuestDocumentByEmail(email);
										if (guestDocs.length == 0) {
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
										} else {
											for (const doc of guestDocs) {
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
								}
								carica();
							}

							}
						/>
					</View>
					</View>
			</ScrollView>
		</View>
	);
}

export default Inserisci_prenotazione;

//funzione per verificare che tutti i campi siano stati inseriti (controllo generale)
function validateFormField(strutturaId, alloggioId, cleanServiceId, numTel, numPers, email, costo, dateStart, dateEnd) {

	var flag = true; //tutti i campi sono compilati
	var message = "Attenzione!! Uno dei campi obbligatori non è compilato. Il campo non compilato è ";
	if (strutturaId === "") {
				message += "\"Struttura\"";
		flag = false;
	} else if (alloggioId === "") {
				message += "\"Alloggio\"";
		flag = false;
	} else if (cleanServiceId === "") {
				message += "\"Ditta di pulizia\"";
		flag = false;
	} else if (numTel === "" || numTel == 0) {
				message += "\"N. telefono\"";
		flag = false;
	} else if (numPers === "" || numPers == 0) {
				message += "\"N. persone\"";
		flag = false;
	} else if (email === "") {
				message += "\"Email dell'ospite\"";
		flag = false;
	} else if (costo === "" || costo == 0) {
				message += "\"Costo\"";
		flag = false;
	} else if (dateStart === "") {
				message += "\"Data di inizio\"";
		flag = false;
	} else if (dateEnd === "") {
				message += "\"Data di fine\"";
		flag = false;
	}
	if (!flag) {
				Alert.alert("Nuova prenotazione", message,
					[{ text: "Cancel", style: "cancel" },
					{ text: "OK" }],
					{ cancelable: false });
	}
	return flag;
}