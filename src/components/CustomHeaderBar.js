import React, { useState } from'react'
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {firebase} from "../firebase/config"
import * as NotificationModel from "../firebase/datamodel/NotificationModel"

var showBackButton = false;

const CustomHeaderBar = (props) => {

    //NOTA: il valore di currentUser e' null alla prima lettura di questa pagina da parte di "App.js", viene settata ogni volta che si apre il drawer menu
    var userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : "unknown user";

    var headertitle = props.title;  //titolo intestazione schermata

    if(headertitle === "Home"){ //gestisci lo stile se deve essere mostrato o meno il pulsante 'back'
      showBackButton = false;
    }else{
      showBackButton = true;
    }

    //STYLE (inserito all'interno del codice per usare valore showBackButton aggiornato)
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

    //Gestione icona notifiche
    const [notificationIcon, setNotificationIcon] = useState(require("../../assets/bell_white.png"));
    const checkNotification = async () =>{ //controlla se vi sono notifiche da leggere
      var notificationDocs = await NotificationModel.getNotificationDocumentByUserId(userId);
      var flag = false; //usato per verificare se ci sono notifiche non lette 
      for(const doc of notificationDocs){
        var notification = doc.data(); //ottieni i dati di ciascuna notifica e verifica il valore del flag 'isRead'
        if(!notification.isRead){ //se vi è una notifica da leggere ed è nuova, cambia icona
          flag= true;
          setNotificationIcon(require("../../assets/bellbadge_white.png"));
        }
      }
      if(!flag && notificationIcon === require("../../assets/bellbadge_white.png")){ //se le notifiche sono state tutte lette, resetta icona
        setNotificationIcon(require("../../assets/bell_white.png"));
      }
    }
    if(userId !== "unknown user")
      checkNotification();


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
                <TouchableOpacity style={styles.notificationButton} onPress={() => props.navigator.navigate("Notifications", {userId: userId})}>
                  <Image style={styles.notificationIcon} source={notificationIcon} />
                </TouchableOpacity>
                <Text style={styles.headertitle}>{headertitle}</Text>
            </View>
        </View>
    );
}

export default CustomHeaderBar;
