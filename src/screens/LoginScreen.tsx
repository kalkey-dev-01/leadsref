
import { Box, Button, Center, FormControl, Heading, Image, Input, Text, useColorModeValue, View } from 'native-base'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../utils/colors';
import { useFormik } from 'formik';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EyeIcon, EyeOffIcon } from 'react-native-heroicons/outline';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert } from 'react-native'
import { loginSchema } from '../utils/form-validation';
import { firebase } from '../../firebase'
interface LoginScreenProps {

}
export const LoginScreen: React.FC<LoginScreenProps> = ({ }) => {
    const {
        values, handleBlur, handleChange, handleSubmit, errors
    } = useFormik({
        initialValues: {
            email: '',
            password: '',

        }, validationSchema: loginSchema,
        onSubmit: () => {

        },
    });
    const [open, setOpen] = React.useState<boolean>(false)


    return (

        <SafeAreaView style={{ backgroundColor: useColorModeValue(colors.lightGray, colors.ebony) }}>
            <KeyboardAwareScrollView style={{ backgroundColor: useColorModeValue(colors.gray, colors.ebony), height: '100%' }} enableOnAndroid={true}>
                <View bg={useColorModeValue(colors.lightGray, colors.ebony)} h={'full'} >


                    <Center mt={'1'}>
                        <Heading bold size={'2xl'}>Welcome Back</Heading>
                        <Heading size={'lg'}>Login to Leadistro</Heading>

                    </Center>
                    {/* Image */}
                    <Center mt={'5'}>
                        <Image source={require('../../assets/leedVec.png')} alt={'lOGO'} h={220 / 2} w={350 / 2} my={'2'} />
                    </Center>
                    <Center mx={'10'} mt={'1.5'}>
                        <Text textAlign={'center'} fontSize={'sm'} color={colors.lightGray}>
                            LeadsRef is a mobile lead generation application for email marketing
                            and extraction of information about websites and domains.
                        </Text>
                    </Center>
                    <Box mx={'2'} mt={'3'} >
                        <Input bgColor={colors.ebony} variant={'rounded'} placeholder={'Enter Your Email'} autoCapitalize={'none'} autoCorrect={false}
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')} accessibilityLabel={'Email'}
                            borderColor={errors.email ? colors.gray : colors.lightGray} size={'md'} placeholderTextColor={colors.lightGray}
                        />
                        <Text ml={'3.5'} fontSize={'xs'} color={colors.lightGray} mt={'0.5'} mb={'1'} >{errors.email}</Text>
                    </Box>
                    <Box mx={'2'}  >
                        <Input bgColor={colors.ebony} variant={'rounded'} placeholder={'Enter Your Password'} autoCapitalize={'none'} autoCorrect={false}
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            type={open ? "text" : "password"}
                            InputRightElement={
                                <>
                                    <TouchableOpacity onPress={() => setOpen(!open)}>
                                        <Box mr={3}>
                                            {open ? <EyeIcon color={colors.lightGray} /> : <EyeOffIcon color={colors.lightGray} />}
                                        </Box>
                                    </TouchableOpacity>
                                </>
                            }
                            borderColor={errors.password ? colors.gray : colors.lightGray} size={'md'} placeholderTextColor={colors.lightGray}
                        />
                        <Text ml={'3.5'} fontSize={'xs'} color={colors.lightGray} mt={'0.5'} mb={'1'} >{errors.password}</Text>
                    </Box>
                    <Center mb={'2'}>
                        <TouchableOpacity onPress={() => {
                            console.log(values.email)
                            console.log(values.password);
                            Login(values.email, values.password)
                            console.log('firebase login func');


                        }}>
                            <Box borderColor={colors.lightGray} borderWidth={'2'} rounded={'full'} backgroundColor={colors.ebony} px={'5'} py={'2'}>
                                <Text>Sign in to Leadistro</Text>
                            </Box>
                        </TouchableOpacity>
                    </Center>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}
const Login = async (email: string, password: string) => {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => console.log(firebase.auth().currentUser))

    } catch (error: any) {
        Alert.alert('Error caused while login', error.message)
    }
}