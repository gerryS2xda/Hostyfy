import React, { useState, useEffect } from 'react';
import {Platform, StyleSheet, TouchableOpacity, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

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



const ImagePickerButton = (props) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, //accetta solo immagini come asset
      allowsEditing: false,
      allowsMultipleSelection: true, //funziona solo su web
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
     props.reference.setState({image : result.uri});
    }
  };

  return (
    <TouchableOpacity
    style = {[styles.bottoneStyle, props.styleBtn]}
    onPress={pickImage}>
    <Text style = {[styles.testoBottone, props.styleTxt]}>{props.nome}</Text>
    </TouchableOpacity>
  );
}

export default ImagePickerButton;