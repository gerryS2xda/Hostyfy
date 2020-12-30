import React from 'react';
import {Text, View, Image,ScrollView, StyleSheet, TextInput, Alert} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';
import {firebase} from '../firebase/config';
import * as StrutturaModel from "../firebase/datamodel/StrutturaModel";

var db = firebase.firestore();

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



export default class StrutturaScreen extends React.Component {
 
    constructor(props){
        super(props);
        this.state = {
          IsEditable: false,
          struttura : {},
          carouselItems: [],
          activeIndex:0,
      }
    }

    _renderItem({item,index}){
        return (
          <View>
           <Image style={{width:270, height:270, borderRadius:5}} source = {item.image} />
            <Text>{item.title}</Text>
          </View>

        )
    }

    //Invocato dopo che il componente è montato (cioè inserito nell’albero del DOM).
    componentDidMount() {    
        if(this.state.IsEditable){
            this.setState({IsEditable:false});
        }

        async function getStrutturaData(reference){
            var strutturaId = reference.props.route.params.strutturaId;
            //Attendi finche' non ottieni dati della struttura dal DB
            var strutturaDoc = await StrutturaModel.getStrutturaDocumentById(strutturaId);

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
            reference.setState({struttura: strutturaDoc, carouselItems: fotoList}); //Memorizza la struttura e la lista foto per carousel nello state
        }
        getStrutturaData(this);
    }  
    
    //Invocato immediatamente dopo che avviene un aggiornamento del componente. Non viene chiamato per la renderizzazione iniziale.
    componentDidUpdate() {    
        if(this.state.IsEditable){
            this.setState({IsEditable:false});
        }

        async function getStrutturaData(reference){
            var strutturaId = reference.props.route.params.strutturaId;
            //Attendi finche' non ottieni dati della struttura dal DB
            var strutturaDoc = await StrutturaModel.getStrutturaDocumentById(strutturaId);

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
            reference.setState({struttura: strutturaDoc, carouselItems: fotoList}); //Memorizza la struttura e la lista foto per carousel nello state
        }
        getStrutturaData(this);
    }


    render() {
        var user = this.props.route.params.user;
        
        return (
            <View style={styles.maincontainer}>
                <HeaderBar title={this.state.struttura.denominazione} navigator={this.props.navigation} />
                <ScrollView style={styles.bodyScrollcontainer}>
                    <View style={styles.scrollContent}>
                        <View style={styles.carouselContainer} >
                            <Carousel
                            style= {styles.carouselStyle}
                            layout={"default"}
                            ref={ref => this.carousel = ref}
                            data={this.state.carouselItems}
                            sliderWidth={300}
                            itemWidth={300}
                            renderItem={this._renderItem}
                            onSnapToItem = { index => this.setState({activeIndex:index}) } />
                        </View>

                            <View style={styles.fieldContainerTop}>
                                <TextInput style={styles.singleField} editable={this.state.IsEditable}>{this.state.struttura.denominazione}</TextInput>
                                <TextInput style={styles.singleField} editable={this.state.IsEditable}>{this.state.struttura.via}</TextInput>
                                <TextInput style={styles.singleField} editable={this.state.IsEditable}>{this.state.struttura.provincia}</TextInput>
                            </View>
                            <View style={styles.twoFieldContainer}>
                                <TextInput style={styles.twoField} editable={this.state.IsEditable}>{this.state.struttura.cap}</TextInput>
                                <TextInput style={styles.twoField} editable={this.state.IsEditable}>{this.state.struttura.nazione}</TextInput>
                            </View>
                            <View style={styles.fieldContainerBottom}>
                                <TextInput style={styles.singleField} editable={this.state.IsEditable}>{this.state.struttura.tipologia}</TextInput>
                                <TextInput style={styles.singleField} editable={this.state.IsEditable}>{this.state.struttura.numeroAlloggi}</TextInput>
                                <TextInput style={styles.descrizioneField} 
                                    multiline={true}
                                    numberOfLines={20}
                                    editable={this.state.IsEditable}
                                >{this.state.struttura.descrizione}</TextInput>
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
                                nome={this.state.IsEditable ? 'Applica modifiche' : "Modifica dati"}  
                                onPress={()=> {this.state.IsEditable ? this.setState({IsEditable: false}) : this.setState({IsEditable: true})}} 
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
                                    var strutturaId = this.props.route.params.strutturaId;
                                    this.props.navigation.push("VisualizzaAlloggi", {user: user, strutturaId: strutturaId});        
                                }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}