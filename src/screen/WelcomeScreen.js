import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { navigation.navigate('Home'); }}>
              <View style={styles.containerLogoTitle}>
                  <Image style={styles.logo} source={require("../../assets/HOSTYFY.png")} />
                  <Text style={styles.welcometitle}>Benvenuto</Text>
              </View>
              <View style={styles.containerSwipe}>
                  <Text style={styles.suggestTxt}>Tocca sullo schermo per continuare </Text>
              </View>
            </TouchableOpacity>
        </View>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerLogoTitle: {
      marginLeft: 10,
      marginRight: 10,
      marginTop: 120,
    },
    logo:{
      width: 280,
      height: 140,
    },
    welcometitle:{
      textAlign: "center",
      fontSize: 32,
      color: "#f2077d",
      fontWeight: "bold",
      marginTop: 32,
      marginBottom: 16,
    },
    swipeIcon:{
      width:32,
      height:32,
      margin:1,
    },
    containerSwipe:{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginBottom: 60,
    },
    suggestTxt: {
      textAlign: 'center',
      fontSize: 18,
      color: 'black'
    }
  });