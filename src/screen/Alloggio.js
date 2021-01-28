import React, { useState, useCallback, useRef } from 'react';
import {Text, View, Image,ScrollView, Alert, StyleSheet, TextInput} from 'react-native';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';
import * as AlloggioModel from "../firebase/datamodel/AlloggioModel";

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
	
    carouselContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:50,
        marginTop:20,
    },

    middleContainer: {
        width: "100%",
    },

    threeButtonContainer: {
		marginTop: 20, 
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
        paddingTop:9,
        fontFamily: "MontserrantSemiBold",
        paddingLeft: 5,
    },

    descrizioneField: {
        height: 200,
        width:"100%",
        borderColor: '#cc3881',
        borderBottomWidth: 1.4,
        marginTop:8,
        paddingTop:9,
        fontFamily: "MontserrantSemiBold",
        paddingLeft: 5,
        backgroundColor: '#f5f5f2',
    },

    singleFieldText:{
        fontFamily: "MontserrantSemiBold",
    }
});

const AlloggioScreen = ({route, navigation}) =>{

    const {user, strutturaId, alloggioId} = route.params;
    const [IsEditable, setIsEditable] = useState(false);
    const [alloggio, setAlloggio] = useState({});
    const [carouselItems, setCarouselItems] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null);
    const isFocused = useIsFocused();
    const [nomeAlloggio, setNomeAlloggio] = useState("");
    const [numCamere, setNumCamere] = useState("");
    const [numMaxPersone, setNumMaxPersone] = useState("");
    const [piano, setPiano] = useState("");
    const [descrizione, setDescrizione] = useState("");
    
        //Caricamento dei dati non appena inizia il rendering dell'applicazione
        useFocusEffect(
            useCallback(() => {
            // Do something when the screen is focused
            if(IsEditable){
                setIsEditable(false);
            }
    
            async function getAlloggioData(){
               
                //Attendi finche' non ottieni dati dell'alloggio dal DB
                var alloggioDoc = await AlloggioModel.getAlloggioByStrutturaRef(strutturaId, alloggioId);
                
                //Riempi carouselList con le foto presenti nel documento appena ottenuto
                var fotoList = [];
                var fotoArray = Object.values(alloggioDoc.fotoList); //restituisce gli URL delle foto in un array JS
                fotoArray.forEach((value)=>{
                    fotoList.push({image: {uri: value}});
                });
                if(fotoList.length == 0){
                    var imageURL = require("../../assets/imagenotfound.png");
                    fotoList.push({image: imageURL});
                } 
                //Memorizza l'alloggio, lista foto per carousel nello state
                setNomeAlloggio(alloggioDoc.nomeAlloggio);
                setNumCamere(alloggioDoc.numCamere);
                setNumMaxPersone(alloggioDoc.numMaxPersone);
                setPiano(alloggioDoc.piano);
                setDescrizione(alloggioDoc.descrizione);
               
                setCarouselItems(fotoList);
            }
            getAlloggioData();
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
            }, [isFocused])
        );

        const _renderItem = ({item,index}) =>{
            return (
                <View style={{ justifyContent:'center',
                  marginLeft:50
                    }}>
                 <Image style={{width:250, height:250, borderRadius:10}} source = {item.image} />
                  <Text>{item.title}</Text>
                </View>
            )
        }

        return (
            <View style={styles.maincontainer}>
                <HeaderBar title={nomeAlloggio} navigator={navigation} />
                <ScrollView style={styles.bodyScrollcontainer}>
                    <View style={styles.scrollContent}> 
                        <View style={styles.carouselContainer} >
                            <Carousel
                            style= {styles.carouselStyle}
                            layout={"default"}
                            ref={carouselRef}
                            data={carouselItems}
                            sliderWidth={300}
                            itemWidth={300}
                            renderItem={_renderItem}
                            onSnapToItem = { index => setActiveIndex(index)} />
                        </View>
                        <View style={styles.middleContainer}>
                            <TextInput
                                style={styles.singleField}
                                editable={IsEditable}
                                value = {nomeAlloggio}
                                onChangeText={(nomeAlloggio)=>{setNomeAlloggio(nomeAlloggio)}}
                                >
                             </TextInput>

                            <TextInput 
                                style={styles.singleField}
                                editable={IsEditable}
                                value = {numCamere}
                                onChangeText={(numCamere)=>{setNumCamere(numCamere)}}
                                >
                             </TextInput>

                            <TextInput
                                style={styles.singleField}
                                editable={IsEditable}
                                value = {numMaxPersone}
                                onChangeText={(numMaxPersone)=>{setNumMaxPersone(numMaxPersone)}}
                                >
                            </TextInput>

                            <TextInput
                                style={styles.singleField} 
                                editable={IsEditable}
                                value = {piano}
                                onChangeText={(piano)=>{setPiano(piano)}}
                                >
                                </TextInput>
                            <TextInput 
                                style={styles.descrizioneField}
                                editable={IsEditable}
                                multiline={true}
                                numberOfLines={15}
                                value = {descrizione}
                                onChangeText={(descrizione)=>{setDescrizione(descrizione)}}
                                >
                             </TextInput>
                        </View>
                        <CustomButton 
                                styleBtn={{width: "100%", marginTop: "5%"}}
                                nome= "Disponibilità" 
                                onPress={()=>{
                                    navigation.navigate("Visualizza_calendario_alloggio",{user: user, isHost: user.isHost, alloggioId: alloggioId})
                                }}
                        /> 
                        <View style={styles.threeButtonContainer}>
                            <CustomButton 
                                styleBtn={{width: "45%", alignItems: 'center', justifyContent: 'center'}}
                                nome="Modifica foto"  
                                onPress={()=> Alert.alert(
                                    "Funzionalità non disponibile", "Questa funzionalità sarà disponibile a seguito di sviluppi futuri!",
                                    [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
                                    { text: "OK", onPress: () => console.log("OK Pressed") }],
                                    { cancelable: false })} 
                            /> 
                            <CustomButton 
                                styleBtn={{width: "45%"}} 
                                nome={IsEditable ? 'Applica modifiche' : "Modifica dati"}  
                                onPress={()=> { 
                                    async function updateAlloggio(){
                                        if(IsEditable){
                                            setIsEditable(false)
                                            await AlloggioModel.updateAlloggioDocument(strutturaId, alloggioId, nomeAlloggio, numCamere, numMaxPersone, piano, "");
                                        } else {
                                            setIsEditable(true)
                                        }
                                    }
                                    updateAlloggio();
                                }
                                } 
                            /> 
                        </View>
                        <View style={styles.bottomButtonContainer}> 
                            <CustomButton 
                                styleBtn={{marginTop: "5%", width:"100%"}} 
                                nome="Guida"  
                                onPress={()=> Alert.alert(
                                    "Funzionalità non disponibile", "Questa funzionalità sarà disponibile a seguito di sviluppi futuri!",
                                    [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
                                    { text: "OK", onPress: () => console.log("OK Pressed") }],
                                    { cancelable: false })} 
                            /> 
                            <CustomButton 
                                styleBtn={{marginTop: "5%", width:"100%"}}
                                nome= "Visualizza chiave"
                                onPress={() => {
                                        navigation.navigate('LaMiaChiave', {user: user, strutturaId: strutturaId, alloggioId: alloggioId, prenotazioneId: ""})
                                    }
                                }
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );

}

export default AlloggioScreen;
