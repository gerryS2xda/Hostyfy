import React, { useState, useEffect, useCallback } from 'react'
import {View, Text, StyleSheet, Alert } from 'react-native'
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderBar from '../components/CustomHeaderBar'
import CustomButton from '../components/CustomButton'
import CustomImageButton from "../components/CustomImageButton";
import * as GuestModel from "../firebase/datamodel/GuestModel"
import * as HostModel from "../firebase/datamodel/HostModel"

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

const HomeGuest = ({route, navigation}) => {

  const {userId} = route.params;
  const [user, setUser] = useState({});
  const isFocused = useIsFocused();
  
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      // Ottieni info dell'utente da DB usando lo userId
      async function getUserData(){
        var guestDoc = await GuestModel.getGuestDocument(userId);
        var creditcardDoc = await GuestModel.getGuestCreditCardDocument(userId);
        if(guestDoc.isHost){ //verifica se guest e' anche un host
            var hostDoc = await HostModel.getHostDocument(userId);
            setUser({...guestDoc, ...creditcardDoc, ...hostDoc});
        }else{
          setUser({...guestDoc, ...creditcardDoc});
        }
      }
      getUserData();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [isFocused])
  );

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
      <HeaderBar title="Home" navigator={navigation} />
      <View style={styles.container}>
        <View style={styles.topContainer} >
          <Icon name= "account-circle-outline" color={"black"} size={100}/>
          <Text style = {styles.testoLogo}>{user.nome} {user.cognome}</Text>
        </View>
        <View style={styles.centerContainer}>
          <CustomImageButton styleBtn={{width:300}} nameIcon={"pencil"} nome= 'Modifica Profilo' onPress={() => navigation.navigate("ModificaProfilo", {user: user})} />
          <CustomImageButton styleBtn={{width:300}} nameIcon={"briefcase"} nome= 'Prenotazioni' onPress={() => navigation.navigate("VisualizzaPrenotazioni", {user: user})} />
          <CustomImageButton styleBtn={{width:300}} nameIcon={"emoticon-happy-outline"} nome= 'Recensioni' onPress={createNextRealeaseFeatureAlert} />
        </View>
        <View style={styles.bottomContainer}>
          <CustomButton styleBtn={{width:300}} nome="Esci" onPress={() => { 
            firebase.auth().signOut().then(function() {
              navigation.navigate('Home'); // Sign-out successful.
            }).catch(function(error) { // An error happened.
              console.log("Error Sign-out in HomeGuest.js: " + error);
            });
             }} />
        </View>
      </View>
    </View>
  );
}

export default HomeGuest