import React, { useState, useCallback  } from 'react';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import CustomListViewMieChiavi from '../components/CustomListViewMieChiavi'
import {StyleSheet, View} from 'react-native';
import HeaderBar from '../components/CustomHeaderBar'
import * as StrutturaModel from "../firebase/datamodel/StrutturaModel"
import * as AlloggioModel from "../firebase/datamodel/AlloggioModel"
import * as PrenotazioneModel from "../firebase/datamodel/PrenotazioneModel"

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

const LeMieChiavi = (props) => {  
      const {user,isHost} = props.route.params;
      const [chiaviList, setChiaviList] = useState([]);
      const isFocused = useIsFocused();

      useFocusEffect(
        useCallback(() => {
          // Do something when the screen is focused
          async function getMieChiaviData(){
            console.log(isHost)
            if(isHost){
              let strutture = await StrutturaModel.getStruttureOfAHostQuery(user.userIdRef);
              if(strutture.length == 0){
                setChiaviList([]);
              } else {
                var count = 1;
                var itemList = [];
                for (const docStruttura of strutture){
                  var struttura = docStruttura.data();
                  var strutturaID = docStruttura.id;
                  let alloggi = await AlloggioModel.getAllAlloggiOfStruttura(strutturaID);
                  for (const docAlloggio of alloggi){
                    var alloggio = docAlloggio.data();
                    var alloggioID = docAlloggio.id;
                    var fotoArray = Object.values(alloggio.fotoList); //restituisce gli URL delle foto in un array JS
                    //Costruzione item per la lista di chiavi per 'CustomListViewGeneralMieChiavi'
                    var imageURL = "";
                    if(fotoArray.length == 0){
                        imageURL = require("../../assets/imagenotfound.png");
                    }else{
                        imageURL = {uri: fotoArray[0]};
                    }
                    var oggetto = {
                      key: count, 
                      title: "Chiave " + alloggio.nomeAlloggio,
                      description: "Struttura: \'"+ struttura.denominazione + "\'",
                      image_url: imageURL,  //immagine dell'alloggio
                      newPage: 'LaMiaChiave',
                      strutturaId: strutturaID,  
                      alloggioId: alloggioID,
                    }
                    count++;
                    itemList.push(oggetto);
                  }
                }
              }
            setChiaviList(itemList);
          } else {
              var dataOdierna = new Date(); 
              let docs = await PrenotazioneModel.getPrenotazioniAttualiGuestQuery(user.userId, dataOdierna); //NOTA: per guest usare 'user.userId'
              var itemList = [];
              var count = 1;
              if(docs.length==0){
                setList(itemList);
              }
              else{
              for(const doc of docs){
                var prenotazione = doc.data();
                if(prenotazione.doneCheckIn){
                let struttura = await StrutturaModel.getStrutturaDocumentById(prenotazione.strutturaRef);
                let alloggio = await AlloggioModel.getAlloggioByStrutturaRef(prenotazione.strutturaRef, prenotazione.alloggioRef);
                var fotoArray = Object.values(alloggio.fotoList); //restituisce gli URL delle foto in un array JS
                //Costruzione item per la lista di chiavi per 'CustomListViewGeneralMieChiavi'
                var imageURL = "";
                if(fotoArray.length == 0){
                  imageURL = require("../../assets/imagenotfound.png");
                }else{
                  imageURL = {uri: fotoArray[0]};
                }
                var oggetto = {
                  key: count, 
                  title: "Chiave " + alloggio.nomeAlloggio,
                  description: "Struttura: \'"+ struttura.denominazione + "\'",
                  image_url: imageURL,  //immagine dell'alloggio
                  newPage: 'LaMiaChiave',
                  strutturaId: prenotazione.strutturaRef,  
                  alloggioId: prenotazione.alloggioRef,
                }
                itemList.push(oggetto)              
                count++;
                    
                }
              }
              setChiaviList(itemList);
            }
          }
        }
          getMieChiaviData();

          return () => {
            // Do something when the screen is unfocused
            // Useful for cleanup functions
          };
        }, [isFocused])
      );

      return (
      <View style={styles.maincontainer}>
        <HeaderBar title="Le tue chiavi attive" navigator={props.navigation} /> 
            <View style={styles.container}>
              <CustomListViewMieChiavi
                nav = {props.navigation}
                userLogged = {user}
                itemList= {chiaviList}
              />
            </View>
      </View>      
    );
}

export default LeMieChiavi