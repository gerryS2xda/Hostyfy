import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import HeaderBar from '../components/CustomHeaderBar'

const PrenotazioneScreen = ({navigation}) =>{
    const numeroPren = 10;
    const nameStruttura = "La mia struttura";
    const dataCheckIn = "01/11/2020";
    const oraInizioCheckIn = "12:00";
    const oraFineCheckIn = "20:00";
    const dataCheckOut = "03/11/2020";
    const oraInizioCheckOut = "10:00";
    const oraFineCheckOut = "11:00";
    const prezzo = "80";
    const cameraDetails = "Doppia con letti singoli";
    const infoPersone = "2 adulti";
    const nameCamera = "Suite";
    const myKey = "0123"

    return(
        <View style={styles.maincontainer}>
            <HeaderBar title="Prenotazione" navigator={navigation} /> 
            <ScrollView style={styles.bodyScrollcontainer}>
                    <Text style={styles.numprenotazionetxt}>Prenotazione n. {numeroPren}</Text>
                    <View style={styles.infoStrutturacontainer}>
                        <Image style={styles.strutturaImage} source={require("../../assets/hotelImage.png")}/>
                        <Text style={styles.nameStruttura}>{nameStruttura}</Text>
                    </View>
                    <View style={styles.fieldSet}>
                        <Text style={styles.legend}>Info prenotazione</Text>
                        <View style={styles.fieldSetContent}>
                            <View style={styles.checkInContainer}>
                                <Text style={styles.categoryText}>Check in</Text>
                                <Text style={styles.normalText}>{dataCheckOut}</Text>
                                <Text style={styles.normalText}>Dalle ore {oraInizioCheckOut} alle ore {oraFineCheckOut}</Text>
                            </View>
                            <View style={styles.checkOutContainer}>
                                <Text style={styles.categoryText}>Check out</Text>
                                <Text style={styles.normalText}>{dataCheckIn}</Text>
                                <Text style={styles.normalText}>Dalle ore {oraInizioCheckIn} alle ore {oraFineCheckIn}</Text>
                            </View>
                            <View style={styles.costoTotContainer}>
                                <Text style={styles.categoryText}>Costo totale: </Text>
                                <Text style={styles.normalText}>{prezzo}€</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.fieldSet}>
                        <Text style={styles.legend}>Informazioni sulla camera</Text>
                        <View style={styles.fieldSetContent}>
                            <View style={styles.horizontalViewInfoCamera}>
                                <Text style={styles.categoryText}>Camera: </Text>
                                <Text style={styles.normalText}>{cameraDetails}</Text>
                            </View>
                            <View style={styles.horizontalViewInfoCamera}>
                                <Image style={styles.userIcon} source={require("../../assets/user.png")} />
                                <Text style={styles.normalText}>{infoPersone}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style = {styles.bottoneStyle} onPress={() => { navigation.navigate('LaMiaChiave', {idKey: myKey, cameraName: nameCamera}); }} >
                            <Text style={{color:'#ffffff'}}>Chiave</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.bottoneStyle} onPress={() => { navigation.navigate('InfoCamera'); }} >
                            <Text style={{color:'#ffffff'}}>Servizi camera</Text>
                        </TouchableOpacity>
                    </View>
            </ScrollView>
        </View>
    );
}

export default PrenotazioneScreen;

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
    infoStrutturacontainer:{
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16
    },
    strutturaImage:{
        width: 128,
        height: 128,
    },
    nameStruttura: {
      fontSize: 16,
      color: "black",
      textAlign: "center",
      marginTop: 4
    },
    checkInContainer: {
      marginTop: 16,
    },
    checkOutContainer: {
        marginTop: 16,
    },
    costoTotContainer: {
      flexDirection: 'row', //imposta orientamento orizzontale degli elementi
      backgroundColor: '#fff',
      marginTop: 16,
    },
    horizontalView:{
      flexDirection: 'row',
    },
    horizontalViewInfoCamera:{
      flexDirection: 'row',
      marginTop: 16,
      marginBottom: 4,
    },
    userIcon: {
        width: 24, 
        height: 24,
        marginRight: 10,
    },
    fieldSet:{
        margin: 10,
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        alignItems: 'center',
        borderColor: '#000'
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
    categoryText: {
        fontSize: 16,
        color: "black",
        fontWeight: "bold"
    },
    normalText: {
        fontSize: 16,
        color: "black"
    },
    buttonContainer:{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
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

