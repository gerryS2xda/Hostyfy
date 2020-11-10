import React from 'react';
import {Text, View, Image,ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';



const styles = StyleSheet.create({
    
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
        height:70,
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

    bottoneLeft : {
        borderWidth: 1,
        width:100,
        height:40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:8,
        backgroundColor: '#f2077d',
        marginLeft:15,
      },

      bottoneCenter : {
        borderWidth: 1,
        width:120,
        height:40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:8,
        backgroundColor: '#f2077d',
      },

      bottoneRight : {
        borderWidth: 1,
        width:100,
        height:40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:8,
        backgroundColor: '#f2077d',
        marginRight:15,
      },

      bottone : {
        borderWidth: 1,
        width:300,
        height:40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:8,
        backgroundColor: '#f2077d',
      },

  })




export default class AlloggioScreen extends React.Component {

 
    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          carouselItems: [
          {
              image:require('../../assets/Alloggio/Alloggio1.jpg'),
          },
          {
              image:require('../../assets/Alloggio/Alloggio2.jpg'),
          },
          {
              image:require('../../assets/Alloggio/Alloggio3.jpg'),
          },
          {
              image:require('../../assets/Alloggio/Alloggio4.jpg'),
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

        const nameCamera = "Suite";
        const myKey = "0123";
        return (
            
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
                    <View style={styles.middleContainer}>
                        <Text style={styles.singleField}>Camera 17</Text>
                        <Text style={styles.singleField}>Disponibilità</Text>
                        <Text style={styles.singleField}>Numero camere</Text>
                        <Text style={styles.descrizioneField}>Descrizione</Text>
                    </View>
                    <View style={styles.threeButtonContainer}>
                        <TouchableOpacity 
			                style = {styles.bottoneLeft}
		                >
                            <Text style={{color:'#ffffff'}}>Modifica Foto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
			               style = {styles.bottoneCenter} 
		                >
                            <Text style={{color:'#ffffff'}}>Modifica Video</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
			               style = {styles.bottoneRight}
		                >
                            <Text style={{color:'#ffffff'}}>Guida</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomButtonContainer}> 
                        <TouchableOpacity 
                            style = {styles.bottone}
                            onPress={() => {this.props.navigation.navigate('LaMiaChiave')}}>
		                
                            <Text style={{color:'#ffffff'}}>Visualizza Chiave</Text>
                        </TouchableOpacity>
                    </View>
            </ScrollView>
         
        );
    }
}
