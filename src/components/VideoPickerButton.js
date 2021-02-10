import React, { useState, useEffect } from 'react';
import {Platform, StyleSheet, TouchableOpacity, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from "../components/CustomButton"


const VideoPickerButton = (props) => {
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
      mediaTypes: ImagePicker.MediaTypeOptions.Videos, //accetta solo video
      allowsEditing: false,
      allowsMultipleSelection: false, //funziona solo su web
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <CustomButton
      styleBtn={props.styleBtn}
      nome={props.nomeBtn}
      onPress={pickImage} 
    />
  );
}

export default VideoPickerButton;