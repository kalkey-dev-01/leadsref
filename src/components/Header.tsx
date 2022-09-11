import { Box, Heading, HStack, Text, useColorModeValue } from 'native-base'
import React from 'react'
import { BackspaceIcon, CogIcon as SettingsIcon } from 'react-native-heroicons/outline';
import colors from '../utils/colors';

import { useNavigation } from '@react-navigation/native'



interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = ({ }) => {
    const nav = useNavigation()
   
 
    return (
        <Box borderBottomWidth={'2'} mt={'0.5'} borderBottomColor={useColorModeValue(colors.ebony, colors.lightGray)} backgroundColor={useColorModeValue(colors.lightGray, colors.ebony)}>
            <HStack alignItems={'center'}   justifyContent={'space-evenly'}>
                <Text fontSize={30} style={{fontFamily: 'Raleway_700Bold'}}>
                    Leadistro
                </Text>
                <SettingsIcon size={27.5} color={useColorModeValue(colors.ebony, colors.lightGray)} onPress={() => nav.navigate('settings' as never)} />
            </HStack>
        </Box>
    );
}