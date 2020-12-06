import React, {useEffect} from 'react';
import {Text, View, Image,ScrollView, BackHandler, StyleSheet, TextInput, Alert} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';
import {firebase} from '../firebase/config'

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

    render() {
        var struttura = this.props.route.params.struttura;
        var user = this.props.route.params.user;
        var carouselItems = this.props.route.params.fotoCarousel;
        if(this.state.IsEditable){
            this.setState({IsEditable:false});
        }
        
        return (
            <View style={styles.maincontainer}>
                <HeaderBar title={struttura.denominazione} navigator={this.props.navigation} />
                <ScrollView style={styles.bodyScrollcontainer}>
                    <View style={styles.scrollContent}>
                        <View style={styles.carouselContainer} >
                            <Carousel
                            style= {styles.carouselStyle}
                            layout={"default"}
                            ref={ref => this.carousel = ref}
                            data={carouselItems}
                            sliderWidth={300}
                            itemWidth={300}
                            renderItem={this._renderItem}
                            onSnapToItem = { index => this.setState({activeIndex:index}) } />
                        </View>

                            <View style={styles.fieldContainerTop}>
                                <TextInput style={styles.singleField} editable={this.state.IsEditable}>{struttura.denominazione}</TextInput>
                                <TextInput style={styles.singleField} editable={this.state.IsEditable}>{struttura.via}</TextInput>
                                <TextInput style={styles.singleField} editable={this.state.IsEditable}>{struttura.provincia}</TextInput>
                            </View>
                            <View style={styles.twoFieldContainer}>
                                <TextInput style={styles.twoField} editable={this.state.IsEditable}>{struttura.cap}</TextInput>
                                <TextInput style={styles.twoField} editable={this.state.IsEditable}>{struttura.nazione}</TextInput>
                            </View>
                            <View style={styles.fieldContainerBottom}>
                                <TextInput style={styles.singleField} editable={this.state.IsEditable}>{struttura.tipologia}</TextInput>
                                <TextInput style={styles.singleField} editable={this.state.IsEditable}>{struttura.numeroAlloggi}</TextInput>
                                <TextInput style={styles.descrizioneField} 
                                    multiline={true}
                                    numberOfLines={20}
                                    editable={this.state.IsEditable}
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
                                    var itemList = [];
                                    var count = 1;
                                    var count1 = 1;
                                    db.collection('struttura').doc(struttura.id).collection('alloggi').get().then((querySnapshot)=>{
                                        if(querySnapshot.size==0){
                                            this.props.navigation.push("VisualizzaAlloggi", {user: user, list: itemList, strutturaId: struttura.id});
                                        }

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
                                                strutturaId: struttura.id,  
                                                id: doc.id
                                            }
                                            count++;
                                            itemList.push(oggetto);
                                            if(count1 < querySnapshot.size){
                                                count1++;
                                            }else{
                                                this.props.navigation.push("VisualizzaAlloggi", {user: user, list: itemList, strutturaId: struttura.id});
                                            }
                                        })
                                    });
                                }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}