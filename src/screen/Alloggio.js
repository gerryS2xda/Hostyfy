import React, { useState, useCallback, useRef } from 'react';
import {Text, View, Image,ScrollView, Alert, StyleSheet, TextInput, Dimensions} from 'react-native';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';
import * as AlloggioModel from "../firebase/datamodel/AlloggioModel";
import Slideshow from 'react-native-image-slider-show';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        width: "100%",
	},
	bodyScrollcontainer: {
        width: Dimensions.get('window').width,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
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
    },

    carouselContainer: {
        flex: 1,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: "2%",
    },
    

	scrollContent: {
        marginLeft:32,
        marginRight:32,
    },
    titoloView: {
        width: "90%",
        alignContent: "center",
        justifyContent: "center",
        marginTop: "4%",
    },

    singleText: {
        fontSize: 20,
        fontFamily: "MontserrantSemiBold"
    },
    informationContainer: {
        marginTop: "5%",

    },

    information: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "3%",
        marginBottom: "3%"
    },

    arrow: {
      

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
    },

    carouselStyle: {
        flex: 1,
        width: "100%"
    },
});

const AlloggioScreen = ({route, navigation}) =>{

    const {user, strutturaId, alloggioId} = route.params;
    const [IsEditable, setIsEditable] = useState(false);
    const [carouselItems, setCarouselItems] = useState([]);
    const carouselRef = useRef(null);
    const isFocused = useIsFocused();
    const [nomeAlloggio, setNomeAlloggio] = useState("");
    const [numCamere, setNumCamere] = useState("");
    const [numMaxPersone, setNumMaxPersone] = useState("");
    const [piano, setPiano] = useState("");
    const [descrizione, setDescrizione] = useState("");
    const scrollRef = useRef();
   
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
                    fotoList.push({url: value});
                });
                if(fotoList.length == 0){
                    var imageURL = require("../../assets/imagenotfound.png");
                    fotoList.push({url: imageURL});
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

       
        return (
            <View style={styles.maincontainer}>
            <HeaderBar title={"Alloggio"} navigator={navigation} />
            <ScrollView
                style={styles.bodyScrollcontainer}
                contentContainerStyle={{ justifyContent: "center", alignItems: "flex-start"}}>

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
                                />
                            </View>

                            <View style={styles.titoloView}>
                                <Text style={styles.singleText}>
                                    {nomeAlloggio}
                                </Text>
                            </View>

                            <View style={styles.informationContainer}>

                            <View style={styles.information}>
                                    <Icon name={"numeric"} color={"#0692d4"} size={40} style={styles.arrow} />
                                    <Text style={styles.otherText}>N° Camera: {numCamere}</Text>
                            </View>
                                
                                <View style={styles.information}>
                                    <Icon name={"human-male-female"} color={"#0692d4"} size={40} style={styles.arrow} />
                                    <Text style={styles.otherText}>{numMaxPersone}</Text>
                                    
                                </View>
                                <View style={styles.information}>
                                    <Icon name={"home-floor-3"} color={"#0692d4"} size={40} style={styles.arrow} />
                                    <Text style={styles.otherText}>Piano: {piano}</Text>
                                </View>

                                <TouchableOpacity 
                                style = {styles.information}
                                onPress={()=>{
                                    navigation.navigate("Visualizza_calendario_alloggio",{user: user, isHost: user.isHost, alloggioId: alloggioId})
                                }}>
                                    
                                    <Icon name={"calendar-month-outline"} color={"#0692d4"} size={40} style={styles.arrow}/>
                                        <Text 
                                        style = {styles.otherText} >
                                                Clicca per la Disponibilità
                                        
                                        </Text>
                                    </TouchableOpacity>

                                
                                
                                <View style={styles.information}>
                                    <Icon name={"book-open"} color={"#0692d4"} size={40} style={styles.arrow}/>
                                    <Text style = {styles.scrollStyle}>
                                        {descrizione}
                                    </Text>
                                </View>
                                <View style={styles.information}>
                                <TouchableOpacity 
                                style = {styles.information}
                                onPress={() => {
                                    navigation.navigate('LaMiaChiave', {user: user, strutturaId: strutturaId, alloggioId: alloggioId, prenotazioneId: ""})}}>
                                    
                                    <Icon name={"key-wireless"} color={"#0692d4"} size={40} style={styles.arrow}/>
                                        <Text 
                                        style = {styles.otherText} >
                                                Apri alloggio 
                                        
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                        <View style={styles.guidaView}>
                            <View style={styles.ButtonContainer}>
                                <CustomButton
                                    styleBtn={{ width: "100%"}}
                                    nome={"Modifica"}
                                    onPress={() => { navigation.navigate("ModificaAlloggio", { user: user, strutturaId: strutturaId, alloggioId:alloggioId }); }} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ScrollView>
        </View>
        );

}

export default AlloggioScreen;
