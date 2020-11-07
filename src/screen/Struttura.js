import React from 'react';
import {Text, View, Image, Button, } from 'react-native';
import Carousel from 'react-native-snap-carousel';


export default class App extends React.Component {

 
    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          carouselItems: [
          {
              image:require('./assets/Struttura/struttura1.jpg'),
          },
          {
              image:require('./assets/Struttura/struttura2.jpg'),
          },
          {
              image:require('./assets/Struttura/struttura3.jpg'),
          },
          {
              image:require('./assets/Struttura/struttura4.jpg'),
          },
          {
              image:require('./assets/Struttura/struttura5.jpg'),
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
          <View style={{flex: 1, backgroundColor:'rebeccapurple', paddingTop: 50, }}>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  data={this.state.carouselItems}
                  sliderWidth={300}
                  itemWidth={300}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
            </View>
          </View>
        );
    }
}