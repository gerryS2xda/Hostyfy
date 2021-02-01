import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as NotificationModel from "../firebase/datamodel/NotificationModel"


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        //paddingTop: 6,
        //paddingLeft: 12,
        //paddingBottom: 6,
        marginLeft:"4%", //oldvalue: 16
        marginRight:"4%", //oldvalue: 16
        marginTop: "2%", //oldvalue: 8
        borderRadius: 18,
        borderWidth: 3,
        width: "93%",
        borderColor: "#e4eded"
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
        marginLeft: 10,
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        marginRight: 10,
    },
    description: {
        fontSize: 12,
        fontFamily: 'MontserrantItalic',
    },
    photo: {
        borderTopLeftRadius: 16,
        borderBottomLeftRadius:16,
        width: 70,
        justifyContent: "center",
        alignItems: "center"
    },
    bellIcon:{
        width: 32,
        height: 32
    },
    arrow: {
        alignSelf: 'center',
    },
});


const CustomRowNotification = (props) => {
    const userId = props.userId;
    const prenId = props.prenId;
    const notificationId = props.notificationId;
    const [notificationIcon, setNotificationIcon] = useState(props.iconName);

    return (
        <TouchableOpacity 
            onPress = {()=>{ 
                async function updateNotificationStatus(){
                    await NotificationModel.updateisRead(notificationId, true);
                    setNotificationIcon(require("../../assets/bell_black.png"));
                }
                if(props.iconName === require("../../assets/bell_badge_black.png"))
                    updateNotificationStatus();     
                //props.nav.navigate(props.newPage,{userId: userId, prenotazioneId: prenId}); 
            }}>
                
            <View style={styles.container}>
                <View style={styles.photo}>   
                    <Image source={notificationIcon} style={styles.bellIcon} />
                </View>
                <View style={styles.container_text}>
                    <Text style={styles.title}>
                        {props.title}
                    </Text>
                    <Text style={styles.description}>
                        {props.description}
                    </Text>
                </View>
                
            </View>
        </TouchableOpacity>
    );
}
export default CustomRowNotification;