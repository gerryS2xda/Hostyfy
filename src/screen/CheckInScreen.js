import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert, Modal, Dimensions } from 'react-native';
import HeaderBar from '../components/CustomHeaderBar'
import CustomButton from "../components/CustomButton"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput, RadioButton } from 'react-native-paper';
import { DefaultTheme } from '@react-navigation/native';
import { Dropdown } from 'sharingan-rn-modal-dropdown';
import RadioButtonRN from 'radio-buttons-react-native';

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    maincontainerGray: {
        flex: 1,
        backgroundColor: '#a9a9a9aa',
        alignItems: 'center',
        justifyContent: 'center',
    },

    bodyScrollcontainer: {
        width: "100%",
    },
    scrollContent: {
        marginLeft: 16,
        marginRight: 16,

    },
    modalContainer: {
        backgroundColor: '#fff',
        marginTop: "20%",
        width: "90%",
        marginLeft: "5%",
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#e4eded"
    },
    numprenotazionetxt: {
        textAlign: "left",
        fontSize: 20,
        color: "#303a52",
        marginBottom: 20,
        fontFamily: "MontserrantSemiBold",
        marginLeft: 4
    },
    infoCheckIncontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16
    },
    checkInImage: {
        width: "100%",
        height: 300,
        opacity: 12,


    },
    checkIntxt: {
        fontSize: 20,
        color: "black",
        textAlign: "center",
        fontFamily: "MontserrantSemiBold",
        marginTop: "5%"
    },
    fieldSet: {
        margin: 10,
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderWidth: 1,
        alignItems: 'center',
        borderColor: '#e4eded',
        borderRadius: 15,
        backgroundColor: "#fff",
    },
    legend: {
        position: 'absolute',
        top: -16,
        left: 10,
        fontFamily: "MontserrantSemiBold",
        fontSize: 16,
        padding: 5,
        color: '#303a52',
        borderRadius: 10,
        borderColor: "#e4eded",
        borderWidth: 1,
        backgroundColor: "#ffffff"

    },
    fieldSetContent: {
        alignSelf: "baseline",
        marginLeft: 8,
    },
    singleField: {
        height: 40,
        width: "100%", //oldvalue: 120
        marginTop: 8,
        paddingTop: 9,
        marginRight: 12,
        paddingLeft: 8,
        fontFamily: 'Montserrant',
        color: "black",
        fontSize: 17
    },
    singleFieldRow: {
        height: 40,
        width: "96%", //oldvalue: 120
        marginTop: 8,
        paddingTop: 9,
        marginRight: 12,
        paddingLeft: 8,
        fontFamily: 'Montserrant',
    },
    horizontalView: {
        width: "100%",
        flexDirection: 'row',
        marginBottom: 8
    },
    horizontalViewModal: {
        width: "100%",
        flexDirection: 'row',
        marginBottom: 8,
        paddingRight: "5%",
        justifyContent: "center",
        marginLeft: 4,
        paddingLeft: "4%",
        //backgroundColor: "#000"
    },

    comboBoxStyle: {
        marginTop: 8,
        marginRight: 8,
    },
    textFieldStyle: {

        height: 40,
        width: "50%",
        borderColor: '#cc3881',
        marginTop: "9%",
        marginRight: 12,
        paddingLeft: 8,
        fontFamily: 'Montserrant',

    },

    textFieldStyleModal: {
        height: 40,
        width: "50%",
        borderColor: '#cc3881',
        marginTop: "9%",
        marginRight: 10,
        marginLeft: 4,
        paddingLeft: 10,
        fontFamily: 'Montserrant',


    },
    textFieldStyleSingleRow: {
        width: "96%", //settare 100% per ottenere tutto lo spazio disponibile
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        marginBottom: 20
    },

    testo: {
        fontFamily: "Montserrant",
        fontSize: 18
    },

    generalita: {
        marginTop: 6,
        marginLeft: "5%"
    },
    dropdownStyle: {
        fontFamily: "MontserrantSemiBold"
    },

    tipoDocumento: {
        width: "90%",
    },

    fieldSetContentModal: {
        alignItems: "center",
        justifyContent: "center",
    },

    numeroDocumento: {
        width: "90%",
    },
    textFieldStyleGeneralModal: {
        width: "100%",
        height: 40,
        marginTop: "5%",
        //ackgroundColor: "#000"
    },

    radioButton: {
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#e4eded",
    },

    secondContainer: {
        //backgroundColor: "#000000aa"
    },

    modalView: {
        //backgroundColor: "#000000aa",
       

    },

    titolo:{
        fontFamily: "MontserrantSemiBold",
        fontSize: 18,
        marginTop: "3%",


    }


});
const CheckInScreen = ({ route, navigation }) => {
    const { user, strutturaId, alloggioId, numPersone, prenotazioneId, prenotazione, image_url } = route.params;
    const [nDocument, setNDocument] = useState(1);
    const theme = { ...DefaultTheme, roundness: 30, myOwnProperty: true, fonts: { regular: { fontFamily: 'MontserrantSemiBold', fontWeight: 'normal' } }, colors: { myOwnColor: '#303a52', primary: '#0692d4', text: '#303a52' } };
    const [IsEditable, setEditable] = useState(true);
    const [documenti, setDocumenti] = useState([]);
    const [visible, setVisible] = useState(false);
    const [typeDoc, setDocType] = useState("");
    const [numeroDoc, setNumeroDoc] = useState('');
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");
    const [luogoRilascioDoc, setLuogoRilascioDoc] = useState('');
    const [valori, setValori] = useState([{ label: 'Carta d\'identità' }, { label: 'Passaporto' }]);
    const [checked, setChecked] = useState(true);
    
    const pickerStyle = {
        inputIOS: {
            paddingHorizontal: 10,
            borderColor: '#cc3881',
            height: 40,
            width: "96%",
            alignItems: 'center',
            marginTop: 8,
            marginRight: 12,
            fontFamily: 'Montserrant',
            borderBottomWidth: 1,
        },
        placeholder: {},
        inputAndroid: {
            paddingHorizontal: 10,
            borderColor: '#cc3881',
            height: 40,
            width: "96%",
            alignItems: 'center',
            color: '#000000',
            marginTop: 8,
            marginRight: 12,
            fontFamily: 'Montserrant',
            borderBottomWidth: 1,
        },
    };

    return (
        <View style={checked ? styles.maincontainer : styles.maincontainerGray}>
            <HeaderBar title="Check-In" navigator={navigation} />

            <ScrollView style={styles.bodyScrollcontainer}>
                <View style={styles.secondContainer}>
                    <View style={styles.infoCheckIncontainer}>
                        <Image style={styles.checkInImage} source={image_url} />
                    </View>
                    <View style={styles.scrollContent}>
                        <Text style={styles.numprenotazionetxt}>Prenotazione numero:  {prenotazione.numeroPrenotazione}</Text>

                        {checked && (<View style={styles.fieldSet}>
                            <Text style={styles.legend}>Dati personali e residenza</Text>
                            <View style={styles.fieldSetContent}>
                                <View style={[styles.horizontalView, { marginTop: 20 }]}>
                                    <View style={styles.icon}>
                                        <Icon name={"account"} color={"#0692d4"} size={40} style={styles.arrow} />
                                    </View>
                                    <View style={styles.generalita}>
                                        <Text style={styles.testo}>
                                            {user.nome} {user.cognome}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.horizontalView}>
                                    <View style={styles.icon}>
                                        <Icon name={"gift-outline"} color={"#0692d4"} size={40} style={styles.arrow} />
                                    </View>
                                    <View style={styles.generalita}>
                                        <Text style={styles.testo}>
                                            {(new Date(user.dataNascita.seconds * 1000)).toLocaleString("it-IT").split(",")[0]}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.horizontalView}>
                                    <View style={styles.icon}>
                                        <Icon name={"flag"} color={"#0692d4"} size={40} style={styles.arrow} />
                                    </View>
                                    <View style={styles.generalita}>
                                        <Text style={styles.testo}>
                                            {user.nazionalita}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.horizontalView}>
                                    <View style={styles.icon}>
                                        <Icon name={"map-marker-radius"} color={"#0692d4"} size={40} style={styles.arrow} />
                                    </View>
                                    <View style={styles.generalita}>
                                        <Text style={styles.testo}>
                                            {user.indirizzo.citta}, {user.indirizzo.cap}
                                        </Text>
                                    </View>
                                </View>


                            </View>
                        </View>)}
                        </View>



                    <View style={styles.modalView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={visible}
                            style={{ marginTop: "80%" }}>

                            <View style={styles.modalContainer} >
                               
                                <View style={styles.fieldSetContentModal}>
                                <Text style={styles.titolo}>Documento numero: {nDocument}</Text>
                                    <View style={styles.horizontalViewModal}>
                                        <TextInput
                                            mode='outlined'
                                            label='Nome'
                                            disabledInputStyle={{ color: "#303a52" }}
                                            style={styles.textFieldStyleModal}
                                            editable={IsEditable}
                                            value={nome}
                                            onChangeText={(nome) => setNome(nome)}
                                            theme={theme}
                                        />
                                        <TextInput
                                            mode='outlined'
                                            label='Cognome'
                                            disabledInputStyle={{ color: "#303a52" }}
                                            style={styles.textFieldStyleModal}
                                            editable={IsEditable}
                                            value={cognome}
                                            onChangeText={(cognome) => setCognome(cognome)}
                                            theme={theme} />
                                    </View>

                                    <View style={styles.tipoDocumento}>

                                        <View>
                                            <RadioButtonRN
                                                data={valori}
                                                selectedBtn={(e) => { setDocType(e) }}
                                                box={true}
                                                animationType={["shake"]}
                                                boxStyle={styles.radioButton}
                                                textStyle={{ fontFamily: "MontserrantSemiBold" }}

                                            />
                                        </View>

                                    </View>
                                    <View style={styles.numeroDocumento}>
                                        <TextInput
                                            mode='outlined'
                                            label='Numero Documento'
                                            disabledInputStyle={{ color: "#303a52" }}
                                            style={styles.textFieldStyleGeneralModal}
                                            editable={IsEditable}
                                            value={numeroDoc}
                                            onChangeText={(numeroDoc) => setNumeroDoc(numeroDoc)}
                                            theme={theme} />
                                    </View>
                                    <View style={styles.horizontalViewModal}>
                                        <TextInput
                                            mode='outlined'
                                            label='Luogo di rilascio'
                                            disabledInputStyle={{ color: "#303a52" }}
                                            style={styles.textFieldStyleGeneralModal}
                                            editable={IsEditable}
                                            value={luogoRilascioDoc}
                                            onChangeText={(luogoRilascioDoc) => setLuogoRilascioDoc(luogoRilascioDoc)}
                                            theme={theme} />
                                    </View>
                                </View>

                                <CustomButton nome="Conferma" styleBtn={{ width: "90%", alignItems: "center", justifyContent: "center", marginLeft: "5%", marginTop: "5%", marginBottom: "5%" }} onPress={() => {
                                    console.log("ciao");
                                    console.log(numeroDoc);
                                    var documento = {
                                        nome: nome,
                                        cognome: cognome,
                                        tipoDocumento: typeDoc,
                                        luogoRilascio: luogoRilascioDoc,
                                        numeroDocumento: numeroDoc
                                    };
                                    documenti.push(documento);
                                    setDocumenti(documenti);
                                    if (nDocument == numPersone) {
                                        setVisible(false);
                                        setNDocument(1);
                                        setLuogoRilascioDoc("");
                                        setNumeroDoc("");
                                        setCognome("");
                                        setNome("");
                                        setDocumenti([]);
                                        setChecked(true);
                                        navigation.navigate("LaMiaChiave", { user: user, strutturaId: strutturaId, alloggioId: alloggioId, prenotazioneId: prenotazioneId })
                                    }
                                    else {
                                        setNDocument(nDocument + 1);
                                        setLuogoRilascioDoc("");
                                        setNumeroDoc("");
                                        setCognome("");
                                        setNome("");
                                        setVisible(false);
                                        setVisible(true);
                                        setChecked(true)
                                    }
                                }
                                } />
                            </View>
                        </Modal>

                        <View style={styles.buttonContainer}>
                            <CustomButton nome="Prosegui con il check-in" styleBtn={{ width: "90%" }} onPress={() => {
                                setChecked(false);
                                setVisible(true);

                                //navigation.navigate("LaMiaChiave", {user:user, strutturaId: strutturaId, alloggioId: alloggioId, prenotazioneId: ""}) 
                            }
                            } />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default CheckInScreen;

