import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

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

    return(
        <ScrollView  style={styles.maincontainer}>
            <Text style={styles.numprenotazionetxt}>Prenotazione n. {numeroPren}</Text>
            <View style={styles.infoStrutturacontainer}>
                <Image style={styles.strutturaImage} source={require("../../assets/hotelImage.png")}/>
                <Text style={styles.nameStruttura}>{nameStruttura}</Text>
            </View>
            <View style={styles.fieldSet}>
                <Text style={styles.legend}>Info prenotazione</Text>
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
            <View style={styles.fieldSet}>
                <Text style={styles.legend}>Informazioni sulla camera</Text>
                <View style={styles.horizontalView}>
                    <Text style={styles.categoryText}>Camera: </Text>
                    <Text style={styles.normalText}>{cameraDetails}</Text>
                </View>
                <View style={styles.horizontalView}>
                    <Image style={styles.userIcon} source={require("../../assets/user.png")} />
                    <Text style={styles.normalText}>{infoPersone}</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style = {styles.bottone} onPress={() => { navigation.navigate('HomeHost'); }} >
                    <Text style={{color:'#ffffff'}}>Chiave</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.bottone} onPress={() => { navigation.navigate('HomeHost'); }} >
                    <Text style={{color:'#ffffff'}}>Servizi camera</Text>
                </TouchableOpacity>
            </View>
        </ScrollView >
    );
}

export default PrenotazioneScreen;

const styles = StyleSheet.create({
    maincontainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    numprenotazionetxt: {
        textAlign: "left",
        fontSize: "18px",
        color: "black"
    },
    infoStrutturacontainer:{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    strutturaImage:{
        width: 128,
        height: 128,
    },
    checkInContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'left',
      justifyContent: 'left',
    },
    checkOutContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'left',
        justifyContent: 'left',
    },
    costoTotContainer: {
      flex: 1,
      flexDirection: 'row', //imposta orientamento orizzontale degli elementi
      backgroundColor: '#fff',
      alignItems: 'left',
      justifyContent: 'left',
    },
    horizontalView:{
      flex: 1,
      flexDirection: 'row',
    },
    userIcon: {
        width: 32, 
        height: 32,
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
        top: -10,
        left: 10,
        fontWeight: 'bold',
        backgroundColor: '#FFFFFF'
    },
    categoryText: {
        fontSize: "18px",
        color: "black",
        fontWeight: "bold"
    },
    normalText: {
        fontSize: "16px",
        color: "black"
    },
    buttonContainer:{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    bottoneStyle : {
        borderWidth: 1,
        width: 140,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:8,
        backgroundColor: '#f2077d',
    },
});