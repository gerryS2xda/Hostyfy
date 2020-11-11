import React, { useState } from 'react'
import {View, Text, Image, TextInput, StyleSheet,TouchableOpacity } from 'react-native'
import HeaderBar from '../components/CustomHeaderBar'

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: '#fff',
  },
  container: {  
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  topContainer: {
    height:100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:15
  },

  upperMiddleContainer: {
    
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 0.7,
    borderRadius: 10,
    width: 340,
    height: 200,
    marginTop:20
  },

  lowerMiddleContainer: {
    
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 0.7,
    borderRadius: 10,
    width: 340,
    height: 120,
    marginTop:20,
  },

  bottomContainer: {
    height:300,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  singleTextInput: {
    height: 40,
    width:300,
    borderColor: '#cc3881',
    borderWidth: 1.4,
    borderRadius: 8,
  },

  bottone : {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width:300,
    height:40,
    borderRadius:8,
    backgroundColor: '#f2077d',
    marginTop:40,
  },

  immagineLogo : {
    width:80,
    height:80,
    borderWidth:2,
    borderRadius: 200,
    borderColor: '#cc3881',
  },
})


const Modifica_profilo = (props) => {
  return(
    <View style={styles.maincontainer}>
      <HeaderBar title="Profilo" navigator={props.navigation} />
      <View style = {styles.container}>
        <View style = {styles.topContainer}>
          <Image
            style = {styles.immagineLogo}  
            source ={require('../../assets/user.png')}/>
        </View>
        <View style = {styles.upperMiddleContainer}>
            <View>

            </View>
          <TextInput
              style = {styles.singleTextInput}
              placeholder='Nome'
          />
          <TextInput
              style = {styles.singleTextInput}
              placeholder='Cognome'
          />
          <TextInput
              style = {styles.singleTextInput}
              placeholder='Email'
          />
          <View>
                
          </View>
        </View>
        <View style = {styles.lowerMiddleContainer}>
          <View>
                
          </View>
          <TextInput
              style = {styles.singleTextInput}
              placeholder='Vecchia password'
          />
          <TextInput
              style = {styles.singleTextInput}
              placeholder='Nuova password'
          />
          <View>
                
          </View>
        </View>
        <View style = {styles.bottomContainer}>
          <TouchableOpacity 
        style = {styles.bottone}
      >
              <Text style={{color:'#ffffff'}}>Salva modifiche</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Modifica_profilo