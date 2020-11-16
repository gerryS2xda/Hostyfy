import React, { useState } from 'react'
import {View, Text, TextInput, StyleSheet,TouchableOpacity, ScrollView, Alert } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from "../components/CustomButton";
import DatePickerInputField from "../components/DatePickerInputField";

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
		marginTop: "70%",
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


const Inserisci_prenotazione = (props) => {

	const [struttura, setStruttura] = useState(null);
	const [alloggio, setAlloggio] = useState('Alloggio');
	const [dateStart, setDateStart] = useState(new Date());
	const [dateEnd, setDateEnd] = useState(new Date());
	
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
          { text: "OK", onPress: () => props.navigation.navigate('HomeHost') }
      ],
      { cancelable: false }
	);
	
  	return(
	<View style={styles.maincontainer}>
		<HeaderBar title="Inserisci prenotazione" navigator={props.navigation} />
		<ScrollView style={styles.bodyScrollcontainer}>
            <View style={styles.scrollContent}> 
				<View style = {styles.topContainer}>
					<RNPickerSelect
						style = {pickerStyle}
						onValueChange = {(struttura) => {setStruttura(struttura);console.log(struttura);}}
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
						onValueChange = {() => {}}
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
					/>
					<TextInput
						style = {styles.singleTextInput}
						placeholder = "Cognome"
					/>
				</View>
				<View style = {styles.middleUpperContainer}>
						<DatePickerInputField  //data inizio
							styleContainer={{marginTop: 0, marginLeft: -5}}
							styleField={{width: "85%"}} 
							date={dateStart} 
							setDate={setDateStart} 
							disabled={false}
						/>
						<DatePickerInputField  //data fine 
							styleContainer={{marginTop: 16, marginLeft: -5}}
							styleField={{width: "85%"}}
							date={dateEnd} 
							setDate={setDateEnd} 
							disabled={false}
						/>
				</View>
				<View style = {styles.middleLowerContainer}>
					<TextInput
						style = {[styles.middleTextInput, {width: "35%"}]}
						placeholder = "N. persone"
					/>
					<TextInput
						style = {[styles.middleTextInput, {width: "55%"}]}
						placeholder = "N. telefono"
					/>
				</View>
				<View style={styles.normalContainer}>
					<TextInput
						style = {styles.singleTextInput}
						placeholder = "Email"
					/>
				</View>
				<View style = {styles.bottomContainer}>
					<CustomButton 
						nome="Inserisci" 
						styleBtn={{width: "100%"}}
						onPress={createPositiveAlert} 
					/>
				</View>
			</View>
		</ScrollView>
	</View>
  );
}

export default Inserisci_prenotazione