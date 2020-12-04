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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'60%',
    height:'40%'
  },

  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'10%',
    height:'50%'
  },

})

const Calendario_alloggio = (props) => {
  const {id, strutturaId} = props.route.params;
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

  return(
    <View style={styles.maincontainer}>
      <HeaderBar title="Calendario" navigator={props.navigation} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topContainer}>
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
           onPress={() => props.navigation.navigate("Visualizza_calendario_alloggio",{
             dataIniziale: selectedStartDate,
             dataFinale: selectedEndDate,
             id: id,
             strutturaId: strutturaId,
           })}></CustomButton>
        </View>
      </ScrollView>
    </View>
  );
}

export default Calendario_alloggio;