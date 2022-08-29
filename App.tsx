import { View, Text, Box, Center } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppContainer from './src/components/AppContainer';
import { LoginScreen } from './src/screens/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack'
import { RegisterScreen } from './src/screens/RegisterScreen';



const Stack = createStackNavigator()
export default function App() {

  return (
    <AppContainer>
      <Stack.Navigator initialRouteName='login' screenOptions={{ header: () => null }}>
        <Stack.Screen name='login' component={LoginScreen} />
        <Stack.Screen name='register' component={RegisterScreen} />
      </Stack.Navigator>
    </AppContainer>
  );
}


