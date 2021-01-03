import React from 'react';
import { View, FlatList, StyleSheet} from 'react-native';
import CustomRowGeneralMieChiavi from '../components/CustomRowGeneralMieChiavi';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
});


const CustomListViewGeneralAlloggio = (props) => {
    const navigate = props.nav;
    const userLogged = props.userLogged;
    const itemList = props.itemList;

    return (
    <View style={styles.container}>
        <FlatList
                keyExtractor={(itemList)=>itemList.key.toString()}
                data={itemList}
                renderItem={({ item }) => 
                <CustomRowGeneralMieChiavi
                    title={item.title}
                    image_url={item.image_url}
                    description = {item.description}
                    newPage = {item.newPage}
                    nav= {navigate}
                    userLogged = {userLogged}
                    strutturaId =  {item.strutturaId}
                    alloggioId = {item.alloggioId}
                />
            } />
    </View>   
);
}
export default CustomListViewGeneralAlloggio;