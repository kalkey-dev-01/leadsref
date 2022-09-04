import { View, Text, Box, Center } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppContainer from './src/components/AppContainer';
import { LoginScreen } from './src/screens/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack'
import { RegisterScreen } from './src/screens/RegisterScreen';

import { HomeScreen } from './src/screens/HomeScreen';
import { FirstScreen } from './src/screens/FirstScreen';
import AuthNav from './src/Auth/AuthNav';



const Stack = createStackNavigator()
export default function App() {

  return (
    <AppContainer>
      <AuthNav />
    </AppContainer>
  );
}


