import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        marginLeft:"4%", //oldvalue: 16
        marginRight:"4%", //oldvalue: 16
        marginTop: "2%", //oldvalue: 8
        marginBottom: "3%", //oldvalue: 8
        borderRadius: 3,
        elevation: 2,
        width: "93%",
        //backgroundColor: 'black'
    },
    title: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'MontserrantSemiBold'
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    description: {
        fontSize: 12,
        fontFamily: 'MontserrantItalic',
    },
    photo: {
        height: 50,
        width: 50,
        borderRadius: 4,
    },
    arrow: {
        alignSelf: 'center',
    },
});


const CustomRowGeneralAlloggio = (props) => {
    const userLogged = props.userLogged;
    const strutturaId = props.strutturaId;
    const alloggioId = props.id;
    var descrizioneSmall = props.description;
    
    if(descrizioneSmall.length > 30){
        descrizioneSmall = descrizioneSmall.substring(0, 30) + "...";
    }

    return (
        <TouchableOpacity 
            onPress = {()=>{ 
                props.nav.navigate(props.newPage,{user: userLogged, strutturaId: strutturaId, alloggioId: alloggioId});      
            }}>
                
            <View style={styles.container}>
                <Image source={props.image_url} style={styles.photo} />
                <View style={styles.container_text}>
                    <Text style={styles.title}>
                        {props.title}
                    </Text>
                    <Text style={styles.description}>
                        {descrizioneSmall}
                    </Text>
                </View>
                <Image
                        source = {require('../../assets/arrow.png')}
                        style = {styles.arrow} 
                    />
            </View>
        </TouchableOpacity>
    );
}
export default CustomRowGeneralAlloggio;