import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground} from 'react-native';

const WelcomeScreen = ({navigation}) => {
    return(
        <ImageBackground 
          source = {require("../../assets/Varie/Benvenuto.jpg")}
          style = {styles.image}>     
          
            <View style={styles.container}>
                <TouchableOpacity onPress={() => { navigation.navigate('Home'); }}>
                
                <View style={styles.containerLogoTitle}>
                    <View style={styles.containerLogo}>
                        <Image style={styles.logo} source={require("../../assets/HOSTYFY.png")} />
                    </View>
                    <View style={styles.containerTitle}>
                          <Text style={styles.welcometitle}>Hostyfy,</Text>
                          <Text style={styles.welcometitle2}> l'ospitalità intelligente!</Text>
                    </View>
                </View>
                
                  <View style={styles.containerSwipe}>
                      <Text style={styles.suggestTxt}>Tocca sullo schermo per continuare </Text>
                  </View>
                </TouchableOpacity>
            </View>
          </ImageBackground>
      
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({

    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.4)'
    },

    containerLogoTitle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: "60%",
    },

    containerLogo: {
      width: "100%",
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '-6%'
    },
    
    logo:{
      width: "45%" ,
      height: "55%",
    },

    containerTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },

    welcometitle:{
      textAlign: "center",
      fontSize: 22,
      color: "#0692d4",
      fontFamily: "MontserrantBold",
    },

    welcometitle2:{
      textAlign: "center",
      fontSize: 20,
      color: "#ffffff",
      fontFamily: "MontserrantBold",
    },
    
    containerSwipe:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginBottom: 60,
    },
    suggestTxt: {
      textAlign: 'center',
      fontSize: 16,
      color: '#ffffff',
      fontFamily: "MontserrantSemiBold"
    },

      image:{
        flex:1,
        backgroundColor: "#000000",
        justifyContent: "center",
    }, 
  });