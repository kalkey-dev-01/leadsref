
import React from 'react'
import { Text, Box, VStack, useColorMode, useTheme, themeTools, Center, useColorModeValue, HStack, Flex, Spacer, Pressable, View, Heading, Stack, Image, AspectRatio, Button, Icon, Divider, Circle } from 'native-base'


import ThemeToggle from '../utils/theme-toggle';
import colors from '../utils/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'
import { MailIcon } from 'react-native-heroicons/outline'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Fonts, StyledText } from '../utils/fontText';

interface FirstScreenProps {

}

export const FirstScreen: React.FC<FirstScreenProps> = ({ }) => {

    const nav = useNavigation()
    return (
        <SafeAreaView style={{ backgroundColor: colors.ebony }}>

            <View bg={colors.ebony} h={'full'} >
                {/* Image */}
                <Center mt={'5'}>
                    <Image source={require('../../assets/leedVec.png')} alt={'lOGO'} h={220} w={350} />
                </Center>
                <Center mt={5}>
                    <StyledText textAlign={'center'} content='Leadistro' fontFamily={Fonts.RwBlack} letterSpacing={1.5} fontSize={'3xl'} />
                </Center>
                <Center mx={'10'} mt={'1.5'}>
                    <StyledText content={`Research the Perfect candidates, Save Lists of prospects, send customized cold emails.`} mb={0.5} textAlign={'center'} fontSize={'lg'} fontFamily={Fonts.RwExLight} />
                </Center>
                <Box mb={'5'}>
                    <TouchableOpacity onPress={() => nav.navigate('login' as never)}>
                        <Center mx={'5'} mt={'5'}>
                            <HStack alignItems={'center'} space={'1.5'} bg={colors.gray} rounded={'full'} pl={'3.5'}>
                                <MailIcon color={colors.ebony} />
                                <Button rounded={'full'} size={'lg'} color={colors.gray} variant={'solid'} bgColor={colors.coolGray}>
                                    <StyledText content='Login with Email and Password' mb={0.5} fontFamily={Fonts.RwBold} />
                                </Button>
                            </HStack>
                        </Center>
                    </TouchableOpacity>
                </Box>


                <Divider color={colors.lightGray} mt={'5'} />

                <HStack alignItems={'center'} justifyContent={'space-evenly'} space={'1.5'} my={'10'} >
                    <TouchableOpacity>
                        <Image w={60} h={60} source={require('../../assets/goog.png')} alt={'google sign in'} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image w={60} h={60} source={require('../../assets/fb.png')} alt={'facebook sign in'} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image w={60} h={60} source={require('../../assets/apple.png')} alt={'Apple sign in'} />
                    </TouchableOpacity>
                </HStack>


                <Center mx={'7.5'} >
                   <StyledText mx={1} content={`By clicking "Start with Google/Apple ID/Facebook" above you acknowledge that you have understood and agree to our Terms and Policy.`}
                    fontFamily={Fonts.RwThin} textAlign={'center'}  />
                </Center>

            </View>
        </SafeAreaView>
    )
}