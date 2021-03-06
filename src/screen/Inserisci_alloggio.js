import React from 'react';
import {View, Text, ScrollView, StyleSheet, Alert, Modal, ActivityIndicator, Dimensions, BackHandler} from 'react-native';
import { TextInput } from 'react-native-paper';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';
import * as alloggioModel from '../firebase/datamodel/AlloggioModel';
import {firebase} from "../firebase/config"
import { DefaultTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomAlertGeneral from "../components/CustomAlertGeneral";
import * as ImagePicker from 'expo-image-picker';

//Firebase
var storageRef = firebase.storage().ref(); // create a storage reference from our storage service

//Styles
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
        fontFamily: "Montserrant",
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

export default class InserisciAlloggioScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          nomeAlloggio: '',
          numCamere: "",
          numMaxPersone: "",
          piano: '',
          descrizione: '',
          pathvideo:'',
          modalUploadVisibility: false,
          isAlloggioStateUpdate: false,
          disableInsertAlloggioButton: false, //per disabilitare il button dopo il click al fine di evitare doppio inserimento  
          theme: { ...DefaultTheme, roundness: 30, myOwnProperty: true, fonts: { regular: { fontFamily: 'MontserrantSemiBold', fontWeight: 'normal' } }, colors: { myOwnColor: '#303a52', primary: '#0692d4', text: '#303a52' } },
          scrollRef: React.createRef(),
          scrollRefVerticalScrollView: React.createRef(),
          showAlertInsertSuccess: false,
          showAlertNextFeature: false,
          showAlertErrorField: false,
          showAlertBackButton: false,
          messageError: ""
        }
    }

    //Intercetto della pressione del tasto back per avvisare utente di annullamento dell'operazione
    backAction = () => {
        this.setState({showAlertBackButton: true});
        return true;
    };

    componentDidMount() {    
        var alloggioState = this.props.route.params.state;
        
        if(alloggioState.hasOwnProperty("nomeAlloggio") && !this.state.isAlloggioStateUpdate){
            this.setState({nomeAlloggio: alloggioState.nomeAlloggio, numCamere: alloggioState.numCamere, 
                numMaxPersone: alloggioState.numMaxPersone, piano: alloggioState.piano, descrizione: alloggioState.descrizione,
                pathvideo: alloggioState.pathvideo, isAlloggioStateUpdate: true});
        }
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }  
    
    componentDidUpdate() {    
        var alloggioState = this.props.route.params.state;
        
        if(alloggioState.hasOwnProperty("nomeAlloggio") && !this.state.isAlloggioStateUpdate){
            this.setState({nomeAlloggio: alloggioState.nomeAlloggio, numCamere: alloggioState.numCamere, 
                numMaxPersone: alloggioState.numMaxPersone, piano: alloggioState.piano, descrizione: alloggioState.descrizione,
                pathvideo: alloggioState.pathvideo, isAlloggioStateUpdate: true});
        }
    }

    //Invocato quando la componente sta per essere rimossa (mediante navigation.reset())
    componentWillUnmount() {
       BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    render() {
        var user = this.props.route.params.user;
        var strutturaId = this.props.route.params.strutturaId;
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
                                    <ActivityIndicator size="large" color="#0692d4" />
                                </View>
                            </View>
                        </Modal>
                    )
                }
                <HeaderBar title="Nuovo alloggio" navigator={this.props.navigation} insertPage={true} isHost={user.isHost} />
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
                                        Inserimento Alloggio
                                    </Text>
                                </View>
                                <View style={styles.viewCampi}>
                                    <TextInput
                                        mode='outlined'
                                        label='Nome alloggio'
                                        disabledInputStyle={{ color: "#303a52" }}
                                        style={styles.singleTextInput}
                                        editable={this.state.IsEditable}
                                        value={this.state.nomeAlloggio}
                                        onChangeText ={(testo) => {this.setState({nomeAlloggio: testo})}}
                                        theme={this.state.theme}
                                        ref = {input => { this.nomeAlloggio = input }}
                                    />
                                    <TextInput
                                        mode='outlined'
                                        label='Numero camere'
                                        disabledInputStyle={{ color: "#303a52" }}
                                        style={styles.singleTextInput}
                                        editable={this.state.IsEditable}
                                        value={this.state.numCamere}
                                        onChangeText ={(testo) => {this.setState({numCamere: testo})}}
                                        theme={this.state.theme}
                                        ref = {input => { this.numCamere = input }}
                                        keyboardType={'numeric'}
                                    />
                                    <TextInput
                                        mode='outlined'
                                        label='Numero persone'
                                        disabledInputStyle={{ color: "#303a52" }}
                                        style={styles.singleTextInput}
                                        editable={this.state.IsEditable}
                                        value={this.state.numMaxPersone}
                                        onChangeText ={(testo) => {this.setState({numMaxPersone: testo})}}
                                        theme={this.state.theme}
                                        ref = {input => { this.numMaxPersone = input }} 
                                        keyboardType={'numeric'}
                                    />
                                    <TextInput
                                        mode='outlined'
                                        label='Piano'
                                        disabledInputStyle={{ color: "#303a52" }}
                                        style={styles.singleTextInput}
                                        editable={this.state.IsEditable}
                                        value={this.state.piano}
                                        onChangeText ={(testo) => {this.setState({piano: testo})}}
                                        theme={this.state.theme}
                                        ref = {input => { this.piano = input }}
                                    />
                                </View>

                                <View style={styles.guidaView}>
                                    <View style={styles.ButtonContainer}>
                                        <CustomButton
                                            styleBtn={{ width: "100%" }}
                                            nome={"Completa l'inserimento"}
                                            onPress={() => { 
                                                    this.state.scrollRef.current.scrollTo({ x: (Dimensions.get('window').width)})
                                                    this.state.scrollRefVerticalScrollView.current.scrollTo({y: 0})
                                                    }
                                            } />
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
                                            onPress={()=>{
                                                var alloggioState = {
                                                    nomeAlloggio: this.state.nomeAlloggio,
                                                    numCamere: this.state.numCamere,
                                                    numMaxPersone: this.state.numMaxPersone,
                                                    piano: this.state.piano,
                                                    descrizione: this.state.descrizione,
                                                    pathvideo:this.state.pathvideo
                                                }
                                                this.props.navigation.push('ImagePickerMultipleAlloggio', {user:user, state: alloggioState, strutturaId: strutturaId});
                                            }} >
                                            <Icon name={"camera-plus-outline"} color={"#0692d4"} size={40} style={styles.arrow} />
                                            <Text
                                                style={styles.otherText} >
                                                Inserisci Foto
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[styles.information]}
                                            onPress={()=>{
                                                this.selectWelcomeVideoToUpload(this);
                                            } }>
                                            <Icon name={"video-plus"} color={"#0692d4"} size={40} style={styles.arrow} />
                                            <Text
                                                style={styles.otherText} >
                                                Inserisci video 
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
                                        nome={"Inserisci alloggio"}
                                        disabled={this.state.disableInsertStrutturaButton}
                                        onPress={()=>{
                                            if(this.validateFormField(photoList)){
                                                this.setState({disableInsertAlloggioButton: true});
                                                this.onPressAggiungiAlloggio(user, strutturaId, photoList, this, this.props.navigation);
                                            }
                                        }} />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </ScrollView>
                <CustomAlertGeneral
                  visibility={this.state.showAlertInsertSuccess}
                  titolo="Inserimento alloggio"
                  testo= "Il nuovo alloggio è stato memorizzato con successo!"
                  hideNegativeBtn={true}
                  buttonName="Ok"
                  onOkPress={()=>{ 
                    this.setState({nomeAlloggio: "", numCamere: "", 
                        numMaxPersone: "", piano: "", descrizione: "", pathvideo: "", showAlertInsertSuccess: false});
                    this.state.scrollRef.current.scrollTo({ x: 0});
                    //NOTA: Si è deciso di far ritornare l'utente alla 'Home' siccome si utilizza 'reset' per cancellare tutte le schermate create (pop non funziona)
                    this.props.navigation.reset({
						index: 0,
						routes: [{ name: 'HomeHost', params: { userId: user.userIdRef } }],
					}); //resetta lo stack quando si ritorna nella Home
                    //this.props.navigation.navigate("VisualizzaAlloggi", {user: user, strutturaId: strutturaId});  
                  }} />
                <CustomAlertGeneral
                  visibility={this.state.showAlertNextFeature}
                  titolo="Funzionalità non disponibile"
                  testo= "Questa funzionalità sarà disponibile a seguito di sviluppi futuri!"
                  hideNegativeBtn={true}
                  buttonName="Ok"
                  onOkPress={()=>{ 
                    this.setState({showAlertNextFeature: false});  
                  }} />
                <CustomAlertGeneral
                  visibility={this.state.showAlertErrorField}
                  titolo="Inserimento alloggio"
                  testo= {this.state.messageError}
                  hideNegativeBtn={true}
                  buttonName="Ok"
                  onOkPress={()=>{ 
                    this.state.scrollRef.current.scrollTo({ x: 0})
                    this.setState({showAlertErrorField: false});  
                  }} />
                <CustomAlertGeneral
                  visibility={this.state.showAlertBackButton}
                  titolo="Attenzione!"
                  testo= "Tutti i valori inseriti fino a questo momento non saranno salvati. Sei sicuro di voler tornare indietro?"
                  annullaBtnName="Annulla"
                  onAnnullaBtn={()=>{
                    this.setState({showAlertBackButton: false});
                  }}
                  buttonName="Sì"
                  onOkPress={()=>{ 
                    this.setState({nomeAlloggio: "", numCamere: "", 
                        numMaxPersone: "", piano: "", descrizione: "", pathvideo: "", showAlertBackButton: false});
                    this.state.scrollRef.current.scrollTo({ x: 0});
                    this.props.navigation.reset({
						index: 0,
						routes: [{ name: 'HomeHost', params: { userId: user.userIdRef } }],
					}); //resetta lo stack quando si ritorna nella Home
                  }} />
            </View >
        );
    }

    onPressAggiungiAlloggio = async (user, strutturaId, photoList, reference, navigation) =>{
        
        //Fai comparire il popup per indicare attesa del completamento dell'operazione di upload di immagini
        if(!reference.state.modalUploadVisibility){
            reference.setState({modalUploadVisibility: true});
        }

        //Inserimento delle foto nello storage e ottenimento link per inserirle nel DB
        var fotoArray =  [];
        var fotoCount = 1;

        for(const photo of photoList){ //Finche' bisogna caricare una foto nello storage
            var photoPath = "struttura/"+strutturaId+"/alloggi/" + reference.state.nomeAlloggio + "/immagini/"+fotoCount;
            //Attendi finche' non ottieni download URL dell'immagine caricata nello storage
            let downloadURL = await this.uploadMediaAndGetDownloadURL(photo.uri, photoPath);
            if(downloadURL !== ""){
                fotoArray.push(downloadURL);
                fotoCount++;
            }else{
                this.setState({messageError: "Si è verificato un problema durante il caricamento delle immagini. Si prega di riprovare o controllare lo stato della connessione.", 
                    showAlertErrorField: true});
                    return;
            }
        }
        

        //Caricamento del video di benvenuto
        var pathVideo = "struttura/"+strutturaId+"/alloggi/" + reference.state.nomeAlloggio + "/video/welcomevideo";
        let downloadVideoURL = await this.uploadMediaAndGetDownloadURL(reference.state.pathvideo, pathVideo);
        console.log("downloadVideo")
        if(downloadVideoURL === ""){
            this.setState({messageError: "Si è verificato un problema durante il caricamento del video. Si prega di riprovare o controllare lo stato della connessione.", 
                showAlertErrorField: true});
                return;    
        }

        //Attendi finche' non completa inserimento del nuovo alloggio nel DB
        await alloggioModel.createAlloggioDocument(strutturaId, reference.state.nomeAlloggio, reference.state.numCamere, 
            reference.state.numMaxPersone, reference.state.piano, reference.state.descrizione, downloadVideoURL, Object.assign({}, fotoArray));
        

        //Quando caricamento delle immagini e video nello storage e nei doc della struttura, rendi invisibile il popup
        if(reference.state.modalUploadVisibility){
            reference.setState({modalUploadVisibility: false});
        }

        //Mostra Alert personalizzato per indicare esito positivo dell'operazione
        if(!reference.state.showAlertInsertSuccess){
            reference.setState({showAlertInsertSuccess: true});
        }
    
        reference.setState({disableInsertAlloggioButton: false}); //resetta lo stato del pulsante "Aggiungi" e rendilo cliccabile
    }

    //Function for upload a multimedia content and obtain a download URL
    uploadMediaAndGetDownloadURL = async(uri, pathMedia) => {
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
                    this.setState({messageError: "Si è verificato un problema durante il caricamento dell'immagine o video. Si prega di riprovare o controllare lo stato della connessione.", 
                        showAlertErrorField: true});
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

    //funzione per caricare video di benvenuto per l'alloggio
    selectWelcomeVideoToUpload = async (reference) =>{
        //verifica se sono stati concessi i permessi per accedere alla galleria
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
            reference.setState({messageError: "Sono necessari i permessi di accesso alla fotocamera e galleria per poter inserire contenuti multimediali!", showAlertErrorField: true});
            return;
        }

        //Seleziona il video da caricare
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos, //accetta solo video
            allowsEditing: false,
            allowsMultipleSelection: false, //funziona solo su web
            aspect: [4, 3],
            quality: 1,
        });
      
        if (result.cancelled) {
            reference.setState({messageError: "Si è verificato un problema durante il caricamento del video. Riprova di nuovo.", showAlertErrorField: true});
        }else{
            reference.setState({pathvideo: result.uri});
        }
    }

    //funzione per verificare che tutti i campi siano stati inseriti (controllo generale)
    validateFormField = (photoList) =>{

        var flag = true; //tutti i campi sono compilati
        var message = "Attenzione!! Uno dei campi obbligatori non è compilato. Il campo non compilato è ";
        if(this.state.nomeAlloggio === ""){
            message += "\"Nome alloggio\"";
            flag = false;
        }else if(this.state.numCamere === ""){
            message += "\"Numero camere\"";
            flag = false;
        }else if(this.state.numMaxPersone === ""){
            message += "\"Numero persone \"";
            flag = false;
        }else if(this.state.piano === ""){
            message += "\"Piano\"";
            flag = false;
        }else if(this.state.descrizione === ""){
            message += "\"Descrizione\"";
            flag = false;
        }else if(photoList.length == 0){
            message = "Attenzione!! Per completare l'inserimento di un alloggio è necessario inserire almeno una sua immagine.";
            flag = false;
        }else if(this.state.pathvideo === ""){
            message = "Attenzione!! Per completare l'inserimendo di un alloggio è necessario inserire un video di benvenuto.";
            flag = false;
        }
        if(!flag){
            this.setState({messageError: message, showAlertErrorField: true});
        }
        return flag;
    }
}