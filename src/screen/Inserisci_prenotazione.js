import React, { useState } from 'react'
import {View, Text, Image, TextInput, Button, StyleSheet,TouchableOpacity, Platform } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';

//npm install react-native-picker-select per la combo box

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	emptyContainer: {
		flex: 0.5,
	},


	topContainer: {
		flex: 2,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	middleUpperContainer: {
		flex: 0.6,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	middleLowerContainer: {
		flex: 0.3,
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
		},
	};
  return(
    <View style = {styles.container}>
		<View style = {styles.emptyContainer}>

		</View>
        <View style = {styles.topContainer}>
			<RNPickerSelect
				style = {pickerStyle}
				onValueChange = {() => {}}
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