import React, { useState, useCallback, useRef } from 'react'
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native'
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from "../components/CustomButton";
import { Dropdown } from 'sharingan-rn-modal-dropdown';
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
    marginTop: "5%",
    width: "90%",
    flex: 1,
  },
  resultContainer: {
    flex: 1,
    marginBottom: "5%",
  },
  resultNoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fieldSet: {
    height: "35%",
    //paddingHorizontal: 10,
    alignItems: 'center',
    borderColor: '#e4eded',
    borderRadius: 20,
    borderWidth: 2,
    paddingHorizontal: "5%",
    paddingTop: "4%"
  },
  legend: {

    fontFamily: "MontserrantSemiBold",
    fontSize: 20,
    padding: 4,
    color: '#303a52',
  },
  dropdownContainerStyle: {
    flexDirection: "row",
    width: "100%",
    paddingTop: 8,
    borderRadius: 20,


  },
  fieldSetContent: {
    alignSelf: "baseline",
    marginLeft: 8,
  },
  resultTxt: {
    fontFamily: "MontserrantSemiBold",
    marginLeft: 8,
    fontSize: 18,
    marginTop: "4%"
  },
  resultNoTxt: {
    fontFamily: "MontserrantSemiBold",
    marginLeft: 8,
    fontSize: 16,
  },

  dropdownStyle: {
    fontFamily: "MontserrantSemiBold",
    borderRadius: 20,
  },

});

const RecensioniHostScreen = ({ route, navigation }) => {

  //Dichiarazione variabili
  const { user } = route.params;
  const [strutturaId, setStrutturaId] = useState('');
  const [struttureList, setStruttureList] = useState([]);
  const [isAlloggioDropVisible, setAlloggioDropVisibility] = useState(false);
  const [showNoResult, setNoResultVisibility] = useState(false);
  const [showResult, setResultVisibility] = useState(false);
  const [alloggiList, setAlloggiList] = useState([]);
  const [alloggioId, setAlloggioId] = useState('');
  const [recensioniList, setRecensioniList] = useState([]);
  const isFocused = useIsFocused();

  //Caricamento dei dati non appena inizia il rendering dell'applicazione
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      async function getStrutturePrenotateData() {
        var itemList = [];

        //Attendi finche' non ottieni tutte le prenotazioni effettuate presso la struttura di un host
        var prenotazioniDocs = await PrenotazioneModel.getAllPrenotazioniByHost(user.userIdRef);
        for (const pren of prenotazioniDocs) {
          var prenotazione = pren.data();

          //Attendi finche' non ottiene i dati di una struttura prenotata
          var struttura = await StrutturaModel.getStrutturaDocumentById(prenotazione.strutturaRef);
          var oggetto = {
            value: prenotazione.strutturaRef,
            label: struttura.denominazione,
          }

          var duplicate = false; //flga usato per evitare presenza di duplicati
          for (var i = 0; i < itemList.length; i++) {
            if (oggetto.value === itemList[i].value) {
              duplicate = true;
            }
          }
          if (!duplicate) {
            itemList.push(oggetto);
          }
        }
        setStruttureList(itemList);
      }
      getStrutturePrenotateData();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [isFocused])
  );

  //Caricamento dei dati relativi ad un alloggio non appena viene scelta una struttura
  const onChangeStrutturaDropDown = (value) => {
    setStrutturaId(value);

    //Resetta state per indicare che sta per iniziare una nuova ricerca
    setRecensioniList([]);
    setAlloggioId(""); //resetta campo alloggio
    setNoResultVisibility(false);
    setResultVisibility(false);
    setAlloggioDropVisibility(false);

    async function getAlloggiPrenotatiData() {
      var itemList = [];

      var alloggiDocs = await AlloggioModel.getAllAlloggiOfStruttura(value);
      if (alloggiDocs.length == 0) {
        setAlloggiList(itemList);
      } else {
        for (const doc of alloggiDocs) {
          //Attendi finche' non ottieni le recensioni per un dato alloggio
          var recensioniDocs = await RecensioneModel.getRecensioniByAlloggioRef(value, doc.id);
          if (recensioniDocs.length > 0) { //Se vi sono recensioni allora l'alloggio e' stato prenotato in passato
            var alloggio = doc.data();
            var oggetto = {
              value: doc.id,
              label: alloggio.nomeAlloggio
            }
            itemList.push(oggetto);
          }
        }
        if (itemList.length == 0) {
          Alert.alert(
            "Recensioni",
            "Nessun alloggio risulta essere stato prenotato!! Nessun risultato da mostrare!!",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => setNoResultVisibility(true) }
            ],
            { cancelable: false }
          );
        } else {
          setAlloggiList(itemList);
          setAlloggioDropVisibility(true);
        }
      }
    }
    getAlloggiPrenotatiData();
  };

  const onChangeAlloggioDropDown = (value) => {
    setAlloggioId(value);
    async function getRecensioniData() {
      var itemList = [];

      //Attendi finche' non ottieni i dati di un alloggio
      var alloggio = await AlloggioModel.getAlloggioByStrutturaRef(strutturaId, value);

      //Prendi la prima foto presente per l'alloggio
      var fotoArray = Object.values(alloggio.fotoList); //restituisce gli URL delle foto in un array JS                         
      var imageURL = "";
      if (fotoArray.length == 0) {
        imageURL = require("../../assets/imagenotfound.png");
      } else {
        imageURL = { uri: fotoArray[0] };
      }

      //Attendi finche' non ottieni le recensioni per un dato alloggio
      var recensioniDocs = await RecensioneModel.getRecensioniByAlloggioRef(strutturaId, value);
      var count = 1;
      for (const doc of recensioniDocs) {
        var recensione = doc.data();

        var oggetto = {
          key: count,
          title: alloggio.nomeAlloggio,
          description: "Soggiornato il " + recensione.dataSoggiorno + " con punteggio " + recensione.punteggio,
          image_url: imageURL, //immagine di un alloggio se presente
          newPage: 'RecensioneScreen',
          strutturaId: strutturaId,
          alloggioId: value, //contiene doc id dell'alloggio
          recensioneId: doc.id
        }
        count++;

        itemList.push(oggetto);
      }
      setRecensioniList(itemList);
      setResultVisibility(true);
    }
    getRecensioniData();
  };

  return (
    <View style={styles.maincontainer}>
      <HeaderBar title="Recensioni" navigator={navigation} />
      <View style={styles.secondContainer}>
        <View style={styles.fieldSet}>
          <Text style={styles.legend}>Ricerca recensioni</Text>
          <View style={styles.fieldSetContent}>
            <View style={styles.dropdownContainerStyle}>
              <Dropdown
                affixTextStyle={{ fontFamily: "MontserrantSemiBold" }}
                titleTextStyle={{ fontFamily: "MontserrantSemiBold" }}
                itemTextStyle={{ fontFamily: "MontserrantSemiBold" }}
                textInputStyle={{ fontFamily: "MontserrantSemiBold" }}
                labelTextStyle={{ fontFamily: "MontserrantSemiBold" }}
                style={styles.dropdownStyle}
                label="Seleziona una struttura"
                data={struttureList}
                enableSearch
                borderRadius={20}
                value={strutturaId}
                onChange={onChangeStrutturaDropDown}
              />
            </View>

            {isAlloggioDropVisible && (
              <View style={styles.dropdownContainerStyle}>
                <Dropdown
                  affixTextStyle={{ fontFamily: "MontserrantSemiBold" }}
                  titleTextStyle={{ fontFamily: "MontserrantSemiBold" }}
                  itemTextStyle={{ fontFamily: "MontserrantSemiBold" }}
                  textInputStyle={{ fontFamily: "MontserrantSemiBold" }}
                  labelTextStyle={{ fontFamily: "MontserrantSemiBold" }}
                  style={styles.dropdownStyle}
                  label="Seleziona un alloggio"
                  data={alloggiList}
                  enableSearch
                  value={alloggioId}
                  borderRadius={20}
                  onChange={onChangeAlloggioDropDown}

                />
              </View>
            )}
          </View>
        </View>
        {showNoResult && (
          <View style={styles.resultNoContainer}>
            <Text style={styles.resultNoTxt}> Nessun risultato da mostrare </Text>
          </View>
        )}
        {!showNoResult && showResult && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTxt}> Risultati </Text>
            <CustomListViewRecensione
              nav={navigation}
              userLogged={user}
              itemList={recensioniList}
            />
          </View>
        )}
      </View>
    </View>
  );
}

export default RecensioniHostScreen;