import React, { useState, useCallback } from 'react'
import { View, Text, StyleSheet, Alert, Image } from 'react-native'
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import HeaderBar from '../components/CustomHeaderBar'
import ButtonMenu from "../components/ButtonMenu";
import { firebase } from '../firebase/config'
import * as GuestModel from "../firebase/datamodel/GuestModel"
import * as HostModel from "../firebase/datamodel/HostModel"

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: "#fffefc",
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: "#000000"
  },
  container: {
    flex: 1,
    width: "100%",
    flexDirection: 'column',
    marginRight: "3%",
    marginLeft: "3%",
    //backgroundColor: "#000000"
  },

  firstContainer: {
    height: "28%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: '4%',
    paddingLeft: "4%",
    paddingBottom: "2%",
    //backgroundColor: "#000000",
    paddingTop: "4%",
  },

  secondContainer: {
    height: "28%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: '4%',
    paddingLeft: "4%",
    //backgroundColor: "#034000",
    paddingTop: "2%",
    paddingBottom: "4%"
    
  },

  topcontainer:{
    flex:1,
    justifyContent: 'flex-end',
    //marginBottom: "5%",
    //backgroundColor: "#000000"
  },

  image:{
    marginLeft: "7%",
    width: "80%",
    height: "40%",

  },
})

const HomeGuest = ({ route, navigation }) => {

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

  const { userId } = route.params;
  const [user, setUser] = useState({});
  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      // Ottieni info dell'utente da DB usando lo userId
      async function getUserData() {
        var guestDoc = await GuestModel.getGuestDocument(userId);
        guestDoc.dataNascita = new Date(guestDoc.dataNascita.seconds * 1000).toDateString();
        var creditcardDoc = await GuestModel.getGuestCreditCardDocument(userId);
        if (guestDoc.isHost) { //verifica se guest e' anche un host
          var hostDoc = await HostModel.getHostDocument(userId);
          setUser({ ...guestDoc, ...creditcardDoc, ...hostDoc });
        } else {
          setUser({ ...guestDoc, ...creditcardDoc });
        }
      }
      getUserData();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [isFocused])
  );

  return (
    <View style={styles.maincontainer}>
      <HeaderBar title="Home" navigator={navigation} />
        <View style={styles.container}>
          <View style = {styles.topcontainer}>
          <Image 
              source = {require("../../assets/Varie/Homepage.jpg")}
              style = {styles.image}/>
            <View style={styles.firstContainer}>
              <ButtonMenu styleBtn={{ width: "47%", height: "100%" }} nameIcon={"pencil"} nome='Modifica Profilo' onPress={() => navigation.navigate("ModificaProfilo", { user: user })} />
              <ButtonMenu styleBtn={{ width: "47%", height: "100%" }} nameIcon={"briefcase"} nome='Prenotazioni' onPress={() => navigation.navigate("VisualizzaPrenotazioni", { user: user, isHost: false })} />
            </View>

            <View style={styles.secondContainer}>
              <ButtonMenu styleBtn={{ width: "47%", height: "100%" }} nameIcon={"emoticon-happy-outline"} nome='Recensioni' onPress={()=>navigation.navigate("RecensioniGuestScreen", {user: user})} />
              <ButtonMenu styleBtn={{ width: "47%", height: "100%" }} nameIcon={"logout"}nome="Logout" onPress={() => {
                firebase.auth().signOut().then(function () {
                  navigation.navigate('Home'); // Sign-out successful.
                }).catch(function (error) { // An error happened.
                  console.log("Error Sign-out in HomeGuest.js: " + error);
                });
              }} />
            </View>
            </View>
          </View>
      </View>
    
  );
}

export default HomeGuest