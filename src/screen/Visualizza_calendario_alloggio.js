import React, { useState } from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import HeaderBar from '../components/CustomHeaderBar'
import CalendarStrip from 'react-native-calendar-strip';

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

  const RowHeader = (props) => {
    return(
        <View style= {styles.rowViewHeader}>
            <View style={{width:'12%',height:50}}>
                
            </View>
            <View style={{backgroundColor: props.color, width:'90%', height:50,  alignItems: 'center'  ,borderLeftWidth:1,borderRightWidth:1}}>
                <Text>{props.nome1}</Text>
            </View>
            
        </View>
    );
}




const Row = (props) => {
    return(
        <View style= {styles.rowView}>
            <View style={{width:'12%',height:50,alignItems:'center',justifyContent:'center'}}>
                <Text>{props.ora}</Text>
            </View>
            <View style={{backgroundColor: props.color1, width:'90%', height:50, borderLeftWidth:1,borderRightWidth:1}}>
               
            </View>
        </View>
    );
}





const Visualizza_calendario_alloggio = ({route, navigation}) => {
    const {dataIniziale, dataFinale} = route.params;
    let datesWhitelist = [{
        start: dataIniziale,
        end: dataFinale
      }];

      const [count,setCount]= useState(0)
      const [colore1, setColore1] = useState('white')

    return(
        
        <View style={styles.maincontainer}>
            <HeaderBar title="Calendario" navigator={navigation} />
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <CalendarStrip
                        calendarAnimation={{type: 'sequence', duration: 30}}
                        daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'black'}}
                        style={{height:100,width:'101%', paddingTop: 20, paddingBottom: 10,borderWidth:1}}
                        calendarHeaderStyle={{color: '#f2077d'}}
                        calendarColor={'white'}
                        dateNumberStyle={{color: '#f2077d'}}
                        dateNameStyle={{color: '#f2077d'}}
                        highlightDateNumberStyle={{color: '#f2077d'}}
                        highlightDateNameStyle={{color: '#f2077d'}}
                        disabledDateNameStyle={{color: 'grey'}}
                        disabledDateNumberStyle={{color: 'grey'}}
                        iconLeft={require('../../assets/left-arrow.png')}
                        iconRight={require('../../assets/right-arrow.png')}
                        iconContainer={{flex: 0.1}}
                        datesWhitelist= {datesWhitelist}
                        startingDate= {dataIniziale}
                        onDateSelected={()=>{
                            if(count == 0){
                                setColore1("#ccccff")
                                setCount(1)
                            }
                            else if (count == 1){
                                setColore1("#ccccff")
                                setCount(2)
                            }
                            else if (count == 2){
                                setColore1("white")
                                setCount(0)
                            }
                        }}
                    />
               </View>
               <ScrollView contentContainerStyle={styles.bottomContainer}>
                <RowHeader color='#d9d9d9' nome1='Alloggio'></RowHeader>
                <Row ora={0} color1={colore1} ></Row>
                <Row ora={1} color1={colore1} ></Row>
                <Row ora={2} color1={colore1} ></Row>
                <Row ora={3} color1={colore1} ></Row>
                <Row ora={4} color1={colore1} ></Row>
                <Row ora={5} color1={colore1}></Row>
                <Row ora={6} color1={colore1} ></Row>
                <Row ora={7} color1={colore1} ></Row>
                <Row ora={8} color1={colore1} ></Row>
                <Row ora={9} color1={colore1} ></Row>
                <Row ora={10} color1={colore1}></Row>
                <Row ora={11} color1={colore1} ></Row>
                <Row ora={12} color1={colore1} ></Row>
                <Row ora={13} color1={colore1} ></Row>
                <Row ora={14} color1={colore1} ></Row>
                <Row ora={15} color1={colore1} ></Row>
                <Row ora={16} color1={colore1} ></Row>
                <Row ora={17} color1={colore1} ></Row>
                <Row ora={18} color1={colore1} ></Row>
                <Row ora={19} color1={colore1} ></Row>
                <Row ora={20} color1={colore1} ></Row>
                <Row ora={21} color1={colore1} ></Row>
                <Row ora={22} color1={colore1} ></Row>
                <Row ora={23} color1={colore1} ></Row>
               </ScrollView>
            </View>
        </View>
    );
}

export default Visualizza_calendario_alloggio