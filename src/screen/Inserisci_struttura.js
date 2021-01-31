import React from 'react';
import { Text, View, Image, ScrollView, Alert, StyleSheet, Modal, ActivityIndicator, Dimensions } from 'react-native';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';
import * as StrutturaModel from "../firebase/datamodel/StrutturaModel";
import { firebase } from "../firebase/config"
import { TextInput } from 'react-native-paper';
import { DefaultTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomAlertGeneral from "../components/CustomAlertGeneral";

//Firebase
var db = firebase.firestore();
var storageRef = firebase.storage().ref(); // create a storage reference from our storage service

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: '#344545',
        //justifyContent: 'center',
        //backgroundColor: "#000000"
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: "#000000"
    },
    topContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: "4%"

    },
    upperMiddleContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 10,
        width: '90%',
        borderColor: "#f0f0f0",
        paddingBottom: "5%",
        paddingTop: "5%"
    },
    lowerMiddleContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 0.7,
        borderRadius: 10,
        width: '90%',
        marginTop: "5%",
        borderColor: "#f0f0f0",
        paddingBottom: "4%",
        borderWidth: 2,
        paddingTop: "3%",
    },
    singleTextInput: {
        height: 45,
        marginBottom: "2%",
        fontFamily: "Monsterrant",
    },

    finalContainer: {
        justifyContent: 'space-around',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.7,
        borderRadius: 10,
        width: '90%',
        marginTop: "5%",
        borderColor: "#f0f0f0",
        marginBottom: "5%",
        paddingTop: "3%",
        paddingBottom: "3%",
        borderWidth: 2,
    },

    bottonContainer: {
        width: "100%",
        alignItems: 'center',
        marginTop: "2%",
        marginBottom: "4%"
    },

    datePickerStyle: {
        width: 200,
        marginTop: 20,
    },

    singleText: {
        fontFamily: "MontserrantSemiBold",
        fontSize: 25,
        marginBottom: "10%",
        color: '#303a52',
    },

    page: {
        backgroundColor: "#ffffff",
        flex: 1,
        width: Dimensions.get('window').width,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },

    singolaView: {
        marginBottom: "5%",
        paddingBottom: "8%",
        paddingTop: "6%",
        maxHeight: 650,
        justifyContent: "space-around",
        alignItems: "center",
        width: "90%",
        borderWidth: 2,
        borderRadius: 20,
        borderColor: "#f0f0f0",
    },

    singolaView2: {
        marginTop: "4%",
        paddingBottom: "2%",
        paddingTop: "4%",
        maxHeight: 600,
        justifyContent: "space-around",
        alignItems: "center",
        width: "90%",
        borderWidth: 2,
        borderRadius: 20,
        borderColor: "#f0f0f0",
    },

    guidaView: {
        width: "88%",
        flexDirection: "row",
        marginTop: "20%",
        justifyContent: "space-between",
        //backgroundColor: "#000000"
    },

    guidaView2: {
        width: "88%",
        flexDirection: "row",
        marginTop: "5%",
        marginBottom: "5%",
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor: "#000000"
    },

    titoloView: {marginBottom: "2%"},

    viewCampi: {

        width: "90%",
        justifyContent: "center",
        alignContent: "center"
    },
    viewCampi2: {
        marginBottom: "15%",
        width: "90%",
        justifyContent: "center",
        alignContent: "center"
    },


    ButtonContainer: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        //backgroundColor: "#000"

    },

    keyboard: {
        flex: 1,
    },

    secondScroll: {
        width: Dimensions.get('window').width,
    },
    titoloView2: {
        marginVertical: "10%"
    },
    inserimento:
    {
        marginLeft: "10%",
        width: "80%",
        marginTop: "5%",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        //backgroundColor: "#000"
    },
    information: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',

    },
   
    otherText: {
        fontFamily: "MontserrantSemiBold"

    }

});


export default class InserisciStrutturaScreen extends React.Component {

    constructor(props) {


        super(props);
        this.state = {
            denominazione: "",
            citta: "",
            cap: "",
            provincia: "",
            regione: "",
            nazione: "",
            tipologia: "",
            numeroAlloggi: "",
            descrizione: "",
            via: "",
            modalUploadVisibility: false,
            isStrutturaStateUpdate: false,
            disableInsertStrutturaButton: false, //per disabilitare il button dopo il click al fine di evitare doppio inserimento   
            scrollRef: React.createRef(),
            theme: { ...DefaultTheme, roundness: 30, myOwnProperty: true, fonts: { regular: { fontFamily: 'MontserrantSemiBold', fontWeight: 'normal' } }, colors: { myOwnColor: '#303a52', primary: '#0692d4', text: '#303a52' } },
            IsEditable: true,
            showCustomAlert: false,
            scrollRefVerticalScrollView : React.createRef(),
        }
    }

    componentDidMount() {
        var struttState = this.props.route.params.state;

        if (struttState.hasOwnProperty("denominazione") && !this.state.isStrutturaStateUpdate) {
            this.setState({
                denominazione: struttState.denominazione, via: struttState.via, citta: struttState.citta,
                cap: struttState.cap, provincia: struttState.provincia, regione: struttState.regione,
                nazione: struttState.nazione, tipologia: struttState.tipologia, numeroAlloggi: struttState.numeroAlloggi,
                descrizione: struttState.descrizione, isStrutturaStateUpdate: true
            });
        }
    }

    componentDidUpdate() {
        var struttState = this.props.route.params.state;

        if (struttState.hasOwnProperty("denominazione") && !this.state.isStrutturaStateUpdate) {
            this.setState({
                denominazione: struttState.denominazione, via: struttState.via, citta: struttState.citta,
                cap: struttState.cap, provincia: struttState.provincia, regione: struttState.regione,
                nazione: struttState.nazione, tipologia: struttState.tipologia, numeroAlloggi: struttState.numeroAlloggi,
                descrizione: struttState.descrizione, isStrutturaStateUpdate: true
            });
        }
    }

    render() {
        var user = this.props.route.params.user;
        var photoList = this.props.route.params.photoList;

        return (
            <View style={styles.maincontainer}>
                {
                    this.state.modalUploadVisibility && (
                        <Modal
                            transparent={true}
                            visible={this.state.modalUploadVisibility}>
                            <View style={{ flex: 1, backgroundColor: "#000000aa", justifyContent: "center", alignItems: "center" }}>
                                <View style={{ backgroundColor: "white", padding: 10, borderRadius: 5, width: "80%", alignItems: "center" }}>
                                    <Text style={styles.progressHeader}>Loading...</Text>
                                    <ActivityIndicator size="large" color="#f35588" />
                                </View>
                            </View>
                        </Modal>
                    )
                }
                <HeaderBar title="Nuova struttura" navigator={this.props.navigation} />
                <ScrollView
                    style={styles.secondScroll}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
                    ref={this.state.scrollRefVerticalScrollView}>

                    <ScrollView
                        pagingEnabled={true}
                        contentContainerStyle={styles.container}
                        showOrizontalScrollIndicator={false}
                        horizontal
                        ref={this.state.scrollRef}
                        bounces={false}>
                        <View style={styles.page}>
                            <View style={styles.singolaView}>
                                <View style={styles.titoloView}>
                                    <Text style={styles.singleText}>
                                        Inserimento Struttura
                                    </Text>
                                </View>
                                <View style={styles.viewCampi}>
                                    <TextInput
                                        mode='outlined'
                                        label='Denominazione Struttura'
                                        disabledInputStyle={{ color: "#303a52" }}
                                        style={styles.singleTextInput}
                                        editable={this.state.IsEditable}
                                        value={this.state.denominazione}
                                        onChangeText={(testo) => this.setState({ denominazione: testo })}
                                        theme={this.state.theme}
                                        ref={input => { this.denominazione = input }}
                                    />
                                    <TextInput
                                        mode='outlined'
                                        label='Indirizzo'
                                        disabledInputStyle={{ color: "#303a52" }}
                                        style={styles.singleTextInput}
                                        editable={this.state.IsEditable}
                                        value={this.state.via}
                                        onChangeText={(testo) => this.setState({ via: testo })}
                                        theme={this.state.theme}
                                        ref={input => { this.via = input }}
                                    />
                                    <TextInput
                                        mode='outlined'
                                        label='Città'
                                        disabledInputStyle={{ color: "#303a52" }}
                                        style={styles.singleTextInput}
                                        editable={this.state.IsEditable}
                                        value={this.state.citta}
                                        onChangeText={(testo) => this.setState({ citta: testo })}
                                        theme={this.state.theme}
                                        ref={input => { this.citta = input }}
                                    />
                                    <TextInput
                                        mode='outlined'
                                        label='Provincia'
                                        disabledInputStyle={{ color: "#303a52" }}
                                        style={styles.singleTextInput}
                                        editable={this.state.IsEditable}
                                        value={this.state.provincia}
                                        onChangeText={(testo) => this.setState({ provincia: testo })}
                                        theme={this.state.theme}
                                        ref={input => { this.provincia = input }}
                                    />
                                    <TextInput
                                        mode='outlined'
                                        label='CAP'
                                        disabledInputStyle={{ color: "#303a52" }}
                                        style={styles.singleTextInput}
                                        editable={this.state.IsEditable}
                                        value={this.state.cap}
                                        onChangeText={(testo) => this.setState({ cap: testo })}
                                        theme={this.state.theme}
                                        ref={input => { this.cap = input }}
                                    />
                                    <TextInput
                                        mode='outlined'
                                        label='Regione'
                                        disabledInputStyle={{ color: "#303a52" }}
                                        style={styles.singleTextInput}
                                        editable={this.state.IsEditable}
                                        value={this.state.regione}
                                        onChangeText={(testo) => this.setState({ regione: testo })}
                                        theme={this.state.theme}
                                        ref={input => { this.regione = input }}
                                    />
                                    <TextInput
                                        mode='outlined'
                                        label='Nazione'
                                        disabledInputStyle={{ color: "#303a52" }}
                                        style={styles.singleTextInput}
                                        editable={this.state.IsEditable}
                                        value={this.state.nazione}
                                        onChangeText={(testo) => this.setState({ nazione: testo })}
                                        theme={this.state.theme}
                                        ref={input => { this.nazione = input }}
                                    />
                                </View>

                                <View style={styles.guidaView}>
                                    <View style={styles.ButtonContainer}>
                                        <CustomButton
                                            styleBtn={{ width: "100%" }}
                                            nome={"Completa l'inserimento"}
                                            onPress={() => { 
                                                    this.state.scrollRef.current.scrollTo({ x: (Dimensions.get('window').width)})
                                                    this.state.scrollRefVerticalScrollView.current.scrollTo({y: 0})}} />
                                    </View>
                                </View>
                            </View>
                        </View>


                        <View style={styles.page}>
                            <View style={styles.singolaView2}>
                                <View style={styles.titoloView2}>
                                    <Text style={styles.singleText}>
                                        Ci siamo quasi...
                                    </Text>
                                </View>
                                <View style={styles.viewCampi2}>
                                    <TextInput
                                        mode='outlined'
                                        label='Tipologia'
                                        disabledInputStyle={{ color: "#303a52" }}
                                        style={styles.singleTextInput}
                                        editable={this.state.IsEditable}
                                        value={this.state.tipologia}
                                        onChangeText={(testo) => this.setState({ tipologia: testo })}
                                        theme={this.state.theme}
                                        ref={input => { this.tipologia = input }}
                                    />
                                    <TextInput
                                        mode='outlined'
                                        label='Numero alloggi'
                                        disabledInputStyle={{ color: "#303a52" }}
                                        style={styles.singleTextInput}
                                        editable={this.state.IsEditable}
                                        value={this.state.numeroAlloggi}
                                        onChangeText={(valore) => this.setState({ numeroAlloggi: valore })}
                                        theme={this.state.theme}
                                        ref={input => { this.alloggi = input }}
                                        keyboardType={'numeric'}
                                    />
                                    <TextInput
                                        mode='outlined'
                                        label='Descrizione'
                                        disabledInputStyle={{ color: "#303a52" }}
                                        style={styles.descrizioneField}
                                        editable={this.state.IsEditable}
                                        multiline={true}
                                        numberOfLines={10}
                                        value={this.state.descrizione}
                                        onChangeText={(testo) => this.setState({ descrizione: testo })}
                                        theme={this.state.theme}
                                        ref={input => { this.descrizione = input }} />

                                    <View style={styles.inserimento}>
                                        <TouchableOpacity
                                            style={styles.information}
                                            onPress={this.state.showCustomAlert && ( <CustomAlertGeneral
                                                visibility={this.state.showCustomAlert}
                                                setVisibility={setCustomAlertVisibility}
                                                titolo="Inserisci Foto"
                                                testo= {"Funzionalità non ancora disponibile!"}
                                                buttonName="Ok"
                                                onOkPress={()=>{console.log("Cancel Pressed")}}/>)}>
                                            <Icon name={"camera-plus-outline"} color={"#0692d4"} size={40} style={styles.arrow} />
                                            <Text
                                                style={styles.otherText} >
                                                Inserisci Foto
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[styles.information]}
                                            onPress={this.state.showCustomAlert && ( <CustomAlertGeneral
                                                visibility={this.state.showCustomAlert}
                                                setVisibility={setCustomAlertVisibility}
                                                titolo="Inserisci Guida"
                                                testo= {"Funzionalità non ancora disponibile!"}
                                                buttonName="Ok"
                                                onOkPress={()=>{console.log("Cancel Pressed")}}/>)}>
                                            <Icon name={"book-open"} color={"#0692d4"} size={40} style={styles.arrow} />
                                            <Text
                                                style={styles.otherText} >
                                                Inserisci guida
                                        </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.guidaView2}>
                                <View style={styles.ButtonContainer}>
                                    <CustomButton
                                        styleBtn={{ width: "90%" }}
                                        nome={"Torna indietro"}
                                        onPress={()=>{this.state.scrollRef.current.scrollTo({ x: 0})}} />
                                </View>
                                <View style={styles.ButtonContainer}>
                                    <CustomButton
                                        styleBtn={{ width: "90%" }}
                                        nome={"Inserisci Struttura"}
                                        onPress={() => {
                                            async function updateStruttura() {
                                                IsEditable ? setIsEditable(false) : setIsEditable(true);
                                                if (!IsEditable) {
                                                    var indirizzo = { via: via, citta: citta, cap: cap, provincia: provincia, regione: regione, nazione: nazione };
                                                    await StrutturaModel.updateStrutturaDocument(strutturaId, denominazione, descrizione, indirizzo, "", numAlloggi, tipologia);
                                                }
                                            }
                                            updateStruttura();
                                        }} />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </ScrollView>
            </View >
        );
    }

    onPressAggiungiStruttura = async (user, photoList, reference, navigation) => {

        //Costruzione dell'object javascript 'indirizzo'
        var indirizzo = { via: reference.state.via, citta: reference.state.citta, cap: reference.state.cap, provincia: reference.state.provincia, regione: reference.state.regione, nazione: reference.state.nazione }

        //Generazione di un codice OTP random
        var otp = Math.floor(Math.random() * 100000);

        //Attendi finche' non completi inserimento della nuova struttura nel DB
        await StrutturaModel.createStrutturaDocument(user.userIdRef, otp, reference.state.denominazione, reference.state.descrizione, indirizzo, " ", reference.state.numeroAlloggi, reference.state.tipologia, "not specificated", {});

        if (photoList.length != 0) {
            //Fai comparire il popup per indicare attesa del completamento dell'operazione di upload di immagini
            if (!reference.state.modalUploadVisibility) {
                reference.setState({ modalUploadVisibility: true });
            }

            //Attendi completamento dell'esecuzione della query per ottenere le strutture in base al nome
            var struttureDocs = await StrutturaModel.getStrutturaByDenominazione(reference.state.denominazione);
            for (const doc of struttureDocs) {
                var struttura = doc.data();
                var idStruttura = doc.id;
                var fotoArray = Object.values(struttura.fotoList); //restituisce gli URL delle foto in un array JS
                var fotoCount = fotoArray.length + 1;

                for (const photo of photoList) { //Finche' bisogna caricare una foto nello storage
                    var photoPath = "struttura/" + idStruttura + "/" + struttura.denominazione + "/" + fotoCount;
                    //Attendi finch' non ottieni download URL dell'immagine caricata nello storage
                    let downloadURL = await this.uploadImageAndGetDownloadURL(photo.uri, photoPath);
                    if (downloadURL !== "")
                        fotoArray.push(downloadURL);
                    fotoCount++;
                }
                //Attendi completamento dell'aggiornamento del campo foto di quella struttura
                await StrutturaModel.updateFotoField(idStruttura, Object.assign({}, fotoArray));
                //Quando caricamento delle immagini nello storage e nei doc della struttura, rendi invisibile il popup
                if (reference.state.modalUploadVisibility) {
                    reference.setState({ modalUploadVisibility: false });
                }

                Alert.alert("Inserimento struttura", "La nuova struttura e' stata memorizzata con successo!",
                    [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
                    {
                        text: "OK", onPress: () => {
                            //reset dei field del form
                            reference.setState({
                                denominazione: "", via: "", citta: "",
                                cap: "", provincia: "", regione: "", nazione: "", tipologia: "", numeroAlloggi: "", descrizione: ""
                            });
                            reference.denominazione.clear();
                            reference.regione.clear();
                            reference.citta.clear();
                            reference.provincia.clear();
                            reference.descrizione.clear();
                            reference.alloggi.clear();
                            reference.tipologia.clear();
                            reference.nazione.clear();
                            reference.cap.clear();
                            reference.via.clear();

                            navigation.navigate("LeMieStrutture", { user: user });
                        }
                    }],
                    { cancelable: false });
            }
        } else {
            Alert.alert("Inserimento struttura", "La nuova struttura e' stata memorizzata con successo!",
                [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
                {
                    text: "OK", onPress: () => {

                        //reset dei field del form
                        reference.setState({
                            denominazione: "", via: "", citta: "",
                            cap: "", provincia: "", regione: "", nazione: "", tipologia: "", numeroAlloggi: "", descrizione: ""
                        });
                        reference.denominazione.clear();
                        reference.regione.clear();
                        reference.citta.clear();
                        reference.provincia.clear();
                        reference.descrizione.clear();
                        reference.alloggi.clear();
                        reference.tipologia.clear();
                        reference.nazione.clear();
                        reference.cap.clear();
                        reference.via.clear();

                        navigation.navigate("LeMieStrutture", { user: user });
                    }
                }],
                { cancelable: false });
        }
        reference.setState({ disableInsertStrutturaButton: false }); //resetta lo stato del pulsante "Aggiungi" e rendilo cliccabile
    }

    //Function for upload a image and obtain a download URL
    uploadImageAndGetDownloadURL = async (uri, pathImage) => {
        var downloadURL = "";
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = storageRef.child(pathImage);

        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = ref.put(blob);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            (snapshot) => {
                switch (snapshot.state) {
                    case firebase.storage.TaskState.RUNNING: // or 'paused'
                        break;
                    case firebase.storage.TaskState.SUCCESS:
                        break;
                    case firebase.storage.TaskState.ERROR: // or 'paused'
                        Alert.alert("Immagini", "Si è verificato un problema durante il caricamento delle immagini! Si prega di riprovare o controllare lo stato della connessione.",
                            [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
                            { text: "OK", onPress: () => console.log("OK - error image Upload Pressed") }
                            ],
                            { cancelable: false });
                        break;
                }
            }, (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        console.log("User doesn't have permission to access the object");
                        break;
                    case 'storage/canceled':
                        console.log("User canceled the upload");
                        break;
                    case 'storage/unknown':
                        console.log("Unknown error occurred, inspect error.serverResponse");
                        break;
                }
            });

        try {
            await uploadTask;  //attendi completamento di upload Task
            // Upload completed successfully, now we can get the download URL
            downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            console.log('File available at', downloadURL);
        } catch (e) {
            console.log("UploadImageError: " + e);
        }
        return downloadURL;
    }

    //funzione per verificare che tutti i campi siano stati inseriti (controllo generale)
    validateFormField = (photoList) => {
        var flag = true; //tutti i campi sono compilati
        var message = "Attenzione!! Uno dei campi obbligatori non è compilato. Il campo non compilato è ";
        if (this.state.denominazione === "") {
            message += "\"Denominazione\"";
            flag = false;
        } else if (this.state.citta === "") {
            message += "\"Città\"";
            flag = false;
        } else if (this.state.provincia === "") {
            message += "\"Provincia\"";
            flag = false;
        } else if (this.state.regione === "") {
            message += "\"Regione\"";
            flag = false;
        } else if (this.state.nazione === "") {
            message += "\"Nazione\"";
            flag = false;
        } else if (this.state.tipologia === "") {
            message += "\"Tipologia\"";
            flag = false;
        } else if (this.state.numeroAlloggi === "") {
            message += "\"Numero alloggi\"";
            flag = false;
        } else if (this.state.descrizione === "") {
            message += "\"Descrizione\"";
            flag = false;
        } else if (this.state.via === "") {
            message += "\"Via\"";
            flag = false;
        } else if (photoList.length == 0) {
            message = "Attenzione!! Per completare l'inserimendo di una struttura è necessario inserire una sua immagine.";
            flag = false;
        }
        if (!flag) {
            Alert.alert("Inserimento struttura", message,
                [{ text: "Cancel", style: "cancel" },
                { text: "OK" }],
                { cancelable: false });
        }
        return flag;
    }

}