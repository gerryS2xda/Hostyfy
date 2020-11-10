import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import HeaderBar from '../components/CustomHeaderBar'

const ChiaveScreen = ({navigation}) =>{
    const idKey = "0123";
    const cameraName = "Suite Imperiale";

    const createTwoButtonAlert = () =>
    Alert.alert(
      "Ingresso alloggio",
      "Benvenuto nella camera " + JSON.stringify(cameraName),
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );


    return(
        <View style={styles.maincontainer}>
            <HeaderBar title="La mia chiave" navigator={navigation} />
            <View style={styles.bodyViewContent}>
                <View style={styles.keyImageIDcontainer}>
                    <Image style={styles.keyImage} source={require("../../assets/electronicKeyHotel.png")}/>
                    <Text style={styles.idkeyText}>ID: {idKey}</Text>
                </View>
                <View style={styles.buttonKeyContainer}>
                    <TouchableOpacity style = {styles.bottoneStyle} onPress={createTwoButtonAlert} >
                        <Text style={{color:'#ffffff'}}>Apri porta</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default ChiaveScreen;

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bodyViewContent: {
        flex: 1,
        marginTop: 16,
        marginBottom: 16,
    },
    keyImageIDcontainer: {
        marginTop:32,
        marginBottom: 16,
    },
    keyImage: {
        width: 128,
        height: 128,
    },
    idkeyText: {
        fontSize: 16,
        color: "black",
        textAlign: "center",
        marginTop: 8
    },
    buttonKeyContainer:{
        flex: 1, //rimuovi per elimare spazio extra tra ID text e il pulsante
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
        marginBottom: 24,
    },
    bottoneStyle : {
        borderWidth: 1,
        width: 120,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:8,
        backgroundColor: '#f2077d',
    },
});