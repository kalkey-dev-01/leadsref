import { Box, Heading, HStack, useColorModeValue } from 'native-base'
import React from 'react'
import { BackspaceIcon } from 'react-native-heroicons/outline';
import colors from '../utils/colors';
import ThemeToggle from '../utils/theme-toggle';
import { firebase } from '../../firebase'

interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = ({ }) => {
    const handleSignOut = async () => {
        try {
            await firebase.auth().signOut()
            console.log('Signed Out Success');
        } catch (error: any) {
            console.log(error.message);

        }
    }

    return (
    
        <Box backgroundColor={useColorModeValue(colors.gray, colors.ebony)}>
            <HStack alignItems={'center'} justifyContent={'space-evenly'}>
                <Heading>
                    Leadistro
                </Heading>
                <ThemeToggle />
                <BackspaceIcon color={useColorModeValue(colors.ebony, colors.lightGray)} onPress={handleSignOut} />
            </HStack>
        </Box>
    );
}