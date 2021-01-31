import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomButton from './CustomButton';

const CustomAlertGeneral = (props) => {

    const visibility = props.visibility;
    const annullaBtnName = props.annullaBtnName || "Annulla";
    const isNegativeBtnInvisible = props.hideNegativeBtn || false;
    

    return(
        <Modal
            transparent={true}
            visible={visibility}>
            <View style = {styles.container}>
                <View style = {styles.containertesto}>
                    <Text style={styles.titolo}>{props.titolo}</Text>
                    <Text style={styles.testo}>{props.testo}</Text>
                    {!isNegativeBtnInvisible && (
                        <View style = {styles.horizontalbutton}>
                        <CustomButton 
                            styleBtn={{width: "45%"}}
                            nome={annullaBtnName}
                            onPress={()=>{
                                props.onAnnullaBtn();
                                props.setVisibility(false);
                            }}
                        />
                        <CustomButton 
                            styleBtn={{width: "45%"}}
                            nome={props.buttonName}
                            onPress={()=>{ 
                                props.onOkPress(); 
                        }}/>      
                    </View> 
                    )}
                    {isNegativeBtnInvisible && (
                    <View style = {styles.horizontalbutton}>
                        <CustomButton 
                            styleBtn={{width: "100%"}}
                            nome={props.buttonName}
                            onPress={()=>{ 
                                props.onOkPress(); 
                        }}/>      
                    </View> 
                    )}
                        
                </View>         
            </View>
        </Modal>  
    );
}

export default CustomAlertGeneral;

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
    }




    }

);

