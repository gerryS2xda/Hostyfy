import React, { useState, useEffect } from 'react';
import CustomListViewGeneral from '../components/CustomListViewGeneral'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Platform,
  ScrollView, 
  TouchableOpacity
} from 'react-native';
import HeaderBar from '../components/CustomHeaderBar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as StrutturaModel from "../firebase/datamodel/StrutturaModel"

const styles = StyleSheet.create({
 
  maincontainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
  },

  aggiungiStruttura:{
    flexDirection: "column-reverse",
    alignItems: 'flex-end',
    marginBottom: "5%",
    marginRight: "3%",
  },
});

const LeMieStrutture = (props) => {  
      const {user} = props.route.params;
      const [struttureList, setStruttureList] = useState([]);

      useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
          // Screen was focused -> Do something
          async function getMieStruttureData(){
            var itemList = [];
            var count = 1;
            var struttureDocs = await StrutturaModel.getStruttureOfAHostQuery(user.userIdRef);
            if(struttureDocs.length == 0){
              setStruttureList(itemList);
            }else{
              for(const doc of struttureDocs){
                var struttura = doc.data();
                var fotoArray = Object.values(doc.data().fotoList); //restituisce gli URL delle foto in un array JS 
                                        
                var imageURL = "";
                if(fotoArray.length == 0){
                    imageURL = require("../../assets/imagenotfound.png");
                }else{
                      imageURL = {uri: fotoArray[0]};
                }
                var oggetto = {
                    key: count, 
                    title: struttura.denominazione, 
                    description: struttura.descrizione,
                    image_url: imageURL, 
                    newPage: 'VisualizzaStruttura',
                    OTP: 'true',
                    id: doc.id
                  }
                  count++;
                  itemList.push(oggetto);
              }
              console.log("MieStrutture: " + itemList.toString());
              setStruttureList(itemList);
            }
          }
          getMieStruttureData();
        });
        return unsubscribe;
      }, [props.navigation]);

      return (
      <View style={styles.maincontainer}>
        <HeaderBar title="Le tue Strutture" navigator={props.navigation} /> 
            <View style={styles.container}>
              <CustomListViewGeneral 
                nav= {props.navigation}
                userLogged = {user}
                itemList = {struttureList}
              />
              <View style = {styles.aggiungiStruttura}>
                <TouchableOpacity 
                  onPress={() => {
                    var struttura = {denominazione: "", citta: "", cap: "", provincia: "", regione: "", nazione: "", tipologia: "", numeroAlloggi: 0, descrizione: ""};
                    props.navigation.navigate('Inserisci struttura', {user:user, photoList: [], strutturaState: struttura});
                  }}>
                    <Icon
                      name = "plus-circle-outline"
                      color = {"#f2077d"}
                      size = {65}
                    />
                    </TouchableOpacity>
                </View>
            </View>
          </View>   
      
    );
}

export default LeMieStrutture;