import React from 'react';
import {Text, View, Image,ScrollView, Alert, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';
import ImagePickerButton from '../components/ImageVideoPicker'
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
		marginTop: 32,
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
            numeroAlloggi: 0,
            descrizione: "",
            user: props.route.params.user,
            image:''         
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

       
        return (
            <View style={styles.maincontainer}>
                <HeaderBar title="Inserisci struttura" navigator={this.props.navigation} />
                <ScrollView style={styles.bodyScrollcontainer}>
                    <View style={styles.scrollContent}> 
                        <View style={styles.topContainer}>
                            <TextInput 
                                ref = {input => { this.denominazione = input }}
                                style={styles.singleField}
                                placeholder='Denominazione struttura'
                                onChangeText = {(testo) => this.setState({denominazione: testo})}
                            />
                            <TextInput 
                                ref = {input => { this.indirizzo = input }}
                                style={styles.singleField}
                                placeholder='Indirizzo'
                                onChangeText = {(testo) => this.setState({indirizzo: testo})}
                            />
                        </View>
                        <View style={styles.twoFieldContainer}>
                            <TextInput 
                                ref = {input => { this.citta = input }}
                                style={styles.middleTextInput}
                                placeholder='Città'
                                onChangeText = {(testo) => this.setState({citta: testo})}
                                
                            />
                            <TextInput 
                                ref = {input => { this.cap = input }}
                                style={styles.middleTextInput}
                                placeholder='CAP'
                                onChangeText = {(testo) => this.setState({cap: testo})}
                            />
                        </View>
                        <View style={styles.middleContainer}>
                            
                            <TextInput 
                                ref = {input => { this.regione = input }}
                                style={styles.singleField}
                                placeholder='Regione'
                                onChangeText = {(testo) => this.setState({regione: testo})}
                            />
                            

                            <TextInput 
                                ref = {input => { this.nazione = input }}
                                style={styles.singleField}
                                placeholder='Nazione'
                                onChangeText = {(testo) => this.setState({nazione: testo})}
                            />

                            <TextInput 
                                ref = {input => { this.tipologia = input }}
                                style={styles.singleField}
                                placeholder='Tipologia'
                                onChangeText = {(testo) => this.setState({tipologia: testo})}
                            />
                            <TextInput 
                                ref = {input => { this.alloggi = input }}
                                style={styles.singleField}
                                placeholder='Numero alloggi'
                                onChangeText = {(valore) => this.setState({numeroAlloggi: valore})}
                            />
                            
                            <TextInput 
                                ref = {input => { this.descrizione = input }}
                                style={styles.descrizioneField}
                                placeholder='Descrizione'
                                multiline={true}
                                numberOfLines={15}
                                onChangeText = {(testo) => this.setState({descrizione: testo})}
                            />
                        </View>
                        <View style={styles.threeButtonContainer}>
                            <ImagePickerButton 
                                styleBtn={{width: "100%"}} 
                                nome='Inserisci foto'  
                                reference= {this}
                            />  
                        </View>

                        <View style={styles.bottomButtonContainer}>
                            <CustomButton styleBtn={{marginTop: 10, width: "100%"}} nome="Inserisci guida" onPress={()=> Alert.alert(
                                "Funzionalità non disponibile", "Questa funzionalità sarà disponibile a seguito di sviluppi futuri!",
                                [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
                                { text: "OK", onPress: () => console.log("OK Pressed") }],
                                { cancelable: false })} /> 

                           

                            <CustomButton styleBtn={{marginTop: 10, width: "100%"}} nome="Aggiungi" onPress={()=>{
                                var indirizzo = {via: this.state.indirizzo, citta:this.state.citta, cap:this.state.cap, provincia:this.state.provincia, regione:this.state.regione, nazione:this.state.nazione}                                 
                                var hostUID = this.state.user.userIdRef;
                                //Aggiungi la nuova struttura nel DB
                                StrutturaModel.createStrutturaDocument(hostUID, 0, this.state.denominazione, this.state.descrizione, indirizzo, " ", this.state.numeroAlloggi,this.state.tipologia, "not specificated", {}); 
               
                                db.collection("struttura").where("denominazione", "==", this.state.denominazione).get().then((querySnapshot)=>{
                                    if(this.state.image !== ""){
                                        querySnapshot.forEach((doc)=>{
                                            var strutturaId = doc.id;
                                            var nomeStruttura = doc.data().denominazione;
                                            var fotoArray = Object.values(doc.data().fotoList); //restituisce gli URL delle foto in un array JS
                                            var fotoCount = fotoArray.length + 1;
                                            this.uploadImageAndInsertIntoDB(this.state.image, strutturaId, fotoArray, "struttura/" + strutturaId+"/" +nomeStruttura+ "/"+fotoCount);
                                        });
                                    }
                                    Alert.alert("Inserisci struttura", "La nuova struttura e' stata memorizzata con successo!",
                                    [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
                                     { text: "OK", onPress: ()=> {
        
                                        //reset dei field del form
                                        this.denominazione.clear();  
                                        this.regione.clear();                        
                                        this.citta.clear(); 
                                        this.descrizione.clear(); 
                                        this.alloggi.clear(); 
                                        this.tipologia.clear();
                                        this.nazione.clear(); 
                                        this.cap.clear();
                                        this.indirizzo.clear(); 
        
                                        //Una volta aggiunta una nuova struttura, per mostrarla nella lista occore rifare la lettura delle strutture associate a quell'host
                                        var itemList = [];
                                        var count = 1;
                                        var count1 = 1; //contatore per gestire asincronismo della prima query
                                        db.collection('struttura').where('hostRef', '==', hostUID).get().then((querySnapshot)=>{
                                            querySnapshot.forEach((doc) =>{
                                                var struttura = doc.data();
                                                var fotoArray = Object.values(doc.data().fotoList); //restituisce gli URL delle foto in un array JS
                                                   
                                                var imageURL = "";
                                                if(fotoArray.length == 0){
                                                    imageURL = require("../../assets/imagenotfound.png");
                                                }else{
                                                    imageURL = {uri: fotoArray[0]};
                                                }
                                                var oggetto = {
                                                    key: count, 
                                                    title: struttura.denominazione, 
                                                    description: struttura.descrizione,
                                                    image_url: imageURL, 
                                                    newPage: 'VisualizzaStruttura',
                                                    OTP: 'true',  
                                                    id: doc.id
                                                }
                                                count++;
                                                itemList.push(oggetto);
                                                if(count1 < querySnapshot.size){
                                                    count1++;
                                                }else{
                                                    this.props.navigation.push("LeMieStrutture", {user: this.state.user, list: itemList});
                                                }
                                            });
                                        });
                                    }}],
                                    { cancelable: false });
                                    });
                              } 
                            } />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    //Function for upload a image and obtain a download URL
    uploadImageAndInsertIntoDB = async(uri, structId, fotoArray, pathImage) => {
        const response = await fetch(uri);
        const blob = await response.blob(); 
        var ref = storageRef.child(pathImage);

        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask= ref.put(blob);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            (snapshot)=> {}, (error)=> {
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
        }, function() {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            fotoArray.push(downloadURL);
            StrutturaModel.updateFotoField(structId, Object.assign({}, fotoArray));
        });
        
    });
    }
}