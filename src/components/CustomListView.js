import React from 'react';
import { View, FlatList, StyleSheet, Text, Alert, Image} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import CustomRow from '../components/CustomRow';

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop: 20,
    },
});


const CustomListView = (props) => {
    const navigate = props.nav;
return (
    <View style={styles.container}>
        <FlatList
                data={props.itemList}
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