import React, { useState, useRef } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import CustomButton from './CustomButton';

const CustomAlertTextInput = (props) => {

    const visibility = props.visibility;
    const textInputRef = useRef(null); 

    return(
        <Modal
            transparent={true}
            visible={visibility}>
            <View style = {styles.container}>
                <View style = {styles.containertesto}>
                    <Text style={styles.titolo}>{props.titolo}</Text>
                    <Text style={styles.testo}>{props.testo}</Text>
                    <View style = {styles.textInputContainer}>
                    <TextInput
                        style={styles.input}
                        ref={textInputRef}
                        placeholder={props.placeholder}
                        onChangeText={(text) => props.setTextData(text)}
                    />
                    </View>
                    <View style = {styles.horizontalbutton}>
                        <CustomButton 
                            styleBtn={{width: "45%"}}
                            nome="Annulla"
                            onPress={()=>{    
                                    props.setVisibility(false);
                                    textInputRef.current.clear(); 
                                }
                            }
                        />
                        <CustomButton 
                            styleBtn={{width: "45%"}}
                            nome={props.buttonName}
                            onPress={()=>{
                                textInputRef.current.clear();
                                props.onOkPress(); 
                        }}/> 
                    </View>    
                </View>         
            </View>
        </Modal>  
    );
}

export default CustomAlertTextInput;

const styles = StyleSheet.create({

    container:
    {
        backgroundColor: "#000000aa",
        flex: 1,
        justifyContent: 'center'
    },

    containertesto:
    {
        backgroundColor: "#ffffff",
        margin: "10%", 
        padding: "4%", 
        borderRadius: 10
    },

    titolo:
    {
        fontSize: 18,
        fontFamily: 'MontserrantBold',
        color: "#000000"
    },

    testo:
    {
        fontSize: 13, 
        fontFamily: 'MontserrantSemiBold',
        marginBottom: "4%",
        marginTop: "4%",
        borderRadius: 10,
        padding: "2%"

    },

    horizontalbutton:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textInputContainer: {
        marginTop: 5,
        marginBottom: 20,
        alignItems: 'center',
    },
    input: {
        minHeight: 30,
        height: 40,
        width: "100%",
        borderColor: '#303a52',
        borderWidth: 1.7,
        borderRadius: 20,
        fontFamily: 'MontserrantSemiBold',
        paddingLeft: "5%",
        marginTop: "4%",
        paddingRight: "5%",
      },
    }

);

