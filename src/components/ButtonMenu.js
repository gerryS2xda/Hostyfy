import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ButtonMenu = (props) => {
    if (props.nameIcon !== '') {
        return (
            <TouchableOpacity style={[styles.bottoneStyle, props.styleBtn]} onPress={props.onPress}>
                <Icon name={props.nameIcon} color={"#ffffff"} size={30} style={styles.immagineBottone} />
                <Text style={[styles.testoBottone, props.styleTxt]}>{props.nome}</Text>
            </TouchableOpacity>
        );
    } else {
        return (
            <TouchableOpacity
                style={[styles.bottoneStyle, props.styleBtn]}
                onPress={props.onPress}>
                <Image
                    style={styles.immagineBottone}
                    source={props.path}
                />
                <Text style={styles.testoBottone}>{props.nome}</Text>
            </TouchableOpacity>
        );
    }
}

export default ButtonMenu;

const styles = StyleSheet.create({
    bottoneStyle: {
        borderWidth: 1,
        width: "100%",
        height: 40,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#0692d4',
        shadowColor: '#fff',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 1,
    },
    immagineBottone: {
        width: 30,
        height: 30,
    },
    testoBottone: {
        color: '#ffffff',
        fontFamily: "MontserrantSemiBold",
    },
});