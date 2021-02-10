import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        //paddingTop: 6,
        //paddingLeft: 12,
        //paddingBottom: 6,
        marginLeft:"4%", //oldvalue: 16
        marginRight:"4%", //oldvalue: 16
        marginTop: "2%", //oldvalue: 8
        borderRadius: 18,
        borderWidth: 3,
        width: "93%",
        borderColor: "#e4eded",
        height: 70
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
        paddingTop: 10,
        paddingBottom: 10
    },
    description: {
        fontSize: 12,
        fontFamily: 'MontserrantItalic',
    },
    photo: {
        borderTopLeftRadius: 16,
        borderBottomLeftRadius:16,
        height: "100%",
        width: 70,
    },
    arrow: {
        alignSelf: 'center',
    },
});


const CustomRowGeneralCleanService = (props) => {
    const userLogged = props.userLogged;
    const cleanServiceId = props.cleanServiceId;
    return (
        <TouchableOpacity 
            onPress = {()=>{ 
                props.nav.navigate(props.newPage,{user: userLogged, id:cleanServiceId});      
            }}>
                
            <View style={styles.container}>
                <View style={styles.container_text}>
                    <Text style={styles.title}>
                        {props.title}
                    </Text>
                </View>
                <Icon name={"chevron-right"} color={"#000000"} size={40} style={styles.arrow} />
            </View>
        </TouchableOpacity>
    );
}
export default CustomRowGeneralCleanService;