import React from 'react';
import { View, FlatList, StyleSheet} from 'react-native';
import CustomRowRecensione from '../components/CustomRowRecensione';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
});


const CustomListViewRecensione = (props) => {
    const navigate = props.nav;
    const userLogged = props.userLogged;
    const itemList = props.itemList;

    return (
    <View style={styles.container}>
        <FlatList
                keyExtractor={(itemList)=>itemList.key.toString()}
                data={itemList}
                renderItem={({ item }) => 
                <CustomRowRecensione
                    title={item.title}
                    image_url={item.image_url}
                    description = {item.description}
                    newPage = {item.newPage}
                    nav= {navigate}
                    strutturaId = {item.strutturaId}
                    alloggioId={item.alloggioId}
                    userLogged = {userLogged}
                    recensioneId={item.recensioneId}
                    />
            } />
    </View>   
);
}
export default CustomListViewRecensione;