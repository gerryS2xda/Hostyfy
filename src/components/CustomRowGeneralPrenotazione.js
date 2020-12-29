import { useLinkProps } from '@react-navigation/native';
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Dialog from 'react-native-dialog';
import {firebase} from '../firebase/config'

var db = firebase.firestore();


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        marginLeft:"4%", //oldvalue: 16
        marginRight:"4%", //oldvalue: 16
        marginTop: "2%", //oldvalue: 8
        marginBottom: "3%", //oldvalue: 8
        borderRadius: 3,
        elevation: 2,
        width: "93%",
        //backgroundColor: 'black'
    },
    title: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'MontserrantSemiBold'
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    description: {
        fontSize: 12,
        fontFamily: 'MontserrantItalic',
    },
    photo: {
        height: 50,
        width: 50,
        borderRadius: 4,
    },
    arrow: {
        alignSelf: 'center',
    },
});


const CustomRowGeneralPrenotazione = (props) => {
    
return (
<TouchableOpacity 
    onPress = { () => {
        db.collection('prenotazioni').doc(props.id).get().then(async(doc)=>{
            var prenotazione = doc.data();
            prenotazione.dataInizio = prenotazione.dataInizio.seconds; 
            prenotazione.dataFine = prenotazione.dataFine.seconds;
            db.collection('struttura').doc(prenotazione.strutturaRef).collection('alloggi').doc(prenotazione.alloggioRef).get().then((doc1) =>{
                var alloggio = doc1.data();
                props.nav.navigate(props.newPage,{prenotazione: prenotazione,alloggio: alloggio})
            })
        })
    }}>
           
    <View style={styles.container}>
        <Image source={props.image_url} style={styles.photo} />
        <View style={styles.container_text}>
            <Text style={styles.title}>
                {props.title}
            </Text>
            <Text style={styles.description}>
                {props.description}
            </Text>
        </View>
        <Image
                source = {require('../../assets/arrow.png')}
                style = {styles.arrow} 
            />
    </View>
</TouchableOpacity>

);
}
export default CustomRowGeneralPrenotazione;