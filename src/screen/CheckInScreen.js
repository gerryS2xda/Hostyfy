import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import HeaderBar from '../components/CustomHeaderBar'
import RNPickerSelect from 'react-native-picker-select';
import CustomButton from "../components/CustomButton"


const CheckInScreen = ({route, navigation}) =>{
    const {user, strutturaId, alloggioId, numPersone} = route.params;
    const [nDocument, setNDocument] = useState(1);
    const [documenti,setDocumenti] = useState([]);
    const [visible, setVisible] = useState(false);
    const [typeDoc, setDocType] = useState(null);
    const [numeroDoc, setNumeroDoc] = useState('');
    const [luogoRilascioDoc, setLuogoRilascioDoc] = useState('');
    const pickerStyle = {
		inputIOS: {
			paddingHorizontal: 10,
			borderColor: '#cc3881',
			height:40,
			width:"96%",
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
			height:40,
			width:"96%",
			alignItems: 'center',
            color:'#000000',
            marginTop: 8,
            marginRight: 12,
            fontFamily: 'Montserrant',
            borderBottomWidth: 1,
		},
	};

    return(
        <View style={styles.maincontainer}>
            <HeaderBar title="Check-In" navigator={navigation} /> 
            <ScrollView style={styles.bodyScrollcontainer}>
                <View style={styles.scrollContent}> 
                    <Text style={styles.numprenotazionetxt}>Prenotazione n. {0}</Text>
                    <View style={styles.infoCheckIncontainer}>
                        <Image style={styles.checkInImage} source={require("../../assets/hotelExampleStruttura.png")}/>
                        <Text style={styles.checkIntxt}>Check-In {user.nome + " " + user.cognome}</Text>
                    </View>
                    <View style={styles.fieldSet}>
                        <Text style={styles.legend}>Dati personali e residenza</Text>
                        <View style={styles.fieldSetContent}>
                            <View style={styles.horizontalView}>
                                <Text style={styles.singleField}>{user.nome}</Text>
                                <Text style={styles.singleField}>{user.cognome}</Text>
                            </View>
                            <View style={styles.horizontalView}>
                                <Text style={styles.singleField}>{( new Date(user.dataNascita.seconds * 1000)).toLocaleString("it-IT").split(",")[0]}</Text>
                                <Text style={styles.singleField}>{user.nazionalita}</Text>
                            </View>
                            <View style={styles.horizontalView}>
                                <Text style={styles.singleFieldRow}>{user.indirizzo.via}</Text>
                            </View>
                            <View style={styles.horizontalView}>
                                <Text style={styles.singleField}>{user.indirizzo.citta}</Text>
                                <Text style={styles.singleField}>{user.indirizzo.cap}</Text>
                            </View>
                        </View>
                    </View>
                    <Modal 
                    animationType="slide"
                    transparent={true}
                    visible={visible}
                    style = {{marginTop:"50%"}}
                    >
                    <View style ={styles.modalContainer} >
                        <Text style={styles.legend}>Documento riconoscimento numero {nDocument}</Text>
                        <View style={styles.fieldSetContent}>
                            <View style={styles.horizontalView}>
                                <RNPickerSelect
                                    style = {pickerStyle}
                                    onValueChange = {(typeDoc) => {setDocType(typeDoc); console.log(typeDoc);}}
                                    value={typeDoc}
                                    placeholder = {{
                                        label: 'Tipo documento',
                                        value: null,
                                    }}
                                    items={[
                                        { label: 'Carta d\'Identità', value: 'Carta d\'Identità' },
                                        { label: 'Patente di guida', value: 'Patente di guida' },
                                    ]}
                                    useNativeAndroidPickerStyle={false}
                                />
                                <TextInput
                                    style = {styles.textFieldStyle}
                                    placeholder = 'N° documento'
                                    value = {numeroDoc}
                                    onChangeText = {(numeroDoc) => setNumeroDoc(numeroDoc)}
                                />
                            </View>
                            <View style={styles.horizontalView}>
                                <TextInput
                                    style = {[styles.textFieldStyle, styles.textFieldStyleSingleRow]}
                                    placeholder = 'Luogo di rilascio'
                                    value = {luogoRilascioDoc}
                                    onChangeText = {(luogoRilascioDoc) => setLuogoRilascioDoc(luogoRilascioDoc)}
                                />
                            </View>
                        </View>
                        <CustomButton nome="Conferma" styleBtn={{width: "100%"}} onPress={()=>{
                                console.log("ciao");
                                console.log(numeroDoc);
                                var documento = {
                                    tipoDocumento: typeDoc,
                                    luogoRilascio: luogoRilascioDoc,
                                    numeroDocumento: numeroDoc 
                                };
                                documenti.push(documento);
                                setDocumenti(documenti);
                                console.log(documenti)
                                if(nDocument == numPersone){
                                    setVisible(false);
                                    //navigation.navigate("LaMiaChiave", {user:user, strutturaId: strutturaId, alloggioId: alloggioId, prenotazioneId: ""}) 
                                }
                                else{
                                    setNDocument(nDocument + 1);
                                    setLuogoRilascioDoc("");
                                    setNumeroDoc("");
                                    setVisible(false);
                                    setVisible(true)
                                }
                             }
                         } />
                    </View>
                    </Modal>
                    <View style={styles.buttonContainer}>
                        <CustomButton nome="La mia chiave" styleBtn={{width: "100%"}} onPress={()=>{
                                setVisible(true);
                                //navigation.navigate("LaMiaChiave", {user:user, strutturaId: strutturaId, alloggioId: alloggioId, prenotazioneId: ""}) 
                             }
                         } />
                    </View>
                </View>
            </ScrollView>
       </View> 
    );
}

export default CheckInScreen;

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
        marginLeft: 16, 
        marginRight: 16,
    },
    modalContainer: {
        backgroundColor:'#c8c8c8',
        marginTop:"50%",
        width: "90%",
        marginLeft:"5%"
    },
    numprenotazionetxt: {
          textAlign: "left",
          fontSize: 16,
          color: "black",
          marginTop: 16,
          marginBottom: 16,
          fontFamily: "MontserrantSemiBold",
    },
    infoCheckIncontainer:{
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16
    },
    checkInImage:{
          width: 192,
          height: 192,
    },
    checkIntxt: {
        fontSize: 16,
        color: "black",
        textAlign: "center",
        fontFamily: "MontserrantSemiBold",
        marginTop: 4
    },
    fieldSet:{
        margin: 10,
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        alignItems: 'center',
        borderColor: '#000',
    },
    legend:{
        position: 'absolute',
        top: -16,
        left: 10,
        fontFamily: "MontserrantSemiBold",
        backgroundColor: '#FFFFFF',
        fontSize: 16,
        padding: 4,
        color: '#f2077d',
    },
    fieldSetContent: {
        alignSelf: "baseline",
        marginLeft: 8,
    },
    singleField: {
        height: 40,
        width: "45%", //oldvalue: 120
        borderColor: '#cc3881',
        marginTop:8,
        paddingTop:9,
        marginRight: 12,
        paddingLeft: 8,
        fontFamily: 'Montserrant',
        color: "black",
        borderBottomWidth: 1,
        
    },
    singleFieldRow: {
        height: 40,
        width: "96%", //oldvalue: 120
        borderColor: '#cc3881',
        marginTop:8,
        paddingTop:9,
        marginRight: 12,
        paddingLeft: 8,
        fontFamily: 'Montserrant',
        borderBottomWidth: 1,
    },
    horizontalView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 8
    },
    comboBoxStyle: {
        marginTop: 8,
        marginRight: 8,
    },
    textFieldStyle: {
        height: 40,
        width:"40%",
        borderColor: '#cc3881',
        marginTop:8,
        marginRight: 12,
        paddingLeft: 8,
        fontFamily: 'Montserrant',
        borderBottomWidth: 1,
    },
    textFieldStyleSingleRow: {
        width: "96%", //settare 100% per ottenere tutto lo spazio disponibile
    },
    buttonContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        marginBottom: 20
    },
});