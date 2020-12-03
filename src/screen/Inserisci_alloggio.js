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
		marginTop: 32,
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
          carouselItems: [
          {
              image:require('../../assets/Struttura/struttura1.jpg'),
          },
          {
              image:require('../../assets/Struttura/struttura2.jpg'),
          },
          {
              image:require('../../assets/Struttura/struttura3.jpg'),
          },
          {
              image:require('../../assets/Struttura/struttura4.jpg'),
          },
          {
              image:require('../../assets/Struttura/struttura5.jpg'),
          },
        ]
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
                            <CustomButton styleBtn={{marginTop: 10, width: "100%"}} nome="Aggiungi" onPress={()=> Alert.alert(
                                "Inserisci alloggio", "Il nuovo alloggio e' stato memorizzato con successo!",
                                [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
                                { text: "OK", onPress: () => {
                                    
                                    var fileFoto;

                                    var storageRef = firebase.storage().ref();

                                    // Create a reference to 'mountains.jpg'
                                    var mountainsRef = storageRef.child('alloggio_1.jpg');

                                    // Create a reference to 'images/mountains.jpg'
                                    var mountainImagesRef = storageRef.child('images/alloggio_1.jpg');

                                    mountainImagesRef.put(fileFoto).then(function(snapshot) {
                                        console.log('Uploaded a blob or file!');
                                      });
                                    
                                    alloggioModel.createAlloggioDocument('struct1',this.state.nomeAlloggio, this.state.numeroCamere,this.state.numeroPersone,this.state.piano, this.state.descrizione)} 
                                }],
                                { cancelable: false })} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}