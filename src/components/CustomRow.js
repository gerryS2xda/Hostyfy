import { useLinkProps } from '@react-navigation/native';
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Dialog from 'react-native-dialog';


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
    styleDialogTitle: {
        fontFamily: "MontserrantBold",
    },
    styleDialogDescription: {
        fontFamily: "Montserrant",
    },
    styleDialogBtnTxt: {
        fontFamily: "MontserrantSemiBold",
    },
    styleDialogInput:{
        fontFamily: 'MontserrantSemiBold',
        borderBottomWidth: 1,
    }
});


const CustomRow = (props) => {
    const [visible, setVisible] = useState(false)
    const [value, setValue] = useState('');
    const showDialog = () => setVisible(true);
    const handleOk = () => setVisible(false);
    const stato = props.OTP
return (
<TouchableOpacity 
    style = {styles.opacity}
    onPress = {() =>
        {
            
            if(stato == 'true')
            {
                props.nav.navigate(props.newPage)
            }
            else
            {
                setVisible(true)
            }

        }
    }>
        <Dialog.Container visible={visible}>
          <Dialog.Title style={styles.styleDialogTitle}>Verifica la tua struttura</Dialog.Title>
          <Dialog.Description style={styles.styleDialogDescription}>Per accedere alla tua struttura devi inserire il codice OTP inviato via posta tradizionale</Dialog.Description>
          <Dialog.Input style={styles.styleDialogInput} placeholder="1sd34d" value={value} onChangeText={setValue} />
          <Dialog.Button style={styles.styleDialogBtnTxt} label="Annulla" onPress={handleOk} />
          <Dialog.Button style={styles.styleDialogBtnTxt} label="Verifica" onPress={

            ()=>{
              if(value=='1234')
              {
                handleOk
                Alert.alert("Verifica Struttura", "La tua struttura è stata registrata con successo")
                setVisible(false)
                props.nav.navigate("VisualizzaStruttura")
              }
              else
              {
                handleOk
                Alert.alert("Verifica Struttura", "Attenzione! Codice Errato, ritenta")
              }
            }

            }
            
            
          />
      </Dialog.Container>

    <View style={styles.container}>
        <Image source={props.image_url} style={styles.photo} />
        <View style={styles.container_text}>
            <Text style={styles.title}>
                {props.title}
            </Text>
            <Text style={styles.description}>
                {props.description}
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
export default CustomRow;