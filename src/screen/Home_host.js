import React, { useState, useCallback} from 'react'
import {View, Text, StyleSheet, Alert, Image} from 'react-native'
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import HeaderBar from '../components/CustomHeaderBar'
import * as GuestModel from "../firebase/datamodel/GuestModel"
import * as HostModel from "../firebase/datamodel/HostModel"
import ButtonMenu from "../components/ButtonMenu"

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
    width: "90%",
    height: "40%",
    marginLeft: "5%"
  },
})

const HomeHost = ({route, navigation}) => {

  const {userId} = route.params; 
  const [user, setUser] = useState({});
  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
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

  //Codice per gestire lo stato del calendario quando si seleziona un range di giorni
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const minDate = new Date(); // Today
  const maxDate = new Date(2017, 6, 3);
  const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
  const endDate = selectedEndDate ? selectedEndDate.toString() : '';
  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
        setSelectedEndDate(date);
        console.log('_il tipo è :' + type)
        console.log('data inizio ' + new Date(selectedStartDate) + ' data fine ' + new Date(date))
        this.resetSelections()
    } else {
      console.log('il tipo è :' + type)
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  }

  //Altro codice
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
          <View style = {styles.topcontainer}>
            <Image 
                source = {require("../../assets/Varie/HomeHost.jpg")}
                style = {styles.image}/>

            <View style={styles.firstContainer}>    
              <ButtonMenu styleBtn={{ width: "47%", height: "100%" }} nameIcon={"home-outline"} 
                nome= 'Le mie strutture' 
                onPress={() =>{  navigation.navigate("LeMieStrutture", {user: user}); }} 
              />
              <ButtonMenu styleBtn={{ width: "47%", height: "100%" }} nameIcon={"plus-circle-outline"} 
                nome= 'Prenotazione' 
                onPress={() => navigation.navigate("InserisciPrenotazione", {user: user})} 
              />
            </View>

            <View style={styles.secondContainer}>
              <ButtonMenu styleBtn={{ width: "47%", height: "100%" }} nameIcon={"emoticon-happy-outline"} 
                nome= 'Recensioni' onPress={() => navigation.navigate("RecensioniHostScreen", {user: user})}/>
            
              <ButtonMenu nome="Visualizza date"
              styleBtn={{ width: "47%", height: "100%" }}
              nameIcon={"calendar-month-outline"}
              onPress={() => navigation.navigate("VisualizzaDateAlloggi",{
                user: user,
                isHost: user.isHost,
              })}/>
            </View>
        </View>
    </View>
  </View>
  );
}

export default HomeHost;