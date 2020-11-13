import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const CustomButton = (props) => {
    return(
        <TouchableOpacity
            style = {[styles.bottoneStyle, props.styleBtn]}
            onPress={props.onPress}>
            <Text style = {[styles.testoBottone, props.styleTxt]}>{props.nome}</Text>
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
        backgroundColor: '#f2077d',
    },
    testoBottone: {
        color:'#ffffff',
        fontFamily: "MontserrantSemiBold",
    },
});