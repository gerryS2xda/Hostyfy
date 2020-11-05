import React, { useState } from 'react'
import {View, Text, Image, TextInput, Button, StyleSheet,TouchableOpacity, ScrollView} from 'react-native'

const styles = StyleSheet.create({
   

  first:{
    justifyContent: 'center',
    alignItems: 'center',
  },

  top:{
    justifyContent: 'center',
    alignItems: 'center',
  },

  image : {
    width:200,
    height:100, 
    marginTop:60,
    marginBottom: 30,

  },

  InformazioniPersonali: {
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 20,
    borderColor: '#d3d9e3',
    
  },

  container_2: {
    justifyContent: "flex-end",
    alignItems: 'center',
  },

  input: {
    height: 50,
    width:320,
    borderColor: '#cc3881',
    borderWidth: 1.4,
    marginTop:8,
    borderRadius: 8,
  },

  bottoneAvanti : {
    borderWidth: 1,
    width:320,
    height:40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:8,
    backgroundColor: '#f2077d',
    marginTop: 40
  },
  
  horizontal:{
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  inputHorizontal1:{
      justifyContent: 'center',
      height: 50,
      width:130,
      borderColor: '#cc3881',
      borderWidth: 1.4,
      marginTop:8,
      borderRadius: 8,
  },

  


 

  
})


const RegistrazioneDatiResidenza = (props) => {
  
const [cellulare, setCellulare] = useState('');
const [telefono, setTelefono] = useState('');
const [indirizzo, setIndirizzo] = useState('');
const [CAP, setCap] = useState('');
const [citta, setCitta] = useState('');
const [provincia, setProvincia] = useState('');
const [nazione, setNazione] = useState('');
const [errore, setErrore] = useState('');



  return(

    <ScrollView>
      <View style={styles.first}>
          <View style={styles.top}>
                  <Image
                    source = {require('../../assets/HOSTYFY.png')}
                    style = {styles.image} 
                  />
          </View>
          <View style={styles.InformazioniPersonali}>
              <TextInput
                style = {styles.input}
                placeholder = ' Cellulare'
                onChangeText = {(cellulare) => setCellulare(cellulare)}/>
                
                <TextInput
                style = {styles.input}
                placeholder = ' Telefono'
                onChangeText = {(telefono) => setTelefono(telefono)} />
                
                <TextInput
                style = {styles.input}
                placeholder = ' Indirizzo'
                onChangeText = {(indirizzo) => setIndirizzo(indirizzo)} />
                  
                <TextInput
                  style = {styles.input}
                  placeholder = ' Città'
                  onChangeText = {(citta) => setCitta(citta)}/>
          

                <View style = {styles.horizontal}>      
                  
                    <TextInput style = {styles.inputHorizontal1}
                    placeholder = ' CAP'
                    onChangeText = {(cap) => setCap(cap)}/>
                  
                    <View style = {{marginLeft: 50}}>
                      <TextInput style = {styles.inputHorizontal1}
                      placeholder = ' Provincia'
                      onChangeText = {(provincia) => setProvincia(provincia)}/>
                    </View>
                </View>

                <View style={styles.container_1}>
                    <TextInput style = {styles.input}
                    placeholder = ' Nazione'
                    onChangeText = {(nazione) => setNazione(nazione)}/>
                </View>

              <View style={styles.buttonCustomizzato}>
                <TouchableOpacity
                    style = {styles.bottoneAvanti}
                    onPress={() => {
                      if(password.length < 5) setErrore('password troppo corta');
                      else setErrore('');
                      if(password != confermaPassword)
                      setErrore('password non corrispondenti');
                    }}
                    >
                    <Text style={{color:'#ffffff'}}>Avanti</Text>
                </TouchableOpacity> 
          
          
          
        </View>
      


     
    </View>
  </View>
  </ScrollView>
   
  );
}

export default RegistrazioneDatiResidenza;