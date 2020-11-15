import React from 'react';
import { View, FlatList, StyleSheet, Text, Alert, Image} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        marginTop: 20
    },
    container: {
        flexDirection: 'row',
        padding: 10,
        marginLeft:"4%", //oldvalue: 16
        marginRight:"4%", //oldvalue: 16
        marginTop: "2%", //oldvalue: 8
        marginBottom: "3%", //oldvalue: 8
        borderRadius: 3,
        elevation: 2,
        width: "93%",
        //backgroundColor: 'black'
    },
    title: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'MontserrantSemiBold'
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    description: {
        fontSize: 12,
        fontFamily: 'MontserrantItalic',
    },
    photo: {
        height: 50,
        width: 50,
        borderRadius: 4,
    },
    arrow: {
        alignSelf: 'center',
    },
});


const CustomListViewNotification = (props) => {
    const navigate = props.nav;
    return (
        <View style={styles.maincontainer}>
            <FlatList
                    data={props.itemList}
                    renderItem={({ item }) => 
                    <CustomRow
                        title={item.title}
                        image_url={item.image_url}
                        description = {item.description}
                        onPress= {item.onPress}
                        newPage = {item.newPage}
                        nav= {navigate}
                        />
                } />
        </View>   
    );
}
export default CustomListViewNotification;

function CustomRow(props){
    return(
        <TouchableOpacity 
            onPress = {()=> props.nav.navigate(props.newPage)}>
                
            <View style={styles.container}>
                <Image display={"none"} source={props.image_url} style={styles.photo} />
                <View style={styles.container_text}>
                    <Text style={styles.title}>
                        {props.title}
                    </Text>
                    <Text style={styles.description}>
                        {props.description}
                    </Text>
                </View>
                <Image
                    source = {require('../../assets/arrow.png')}
                    style = {styles.arrow} 
                />
            </View>
        </TouchableOpacity>
    );
}

