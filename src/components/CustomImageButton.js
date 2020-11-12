import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

const CustomImageButton = (props) => {
    return(
        <TouchableOpacity
            style = {[styles.bottoneStyle, props.style]}
            onPress={props.onPress}>
            <Image
                style = {styles.immagineBottone}
                source = {props.path}
            />
            <Text style = {styles.testoBottone}>{props.nome}</Text>
        </TouchableOpacity>
    );
}

export default CustomImageButton;

const styles = StyleSheet.create({
    bottoneStyle : {
        borderWidth: 1,
        width: 300,
        height: 40,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius:8,
        backgroundColor: '#f2077d',
    },
    immagineBottone : {
        width:30,
        height:30,
        marginLeft: 5,
    },
    testoBottone: {
        color:'#ffffff',
        marginLeft: 20,
    },
});