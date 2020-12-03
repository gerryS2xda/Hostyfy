import React from 'react';
import {Text, View, Image,ScrollView, Alert, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
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
            user: props.route.params         
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
                            <CustomButton 
                                styleBtn={{width: "100%"}} 
                                nome="Inserisci Foto"  
                                onPress={()=> Alert.alert(
                                    "Funzionalità non disponibile", "Questa funzionalità sarà disponibile a seguito di sviluppi futuri!",
                                    [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
                                    { text: "OK", onPress: () => console.log("OK Pressed") }],
                                    { cancelable: false })} />  
                        </View>

                        <View style={styles.bottomButtonContainer}>
                            <CustomButton styleBtn={{marginTop: 10, width: "100%"}} nome="Inserisci guida" onPress={()=> Alert.alert(
                                "Funzionalità non disponibile", "Questa funzionalità sarà disponibile a seguito di sviluppi futuri!",
                                [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
                                { text: "OK", onPress: () => console.log("OK Pressed") }],
                                { cancelable: false })} /> 

                           

                            <CustomButton styleBtn={{marginTop: 10, width: "100%"}} nome="Aggiungi" onPress={()=> Alert.alert(
                                "Inserisci struttura", "La nuova struttura e' stata memorizzata con successo!",
                                [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
                                { text: "OK", onPress: ()=> {
                                    var indirizzo = {via: this.state.indirizzo, citta:this.state.citta, cap:this.state.cap, provincia:this.state.provincia, regione:this.state.regione, nazione:this.state.nazione}                                 
                                    var cfHost = this.state.user.cf
                                    StrutturaModel.createStrutturaDocument(cfHost, 0, this.state.denominazione, this.state.descrizione, indirizzo, " ", this.state.numeroAlloggi,this.state.tipologia, 0); 
                                    this.denominazione.clear();  
                                    this.regione.clear();                        
                                    this.citta.clear(); 
                                    this.descrizione.clear(); 
                                    this.alloggi.clear(); 
                                    this.tipologia.clear();
                                    this.nazione.clear(); 
                                    this.cap.clear();
                                    this.indirizzo.clear(); 

                                    this.props.navigation.navigate('LeMieStrutture') }}],
                                { cancelable: false })} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}