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

import React, {useState, useRef} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player'


const MediaPlayerScreen = (props) => {

  return(
    <View style={styles.container}>
      <VideoPlayer
        videoProps={{
          shouldPlay: true, //video in play automaticamente
          resizeMode: Video.RESIZE_MODE_CONTAIN,
          source: require("../../assets/video/example.mp4"),
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
            props.navigation.navigate('HomeGuest');
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