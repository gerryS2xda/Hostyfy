import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import HeaderBar from '../components/CustomHeaderBar';
import Dialog from "react-native-dialog";
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
    const [emailWebAlloggiati, setEmailWebAlloggiati] = useState('');
    const [passwordWebAlloggiati, setPasswordWebAlloggiati] = useState('');
    var prezzoUpgrade = "80";
    const [valueNumCarta, setNumeroCartaValue] = useState('');
    const [valueDataScadenza, setDataScadenzaValue] = useState('');
    const [valueCCVScadenza, setCCVValue] = useState('');

    if(valueDataScadenza !== ""){ //resetta campo per date text input nel CustomAlertTextInput
        setDataScadenzaValue("");
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
                            styleBtn={{width: 150}} 
                            onPress={()=>{ setFirstDialogVisible(true); }} 
                        />    
                    </View>
                    {
                        isVisibleFirstDialog && (
                            <CustomAlertTextInput
                                visibility={isVisibleFirstDialog}
                                setVisibility={setFirstDialogVisible}
                                titolo="Upgrade Host"
                                testo="Inserire le proprie credenziale per continuare il processo"
                                buttonName="Procedi"
                                placeholder = "E-mail"
                                setTextData={setEmailWebAlloggiati}
                                showSecondTxtInput={true}
                                placeholderSecondInput="Password"
                                setSecondTextData={setPasswordWebAlloggiati}
                                onOkPress={()=>{
                                    setFirstDialogVisible(false);
                                    setSecondDialogVisible(true);
                                }} />
                        )
                    }
                    {
                        isVisibleSecondDialog && (
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
                                    setSecondDialogVisible(false);
                                    setThirdDialogVisible(true);
                                }} />
                        )
                    }
                    {
                        isVisibleThirdDialog && (
                            <CustomAlertTextInput
                                visibility={isVisibleThirdDialog}
                                setVisibility={setThirdDialogVisible}
                                titolo="Upgrade Host"
                                testo="Inserire le informazioni della propria carta di credito per terminare il processo"
                                buttonName="Conferma"
                                placeholder = "Numero carta"
                                setTextData={setNumeroCartaValue}
                                showDatePickerTxtInput={true}
                                placeholderDateInput="Data scadenza"
                                dateValue={valueDataScadenza}
                                setDateInput={setDataScadenzaValue}
                                showSecondTxtInput={true}
                                placeholderSecondInput="CCV"
                                setSecondTextData={setCCVValue}
                                onOkPress={()=>{
                                    setThirdDialogVisible(false);
                                    setShowUpgradeAlert(true);
                                }} />
                        )
                    }
                    {
                        showUpgradeAlert && (
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
                                }} />
                        )
                    }
                </View>
            </ScrollView>
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
        color: "black",
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