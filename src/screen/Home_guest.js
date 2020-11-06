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
    justifyContent: 'space-around',
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

  bottoneEsci : {
    borderWidth: 1,
    width:300,
    height:40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:8,
    backgroundColor: '#f2077d',
    marginTop:30
  },

})


const Bottone = (props) => {
  return(
    <TouchableOpacity
      style = {styles.bottone}
      onPress={props.func}>
      <Image
        style = {styles.immagineBottone}
        source = {props.path}
      
      />
      <Text style = {styles.testoBottone}>{props.nome}</Text>
    
    </TouchableOpacity>
  );
}




const HomeGuest = (props) => {
  return(
    <View style={styles.container}>
      <View style={styles.topContainer} >
        <Image
          style = {styles.immagineLogo}  
          source ={require('../../assets/user.png')}/>
        <Text style = {styles.testoLogo}>Gennaro Teodoro</Text>
      </View>
      <View style={styles.centerContainer}>
        <Bottone path={require('../../assets/edit.png')} nome= 'Modifica il tuo profilo'/>
        <Bottone path={require('../../assets/briefcase.png')} nome= 'Prenotazioni'/>
        <Bottone path={require('../../assets/smile.png')} nome= 'Recensioni'/>
      </View>
      <View style={styles.bottomContainer}>
      <TouchableOpacity 
			style = {styles.bottoneEsci}
		>
            <Text style={{color:'#ffffff'}}>Esci</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeGuest