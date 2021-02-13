import React, { useState, useEffect, useCallback } from 'react'
import { View,ScrollView, StyleSheet, Alert, BackHandler} from 'react-native';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';
import * as CleanServiceModel from "../firebase/datamodel/CleanServiceModel"; 
import CustomAlertGeneral from "../components/CustomAlertGeneral";
import DatePickerInputField from "../components/DatePickerInputField"
import { TextInput } from 'react-native-paper';
import { DefaultTheme } from '@react-navigation/native';

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
        flex:1,
        width: "90%",
        borderWidth: 2,
        borderColor: "#e4eded",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: "20%",
      },
      topContainer: {
        
        paddingTop: "5%",
        width: "100%",
        paddingHorizontal: "5%",
        justifyContent: 'center',
      },
    
      bottomButtonContainer: {
        width: "90%",
        marginBottom: 20,
      },
    
      singleField: {
        height: 45,
        marginBottom: "2%",
        fontFamily: "Monsterrant",
      },
    
      container:{
        justifyContent: 'center',
        alignItems: 'center',
    
    },
});

const theme = { ...DefaultTheme, roundness: 30, myOwnProperty: true, fonts: { regular: { fontFamily: 'MontserrantSemiBold', fontWeight: 'normal' } }, colors: { myOwnColor: '#303a52', primary: '#0692d4', text: '#303a52' } }

export default InserisciCleanService = ({route, navigation}) =>{

    const {user, id} = route.params;
    
    const [ditta,setDitta] = useState("");
    const [email,setEmail] = useState("");
    const [telefono,setTelefono] = useState("");
    const [dataAssunzione, setDataAssunzione] = useState("");
    const [disableInsertCSButton, setInsertCSButtonStatus] = useState(false); //per prevenire doppio click che comporta doppio inserimento
    const [showAlertInsert, setShowAlertInsert] = useState(false);
    const [showAlertErrorField, setShowAlertErrorField] = useState(false);
    const [showAlertBackButton, setShowAlertBackButton] = useState(false);
    const [messageAlert, setMessageAlert] = useState("");
    const isFocused = useIsFocused();

    //Intercetto della pressione del tasto back per avvisare utente di annullamento dell'operazione
    const backAction = () => {
		setShowAlertBackButton(true);
        return true;
    };

    useFocusEffect(
		useCallback(() => {
			// Do something when the screen is focused
			BackHandler.addEventListener("hardwareBackPress", backAction);
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
				BackHandler.removeEventListener("hardwareBackPress", backAction);
			};
		}, [isFocused])
	);

    //funzione per verificare che tutti i campi siano stati inseriti (controllo generale)
    const validateFormField = ()=>{

        var flag = true; //tutti i campi sono compilati
        var message = "Attenzione!! Uno dei campi obbligatori non è compilato. Il campo non compilato è ";
        if(ditta === ""){
            message += "\"Ditta\"";
            flag = false;
        }else if(email === ""){
            message += "\"Email\"";
            flag = false;
        }else if(telefono === ""){
            message += "\"Telefono\"";
            flag = false;
        }else if(dataAssunzione === ""){
            message += "\"Data assunzione\"";
            flag = false;
        }
        if(!flag){
            setMessageAlert(message);
            setShowAlertErrorField(true);
        }
        return flag;
    }

    //Resetta stato
	const resetState = ()=>{
		setDitta("");
        setEmail("");
        setTelefono("");
        setDataAssunzione("");
	}
    
    return (
            <View style={styles.maincontainer}>
                <HeaderBar title="Nuova ditta di pulizie" navigator={navigation} insertPage={true} isHost={user.isHost} />
                <ScrollView 
                    style={styles.bodyScrollcontainer}
                    contentContainerStyle={styles.container}>
                    <View style={styles.scrollContent}> 
                        <View style={styles.topContainer}>
                            <TextInput
                                mode='outlined'
                                label='Dittà'
                                style={styles.singleField}
                                value={ditta}
                                onChangeText={(testo) => setDitta(testo)}
                                theme={theme}
                                placeholder='Ditta'
                            />

                            <TextInput
                                mode='outlined'
                                label='Email'
                                style={styles.singleField}
                                value={email}
                                onChangeText={(testo) => setEmail(testo)}
                                theme={theme}
                                placeholder='Email'
                            />

                            <TextInput
                                mode='outlined'
                                label='Telefono'
                                style={styles.singleField}
                                value={telefono}
                                onChangeText={(testo) => setTelefono(testo)}
                                theme={theme}
                                placeholder='Telefono'
                            />

                            <DatePickerInputField
                                styleContainer={{ borderColor: '#303a52', borderRadius: 25, marginTop: 14 }}
                                styleField={{ width: "85%" }}
                                date={(dataAssunzione === "") ? "" : (new Date(dataAssunzione).toDateString("it-IT"))}
                                setDate={setDataAssunzione}
                                placeholder={"Data assunzione"}
                            />
                        </View>
                        <View style={styles.bottomButtonContainer}>
                            <CustomButton 
                                styleBtn={{marginTop: 10, width: "100%"}} 
                                nome="Aggiungi" 
                                disabled={disableInsertCSButton}
                                onPress={()=>{
                                    if(validateFormField()){
                                        setInsertCSButtonStatus(true);
                                        async function onPressAggiungiCS(){
                                            await CleanServiceModel.createCleanServiceDocument(email,telefono,ditta, dataAssunzione, user.userIdRef);
                                            resetState();

                                            setInsertCSButtonStatus(false);
                                            setShowAlertInsert(true);
                                        }
                                        onPressAggiungiCS();
                                    }
                              } 
                            } />
                        </View>
                    </View>
                </ScrollView>
                <CustomAlertGeneral
                  visibility={showAlertInsert}
                  titolo="Nuova ditta di pulizie"
                  testo= {messageAlert}
                  hideNegativeBtn={true}
                  buttonName="Ok"
                  onOkPress={()=>{ 
                    setShowAlertInsert(false);
					navigation.navigate('VisualizzaCleanServices', {user: user});
                  }} />
                <CustomAlertGeneral
                  visibility={showAlertErrorField}
                  titolo="Nuova ditta di pulizie"
                  testo= {messageAlert}
                  hideNegativeBtn={true}
                  buttonName="Ok"
                  onOkPress={()=>{
					  setShowAlertErrorField(false);  
                  }} />
                <CustomAlertGeneral
                  visibility={showAlertBackButton}
                  titolo="Attenzione!"
                  testo= "Tutti i valori inseriti fino a questo momento non saranno salvati. Sei sicuro di voler tornare indietro?"
                  annullaBtnName="Annulla"
                  onAnnullaBtn={()=>{
					setShowAlertBackButton(false);
                  }}
                  buttonName="Sì"
                  onOkPress={()=>{ 
                    //Resetta i campi
                    resetState();
                    navigation.reset({
						index: 0,
						routes: [{ name: 'HomeHost', params: { userId: user.userIdRef } }],
					}); //resetta lo stack quando si ritorna nella Home
                  }} />
            </View>
        )
    }

