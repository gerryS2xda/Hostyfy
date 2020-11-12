import React from'react'
import { StyleSheet, Platform, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomHeaderBar = (props) => {
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

    return(
        <View style={[styles.headerContainer, styles.headerHeight]}>
            <View style={styles.headerContent}>
                <TouchableOpacity style={styles.drawerMenuButton} onPress={() => props.navigator.dispatch(DrawerActions.toggleDrawer())}>
                  <Image style={styles.drawerIcon} source={require("../../assets/drawerMenu_icon.png")}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.notificationButton} onPress={createNextRealeaseFeatureAlert}>
                  <Icon name="bell" color={"white"} size={24} />
                </TouchableOpacity>
                <Text style={styles.headertitle}>{props.title}</Text>
            </View>
        </View>
    );
}

export default CustomHeaderBar;

const styles = StyleSheet.create({
    headerHeight: Platform.select({    //NOTA: senza considerare la status bar del device
        ios: {
          height:56, //32 se e' un iPhone, 44 se e' un iPad
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
        backgroundColor: '#f2077d',
        marginTop:20, //necessario conoscere altezza statusbar
    },
    headertitle: Platform.select({
        ios: {
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
    drawerMenuButton: {
        position: 'absolute',
        top: 18,
        left: "6%",
        bottom: 0,
        right: 0,
        width: 24,
        height: 24,
    }, 
    drawerIcon: {
      width: 24,
      height: 24,
    },
    notificationButton: {
      position: 'absolute',
      top: 18,
      left: "86%",
      bottom: 0,
      right: 0,
      width: 24,
      height: 24,
    }, 
    notificationIcon: {
      width: 24,
      height: 24,
    }
});