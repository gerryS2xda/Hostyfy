import React, {useState} from 'react';
import {View, Button, Platform, StyleSheet, TouchableOpacity, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Dialog, { DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog';

const DatePickerInputField = (props) => {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || props.date;
    setShow(Platform.OS === 'ios');
    props.setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  if(Platform.OS === 'ios'){
    return(
        <View style={[styles.dataInput, props.style]}>
            <Icon name= "calendar-month" color={"black"} size={30} style={styles.immagineBottone}/>
            <TouchableOpacity 
                disabled={props.disabled}
                style={props.styleField} 
                onPress={()=>{
                    showDatepicker();
                    console.log(props.date);
                }}>
                    <Text style={styles.singleField}>{props.date.toDateString()}</Text>
            </TouchableOpacity>
            <Dialog 
                visible={visible} 
                    onTouchOutside={hideDialog}
                    footer={
                    <DialogFooter>
                        <DialogButton text="CANCEL" onPress={hideDialog} />
                        <DialogButton text="OK" onPress={() => {
                                hideDialog();
                                console.log(date);
                            }} />
                    </DialogFooter>
                }>
                <DialogContent>            
                <DateTimePicker
                    testID="dateTimePicker"
                    value={props.date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />  
                </DialogContent>
            </Dialog>
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
                        console.log(props.date);
                }}>
                    <Text style={styles.singleField}>{props.date.toDateString()}</Text>
                </TouchableOpacity>
                {show &&(<DateTimePicker
                    testID="dateTimePicker"
                    value={props.date}
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
});