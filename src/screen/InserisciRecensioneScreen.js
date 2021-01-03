import React, {useState, useRef} from 'react';
import {View, Text, ScrollView, StyleSheet, TextInput, Alert} from 'react-native';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';
import * as RecensioneModel from "../firebase/datamodel/RecensioneModel"

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
        marginLeft:32,
        marginRight:32,
    },
    textSuggestStyle:{
        fontFamily: "MontserrantSemiBold",
        fontSize: 18,
        marginTop: 20,
        marginBottom: 10,
    },
    textInputContainer: {
        width: "100%",
    },
    bottomButtonContainer: {
        marginTop: 10,
        marginBottom:20,
    },
    singleField: {
        height: 40,
        width:"100%",
        borderColor: '#cc3881',
        borderBottomWidth: 1.4,
        marginTop:8,
        fontFamily: "MontserrantSemiBold",
        paddingLeft: 5,
        marginTop: 16,
    },
    descrizioneField: {
        height: 200,
        width:"100%",
        borderColor: '#cc3881',
        borderBottomWidth: 1.4,
        marginTop:8,
        paddingBottom:160,
        fontFamily: "MontserrantSemiBold",
        paddingLeft: 5,
        marginTop: 16,
        backgroundColor: '#f5f5f2',
    },
  });

const InserisciRecensioneScreen = ({route, navigation}) =>{
    const {userId, prenotazione} = route.params;
    const strutturaId = prenotazione.strutturaRef;
    const alloggioId = prenotazione.alloggioRef;
    const prenotazioneId = prenotazione.id;
    const [punteggio, setPunteggio] = useState("");
    const [feedbackPositive, setFeedbackPositive] = useState("");
    const [feedbackNegative, setFeedbackNegative] = useState("");
    var punteggioRef = useRef(null);
    var feedbackPositiveRef = useRef(null);
    var feedbackNegativeRef = useRef(null);

    return(
        <View style={styles.maincontainer}>
            <HeaderBar title="Aggiungi recensione" navigator={navigation} />
            <ScrollView style={styles.bodyScrollcontainer}>
                <View style={styles.scrollContent}> 
                    <View style={styles.textInputContainer}>
                        <Text style={styles.textSuggestStyle}> Come valuti il tuo soggiorno? </Text>
                        <TextInput 
                            ref = {punteggioRef}
                            style={styles.singleField}
                            placeholder = 'Punteggio (da 1 a 10)'
                            onChangeText = {(punteggio) => setPunteggio(punteggio)}
                        />
                        <TextInput 
                            ref = {feedbackPositiveRef}
                            style={styles.descrizioneField}
                            placeholder = 'Cosa ti è piaciuto?'
                            multiline={true}
                            numberOfLines={15}
                            onChangeText = {(feedbackPositive) => setFeedbackPositive(feedbackPositive)}
                        />
                        <TextInput 
                            ref = {feedbackNegativeRef}
                            style={styles.descrizioneField}
                            placeholder = 'Cosa non ti è piaciuto?'
                            multiline={true}
                            numberOfLines={15}
                            onChangeText = {(feedbackNegative) => setFeedbackNegative(feedbackNegative)}
                        />
                        <View style={styles.bottomButtonContainer}>
                            <CustomButton styleBtn={{width: "100%"}} nome="Aggiungi" onPress={()=>{
                                async function onPressAggiungiRecensione(){
                                    var dataRecensione = new Date(); //data odierna

                                    //Costruisci oggetto per data di soggiorno mediante data di Iinizio della prenotazione
                                    var dataInizio = new Date(prenotazione.dataInizio*1000);
                                    const monthNames = ["January", "February", "March", "April", "May", "June",
                                        "July", "August", "September", "October", "November", "December"];
                                    var dataSoggiorno = monthNames[dataInizio.getMonth()] + " " + dataInizio.getFullYear();

                                    //Attendi finche' non viene creata una nuova recensione
                                    await RecensioneModel.createRecensioneDocument(strutturaId, alloggioId, prenotazioneId, userId, dataRecensione, dataSoggiorno, punteggio, feedbackNegative, feedbackPositive);
                                
                                    //Resetta i campi
                                    punteggioRef.current.clear();  
                                    feedbackPositiveRef.current.clear();
                                    feedbackNegativeRef.current.clear();

                                    //Mostra Alert per mostrare esito positivo operazione e torna nella pagina precedente
                                    Alert.alert("Recensione", "La recensione e' stata memorizzata con successo!",
                                    [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
                                    { text: "OK", onPress: ()=> {
                                        navigation.goBack();
                                    }}],
                                    { cancelable: false });
                                }
                                onPressAggiungiRecensione();
                            }} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default InserisciRecensioneScreen;
