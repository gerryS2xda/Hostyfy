import React from 'react';
import { View, FlatList, StyleSheet} from 'react-native';
import CustomRowGeneralAlloggio from '../components/CustomRowGeneralAlloggio';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        marginRight: "1%",
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
                <CustomRowGeneralAlloggio
                    title={item.title}
                    image_url={item.image_url}
                    description = {item.description}
                    newPage = {item.newPage}
                    nav= {navigate}
                    strutturaId={item.strutturaId}
                    userLogged = {userLogged}
                    id={item.id}
                    />
            } />
    </View>   
);
}
export default CustomListViewGeneralAlloggio;