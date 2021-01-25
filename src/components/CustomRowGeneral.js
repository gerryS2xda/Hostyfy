import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import CustomAlertTextInput from "../components/CustomAlertTextInput"
import {firebase} from '../firebase/config'

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


const CustomRowGeneral = (props) => {
    const userLogged = props.userLogged;
    const strutturaId = props.id;
    const codiceOtp = props.otp;
    const [showAlertOtp, setShowAlertOtp] = useState(false);
    const [otp, setOtp] = useState("");
    var descrizioneSmall = props.description;
    
    if(descrizioneSmall.length > 30){
        descrizioneSmall = descrizioneSmall.substring(0, 30) + "...";
    }

    return (
        <TouchableOpacity 
            onPress = {()=>{ 
                if(codiceOtp > 0){
                    Alert.alert("Codice OTP", 
                    "Per accedere alla nuova struttura occorre inserire il codice OTP ricevuto per posta. Per fini didattici, il codice OTP da inserire è: " + codiceOtp,
                    [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
                     { text: "OK", onPress: ()=> {
                        setShowAlertOtp(true);
                    }}],
                    { cancelable: false });
                }else{
                    props.nav.navigate("VisualizzaStruttura",{user: userLogged, strutturaId: strutturaId});
                }
            }}>
                
            <View style={styles.container}>
                <Image source={props.image_url} style={styles.photo} />
                <View style={styles.container_text}>
                    <Text style={styles.title}>
                        {props.title}
                    </Text>
                    <Text style={styles.description}>
                        {descrizioneSmall}
                    </Text>
                </View>
                <Image
                        source = {require('../../assets/arrow.png')}
                        style = {styles.arrow} 
                    />
            </View>
            {
                showAlertOtp && (
                    <CustomAlertTextInput
                        visibility={showAlertOtp}
                        setVisibility={setShowAlertOtp}
                        titolo="Codice OTP"
                        testo="Inserisci il codice OTP per accedere alla struttura"
                        buttonName="Ok"
                        pagina="Home"
                        placeholder = "OTP"
                        setTextData={setOtp}
                        onOkPress={()=>{
                            if(otp == codiceOtp){
                                props.nav.navigate("VisualizzaStruttura",{user: userLogged, strutturaId: strutturaId});
                                setShowAlertOtp(false);
                            }else{
                                setShowAlertOtp(false);
                                Alert.alert("Codice OTP", 
                                "Il codice OTP inserito non è corretto! Ritenta!",
                                [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
                                { text: "OK", onPress: ()=> {
                                    setShowAlertOtp(true);
                                }}],
                                { cancelable: false });
                            }
                        }}
                        navigator={props.navigation}>
                    </CustomAlertTextInput>
                )
            }

        </TouchableOpacity>

        );
    }
export default CustomRowGeneral;