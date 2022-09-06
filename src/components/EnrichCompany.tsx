import { Center, Text, useColorModeValue, View } from 'native-base'
import React from 'react'
import { BackspaceIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../utils/colors';
import { firebase } from '../../firebase'

interface EnrichCompanyProps {

}

export const EnrichCompany: React.FC<EnrichCompanyProps> = ({ }) => {
    
    return (
        <View h={'full'} backgroundColor={useColorModeValue(colors.lightGray, colors.ebony)}>
            <Center>
                <Text>HomeScreen</Text>
            </Center>
        </View>

    );
}