import React, { useState } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';
import DatePickerInputField from "../components/DatePickerInputField"
import * as CleanServiceModel from "../firebase/datamodel/CleanServiceModel";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import { DefaultTheme } from '@react-navigation/native';
import CustomAlertGeneral from "../components/CustomAlertGeneral"

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bodyScrollcontainer: {
    width: "100%",
  },
  scrollContent: {
    flex:1,
    width: "90%",
    borderWidth: 2,
    borderColor: "#e4eded",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: "20%",
  },
  topContainer: {
    paddingTop: "5%",
    width: "100%",
    paddingHorizontal: "5%",
    justifyContent: 'center',
  },

  bottomButtonContainer: {
    width: "90%",
    marginBottom: 20,
  },

  singleField: {
    height: 45,
    marginBottom: "2%",
    fontFamily: "Monsterrant",
  },

  container:{
    justifyContent: 'center',
    alignItems: 'center',

  },
});

const theme = { ...DefaultTheme, roundness: 30, myOwnProperty: true, fonts: { regular: { fontFamily: 'MontserrantSemiBold', fontWeight: 'normal' } }, colors: { myOwnColor: '#303a52', primary: '#0692d4', text: '#303a52' } }

export default ModificaCleanService = ({ route, navigation }) => {

  const user = route.params.user;
  const id = route.params.id;
  const isFocused = useIsFocused();
  const [ditta, setDitta] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [IsEditable, setIsEditable] = useState(false);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertNoAction, setShowAlertNoAction] = useState(false); //usato per indicare che NON deve fare niente se preme Ok
  const [dataAssunzione, setDataAssunzione] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      async function getData() {
        let cleanService = await CleanServiceModel.getCleanServiceById(id);
        setDitta(cleanService.ditta);
        setEmail(cleanService.email);
        setTelefono(cleanService.numeroTel);
        setDataAssunzione((new Date(cleanService.dataAssunzione.seconds * 1000)).toLocaleString("it-IT").split(",")[0]);
      }
      getData();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [isFocused])
  );

  //funzione per verificare che tutti i campi siano stati inseriti (controllo generale)
	const validateFormField = () => {
		var flag = true; //tutti i campi sono compilati
		var message = "Attenzione!! Uno dei campi obbligatori è vuoto. Si prega di compilare il campo ";
		if (ditta === "") {
			message += "\"Ditta\"";
			flag = false;
		} else if (email === "") {
			message += "\"Email\"";
			flag = false;
		} else if (telefono === "") {
			message += "\"Telefono\"";
			flag = false;
		} else if (dataAssunzione === "") {
			message += "\"Data assunzione\"";
			flag = false;
		}
		if (!flag) {
			setMessage(message);
			setShowAlertNoAction(true);
		}
		return flag;
	}

  return (
    <View style={styles.maincontainer}>
      <HeaderBar title="Ditta pulizie" navigator={navigation} />
      <ScrollView 
          style={styles.bodyScrollcontainer}
          contentContainerStyle={styles.container}>
        <View style={styles.scrollContent}>
          <View style={styles.topContainer}>
            <TextInput
              mode='outlined'
              label='Ditta'
              disabledInputStyle={{ color: "#303a52" }}
              style={styles.singleField}
              editable={IsEditable}
              value={ditta}
              onChangeText={(testo) => setDitta(testo)}
              theme={theme}
              placeholder='Ditta'
            />

            <TextInput
              mode='outlined'
              label='Email'
              disabledInputStyle={{ color: "#303a52" }}
              style={styles.singleField}
              editable={IsEditable}
              value={email}
              onChangeText={(testo) => setEmail(testo)}
              theme={theme}
              placeholder='Email'
            />

            <TextInput
              mode='outlined'
              label='Telefono'
              disabledInputStyle={{ color: "#303a52" }}
              style={styles.singleField}
              editable={IsEditable}
              value={telefono}
              onChangeText={(testo) => setTelefono(testo)}
              theme={theme}
              placeholder='Telefono'
            />

            <DatePickerInputField
                  styleContainer={{ borderColor: '#303a52', borderRadius: 25, marginTop: 14 }}
                  styleField={{ width: "85%" }}
                  date={(dataAssunzione === "") ? "" : (new Date(dataAssunzione).toDateString("it-IT"))}
                  setDate={setDataAssunzione}
                  placeholder={"Data assunzione"}
                  disabled={!IsEditable} 
            />
          </View>
          <View style={styles.bottomButtonContainer}>
            <CustomButton 
              styleBtn={{ marginTop: 10, width: "100%" }} 
              nome= {IsEditable ? 'Applica' : "Modifica"}
              onPress={() => {
                async function updateCleanService() {
                  await CleanServiceModel.updateCleanServiceDocument(id, email, telefono, ditta, dataAssunzione, user.userIdRef);
                  setMessage("Le modifiche sono state apportate correttamente!");
                  setShowAlert(true);
                  IsEditable ? setIsEditable(false) : setIsEditable(true);
                }
                if (IsEditable) {
                  //Verifica che tutti i campi siano riempiti
                  if (!validateFormField()) {
                    return;
                  }
                  updateCleanService();
                }else{
                  IsEditable ? setIsEditable(false) : setIsEditable(true);
                }
              }
            } />
          </View>
        </View>
      </ScrollView>
      <CustomAlertGeneral
        visibility={showAlert}
        titolo="Modifica ditta pulizie"
        testo= {message}
        hideNegativeBtn={true}
        buttonName="Ok"
        onOkPress={()=>{ 
          setShowAlert(false); 
          navigation.goBack();
        }} />
      <CustomAlertGeneral
        visibility={showAlertNoAction}
        titolo="Modifica ditta pulizie"
        testo= {message}
        hideNegativeBtn={true}
        buttonName="Ok"
        onOkPress={()=>{ 
          setShowAlertNoAction(false);  
      }} />
    </View>
  )
}
