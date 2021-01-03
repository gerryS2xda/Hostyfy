import React from 'react';
import {View, Text, ScrollView, StyleSheet, Alert, Modal, ActivityIndicator, TextInput} from 'react-native';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';
import * as alloggioModel from '../firebase/datamodel/AlloggioModel';
import {firebase} from "../firebase/config"

//Firebase
var storageRef = firebase.storage().ref(); // create a storage reference from our storage service

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

    middleContainer: {
        width: "100%",
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
        }
    }

    componentDidMount() {    
        var alloggioState = this.props.route.params.state;
        
        if(alloggioState.hasOwnProperty("nomeAlloggio") && !this.state.isAlloggioStateUpdate){
            this.setState({nomeAlloggio: alloggioState.nomeAlloggio, numCamere: alloggioState.numCamere, 
                numMaxPersone: alloggioState.numMaxPersone, piano: alloggioState.piano, descrizione: alloggioState.descrizione,
                pathvideo: alloggioState.pathvideo, isAlloggioStateUpdate: true});
        }  
    }  
    
    componentDidUpdate() {    
        var alloggioState = this.props.route.params.state;
        
        if(alloggioState.hasOwnProperty("nomeAlloggio") && !this.state.isAlloggioStateUpdate){
            this.setState({nomeAlloggio: alloggioState.nomeAlloggio, numCamere: alloggioState.numCamere, 
                numMaxPersone: alloggioState.numMaxPersone, piano: alloggioState.piano, descrizione: alloggioState.descrizione,
                pathvideo: alloggioState.pathvideo, isAlloggioStateUpdate: true});
        }
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
                            <View style={{ flex:1,backgroundColor:"#000000aa", justifyContent:"center",alignItems:"center"}}>
                                <View style={{backgroundColor:"white",padding:10,borderRadius:5, width:"80%", alignItems:"center"}}>
                                    <Text style={styles.progressHeader}>Loading...</Text>
                                    <ActivityIndicator size="large" color="#f35588"/>
                                </View>
                            </View>
                        </Modal>
                    )
                }
                <HeaderBar title="Inserisci Alloggio" navigator={this.props.navigation} />
                <ScrollView style={styles.bodyScrollcontainer}>
                    <View style={styles.scrollContent}> 
                        <View style={styles.middleContainer}>
                            <TextInput 
                                ref = {input => { this.nomeAlloggio = input }}
                                style={styles.singleField}
                                placeholder='Nome alloggio'
                                onChangeText ={(testo) => {this.setState({nomeAlloggio: testo})}}
                                value={""+this.state.nomeAlloggio}
                            />
                            <TextInput
                                ref = {input => { this.numCamere = input }} 
                                style={styles.singleField}
                                placeholder='Numero camere'
                                onChangeText ={(testo) => {this.setState({numCamere: testo})}}
                                value={""+this.state.numCamere}
                            />
                            <TextInput 
                                ref = {input => { this.numMaxPersone = input }} 
                                style={styles.singleField}
                                placeholder='Numero persone'
                                onChangeText ={(testo) => {this.setState({numMaxPersone: testo})}}
                                value={""+this.state.numMaxPersone}
                            />
                            <TextInput 
                                ref = {input => { this.piano = input }}
                                style={styles.singleField}
                                placeholder='Piano'
                                onChangeText ={(testo) => {this.setState({piano: testo})}}
                                value={""+this.state.piano}
                            />
                            <TextInput 
                                ref = {input => { this.descrizione = input }}
                                style={styles.descrizioneField}
                                placeholder='Descrizione' 
                                multiline={true}
                                numberOfLines={15}
                                onChangeText ={(testo) => {this.setState({descrizione: testo})}}
                                value={""+this.state.descrizione}
                            />
                        </View>
                        <View style={styles.threeButtonContainer}>
                            <CustomButton styleBtn={{width: "45%"}} 
                                nome="Inserisci foto" 
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
                                }}
                                />
                                <CustomButton 
                                    styleBtn={{width: "45%"}}  
                                    nome="Inserisci Video"  
                                    onPress={()=> Alert.alert(
                                        "Funzionalità non disponibile", "Questa funzionalità sarà disponibile a seguito di sviluppi futuri!",
                                        [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
                                        { text: "OK", onPress: () => console.log("OK Pressed") }],
                                        { cancelable: false })} 
                                /> 
                            </View>
                        <View style={styles.bottomButtonContainer}> 
                            <CustomButton styleBtn={{marginTop: 10, width: "100%"}} nome="Inserisci guida" onPress={()=> Alert.alert(
                                "Funzionalità non disponibile", "Questa funzionalità sarà disponibile a seguito di sviluppi futuri!",
                                [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
                                { text: "OK", onPress: () => console.log("OK Pressed") }],
                                { cancelable: false })} />
                            <CustomButton styleBtn={{marginTop: 10, width: "100%"}} nome="Aggiungi" onPress={()=>{
                                this.onPressAggiungiAlloggio(user, strutturaId, photoList, this, this.props.navigation);
                            }} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    onPressAggiungiAlloggio = async (user, strutturaId, photoList, reference, navigation) =>{
        //Attendi finche' non completa inserimento del nuovo alloggio nel DB
        await alloggioModel.createAlloggioDocument(strutturaId, reference.state.nomeAlloggio, reference.state.numCamere, reference.state.numMaxPersone, reference.state.piano, reference.state.descrizione, reference.state.pathvideo, {});
        
        if(photoList.length !=0){
            //Fai comparire il popup per indicare attesa del completamento dell'operazione di upload di immagini
            if(!reference.state.modalUploadVisibility){
                reference.setState({modalUploadVisibility: true});
            }

            //Attendi completamento dell'esecuzione della query per ottenere gli alloggio in base al nome
            var alloggiDocs = await alloggioModel.getAlloggiByNome(strutturaId, reference.state.nomeAlloggio);
            for(const doc of alloggiDocs){
                var alloggio = doc.data();
                var alloggioId = doc.id;
                var fotoArray =  Object.values(alloggio.fotoList); //restituisce gli URL delle foto in un array JS
                var fotoCount = fotoArray.length + 1;

                for(const photo of photoList){ //Finche' bisogna caricare una foto nello storage
                    var photoPath = "struttura/"+strutturaId+"/alloggi/" + alloggio.nomeAlloggio + "/"+fotoCount;
                    //Attendi finche' non ottieni download URL dell'immagine caricata nello storage
                    let downloadURL = await this.uploadImageAndGetDownloadURL(photo.uri, photoPath);
                    if(downloadURL !== "")
                        fotoArray.push(downloadURL);
                    fotoCount++;
                }
                //Attendi completamento dell'aggiornamento del campo foto di quell'alloggio
                await alloggioModel.updateFotoField(strutturaId, alloggioId, Object.assign({}, fotoArray));

                //Quando caricamento delle immagini nello storage e nei doc della struttura, rendi invisibile il popup
                if(reference.state.modalUploadVisibility){
                    reference.setState({modalUploadVisibility: false});
                }

                Alert.alert("Inserimento alloggio", "Il nuovo alloggio e' stata memorizzato con successo!",
                    [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
                     { text: "OK", onPress: ()=> {
                        //reset dei field del form
                        reference.nomeAlloggio.clear();  
                        reference.numCamere.clear();                        
                        reference.numMaxPersone.clear();
                        reference.piano.clear(); 
                        reference.descrizione.clear(); 

                        navigation.navigate("VisualizzaAlloggi", {user: user, strutturaId: strutturaId});
                    }}],
                    { cancelable: false });
            }
        }else{
            Alert.alert("Inserimento alloggio", "Il nuovo alloggio e' stata memorizzato con successo!",
                    [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
                     { text: "OK", onPress: ()=> {
                        //reset dei field del form
                        reference.nomeAlloggio.clear();  
                        reference.numCamere.clear();                        
                        reference.numMaxPersone.clear();
                        reference.piano.clear(); 
                        reference.descrizione.clear(); 

                        navigation.navigate("VisualizzaAlloggi", {user: user, strutturaId: strutturaId});
                    }}],
                    { cancelable: false });
        }
    }

    //Function for upload a image and obtain a download URL
    uploadImageAndGetDownloadURL = async(uri, pathImage) => {
        var downloadURL = "";
        const response = await fetch(uri);
        const blob = await response.blob(); 
        var ref = storageRef.child(pathImage);

        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask= ref.put(blob);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            (snapshot)=> {
                switch (snapshot.state) {
                    case firebase.storage.TaskState.RUNNING: // or 'paused'
                        break;
                    case firebase.storage.TaskState.SUCCESS: 
                        break;
                    case firebase.storage.TaskState.ERROR: // or 'paused'
                        Alert.alert("Immagini", "Si è verificato un problema durante il caricamento delle immagini! Si prega di riprovare o controllare lo stato della connessione.",
                        [   { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
                            { text: "OK", onPress: () => console.log("OK - error image Upload Pressed")}
                        ],
                        { cancelable: false });
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
}