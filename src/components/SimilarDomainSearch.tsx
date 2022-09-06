import { Text, useColorModeValue, View } from 'native-base'
import React from 'react'
import colors from '../utils/colors';

interface SimilarDomainSearchProps {

}

export const SimilarDomainSearch: React.FC<SimilarDomainSearchProps> = ({ }) => {
    return (
        <View h={'full'} backgroundColor={useColorModeValue(colors.gray , colors.coolGray)}>
            <Text>SimilarDomainSearch</Text>
        </View>
    );
}