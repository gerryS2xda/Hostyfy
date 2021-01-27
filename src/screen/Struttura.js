import React, { useState, useCallback, useRef } from 'react';
import { Text, View, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';
import * as StrutturaModel from "../firebase/datamodel/StrutturaModel";
import Slideshow from 'react-native-image-slider-show';
import { TextInput } from 'react-native-paper';
import { DefaultTheme } from '@react-navigation/native';

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

    carouselContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "7%",
        marginBottom: "2%"
    },

    singleTextInput: {
        height: 40,
        marginTop: 1,
        paddingTop: 2,
        fontFamily: 'Montserrant',
        width: '100%', //85 vecchio valore
    },

    fieldContainerTop: {
        width: "100%",
        alignItems: 'center'
    },

    twoFieldContainer: {
        justifyContent: 'space-between',
        marginTop: 16,
    },

    fieldContainerBottom: {
        width: "100%",
        alignItems: 'center'
    },

    twoField: { //da sistemare (non appare centrato)
        borderBottomWidth: 1,
        borderColor: '#cc3881',
        width: "30%",
        fontFamily: 'Montserrant',
        paddingLeft: 5,
        height: 40,
    },

    descrizioneField: {
        height: 150,
        width: "100%",
        borderColor: '#cc3881',
        marginTop: 8,
        borderBottomWidth: 1,
        backgroundColor: '#f5f5f2',
        paddingLeft: "1%",
        paddingRight: "1%",
        marginTop: 16,
    },
    threeButtonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    bottomButtonContainer: {
        marginBottom: 20,
    },

    carouselStyle: {
        borderRadius: 10,
        borderWidth: 9,
        borderColor: "#e4eded"
    }

});

const theme = { ...DefaultTheme, roundness: 30, myOwnProperty: true, fonts: { regular: { fontFamily: 'MontserrantSemiBold', fontWeight: 'normal' } }, colors: { myOwnColor: '#303a52', primary: '#0692d4', text: '#303a52' } }

const StrutturaScreen = ({ route, navigation }) => {

    //campi 
    const { user, strutturaId } = route.params;

    const [IsEditable, setIsEditable] = useState(false);
    const [struttura, setStruttura] = useState({});
    const [indirizzo, setIndirizzo] = useState({});
    const [carouselItems, setCarouselItems] = useState([]);
   
    const carouselRef = useRef(null);
    const isFocused = useIsFocused();

    const [denominazione, setDenominazione] = useState(struttura.denominazione);
    const [via, setVia] = useState(indirizzo.via);
    const [citta, setCitta] = useState(indirizzo.citta);
    const [provincia, setProvincia] = useState(indirizzo.provincia);

    const [cap, setCap] = useState(indirizzo.cap);
    const [nazione, setNazione] = useState(indirizzo.nazione);

    const [tipologia, setTipologia] = useState(struttura.tipologia);
    const [numAlloggi, setNumAlloggi] = useState(struttura.numAlloggi);
    const [descrizione, setDescrizione] = useState(struttura.descrizione);




    //Caricamento dei dati non appena inizia il rendering dell'applicazione
    useFocusEffect(
        useCallback(() => {
            // Do something when the screen is focused
            if (IsEditable) {
                setIsEditable(false);
            }

            async function getStrutturaData() {

                //Attendi finche' non ottieni dati della struttura dal DB
                var strutturaDoc = await StrutturaModel.getStrutturaDocumentById(strutturaId);

                //Se abbiamo effettuato il primo accesso alla struttura -> setta OTP a 0 per indicare che il primo accesso è stato eseguito
                if (strutturaDoc.codiceOtp > 0) {
                    await StrutturaModel.updateCodiceOTP(strutturaId, 0);
                    strutturaDoc.codiceOtp = 0;
                }

                //Riempi carouselList con le foto presenti nel documento appena ottenuto
                var fotoList = [];
                var fotoArray = Object.values(strutturaDoc.fotoList); //restituisce gli URL delle foto in un array JS
                fotoArray.forEach((value) => {
                    fotoList.push({ url: value });
                });
                if (fotoList.length == 0) {
                    var imageURL = require("../../assets/imagenotfound.png");
                    fotoList.push({ url: imageURL });
                }

                //Memorizza la struttura, indirizzo della struttura e la lista foto per carousel nello state
                setStruttura(strutturaDoc);
                setIndirizzo(strutturaDoc.indirizzo);
                setCarouselItems(fotoList);
            }
            getStrutturaData();
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [isFocused])
    );

    const _renderItem = ({ item, index }) => {
        return (
            <View>
                <Image style={{ width: 270, height: 270, borderRadius: 5 }} source={item.image} />
                <Text>{item.title}</Text>
            </View>

        )
    }

    return (
        <View style={styles.maincontainer}>
            <HeaderBar title={"Struttura"} navigator={navigation} />
            <ScrollView style={styles.bodyScrollcontainer}>
                <View style={styles.scrollContent}>


                    <View style={styles.carouselContainer} >
                        <Slideshow
                            containerStyle={styles.carouselStyle}
                            ref={carouselRef}
                            dataSource={carouselItems}
                            overlay={true}
                            arrowSize={17}
                        />
                    </View>



                    <View style={styles.fieldContainerTop}>
                        <TextInput
                            mode='outlined'
                            label='Nome'
                            disabledInputStyle={{ color: "#303a52" }}
                            style={styles.singleTextInput}
                            editable={IsEditable}
                            value={denominazione}
                            onChangeText={(denominazione) => setDenominazione(denominazione)}
                            theme={theme} />

                        <TextInput
                            mode='outlined'
                            label='Via'
                            disabledInputStyle={{ color: "#303a52" }}
                            style={styles.singleTextInput}
                            editable={IsEditable}
                            value={via}
                            onChangeText={(via) => setVia(via)}
                            theme={theme} />

                        <TextInput
                            mode='outlined'
                            label='Città'
                            disabledInputStyle={{ color: "#303a52" }}
                            style={styles.singleTextInput}
                            editable={IsEditable}
                            value={citta}
                            onChangeText={(citta) => setCitta(citta)}
                            theme={theme} />

                        <TextInput
                            mode='outlined'
                            label='Provincia'
                            disabledInputStyle={{ color: "#303a52" }}
                            style={styles.singleTextInput}
                            editable={IsEditable}
                            value={provincia}
                            onChangeText={(provincia) => setProvincia(provincia)}
                            theme={theme} />
                    </View>

                    <View style={styles.twoFieldContainer}>
                        <TextInput
                            mode='outlined'
                            label='CAP'
                            disabledInputStyle={{ color: "#303a52" }}
                            style={styles.singleTextInput}
                            editable={IsEditable}
                            value={cap}
                            onChangeText={(cap) => setCap(cap)}
                            theme={theme} />

                        <TextInput
                            mode='outlined'
                            label='Nazione'
                            disabledInputStyle={{ color: "#303a52" }}
                            style={styles.singleTextInput}
                            editable={IsEditable}
                            value={nazione}
                            onChangeText={(nazione) => setNazione(nazione)}
                            theme={theme} />
                    </View>

                    <View style={styles.fieldContainerBottom}>
                        <TextInput
                            mode='outlined'
                            label='Tipologia'
                            disabledInputStyle={{ color: "#303a52" }}
                            style={styles.singleTextInput}
                            editable={IsEditable}
                            value={tipologia}
                            onChangeText={(tipologia) => setTipologia(tipologia)}
                            theme={theme} />

                        <TextInput
                            mode='outlined'
                            label='Numero Alloggi'
                            disabledInputStyle={{ color: "#303a52" }}
                            style={styles.singleTextInput}
                            editable={IsEditable}
                            value={numAlloggi}
                            onChangeText={(numAlloggi) => setNumAlloggi(numAlloggi)}
                            theme={theme} />

                        <TextInput
                            mode='outlined'
                            label='Descrizione'
                            disabledInputStyle={{ color: "#303a52" }}
                            style={styles.descrizioneField}
                            editable={IsEditable}
                            value={descrizione}
                            onChangeText={(descrizione) => setDescrizione(descrizione)}
                            theme={theme} />
                    </View>

                    <View style={styles.threeButtonContainer}>
                        <CustomButton
                            styleBtn={{ width: "45%" }}
                            nome="Modifica foto"
                            onPress={() => Alert.alert(
                                "Funzionalità non disponibile", "Questa funzionalità sarà disponibile a seguito di sviluppi futuri!",
                                [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
                                { text: "OK", onPress: () => console.log("OK Pressed") }],
                                { cancelable: false })}
                        />
                        <CustomButton
                            styleBtn={{ width: "45%" }}
                            nome={IsEditable ? 'Applica modifiche' : "Modifica dati"}
                            onPress={() => {
                                async function updateStruttura() {
                                    IsEditable ? setIsEditable(false) : setIsEditable(true);
                                    if (IsEditable) {
                                        var indirizzo = { via: via, citta: citta, cap: cap, provincia: provincia, regione: regione, nazione: nazione };
                                        await StrutturaModel.updateStrutturaDocument(strutturaId, denominazione, descrizione, indirizzo, "", numAlloggi, tipologia);
                                    }
                                }
                                updateStruttura();
                            }}
                        />
                    </View>
                    <View style={styles.bottomButtonContainer}>
                        <CustomButton
                            styleBtn={{ marginTop: 10, width: "100%" }}
                            nome="Guida"
                            onPress={() => Alert.alert(
                                "Funzionalità non disponibile", "Questa funzionalità sarà disponibile a seguito di sviluppi futuri!",
                                [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
                                { text: "OK", onPress: () => console.log("OK Pressed") }],
                                { cancelable: false })}
                        />
                        <CustomButton
                            styleBtn={{ marginTop: 10, width: "100%" }}
                            nome="Visualizza alloggi"
                            onPress={() => {
                                navigation.navigate("VisualizzaAlloggi", { user: user, strutturaId: strutturaId });
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );

}

export default StrutturaScreen;
