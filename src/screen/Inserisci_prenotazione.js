import React, { useState } from 'react'
import {View, Text, Image, TextInput, Button, StyleSheet,TouchableOpacity } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';

//npm install react-native-picker-select per la combo box

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	topContainer: {
		flex: 2,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	middleUpperContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	middleLowerContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	bottomContainer: {
		flex: 2,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},

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
				placeholder = "Nome"
			/>
			<TextInput
				placeholder = "Cognome"
			/>
        </View>
        <View style = {styles.middleUpperContainer}>
			<TextInput
				placeholder = "Data inizio"
			/>
			<TextInput
				placeholder = "Data fine"
			/>
        </View>
        <View style = {styles.middleLowerContainer}>
			<TextInput
				placeholder = "Numero Persone"
			/>
			<TextInput
				placeholder = "email"
			/>
        </View>
        <View style = {styles.bottomContainer}>
		<TouchableOpacity>
            <Text style={{color:'#ffffff'}}>Inserisci</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}

export default Inserisci_prenotazione