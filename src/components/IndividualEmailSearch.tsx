import { Center, Text, useColorModeValue, View } from 'native-base'
import React from 'react'
import colors from '../utils/colors';

interface IndividualEmailSearchProps {

}

export const IndividualEmailSearch: React.FC<IndividualEmailSearchProps> = ({ }) => {
    return (
        <View h={'full'} borderTopColor={useColorModeValue(colors.lightGray, colors.ebony)} borderTopWidth={'1'} backgroundColor={useColorModeValue(colors.lightGray, colors.ebony)}>
            <Center>
                <Text> Individual Email Search</Text>
            </Center>
        </View>
    );
}