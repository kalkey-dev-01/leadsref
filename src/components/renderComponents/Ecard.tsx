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
        <>
            <VStack alignItems={'flex-start'} space={0.5} px={2.5} py={1.5}>
                <HStack alignItems={'center'} w={'full'} justifyContent={'space-between'} justifyItems={'center'} >

                    <Box>
                        <HStack space={1}>
                            <StyledText fontSize={22} content={item.first_name} fontFamily={Fonts.RwMed} />
                            <StyledText fontSize={22} content={item.last_name} fontFamily={Fonts.RwReg} />
                        </HStack>
                    </Box>
                    <UserCircleIcon color={useColorModeValue(colors.ebony, colors.white)} size={50} />

                </HStack>
                {item.job_title && <StyledText content={item.job_title} fontFamily={Fonts.RwBold} fontSize={12} />}
                {item.location && <StyledText content={item.location} fontFamily={Fonts.RwSemiBold} fontSize={16} />}
                {item.business_email && <StyledText content={item.business_email} fontFamily={Fonts.RwSemiBold} fontSize={14} /> }
            </VStack>
        </>
    );
}