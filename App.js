import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from "./src/screen/Login"
import HomeHostScreen from "./src/screen/Home_host"
import RegPersonalData from "./src/screen/RegistrazioneDatiPersonali"
import RegResidenceData from "./src/screen/RegistrazioneDatiResidenza"
import Inserisci_prenotazione from "./src/screen/Inserisci_prenotazione"

const navigator = createStackNavigator(
  {
    Home: LoginScreen,
    HomeHost: HomeHostScreen,
    RegistrationPersonalData: RegPersonalData,
    RegistrationResidenzaData: RegResidenceData,
    Inserisci: Inserisci_prenotazione
  },
  {
    initialRouteName: "Home"
  }
);
export default createAppContainer(navigator);
