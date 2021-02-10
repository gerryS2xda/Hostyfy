/*
    Required:
    - npm install expo-av
    - npm install expo-video-player 
    - npm install react-native-slider
    - npm install @react-native-community/netinfo
    - npm install @react-native-community/slider
    Documentazione:
    - https://docs.expo.io/versions/v39.0.0/sdk/video/
    - https://github.com/ihmpavel/expo-video-player
    - https://docs.expo.io/versions/v39.0.0/sdk/av/
*/

import React, {useState, useRef, useEffect } from 'react';
import {SafeAreaView, StyleSheet, Text, View, BackHandler} from 'react-native';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player'


const MediaPlayerScreen = ({ route, navigation }) => {

  const {user, uriVideo} = route.params;
  var videoPath = require("../../assets/video/example.mp4");
  if(uriVideo !== ""){
    videoPath = {uri: uriVideo};
  }

  useEffect(() => {
    const backAction = () => {
      //nessuna azione quando si preme il tasto back di Android
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return(
    <View style={styles.container}>
      <VideoPlayer
        videoProps={{
          shouldPlay: true, //video in play automaticamente
          resizeMode: Video.RESIZE_MODE_CONTAIN,
          source: videoPath,
          rate:1.0,
          volume:1.0,
          isMuted: false,
          isLooping: false,
        }}
      inFullscreen={true}
      showFullscreenButton={false}
      playbackCallback={playbackStatus=>{
        if(playbackStatus.isLoaded){
          if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
            // The player has just finished playing and will stop. Maybe you want to play something else?
            navigation.reset({
              index: 0,
              routes: [{ name: 'HomeGuest',  params: { userId: user.userIdRef }}],
            }); //resetta lo stack quando si ritorna nella Home
          }
        }
      }}
      errorCallback={error => console.error('Error: ', error.message, error.type, error.obj)}
      //proprieta' da usare quando il pulsante 'fullscreen' e' false
      switchToPortrait={() => console.warn('Pass your logic to switchToPortrait prop')}
      switchToLandscape={() => console.warn('Pass your logic to switchToLandscape prop')}
    />
    </View>
  );
}

export default MediaPlayerScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
});