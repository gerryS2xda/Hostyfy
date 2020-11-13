import React, { useState } from 'react'
import {View, Text, StyleSheet, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderBar from '../components/CustomHeaderBar'
import CustomButton from '../components/CustomButton'
import CustomImageButton from "../components/CustomImageButton";

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  topContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop:10
  },

  centerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height:170,
    marginTop:20

  },

  bottomContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:100,
  },

  testoLogo : {
    fontSize: 20,
    color: 'black',
    marginTop: 10,
    fontFamily: "MontserrantSemiBold",
  },
})

const HomeGuest = (props) => {
  const createNextRealeaseFeatureAlert = () =>
      Alert.alert(
      "Funzionalità non disponibile",
      "Questa funzionalità sarà disponibile a seguito di sviluppi futuri!",
      [
          {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

  return(
    <View style={styles.maincontainer}>
      <HeaderBar title="Home" navigator={props.navigation} />
      <View style={styles.container}>
        <View style={styles.topContainer} >
          <Icon name= "account-circle-outline" color={"black"} size={100}/>
          <Text style = {styles.testoLogo}>Gennaro Teodoro</Text>
        </View>
        <View style={styles.centerContainer}>
          <CustomImageButton styleBtn={{width:300}}nameIcon={"pencil"} nome= 'Modifica il tuo profilo' onPress={() => props.navigation.navigate("ModificaProfilo")} />
          <CustomImageButton styleBtn={{width:300}} nameIcon={"briefcase"} nome= 'Prenotazioni' onPress={() => props.navigation.navigate("VisualizzaPrenotazioni")} />
          <CustomImageButton styleBtn={{width:300}} nameIcon={"emoticon-happy-outline"} nome= 'Recensioni' onPress={createNextRealeaseFeatureAlert} />
        </View>
        <View style={styles.bottomContainer}>
          <CustomButton styleBtn={{width:300}} nome="Esci" onPress={() => { props.navigation.navigate('Home'); }} />
        </View>
      </View>
    </View>
  );
}

export default HomeGuest