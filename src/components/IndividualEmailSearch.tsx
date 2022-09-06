import { Text, useColorModeValue, View } from 'native-base'
import React from 'react'
import colors from '../utils/colors';

interface IndividualEmailSearchProps {

}

export const IndividualEmailSearch: React.FC<IndividualEmailSearchProps> = ({ }) => {
    return (
        <View h={'full'} backgroundColor={useColorModeValue(colors.gray, colors.coolGray)}>
            <Text>SimilarDomainSearch</Text>
        </View>
    );
}