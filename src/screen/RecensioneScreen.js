import React, { useState, useCallback, useRef } from 'react'
import { View, Text, TextInput, StyleSheet, ScrollView, Alert, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from "../components/CustomButton";
import * as StrutturaModel from "../firebase/datamodel/StrutturaModel";
import * as AlloggioModel from "../firebase/datamodel/AlloggioModel";
import * as RecensioneModel from "../firebase/datamodel/RecensioneModel";
import * as GuestModel from "../firebase/datamodel/GuestModel"

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
    alloggioContainer: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "5%",
    },
    alloggioImage: {
        width: "100%",
        height: 220,
        borderRadius: 20
    },
    alloggiotxt: {
        fontSize: 25,
        color: "#303a52",
        textAlign: "center",
        fontFamily: "MontserrantSemiBold",
        marginTop: 4,
        marginBottom: "4%"
    },
    punteggiotxt: {
        fontSize: 18,
        color: "#303a52",
        fontFamily: "MontserrantSemiBold",
        marginTop: "2%"
    },
    feedbackContainer: {
        flex:1,
        width: "100%",
        marginTop: "5%",
    },
    horizontalView: {
        flex:1,
        flexDirection: 'column',
        marginTop: 10,
        paddingTop: 5,
        paddingLeft: 5,
        marginBottom: 5,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: "#e4eded"
    },
    feedbacktxt: {
        fontSize: 13,
        color: "black",
        marginLeft: "5%",
        fontFamily: "MontserrantSemiBold",
        marginTop: 4,
        paddingLeft: "4%",
        paddingBottom: "4%",
        paddingRight: "4%"
    },
    infoSoggiornoContainer: {
        width: "100%",
        marginTop: "3%",
        marginBottom: "5%"
    },
    infoSoggiornotxt: {
        fontSize: 12,
        color: "#303a52",
        fontFamily: "MontserrantSemiBold",
        marginTop: 4
    },
    simbolo:{
        alignItems: 'center'
    }
});

const RecensioneScreen = ({ route, navigation }) => {

    //Dichiarazione variabili
    const { user, strutturaId, alloggioId, recensioneId } = route.params;
    const [alloggio, setAlloggio] = useState({});
    const [recensione, setRecensione] = useState({});
    const [ospite, setOspite] = useState({}); //utente che ha scritto la recensione
    const [fotoAlloggio, setFotoAlloggio] = useState(require("../../assets/imagenotfound.png"));
    const isFocused = useIsFocused();

    //Caricamento dei dati non appena inizia il rendering dell'applicazione
    useFocusEffect(
        useCallback(() => {
            // Do something when the screen is focused
            async function getData() {
                //Attendi finche' non ottieni dati di un alloggio
                var alloggio = await AlloggioModel.getAlloggioByStrutturaRef(strutturaId, alloggioId);
                setAlloggio(alloggio); //salva i dati dell'alloggio nello stato
                //Prendi la prima foto presente per l'alloggio e salva nello state
                var fotoArray = Object.values(alloggio.fotoList); //restituisce gli URL delle foto in un array JS                         
                var imageURL = "";
                if (fotoArray.length == 0) {
                    imageURL = require("../../assets/imagenotfound.png");
                } else {
                    imageURL = { uri: fotoArray[0] };
                }
                setFotoAlloggio(imageURL);

                //Attendi finche' non ottieni dati di una recensione
                var recensione = await RecensioneModel.getRecensioneById(strutturaId, alloggioId, recensioneId);
                recensione.dataRecensione = ((new Date(recensione.dataRecensione.seconds * 1000)).toLocaleString("it-IT").split(','))[0];
                setRecensione(recensione); //salva i dati della recensione nello stato

                //Attendi finche' non ottieni dati dell'utente che ha scritto la recensione
                var ospite = await GuestModel.getGuestDocument(recensione.guestRef);
                setOspite(ospite); //salva i dati nello stato

            }
            getData();
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [isFocused])
    );

    return (
        <View style={styles.maincontainer}>
            <HeaderBar title="Recensione" navigator={navigation} />
            <ScrollView style={styles.bodyScrollcontainer}>
                <View style={styles.scrollContent}>
                    <View style={styles.alloggioContainer}>
                        <Text style={styles.alloggiotxt}>{alloggio.nomeAlloggio}</Text>
                        <Image style={styles.alloggioImage} source={fotoAlloggio} />
                    </View>

                    <View style={styles.infoSoggiornoContainer}>
                        <Text style={styles.infoSoggiornotxt}>Data recensione: {recensione.dataRecensione}</Text>
                        <Text style={styles.infoSoggiornotxt}>Recensione scritta da: {ospite.nome} {ospite.cognome}</Text>
                    </View>

                    <Text style={styles.punteggiotxt}>Punteggio giudizio: {recensione.punteggio}</Text>
                    
                    <View style={[styles.feedbackContainer, {marginBottom: "5%"}]}>
                        
                        <View style={styles.horizontalView}>
                            <Icon name="plus-circle" color={"#303a52"} size={30} style = {styles.simbolo}/>
                            <Text style={styles.feedbacktxt}>{recensione.positiveFeedback}</Text>
                        </View>

                        <View style={styles.horizontalView}>
                            <Icon name="minus-circle" color={"#303a52"} size={30} style = {[styles.simbolo]}/>
                            <Text style={styles.feedbacktxt}>{recensione.negativeFeedback}</Text>
                        </View>

                    </View>
                    


                    
                </View>
            </ScrollView>
        </View>
    );
}

export default RecensioneScreen;