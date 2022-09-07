import { Box, Center, Spacer, Text, useColorModeValue, View } from 'native-base'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/Header';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { MailIcon as MailSO, GlobeIcon as CompO, IdentificationIcon as UserO } from 'react-native-heroicons/outline'
import { MailIcon as MailS, GlobeIcon as Comp, IdentificationIcon as UserG } from 'react-native-heroicons/solid'
import colors from '../utils/colors';
import { SimilarDomainSearch } from '../components/SimilarDomainSearch';
import { EnrichCompany } from '../components/EnrichCompany';
import { IndividualEmailSearch } from '../components/IndividualEmailSearch';




interface HomeScreenProps {

}
const HomeScreenTopTabs = () => {
    const Tab = createMaterialTopTabNavigator()
    const IconColor = useColorModeValue(colors.ebony, 'white')
    return (

        <Tab.Navigator initialRouteName='enco' screenOptions={{
            tabBarContentContainerStyle: { backgroundColor: useColorModeValue(colors.lightGray, colors.ebony), borderRadius: 100, },
            tabBarIndicatorStyle: { backgroundColor: useColorModeValue(colors.ebony, 'white') },
            tabBarStyle: { elevation: 0 },
        }} >
            <Tab.Screen options={{
                tabBarIcon: ({ focused }) => 
                (focused ? <Comp size={27.5} color={IconColor} /> : <CompO size={27.5} color={IconColor} />),
                tabBarShowLabel: false
            }} name='ccn' component={SimilarDomainSearch} />
            <Tab.Screen options={{
                tabBarIcon: ({ focused }) =>
                    (focused ? <UserG size={27.5} color={IconColor} /> : <UserO size={27.5} color={IconColor} />),
                tabBarShowLabel: false
            }} name='enco' component={EnrichCompany} />
            <Tab.Screen options={{
                tabBarIcon: ({ focused }) =>
                    (focused ? <MailS size={27.5} color={IconColor} /> : <MailSO size={27.5} color={IconColor} />),
                tabBarShowLabel: false
            }} name='fnlnd' component={IndividualEmailSearch} />
        </Tab.Navigator>

    )
}
export const HomeScreen: React.FC<HomeScreenProps> = ({ }) => {

    return (
        <>
            <SafeAreaView style={{ backgroundColor: useColorModeValue(colors.lightGray, colors.ebony) }}>
                <Header />
            </SafeAreaView>
            <HomeScreenTopTabs />
        </>
    );
}