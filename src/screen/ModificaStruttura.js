import React, { useState, useCallback, useRef } from 'react';
import { Text, View, Image, ScrollView, StyleSheet, Alert, Dimensions, Modal, ActivityIndicator } from 'react-native';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import {firebase} from "../firebase/config"
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';
import * as StrutturaModel from "../firebase/datamodel/StrutturaModel";
import Slideshow from 'react-native-image-slider-show';
import { TextInput } from 'react-native-paper';
import { DefaultTheme } from '@react-navigation/native';
import CustomAlertGeneral from "../components/CustomAlertGeneral"
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';

//Firebase
var storageRef = firebase.storage().ref(); // create a storage reference from our storage service

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: "#000"
    },

    bodyScrollcontainer: {
        width: Dimensions.get('window').width,
    },

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: "#000000"
    },

    page: {
        backgroundColor: "#fff",
        flex: 1,
        width: Dimensions.get('window').width,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },

    singolaView: {
        //backgroundColor: "#000",
        paddingBottom: "5%",
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },

    carouselContainer: {
        flex: 1,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: "4%",
    },

    titoloView: {
        width: "90%",
        alignContent: "center",
        justifyContent: "center",
        marginTop: "4%",
    },

    singleText: {
        fontSize: 20,
        alignContent: "center",
        justifyContent: "center",
        fontFamily: "MontserrantSemiBold"
    },

    informationContainer: {
        marginTop: "5%",
        justifyContent: "center",
        alignItems: "center"

    },

    information: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "3%",
        marginBottom: "3%"
    },

    arrow: {
        marginBottom: 5,

    },

    indirizzoText: {
        fontFamily: "MontserrantSemiBold",
        fontSize: 16,
    },

    otherText: {
        fontFamily: "MontserrantSemiBold",
        fontSize: 22,
    },

    scrollStyle: {
        marginHorizontal: "3%",
        borderWidth: 2,
        padding: 15,
        fontFamily: "MontserrantSemiBold",
        borderRadius: 15,
        borderColor: "#e4eded"
    },

    guidaView: {
        width: "88%",
        flexDirection: "row",
        marginTop: "2%",
        paddingBottom: "4%",
        justifyContent: "space-between",
        //backgroundColor: "#000000"
    },

    ButtonContainer: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",

    },

    page2: {
        backgroundColor: "#fff",
        flex: 1,
        width: Dimensions.get('window').width,
        justifyContent: "center",
        alignItems: "center"
    },

    scrollContent: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: 'center',
    },

    singleTextInput: {
        alignContent: "center",
        justifyContent: "center",
        height: 40,
        marginTop: 1,
        paddingTop: 2,
        fontFamily: 'Montserrant',
        width: '100%', //85 vecchio valore
    },

    fieldContainerTop: {
        width: "90%",
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: "#000000"
    },

    descrizioneField: {
        width: "100%",
        marginTop: 8,
        paddingLeft: "1%",
        paddingRight: "1%",
        marginTop: 16,
    },

    carouselStyle: {
        flex: 1,
        width: "100%"
    },

    viewCampi: {
        width: "90%",
    },

    keyboard: {
        flex: 1,
    },

    secondScroll: {
        width: Dimensions.get('window').width,
    },
    iconContainer:
    {
        width: "80%",
        marginTop: "5%",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        //backgroundColor: "#000"
    },
    iconButton: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',

    },
    textIcon: {
        fontFamily: "MontserrantSemiBold"

    }

});

const theme = { ...DefaultTheme, roundness: 30, myOwnProperty: true, fonts: { regular: { fontFamily: 'MontserrantSemiBold', fontWeight: 'normal' } }, colors: { myOwnColor: '#303a52', primary: '#0692d4', text: '#303a52' } }

const ModificaStruttura = ({ route, navigation }) => {

    //Dichiarazione variabili e init dello stato
    const { user, strutturaId } = route.params;
    const [IsEditable, setIsEditable] = useState(false);
    const [carouselItems, setCarouselItems] = useState([]);  //contenitore delle foto da mostrare nello slideshow
    const carouselRef = useRef(null);
    const isFocused = useIsFocused();
    const [strutturaDoc, setStrutturaDoc] = useState({});
    const [denominazione, setDenominazione] = useState("");
    const [via, setVia] = useState("");
    const [citta, setCitta] = useState("");
    const [provincia, setProvincia] = useState("");
    const [regione, setRegione] = useState("");
    const [cap, setCap] = useState("");
    const [nazione, setNazione] = useState("");
    const [tipologia, setTipologia] = useState("");
    const [numAlloggi, setNumAlloggi] = useState("");
    const [descrizione, setDescrizione] = useState("");
    const [showAlertDelete, setShowAlertDelete] = useState(false);
    const [showAlertNoFeature, setShowAlertNoFeature] = useState(false);
    const [message, setMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertNoAction, setShowAlertNoAction] = useState(false); //usato per indicare che NON deve fare niente se preme Ok
    const [modalLoadingVisibility, setModalLoadingVisibility] = useState(false);
    const [photoToUpload, setPhotoToUpload] = useState([]); //array di object [{index: x, uri: y},...]
    const scrollRef = useRef();
    const scrollRefVerticalScrollView = useRef();

    //Resetta lo stato
    const resetState = () =>{
        if (IsEditable) 
            setIsEditable(false);
        if(photoToUpload>0)
            setPhotoToUpload([]);
        if(modalLoadingVisibility)
            setModalLoadingVisibility(false);
        //Resetta lo scroll all'inizio
        scrollRefVerticalScrollView.current.scrollTo({y: 0});
    }

    //Caricamento dei dati non appena inizia il rendering dell'applicazione
    useFocusEffect(
        useCallback(() => {
            // Do something when the screen is focused
            resetState();

            async function getStrutturaData() {

                if(!modalLoadingVisibility){
                    setModalLoadingVisibility(true);
                }

                //Attendi finche' non ottieni dati della struttura dal DB
                var strutturaDoc = await StrutturaModel.getStrutturaDocumentById(strutturaId);

                //Se abbiamo effettuato il primo accesso alla struttura -> setta OTP a 0 per indicare che il primo accesso è stato eseguito
                if (strutturaDoc.codiceOtp > 0) {
                    await StrutturaModel.updateCodiceOTP(strutturaId, 0);
                }

                //Riempi carouselList con le foto presenti nel documento appena ottenuto
                var fotoList = [];
                var fotoArray = Object.values(strutturaDoc.fotoList); //restituisce gli URL delle foto in un array JS
                fotoArray.forEach((value) => {
                    fotoList.push({ url: value });
                });
                if (fotoList.length == 0) {
                    var imageURL = require("../../assets/imagenotfound.png");
                    fotoList.push({ url: imageURL });
                }

                //Memorizza la struttura, indirizzo della struttura e la lista foto per carousel nello state
                setDenominazione(strutturaDoc.denominazione);
                setVia(strutturaDoc.indirizzo.via);
                setCitta(strutturaDoc.indirizzo.citta);
                setProvincia(strutturaDoc.indirizzo.provincia);
                setRegione(strutturaDoc.indirizzo.regione)
                setCap(strutturaDoc.indirizzo.cap);
                setNazione(strutturaDoc.indirizzo.nazione);
                setTipologia(strutturaDoc.tipologia);
                setNumAlloggi(strutturaDoc.numAlloggi);
                setDescrizione(strutturaDoc.descrizione);
                setCarouselItems(fotoList);
               
                if(!modalLoadingVisibility){
                    setModalLoadingVisibility(false);
                }
            }
            getStrutturaData();
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [isFocused])
    );

    //funzione per caricare video di benvenuto per l'alloggio
    const selectImageToUpload = async (index) =>{  //index: indica che è stata selezionata per la modifica 
        //verifica se sono stati concessi i permessi per accedere alla galleria
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
            setMessage("Sono necessari i permessi di accesso alla fotocamera e galleria per poter inserire contenuti multimediali!");
            setShowAlert(true);
            return;
        }

        //Seleziona il video da caricare
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, //accetta solo immagini
            allowsEditing: false,
            allowsMultipleSelection: false, //funziona solo su web
            aspect: [4, 3],
            quality: 1,
        });
      
        if (result.cancelled) {
            setMessage("Si è verificato un problema durante il caricamento dell'immagine. Riprova di nuovo.");
            setShowAlert(true);
        }else{
            photoToUpload.push({index: index, uri: result.uri});
            setPhotoToUpload(photoToUpload);
        }
    }
    
    return (
        <View style={styles.maincontainer}>
            {
                modalLoadingVisibility && (
                    <Modal
                        transparent={true}
                        visible={modalLoadingVisibility}>
                        <View style={{ flex: 1, backgroundColor: "#000000aa", justifyContent: "center", alignItems: "center" }}>
                            <View style={{ backgroundColor: "white", padding: 10, borderRadius: 5, width: "80%", alignItems: "center" }}>
                                <Text style={styles.progressHeader}>Loading...</Text>
                                <ActivityIndicator size="large" color="#0692d4" />
                            </View>
                        </View>
                    </Modal>
                )
            }
            <HeaderBar title={"Modifica struttura"} navigator={navigation} />
            <ScrollView
                style={styles.bodyScrollcontainer}
                contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
                ref={scrollRefVerticalScrollView}>

                <ScrollView
                    pagingEnabled={true}
                    contentContainerStyle={styles.container}
                    showOrizontalScrollIndicator={false}
                    horizontal
                    ref={scrollRef}
                    bounces={false}>

                    <View style={styles.page}>
                        <View style={styles.singolaView}>
                            <View style={styles.carouselContainer} >
                                <Slideshow
                                    containerStyle={styles.carouselStyle}
                                    ref={carouselRef}
                                    dataSource={carouselItems}
                                    arrowSize={17}
                                    height={300}
                                    onPress={(selectedImage) =>{
                                        if(!IsEditable){
                                            setMessage("Premi il pulsante \"Modifica\" per cambiare o aggiungere una foto. Infine, premi \"Applica\" per salvare le modifiche.");
                                            setShowAlertNoAction(true);
                                        }else{
                                            async function onPressSelectedImage(index){
                                                //Seleziona la foto da caricare nel DB
                                                selectImageToUpload(index);    
                                            }
                                            onPressSelectedImage(selectedImage.index);
                                        }

                                        
                                        
                                        /*
                                        console.log(x);
                                        for(var i = 0; i<carouselItems.length; i++){
                                            if(x.index == i){
                                                carouselItems[i] = { url: require("../../assets/imagenotfound.png")};      
                                            }
                                        }
                                        setCarouselItems(carouselItems);
                                        setShowAlertNoFeature(true);
                                        */
                                    }}
                                    caption="Clicca per modificare le foto"
                                />

                                <Text style={[styles.singleTextInput, { justifyContent: "center", marginLeft: "40%" }]}>Clicca sulla foto per modificarla</Text>
                            </View>

                            <View style={styles.viewCampi}>
                                <TextInput
                                    mode='outlined'
                                    label='Nome'
                                    disabledInputStyle={{ color: "#303a52" }}
                                    style={styles.singleTextInput}
                                    editable={IsEditable}
                                    value={denominazione}
                                    onChangeText={(denominazione) => setDenominazione(denominazione)}
                                    theme={theme} />

                                <TextInput
                                    mode='outlined'
                                    label='Via'
                                    disabledInputStyle={{ color: "#303a52" }}
                                    style={styles.singleTextInput}
                                    editable={IsEditable}
                                    value={via}
                                    onChangeText={(via) => setVia(via)}
                                    theme={theme} />

                                <TextInput
                                    mode='outlined'
                                    label='Città'
                                    disabledInputStyle={{ color: "#303a52" }}
                                    style={styles.singleTextInput}
                                    editable={IsEditable}
                                    value={citta}
                                    onChangeText={(citta) => setCitta(citta)}
                                    theme={theme} />

                                <TextInput
                                    mode='outlined'
                                    label='Provincia'
                                    disabledInputStyle={{ color: "#303a52" }}
                                    style={styles.singleTextInput}
                                    editable={IsEditable}
                                    value={provincia}
                                    onChangeText={(provincia) => setProvincia(provincia)}
                                    theme={theme} />

                                <TextInput
                                    mode='outlined'
                                    label='CAP'
                                    disabledInputStyle={{ color: "#303a52" }}
                                    style={styles.singleTextInput}
                                    editable={IsEditable}
                                    value={cap}
                                    onChangeText={(cap) => setCap(cap)}
                                    theme={theme} />

                                <TextInput
                                    mode='outlined'
                                    label='Regione'
                                    disabledInputStyle={{ color: "#303a52" }}
                                    style={styles.singleTextInput}
                                    editable={IsEditable}
                                    value={regione}
                                    onChangeText={(regione) => setRegione(regione)}
                                    theme={theme} />


                                <TextInput
                                    mode='outlined'
                                    label='Nazione'
                                    disabledInputStyle={{ color: "#303a52" }}
                                    style={styles.singleTextInput}
                                    editable={IsEditable}
                                    value={nazione}
                                    onChangeText={(nazione) => setNazione(nazione)}
                                    theme={theme} />

                                <TextInput
                                    mode='outlined'
                                    label='Tipologia'
                                    disabledInputStyle={{ color: "#303a52" }}
                                    style={styles.singleTextInput}
                                    editable={IsEditable}
                                    value={tipologia}
                                    onChangeText={(tipologia) => setTipologia(tipologia)}
                                    theme={theme} />

                                <TextInput
                                    mode='outlined'
                                    label='Numero Alloggi'
                                    disabledInputStyle={{ color: "#303a52" }}
                                    style={styles.singleTextInput}
                                    editable={IsEditable}
                                    value={numAlloggi}
                                    onChangeText={(numAlloggi) => setNumAlloggi(numAlloggi)}
                                    theme={theme} />

                                <TextInput
                                    mode='outlined'
                                    label='Descrizione'
                                    disabledInputStyle={{ color: "#303a52" }}
                                    style={styles.descrizioneField}
                                    editable={IsEditable}
                                    multiline={true}
                                    numberOfLines={40}
                                    value={descrizione}
                                    onChangeText={(descrizione) => setDescrizione(descrizione)}
                                    theme={theme} />

                            </View>
                            <View style={styles.iconContainer}>
                                <TouchableOpacity
                                    style={styles.iconButton}
                                    disabled={!IsEditable}
                                    onPress={()=>{
                                        setShowAlertDelete(true);
                                }} >
                                    <Icon name={"delete-outline"} color={"#0692d4"} size={40} style={styles.arrow} />
                                    <Text style={styles.textIcon} > Elimina struttura </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.iconButton}
                                    disabled={!IsEditable}
                                    onPress={()=>{
                                        setShowAlertNoFeature(true)
                                    } }>
                                        <Icon name={"book-plus"} color={"#0692d4"} size={40} style={styles.arrow} />
                                        <Text style={styles.textIcon} > Modifica guida </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.guidaView}>
                            <View style={styles.ButtonContainer}>
                                <CustomButton
                                    styleBtn={{ width: "100%" }}
                                    nome={IsEditable ? 'Applica' : "Modifica"}
                                    onPress={() => {
                                        IsEditable ? setIsEditable(false) : setIsEditable(true);
                                        scrollRefVerticalScrollView.current.scrollTo({y: 0});
                                        async function updateStruttura() {
                                            if (IsEditable) {
                                                if(!modalLoadingVisibility){
                                                    setModalLoadingVisibility(true);
                                                }

                                                //Verifica che se vi sono foto da cambiare -> sostituisci le nuove foto
                                                if(photoToUpload.length > 0){
                                                    //Attendi finche' non ottieni dati della struttura dal DB
                                                    var strutturaDoc = await StrutturaModel.getStrutturaDocumentById(strutturaId);
                                                    var fotoArray = Object.values(strutturaDoc.fotoList); //restituisce gli URL delle foto in un array JS
                                                    for(var i = 0; i < photoToUpload.length; i++){
                                                        var photoPath = "struttura/" + strutturaId + "/" + strutturaDoc.denominazione + "/" + photoToUpload[i].index;
                                                        var photoURL = await uploadMediaAndGetDownloadURL(photoToUpload[i].uri, photoPath);
                                                        fotoArray[photoToUpload[i].index] = photoURL;
                                                    }

                                                    //Attendi completamento dell'aggiornamento del campo foto di quella struttura
                                                    await StrutturaModel.updateFotoField(strutturaId, Object.assign({}, fotoArray));
                                                }
                                                
                                                //Attendi il completamento della modifica i dati relativi alla struttura
                                                var indirizzo = { via: via, citta: citta, cap: cap, provincia: provincia, regione: regione, nazione: nazione };
                                                await StrutturaModel.updateStrutturaDocument(strutturaId, denominazione, descrizione, indirizzo, "", numAlloggi, tipologia);
                                                
                                                if(!modalLoadingVisibility){
                                                    setModalLoadingVisibility(false);
                                                }
                                                setMessage("Le modifiche sono state apportate correttamente!");
                                                setShowAlert(true);
                                            }
                                        }
                                        updateStruttura();
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ScrollView>
            <CustomAlertGeneral
                  visibility={showAlertDelete}
                  titolo="Eliminazione"
                  testo= "Confermi di voler procedere con la rimozione della struttura?"
                  annullaBtnName="Annulla"
                  onAnnullaBtn={()=>{
                    setShowAlertDelete(false);
                  }}
                  buttonName="Procedi"
                  onOkPress={()=>{ 
                    async function deleteStruttura(){     
                        await StrutturaModel.deleteStrutturaDocument(strutturaId);
                        setShowAlertDelete(false);
                        navigation.navigate("LeMieStrutture", {user: user});
                    }
                    deleteStruttura();   
                  }} />
            <CustomAlertGeneral
                visibility={showAlertNoFeature}
                titolo="Funzionalità non disponibile"
                testo= "Questa funzionalità sarà disponibile a seguito di sviluppi futuri!"
                hideNegativeBtn={true}
                buttonName="Ok"
                onOkPress={()=>{ 
                    setShowAlertNoFeature(false);  
                  }} />
            <CustomAlertGeneral
                  visibility={showAlert}
                  titolo="Modifica struttura"
                  testo= {message}
                  hideNegativeBtn={true}
                  buttonName="Ok"
                  onOkPress={()=>{ 
                    setShowAlert(false); 
                    navigation.navigate("LeMieStrutture", {user: user});
                  }} />
            <CustomAlertGeneral
                visibility={showAlertNoAction}
                titolo="Modifica struttura"
                testo= {message}
                hideNegativeBtn={true}
                buttonName="Ok"
                onOkPress={()=>{ 
                    setShowAlertNoAction(false);  
                }} />
        </View>
    );

}

export default ModificaStruttura;

//Function for upload a multimedia content and obtain a download URL
async function uploadMediaAndGetDownloadURL(uri, pathMedia){
    var downloadURL = "";
    const response = await fetch(uri);
    const blob = await response.blob(); 
    var ref = storageRef.child(pathMedia);

    // Upload file and metadata to the object
    var uploadTask= ref.put(blob);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot)=> {
            switch (snapshot.state) {
                case firebase.storage.TaskState.RUNNING: // or 'paused'
                    break;
                case firebase.storage.TaskState.SUCCESS: 
                    break;
                case firebase.storage.TaskState.ERROR: 
                console.log("Si è verificato un problema durante il caricamento dell'immagine o video. Si prega di riprovare o controllare lo stato della connessione.");
                break;
            }
        }, (error)=> {
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