import React, {useState} from 'react';
import {View, Button, Platform, StyleSheet, TouchableOpacity, Text} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DatePickerInputField = (props) => {
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  var dateMode = "date";
  if(props.dateMode === "datetime"){
      dateMode="datetime";
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);

    if(props.dateMode === "datetime"){
        props.setDate(currentDate.toUTCString());
    }else{
        props.setDate(currentDate.toDateString());
    }
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
                    mode={dateMode}  //Choose between 'date', 'time', and 'datetime'
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    is24Hour={true}
                    display="default"
                    locale="it-IT"
                    isDarkModeEnabled={false}
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
                    mode={dateMode}  //Choose between 'date', 'time', and 'datetime'
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    is24Hour={true}
                    display="default"
                    locale="it-IT"
                    isDarkModeEnabled={false}
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
        backgroundColor: "#f2f3f4",
        borderRadius: 30,
        marginTop: "2%",
        borderColor: "#666666",
        borderWidth: 1
    },
    immagineBottone : {
        marginLeft: 14,
        marginRight: 12,
        paddingTop: 3,
    },
    singleField: {
        height: 40,
        width:"100%",
        color: "black",
        marginTop:8,
        paddingTop:5,
        fontFamily: "MontserrantSemiBold",
        paddingLeft: 15,
        fontSize: 15
    },
    placeholderField: {
        height: 40,
        width:"100%",
        borderColor: '#666666',
        color: "#797D7F",
        marginTop:6,
        paddingTop:6,
        fontFamily: "MontserrantSemiBold",
        paddingLeft: 8,
        borderRadius: 30,
        fontSize: 16
    },
});
