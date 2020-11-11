import React from 'react';
import {Text, View, Image,ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import HeaderBar from '../components/CustomHeaderBar'



const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: '#fff',
      },
    scrollContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },

    carouselContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:50,
        marginTop:20,
    },

    topContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
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
		justifyContent: 'flex-start',
        alignItems: 'center',
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
        paddingTop:9,
    },

    descrizioneField: {
        height: 200,
        width:300,
        borderColor: '#cc3881',
        borderWidth: 1.4,
        marginTop:8,
        borderRadius: 8,
        paddingTop:9,
    },

    leftField: {
        ...Platform.select({
            ios: {
                height: 40,
                width:150,
                borderColor: '#cc3881',
                borderWidth: 1.4,
                marginTop:8,
                borderRadius: 8,
                justifyContent:'center',
                alignItems:'center',
                marginLeft: 38,
                paddingTop:9,
           },
           android: {
                height: 40,
                width:150,
                borderColor: '#cc3881',
                borderWidth: 1.4,
                marginTop:8,
                borderRadius: 8,
                justifyContent:'center',
                alignItems:'center',
                marginLeft: 46,
                paddingTop:9,
           }
       })
        
    },

    rightField: {
        ...Platform.select({
            ios: {
                height: 40,
                width:130,
                borderColor: '#cc3881',
                borderWidth: 1.4,
                marginTop:8,
                borderRadius: 8,
                justifyContent:'center',
                alignItems:'center',
                marginRight: 38,
                paddingTop:9,
           },
           android: {
                height: 40,
                width:130,
                borderColor: '#cc3881',
                borderWidth: 1.4,
                marginTop:8,
                borderRadius: 8,
                justifyContent:'center',
                alignItems:'center',
                marginRight: 46,
                paddingTop:9,
           }
       })
    },

    bottoneLeft : {
        
        ...Platform.select({
            ios: {
               borderWidth: 1,
               width:140,
               height:40,
               alignItems: 'center',
               justifyContent: 'center',
               borderRadius:8,
               backgroundColor: '#f2077d',
               marginLeft:38,
           },
           android: {
               borderWidth: 1,
               width:140,
               height:40,
               alignItems: 'center',
               justifyContent: 'center',
               borderRadius:8,
               backgroundColor: '#f2077d',
               marginLeft:46,
           }
       })
           
         },
   
         bottoneRight : {
           ...Platform.select({
               ios: {
                   borderWidth: 1,
                   width:140,
                   height:40,
                   alignItems: 'center',
                   justifyContent: 'center',
                   borderRadius:8,
                   backgroundColor: '#f2077d',
                   marginRight:38,
              },
              android: {
               borderWidth: 1,
               width:140,
               height:40,
               alignItems: 'center',
               justifyContent: 'center',
               borderRadius:8,
               backgroundColor: '#f2077d',
               marginRight:46,
              }
          })
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




export default class StrutturaScreen extends React.Component {

 
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
           <Image style={{width:250, height:250, borderRadius:10}} source = {item.image} />
            <Text>{item.title}</Text>
          </View>

        )
    }

    render() {
        return (
            <View style={styles.maincontainer}>
                <HeaderBar title="Struttura" navigator={this.props.navigation} />
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.carouselContainer} >
                        <Carousel
                        style= {styles.carouselStyle}
                        layout={"default"}
                        ref={ref => this.carousel = ref}
                        data={this.state.carouselItems}
                        sliderWidth={300}
                        itemWidth={300}
                        renderItem={this._renderItem}
                        onSnapToItem = { index => this.setState({activeIndex:index}) } />
                    </View>
                    <View style={styles.topContainer}>
                        <Text style={styles.singleField}>Le sirene</Text>
                        <Text style={styles.singleField}>Indirizzo</Text>
                    </View>
                    <View style={styles.twoFieldContainer}>
                        <Text style={styles.leftField}>Città</Text>
                        <Text style={styles.rightField}>Cap</Text>
                    </View>
                    <View style={styles.middleContainer}>
                        <Text style={styles.singleField}>Nazione</Text>
                        <Text style={styles.singleField}>Tipologia</Text>
                        <Text style={styles.singleField}>Numero Alloggi</Text>
                        <Text style={styles.descrizioneField}>Descrizione</Text>
                    </View>
                    <View style={styles.threeButtonContainer}>
                        <TouchableOpacity 
			                style = {styles.bottoneLeft}
		                >
                            <Text style={{color:'#ffffff'}}>Modifica Foto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
			               style = {styles.bottoneRight} 
		                >
                            <Text style={{color:'#ffffff'}}>Modifica Video</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomButtonContainer}> 
                        <TouchableOpacity 
                            onPress = {() => this.props.navigation.navigate("VisualizzaAlloggi")}
			                style = {styles.bottone}
		                >
                            <Text style={{color:'#ffffff'}}>Guida</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress = {() => this.props.navigation.navigate("VisualizzaAlloggi")}
			                style = {styles.bottone}
		                >
                            <Text style={{color:'#ffffff'}}>Visualizza alloggi</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}