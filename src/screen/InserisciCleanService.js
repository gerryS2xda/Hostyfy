import React, { useState } from 'react'
import { View,ScrollView, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';
import * as CleanServiceModel from "../firebase/datamodel/CleanServiceModel"; 

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

export default InserisciCleanService = ({route, navigation}) =>{

    const user = route.params.user;
    console.log(user);
    const [ditta,setDitta] = useState("");
    const [email,setEmail] = useState("");
    const [telefono,setTelefono] = useState("");
        return (
            <View style={styles.maincontainer}>
                <HeaderBar title="Inserisci Clean Service" navigator={navigation} />
                <ScrollView style={styles.bodyScrollcontainer}>
                    <View style={styles.scrollContent}> 
                        <View style={styles.topContainer}>
                            <TextInput 
                                style={styles.singleField}
                                placeholder='Ditta'
                                onChangeText = {(testo) => setDitta(testo)}
                                value={ditta}
                            />
                            <TextInput 
                                style={styles.singleField}
                                placeholder='Email'
                                onChangeText = {(testo) => setEmail(testo)}
                                value={email}
                            />
                            <TextInput 
                                style={styles.singleField}
                                placeholder='Telefono'
                                onChangeText = {(testo) => setTelefono(testo)}
                                value={telefono}
                            />
                        </View>
                        <View style={styles.bottomButtonContainer}>
                            <CustomButton styleBtn={{marginTop: 10, width: "100%"}} nome="Aggiungi" onPress={()=>{
                                CleanServiceModel.createCleanServiceDocument(email,telefono,ditta, new Date(), user.userIdRef);
                                setDitta("");
                                setEmail("");
                                setTelefono("");
                                navigation.navigate('VisualizzaCleanServices', {user: user});
                              } 
                            } />
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
