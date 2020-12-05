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


const CustomRowGeneralAlloggio = (props) => {
    const userLogged = props.userLogged;
    return (
        <TouchableOpacity 
            onPress = {()=>{ 
                db.collection("struttura").doc(props.strutturaId).collection('alloggi').doc(props.id).get().then((doc) =>{
                    var alloggio = {
                        nomeAlloggio: doc.data().nomeAlloggio,
                        numeroCamere: doc.data().numCamere,
                        numeroMassimoPersone: doc.data().numMaxPersone,
                        pathVideo: doc.data().pathvideo,
                        piano: doc.data().piano,
                        descrizione: doc.data().descrizione,
                        id: props.id,
                        strutturaId: props.strutturaId,
                        fotoList: doc.data().fotoList,

                    }

                    var fotoList = [];
                    var fotoArray = Object.values(doc.data().fotoList); //restituisce gli URL delle foto in un array JS
                    fotoArray.forEach((value)=>{
                        fotoList.push({image: {uri: value}});
                    }); 
                                                                        
                    if(fotoList.length == 0){
                        var imageURL = require("../../assets/imagenotfound.png");
                        fotoList.push({image: imageURL});
                    } 
                    props.nav.push(props.newPage,{user: userLogged, alloggio: alloggio, fotoCarousel: fotoList});
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
export default CustomRowGeneralAlloggio;