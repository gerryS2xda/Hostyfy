import React from 'react';
import {Text, View, Image,ScrollView, StyleSheet, Alert} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';
import * as alloggioModel from '../firebase/datamodel/AlloggioModel';
import ImagePickerButton from '../components/ImagePicker'
import {firebase} from "../firebase/config"

//Firebase
var db = firebase.firestore(); 
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

    carouselStyle: {
        justifyContent:'center',
        marginRight:50,
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
          numeroCamere: '',
          numeroPersone: '',
          piano: '',
          descrizione: '',
          image:'',
          isImageUploaded: false,
        }
    }

    _renderItem({item,index}){
        return (
          <View style={{ justifyContent:'center', marginLeft:50 }}>
           <Image style={{width:250, height:250}} source = {item.image} />
            <Text>{item.title}</Text>
          </View>

        )
    }

    resetState(){
        if(this.state.image !== ""){
            this.setState({image: ""});
        }
        if(this.state.isImageUploaded){
            this.setState({isImageUploaded: false});
        }
    }

    render() {
        var user = this.props.route.params.user;
        var strutturaId = this.props.route.params.strutturaId;
        this.resetState();

        return (
            <View style={styles.maincontainer}>
                <HeaderBar title="Inserisci Alloggio" navigator={this.props.navigation} />
                <ScrollView style={styles.bodyScrollcontainer}>
                    <View style={styles.scrollContent}> 
                        <View style={styles.middleContainer}>
                            <TextInput 
                                style={styles.singleField}
                                placeholder='Nome alloggio'
                                onChangeText ={(testo) => {this.setState({nomeAlloggio: testo})}}
                            />
                            <TextInput 
                                style={styles.singleField}
                                placeholder='Numero camere'
                                onChangeText ={(testo) => {this.setState({numeroCamere: testo})}}
                            />
                            <TextInput 
                                style={styles.singleField}
                                placeholder='Numero persone'
                                onChangeText ={(testo) => {this.setState({numeroPersone: testo})}}
                            />
                            <TextInput 
                                style={styles.singleField}
                                placeholder='Piano'
                                onChangeText ={(testo) => {this.setState({piano: testo})}}
                            />
                            <TextInput 
                                style={styles.descrizioneField}
                                placeholder='Descrizione' 
                                multiline={true}
                                numberOfLines={15}
                                onChangeText ={(testo) => {this.setState({descrizione: testo})}}
                            />
                        </View>
                        <View style={styles.threeButtonContainer}>
                                <ImagePickerButton 
                                    styleBtn={{width: "45%"}} 
                                    nome='Inserisci foto'  
                                    reference= {this}
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
                                alloggioModel.createAlloggioDocument(strutturaId,this.state.nomeAlloggio, this.state.numeroCamere,this.state.numeroPersone,this.state.piano, this.state.descrizione, {});
                                
                                
                                    db.collection("struttura/"+strutturaId+"/alloggi").where("nomeAlloggio", "==", this.state.nomeAlloggio).get().then((querySnapshot)=>{
                                        if(this.state.image !== ""){
                                            querySnapshot.forEach((doc)=>{
                                                var alloggioId = doc.id;
                                                var nomeAlloggio = doc.data().nomeAlloggio;
                                                var fotoArray = Object.values(doc.data().fotoList); //restituisce gli URL delle foto in un array JS
                                                var fotoCount = fotoArray.length + 1;
                                                this.uploadImageAndInsertIntoDB(this.state.image, strutturaId, alloggioId, fotoArray, "struttura/"+strutturaId+"/alloggi/" + nomeAlloggio+ "/"+fotoCount);
                                        });
                                        }
                                        Alert.alert(
                                            "Inserisci alloggio", "Il nuovo alloggio e' stato memorizzato con successo!",
                                            [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
                                            { text: "OK", onPress: () => { 
                                                console.log("OK pressed InserisciAlloggio"); 
                                                
                                                //Una volta aggiunta una nuova struttura, per mostrarla nella lista occore rifare la lettura delle strutture associate a quell'host
                                                var itemList = [];
                                                var count = 1;
                                                var count1 = 1; //contatore per gestire asincronismo della prima query
                                                db.collection("struttura/"+strutturaId+"/alloggi").get().then((querySnapshot)=>{
                                                    querySnapshot.forEach((doc) =>{
                                                        var alloggio = doc.data();
                                                        var fotoArray = Object.values(doc.data().fotoList); //restituisce gli URL delle foto in un array JS
                                                        
                                                        var imageURL = "";
                                                        if(fotoArray.length == 0){
                                                            imageURL = require("../../assets/imagenotfound.png");
                                                        }else{
                                                            imageURL = {uri: fotoArray[0]};
                                                        }
                                                        var oggetto = {
                                                            key: count, 
                                                            title: alloggio.nomeAlloggio, 
                                                            description: alloggio.descrizione,
                                                            image_url: imageURL, 
                                                            newPage: 'Alloggio',
                                                            strutturaId: strutturaId,  
                                                            id: doc.id
                                                        }
                                                        count++;
                                                        itemList.push(oggetto);
                                                        if(count1 < querySnapshot.size){
                                                            count1++;
                                                        }else{
                                                            this.props.navigation.navigate("VisualizzaAlloggi", {user: user, list: itemList, strutturaId: strutturaId});
                                                        }
                                                    });
                                                });
                                            } 
                                        }],
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
    uploadImageAndInsertIntoDB = async(uri, structId, alloggioId, fotoArray, pathImage) => {
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
            alloggioModel.updateFotoField(structId, alloggioId, Object.assign({}, fotoArray));
        });
        
    });
    }
}