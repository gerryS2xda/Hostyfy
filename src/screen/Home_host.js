import React, { useState } from 'react'
import {View, Text, Image, TextInput, StyleSheet,TouchableOpacity } from 'react-native'
import CalendarPicker from 'react-native-calendar-picker';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderBar from '../components/CustomHeaderBar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

  bottone : {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    width:300,
    height:40,
    borderRadius:8,
    backgroundColor: '#f2077d',
    fontFamily: "Montserrant"
  },

  immagineBottone : {
    width:30,
    height:30,
    marginLeft: 5,
  },

  testoBottone: {
    color:'#ffffff',
    marginLeft: 20,
    fontFamily: "Montserrant"
  },

  immagineLogo : {
    width:80,
    height:80,
    borderWidth:2,
    borderRadius: 200,
    borderColor: '#cc3881',
  },

  testoLogo : {
    fontSize: 20,
    color: '#000000',
    marginTop: 10,
    fontFamily: "MontserrantSemiBold",
  },

  calendario: {
    width:100,
    height:10,
  }

})


const Bottone = (props) => {
  return(
    <TouchableOpacity
      style = {styles.bottone}
      onPress={props.func}>
      <Icon name= {props.nameIcon} color={"#ffffff"} size={30} style={styles.immagineBottone}/>
      <Text style = {styles.testoBottone}>{props.nome}</Text>
    
    </TouchableOpacity>
  );
}




const HomeHost = (props) => {



    const colorIcon = "black";
    const sizeIcon = 100;

  return(
  
    <View style={styles.maincontainer}>
      <HeaderBar title="Home" navigator={props.navigation} />
    <ScrollView>
      <View contentContainerStyle={styles.container}>
        <View style={styles.topContainer} >
        <Icon name= "account-circle-outline" color={colorIcon} size={sizeIcon}/>

          
          <Text style = {styles.testoLogo}>Raimondo Ranaldo</Text>
        </View>
        <View style={styles.centerContainer}>
          <Bottone nameIcon={"home-outline"} nome= 'Le mie strutture' navPage = 'LeMieStruttre' func ={() => props.navigation.navigate("LeMieStrutture")}/>
          <Bottone nameIcon={"plus-circle-outline"} nome= 'Inserisci prenotazione' navPage = 'Inserisci' func ={() => props.navigation.navigate("InserisciPrenotazione")}/>
          <Bottone nameIcon={"emoticon-happy-outline"} nome= 'Recensioni' navPage = 'Inserisci'/>
        </View>
        <View style={styles.bottomContainer}>
        <CalendarPicker 
         allowRangeSelection = {true}
          selectedDayColor = '#cc3881'
          width = {350}
          nextTitle = "Successivo"
          previousTitle = "Precedente"
          nextTitleStyle = {{color: '#cc3881'}}
          previousTitleStyle = {{color: '#cc3881'}}
        />
        </View>
      </View>
      </ScrollView>
    </View>
  );
}

export default HomeHost