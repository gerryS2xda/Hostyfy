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
          <Dialog.Title>Verifica la tua struttura</Dialog.Title>
          <Dialog.Description>Per accedere alla tua struttura devi inserire il codice OTP inviato via posta tradizionale</Dialog.Description>
          <Dialog.Input value={value} onChangeText={setValue} />
          <Dialog.Button label="Annulla" onPress={handleOk} />
          <Dialog.Button label="Verifica" onPress={

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
            <Image
                source = {require('../../assets/arrow.png')}
                style = {styles.arrow} 
            />
        </View>
    </View>
</TouchableOpacity>

);
}
export default CustomRow;