import React, { useState } from 'react'
import { View,ScrollView, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';
import * as CleanServiceModel from "../firebase/datamodel/CleanServiceModel"; 
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

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

export default CleanService = ({route, navigation}) =>{

    const user = route.params.user;
    const id = route.params.id;
    const isFocused = useIsFocused();
    const [ditta,setDitta] = useState("");
    const [email,setEmail] = useState("");
    const [telefono,setTelefono] = useState("");
    const [data,setData] = useState("");
    useFocusEffect(
        React.useCallback(() => {
          // Do something when the screen is focused
            async function getData(){
            let cleanService = await CleanServiceModel.getCleanServiceById(id);
            console.log(cleanService);
            setDitta(cleanService.ditta);
            setEmail(cleanService.email);
            setTelefono(cleanService.numeroTel);
            setData((new Date(cleanService.dataAssunzione.seconds * 1000)).toLocaleString("it-IT").split(",")[0]);
        }
        getData();
        return () => {
            // Do something when the screen is unfocused
            // Useful for cleanup functions
          };
        }, [isFocused])
      );

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
                            <TextInput 
                                style={styles.singleField}
                                placeholder='Data assunzione'
                                onChangeText = {() => {}}
                                value={data}
                                editable= {false}
                            />
                        </View>
                        <View style={styles.bottomButtonContainer}>
                            <CustomButton styleBtn={{marginTop: 10, width: "100%"}} nome="Aggiorna" onPress={()=>{
                                CleanServiceModel.updateCleanServiceDocument(id,email,telefono,ditta, new Date(), user.userIdRef);
                                navigation.navigate('CleanService', {user: user, id: id});
                              } 
                            } />
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
