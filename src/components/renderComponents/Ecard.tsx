import { Box, HStack, useColorModeValue, VStack } from 'native-base'
import React from 'react'
import { UserCircleIcon, MailIcon, AtSymbolIcon, ExclamationCircleIcon, PhoneIcon, GlobeIcon, GlobeAltIcon, MapIcon, LinkIcon, IdentificationIcon, KeyIcon, UsersIcon, TableIcon } from 'react-native-heroicons/outline';
import colors from '../../utils/colors';
import { Fonts, StyledText } from '../../utils/fontText';
import { RootObject } from './EnrichCard';
import { Linking } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Alert } from 'react-native'

interface EcardProps {
    item: RootObject
}

export const Ecard: React.FC<EcardProps> = ({ item }) => {
    const icoCol = useColorModeValue(colors.ebony, colors.lightGray)

    return (
        <>
            <VStack alignItems={'flex-start'} space={1} px={2.5} py={1.5}>
                <HStack alignItems={'center'} w={'full'} justifyContent={'space-between'} justifyItems={'center'} >

                    <Box>
                        <HStack space={1}>
                            <StyledText fontSize={22} content={item.first_name} fontFamily={Fonts.RwMed} />
                            <StyledText fontSize={22} content={item.last_name} fontFamily={Fonts.RwReg} />
                        </HStack>
                    </Box>
                    <UserCircleIcon color={useColorModeValue(colors.ebony, colors.white)} size={50} />

                </HStack>
                {
                    item.job_title &&
                    <HStack alignItems={'center'} space={'2'}>
                        <IdentificationIcon color={icoCol} size={22.5} />
                        <StyledText content={item.job_title} fontFamily={Fonts.RwSemiBold} fontSize={12} py={1} pb={1} pr={5} numofLines={1} />
                    </HStack>
                }
                {
                    item.location &&
                    <HStack alignItems={'center'} space={'2'}>
                        <MapIcon color={icoCol} size={22.5} />
                        <StyledText content={item.location} fontFamily={Fonts.RwBold} fontSize={14} py={1} pb={1} numofLines={1} />
                    </HStack>
                }
                {
                    item.business_email &&
                    <HStack alignItems={'center'} space={'2'}>
                        <MailIcon color={icoCol} size={22.5} />
                        <StyledText content={item.business_email} fontFamily={Fonts.RwMed} fontSize={14} py={1} pb={1} numofLines={1} />
                    </HStack>
                }
                {
                    item.personal_email !== ""
                        ?
                        <>
                            <HStack alignItems={'center'} space={'2'}>
                                <AtSymbolIcon color={icoCol} size={22.5} />
                                <StyledText content={item.personal_email} fontFamily={Fonts.RwBlack} fontSize={15} py={1} pb={1} numofLines={1} />
                            </HStack>
                        </>
                        :
                        <>
                            <HStack alignItems={'center'} space={'2'}>
                                <AtSymbolIcon color={icoCol} size={22.5} />
                                <ExclamationCircleIcon color={icoCol} size={22.5} />
                                <StyledText content='Personal Email not Provided in Company' fontFamily={Fonts.RwReg} fontSize={14} />
                            </HStack>
                        </>
                }
                {
                    item.phone !== ""
                        ?
                        <>
                            <HStack alignItems={'center'} space={'2'}>
                                <PhoneIcon color={icoCol} size={22.5} />
                                <StyledText content={item.phone} fontFamily={Fonts.RwSemiBold} fontSize={15} py={1} pb={1} numofLines={1} />
                            </HStack>
                        </>
                        :
                        <>
                            <HStack alignItems={'center'} space={'2'}>
                                <PhoneIcon color={icoCol} size={22.5} />
                                <ExclamationCircleIcon color={icoCol} size={22.5} />
                                <StyledText content='No Personal Number Provided to Company' fontFamily={Fonts.RwBold} py={1} pb={1} numofLines={1} fontSize={12} />
                            </HStack>
                        </>
                }

                {
                    item.social_url && item.social_url.toString().includes('sales') === true && item.connections_count === ''
                        ?
                        <>
                            {/* Normal Linked In Profile */}

                            <TouchableOpacity onPress={
                                React.useCallback(async () => {
                                    let supported = await Linking.canOpenURL(item.social_url.toString())
                                    if (supported) {
                                        await Linking.openURL(item.social_url.toString())
                                    } else {
                                        Alert.alert(`This Social Url seems faulty`)
                                    }
                                }, [item.social_url])
                            }>
                                <HStack alignItems={'center'} space={'2'}>
                                <LinkIcon color={icoCol} size={22.5} />
                                <TableIcon color={icoCol} size={22.5} />
                                    
                                    <StyledText content={`LinkedIn Sales Navigator`} fontFamily={Fonts.RwExBold} fontSize={15} py={1} pb={1} numofLines={1} />
                                </HStack>
                            </TouchableOpacity>
                        </>
                        :
                        <>
                            {/* Sales Navigator Logo */}
                            <TouchableOpacity onPress={
                                React.useCallback(async () => {
                                    let supported = await Linking.canOpenURL(item.social_url.toString())
                                    if (supported) {
                                        await Linking.openURL(item.social_url.toString())
                                    } else {
                                        Alert.alert(`This Social Url seems faulty`)
                                    }
                                }, [item.social_url])
                            }>
                                <HStack alignItems={'center'} space={'2'}>
                                    <LinkIcon color={icoCol} size={22.5} />
                                    <UsersIcon color={icoCol} size={22.5} />
                                    <StyledText content={`LinkedIn Profile & connection ${item.connections_count}`} fontFamily={Fonts.RwBold} py={1} pb={1} numofLines={1} fontSize={15} />
                                </HStack>
                            </TouchableOpacity>
                        </>
                }
                {
                    item.keywords && item.keywords.map((items, index) => {
                        <HStack alignItems={'center'} space={2}>
                            <KeyIcon color={icoCol} size={22.5} />
                            <StyledText key={index} content={items} fontFamily={Fonts.RwBold} py={1} pb={1} numofLines={1} fontSize={15} />
                        </HStack>
                    })
                }


            </VStack>
        </>
    );
}