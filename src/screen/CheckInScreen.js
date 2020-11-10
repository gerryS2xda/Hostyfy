import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import HeaderBar from '../components/CustomHeaderBar'
import RNPickerSelect from 'react-native-picker-select';

const CheckInScreen = ({navigation}) =>{
    const numeroPren = 10;
    const nomeOsp = "Tizio Caio";
    const [typeDoc, setDocType] = useState(null);
    const [numeroDoc, setNumeroDoc] = useState('');
    const [luogoRilascioDoc, setLuogoRilascioDoc] = useState('');
    const pickerStyle = {
		inputIOS: {
			paddingHorizontal: 10,
			borderRadius: 8,
			borderWidth:1.4,
			borderColor: '#cc3881',
			height:40,
			width:300,
			alignItems: 'center',
			
		},
		placeholder: {},
		inputAndroid: {
			paddingHorizontal: 10,
			borderRadius: 8,
			borderWidth:1.4,
			borderColor: '#cc3881',
			height:40,
			width:300,
			alignItems: 'center',
			color:'#000000'
		},
	};

    const createAlertForWelcomeVideo = () =>
        Alert.alert(
        "Check-In",
        "Benvenuto nella nostra struttura!! Accoglienza mediante video di presentazione nella prossima versione :)"
        [
            {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
    );

    return(
        <View style={styles.maincontainer}>
            <HeaderBar title="Check-In" navigator={navigation} /> 
            <ScrollView style={styles.bodyScrollcontainer}>
                <Text style={styles.numprenotazionetxt}>Prenotazione n. {numeroPren}</Text>
                <View style={styles.infoCheckIncontainer}>
                    <Image style={styles.checkInImage} source={require("../../assets/hotelImage.png")}/>
                    <Text style={styles.checkIntxt}>Check-In {nomeOsp}</Text>
                </View>
                <View style={styles.fieldSet}>
                    <Text style={styles.legend}>Dati personali e residenza</Text>
                    <View style={styles.fieldSetContent}>
                        <View style={styles.horizontalView}>
                            <Text style={styles.singleField}>Tizio</Text>
                            <Text style={styles.singleField}>Caio</Text>
                        </View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.singleField}>23/11/1963</Text>
                            <Text style={styles.singleField}>M</Text>
                            <Text style={styles.singleField}>Italiana</Text>
                        </View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.singleField}>Via Mario Rossi, 2</Text>
                            <Text style={styles.singleField}>Avellino (AV)</Text>
                            <Text style={styles.singleField}>83100</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.fieldSet}>
                    <Text style={styles.legend}>Documento riconoscimento</Text>
                    <View style={styles.fieldSetContent}>
                        <View style={styles.horizontalView}>
                            <RNPickerSelect
                                style = {pickerStyle}
                                onValueChange = {(typeDoc) => {setDocType(typeDoc); console.log(typeDoc);}}
                                value={typeDoc}
                                placeholder = {{
                                    label: 'Tipo documento',
                                    value: "Select tipo documento",
                                }}
                                items={[
                                    { label: 'Carta d\'Identità', value: 'Carta d\'Identità' },
                                    { label: 'Patente di guida', value: 'Patente di guida' },
                                ]}
                                useNativeAndroidPickerStyle={false}
                            />
                            <TextInput
                                style = {styles.textFieldStyle}
                                placeholder = 'Numero documento'
                                onChangeText = {(numeroDoc) => setNumeroDoc(numeroDoc)}
                            />
                        </View>
                        <TextInput
                            style = {styles.textFieldStyle}
                            placeholder = 'Luogo di rilascio'
                            onChangeText = {(luogoRilascioDoc) => setLuogoRilascioDoc(luogoRilascioDoc)}
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                        <TouchableOpacity style = {styles.bottoneStyle} onPress={createAlertForWelcomeVideo} >
                            <Text style={{color:'#ffffff'}}>Avanti</Text>
                        </TouchableOpacity>
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
        paddingLeft: 32,
        paddingRight: 32,
    },
    numprenotazionetxt: {
          textAlign: "left",
          fontSize: 18,
          color: "black",
          fontWeight: "bold",
          marginTop: 16,
          marginBottom: 16,
    },
    infoCheckIncontainer:{
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16
    },
    checkInImage:{
          width: 128,
          height: 128,
    },
    checkIntxt: {
        fontSize: 16,
        color: "black",
        textAlign: "center",
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
        fontWeight: 'bold',
        backgroundColor: '#FFFFFF',
        fontSize: 16,
        padding: 4,
        color: '#f2077d',
    },
    fieldSetContent: {
        alignSelf: "baseline",
        marginLeft: 16,
    },
    singleField: {
        height: 40,
        width:100,
        borderColor: '#cc3881',
        borderWidth: 1.4,
        marginTop:8,
        borderRadius: 8,
        paddingTop:9,
    },
    horizontalView: {
        flexDirection: 'row',
    },
    textFieldStyle: {
        height: 40,
        width:150,
        borderColor: '#cc3881',
        borderWidth: 1.4,
        marginTop:8,
        borderRadius: 8,
    },
    buttonContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        marginBottom: 20
    },
    bottoneStyle : {
        borderWidth: 1,
        width: 120,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:8,
        backgroundColor: '#f2077d',
    },    
});