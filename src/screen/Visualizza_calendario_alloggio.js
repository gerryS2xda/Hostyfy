import React, { useState } from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import EventCalendar from 'react-native-events-calendar';
import { Dimensions } from 'react-native';
import HeaderBar from '../components/CustomHeaderBar'
import * as PrenotazioneModel from "../firebase/datamodel/PrenotazioneModel"
import * as AlloggioModel from "../firebase/datamodel/AlloggioModel"
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const styles = StyleSheet.create({
    maincontainer: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
    },
  
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch'
    },
    
    topContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
  
    bottomContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height:'230%',
    },
  
    rowView: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        width:'100%',
        borderBottomWidth:1
    },

    rowViewHeader: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        width:'100%',
        borderBottomWidth:1,
        textAlign:'center'
    }
    
  })


const Visualizza_calendario_alloggio = ({route, navigation}) => {
    const {user,isHost, alloggioId } = route.params;
    const windowWidth = Dimensions.get('window').width;
    const [events, setEvents] = useState([]);
    const isFocused = useIsFocused();

    useFocusEffect(
        React.useCallback(() => {
          async function getData(){
            if(isHost){
              dataIniziale= new Date();  
              let docs = await PrenotazioneModel.getPrenotazioniAttualiHostQueryAlloggio(user.userIdRef, dataIniziale, alloggioId);
              var events = [];
              if(docs.length==0){
                setEvents(events);
              }
              else{
              for(const doc of docs){
                var prenotazione = doc.data();
                var dataInizio = new Date(prenotazione.dataInizio.seconds * 1000);
                var dataFine = new Date(prenotazione.dataFine.seconds * 1000);
                let alloggio = await AlloggioModel.getAlloggioByStrutturaRef(prenotazione.strutturaRef, prenotazione.alloggioRef);
                var day = new Date(dataInizio);
                //day = new Date(day.getFullYear(), day.getMonth(), day.getDate()) 
                //console.log(day);
                while(day <= dataFine){
                    var temp = new Date(day);
                    var nextDay = new Date(temp);
                    nextDay.setDate(temp.getDate() + 1);
                    
                    if(day.getTime() === dataInizio.getTime()){
                        var start = dataInizio;
                        var end = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 24,0,0)
                        var event = {
                        start: start ,
                        end: end ,
                        title: alloggio.nomeAlloggio,
                        }
                        events.push(event);
                    }else if(nextDay>dataFine){
                        var start = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0,0,0);
                        var end = dataFine;
                        var event = {
                        start: start ,
                        end: end ,
                        title: alloggio.nomeAlloggio,
                        }
                        events.push(event);
                    } else {
                        var start = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0,0,0);
                        var end = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 24,0,0)
                        var event = {
                        start: start ,
                        end: end ,
                        title: alloggio.nomeAlloggio,
                        }
                        events.push(event);
                    }
                    day = nextDay;
                }            
                }
                console.log(events)
                setEvents(events);
              }                        
            } 
        }
          getData();
          return () => {
            // Do something when the screen is unfocused
            // Useful for cleanup functions
          };
        }, [isFocused])
      );

    return(
        
        <View style={styles.maincontainer}>
            <HeaderBar title="Calendario" navigator={navigation} />
            <EventCalendar
                format24h={true}
                eventTapped={() =>{}}
                // Function on event press
                events={events}
                width={windowWidth}
                // Passing the Array of event
                // Container width
                size={60}
                // number of date will render before and after initDate
                // (default is 30 will render 30 day before initDate
                // and 29 day after initDate)
                // Show initial date (default is today)
                //scrollToFirst
                // Scroll to first event of the day (default true)
        />
        </View>
    );
}

export default Visualizza_calendario_alloggio