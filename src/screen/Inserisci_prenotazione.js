import React, { useState } from 'react'
import {View, Text, Image, TextInput, Button, StyleSheet,TouchableOpacity, Platform } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import HeaderBar from '../components/CustomHeaderBar'


//npm install react-native-picker-select per la combo box

const styles = StyleSheet.create({
	maincontainer: {
		backgroundColor: '#fff',
		justifyContent: 'flex-start',
		alignItems: 'center'
	  },
	  
	container: {
		
		justifyContent: 'center',
		alignItems: 'center'
	},

	emptyContainer: {
		height:100
	},


	topContainer: {
		height:200,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	middleUpperContainer: {
		height:60,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	middleLowerContainer: {
		height:50,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	bottomContainer: {
		height:300,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},

	singleTextInput: {
		height: 40,
		width:300,
		borderColor: '#cc3881',
		borderWidth: 1.4,
		borderRadius: 8,
	  },

	  rightTextInput: {
		height: 40,
		width:130,
		borderColor: '#cc3881',
		borderWidth: 1.4,
		borderRadius: 8,
		marginLeft:20,
	  },

	  leftTextInput: {
		height: 40,
		width:130,
		borderColor: '#cc3881',
		borderWidth: 1.4,
		borderRadius: 8,
		marginRight:20,
	  },

	  bottone : {
		borderWidth: 1,
		width:300,
		height:40,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius:8,
		backgroundColor: '#f2077d',
		marginTop:30
	  },
})


const Inserisci_prenotazione = (props) => {

	const [struttura, setStruttura] = useState(null);
	const [alloggio, setAlloggio] = useState('Alloggio');
	
	const pickerStyle = {
		inputIOS: {
			paddingHorizontal: 10,
			borderRadius: 8,
			borderWidth:1.4,
			borderColor: '#cc3881',
			height:40,
			width:300,
			alignItems: 'center',
			
		},
		placeholder: {
			
		  },
		inputAndroid: {
			paddingHorizontal: 10,
			borderRadius: 8,
			borderWidth:1.4,
			borderColor: '#cc3881',
			height:40,
			width:300,
			alignItems: 'center',
			color:'#000000'
		},
	};
  return(
	<View style={styles.maincontainer}>
		<HeaderBar title="Inserisci prenotazione" navigator={props.navigation} />
		<View style = {styles.container}>
			<View style = {styles.emptyContainer}>

			</View>
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
				<TextInput
					style = {styles.leftTextInput}
					placeholder = "Data inizio"
				/>
				<TextInput
					style = {styles.rightTextInput}
					placeholder = "Data fine"
				/>
			</View>
			<View style = {styles.middleLowerContainer}>
				<TextInput
					style = {styles.leftTextInput}
					placeholder = "Numero Persone"
				/>
				<TextInput
					style = {styles.rightTextInput}
					placeholder = "email"
				/>
			</View>
			<View style = {styles.bottomContainer}>
			<TouchableOpacity 
				style = {styles.bottone}
			>
				<Text style={{color:'#ffffff'}}>Inserisci</Text>
			</TouchableOpacity>
			</View>
		</View>
	</View>
  );
}

export default Inserisci_prenotazione