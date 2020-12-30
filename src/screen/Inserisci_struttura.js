import React from 'react';
import {Text, View, Image,ScrollView, Alert, StyleSheet, Modal, ActivityIndicator} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';
import * as StrutturaModel from "../firebase/datamodel/StrutturaModel"; 
import {firebase} from "../firebase/config"


//Firebase
var db = firebase.firestore(); 
var storageRef = firebase.storage().ref(); // create a storage reference from our storage service

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

export default class InserisciStrutturaScreen extends React.Component {

     constructor(props){

        
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
            counter: 0,
            isStrutturaStateUpdate: false,         
      }
    }

    componentDidMount() {    
        var struttState = this.props.route.params.strutturaState;
        
        if(struttState.hasOwnProperty("denominazione") && !this.state.isStrutturaStateUpdate){
            this.setState({denominazione: struttState.denominazione, via: struttState.via, citta: struttState.citta,
                cap: struttState.cap, provincia: struttState.provincia, regione: struttState.regione,
                nazione: struttState.nazione, tipologia: struttState.tipologia, numeroAlloggi: struttState.numeroAlloggi,
                descrizione: struttState.descrizione, isStrutturaStateUpdate: true});
        }  
    }  
    
    componentDidUpdate() {    
        var struttState = this.props.route.params.strutturaState;
        
        if(struttState.hasOwnProperty("denominazione") && !this.state.isStrutturaStateUpdate){
            this.setState({denominazione: struttState.denominazione, via: struttState.via, citta: struttState.citta,
                cap: struttState.cap, provincia: struttState.provincia, regione: struttState.regione,
                nazione: struttState.nazione, tipologia: struttState.tipologia, numeroAlloggi: struttState.numeroAlloggi,
                descrizione: struttState.descrizione, isStrutturaStateUpdate: true});
        } 
    }

    _renderItem({item,index}){
        return (
          <View style={{ justifyContent:'center',
            marginLeft:50
              }}>
           <Image style={{width:250, height:250}} source = {item.image} />
            <Text>{item.title}</Text>
          </View>

        )
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
                            <View style={{ flex:1,backgroundColor:"#000000aa", justifyContent:"center",alignItems:"center"}}>
                                <View style={{backgroundColor:"white",padding:10,borderRadius:5, width:"80%", alignItems:"center"}}>
                                    <Text style={styles.progressHeader}>Loading...</Text>
                                    <ActivityIndicator size="large" color="#f35588"/>
                                </View>
                            </View>
                        </Modal>
                    )
                }
                <HeaderBar title="Inserisci struttura" navigator={this.props.navigation} />
                <ScrollView style={styles.bodyScrollcontainer}>
                    <View style={styles.scrollContent}> 
                        <View style={styles.topContainer}>
                            <TextInput 
                                ref = {input => { this.denominazione = input }}
                                style={styles.singleField}
                                placeholder='Denominazione struttura'
                                onChangeText = {(testo) => this.setState({denominazione: testo})}
                                value={""+this.state.denominazione}
                            />
                            <TextInput 
                                ref = {input => { this.via = input }}
                                style={styles.singleField}
                                placeholder='Indirizzo'
                                onChangeText = {(testo) => this.setState({via: testo})}
                                value={""+this.state.via}
                            />
                        </View>
                        <TextInput 
                                ref = {input => { this.citta = input }}
                                style={styles.singleField}
                                placeholder='Città'
                                onChangeText = {(testo) => this.setState({citta: testo})}
                                value={""+this.state.citta}
                                
                            />
                        <View style={styles.twoFieldContainer}>
                            <TextInput 
                                ref = {input => { this.provincia = input }}
                                style={styles.middleTextInput}
                                placeholder='Provincia'
                                onChangeText = {(testo) => this.setState({provincia: testo})}
                                value={""+this.state.provincia}
                            />
                            <TextInput 
                                ref = {input => { this.cap = input }}
                                style={styles.middleTextInput}
                                placeholder='CAP'
                                onChangeText = {(testo) => this.setState({cap: testo})}
                                value={""+this.state.cap}
                            />
                        </View>
                        <View style={styles.middleContainer}>
                            
                            <TextInput 
                                ref = {input => { this.regione = input }}
                                style={styles.singleField}
                                placeholder='Regione'
                                onChangeText = {(testo) => this.setState({regione: testo})}
                                value={""+this.state.regione}
                            />
                            

                            <TextInput 
                                ref = {input => { this.nazione = input }}
                                style={styles.singleField}
                                placeholder='Nazione'
                                onChangeText = {(testo) => this.setState({nazione: testo})}
                                value={""+this.state.nazione}
                            />

                            <TextInput 
                                ref = {input => { this.tipologia = input }}
                                style={styles.singleField}
                                placeholder='Tipologia'
                                onChangeText = {(testo) => this.setState({tipologia: testo})}
                                value={""+this.state.tipologia}
                            />
                            <TextInput 
                                ref = {input => { this.alloggi = input }}
                                style={styles.singleField}
                                placeholder='Numero alloggi'
                                onChangeText = {(valore) => this.setState({numeroAlloggi: valore})}
                                value={""+this.state.numeroAlloggi}
                            />
                            
                            <TextInput 
                                ref = {input => { this.descrizione = input }}
                                style={styles.descrizioneField}
                                placeholder='Descrizione'
                                multiline={true}
                                numberOfLines={15}
                                onChangeText = {(testo) => this.setState({descrizione: testo})}
                                value={""+this.state.descrizione}
                            />
                        </View>
                        <View style={styles.threeButtonContainer}>
                            <CustomButton styleBtn={{marginTop: 10, width: "100%"}} 
                                nome="Inserisci foto" 
                                onPress={()=>{
                                    var struttutaState = {
                                        denominazione: this.state.denominazione,
                                        via: this.state.via,
                                        citta: this.state.citta,
                                        cap: this.state.cap,
                                        provincia: this.state.provincia,
                                        regione: this.state.regione,
                                        nazione: this.state.nazione,
                                        tipologia: this.state.tipologia,
                                        numeroAlloggi: this.state.numeroAlloggi,
                                        descrizione: this.state.descrizione,
                                    }
                                    this.props.navigation.push('ImagePickerMultiple', {user:user, struttura: struttutaState});
                                }}
                                />
                            
                        </View>

                        <View style={styles.bottomButtonContainer}>
                            <CustomButton styleBtn={{marginTop: 10, width: "100%"}} nome="Inserisci guida" onPress={()=> Alert.alert(
                                "Funzionalità non disponibile", "Questa funzionalità sarà disponibile a seguito di sviluppi futuri!",
                                [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
                                { text: "OK", onPress: () => console.log("OK Pressed") }],
                                { cancelable: false })} /> 

                           

                            <CustomButton styleBtn={{marginTop: 10, width: "100%"}} nome="Aggiungi" onPress={()=>{
                                this.onPressAggiungiStruttura(user, photoList, this, this.props.navigation);
                              } 
                            } />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    onPressAggiungiStruttura = async (user, photoList, reference, navigation) =>{
        var indirizzo = {via: reference.state.via, citta:reference.state.citta, cap:reference.state.cap, provincia:reference.state.provincia, regione:reference.state.regione, nazione:reference.state.nazione}                                 
        //Attendi finche' non completi inserimento della nuova struttura nel DB
        await StrutturaModel.createStrutturaDocument(user.userIdRef, 0, reference.state.denominazione, reference.state.descrizione, indirizzo, " ", reference.state.numeroAlloggi,reference.state.tipologia, "not specificated", {}); 
    
        if(photoList.length !=0){
            //Fai comparire il popup per indicare attesa del completamento dell'operazione di upload di immagini
            if(!reference.state.modalUploadVisibility){
                reference.setState({modalUploadVisibility: true});
            }

            //Attendi completamento dell'esecuzione della query per ottenere le strutture in base al nome
            var struttureDocs = await StrutturaModel.getStrutturaByDenominazione(reference.state.denominazione);
            for(const doc of struttureDocs){
                var struttura = doc.data();
                var idStruttura = doc.id;
                var fotoArray =  Object.values(struttura.fotoList); //restituisce gli URL delle foto in un array JS
                var fotoCount = fotoArray.length + 1;

                for(const photo of photoList){ //Finche' bisogna caricare una foto nello storage
                    var photoPath = "struttura/" + idStruttura+"/" + struttura.denominazione + "/"+fotoCount;
                    //Attendi finch' non ottieni download URL dell'immagine caricata nello storage
                    let downloadURL = await this.uploadImageAndGetDownloadURL(photo.uri, photoPath);
                    if(downloadURL !== "")
                        fotoArray.push(downloadURL);
                    fotoCount++;
                }
                //Attendi completamento dell'aggiornamento del campo foto di quella struttura
                await StrutturaModel.updateFotoField(idStruttura, Object.assign({}, fotoArray));
                //Quando caricamento delle immagini nello storage e nei doc della struttura, rendi invisibile il popup
                if(reference.state.modalUploadVisibility){
                    reference.setState({modalUploadVisibility: false});
                }

                Alert.alert("Inserisci struttura", "La nuova struttura e' stata memorizzata con successo!",
                    [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
                     { text: "OK", onPress: ()=> {
                        //reset dei field del form
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

                        navigation.navigate("LeMieStrutture", {user: user});
                    }}],
                    { cancelable: false });
            }
        }else{
            Alert.alert("Inserisci struttura", "La nuova struttura e' stata memorizzata con successo!",
                [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
                { text: "OK", onPress: ()=> {
                    
                    //reset dei field del form
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

                    navigation.navigate("LeMieStrutture", {user: user});
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