import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import HeaderBar from '../components/CustomHeaderBar';
import CustomListViewNotification from '../components/CustomListViewNotification'

const NotificationScreen = (props) => {
    return(
        <View style={styles.maincontainer}>
            <HeaderBar title="Notifiche" navigator={props.navigation} /> 
            <ScrollView style={styles.bodyScrollcontainer}>
                <View style={styles.scrollContent}> 
                <CustomListViewNotification 
                    nav= {props.navigation}
                    itemList={[
                    {
                        key: 1, 
                        title: 'Check-out alloggio 2',
                        description: 'Clicca qui per maggiori informazioni.',
                        newPage: 'CheckOut',
                    },
                    {
                        key: 2,
                        title: 'Check-out alloggio 5',
                        description: 'Clicca qui per maggiori informazioni.',
                        newPage: 'CheckOut',
                    },
                    {
                        key: 3,
                        title: 'Alloggio 10 non utilizzabile',
                        description: 'Dalle ore 10 alle ore 11 del 19/11/2020, l\' alloggio non sarà utilizzabile per operazioni di sanificazione',
                        newPage: 'CheckOut',
                    },
                    ]

                 }/>
                </View>
            </ScrollView>
        </View> 
    );
}

export default NotificationScreen;

const styles = StyleSheet.create({
 
    maincontainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
      },
      bodyScrollcontainer: {
        width: "100%",
      },
      scrollContent: {
        marginLeft:16,
        marginRight:16,
    },
  
  });