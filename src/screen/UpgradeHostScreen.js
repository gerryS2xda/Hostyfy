import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import HeaderBar from '../components/CustomHeaderBar';
import CustomAlertTextInput from "../components/CustomAlertTextInput";
import CustomAlertGeneral from "../components/CustomAlertGeneral"
import CustomButton from "../components/CustomButton";
import * as GuestModel from "../firebase/datamodel/GuestModel"
import * as HostModel from "../firebase/datamodel/HostModel"

const UpgradeHostScreen = ({route, navigation}) =>{
    
    const {user} = route.params; 
    //Necessario per primo dialog
    const [isVisibleFirstDialog, setFirstDialogVisible] = useState(false);
    const [isVisibleSecondDialog, setSecondDialogVisible] = useState(false);
    const [isVisibleThirdDialog, setThirdDialogVisible] = useState(false);
    const [showUpgradeAlert, setShowUpgradeAlert] = useState(false);
    const [emailWebAlloggiati, setEmailWebAlloggiati] = useState("");
    const [passwordWebAlloggiati, setPasswordWebAlloggiati] = useState("");
    var prezzoUpgrade = "80";
    const [valueNumCarta, setNumeroCartaValue] = useState("");
    const [valueDataScadenza, setDataScadenzaValue] = useState("");
    const [valueCCV, setCCVValue] = useState("");
    const [messageAlert, setMessageAlert] = useState("");
    const [showAlertGeneral, setShowAlertGeneral] = useState(false);

    const resetState = () =>{
        if(emailWebAlloggiati !== "")
            setEmailWebAlloggiati("");
        if(passwordWebAlloggiati)
            setPasswordWebAlloggiati("");    
        if(valueDataScadenza !== "") //resetta campo per date text input nel CustomAlertTextInput
            setDataScadenzaValue("");
        if(valueNumCarta !== "")
            setNumeroCartaValue("");    
        if(valueCCV)
            setCCVValue("");
    }

    //funzione per verificare che tutti i campi siano stati inseriti (controllo generale)
    const validateFormField = (isCreditCardRequired)=>{

        var flag = true; //tutti i campi sono compilati
        var message = "Attenzione!! Uno dei campi obbligatori non è compilato. Il campo non compilato è ";
        if(isCreditCardRequired){
            if(valueNumCarta === ""){
                message += "\"Numero carta\"";
                flag = false;
            }else if(valueDataScadenza === ""){
                message += "\"Data scadenza\"";
                flag = false;
            }else if(valueCCV === ""){
                message += "\"CCV\"";
                flag = false;
            }
        }else if(emailWebAlloggiati === ""){
            message += "\"E-mail\"";
            flag = false;
        }else if(passwordWebAlloggiati === ""){
            message += "\"Password\"";
            flag = false;
        }
        if(!flag){
            setMessageAlert(message);
            setShowAlertGeneral(true);
        }
        return flag;
    }

    return(
        <View style={styles.maincontainer}>
            <HeaderBar title="Upgrade host" navigator={navigation} /> 
            <ScrollView style={styles.bodyScrollcontainer}>
                <View style={styles.scrollContent}> 
                    <Text style={styles.categoryTxt}>Servizi dedicati all'host</Text>
                        <Text style={styles.normalTxt}>1. Registrazione di una struttura; </Text>
                        <Text style={styles.normalTxt}>2. Gestione smart della propria struttura; </Text>
                        <Text style={styles.normalTxt}>3. Gestione calendario della struttura e alloggi; </Text>
                        <Text style={styles.normalTxt}>4. Visualizzazione alloggi disponibili; </Text>
                        <Text style={styles.normalTxt}>5. Visualizzazione prenotazioni attive e storico; </Text>
                        <Text style={styles.normalTxt}>6. Check-In {"&"} Check-out automatizzato; </Text>
                        <Text style={styles.normalTxt}>7. Gestione clean service; </Text>
                        <Text style={styles.normalTxt}>8. Visualizzazione recensioni; </Text>
                        <Text style={styles.normalTxt}>9. Servizi premium dedicati all'host (chat, shop online, etc.). </Text>
                    <View style={styles.buttonContainer}>
                        <CustomButton 
                            nome="Effettua upgrade" 
                            styleBtn={{width: "90%"}} 
                            onPress={()=>{ 
                                resetState(); //resetta lo stato prima di iniziare la procedura
                                setFirstDialogVisible(true); 
                            }} 
                        />    
                    </View>
                </View>
            </ScrollView>
            <CustomAlertTextInput
                visibility={isVisibleFirstDialog}
                setVisibility={setFirstDialogVisible}
                titolo="Upgrade Host"
                testo="Inserire le proprie credenziale per continuare il processo"
                buttonName="Procedi"
                placeholder = "E-mail"
                setTextData={setEmailWebAlloggiati}
                keyboardTypeFirstInput="email-address"
                showDatePickerTxtInput={false}
                showSecondTxtInput={true}
                placeholderSecondInput="Password"
                setSecondTextData={setPasswordWebAlloggiati}
                keyboardTypeSecondInput="default"
                secureTextEntrySecondInput={true}
                onOkPress={()=>{
                    if(!validateFormField(false)){
                        return;
                    }

                    setFirstDialogVisible(false);
                    setSecondDialogVisible(true);
                }} 
            />
            <CustomAlertGeneral
                visibility={isVisibleSecondDialog}
                titolo="Upgrade Host"
                testo= {"Il costo per effettuare l'upgrade è " + prezzoUpgrade + "€"}
                annullaBtnName="Annulla"
                onAnnullaBtn={()=>{
                    setSecondDialogVisible(false);
                }}
                buttonName="Paga"
                onOkPress={()=>{
                    if(user.numeroCarta === "" || user.numeroCarta == 0){
                        setSecondDialogVisible(false);
                        setThirdDialogVisible(true);
                    }else{
                        setShowUpgradeAlert(true);
                    }
                }} 
            />
            <CustomAlertTextInput
                visibility={isVisibleThirdDialog}
                setVisibility={setThirdDialogVisible}
                titolo="Upgrade Host"
                testo="Non sono presenti informazioni relative alla carta di credito. Inserire le informazioni della propria carta di credito per terminare il processo"
                buttonName="Conferma"
                placeholder = "Numero carta"
                setTextData={setNumeroCartaValue}
                keyboardTypeFirstInput="numeric"
                maxLengthFirstInput={16}
                showDatePickerTxtInput={true}
                placeholderDateInput="Data scadenza"
                dateValue={valueDataScadenza}
                setDateInput={setDataScadenzaValue}
                showSecondTxtInput={true}
                placeholderSecondInput="CCV"
                setSecondTextData={setCCVValue}
                keyboardTypeSecondInput="numeric"
                maxLengthSecondInput={3}
                onOkPress={()=>{
                    if(!validateFormField(true)){
                        return;
                    }

                    setThirdDialogVisible(false);
                    setShowUpgradeAlert(true);
                }} 
            />
            <CustomAlertGeneral
                visibility={showUpgradeAlert}
                titolo="Upgrade Host"
                testo= {"Esito dell'operazione positivo! Congratulazioni, ora sei un host!"}
                hideNegativeBtn={true}
                buttonName="Ok"
                onOkPress={()=>{
                    async function upgradeHost(){
                        await GuestModel.updateisHost(user.userId, true);
                        await HostModel.createHostDocument(user.userId, emailWebAlloggiati, passwordWebAlloggiati);
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'HomeHost',  params: { userId: user.userId }}],
                        }); //resetta lo stack quando si ritorna nella Home
                    }
                    upgradeHost();
                }} 
            />
            <CustomAlertGeneral
                visibility={showAlertGeneral}
                titolo="Upgrade Host"
                testo= {messageAlert}
                hideNegativeBtn={true}
                buttonName="Ok"
                onOkPress={()=>{
				    setShowAlertGeneral(false);  
            }} />
        </View>
    );
}

export default UpgradeHostScreen;

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
        marginLeft:32,
        marginRight:24,
    },
    categoryTxt:{
        textAlign: "left",
        fontSize: 18,
        color: "#303a52",
        marginTop: 16,
        marginBottom: 16,
        fontFamily: "MontserrantBold",
    },
    normalTxt: {
        fontSize: 16, 
        color: 'black',
        marginTop: 4,
        marginLeft: 16,
        marginRight: 16,
        fontFamily: "Montserrant",
    },
    buttonContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
        marginBottom: 20
    },
    styleDialogTitle: {
        fontFamily: "MontserrantBold",
    },
    styleDialogDescription: {
        fontFamily: "Montserrant",
    },
    styleDialogBtnTxt: {
        fontFamily: "MontserrantSemiBold",
    },
    styleDialogInput: Platform.select({    
        ios: {
            fontFamily: 'MontserrantSemiBold',

        },
        android: {
            fontFamily: 'MontserrantSemiBold',
            borderBottomWidth: 1,
        } 
    }),
});