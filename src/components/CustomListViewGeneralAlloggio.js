import React from 'react';
import { View, FlatList, StyleSheet, Text, Alert, Image} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import CustomRowGeneralAlloggio from '../components/CustomRowGeneralAlloggio';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
});


const CustomListViewGeneralAlloggio = (props) => {
    const navigate = props.nav;
return (
    <View style={styles.container}>
        <FlatList
                data={props.itemList}
                renderItem={({ item }) => 
                <CustomRowGeneralAlloggio
                    title={item.title}
                    image_url={item.image_url}
                    description = {item.description}
                    newPage = {item.newPage}
                    nav= {navigate}
                    strutturaId={item.strutturaId}
                    id={item.id}
                    />
            } />
    </View>   
);
}
export default CustomListViewGeneralAlloggio;