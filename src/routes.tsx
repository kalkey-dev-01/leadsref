import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { FirstScreen } from './screens/FirstScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { HomeScreen } from './screens/HomeScreen';





const Stack = createStackNavigator()

export const SignedInStack = () => {

    return (
        <Stack.Navigator initialRouteName='home' screenOptions={{ header: () => null }}>
            <Stack.Screen name='home' component={HomeScreen} />
        </Stack.Navigator>
    );
}

export const SignedOutStack = () => {
    return (
        <Stack.Navigator initialRouteName='first' screenOptions={{ header: () => null }}>
            <Stack.Screen name='first' component={FirstScreen} />
            <Stack.Screen name='login' component={LoginScreen} />
            <Stack.Screen name='register' component={RegisterScreen} />
        </Stack.Navigator>
    );
}

