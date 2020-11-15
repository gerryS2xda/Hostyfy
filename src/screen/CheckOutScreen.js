import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from "../components/CustomButton";

const CheckOutScreen = ({navigation}) =>{
    const numAlloggio = 2;
    const dataCheckOut = "19/11/2020";
    const ora = "11";

    return(
        <View style={styles.maincontainer}>
            <HeaderBar title="Check-Out" navigator={navigation} /> 
            <ScrollView style={styles.bodyScrollcontainer}>
                <View style={styles.scrollContent}> 
                    <Text style={styles.categoryTxt}>Informazioni su check-out </Text>
                    <Text style={[styles.normalTxt, {marginLeft:0, marginBottom: 5}]}>Alle ore {ora} del {dataCheckOut} sarà eseguito il check-out per l'alloggio {numAlloggio}:</Text>
                        <Text style={styles.normalTxt}>1. Sarà disabilitata automaticamente la chiave della camera; </Text>
                        <Text style={styles.normalTxt}>2. Invio di una ulteriore notifica in prossimità dell'orario di check-out; </Text>
                        <Text style={styles.normalTxt}>3. I dispositivi intelligenti saranno spenti automaticamente; </Text>
                        <Text style={styles.normalTxt}>4. Sarà avviato il processo di sanificazione; </Text>
                        <Text style={styles.normalTxt}>5. Si invita l'ospite a scrivere una recensione. </Text>
                </View>
            </ScrollView>
        </View>
    );
}

export default CheckOutScreen;

const styles = StyleSheet.create({
    maincontainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    bodyScrollcontainer: {
      width: "100%",
    },
    scrollContent: {
        marginTop: 16,
        marginLeft:32,
        marginRight:24,
    },
    categoryTxt:{
        textAlign: "left",
        fontSize: 18,
        color: "black",
        marginTop: 16,
        marginBottom: 16,
        fontFamily: "MontserrantBold",
    },
    normalTxt: {
        fontSize: 16, 
        color: 'black',
        marginTop: 4,
        marginLeft: 6,
        fontFamily: "Montserrant",
    },
    buttonContainer:{
        flexDirection: 'row',
		justifyContent: 'space-between',
        marginTop: 32,
        marginBottom: 20,
    },
});