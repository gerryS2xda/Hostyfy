import React, { Component } from 'react';
import CustomListView from './CustomListView'
import {
  StyleSheet,
  Text,
  View
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },

  intestazione:{
    marginTop: 60,
    marginBottom: -60
  },

  title:
  {
    fontSize: 25,
    marginLeft: 20,
  }
});

export default class LeMieStrutture extends Component {


  /* Return object for populate the list */
  getData() {
    return [
      {
        key: 1, title: 'Le Sirene',
        description: '"Fantastica"',
        image_url: 'https://cf.bstatic.com/xdata/images/hotel/square200/4614108.webp?k=116fe6a3bca7b49e33e58b089246a611466f4382f84eba40b7d7cd834489eabf&o=',
      },
      {
        key: 2,
        title: 'Exe Majestic',
        description: '"Esperienza meravigliosa"',
        image_url: 'https://cf.bstatic.com/xdata/images/hotel/square200/267141706.webp?k=2dd18385764548528ea9dbef053d45eaf4eda19199adb2400c43c2d7748095b9&o=',
      
      },
      {
        key: 3,
        title: 'Villa Domina',
        description: '"Eccezionale"',
        image_url: 'https://cf.bstatic.com/xdata/images/hotel/square200/44146554.webp?k=c418ab13d5c0ad2402cb939d157a20953f233ffbba42753b0f00c4195626a1c1&o=',
      
      },
      {
        key: 4,
        title: 'Apartments Tudor',
        description: '"Eccellente"',
        image_url: 'https://cf.bstatic.com/xdata/images/hotel/square200/203411677.webp?k=147cdadb9a76948eb4d54dc326a80fe8cc8a270596b70957c2aef2aa87bdfcb7&o=',
      
      },
    ]
  }


  render() {
    return (
      <View style={styles.container}>

        <View style = {styles.intestazione}>
          <Text style = {styles.title}>Le mie Strutture</Text>
        </View>
        <CustomListView
          itemList={this.getData()}
        />
      </View>
    );
  }


  
}

