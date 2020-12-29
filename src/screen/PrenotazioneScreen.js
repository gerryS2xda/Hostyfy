import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from "../components/CustomButton";

const PrenotazioneScreen = ({route,navigation}) =>{
    const {prenotazione, alloggio} = route.params; 
    const numeroPren = 10873945;
    //const nameStruttura = "La mia struttura"; <Text style={styles.nameStruttura}>{nameStruttura}</Text>
    const dataCheckIn = "01/11/2020";
    const oraInizioCheckIn = "12:00";
    const oraFineCheckIn = "20:00";
    const dataCheckOut = "03/11/2020";
    const oraInizioCheckOut = "10:00";
    const oraFineCheckOut = "11:00";
    const prezzo = "80";
    const cameraDetails = "Doppia con letti singoli";
    const infoPersone = "1 adulto";
    const nameCamera = "Suite";
    const myKey = "0123";

    return(
        <View style={styles.maincontainer}>
            <HeaderBar title="Prenotazione" navigator={navigation} /> 
            <ScrollView style={styles.bodyScrollcontainer}>
                <View style={styles.scrollContent}> 
                    <Text style={styles.numprenotazionetxt}>Prenotazione n. {prenotazione.numeroPrenotazione}</Text>
                    <View style={styles.infoStrutturacontainer}>
                        <Image style={styles.strutturaImage} source={require("../../assets/hotelExampleStruttura.png")}/>
                        
                    </View>
                    <View style={styles.fieldSet}>
                        <Text style={styles.legend}>Info prenotazione</Text>
                        <View style={styles.fieldSetContent}>
                            <View style={styles.checkInContainer}>
                                <Text style={styles.categoryText}>Check in</Text>
                                <Text style={styles.normalText}>{( new Date(prenotazione.dataInizio*1000)).toLocaleString("it-IT").split(",")[0]}</Text>
                                <Text style={styles.normalText}>Dalle ore {oraInizioCheckIn} alle ore {oraFineCheckIn}</Text>
                            </View>
                            <View style={styles.checkOutContainer}>
                                <Text style={styles.categoryText}>Check out</Text>
                                <Text style={styles.normalText}>{( new Date(prenotazione.dataFine * 1000)).toLocaleString("it-IT").split(",")[0]}</Text>
                                <Text style={styles.normalText}>Dalle ore {oraInizioCheckOut} alle ore {oraFineCheckOut}</Text>
                            </View>
                            <View style={styles.costoTotContainer}>
                                <Text style={styles.categoryText}>Costo totale: </Text>
                                <Text style={styles.normalText}>{prenotazione.costo}€</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.fieldSet}>
                        <Text style={styles.legend}>Informazioni sulla camera</Text>
                        <View style={styles.fieldSetContent}>
                            <View style={styles.horizontalViewInfoCamera}>
                                <Text style={styles.categoryText}>Camera: </Text>
                                <Text style={styles.normalText}>{alloggio.descrizione}</Text>
                            </View>
                            <View style={styles.horizontalViewInfoCamera}>
                                <Image style={styles.userIcon} source={require("../../assets/user.png")} />
                                <Text style={styles.normalText}>{prenotazione.numPersone}</Text>
                            </View>
                        </View>
                    </View>
                    <ButtonContainer navigator={navigation} />
                </View>
            </ScrollView>
        </View>
    );
}

export default PrenotazioneScreen;

function ButtonContainer(props) {
    const [counter, setCounter] = useState(0);
    console.log("PrenotazioneScreen: counter=" + counter);
    if(counter==0){
        return(
            <View style={styles.buttonContainer}>
                <CustomButton nome="Check-In" styleBtn={{width: "100%"}} onPress={() => { 
                    setCounter(counter+1);
                    props.navigator.navigate('EffettuaCheckIn'); 
                }} />
            </View>
        );
    }else{
        return(
            <View style={styles.buttonContainer}>
                <CustomButton nome="Chiave" styleBtn={{width: "45%"}} onPress={() => { props.navigator.navigate('LaMiaChiave'); }} />
                <CustomButton nome="Servizi camera" styleBtn={{width: "45%"}} onPress={() => { props.navigator.navigate('InfoCamera'); }} />
            </View>
        );
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
    infoStrutturacontainer:{
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16
    },
    strutturaImage:{
        width: 192,
        height: 192,
    },
    nameStruttura: {
      fontSize: 16,
      color: "black",
      textAlign: "center",
      marginTop: 4,
      fontFamily: "MontserrantSemiBold",
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
        fontFamily: "MontserrantSemiBold",
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
        fontFamily: "MontserrantBold",
    },
    normalText: {
        fontSize: 16,
        color: "black",
        fontFamily: "Montserrant",
    },
    buttonContainer:{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: 10,
      marginBottom: 20
    },
    scrollContent: {
        marginLeft:16,
        marginRight:16,
    },
});

