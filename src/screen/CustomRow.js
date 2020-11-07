import React from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
    },
    title: {
        fontSize: 16,
        color: '#000',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
    },
    photo: {
        height: 50,
        width: 50,
    },
    arrow: {
        marginLeft: 250,
        marginTop: -35
    },
    opacity:{

        

    }

    
});


const CustomRow = ({ title, image_url, description, newPage}) => (


<TouchableOpacity 
    style = {styles.opacity}
    onPress = {()=>Alert.alert('ciao')}>

    <View style={styles.container}>
        <Image source={{ uri: image_url }} style={styles.photo} />
        <View style={styles.container_text}>
            <Text style={styles.title}>
                {title}
            </Text>
            <Text style={styles.description}>
                {description}
            </Text>
            <Image
                source = {require('../../assets/arrow.png')}
                style = {styles.arrow} 
            />
        </View>
    </View>

</TouchableOpacity>
);

export default CustomRow;