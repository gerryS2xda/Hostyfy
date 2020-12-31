import React, { useState, useCallback  } from 'react';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import CustomListViewMieChiavi from '../components/CustomListViewMieChiavi'
import {StyleSheet, View} from 'react-native';
import HeaderBar from '../components/CustomHeaderBar'
import * as StrutturaModel from "../firebase/datamodel/StrutturaModel"
import * as AlloggioModel from "../firebase/datamodel/AlloggioModel"

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
      const {user} = props.route.params;
      const [chiaviList, setChiaviList] = useState([]);
      const isFocused = useIsFocused();

      useFocusEffect(
        useCallback(() => {
          // Do something when the screen is focused
          async function getMieChiaviData(){
            var hostId = user.userIdRef;
            var itemList = []; //init lista per chiavi 
            var count = 1;
            
            //Attendi finche' non si ottengono tutte le strutture associate ad un determinato host
            var struttureDocs = await StrutturaModel.getStruttureOfAHostQuery(hostId);

            for(const strutturaDoc of struttureDocs){ //Per ciascuna struttura 
              var strutturaId = strutturaDoc.id; //Prendi l'id di una struttura 
              var struttura = strutturaDoc.data(); //Prendi i dati di una struttura dal relativo documento

              //Attendi finche' non si ottengono tutti gli alloggi di quella determinata struttura
              var alloggiDocs = await StrutturaModel.getAlloggiOfStruttura(strutturaId);

              for(const alloggioDoc of alloggiDocs){ //Per ciascun alloggio presente in quella struttura
                var alloggioId = alloggioDoc.id; //Prendi l'id di un alloggio
                var alloggio = alloggioDoc.data();  //Prendi i dati di un alloggio dal relativo documento

                //Attendi finche' non si ottengono tutte le chiavi attive associate a quell'alloggio
                var chiaviDocs = await AlloggioModel.getChiaviCollectionOfAlloggio(strutturaId, alloggioId);
                
                for(const chiaveDoc of chiaviDocs){ //Per ciascuna chiave associata ad un alloggio
                  var chiave = chiaveDoc.data(); //Dammi i dati di una chiave
                  if(chiave.isActive){
                    //Costruisci oggetto da inserire nella lista relativa alla chiavi da mostrare (itemList)
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
                      strutturaId: strutturaId,  
                      alloggioId: alloggioId,
                      chiaveId: chiaveDoc.id,
                    }
                    count++;
                    itemList.push(oggetto);
                  }
                }
              }
            }
            setChiaviList(itemList);
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