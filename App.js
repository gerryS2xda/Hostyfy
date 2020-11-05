import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from "./src/screen/Login"
import HomeHostScreen from "./src/screen/Home_host"
import RegPersonalData from "./src/screen/RegistrazioneDatiPersonali"
import RegResidenceData from "./src/screen/RegistrazioneDatiResidenza"


const navigator = createStackNavigator(
  {
    Home: LoginScreen,
    HomeHost: HomeHostScreen,
    RegistrationPersonalData: RegPersonalData,
    RegistrationResidenzaData: RegResidenceData
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "Hostyfy"
    }
  }
);
export default createAppContainer(navigator);
