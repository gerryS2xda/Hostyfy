import React, { useState } from 'react'
import {View, Text, StyleSheet, Alert } from 'react-native'
import CalendarPicker from 'react-native-calendar-picker';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderBar from '../components/CustomHeaderBar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomImageButton from "../components/CustomImageButton";

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  container: {
    flex:1,
    flexDirection: 'column',
  },
  
  topContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop:10,
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
    marginTop:30
  },

  testoLogo : {
    fontSize: 20,
    color: 'black',
    marginTop: 10,
    fontFamily: "MontserrantSemiBold",
  },

  calendario: {
    width:100,
    height:10,
  }

})

const HomeHost = (props) => {
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
    } else {
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
      <HeaderBar title="Home" navigator={props.navigation} />
    <ScrollView>
      <View contentContainerStyle={styles.container}>
        <View style={styles.topContainer} >
          <Icon name= "account-circle-outline" color={"black"} size={100}/>
          <Text style = {styles.testoLogo}>Raimondo Ranaldo</Text>
        </View>
        <View style={styles.centerContainer}>
          <CustomImageButton nameIcon={"home-outline"} nome= 'Le mie strutture' onPress={() => props.navigation.navigate("LeMieStrutture")} />
          <CustomImageButton nameIcon={"plus-circle-outline"} nome= 'Inserisci prenotazione' onPress={() => props.navigation.navigate("InserisciPrenotazione")} />
          <CustomImageButton nameIcon={"emoticon-happy-outline"} nome= 'Recensioni' onPress={createNextRealeaseFeatureAlert} />
        </View>
        <View style={styles.bottomContainer}>
        <CalendarPicker 
          allowRangeSelection = {true}
          minDate={minDate}
          selectedDayColor = '#cc3881'
          width = {350}
          nextTitle = "Successivo"
          previousTitle = "Precedente"
          nextTitleStyle = {{color: '#cc3881'}}
          previousTitleStyle = {{color: '#cc3881'}}
          onDateChange={onDateChange}
        />
        </View>
      </View>
      </ScrollView>
    </View>
  );
}

export default HomeHost;