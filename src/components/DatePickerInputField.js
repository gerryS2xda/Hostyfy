import React, {useState} from 'react';
import {View, Button, Platform, StyleSheet, TouchableOpacity, Text} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DatePickerInputField = (props) => {
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    props.setDate(currentDate.toDateString());
    hideDatePicker();
  };

    if(props.placeholder !== "" && props.date === ""){
        return (
            <View style={[styles.dataInput, props.styleContainer]}>
                <Icon name= "calendar-month" color={"black"} size={30} style={styles.immagineBottone}/>
                <TouchableOpacity 
                    style={props.styleField}
                    disabled={props.disabled}
                    onPress={()=> showDatePicker()}>
                    <Text style={styles.placeholderField}>{props.placeholder}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    value={date}
                    mode="date"  //Choose between 'date', 'time', and 'datetime'
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    is24Hour={true}
                    display="default"
                    locale="it-IT"
                />
            </View>
        );
    }else{
        return (
            <View style={[styles.dataInput, props.styleContainer]}>
                <Icon name= "calendar-month" color={"black"} size={30} style={styles.immagineBottone}/>
                <TouchableOpacity 
                    style={props.styleField}
                    disabled={props.disabled}
                    onPress={()=>{
                        showDatePicker();
                }}>
                    <Text style={styles.singleField}>{props.date}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    value={date}
                    mode="date"  //Choose between 'date', 'time', and 'datetime'
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    is24Hour={true}
                    display="default"
                    locale="it-IT"
                />
            </View>
        );
    }

  
    
    
};

export default DatePickerInputField;

const styles = StyleSheet.create({
    dataInput:{
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
    },
    immagineBottone : {
        marginLeft: 14,
        marginRight: 5,
        paddingTop: 10,
    },
    singleField: {
        height: 40,
        width:"100%",
        borderColor: '#666666',
        borderBottomWidth: 1,
        color: "black",
        marginTop:8,
        paddingTop:9,
        fontFamily: "MontserrantSemiBold",
        paddingLeft: 5,
    },
    placeholderField: {
        height: 40,
        width:"100%",
        borderColor: '#666666',
        color: "#C7C7CD",
        borderBottomWidth: 1,
        marginTop:8,
        paddingTop:9,
        fontFamily: "MontserrantSemiBold",
        paddingLeft: 5,
    },
});
