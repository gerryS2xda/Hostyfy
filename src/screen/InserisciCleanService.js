import React, { useState, useEffect } from 'react'
import { View,ScrollView, StyleSheet, Alert, BackHandler} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';
import * as CleanServiceModel from "../firebase/datamodel/CleanServiceModel"; 
import CustomAlertGeneral from "../components/CustomAlertGeneral";

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
	topContainer: {
		width: "100%",
    },
    
    twoFieldContainer: {
		marginTop: 16, 
		flexDirection: 'row',
		justifyContent: 'space-between',
    
    },

    threeButtonContainer: {
		marginTop: 16, 
		flexDirection: 'row',
		justifyContent: 'space-between',
    },

    bottomButtonContainer: {
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

    middleTextInput: {
		height: 40,
		width:"45%",
		borderColor: '#cc3881',
		borderBottomWidth: 1.4,
		fontFamily: "MontserrantSemiBold",
    	paddingLeft: 5
      },
      carouselStyle: {
        justifyContent:'center',
        marginRight:50,
    },
  });

export default InserisciCleanService = ({route, navigation}) =>{

    const {user, id} = route.params;
    
    const [ditta,setDitta] = useState("");
    const [email,setEmail] = useState("");
    const [telefono,setTelefono] = useState("");
    const [disableInsertCSButton, setInsertCSButtonStatus] = useState(false); //per prevenire doppio click che comporta doppio inserimento
    const [showAlertInsert, setShowAlertInsert] = useState(false);
    const [showAlertErrorField, setShowAlertErrorField] = useState(false);
    const [showAlertBackButton, setShowAlertBackButton] = useState(false);
    const [messageAlert, setMessageAlert] = useState("");

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
	}
    
        return (
            <View style={styles.maincontainer}>
                <HeaderBar title="Nuova ditta di pulizie" navigator={navigation} />
                <ScrollView style={styles.bodyScrollcontainer}>
                    <View style={styles.scrollContent}> 
                        <View style={styles.topContainer}>
                            <TextInput 
                                style={styles.singleField}
                                placeholder='Ditta'
                                onChangeText = {(testo) => setDitta(testo)}
                                value={ditta}
                            />
                            <TextInput 
                                style={styles.singleField}
                                placeholder='Email'
                                onChangeText = {(testo) => setEmail(testo)}
                                value={email}
                            />
                            <TextInput 
                                style={styles.singleField}
                                placeholder='Telefono'
                                onChangeText = {(testo) => setTelefono(testo)}
                                value={telefono}
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
                                            await CleanServiceModel.createCleanServiceDocument(email,telefono,ditta, new Date(), user.userIdRef);
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
                    navigation.navigate('CleanService', {user: user, id: id});
                  }} />
            </View>
        )
    }

