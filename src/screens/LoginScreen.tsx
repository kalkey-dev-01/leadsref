
import React from 'react'
import { Text, Box, VStack, useColorMode, useTheme, themeTools, Center, useColorModeValue, HStack, Flex, Spacer, Pressable, View, Heading, Stack, Image, AspectRatio, Button, Icon, Divider } from 'native-base'

import ThemeToggle from '../utils/theme-toggle';
import colors from '../utils/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'
import { MailIcon } from 'react-native-heroicons/outline'

interface LoginScreenProps {

}

export const LoginScreen: React.FC<LoginScreenProps> = ({ }) => {
    const nav = useNavigation()
    return (
        <SafeAreaView style={{ backgroundColor: useColorModeValue(colors.lightGray, colors.ebony) }}>
            <View bg={useColorModeValue(colors.lightGray, colors.ebony)} h={'full'} >
                {/* Image */}
                <Center mt={'5'}>
                    <Image source={require('../../assets/leedVec.png')} alt={'lOGO'} />
                </Center>
                <Center mt={10}>
                    <Heading bold size={'2xl'} color={colors.lightGray}>leadsRef</Heading>
                </Center>
                <Center mx={'10'} mt={'1.5'}>
                    <Text textAlign={'center'} fontSize={'lg'} color={colors.lightGray}>
                        Research the Perfect candidates,
                        Save Lists of prospects, send
                        customized cold emails.
                    </Text>
                </Center>
                <Center mx={'5'} mt={'5'}>
                    <HStack alignItems={'center'} space={'1.5'} bg={colors.gray} rounded={'full'} pl={'3.5'}>
                        <MailIcon color={colors.ebony} />
                        <Button rounded={'full'} size={'sm'} color={colors.gray} variant={'solid'} bgColor={colors.coolGray}>Sign up with Email and Password</Button>
                    </HStack>
                </Center>

                <Divider color={colors.lightGray} mt={'5'} />

                <HStack alignItems={'center'} justifyContent={'space-evenly'} space={'1.5'} my={'10'} >
                    <Image source={require('../../assets/google.png')} alt={'google login'} />
                    <Image source={require('../../assets/facebook.png')} alt={'facebook login'} />
                    <Image source={require('../../assets/apple.png')} alt={'apple login'} />
                </HStack>


                <Center mx={'7.5'} >
                    <Text textAlign={'center'} textDecorationColor={colors.coolGray} color={colors.lightGray} fontWeight={'light'}>
                        By clicking "Start with Google/Apple ID/Facebook" above you acknowledge that you have understood and agree to our Terms and Policy
                    </Text>
                </Center>

            </View>
        </SafeAreaView>
    );
}