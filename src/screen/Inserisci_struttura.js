import React from 'react';
import {Text, View, Image,ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import HeaderBar from '../components/CustomHeaderBar'




const styles = StyleSheet.create({
    maincontainer: {
        backgroundColor: '#fff',
      },
    scrollContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },

    topContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop:40

    },

    twoFieldContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
    },

    middleContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    threeButtonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
        alignItems: 'center',
        height:70,
    },

    bottomButtonContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
        alignItems: 'center',
        height:100,
        marginBottom:10
    },

    carouselStyle: {
        justifyContent:'center',
        marginRight:50,
    },

    singleField: {
        height: 40,
        width:300,
        borderColor: '#cc3881',
        borderWidth: 1.4,
        marginTop:8,
        borderRadius: 8,
    },

    descrizioneField: {
        height: 200,
        width:300,
        borderColor: '#cc3881',
        borderWidth: 1.4,
        marginTop:8,
        borderRadius: 8,
        paddingBottom:160
    },

    leftField: {
        height: 40,
        width:150,
        borderColor: '#cc3881',
        borderWidth: 1.4,
        marginTop:8,
        borderRadius: 8,
        justifyContent:'center',
        alignItems:'center',
        marginLeft: 38,
    },

    rightField: {
        height: 40,
        width:130,
        borderColor: '#cc3881',
        borderWidth: 1.4,
        marginTop:8,
        borderRadius: 8,
        justifyContent:'center',
        alignItems:'center',
        marginRight: 38,
    },

    bottoneLeft : {
        borderWidth: 1,
        width:140,
        height:40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:8,
        backgroundColor: '#f2077d',
        marginLeft:38,
      },

      bottoneRight : {
        borderWidth: 1,
        width:140,
        height:40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:8,
        backgroundColor: '#f2077d',
        marginRight:38,
      },

      bottone : {
        borderWidth: 1,
        width:300,
        height:40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:8,
        backgroundColor: '#f2077d',
        marginTop:10,
      },

  })

export default class InserisciStrutturaScreen extends React.Component {

 
    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          carouselItems: [
          {
              image:require('../../assets/Struttura/struttura1.jpg'),
          },
          {
              image:require('../../assets/Struttura/struttura2.jpg'),
          },
          {
              image:require('../../assets/Struttura/struttura3.jpg'),
          },
          {
              image:require('../../assets/Struttura/struttura4.jpg'),
          },
          {
              image:require('../../assets/Struttura/struttura5.jpg'),
          },
        ]
      }
    }

    _renderItem({item,index}){
        return (
          <View style={{ justifyContent:'center',
            marginLeft:50
              }}>
           <Image style={{width:250, height:250}} source = {item.image} />
            <Text>{item.title}</Text>
          </View>

        )
    }

    render() {
        return (
            <View style={styles.maincontainer}>
                <HeaderBar title="Inserisci struttura" navigator={this.props.navigation} />
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.topContainer}>
                        <TextInput 
                            style={styles.singleField}
                            placeholder='Denominazione struttura'
                        />
                        <TextInput 
                            style={styles.singleField}
                            placeholder='Indirizzo'
                        />
                    </View>
                    <View style={styles.twoFieldContainer}>
                        <TextInput 
                            style={styles.leftField}
                            placeholder='Città'
                        />
                        <TextInput 
                            style={styles.rightField}
                            placeholder='CAP'
                        />
                    </View>
                    <View style={styles.middleContainer}>
                        <TextInput 
                            style={styles.singleField}
                            placeholder='Nazione'
                        />
                        <TextInput 
                            style={styles.singleField}
                            placeholder='Tipologia'
                        />
                        <TextInput 
                            style={styles.singleField}
                            placeholder='Numero alloggi'
                        />
                        <TextInput 
                            style={styles.descrizioneField}
                            placeholder='Descrizione'
                            width ={300} 
                            height ={200} 
                            multiline={true}
                            numberOfLines={15}
                        />
                    </View>
                    <View style={styles.threeButtonContainer}>
                        <TouchableOpacity 
			                style = {styles.bottoneLeft}
		                >
                            <Text style={{color:'#ffffff'}}>Inserisci Foto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
			               style = {styles.bottoneRight} 
		                >
                            <Text style={{color:'#ffffff'}}>Inserisci Video</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomButtonContainer}> 
                        <TouchableOpacity 
			               style = {styles.bottone}
		                >
                            <Text style={{color:'#ffffff'}}>Inserisci Guida</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
			                style = {styles.bottone}
		                >
                            <Text style={{color:'#ffffff'}}>Aggiungi</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}