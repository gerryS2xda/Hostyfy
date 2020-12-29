import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const CustomButton = (props) => {
    return(
        <TouchableOpacity
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
        borderRadius:20,
        backgroundColor: '#0692d4',
    },
    testoBottone: {
        color:'#ffffff',
        fontFamily: "MontserrantSemiBold",
    },
});