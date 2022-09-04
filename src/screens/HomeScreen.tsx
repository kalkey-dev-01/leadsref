import { Center, Text, useColorModeValue, View } from 'native-base'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../utils/colors';
import { firebase } from '../../firebase'
import { BackspaceIcon } from 'react-native-heroicons/outline';




interface HomeScreenProps {

}

export const HomeScreen: React.FC<HomeScreenProps> = ({ }) => {
    const handleSignOut = async () => {
        try {
            await firebase.auth().signOut()
            console.log('Signed Out Success');
        } catch (error: any) {
            console.log(error.message);

        }
    }
    return (
        <SafeAreaView style={{ backgroundColor: useColorModeValue(colors.gray, colors.ebony) }}>
            <View h={'full'} backgroundColor={useColorModeValue(colors.coolGray, colors.ebony)}>

                <Text>HomeScreen</Text>
                <Center>
                    <BackspaceIcon color={colors.lightGray} onPress={handleSignOut} />
                </Center>
            </View>
        </SafeAreaView>
    );
}