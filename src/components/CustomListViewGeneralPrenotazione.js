import React from 'react';
import { View, FlatList, StyleSheet, Text, Alert, Image} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import CustomRowGeneralPrenotazione from '../components/CustomRowGeneralPrenotazione';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
});


const CustomListViewGeneralPrenotazione = (props) => {
    const navigate = props.nav;
return (
    <View style={styles.container}>
        <FlatList
                data={props.itemList}
                renderItem={({ item }) => 
                <CustomRowGeneralPrenotazione
                    title={item.title}
                    image_url={item.image_url}
                    description = {item.description}
                    newPage = {item.newPage}
                    nav= {navigate}
                    />
            } />
    </View>   
);
}
export default CustomListViewGeneralPrenotazione;