import React from 'react';
import {Text, View, Image,ScrollView, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';


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
           <Image style={{width:250, height:250}} source = {item.image} />
            <Text>{item.title}</Text>
          </View>

        )
    }

    render() {
        return (
            <View >
                <ScrollView>
                    <View >
                        <Text>Le sirene</Text>
                        <Carousel
                        layout={"default"}
                        ref={ref => this.carousel = ref}
                        data={this.state.carouselItems}
                        sliderWidth={300}
                        itemWidth={300}
                        renderItem={this._renderItem}
                        onSnapToItem = { index => this.setState({activeIndex:index}) } />
                        <Text>Le sirene</Text>
                        <Text>Indirizzo</Text>
                    </View>
                    <View>
                        <Text>Città</Text>
                        <Text>Cap</Text>
                    </View>
                    <View>
                        <Text>Nazione</Text>
                        <Text>Tipologia</Text>
                        <Text>Numero Alloggi</Text>
                        <Text>Descrizione</Text>
                    </View>
                    <View>
                        <TouchableOpacity 
			                
		                >
                            <Text style={{color:'#ffffff'}}>Modifica Foto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
			                
		                >
                            <Text style={{color:'#ffffff'}}>Modifica Video</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
			               
		                >
                            <Text style={{color:'#ffffff'}}>Guida</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity 
			                
		                >
                            <Text style={{color:'#ffffff'}}>Visualizza alloggi</Text>
                        </TouchableOpacity>
                    </View>
            </ScrollView>
          </View>
        );
    }
}