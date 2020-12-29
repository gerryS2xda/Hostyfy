import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomImageButton = (props) => {
    if(props.nameIcon !== ''){
        return(
            <TouchableOpacity style = {[styles.bottoneStyle, props.styleBtn]} onPress={props.onPress}>
                <Icon name= {props.nameIcon} color={"#ffffff"} size={30} style={styles.immagineBottone}/>
               <Text style = {[styles.testoBottone, props.styleTxt]}>{props.nome}</Text>
             </TouchableOpacity>
        );
    }else{
        return(
            <TouchableOpacity 
                style = {[styles.bottoneStyle, props.styleBtn]}
                onPress={props.onPress}>
                <Image
                    style = {styles.immagineBottone}
                    source = {props.path}
                />
                <Text style = {styles.testoBottone}>{props.nome}</Text>
            </TouchableOpacity>
        );
    }
}

export default CustomImageButton;

const styles = StyleSheet.create({
    bottoneStyle : {
        borderWidth: 1,
        width: "100%",
        height: 40,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius:20,
        backgroundColor: '#0692d4',
    },
    immagineBottone : {
        width:30,
        height:30,
        marginLeft: "5%",
    },
    testoBottone: {
        color:'#ffffff',
        marginLeft: 20,
        fontFamily: "MontserrantSemiBold",
    },
});