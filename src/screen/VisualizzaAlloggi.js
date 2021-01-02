import React, { useState, useCallback  } from 'react';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import CustomListViewGeneralAlloggio from '../components/CustomListViewGeneralAlloggio'
import {
  StyleSheet,
  View
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderBar from '../components/CustomHeaderBar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as StrutturaModel from "../firebase/datamodel/StrutturaModel";



const styles = StyleSheet.create({

  maincontainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    borderWidth: 1,
    borderColor: '#d3d9e3',
  },
  
  aggiungiStruttura:{
    flexDirection: "column-reverse",
    alignItems: 'flex-end',
    marginBottom: "5%",
    marginRight: "3%",
  },

  
});

const VisualizzaAlloggi = (props) => {  
      const {user, strutturaId} = props.route.params;
      const [alloggiList, setAlloggiList] = useState([]);
      const isFocused = useIsFocused();

      useFocusEffect(
        useCallback(() => {
          // Do something when the screen is focused
          async function getAlloggiData(){
            var itemList = [];
            var count = 1;
            var alloggiDocs = await StrutturaModel.getAlloggiOfStruttura(strutturaId);
            if(alloggiDocs.length == 0){
              setAlloggiList(itemList);
            }else{
              for(const doc of alloggiDocs){
                var alloggio = doc.data(); //prendi dati di un alloggio
                var fotoArray = Object.values(alloggio.fotoList); //restituisce gli URL delle foto in un array JS

                //Costruzione item per la lista di alloggi per 'CustomListViewGeneralAlloggio'
                var imageURL = "";
                if(fotoArray.length == 0){
                    imageURL = require("../../assets/imagenotfound.png");
                }else{
                    imageURL = {uri: fotoArray[0]};
                }
                var oggetto = {
                  key: count, 
                  title: alloggio.nomeAlloggio, 
                  description: alloggio.descrizione,
                  image_url: imageURL, 
                  newPage: 'Alloggio',
                  strutturaId: strutturaId,  
                  id: doc.id
                }
                count++;
                itemList.push(oggetto);
              }
              setAlloggiList(itemList);
            }
          }
          getAlloggiData();

          return () => {
            // Do something when the screen is unfocused
            // Useful for cleanup functions
          };
        }, [isFocused])
      );


      return (
        <View style={styles.maincontainer}>
          <HeaderBar title="Alloggi" navigator={props.navigation} /> 
          <View style={styles.container}>
              <CustomListViewGeneralAlloggio
                nav = {props.navigation}
                userLogged = {user}
                itemList= {alloggiList}
              />

              <View style = {styles.aggiungiStruttura}>
                <TouchableOpacity
                  onPress={() =>{
                      props.navigation.navigate('InserisciAlloggio', {user: user, strutturaId: strutturaId, photoList: [], state: {}});
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

export default VisualizzaAlloggi