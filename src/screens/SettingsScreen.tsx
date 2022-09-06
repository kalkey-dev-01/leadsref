import { Center, Heading, HStack, Text, useColorModeValue, View, VStack } from 'native-base'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../utils/colors';
import ThemeToggle from '../utils/theme-toggle';
import { firebase } from '../../firebase'
import { ArrowCircleLeftIcon } from 'react-native-heroicons/outline';
import { TouchableOpacity } from 'react-native-gesture-handler';
interface SettingsScreenProps {

}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ }) => {
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
            <View mx={'4'} pt={'3'} bgColor={useColorModeValue(colors.lightGray, colors.ebony)} h={'full'}>
                <Heading size={'2xl'}>Settings</Heading>

                <Center mt={'6'} rounded={'full'} borderColor={useColorModeValue(colors.ebony, colors.lightGray)} borderWidth={2}>
                    <HStack alignItems={'center'} justifyContent={'space-evenly'}  >
                        <Text mr={3} fontWeight={'bold'} >Switch between Light and Dark Mode</Text>
                        <ThemeToggle />
                    </HStack>
                </Center>
                <Center mt={'6'} >
                    <TouchableOpacity onPress={handleSignOut} >
                        <HStack rounded={'full'} borderColor={useColorModeValue(colors.ebony, colors.lightGray)}
                            borderWidth={2} alignItems={'center'} justifyContent={'space-evenly'} px={'2.5'} py={'1.5'} >
                            <Text mr={3} fontSize={'lg'} fontWeight={'bold'} >Sign Out</Text>
                            <ArrowCircleLeftIcon color={useColorModeValue(colors.ebony, colors.lightGray)} size={25} />
                        </HStack>
                    </TouchableOpacity>
                </Center>


            </View>
        </SafeAreaView>
    );
}