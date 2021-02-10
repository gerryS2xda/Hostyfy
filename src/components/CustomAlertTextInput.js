import React, { useState, useRef } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import CustomButton from './CustomButton';
import DatePickerInputField from "./DatePickerInputField";

const CustomAlertTextInput = (props) => {

    const visibility = props.visibility;
    const textInputRef = useRef(null); 
    const textInputSecondRef = useRef(null);
    const [dateInput, setDateInput] = useState("");
    const isSecondTextInputVisibile = false || props.showSecondTxtInput;
    const isDatePickerInputVisibile = false || props.showDatePickerTxtInput;

    return(
        <Modal
            transparent={true}
            visible={visibility}>
            <View style = {styles.container}>
                <View style = {styles.containertesto}>
                    <Text style={styles.titolo}>{props.titolo}</Text>
                    <Text style={styles.testo}>{props.testo}</Text>
                    <View style = {styles.textInputContainer}>
                    <TextInput
                        style={styles.input}
                        ref={textInputRef}
                        placeholder={props.placeholder}
                        onChangeText={(text) => props.setTextData(text)}
                    />
                    </View>
                    {isDatePickerInputVisibile && (
                        <View style = {styles.textInputContainer}>
                        <DatePickerInputField
                            styleField={{ width: "82%" }}
                            date={dateInput.toString()}
                            setDate={setDateInput}
                            placeholder={props.placeholderDateInput}
                        />
                        </View>
                    )}
                    {isSecondTextInputVisibile && (
                        <View style = {styles.textInputContainer}>
                        <TextInput
                            style={styles.input}
                            ref={textInputSecondRef}
                            placeholder={props.placeholderSecondInput}
                            onChangeText={(text) => props.setSecondTextData(text)}
                            secureTextEntry={true}
                        />
                        </View>
                    )}
                    <View style = {styles.horizontalbutton}>
                        <CustomButton 
                            styleBtn={{width: "45%"}}
                            nome="Annulla"
                            onPress={()=>{    
                                    props.setVisibility(false);
                                    textInputRef.current.clear(); 
                                    if(isSecondTextInputVisibile){
                                        textInputSecondRef.current.clear();
                                    }
                                    if(isDatePickerInputVisibile){
                                        props.setDateInput("");
                                    }
                                }
                            }
                        />
                        <CustomButton 
                            styleBtn={{width: "45%"}}
                            nome={props.buttonName}
                            onPress={()=>{
                                textInputRef.current.clear();
                                if(isSecondTextInputVisibile){
                                    textInputSecondRef.current.clear();
                                }
                                if(isDatePickerInputVisibile){ //viene inviato verso l'esterno il valore della data impostata
                                    props.setDateInput(dateInput);
                                }
                                props.onOkPress(); 
                        }}/> 
                    </View>    
                </View>         
            </View>
        </Modal>  
    );
}

export default CustomAlertTextInput;

const styles = StyleSheet.create({

    container:
    {
        backgroundColor: "#000000aa",
        flex: 1,
        justifyContent: 'center'
    },

    containertesto:
    {
        backgroundColor: "#ffffff",
        margin: "10%", 
        padding: "4%", 
        borderRadius: 10
    },

    titolo:
    {
        fontSize: 18,
        fontFamily: 'MontserrantBold',
        color: "#303a52"
    },

    testo:
    {
        fontSize: 13, 
        fontFamily: 'MontserrantSemiBold',
        marginBottom: "4%",
        marginTop: "4%",
        borderRadius: 10,
        padding: "2%"

    },

    horizontalbutton:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: "10%",
    },
    textInputContainer: {
        alignItems: 'center',
    },
    input: {
        minHeight: 30,
        height: 50,
        width: "100%",
        borderColor: '#303a52',
        borderWidth: 1,
        borderRadius: 25,
        fontFamily: 'MontserrantSemiBold',
        paddingLeft: "5%",
        marginTop: "5%",
        marginBottom: "3%",
        paddingRight: "5%",
      },
    }

);

