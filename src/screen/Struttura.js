import React from 'react';
import {Text, View, Image,ScrollView, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import { Directions } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import HeaderBar from '../components/CustomHeaderBar'



const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: '#fff',
      },

    scrollContainer: {
        marginTop: 20,  
        alignItems: 'stretch'
        
    },
    carouselContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 30
    },

    singleField: {
        height: 40,
        borderColor: '#cc3881',
        marginTop:8,
        borderRadius: 8,
        paddingTop:9,
        paddingLeft: 8,
        fontFamily: 'Montserrant',
        borderBottomWidth: 1,
        width:'85%',
    },

    fieldContainerTop:{
        alignItems: 'center',      
    },

    twoFieldContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',  
        marginTop: 10       
    },

    fieldContainerBottom:{
        alignItems: 'center',      
    },

    twoField: {
        justifyContent: 'flex-end',
        borderBottomWidth: 1,
        borderColor: '#cc3881',
        width: "31%",
        fontFamily: 'Montserrant'
       },

       descrizioneField: {
        height: 150,
        width:"85%",
        borderColor: '#cc3881',
        marginTop:8,
        borderBottomWidth: 1,
        backgroundColor: '#f5f5f2',
        paddingLeft: "1%",
        paddingRight: "1%",
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

      bottoneLeft : {
        
       
       },
           
       
   
      bottoneRight : {
           
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
          <View>
           <Image style={{width:270, height:270, borderRadius:5}} source = {item.image} />
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

                        <View style={styles.fieldContainerTop}>
                            <TextInput style={styles.singleField}>Le sirene</TextInput>
                            <TextInput style={styles.singleField}>Via Giovanni da Procida 18</TextInput>
                            <TextInput style={styles.singleField}>Napoli</TextInput>
                        </View>
                        <View style={styles.twoFieldContainer}>
                            <TextInput style={styles.twoField}>80100</TextInput>
                            <TextInput style={styles.twoField}>Italia</TextInput>
                        </View>
                        <View style={styles.fieldContainerBottom}>
                            <TextInput style={styles.singleField}>Hotel</TextInput>
                            <TextInput style={styles.singleField}>123</TextInput>
                            <TextInput style={styles.descrizioneField}
                             width ={"85%"}
                             height ={200}
                             multiline={true}
                             numberOfLines={15}

                            >Bellissimo</TextInput>
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