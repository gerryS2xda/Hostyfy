/* 
    install this dependency before run: 
    1. npm install @react-navigation/native 
    2. npm install @react-navigation/drawer
    Swipe right to open
*/

import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from "./src/screen/Login"
import HomeHostScreen from "./src/screen/Home_host"
import Registrazione from "./src/screen/Registrazione"
import Inserisci_prenotazione from "./src/screen/Inserisci_prenotazione"
import LeMieStrutture from "./src/screen/LeMieStrutture"

const Drawer = createDrawerNavigator();

const DrawerMenu = () => {
    return(
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen 
                  name="Home" 
                  component={LoginScreen} 
                  options={{
                    title: 'Home',
                    drawerIcon: ({ focused, size }) => {
                      <Image
                        source={require('../../assets/home.png')}
                        style={[focused ? styles.drawerActive : styles.drawerInActive, { height: size, width: size }]}
                      />
                  }}} 
                />
                <Drawer.Screen name="Area personale" component={NotificationsScreen} options={{ drawerLabel: 'Home' }} />
                <Drawer.Screen name="Prenotazioni" component={NotificationsScreen} />
                <Drawer.Screen name="Le mie chiavi digitali" component={NotificationsScreen} />
                <Drawer.Screen name="Upgrade Host" component={NotificationsScreen} />
                <Drawer.Screen name="Logout" component={NotificationsScreen} />
            </Drawer.Navigator>
    );
}
export default DrawerMenu;



