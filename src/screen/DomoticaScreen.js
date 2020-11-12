import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Switch } from 'react-native';
import HeaderBar from '../components/CustomHeaderBar'

const DomoticaScreen = ({navigation}) =>{
  const infoAlloggio = "Nome / Numero camera";
  const listDispositivi = ["Condizionatore", "TV", "Luce 1", "Luce 2"];
  //NOTA: trovare il modo di rendere gli switch indipendenti
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
      setIsEnabled(previousState => !previousState);
  };
  const [isEnabledsw1, setIsEnabledsw1] = useState(false);
  const toggleSwitchsw1 = () => {
    setIsEnabledsw1(previousState => !previousState);
  };
  const [isEnabledsw2, setIsEnabledsw2] = useState(false);
  const toggleSwitchsw2 = () => {
    setIsEnabledsw2(previousState => !previousState);
  };
  const [isEnabledsw3, setIsEnabledsw3] = useState(false);
  const toggleSwitchsw3 = () => {
    setIsEnabledsw3(previousState => !previousState);
  };

  return(
    <View style={styles.maincontainer}>
      <HeaderBar title="Informazioni camera" navigator={navigation} />
        <ScrollView style={styles.bodyScrollcontainer}>
            <View style={styles.infoAlloggiocontainer}>
                <Image style={styles.alloggioImage} source={require("../../assets/hotel_room_design.png")}/>
                <Text style={styles.nameAlloggio}>{infoAlloggio}</Text>
            </View>
            <View style={styles.fieldSet}>
                <Text style={styles.legend}>Servizi domotica</Text>
                <View style={styles.fieldSetContent}>
                    <View style={styles.horizontalView}>
                        <Text style={styles.normalText}>Condizionatore</Text>
                        <Switch style={styles.switchStyle}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                            />
                    </View>
                    <View style={styles.horizontalView}>
                        <Text style={styles.normalText}>TV</Text>
                        <Switch style={styles.switchStyle}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabledsw1 ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitchsw1}
                            value={isEnabledsw1}
                            />
                    </View>
                    <View style={styles.horizontalView}>
                        <Text style={styles.normalText}>Luce 1</Text>
                        <Switch style={styles.switchStyle}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabledsw2 ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitchsw2}
                            value={isEnabledsw2}
                            />
                    </View>
                    <View style={styles.horizontalView}>
                        <Text style={styles.normalText}>Luce 2</Text>
                        <Switch style={styles.switchStyle}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabledsw3 ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitchsw3}
                            value={isEnabledsw3}
                            />
                    </View>
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


/*  Codice Temp
    Per creare dinamicamente gli elementi di una View (si deve risolvere il problema dello switch multiplo)
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
*/
