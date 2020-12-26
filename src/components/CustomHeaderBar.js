import React, { useState } from'react'
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

var showBackButton = false;

const CustomHeaderBar = (props) => {

    var headertitle = props.title;

    if(headertitle === "Home"){
      showBackButton = false;
    }else{
      showBackButton = true;
    }

    const styles = StyleSheet.create({
      headerHeight: Platform.select({    
          ios: {
            height:64, //32 se e' un iPhone, 44 se e' un iPad
          },
          android: {
            height:56,
          },
          default: {
            height:64,
          },
      }),
      headerContainer: {
          width: "100%",
          backgroundColor: '#003780',
      },
      headertitle: Platform.select({
          ios: {
            marginTop: 20,
            fontSize: 17,
            fontWeight: '600',
            color: 'white',
            fontFamily: "MontserrantSemiBold",
          },
          android: {
            fontSize: 20,
            fontFamily: 'sans-serif-medium',
            fontWeight: 'normal',
            color: 'white',
            fontFamily: "MontserrantSemiBold",
          },
          default: {
            fontSize: 18,
            fontWeight: '500',
            color: 'white',
            fontFamily: "MontserrantSemiBold",
          },
      }),
      headerContent: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
      },
      drawerMenuButton: Platform.select({    
        ios: {
          position: 'absolute',
          top: 30,
          left: showBackButton? "12%": "6%",
          bottom: 0,
          right: 0,
          width: 24,
          height: 24,
        },
        android: {
          position: 'absolute',
          top: 18,
          left: showBackButton? "12%": "6%",
          bottom: 0,
          right: 0,
          width: 24,
          height: 24,
        },
        default: {
          position: 'absolute',
          top: 18,
          left: showBackButton? "12%": "6%",
          bottom: 0,
          right: 0,
          width: 24,
          height: 24,
        },
      }),
      
      drawerIcon: {
        width: 24,
        height: 24,
      },
      notificationButton: Platform.select({    
        ios: {
          position: 'absolute',
          top: 30,
          left: "86%",
          bottom: 0,
          right: 0,
          width: 24,
          height: 24,
        },
        android: {
          position: 'absolute',
          top: 18,
          left: "86%",
          bottom: 0,
          right: 0,
          width: 24,
          height: 24,
        },
        default: {
          position: 'absolute',
          top: 18,
          left: "86%",
          bottom: 0,
          right: 0,
          width: 24,
          height: 24,
        },
      }),
      notificationIcon: {
        width: 24,
        height: 24,
      },
      backButton: Platform.select({    
        ios: {
          position: 'absolute',
          top: 24,
          left: "2%",
          bottom: 0,
          right: 0,
        },
        android: {
          position: 'absolute',
          top: 14,
          left: "2%",
          bottom: 0,
          right: 0,
        },
        default: {
          position: 'absolute',
          top: 18,
          left: "2%",
          bottom: 0,
          right: 0,
        },
    }),
  });

    return(
        <View style={[styles.headerContainer, styles.headerHeight]}>
          <StatusBar backgroundColor="#003780" barStyle={'default'} /> 
            <View style={styles.headerContent}>
                {
                  showBackButton && (
                    <TouchableOpacity style={styles.backButton} onPress={() => props.navigator.goBack()}>
                      <Icon name="chevron-left" color={"white"} size={32} />
                    </TouchableOpacity>
                  )
                }
                <TouchableOpacity style={styles.drawerMenuButton} onPress={() => props.navigator.dispatch(DrawerActions.toggleDrawer())}>
                  <Image style={styles.drawerIcon} source={require("../../assets/drawerMenu_icon.png")}/>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.notificationButton} onPress={() => props.navigator.navigate("Notifications")}>
                  <Icon name="bell" color={"white"} size={24} />
                </TouchableOpacity>
                <Text style={styles.headertitle}>{headertitle}</Text>
            </View>
        </View>
    );
}

export default CustomHeaderBar;

//Alert function
const createNextRealeaseFeatureAlert = () =>
      Alert.alert(
      "Funzionalità non disponibile",
      "Questa funzionalità sarà disponibile a seguito di sviluppi futuri!",
      [
          {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

//Style
