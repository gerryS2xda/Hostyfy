import React from 'react';
import { View, FlatList, StyleSheet} from 'react-native';
import CustomRowGeneralCleanService from '../components/CustomRowGeneralCleanService';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        marginRight: "1%",
    },
});


const CustomListViewGeneralCleanServices = (props) => {
    const navigate = props.nav;
    const userLogged = props.user;
    const itemList = props.itemList;
    return (
    <View style={styles.container}>
        <FlatList
                keyExtractor={(itemList)=>itemList.key.toString()}
                data={itemList}
                renderItem={({ item }) => 
                <CustomRowGeneralCleanService
                    title = {item.title}
                    nav = {navigate}
                    cleanServiceId = {item.cleanServiceId}
                    userLogged = {userLogged}
                    newPage = {item.newPage}
                    />
            } />
    </View>   
);
}
export default CustomListViewGeneralCleanServices;