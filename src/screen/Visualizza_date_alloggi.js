import React, { useState } from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import HeaderBar from '../components/CustomHeaderBar'


const Visualizza_date_Alloggi = ({route, navigation}) => {
    const {dataIniziale, dataFinale} = route.params;
    return(
        <View>
            <HeaderBar title="Calendario" navigator={navigation} />
            <ScrollView>
                <Text>I: {JSON.stringify(dataIniziale)} F:{JSON.stringify(dataFinale)}</Text>
            </ScrollView>
        </View>
    );
}

export default Visualizza_date_Alloggi