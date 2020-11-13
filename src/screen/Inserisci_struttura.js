import React from 'react';
import {Text, View, Image,ScrollView, Alert, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';

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
          activeIndex:0,
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
                <HeaderBar title="Inserisci struttura" navigator={this.props.navigation} />
                <ScrollView style={styles.bodyScrollcontainer}>
                    <View style={styles.scrollContent}> 
                        <View style={styles.topContainer}>
                            <TextInput 
                                style={styles.singleField}
                                placeholder='Denominazione struttura'
                            />
                            <TextInput 
                                style={styles.singleField}
                                placeholder='Indirizzo'
                            />
                        </View>
                        <View style={styles.twoFieldContainer}>
                            <TextInput 
                                style={styles.middleTextInput}
                                placeholder='Città'
                            />
                            <TextInput 
                                style={styles.middleTextInput}
                                placeholder='CAP'
                            />
                        </View>
                        <View style={styles.middleContainer}>
                            <TextInput 
                                style={styles.singleField}
                                placeholder='Nazione'
                            />
                            <TextInput 
                                style={styles.singleField}
                                placeholder='Tipologia'
                            />
                            <TextInput 
                                style={styles.singleField}
                                placeholder='Numero alloggi'
                            />
                            <TextInput 
                                style={styles.descrizioneField}
                                placeholder='Descrizione'
                                multiline={true}
                                numberOfLines={15}
                            />
                        </View>
                        <View style={styles.threeButtonContainer}>
                            <CustomButton 
                                styleBtn={{width: "45%"}} 
                                nome="Inserisci Foto"  
                                onPress={()=> Alert.alert(
                                    "Funzionalità non disponibile", "Questa funzionalità sarà disponibile a seguito di sviluppi futuri!",
                                    [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
                                    { text: "OK", onPress: () => console.log("OK Pressed") }],
                                    { cancelable: false })} /> 
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
                                "Inserisci struttura", "La nuova struttura e' stata memorizzata con successo!",
                                [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
                                { text: "OK", onPress: () => console.log("OK Pressed") }],
                                { cancelable: false })} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}