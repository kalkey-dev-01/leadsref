import { Center, Heading, HStack, Text, useColorModeValue, View, VStack } from 'native-base'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../utils/colors';
import ThemeToggle from '../utils/theme-toggle';
import { firebase } from '../../firebase'
import { ArrowCircleLeftIcon } from 'react-native-heroicons/outline';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Fonts, StyledText } from '../utils/fontText';
import { useNavigation } from '@react-navigation/native';
import { UserIcon } from 'react-native-heroicons/solid';
interface SettingsScreenProps {

}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ }) => {
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
        <SafeAreaView style={{ backgroundColor: useColorModeValue(colors.lightGray, colors.ebony) }} >
            <VStack mx={'4'} pt={'3'} bgColor={useColorModeValue(colors.lightGray, colors.ebony)} h={'full'}>
                <StyledText content='Settings' fontFamily={Fonts.RwExBold} fontSize={40} />

                <TouchableOpacity onPress={() => nav.navigate('profile' as never)}>
                    <HStack alignSelf={'flex-start'} w={'100%'} alignItems={'center'} my={5} py={3} borderWidth={2} rounded={'3xl'} borderColor={useColorModeValue(colors.ebony, colors.white)} justifyContent={'space-between'} px={4} bgColor={useColorModeValue(colors.lightGray, colors.ebony)}>
                        <StyledText content='Your Profile' fontSize={'xl'} fontFamily={Fonts.RwBold} />
                        <UserIcon size={25} color={useColorModeValue(colors.ebony, colors.lightGray)} />
                    </HStack>
                </TouchableOpacity>

                <HStack alignSelf={'flex-start'} w={'100%'} alignItems={'center'} my={5} py={3} borderWidth={2} rounded={'3xl'} borderColor={useColorModeValue(colors.ebony, colors.white)} justifyContent={'space-between'} px={4} bgColor={useColorModeValue(colors.lightGray, colors.ebony)}>
                    <StyledText content='Theme Mode Switch' fontSize={'xl'} fontFamily={Fonts.RwBold} />
                    <ThemeToggle />
                </HStack>
               
                    <StyledText content={'leadistro ©'} mt={20} letterSpacing={0.75}
                        fontSize={'2xl'} textAlign={'center'} fontFamily={Fonts.RwSemiBold} />
               



            </VStack>
        </SafeAreaView>
    );
}