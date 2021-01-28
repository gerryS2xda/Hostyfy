import React, { useState, useCallback } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import HeaderBar from '../components/CustomHeaderBar';
import CustomListViewRecensione from "../components/CustomListViewRecensione"
import * as PrenotazioneModel from "../firebase/datamodel/PrenotazioneModel";
import * as StrutturaModel from "../firebase/datamodel/StrutturaModel";
import * as AlloggioModel from "../firebase/datamodel/AlloggioModel";
import * as RecensioneModel from "../firebase/datamodel/RecensioneModel";

//Styles
const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  secondContainer: {
    marginTop: "1%",
    width: "100%",
    flex: 1,
    marginRight: "1%"
  },
  resultContainer: {
    flex: 1,
    marginBottom: "5%",
  },

});

const RecensioniGuestScreen = ({ route, navigation }) => {

  //Dichiarazione variabili
  const { user } = route.params;
  const [recensioniList, setRecensioniList] = useState([]);
  const isFocused = useIsFocused();

  //Caricamento dei dati non appena inizia il rendering dell'applicazione
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      async function getRecensioniData() {
        var itemList = [];

        //Attendi finche' non ottieni tutte le prenotazioni effettuate dall'utente attualmente loggato
        var prenotazioniDocs = await PrenotazioneModel.getAllPrenotazioniByGuest(user.userId);
        var count = 1;
        for (const pren of prenotazioniDocs) {
          var prenotazione = pren.data();

          //Attendi finche' non ottieni i dati di un alloggio
          var alloggio = await AlloggioModel.getAlloggioByStrutturaRef(prenotazione.strutturaRef, prenotazione.alloggioRef);

          //Prendi la prima foto presente per l'alloggio
          var fotoArray = Object.values(alloggio.fotoList); //restituisce gli URL delle foto in un array JS                         
          var imageURL = "";
          if (fotoArray.length == 0) {
            imageURL = require("../../assets/imagenotfound.png");
          } else {
            imageURL = { uri: fotoArray[0] };
          }

          //Attendi finche' non ottieni le recensioni associate ad un alloggio e scritte dall'utente loggato
          var recensioni = await RecensioneModel.getRecensioniByGuestRef(prenotazione.strutturaRef, prenotazione.alloggioRef, user.userId);

          for (const rec of recensioni) {
            var recensione = rec.data();

            var oggetto = {
              key: count,
              title: alloggio.nomeAlloggio,
              description: "Soggiornato il " + recensione.dataSoggiorno + " con punteggio " + recensione.punteggio,
              image_url: imageURL, //immagine di un alloggio se presente
              newPage: 'RecensioneScreen',
              strutturaId: prenotazione.strutturaRef,
              alloggioId: prenotazione.alloggioRef, //contiene doc id dell'alloggio
              recensioneId: rec.id
            }
            count++;

            itemList.push(oggetto);
          }

        }

        if (itemList.length == 0) {
          Alert.alert(
            "Recensioni",
            "Nessun recensione da mostrare!!",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => navigation.goBack() }
            ],
            { cancelable: false }
          );
        } else {
          setRecensioniList(itemList);
        }

      }
      getRecensioniData();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [isFocused])
  );

  return (
    <View style={styles.maincontainer}>
      <HeaderBar title="Le mie recensioni" navigator={navigation} />
      <View style={styles.secondContainer}>
        <View style={styles.resultContainer}>
          <CustomListViewRecensione
            nav={navigation}
            userLogged={user}
            itemList={recensioniList}
          />
        </View>
      </View>
    </View>
  );
}

export default RecensioniGuestScreen;