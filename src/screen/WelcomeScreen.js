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
                       
                            <Image style={styles.logo} source={require("../../assets/HOSTYFY.png")} />
                        
                        <View style={styles.containerTitle}>
                              <Text style={styles.welcometitle}>Hostyfy,
                                <Text style={styles.welcometitle2}> l'ospitalità intelligente!</Text>
                              </Text>
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
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: "center",
      backgroundColor: 'rgba(0,0,0,0.4)'
    },

    containerLogoTitle: {
      flex:1,
      alignItems: "center",
      justifyContent: 'center',
      alignContent: 'center',
      marginTop: "60%"
    },

    containerSwipe:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginBottom: 60,
    },

    containerTitle: {
      flexDirection: 'row', 
    },

    containerLogo: {
      width: "10%",
       
      backgroundColor: "#000000",
    },

    logo:{
      width: "50%",
      height: "45%",
      marginBottom: "2%"
      
     
    },

    welcometitle:{
      textAlign: "center",
      fontSize: 20,
      color: "#0692d4",
      fontFamily: "MontserrantBold",
     
    },

    welcometitle2:{
      textAlign: "center",
      fontSize: 20,
      color: "#ffffff",
      fontFamily: "MontserrantBold"
    },
    
    suggestTxt: {
      textAlign: 'center',
      fontSize: 15,
      color: '#ffffff',
      fontFamily: "MontserrantSemiBold"
    
    },

      image:{
        flex:1,
        backgroundColor: "#000000",
        justifyContent: "center",
       
    }, 

    
  });