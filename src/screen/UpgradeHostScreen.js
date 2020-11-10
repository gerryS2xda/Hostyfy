import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import HeaderBar from '../components/CustomHeaderBar';
import Dialog from "react-native-dialog";

const UpgradeHostScreen = ({navigation}) =>{
    const userState = "guest"; //necessario per controllare lo stato attuale dell'utente

    //Necessario per primo dialog
    const [isVisibleFirstDialog, setFirstDialogVisible] = useState(false);
    const [isVisibleSecondDialog, setSecondDialogVisible] = useState(false);
    const [isVisibleThirdDialog, setThirdDialogVisible] = useState(false);
    const [valueEmail, setEmailValue] = useState('');
    const [valuePwd, setPwdValue] = useState('');
    const prezzoUpgrade = 80;
    const [valueNumCarta, setNumeroCartaValue] = useState('');
    const [valueDataScadenza, setDataScadenzaValue] = useState('');

    return(
        <View style={styles.maincontainer}>
            <HeaderBar title="Prenotazione" navigator={navigation} /> 
            <ScrollView style={styles.bodyScrollcontainer}>
                <Text style={styles.categoryTxt}>Servizi dedicati all'host</Text>
                <Text style={styles.normalTxt}>
                    1. Registrazione di una struttura; {"\n"}
                    2. Gestione smart della propria struttura; {"\n"}
                    3. Gestione calendario della struttura e alloggi; {"\n"}
                    4. Visualizzazione alloggi disponibili; {"\n"}
                    5. Visualizzazione prenotazioni attive e storico; {"\n"}
                    6. Check-In {"&"} Check-out automatizzato; {"\n"}
                    7. Gestione clean service; {"\n"}
                    8. Visualizzazione recensioni; {"\n"}
                    9. Servizi premium dedicati all'host (chat, shop online, etc.); {"\n"}
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style = {styles.bottoneStyle} onPress={()=>{
                        setFirstDialogVisible(true);
                    }} >
                        <Text style={{color:'#ffffff'}}>Effettua upgrade</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Dialog.Container visible={isVisibleFirstDialog}>
                        <Dialog.Title>Upgrade Host</Dialog.Title>
                        <Dialog.Description> Inserire le proprie credenziale per continuare il processo </Dialog.Description>
                        <Dialog.Input label="e-mail:" value={valueEmail} onChangeText={setEmailValue} />
                        <Dialog.Input label="password:" value={valuePwd} onChangeText={setPwdValue} />
                        <Dialog.Button label="Procedi" onPress={()=>{
                            setFirstDialogVisible(false);
                            setSecondDialogVisible(true);
                        }}/>  
                        <Dialog.Button label="Annulla" onPress={()=>{
                            setFirstDialogVisible(false);
                        }}/>            
                    </Dialog.Container>
                </View>
                <View>
                    <Dialog.Container visible={isVisibleSecondDialog}>
                        <Dialog.Title>Upgrade Host</Dialog.Title>
                        <Dialog.Description> Il costo per effettuare l'upgrade e' {prezzoUpgrade}€ </Dialog.Description>
                        <Dialog.Button label="Procedi con il pagamento" onPress={()=>{
                            setSecondDialogVisible(false);
                            setThirdDialogVisible(true);
                        }} />   
                        <Dialog.Button label="Annulla" onPress={()=>{
                            setSecondDialogVisible(false);
                        }}/>            
                    </Dialog.Container>
                </View>
                <View>
                    <Dialog.Container visible={isVisibleThirdDialog}>
                        <Dialog.Title>Upgrade Host</Dialog.Title>
                        <Dialog.Description> Inserire le proprie credenziale per continuare il processo </Dialog.Description>
                        <Dialog.Input label="Numero carta:" value={valueNumCarta} onChangeText={setNumeroCartaValue} />
                        <Dialog.Input label="Data scadenza:" value={valueDataScadenza} onChangeText={setDataScadenzaValue} />
                        <Dialog.Button label="Conferma" onPress={()=>{
                            setThirdDialogVisible(false);
                            Alert.alert(
                                "Upgrade Host",
                                "Esito dell'operazione positivo! Congratulazione, ora sei un host!",
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
                        }}/>
                        <Dialog.Button label="Annulla" onPress={()=>{
                            setThirdDialogVisible(false);
                        }}/>             
                    </Dialog.Container>
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
      paddingLeft: 32,
      paddingRight: 32,
    },
    categoryTxt:{
        textAlign: "left",
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
        marginTop: 16,
        marginBottom: 16,
    },
    normalTxt: {
        fontSize: 16, 
        color: 'black'
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