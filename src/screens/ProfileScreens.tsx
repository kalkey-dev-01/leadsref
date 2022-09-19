import { Center, Text, View, useColorModeValue, VStack, Box, HStack } from 'native-base'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../utils/colors';
import { Fonts, StyledText } from '../utils/fontText';
import { firebase, db } from '../../firebase'
import { ArrowCircleLeftIcon, MailIcon } from 'react-native-heroicons/outline';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
interface ProfileScreensProps {

}

export const ProfileScreens: React.FC<ProfileScreensProps> = ({ }) => {
    const user = firebase.auth().currentUser
    const nav = useNavigation()
    const handleSignOut = async () => {
        try {
            await firebase.auth().signOut()
            console.log('Signed Out Success');
        } catch (error: any) {
            console.log(error.message);

        }
    }



    return (
        <SafeAreaView style={{ backgroundColor: useColorModeValue(colors.lightGray, colors.ebony) }}>
            <KeyboardAwareScrollView style={{ backgroundColor: useColorModeValue(colors.lightGray, colors.ebony), height: '100%' }} enableOnAndroid={true}>
                <View h={'full'} backgroundColor={useColorModeValue(colors.lightGray, colors.ebony)}>
                    <VStack alignItems={'center'}>
                        <Box borderColor={useColorModeValue(colors.ebony, colors.lightGray)} borderWidth={1.5} my={3} px={5}>
                            <StyledText content={`Thank you for testing`} fontFamily={Fonts.RwExBold} fontSize={36} textAlign={'center'} />
                            <StyledText content={`leadistro Beta `} fontFamily={Fonts.RwExBold} fontSize={36} textAlign={'center'} />
                          
                        </Box>
                        <HStack alignItems={'center'} justifyContent={'space-between'} px={4} w={'100%'} alignSelf={'center'}>
                            <MailIcon size={25} color={useColorModeValue(colors.ebony, colors.white)} />
                            <StyledText content={`${user?.email}`} fontFamily={Fonts.RwSemiBold} fontSize={'xl'} my={2} pb={1} textAlign={'left'} />
                        </HStack>
                        <Center alignSelf={'center'} mt={'10'} >
                            <TouchableOpacity onPress={handleSignOut} >
                                <HStack rounded={'full'} borderColor={useColorModeValue(colors.ebony, colors.lightGray)}
                                    borderWidth={2} alignItems={'center'} justifyContent={'space-evenly'} px={'2.5'} >
                                    <StyledText content='Sign Out' fontFamily={Fonts.RwMed} fontSize={20} mx={2} pb={1.5} />
                                    <ArrowCircleLeftIcon color={useColorModeValue(colors.ebony, colors.lightGray)} size={25} />
                                </HStack>
                            </TouchableOpacity>
                        </Center>
                    </VStack>

                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}