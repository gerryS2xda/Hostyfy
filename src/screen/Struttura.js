import React, { useState, useCallback, useRef } from 'react';
import { Text, View, Image, ScrollView, StyleSheet, Alert, Dimensions } from 'react-native';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';
import * as StrutturaModel from "../firebase/datamodel/StrutturaModel";
import Slideshow from 'react-native-image-slider-show';
import { DefaultTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomAlertGeneral from "../components/CustomAlertGeneral"

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        width: "100%",
        //justifyContent: 'flex-start',
        //alignItems: 'flex-start',
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
    },

    carouselContainer: {
        flex: 1,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: "2%",
    },

    titoloView: {
        width: "90%",
        alignContent: "center",
        justifyContent: "center",
        marginTop: "4%",
    },

    singleText: {
        fontSize: 20,
        fontFamily: "MontserrantSemiBold"
    },

    informationContainer: {
        marginTop: "5%",

    },

    information: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "3%",
        marginBottom: "3%"
    },

    indirizzoText: {
        fontFamily: "MontserrantSemiBold",
        fontSize: 16,
        color: "#303a52"
    },

    otherText: {
        fontFamily: "MontserrantSemiBold",
        fontSize: 22,
        color: "#303a52"
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

const StrutturaScreen = ({ route, navigation }) => {

    //campi 
    const { user, strutturaId } = route.params;

    const [IsEditable, setIsEditable] = useState(false);
    const [carouselItems, setCarouselItems] = useState([]);

    const carouselRef = useRef(null);
    const isFocused = useIsFocused();

    const [denominazione, setDenominazione] = useState("");
    const [via, setVia] = useState("");
    const [citta, setCitta] = useState("");
    const [provincia, setProvincia] = useState("");

    const [cap, setCap] = useState("");
    const [nazione, setNazione] = useState("");

    const [tipologia, setTipologia] = useState("");
    const [numAlloggi, setNumAlloggi] = useState("");
    const [descrizione, setDescrizione] = useState("");

    const [showAlertNextFeature, setShowAlertNextFeature] = useState(false);

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
            <HeaderBar title={"Struttura"} navigator={navigation} />
            <ScrollView
                style={styles.bodyScrollcontainer}
                contentContainerStyle={{ justifyContent: "center", alignItems: "flex-start"}}>

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
                                />
                            </View>

                            <View style={styles.titoloView}>
                                <Text style={styles.singleText}>
                                    {denominazione}
                                </Text>
                            </View>

                            <View style={styles.informationContainer}>

                                <View style={styles.information}>
                                    <Icon name={"map-marker-radius"} color={"#0692d4"} size={40} style={styles.arrow} />
                                    <Text style={styles.indirizzoText}>{via}</Text>
                                    <Text style={styles.indirizzoText}>{citta}, {provincia}, {cap}</Text>
                                </View>
                                <View style={styles.information}>
                                    <Icon name={"domain"} color={"#0692d4"} size={40} style={styles.arrow} />
                                    <Text style={styles.otherText}>{tipologia}</Text>
                                </View>
                                <View style={styles.information}>
                                    <Icon name={"numeric"} color={"#0692d4"} size={40} style={styles.arrow} />
                                    <Text style={styles.otherText}>Disponibilità alloggi: {numAlloggi}</Text>
                                </View>
                                <View style={styles.information}>
                                    <Icon name={"clipboard-text-outline"} color={"#0692d4"} size={40} style={styles.arrow}/>
                                    <Text style = {styles.scrollStyle}>
                                        {descrizione}
                                    </Text>
                                </View>
                                <View style={styles.information}>
                                <TouchableOpacity 
                                style = {styles.information}
                                onPress={() => setShowAlertNextFeature(true)}>
                                    
                                    <Icon name={"book-open"} color={"#0692d4"} size={40} style={styles.arrow}/>
                                        <Text 
                                        style = {styles.otherText} >
                                                Clicca per la Guida 
                                        
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                        <View style={styles.guidaView}>
                            <View style={styles.ButtonContainer}>
                                <CustomButton
                                    styleBtn={{ width: "100%", marginRight: "15%" }}
                                    nome={"Modifica"}
                                    onPress={() => { navigation.navigate("ModificaStruttura", { user: user, strutturaId: strutturaId }); }} />
                            </View>
                            <View style={styles.ButtonContainer}>
                                <CustomButton
                                    styleBtn={{ width: "100%", marginLeft: "15%" }}
                                    nome={"Alloggi"}
                                    onPress={() => { navigation.navigate("VisualizzaAlloggi", { user: user, strutturaId: strutturaId }); }} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ScrollView>
            <CustomAlertGeneral
                  visibility={showAlertNextFeature}
                  titolo="Funzionalità non disponibile"
                  testo= "Questa funzionalità sarà disponibile a seguito di sviluppi futuri!"
                  hideNegativeBtn={true}
                  buttonName="Ok"
                  onOkPress={()=>{ 
                      setShowAlertNextFeature(false); 
                  }} />
        </View>
    );

}

export default StrutturaScreen;
