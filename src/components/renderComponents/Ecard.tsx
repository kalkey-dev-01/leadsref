import { Box, HStack, useColorModeValue, VStack } from 'native-base'
import React from 'react'
import { UserCircleIcon } from 'react-native-heroicons/solid';
import colors from '../../utils/colors';
import { Fonts, StyledText } from '../../utils/fontText';
import { RootObject } from './EnrichCard';


interface EcardProps {
    item: RootObject
}

export const Ecard: React.FC<EcardProps> = ({ item }) => {
    return (
        <VStack alignItems={'center'}>
            <HStack alignItems={'flex-start'} justifyContent={'space-between'} >
                <UserCircleIcon color={useColorModeValue(colors.ebony, colors.white)} size={50} />
                <Box>
                    <HStack space={1}>
                        <StyledText fontSize={22} content={item.first_name} fontFamily={Fonts.RwMed} />
                        <StyledText fontSize={22} content={item.last_name} fontFamily={Fonts.RwReg} />
                    </HStack>
                </Box>

            </HStack>
        </VStack>
    );
}