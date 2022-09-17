import { Box, Button, Circle, HStack, PresenceTransition, useColorModeValue, VStack } from 'native-base'
import React from 'react'
import { UserCircleIcon, MailIcon, AtSymbolIcon, ExclamationCircleIcon, PhoneIcon, GlobeIcon, GlobeAltIcon, MapIcon, LinkIcon, IdentificationIcon, KeyIcon, UsersIcon, TableIcon, ArrowCircleDownIcon } from 'react-native-heroicons/outline';
import colors from '../../utils/colors';
import { Fonts, StyledText } from '../../utils/fontText';
import { RootObject } from './EnrichCard';
import { Linking } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Alert, } from 'react-native'
import { MotiView } from 'moti';
import { AnimatePresence } from 'moti/build';



interface EcardProps {
    item: RootObject
}

export const Ecard: React.FC<EcardProps> = ({ item }) => {
    const icoCol = useColorModeValue(colors.ebony, colors.lightGray)
    const [show, setShow] = React.useState<boolean>(false)
    const [show1, setShow1] = React.useState<boolean>(false)
    const [show2, setShow2] = React.useState<boolean>(false)

    return (
        <>
            <VStack alignItems={'flex-start'} space={1} px={2.5} py={1.5}>

                <HStack alignItems={'center'} w={'full'} justifyContent={'space-between'} justifyItems={'center'} >

                    <Box>
                        <HStack space={1}>
                            <StyledText fontSize={'2xl'} content={item.first_name} fontFamily={Fonts.RwMed} />
                            <StyledText fontSize={'2xl'} content={item.last_name} fontFamily={Fonts.RwReg} />
                        </HStack>
                    </Box>
                    {
                        item.picture !== '' ?
                            <UserCircleIcon color={useColorModeValue(colors.ebony, colors.lightGray)} size={50} />
                            : <UserCircleIcon color={useColorModeValue(colors.ebony, colors.white)} size={50} />
                    }

                </HStack>
                {
                    item.job_title &&
                    <HStack alignItems={'center'} space={'2'}>
                        <IdentificationIcon color={icoCol} size={22.5} />
                        <StyledText content={item.job_title} fontFamily={Fonts.RwSemiBold} fontSize={'md'} isTrunc={true} py={1} pb={1} pr={5} numofLines={1} />
                    </HStack>
                }
                {
                    item.location &&
                    <HStack alignItems={'center'} space={'2'}>
                        <MapIcon color={icoCol} size={22.5} />
                        <StyledText content={item.location} fontFamily={Fonts.RwBold} fontSize={'sm'} py={1} pb={1} numofLines={1} />
                    </HStack>
                }
                {
                    item.business_email &&
                    <HStack alignItems={'center'} space={'2'}>
                        <MailIcon color={icoCol} size={22.5} />
                        <StyledText content={item.business_email} fontFamily={Fonts.RwMed} fontSize={'sm'} py={1} pb={1} numofLines={1} />
                    </HStack>
                }
                {
                    item.personal_email !== ""
                        ?
                        <>
                            <HStack alignItems={'center'} space={'2'}>
                                <AtSymbolIcon color={icoCol} size={22.5} />
                                <StyledText content={item.personal_email} fontFamily={Fonts.RwLight} fontSize={'lg'} py={1} pb={1} numofLines={1} />
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
                                <StyledText content={item.phone} fontFamily={Fonts.RwSemiBold} fontSize={'md'} py={1} pb={1} numofLines={1} />
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

                {item.social_url !== false ?
                    <>
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
                                                Alert.alert(`This LinkedIn Url seems faulty`, 'This Person might not have a LinkedIn Account',)
                                            }
                                        }, [item.social_url])
                                    }>
                                        <HStack alignItems={'center'} space={'2'}>
                                            <LinkIcon color={icoCol} size={22.5} />
                                            <TableIcon color={icoCol} size={22.5} />

                                            <StyledText content={`LinkedIn Sales Navigator`} fontFamily={Fonts.RwExBold} fontSize={'sm'} py={1} pb={1} numofLines={1} />
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
                                                Alert.alert(`This LinkedIn Url seems faulty`, 'This Person might not have a LinkedIn Account', [
                                                    {
                                                        text: 'Okay I understand',
                                                        style: 'cancel'
                                                    }
                                                ],)
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
                    </>
                    : null
                }
                {
                    item.keywords.length > 0
                        ?
                        <VStack alignItems={'flex-start'} space={0.5}>
                            <TouchableOpacity onPress={React.useCallback(() => {
                                setShow1(!show1)
                            }, [show1])}>
                                <HStack alignItems={'center'} space={2}>
                                    <KeyIcon color={icoCol} size={22.5} />
                                    <StyledText pb={0.5} content='Keywords' fontSize={'md'} fontFamily={Fonts.RwBold} />
                                    <ArrowCircleDownIcon color={icoCol} size={15} />

                                </HStack>
                            </TouchableOpacity>
                            {show1 &&
                                item.keywords.map((item, index) => (
                                    <AnimatePresence key={index}>
                                        <MotiView from={{
                                            opacity: 0,
                                            translateY: -15
                                        }}
                                            animate={{
                                                opacity: 1,
                                                translateY: 0
                                            }}
                                            exit={{
                                                opacity: 0,
                                                translateY: -15
                                            }}
                                            transition={{
                                                type: 'spring'
                                            }} >
                                            <HStack key={index} alignItems={'center'} space={2}>
                                                <Circle bgColor={icoCol} size={7.5} mx={2} />
                                                <StyledText content={item} fontFamily={Fonts.RwSemiBold} fontSize={'sm'} pb={1} numofLines={1} />
                                            </HStack>
                                        </MotiView>
                                    </AnimatePresence>
                                ))

                            }

                        </VStack>
                        :
                        null
                }
                {
                    item.past_company.length > 0
                        ?
                        <VStack alignItems={'flex-start'} space={0.5}>
                            <TouchableOpacity onPress={React.useCallback(() => {
                                setShow2(!show2)
                            }, [show2])}>
                                <HStack alignItems={'center'} space={2}>
                                    <KeyIcon color={icoCol} size={22.5} />
                                    <StyledText pb={0.5} content='Past Companies' fontSize={'md'} fontFamily={Fonts.RwBold} />
                                    <ArrowCircleDownIcon color={icoCol} size={15} />

                                </HStack>
                            </TouchableOpacity>
                            {show2 &&
                                item.past_company.map((item, index) => (
                                    <AnimatePresence key={index}>
                                        <MotiView from={{
                                            opacity: 0,
                                            translateY: -15
                                        }}
                                            animate={{
                                                opacity: 1,
                                                translateY: 0
                                            }}
                                            exit={{
                                                opacity: 0,
                                                translateY: -15
                                            }}
                                            transition={{
                                                type: 'spring'
                                            }} >
                                            <HStack key={index} alignItems={'center'} space={2}>
                                                <Circle bgColor={icoCol} size={7.5} mx={2} />
                                                <StyledText content={item} fontFamily={Fonts.RwSemiBold} fontSize={'sm'} pb={1} numofLines={1} />
                                            </HStack>
                                        </MotiView>
                                    </AnimatePresence>
                                )
                                )

                            }

                        </VStack>
                        :
                        null
                }
                {
                    item.skills.length > 0
                        ?
                        <VStack alignItems={'flex-start'} space={0.5}>
                            <TouchableOpacity onPress={React.useCallback(() => {
                                setShow(!show)
                            }, [show])}>
                                <HStack alignItems={'center'} space={2}>
                                    <KeyIcon color={icoCol} size={22.5} />
                                    <StyledText pb={0.5} content='Skills' fontSize={'md'} fontFamily={Fonts.RwBold} />
                                    <ArrowCircleDownIcon color={icoCol} size={15} />

                                </HStack>
                            </TouchableOpacity>
                            {show &&
                                item.skills.map((item, index) => (
                                    <AnimatePresence key={index}>
                                        <MotiView from={{
                                            opacity: 0,
                                            translateY: -15
                                        }}
                                            animate={{
                                                opacity: 1,
                                                translateY: 0
                                            }}
                                            exit={{
                                                opacity: 0,
                                                translateY: -15
                                            }}
                                            transition={{
                                                type: 'spring'
                                            }} >
                                            {item !== ''
                                                ?
                                                <HStack key={index} alignItems={'center'} space={2}>
                                                    <Circle bgColor={icoCol} size={7.5} mx={2} />
                                                    <StyledText content={item} fontFamily={Fonts.RwSemiBold} fontSize={'sm'} pb={1} numofLines={1} />
                                                </HStack>
                                                : null
                                            }
                                        </MotiView>
                                    </AnimatePresence>
                                )
                                )

                            }

                        </VStack>
                        :
                        null
                }

            </VStack>
        </>
    );
}