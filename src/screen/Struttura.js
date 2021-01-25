import React,  { useState, useCallback, useRef } from 'react';
import {Text, View, Image,ScrollView, StyleSheet, TextInput, Alert} from 'react-native';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';
import * as StrutturaModel from "../firebase/datamodel/StrutturaModel";

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

    carouselContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 30,
        marginTop: 50,
    },

    singleField: {
        height: 40,
        borderColor: '#cc3881',
        marginTop:8,
        paddingTop:9,
        paddingLeft: 8,
        fontFamily: 'Montserrant',
        borderBottomWidth: 1,
        width:'100%', //85 vecchio valore
    },

    fieldContainerTop:{
        width:"100%",
        alignItems: 'center'      
    },

    twoFieldContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between', 
        marginTop: 16,       
    },

    fieldContainerBottom:{
        width:"100%",
        alignItems: 'center'        
    },

    twoField: { //da sistemare (non appare centrato)
        borderBottomWidth: 1,
        borderColor: '#cc3881',
        width: "30%",
        fontFamily: 'Montserrant',
        paddingLeft: 5,
        height: 40,
       },

       descrizioneField: {
        height: 150,
        width:"100%",
        borderColor: '#cc3881',
        marginTop:8,
        borderBottomWidth: 1,
        backgroundColor: '#f5f5f2',
        paddingLeft: "1%",
        paddingRight: "1%",
        marginTop: 16,
    },
    threeButtonContainer: {
		marginTop: 20, 
		flexDirection: 'row',
		justifyContent: 'space-between',
    },

    bottomButtonContainer: {
		marginBottom:20,
    },

});

const StrutturaScreen = ({route, navigation}) =>{

    const {user, strutturaId} = route.params;
    const [IsEditable, setIsEditable] = useState(false);
    const [struttura, setStruttura] = useState({});
    const [indirizzo, setIndirizzo] = useState({});
    const [carouselItems, setCarouselItems] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null);
    const isFocused = useIsFocused();
    
        //Caricamento dei dati non appena inizia il rendering dell'applicazione
        useFocusEffect(
            useCallback(() => {
            // Do something when the screen is focused
            if(IsEditable){
                setIsEditable(false);
            }
    
            async function getStrutturaData(){
                
                //Attendi finche' non ottieni dati della struttura dal DB
                var strutturaDoc = await StrutturaModel.getStrutturaDocumentById(strutturaId);
                
                //Se abbiamo effettuato il primo accesso alla struttura -> setta OTP a 0 per indicare che il primo accesso è stato eseguito
                if(strutturaDoc.codiceOtp > 0){
                    await StrutturaModel.updateCodiceOTP(strutturaId, 0);
                    strutturaDoc.codiceOtp=0;
                }
    
                //Riempi carouselList con le foto presenti nel documento appena ottenuto
                var fotoList = [];
                var fotoArray = Object.values(strutturaDoc.fotoList); //restituisce gli URL delle foto in un array JS
                fotoArray.forEach((value)=>{
                    fotoList.push({image: {uri: value}});
                });
                if(fotoList.length == 0){
                    var imageURL = require("../../assets/imagenotfound.png");
                    fotoList.push({image: imageURL});
                } 

                //Memorizza la struttura, indirizzo della struttura e la lista foto per carousel nello state
                setStruttura(strutturaDoc);
                setIndirizzo(strutturaDoc.indirizzo);
                setCarouselItems(fotoList);
            }
            getStrutturaData();
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
            }, [isFocused])
        );

        const _renderItem = ({item,index}) =>{
            return (
              <View>
               <Image style={{width:270, height:270, borderRadius:5}} source = {item.image} />
                <Text>{item.title}</Text>
              </View>
    
            )
        }

        return (
            <View style={styles.maincontainer}>
                <HeaderBar title={struttura.denominazione} navigator={navigation} />
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
                            onSnapToItem = { index => setActiveIndex(index) } />
                        </View>

                            <View style={styles.fieldContainerTop}>
                                <TextInput style={styles.singleField} editable={IsEditable}>{struttura.denominazione}</TextInput>
                                <TextInput style={styles.singleField} editable={IsEditable}>{indirizzo.via}</TextInput>
                                <TextInput style={styles.singleField} editable={IsEditable}>{indirizzo.citta}</TextInput>
                                <TextInput style={styles.singleField} editable={IsEditable}>{indirizzo.provincia}</TextInput>
                            </View>
                            <View style={styles.twoFieldContainer}>
                                <TextInput style={styles.twoField} editable={IsEditable}>{indirizzo.cap}</TextInput>
                                <TextInput style={styles.twoField} editable={IsEditable}>{indirizzo.nazione}</TextInput>
                            </View>
                            <View style={styles.fieldContainerBottom}>
                                <TextInput style={styles.singleField} editable={IsEditable}>{struttura.tipologia}</TextInput>
                                <TextInput style={styles.singleField} editable={IsEditable}>{struttura.numAlloggi}</TextInput>
                                <TextInput style={styles.descrizioneField} 
                                    multiline={true}
                                    numberOfLines={20}
                                    editable={IsEditable}
                                >{struttura.descrizione}</TextInput>
                            </View>

                        <View style={styles.threeButtonContainer}>
                            <CustomButton 
                                styleBtn={{width: "45%"}} 
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
                                onPress={()=> {IsEditable ? setIsEditable(false) : setIsEditable(true)}} 
                            /> 
                        </View>
                        <View style={styles.bottomButtonContainer}> 
                            <CustomButton 
                                styleBtn={{marginTop: 10, width:"100%"}} 
                                nome="Guida"  
                                onPress={()=> Alert.alert(
                                    "Funzionalità non disponibile", "Questa funzionalità sarà disponibile a seguito di sviluppi futuri!",
                                    [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
                                    { text: "OK", onPress: () => console.log("OK Pressed") }],
                                    { cancelable: false })} 
                            /> 
                            <CustomButton 
                                styleBtn={{marginTop: 10, width:"100%"}}
                                nome= "Visualizza alloggi"
                                onPress={() => {
                                    navigation.navigate("VisualizzaAlloggi", {user: user, strutturaId: strutturaId});        
                                }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );

}

export default StrutturaScreen;
