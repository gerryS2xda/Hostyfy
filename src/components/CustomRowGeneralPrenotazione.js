import { useLinkProps } from '@react-navigation/native';
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Dialog from 'react-native-dialog';
import {firebase} from '../firebase/config'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

var db = firebase.firestore();


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        //paddingTop: 6,
        //paddingLeft: 12,
        //paddingBottom: 6,
        marginLeft:"4%", //oldvalue: 16
        marginRight:"4%", //oldvalue: 16
        marginTop: "2%", //oldvalue: 8
        borderRadius: 18,
        borderWidth: 3,
        width: "93%",
        borderColor: "#e4eded"
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
        paddingTop: 15,
        paddingBottom: 15
    },
    description: {
        fontSize: 12,
        fontFamily: 'MontserrantItalic',
    },
    photo: {
        borderTopLeftRadius: 16,
        borderBottomLeftRadius:16,
        height: "100%",
        width: 70,
        
    },
    arrow: {
        alignSelf: 'center',
    },
});


const CustomRowGeneralPrenotazione = (props) => {
    
return (
<TouchableOpacity 
    onPress = { () => {
        props.nav.navigate(props.newPage,{prenotazioneId: props.id, user: props.user, isHost: props.isHost, image_url: props.image_url})
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
        <Icon name={"chevron-right"} color={"#000000"} size={40} style={styles.arrow} />
                 
            
    </View>
</TouchableOpacity>

);
}
export default CustomRowGeneralPrenotazione;