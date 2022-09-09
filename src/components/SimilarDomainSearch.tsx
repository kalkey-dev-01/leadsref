import { Center, Text, useColorModeValue, View } from 'native-base'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import colors from '../utils/colors';

interface SimilarDomainSearchProps {

}

export const SimilarDomainSearch: React.FC<SimilarDomainSearchProps> = ({ }) => {
    return (
        <KeyboardAwareScrollView style={{ backgroundColor: useColorModeValue(colors.lightGray, colors.ebony), height: '100%' }} enableOnAndroid={true}>
            <View h={'full'}   backgroundColor={useColorModeValue(colors.lightGray, colors.ebony)}>
            
            </View>
        </KeyboardAwareScrollView>
    );
}