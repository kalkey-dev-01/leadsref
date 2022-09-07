import { Center, Text, useColorModeValue, View } from 'native-base'
import React from 'react'
import colors from '../utils/colors';

interface SimilarDomainSearchProps {

}

export const SimilarDomainSearch: React.FC<SimilarDomainSearchProps> = ({ }) => {
    return (
        <View h={'full'} borderTopColor={useColorModeValue(colors.lightGray, colors.ebony)} borderTopWidth={'1'} backgroundColor={useColorModeValue(colors.lightGray, colors.ebony)}>
            <Center>
                <Text>Similar Domain Search</Text>
            </Center>
        </View>
    );
}