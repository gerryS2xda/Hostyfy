import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import CustomRow from './CustomRow';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100
    },
});


const CustomListView = ({ itemList }) => (
    <View style={styles.container}>
        <FlatList
                data={itemList}
                renderItem={({ item }) => 
                <CustomRow
                    title={item.title}
                    image_url={item.image_url}
                    description = {item.description}
                />}
            />

    </View>
);

export default CustomListView;