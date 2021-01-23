import React, { useState, useCallback, useRef } from 'react'
import {View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native'
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from "../components/CustomButton";
import {Dropdown} from 'sharingan-rn-modal-dropdown';

//Styles
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
    
  });

const RecensioniGuestScreen = ({route, navigation}) =>{

    //Dichiarazione variabili
	const {user} = route.params;
    const isFocused = useIsFocused();

    //Caricamento dei dati non appena inizia il rendering dell'applicazione
	useFocusEffect(
        useCallback(() => {
          // Do something when the screen is focused
			async function getRecensioniData(){
				
			}
            getRecensioniData();
          return () => {
            // Do something when the screen is unfocused
            // Useful for cleanup functions
          };
        }, [isFocused])
      );

    return(
        <View style={styles.maincontainer}>
            <HeaderBar title="Recensioni" navigator={navigation} />
            <ScrollView style={styles.bodyScrollcontainer}>
                <View style={styles.scrollContent}> 
                    
                </View>
            </ScrollView>
        </View>
    );
}

export default RecensioniGuestScreen;