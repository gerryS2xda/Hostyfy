import React from'react'
import { StyleSheet, Platform, Text, View, Image, TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

const CustomHeaderBar = (props) => {
    return(
        <View style={[styles.headerContainer, styles.headerHeight]}>
            <View style={styles.headerContent}>
                <TouchableOpacity style={styles.drawerMenuButton} onPress={() => props.navigator.dispatch(DrawerActions.toggleDrawer())}>
                  <Image style={styles.drawerIcon} source={require("../../assets/drawerMenu_icon.png")}/>
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
          height:32, //44 se e' un iPad
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
        justifyContent: 'flex-start',
        backgroundColor: '#f2077d',
        marginTop:20, //necessario conoscere altezza statusbar
    },
    headertitle: Platform.select({
        ios: {
          fontSize: 17,
          fontWeight: '600',
          color: 'white',
        },
        android: {
          fontSize: 20,
          fontFamily: 'sans-serif-medium',
          fontWeight: 'normal',
          color: 'white',
        },
        default: {
          fontSize: 18,
          fontWeight: '500',
          color: 'white',
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
        left: 24,
        bottom: 0,
        right: 0,
    }, 
    drawerIcon: {
      width: 24,
      height: 24
    }
});