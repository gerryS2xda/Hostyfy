import { useLinkProps } from '@react-navigation/native';
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Dialog from 'react-native-dialog';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
    },
    title: {
        fontSize: 16,
        color: '#000',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
    },
    photo: {
        height: 50,
        width: 50,
    },
    arrow: {
        marginLeft: 250,
        marginTop: -35
    },
    opacity:{

        

    }

    
});


const CustomRowGeneral = (props) => {
    
    
return (
<TouchableOpacity 
    style = {styles.opacity}
    onPress = {()=> props.nav.navigate(props.newPage)}>
           

    <View style={styles.container}>
        <Image source={props.image_url} style={styles.photo} />
        <View style={styles.container_text}>
            <Text style={styles.title}>
                {props.title}
            </Text>
            <Text style={styles.description}>
                {props.description}
            </Text>
            <Image
                source = {require('../../assets/arrow.png')}
                style = {styles.arrow} 
            />
        </View>
    </View>
</TouchableOpacity>

);
}
export default CustomRowGeneral;