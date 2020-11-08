import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Switch } from 'react-native';
import HeaderBar from '../components/CustomHeaderBar'

const DomoticaScreen = () =>{
  const infoAlloggio = "Nome / Numero camera";
  const listDispositivi = ["Condizionatore", "Lavatrice", "Luce 1", "Luce 2"];
  //NOTA: trovare il modo di rendere gli switch indipendenti
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
      setIsEnabled(previousState => !previousState);
  };

  return(
    <View style={styles.maincontainer}>
      <HeaderBar title="Informazioni camera" />
        <ScrollView style={styles.bodyScrollcontainer}>
            <View style={styles.infoAlloggiocontainer}>
                <Image style={styles.alloggioImage} source={require("../../assets/hotel_room_design.png")}/>
                <Text style={styles.nameAlloggio}>{infoAlloggio}</Text>
            </View>
            <View style={styles.fieldSet}>
                <Text style={styles.legend}>Servizi domotica</Text>
                <View style={styles.fieldSetContent}>
                    {
                        listDispositivi.map((item, key)=>(
                            <View key={key} style={styles.horizontalView}>
                                <Text style={styles.normalText}>{item}</Text>
                                <Switch style={styles.switchStyle}
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />
                            </View>
                        )
                    )}
                </View>
            </View>
        </ScrollView>
      </View>
    );
}

export default DomoticaScreen;

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bodyScrollcontainer: {
        backgroundColor: '#fff',
        paddingLeft: 32,
        paddingRight: 32,
        marginTop: 16,
    },
  infoAlloggiocontainer:{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:16,
      marginBottom: 16,
  },
  alloggioImage:{
      width: 256,   //setta 100% per riempire tutto lo spazio in larghezza
      height: 128,  //necessario che sia fissata
  },
  nameAlloggio: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginTop: 4
  },
  centerText: {
      textAlign: "center",
      fontSize: 16,
      color: '#f2077d'
  },
  normalText: {
      fontSize: 16,
      color: "black"
  },
  horizontalView:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16,
      marginBottom: 4,
  },
  fieldSet:{
      margin: 10,
      paddingHorizontal: 10,
      paddingBottom: 10,
      borderRadius: 5,
      borderWidth: 1,
      alignItems: 'center',
      borderColor: '#000'
  },
  legend:{
        position: 'absolute',
        top: -16,
        left: 10,
        fontWeight: 'bold',
        backgroundColor: '#FFFFFF',
        fontSize: 16,
        padding: 4,
        color: '#f2077d'
    },
    fieldSetContent: {
        alignSelf: "baseline",
        marginLeft: 16,
    },
    switchStyle: {
        marginLeft: 80
    },
});