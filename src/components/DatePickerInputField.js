import React, {useState} from 'react';
import {View, Button, Platform, StyleSheet, TouchableOpacity, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DatePickerInputField = (props) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    props.setDate(currentDate.toDateString());
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

    if(props.placeholder !== "" && props.date === ""){
        return (
            <View style={[styles.dataInput, props.styleContainer]}>
                <Icon name= "calendar-month" color={"black"} size={30} style={styles.immagineBottone}/>
                <TouchableOpacity 
                    style={props.styleField}
                    disabled={props.disabled}
                    onPress={()=>{
                        showDatepicker();
                }}>
                    <Text style={styles.placeholderField}>{props.placeholder}</Text>
                </TouchableOpacity>
                {show &&(<DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    locale="it-IT"
                    onChange={onChange}
                />)}
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
                        showDatepicker();
                }}>
                    <Text style={styles.singleField}>{props.date}</Text>
                </TouchableOpacity>
                {show &&(<DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    locale="it-IT"
                    onChange={onChange}
                />)}
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
        borderColor: '#cc3881',
        borderBottomWidth: 1.4,
        marginTop:8,
        paddingTop:9,
        fontFamily: "MontserrantSemiBold",
        paddingLeft: 5,
    },
    placeholderField: {
        height: 40,
        width:"100%",
        borderColor: '#cc3881',
        color: "#C7C7CD",
        borderBottomWidth: 1.4,
        marginTop:8,
        paddingTop:9,
        fontFamily: "MontserrantSemiBold",
        paddingLeft: 5,
    },
});
