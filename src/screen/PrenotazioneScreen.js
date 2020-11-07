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

