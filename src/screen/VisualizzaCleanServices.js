import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import HeaderBar from '../components/CustomHeaderBar';
import CustomButton from '../components/CustomButton';
import * as CleanServiceModel from "../firebase/datamodel/CleanServiceModel"
import CustomListViewGeneralCleanServices from '../components/CustomListViewGeneralCleanServices';

const VisualizzaCleanServices = ({route, navigation}) => {  

      const {user,isHost} = route.params; 
      const [list, setList] = useState([]);
      const isFocused = useIsFocused();

      useFocusEffect(
        React.useCallback(() => {
          async function getData(){
              let docs = await CleanServiceModel.getCleanServiceByHost(user.userIdRef); //NOTA: per guest usare 'user.userId'
              var itemList = [];
              var count = 1;
              if(docs.length==0){
                setList(itemList);
              }
              else{
                for(const doc of docs){
                    var oggetto = {
                        key: count, 
                        title: doc.data().ditta,
                        newPage: 'CleanService',
                        cleanServiceId: doc.id,
                    }
                    itemList.push(oggetto)              
                    count++;
                    
                }
                console.log(itemList);
                setList(itemList);
              }                        
        }
          getData();
          return () => {
            // Do something when the screen is unfocused
            // Useful for cleanup functions
          };
        }, [isFocused])
      );
    
      return (
        <View style={styles.maincontainer}>
          <HeaderBar title="Clean Services" navigator={navigation} /> 
          <View style={styles.container}>
                <CustomListViewGeneralCleanServices
                    nav = {navigation}
                    itemList={list}
                    user = {user}
                  />
                <View style={styles.buttonContainer}>
                  <CustomButton
                      styleBtn={{width: "90%"}} 
                      nome="Inserisci clean service" 
                      onPress={() => {
                          navigation.navigate("InserisciCleanService", {user:user});
                        }
                      }
                    />
              </View>
          </View>
      </View>      
    );
}

export default VisualizzaCleanServices;

//Style
const styles = StyleSheet.create({
  maincontainer: {
		flex: 1,
		backgroundColor: '#fff',
	},
  container: {
    flex: 1,
  },

  aggiungiStruttura:{
    flexDirection: "column-reverse",
    alignItems: 'flex-end',
    marginBottom: "5%",
    marginRight: "3%",
  },

  buttonContainer: {
    width: "100%", 
    alignItems: "center",
    justifyContent: 'center',
    marginTop: "5%",
    marginBottom: "5%",
  }

});

