import React, { useState } from 'react'
import {View, Text, TextInput, StyleSheet,TouchableOpacity, ScrollView, Alert } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from "../components/CustomButton";
import DatePickerInputField from "../components/DatePickerInputField";
import * as PrenotazioneModel from "../firebase/datamodel/PrenotazioneModel"; 

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
		marginTop: "40%",
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
	const {user} = route.params;
	const [struttura, setStruttura] = useState('');
	const [alloggio, setAlloggio] = useState('');
	const [nome, setNome] = useState('');
	const [cognome, setCognome] = useState('');
	const [numTel, setNumTelefono] = useState(0);
	const [numPers, setNumeroPersone] = useState(0);
	const [email, setEmail] = useState('');
	const [costo, setCosto] = useState(0);
	const [dateStart, setDateStart] = useState("");
	const [dateEnd, setDateEnd] = useState("");
	
	const pickerStyle = {
		inputIOS: {
			paddingHorizontal: 10,
			borderBottomWidth: 1,
			borderColor: '#cc3881',
			height:40,
			width:"100%",
			alignItems: 'center',
			marginTop: 16,
			fontFamily: "MontserrantSemiBold",
			paddingLeft: 9,
		},
		placeholder: {
			fontFamily: "MontserrantSemiBold",
			paddingLeft: 9,
		  },
		inputAndroid: {
			paddingHorizontal: 10,
			borderBottomWidth: 1,
			borderColor: '#cc3881',
			height:40,
			width:"100%",
			alignItems: 'center',
			color:'#000000',
			marginTop: 16,
			fontFamily: "MontserrantSemiBold",
			paddingLeft: 9,
		},
	};

	const createPositiveAlert = () =>
      Alert.alert(
      "Inserisci prenotazione",
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

	const createNegativeAlert = (msgError) =>
      Alert.alert(
      "Inserisci prenotazione", msgError,
      [
          {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
          },
          { text: "OK", onPress: () => console.log("Ok Pressed") }
      ],
      { cancelable: false }
	);
	
  	return(
	<View style={styles.maincontainer}>
		<HeaderBar title="Inserisci prenotazione" navigator={navigation} />
		<ScrollView style={styles.bodyScrollcontainer}>
            <View style={styles.scrollContent}> 
				<View style = {styles.topContainer}>
					<RNPickerSelect
						style = {pickerStyle}
						onValueChange = {(struttura) => {setStruttura(struttura);}}
						value={struttura}
						placeholder = {{
							label: 'Struttura',
							value: "Struttura",
						}}
						items={[
							{ label: 'Posillipo', value: 'Posillipo' },
							{ label: 'Margellina', value: 'Margellina' },
						]}
						useNativeAndroidPickerStyle={false}
					/>
					<RNPickerSelect	
						style = {pickerStyle}
						onValueChange = {(alloggio) => {setAlloggio(alloggio);}}
						value={alloggio}
						placeholder = {{
							label: 'Alloggio',
							value: "Alloggio",
						}}
						items={[
							{ label: 'Mare chiaro', value: 'Mare chiaro' },
							{ label: 'Vietri', value: 'Vietri' },
						]}
						
						useNativeAndroidPickerStyle={false}
					/>
					<TextInput
						style = {styles.singleTextInput}
						placeholder = "Nome"
						onChangeText = {(nome) => setNome(nome)}
					/>
					<TextInput
						style = {styles.singleTextInput}
						placeholder = "Cognome"
						onChangeText = {(cognome) => setCognome(cognome)}
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
						/>
						<DatePickerInputField  //data fine 
							styleContainer={{marginTop: 16, marginLeft: -5}}
							styleField={{width: "85%"}}
							date={dateEnd} 
							setDate={setDateEnd} 
							placeholder={"Data di fine"}
							disabled={false}
						/>
				</View>
				<View style = {styles.middleLowerContainer}>
					<TextInput
						style = {[styles.middleTextInput, {width: "35%"}]}
						placeholder = "N. persone"
						onChangeText = {(numPers) => setNumeroPersone(numPers)}
					/>
					<TextInput
						style = {[styles.middleTextInput, {width: "55%"}]}
						placeholder = "N. telefono"
						onChangeText = {(numTel) => setNumTelefono(numTel)}
					/>
				</View>
				<View style={styles.normalContainer}>
					<TextInput
						style = {styles.singleTextInput}
						placeholder = "Costo"
						onChangeText = {(costo) => setCosto(costo)}
					/>
				</View>
				<View style={styles.normalContainer}>
					<TextInput
						style = {styles.singleTextInput}
						placeholder = "Email"
						onChangeText = {(email) => setEmail(email)}
					/>
				</View>
				<View style = {styles.bottomContainer}>
					<CustomButton 
						nome="Inserisci" 
						styleBtn={{width: "100%"}}
						onPress={()=>{
							PrenotazioneModel.createPrenotazioniDocument(costo, dateStart, dateEnd, email, numPers, numTel, struttura, alloggio, "chiave" + alloggio, user.userId);
							createPositiveAlert();
							//createNegativeAlert("Impossibile memorizzare la prenotazione!!");
						}} 
					/>
				</View>
			</View>
		</ScrollView>
	</View>
  );
}

export default Inserisci_prenotazione