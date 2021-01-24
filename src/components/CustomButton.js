import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const CustomButton = (props) => {
    return(
        <TouchableOpacity
            disabled={props.disabled}
            style = {[styles.bottoneStyle, props.styleBtn]}
            onPress={props.onPress}>
            <Text style = {styles.testoBottone}>{props.nome}</Text>
        </TouchableOpacity>
    );
}

export default CustomButton;

const styles = StyleSheet.create({
    bottoneStyle : {
        borderWidth: 1,
        width: "100%",
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:8,
        backgroundColor: '#0692d4',
        shadowColor: "#000",
        shadowOffset: {
            width: 6,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 5,
        elevation: 9,

        
    },
    testoBottone: {
        color:'#ffffff',
        fontFamily: "MontserrantSemiBold",
    },
});