import React from 'react';
import {Text, View, Image,ScrollView, Alert, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

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
  })




export default class AlloggioScreen extends React.Component {

   
 
    constructor(props){
        super(props);
        this.state = {
          IsEditable: false,
          activeIndex:0,
          user: props.route.params.user,
          alloggio: props.route.params.alloggio,
          carouselItems: props.route.params.fotoCarousel,
      }
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

        const nameCamera = "Suite";
        const myKey = "0123";
        return (
            <View style={styles.maincontainer}>
                <HeaderBar title="Alloggio" navigator={this.props.navigation} />
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
                            <TextInput style={styles.singleField} editable={this.state.IsEditable}>{this.state.alloggio.numeroCamere}</TextInput>
                            <TextInput style={styles.singleField} editable={this.state.IsEditable}>{this.state.alloggio.numeroMassimoPersone}</TextInput>
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
                                    console.log(this.state.alloggio.id)
                                    this.props.navigation.navigate('Calendario_Alloggio',{id:this.state.alloggio.id, strutturaId:this.state.alloggio.strutturaId})}}
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
                                onPress={() => {this.props.navigation.navigate('LaMiaChiave')}}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
