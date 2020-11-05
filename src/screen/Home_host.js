import React, { useState } from 'react'
import {View, Text, Image, TextInput, StyleSheet,TouchableOpacity } from 'react-native'
import CalendarPicker from 'react-native-calendar-picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  topContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  centerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  bottomContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  },

  immagineBottone : {
    width:30,
    height:30,
    marginLeft: 5,
  },

  testoBottone: {
    color:'#ffffff',
    marginLeft: 20,
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
    color: '#cc3881',
    marginTop: 10,
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
      onPress={() => {
           
      }}>
      <Image
        style = {styles.immagineBottone}
        source = {props.path}
      
      />
      <Text style = {styles.testoBottone}>{props.nome}</Text>
    
    </TouchableOpacity>
  );
}




const HomeHost = () => {
  return(
    <View style={styles.container}>
      <View style={styles.topContainer} >
        <Image
          style = {styles.immagineLogo}  
          source ={require('../../assets/user.png')}/>
        <Text style = {styles.testoLogo}>Gennaro Teodoro</Text>
      </View>
      <View style={styles.centerContainer}>
        <Bottone path={require('../../assets/home.png')} nome= 'Le mie strutture'/>
        <Bottone path={require('../../assets/add.png')} nome= 'Inserisci preotazione'/>
        <Bottone path={require('../../assets/smile.png')} nome= 'Recensioni'/>
      </View>
      <View style={styles.bottomContainer}>
      <CalendarPicker 
        allowRangeSelection = 'True'
        selectedDayColor = '#cc3881'
        width = {350}
        nextTitle = "Successivo"
        previousTitle = "Precedente"
        nextTitleStyle = {{color: '#cc3881'}}
        previousTitleStyle = {{color: '#cc3881'}}
      />
      </View>
    </View>
  );
}

export default HomeHost