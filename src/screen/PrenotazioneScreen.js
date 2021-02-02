import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from "../components/CustomButton";
import * as PrenotazioneModel from "../firebase/datamodel/PrenotazioneModel"
import * as AlloggioModel from "../firebase/datamodel/AlloggioModel"
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PrenotazioneScreen = ({ route, navigation }) => {
    const { prenotazioneId, user, isHost, image_url } = route.params;
    const [alloggio, setAlloggio] = useState({});
    const [prenotazione, setPrenotazione] = useState({});
    const isFocused = useIsFocused();
    const [canDoCheckIn, setCanDoCheckIn] = useState(false);
    const [showRecensioniBtn, setShowRecensioniBtn] = useState(false);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            async function getDatiPrenotazione() {
                let prenotazione = await PrenotazioneModel.getPrenotazioneById(prenotazioneId);
                prenotazione.dataInizio = prenotazione.dataInizio.seconds;
                prenotazione.dataFine = prenotazione.dataFine.seconds;
                let alloggio = await AlloggioModel.getAlloggioByStrutturaRef(prenotazione.strutturaRef, prenotazione.alloggioRef);
                setAlloggio(alloggio);
                setPrenotazione(prenotazione);

                var dataOdierna = new Date();
                var dataInizio = new Date(prenotazione.dataInizio * 1000);
                var dataFine = new Date(prenotazione.dataFine * 1000);
                if (dataOdierna >= dataInizio && dataOdierna <= dataFine) setCanDoCheckIn(true);
                if (dataOdierna >= dataFine) setShowRecensioniBtn(true);
                else setShowRecensioniBtn(false);

                var checkIn = (new Date(prenotazione.dataInizio * 1000)).toLocaleString("it-IT");
                var stringhe = checkIn.split(':');
                checkIn = stringhe[0]+":"+stringhe[1];
                setCheckIn(checkIn);

                var checkOut = (new Date(prenotazione.dataFine * 1000)).toLocaleString("it-IT");
                stringhe = checkOut.split(':');
                checkOut = stringhe[0]+":"+stringhe[1];
                setCheckOut(checkOut);
                

            }
            getDatiPrenotazione();
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [isFocused])
    );



    return (
        <View style={styles.maincontainer}>
            <HeaderBar title="Prenotazione" navigator={navigation} />
            <ScrollView style={styles.bodyScrollcontainer}>
                <View style={styles.scrollContent}>
                    <Text style={styles.numprenotazionetxt}>Numero Prenotazione: {prenotazione.numeroPrenotazione}</Text>


                    <View style={styles.infoStrutturacontainer}>
                        <Image style={styles.strutturaImage} source={image_url} />
                    </View>


                    <View style={styles.fieldSet}>
                        <Text style={styles.legend}>Informazione prenotazione</Text>
                        <View style={styles.fieldSetContent}>
                            <View style={styles.checkInContainer}>
                                <Text style={styles.categoryText}>Check in</Text>
                                <Text style={styles.normalText}>{checkIn}</Text>
                            </View>
                            <View style={styles.checkOutContainer}>
                                <Text style={styles.categoryText}>Check out</Text>
                                <Text style={styles.normalText}>{checkOut}</Text>
                            </View>
                            <View style={styles.iconView}>
                                <View style={[styles.singleColumn, { marginLeft: "15%", }]}>
                                    <Icon name={"account-multiple"} color={"#0692d4"} size={50} style={styles.arrow} />
                                    <Text style={[styles.textIcon, { fontFamily: "MontserrantSemiBold" }]}>{prenotazione.numPersone}</Text>
                                </View>

                                <View style={[styles.singleColumn, { marginRight: "20%", }]}>
                                    <Icon name={"currency-eur"} color={"#0692d4"} size={50} style={styles.arrow} />
                                    <Text style={[styles.textIcon, { fontFamily: "MontserrantSemiBold", marginLeft: "6%" }]}>{prenotazione.costo}</Text>
                                </View>


                            </View>
                        </View>
                    </View>
                    {!isHost && canDoCheckIn && (
                        <ButtonContainer navigator={navigation} checkIn={prenotazione.doneCheckIn} id={prenotazioneId} prenotazione={prenotazione} user={user} passata={showRecensioniBtn} image_url={image_url} />)
                    }
                    {!isHost && showRecensioniBtn && (
                        <View style={styles.buttonContainer}>
                            <CustomButton nome="Aggiungi recensione" styleBtn={{ width: "100%" }} onPress={() => {
                                var prenotazioneObj = { id: prenotazioneId, ...prenotazione };
                                navigation.navigate('InserisciRecensione', { userId: user.userId, prenotazione: prenotazioneObj });
                            }} />
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

export default PrenotazioneScreen;

function ButtonContainer(props) {
    if (!props.passata) {
        if (!props.checkIn) {
            return (
                <View style={styles.buttonContainer}>
                    <CustomButton nome="Check-In" styleBtn={{ width: "100%" }} onPress={() => {
                        props.navigator.navigate('EffettuaCheckIn', { user: props.user, strutturaId: props.prenotazione.strutturaRef, alloggioId: props.prenotazione.alloggioRef, numPersone: props.prenotazione.numPersone, prenotazioneId: props.id, prenotazione: props.prenotazione, image_url: props.image_url});
                    }} />
                </View>
            );
        } else {
            return (
                <View style={styles.buttonContainer}>
                    <CustomButton nome="Chiave" styleBtn={{ width: "100%" }} onPress={() => { props.navigator.navigate('LaMiaChiave', { user: props.user, strutturaId: props.prenotazione.strutturaRef, alloggioId: props.prenotazione.alloggioRef, prenotazioneId: props.id, prenotazione: props.prenotazione}); }} />
                </View>
            );
        }
    } else {
        return (<View></View>);
    }
}

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
    numprenotazionetxt: {
        textAlign: "left",
        fontSize: 16,
        color: "black",
        marginTop: 16,
        marginBottom: 16,
        fontFamily: "MontserrantSemiBold",
    },
    infoStrutturacontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16
    },
    strutturaImage: {
        width: "100%",
        height: 220,
        borderRadius: 20
    },
    nameStruttura: {
        fontSize: 16,
        color: "black",
        textAlign: "center",
        marginTop: 4,
        fontFamily: "MontserrantSemiBold",
    },
    checkInContainer: {
        marginTop: "10%",
    },
    checkOutContainer: {
        marginTop: 16,
    },
    costoTotContainer: {
        flexDirection: 'row', //imposta orientamento orizzontale degli elementi
        backgroundColor: '#fff',
        marginTop: 16,
    },
    horizontalView: {
        flexDirection: 'row',
    },
    horizontalViewInfoCamera: {
        flexDirection: 'row',
        marginTop: 16,
        marginBottom: 4,
    },
    userIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    fieldSet: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        borderRadius: 5,
        borderWidth: 2,
        alignItems: 'center',
        borderColor: '#e4eded',
        
    },
    legend: {
        position: 'absolute',
        top: -16,
        left: 10,
        fontFamily: "MontserrantSemiBold",
        backgroundColor: '#FFFFFF',
        fontSize: 16,
        padding: 4,
        color: '#303a52',
    },
    fieldSetContent: {
        alignSelf: "baseline",
        marginLeft: 16,
    },
    categoryText: {
        fontSize: 16,
        color: "#303a52",
        fontFamily: "MontserrantBold",
    },
    normalText: {
        fontSize: 16,
        color: "black",
        fontFamily: "Montserrant",
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
        marginBottom: 20
    },
    scrollContent: {
        marginLeft: 16,
        marginRight: 16,
    },

    iconView: {
       
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: "8%",
        //backgroundColor: "#000000",
        width: "100%"
    },

    singleColumn: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    arrow: {
       
    },

    textIcon:{
        fontSize: 25
    }
});

