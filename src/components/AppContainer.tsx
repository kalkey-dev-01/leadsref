import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import theme from '../utils/theme'


type Props = {
    children: React.ReactNode
}

export default function AppContainer(props: Props) {
    return (
        <NavigationContainer>
            <NativeBaseProvider theme={theme}>
                {props.children}
            </NativeBaseProvider>
        </NavigationContainer>
    );
}
