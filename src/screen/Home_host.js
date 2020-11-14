import React, { useState } from 'react'
import {View, Text, StyleSheet, Alert, SafeAreaView} from 'react-native'
import CalendarPicker from 'react-native-calendar-picker';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderBar from '../components/CustomHeaderBar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomImageButton from "../components/CustomImageButton";
import CustomButton from "../components/CustomButton";

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
    marginTop:60,
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
      <HeaderBar title="Home" navigator={props.navigation} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topContainer} >
          <Icon name= "account-circle-outline" color={"black"} size={100}/>
          <Text style = {styles.testoLogo}>Raimondo Ranaldo</Text>
        </View>
        <View style={styles.centerContainer}>
          <CustomImageButton styleBtn={{width:300}} nameIcon={"home-outline"} nome= 'Le mie strutture' onPress={() => props.navigation.navigate("LeMieStrutture")} />
          <CustomImageButton styleBtn={{width:300}} nameIcon={"plus-circle-outline"} nome= 'Inserisci prenotazione' onPress={() => props.navigation.navigate("InserisciPrenotazione")} />
          <CustomImageButton styleBtn={{width:300}} nameIcon={"emoticon-happy-outline"} nome= 'Recensioni' onPress={createNextRealeaseFeatureAlert} />
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
          onDateChange={(date, type) => {
            if (type === 'END_DATE') {
                setSelectedEndDate(date);
                
            } else {
              setSelectedStartDate(date);
              setSelectedEndDate(null);
            }
          }}
      
        />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton nome="Visualizza date"
           styleBtn={{width:'80%', marginBottom:50}}
           onPress={() => props.navigation.navigate("VisualizzaDateAlloggi",{
             dataIniziale: selectedStartDate,
             dataFinale: selectedEndDate,
           })}></CustomButton>
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeHost;