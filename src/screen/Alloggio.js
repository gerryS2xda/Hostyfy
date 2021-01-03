import React from 'react';
import {Text, View, Image,ScrollView, Alert, StyleSheet, TextInput} from 'react-native';
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

export default class AlloggioScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          IsEditable: false,
          alloggio : {},
          carouselItems: [],
          activeIndex:0,
      }
    }

    //Invocato dopo che il componente è montato (cioè inserito nell’albero del DOM).
    componentDidMount() {
        if(this.state.IsEditable){
            this.setState({IsEditable:false});
        }

        async function getAlloggioData(reference){
            var strutturaId = reference.props.route.params.strutturaId;
            var alloggioId = reference.props.route.params.alloggioId;

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
            reference.setState({alloggio: alloggioDoc, carouselItems: fotoList}); 
        }
        getAlloggioData(this);
    }  
    
    _renderItem({item,index}){
        return (
          <View style={{ justifyContent:'center',
            marginLeft:50
              }}>
           <Image style={{width:250, height:250, borderRadius:10}} source = {item.image} />
            <Text>{item.title}</Text>
          </View>

        )
    }

    render() {
        var user = this.props.route.params.user;
        var strutturaId = this.props.route.params.strutturaId;
        var alloggioId = this.props.route.params.alloggioId;

        return (
            <View style={styles.maincontainer}>
                <HeaderBar title={this.state.alloggio.nomeAlloggio} navigator={this.props.navigation} />
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
                        <View style={styles.middleContainer}>
                            <TextInput style={styles.singleField} editable={this.state.IsEditable}>{this.state.alloggio.nomeAlloggio}</TextInput>
                            <TextInput style={styles.singleField} editable={this.state.IsEditable}>{this.state.alloggio.numCamere}</TextInput>
                            <TextInput style={styles.singleField} editable={this.state.IsEditable}>{this.state.alloggio.numMaxPersone}</TextInput>
                            <TextInput style={styles.singleField} editable={this.state.IsEditable}>{this.state.alloggio.piano}</TextInput>
                            <TextInput style={styles.descrizioneField}
                                editable={this.state.IsEditable}
                                multiline={true}
                                numberOfLines={15}>
                                {this.state.alloggio.descrizione}
                             </TextInput>
                        </View>
                        <CustomButton 
                                styleBtn={{width: "100%", marginTop: "5%"}}
                                nome= "Disponibilità" 
                                onPress={()=>{
                                    this.props.navigation.navigate("Visualizza_calendario_alloggio",{user: user, isHost: user.isHost, alloggioId: alloggioId})
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
                                nome={this.state.IsEditable ? 'Applica modifiche' : "Modifica dati"}   
                                onPress={()=> {this.state.IsEditable ? this.setState({IsEditable: false}) : this.setState({IsEditable: true})}}
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
                                        this.props.navigation.navigate('LaMiaChiave', {user: user, strutturaId: strutturaId, alloggioId: alloggioId, prenotazioneId: ""})
                                    }
                                }
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
