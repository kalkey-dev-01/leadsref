import { Box, Heading, HStack, useColorModeValue } from 'native-base'
import React from 'react'
import { BackspaceIcon, CogIcon as SettingsIcon } from 'react-native-heroicons/outline';
import colors from '../utils/colors';
import ThemeToggle from '../utils/theme-toggle';

import { useNavigation } from '@react-navigation/native'

interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = ({ }) => {
    const nav = useNavigation()
    

    return (

        <Box backgroundColor={useColorModeValue(colors.gray, colors.ebony)}>
            <HStack alignItems={'center'} justifyContent={'space-evenly'}>
                <Heading>
                    Leadistro
                </Heading>
               
                <SettingsIcon color={useColorModeValue(colors.ebony, colors.lightGray)} onPress={() => nav.navigate('settings' as never)} />
            </HStack>
        </Box>
    );
}