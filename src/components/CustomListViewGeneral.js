import React from 'react';
import { View, FlatList, StyleSheet, Text, Alert, Image} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import CustomRowGeneral from '../components/CustomRowGeneral';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
});


const CustomListViewGeneral = (props) => {
    const navigate = props.nav;
    const userLogged = props.userLogged;

    return (
        <View style={styles.container}>
            <FlatList
                    data={props.itemList}
                    renderItem={({ item }) => 
                    <CustomRowGeneral
                        title={item.title}
                        image_url={item.image_url}
                        description = {item.description}
                        newPage = {item.newPage}
                        nav= {navigate}
                        userLogged = {userLogged}
                        id={item.id}
                        />
                } />
        </View>   
    );
}
export default CustomListViewGeneral;