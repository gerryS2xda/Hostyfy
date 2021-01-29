import React, { useState, useCallback, useRef } from 'react';
import { Text, View, Image, ScrollView, StyleSheet, Alert, Dimensions } from 'react-native';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';
import * as StrutturaModel from "../firebase/datamodel/StrutturaModel";
import Slideshow from 'react-native-image-slider-show';
import { TextInput } from 'react-native-paper';
import { DefaultTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: "#000"
    },

    bodyScrollcontainer: {
        width: Dimensions.get('window').width,
    },

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: "#000000"
    },

    page: {
        backgroundColor: "#fff",
        flex: 1,
        width: Dimensions.get('window').width,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },

    singolaView: {
        //backgroundColor: "#000",
        paddingBottom: "5%",
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },

    carouselContainer: {
        flex: 1,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: "4%",
    },

    titoloView: {
        width: "90%",
        alignContent: "center",
        justifyContent: "center",
        marginTop: "4%",
    },

    singleText: {
        fontSize: 20,
        alignContent: "center",
        justifyContent: "center",
        fontFamily: "MontserrantSemiBold"
    },

    informationContainer: {
        marginTop: "5%",
        justifyContent: "center",
        alignItems: "center"

    },

    information: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "3%",
        marginBottom: "3%"
    },

    arrow: {
        marginBottom: 5,

    },

    indirizzoText: {
        fontFamily: "MontserrantSemiBold",
        fontSize: 16,
    },

    otherText: {
        fontFamily: "MontserrantSemiBold",
        fontSize: 22,
    },

    scrollStyle: {
        marginHorizontal: "3%",
        borderWidth: 2,
        padding: 15,
        fontFamily: "MontserrantSemiBold",
        borderRadius: 15,
        borderColor: "#e4eded"
    },

    guidaView: {
        width: "88%",
        flexDirection: "row",
        marginTop: "2%",
        paddingBottom: "4%",
        justifyContent: "space-between",
        //backgroundColor: "#000000"
    },

    ButtonContainer: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",

    },

    page2: {
        backgroundColor: "#fff",
        flex: 1,
        width: Dimensions.get('window').width,
        justifyContent: "center",
        alignItems: "center"
    },

    scrollContent: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: 'center',
    },

    singleTextInput: {
        alignContent: "center",
        justifyContent: "center",
        height: 40,
        marginTop: 1,
        paddingTop: 2,
        fontFamily: 'Montserrant',
        width: '100%', //85 vecchio valore
    },

    fieldContainerTop: {
        width: "90%",
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: "#000000"
    },

    descrizioneField: {
        width: "100%",
        marginTop: 8,
        paddingLeft: "1%",
        paddingRight: "1%",
        marginTop: 16,
    },

    carouselStyle: {
        flex: 1,
        width: "100%"
    },

    viewCampi: {
        width: "90%",
    },

    keyboard: {
        flex: 1,
    },

    secondScroll: {
        width: Dimensions.get('window').width,
    }

});

const theme = { ...DefaultTheme, roundness: 30, myOwnProperty: true, fonts: { regular: { fontFamily: 'MontserrantSemiBold', fontWeight: 'normal' } }, colors: { myOwnColor: '#303a52', primary: '#0692d4', text: '#303a52' } }

const ModificaStruttura = ({ route, navigation }) => {

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
    const [regione, setRegione] = useState(indirizzo.regione);

    const [cap, setCap] = useState(indirizzo.cap);
    const [nazione, setNazione] = useState(indirizzo.nazione);

    const [tipologia, setTipologia] = useState(struttura.tipologia);
    const [numAlloggi, setNumAlloggi] = useState(struttura.numAlloggi);
    const [descrizione, setDescrizione] = useState(struttura.descrizione);

    const scrollRef = useRef();



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
                setDenominazione(strutturaDoc.denominazione);
                setVia(strutturaDoc.indirizzo.via);
                setCitta(strutturaDoc.indirizzo.citta);
                setProvincia(strutturaDoc.indirizzo.provincia);
                setRegione(strutturaDoc.indirizzo.regione)
                setCap(strutturaDoc.indirizzo.cap);
                setNazione(strutturaDoc.indirizzo.nazione);
                setTipologia(strutturaDoc.tipologia);
                setNumAlloggi(strutturaDoc.numAlloggi);
                setDescrizione(strutturaDoc.descrizione);
                setCarouselItems(fotoList);
            }
            getStrutturaData();
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [isFocused])
    );

    return (
        <View style={styles.maincontainer}>
            <HeaderBar title={"Modifica struttura"} navigator={navigation} />
            <ScrollView
                style={styles.bodyScrollcontainer}
                contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>

                <ScrollView
                    pagingEnabled={true}
                    contentContainerStyle={styles.container}
                    showOrizontalScrollIndicator={false}
                    horizontal
                    ref={scrollRef}
                    bounces={false}>

                    <View style={styles.page}>
                        <View style={styles.singolaView}>
                            <View style={styles.carouselContainer} >
                                <Slideshow
                                    containerStyle={styles.carouselStyle}
                                    ref={carouselRef}
                                    dataSource={carouselItems}
                                    arrowSize={17}
                                    height={300}
                                    onPress={() => Alert.alert(
                                        "Funzionalità non disponibile", "Questa funzionalità sarà disponibile a seguito di sviluppi futuri!",
                                        [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
                                        { text: "OK", onPress: () => console.log("OK Pressed") }],
                                        { cancelable: false })}
                                    caption="Clicca per modificare le foto"
                                />

                                <Text style={[styles.singleTextInput, { justifyContent: "center", marginLeft: "40%" }]}>Clicca sulla foto per modificarla</Text>
                            </View>

                            <View style={styles.viewCampi}>
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
                                    label='Regione'
                                    disabledInputStyle={{ color: "#303a52" }}
                                    style={styles.singleTextInput}
                                    editable={IsEditable}
                                    value={regione}
                                    onChangeText={(regione) => setRegione(regione)}
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
                                    multiline={true}
                                    numberOfLines={40}
                                    value={descrizione}
                                    onChangeText={(descrizione) => setDescrizione(descrizione)}
                                    theme={theme} />

                            </View>

                        </View>
                        <View style={styles.guidaView}>
                            <View style={styles.ButtonContainer}>
                                <CustomButton
                                    styleBtn={{ width: "100%", marginRight: "15%" }}
                                    nome={"Modifica Guida"}
                                    onPress={() => Alert.alert(
                                        "Funzionalità non disponibile", "Questa funzionalità sarà disponibile a seguito di sviluppi futuri!",
                                        [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
                                        { text: "OK", onPress: () => console.log("OK Pressed") }],
                                        { cancelable: false })} />
                            </View>
                            <View style={styles.ButtonContainer}>
                                <CustomButton
                                    styleBtn={{ width: "100%" }}
                                    nome={IsEditable ? 'Applica' : "Modifica"}
                                    onPress={() => {
                                        async function updateStruttura() {
                                            IsEditable ? setIsEditable(false) : setIsEditable(true);
                                            if (!IsEditable) {
                                                var indirizzo = { via: via, citta: citta, cap: cap, provincia: provincia, regione: regione, nazione: nazione };
                                                await StrutturaModel.updateStrutturaDocument(strutturaId, denominazione, descrizione, indirizzo, "", numAlloggi, tipologia);
                                            }
                                        }
                                        updateStruttura();
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ScrollView>
        </View>
    );

}

export default ModificaStruttura;