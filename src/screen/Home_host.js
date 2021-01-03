import React, { useState, useEffect, useCallback } from 'react'
import {View, Text, StyleSheet, Alert} from 'react-native'
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderBar from '../components/CustomHeaderBar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomImageButton from "../components/CustomImageButton";
import CustomButton from "../components/CustomButton";
import * as GuestModel from "../firebase/datamodel/GuestModel"
import * as HostModel from "../firebase/datamodel/HostModel"

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },

  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  
  topContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop:80,
    height:'20%'
  },

  centerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height:'25%',
    marginTop:10,
  },

  bottomContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:40,
    height:'30%'
  },

  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height:'30%'
  },

  testoLogo : {
    fontSize: 20,
    color: 'black',
    marginTop: 10,
    fontFamily: "MontserrantSemiBold",
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
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topContainer} >
          <Icon name= "account-circle-outline" color={"black"} size={100}/>
          <Text style = {styles.testoLogo}>{user.nome} {user.cognome}</Text>
        </View>
        <View style={styles.centerContainer}>
          <CustomImageButton styleBtn={{width:300}} nameIcon={"home-outline"} 
            nome= 'Le mie strutture' 
            onPress={() =>{  navigation.navigate("LeMieStrutture", {user: user}); }} 
          />
          <CustomImageButton styleBtn={{width:300}} nameIcon={"plus-circle-outline"} 
            nome= 'Inserisci prenotazione' 
            onPress={() => navigation.navigate("InserisciPrenotazione", {user: user})} 
          />
          <CustomImageButton styleBtn={{width:300}} nameIcon={"emoticon-happy-outline"} 
            nome= 'Recensioni' onPress={createNextRealeaseFeatureAlert} 
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton nome="Visualizza date"
           styleBtn={{width:'80%', marginBottom:50}}
           onPress={() => navigation.navigate("VisualizzaDateAlloggi",{
             user: user,
             isHost: user.isHost,
           })}></CustomButton>
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeHost;