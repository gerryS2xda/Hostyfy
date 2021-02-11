import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, BackHandler } from 'react-native';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';
import * as RecensioneModel from "../firebase/datamodel/RecensioneModel"
import CustomAlertGeneral from "../components/CustomAlertGeneral";
import { DefaultTheme } from '@react-navigation/native';
import { TextInput } from 'react-native-paper'

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
        marginLeft: 32,
        marginRight: 32,
    },
    textSuggestStyle: {
        color: "#303a52",
        fontFamily: "MontserrantSemiBold",
        fontSize: 18,
        marginTop: 20,
        marginBottom: 10,
    },
    textInputContainer: {
        width: "100%",
    },
    bottomButtonContainer: {
        marginTop: "5%",
        marginBottom: "5%",
        alignItems: "center",
        justifyContent: "center",
    },
    singleField: {
        height: 40,
        width: "100%",
        marginTop: 8,
        fontFamily: "MontserrantSemiBold",
        paddingLeft: 5,
        marginTop: 16,
    },
    descrizioneField: {
       
        width: "100%",
        marginTop: 8,
        fontFamily: "MontserrantSemiBold",
        paddingLeft: 5,
        marginTop: 16,
        backgroundColor: '#f5f5f2',
    },
    titolo: {
        alignItems: 'center',
        justifyContent: 'center',

    },
});


const InserisciRecensioneScreen = ({ route, navigation }) => {
    const { userId, prenotazione } = route.params;
    const strutturaId = prenotazione.strutturaRef;
    const alloggioId = prenotazione.alloggioRef;
    const prenotazioneId = prenotazione.id;
    const [punteggio, setPunteggio] = useState("");
    const [feedbackPositive, setFeedbackPositive] = useState("");
    const [feedbackNegative, setFeedbackNegative] = useState("");
    const [disableInsertRecButton, setInsertRecButtonStatus] = useState(false); //per prevenire doppio click che comporta doppio inserimento
    const [showAlertInsert, setShowAlertInsert] = useState(false);
    const [showAlertErrorField, setShowAlertErrorField] = useState(false);
    const [showAlertBackButton, setShowAlertBackButton] = useState(false);
    const [messageAlert, setMessageAlert] = useState("");
    var punteggioRef = useRef(null);
    var feedbackPositiveRef = useRef(null);
    var feedbackNegativeRef = useRef(null);
    const theme = { ...DefaultTheme, roundness: 30, myOwnProperty: true, fonts: { regular: { fontFamily: 'MontserrantSemiBold', fontWeight: 'normal' } }, colors: { myOwnColor: '#303a52', primary: '#0692d4', text: '#303a52' } }

    //funzione per verificare che tutti i campi siano stati inseriti (controllo generale)
    const validateFormField = () => {

        var flag = true; //tutti i campi sono compilati
        var message = "Attenzione!! Uno dei campi obbligatori non è compilato. Il campo non compilato è ";
        if (punteggio === "") {
            message += "\"Punteggio\"";
            flag = false;
        } else if (feedbackPositive === "") {
            message += "\"Cosa ti è piaciuto?\"";
            flag = false;
        } else if (feedbackNegative === "") {
            message += "\"Cosa non ti è piaciuto?\"";
            flag = false;
        }
        if (!flag) {
            setMessageAlert(message);
            setShowAlertErrorField(true);
        }
        return flag;
    }

    //Resetta stato
    const resetState = () => {
        punteggioRef.current.clear();
        feedbackPositiveRef.current.clear();
        feedbackNegativeRef.current.clear();
        setPunteggio("");
        setFeedbackPositive("");
        setFeedbackNegative("");
    }

    return (
        <View style={styles.maincontainer}>
            <HeaderBar title="Nuova recensione" navigator={navigation} />
            <ScrollView style={styles.bodyScrollcontainer}>
                <View style={styles.scrollContent}>
                    <View style={styles.textInputContainer}>
                        <View style={styles.titolo}>
                            <Text style={styles.textSuggestStyle}> Come valuti il tuo soggiorno? </Text>
                        </View>

                        <TextInput
                            placeholder='Punteggio (da 1 a 10)'
                            mode='outlined'
                            label='Punteggio (da 1 a 10)'
                            disabledInputStyle={{ color: "#303a52" }}
                            style={styles.singleField}
                            value={punteggio}
                            onChangeText={(punteggio) => setPunteggio(punteggio)}
                            theme={theme}
                            keyboardType={'numeric'}
                            ref={punteggioRef}
                        />

                        <TextInput
                            mode='outlined'
                            label='Cosa ti è piaciuto?'
                            ref={feedbackPositiveRef}
                            disabledInputStyle={{ color: "#303a52" }}
                            style={styles.descrizioneField}
                            multiline={true}
                            numberOfLines={15}
                            //value={feedbackPositive}
                            onChangeText={(feedbackPositive) => setFeedbackPositive(feedbackPositive)}
                            theme={theme} />

                        <TextInput
                            mode='outlined'
                            label='Cosa non ti è piaciuto?'
                            ref={feedbackNegativeRef}
                            disabledInputStyle={{ color: "#303a52" }}
                            style={styles.descrizioneField}
                            multiline={true}
                            numberOfLines={15}
                            //value={feedbackNegative}
                            onChangeText={(feedbackNegative) => setFeedbackNegative(feedbackNegative)}
                            theme={theme} />


                        <View style={styles.bottomButtonContainer}>
                            <CustomButton
                                styleBtn={{ width: "95%", marginTop: "2%" }}
                                nome="Aggiungi"
                                disabled={disableInsertRecButton}
                                onPress={() => {

                                    if (!validateFormField()) {
                                        return;
                                    }

                                    async function onPressAggiungiRecensione() {

                                        setInsertRecButtonStatus(true); //prevenire doppio click

                                        var dataRecensione = new Date(); //data odierna

                                        //Costruisci oggetto per data di soggiorno mediante data di Iinizio della prenotazione
                                        var dataInizio = new Date(prenotazione.dataInizio * 1000);
                                        const monthNames = ["January", "February", "March", "April", "May", "June",
                                            "July", "August", "September", "October", "November", "December"];
                                        var dataSoggiorno = monthNames[dataInizio.getMonth()] + " " + dataInizio.getFullYear();

                                        //Attendi finche' non viene creata una nuova recensione
                                        await RecensioneModel.createRecensioneDocument(strutturaId, alloggioId, prenotazioneId, userId, dataRecensione, dataSoggiorno, punteggio, feedbackNegative, feedbackPositive);

                                        //Resetta i campi e stati
                                        resetState();
                                        setInsertRecButtonStatus(false);

                                        //Mostra Alert per mostrare esito positivo operazione e torna nella pagina precedente
                                        setMessageAlert("La recensione e' stata memorizzata con successo!");
                                        setShowAlertInsert(true);
                                    }
                                    onPressAggiungiRecensione();
                                }} />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <CustomAlertGeneral
                visibility={showAlertInsert}
                titolo="Nuova recensione"
                testo={messageAlert}
                hideNegativeBtn={true}
                buttonName="Ok"
                onOkPress={() => {
                    setShowAlertInsert(false);
                    navigation.goBack();
                }} />
            <CustomAlertGeneral
                visibility={showAlertErrorField}
                titolo="Nuova recensione"
                testo={messageAlert}
                hideNegativeBtn={true}
                buttonName="Ok"
                onOkPress={() => {
                    setShowAlertErrorField(false);
                }} />
            <CustomAlertGeneral
                visibility={showAlertBackButton}
                titolo="Attenzione!"
                testo="Tutti i valori inseriti fino a questo momento non saranno salvati. Sei sicuro di voler tornare indietro?"
                annullaBtnName="Annulla"
                onAnnullaBtn={() => {
                    setShowAlertBackButton(false);
                }}
                buttonName="Sì"
                onOkPress={() => {
                    //Resetta i campi
                    resetState();
                    navigation.goBack();
                }} />
        </View>
    );
}

export default InserisciRecensioneScreen;
