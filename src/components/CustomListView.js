import React from 'react';
import { View, FlatList, StyleSheet} from 'react-native';
import CustomRow from '../components/CustomRow';

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop: 20,
    },
});


const CustomListView = (props) => {
    const navigate = props.nav;
    const itemList = props.itemList;
return (
    <View style={styles.container}>
        <FlatList
                keyExtractor={(itemList)=>itemList.key.toString()}
                data={itemList}
                renderItem={({ item }) => 
                <CustomRow
                    title={item.title}
                    image_url={item.image_url}
                    description = {item.description}
                    newPage = {item.newPage}
                    nav= {navigate}
                    OTP={item.OTP}/>
            } />
    </View>   
);
}
export default CustomListView;