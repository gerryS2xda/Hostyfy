import React, { useState } from 'react'
import {View, Text, Image, TextInput, Button, StyleSheet,TouchableOpacity } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';

//npm install react-native-picker-select per la combo box

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'stretch'
	},

	topContainer: {
		flex: 2,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	middleUpperContainer: {
		flex: 0.5,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	middleLowerContainer: {
		flex: 0.5,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	bottomContainer: {
		flex: 2,
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
		marginRight:37,
	  },

	  leftTextInput: {
		height: 40,
		width:130,
		borderColor: '#cc3881',
		borderWidth: 1.4,
		borderRadius: 8,
		marginLeft:38,
	  },

	  bottone : {
		borderWidth: 1,
		width:300,
		height:40,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius:8,
		backgroundColor: '#f2077d',
	  },

	  picker: {
		borderWidth: 10,
		backgroundColor:'#f2077d'
	  }
})

const Inserisci_prenotazione = (props) => {
	const date = new Date();
  return(
    <View style = {styles.container}>
        <View style = {styles.topContainer}>
			<RNPickerSelect
				onValueChange = {() => {}}
				placeholder = {{
					label: 'Struttura',
					value: "Struttura",
				}}
            	items={[
             		{ label: 'Posillipo', value: 'Posillipo' },
                	{ label: 'Margellina', value: 'Margellina' },
				]}
				style = {styles.picker}
       		/>
			<RNPickerSelect
				onValueChange = {() => {}}
				placeholder = {{
					label: 'Alloggio',
					value: "Alloggio",
				}}
            	items={[
             		{ label: 'Mare chiaro', value: 'Mare chiaro' },
                	{ label: 'Vietri', value: 'Vietri' },
            	]}
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
  );
}

export default Inserisci_prenotazione