import React from 'react';
import { View, FlatList, StyleSheet} from 'react-native';
import CustomRowNotification from "./CustomRowNotification"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        marginRight: "1%"
    },
});


const CustomListViewNotification = (props) => {
    const navigate = props.nav;
    const userId = props.userId;
    const itemList = props.itemList;

    return (
        <View style={styles.container}>
            <FlatList
                    keyExtractor={(itemList)=>itemList.key.toString()}
                    data={itemList}
                    renderItem={({ item }) => 
                    <CustomRowNotification
                        title={item.title}
                        iconName={item.iconName}
                        description = {item.description}
                        newPage = {item.newPage}
                        nav= {navigate}
                        userId = {userId}
                        prenId={item.prenId}
                        notificationId={item.notificationId}
                        />
                } />
        </View>   
    );
}
export default CustomListViewNotification;

