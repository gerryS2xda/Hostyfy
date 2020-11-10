import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const WelcomeScreen = () => {
    return(
        <View style={styles.container}>
            <View style={styles.containerLogoTitle}>
                <Image style={styles.logo} source={require("../../assets/HOSTYFY.png")} />
                <Text style={styles.welcometitle}>Benvenuto</Text>
            </View>
            <View style={styles.containerSwipe}>
                <Text>Slide right per continuare </Text>
            </View>
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
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: "100px",
    },
    logo:{
      width: 254,
      height: 105,
    },
    welcometitle:{
      textAlign: "center",
      fontSize: "28px",
      color: "black",
      fontWeight: "bold",
      marginTop: 24,
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
      marginBottom: "100px",
      width:200,
    },
  });