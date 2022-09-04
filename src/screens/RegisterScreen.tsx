import { Box, Button, Center, FormControl, Heading, Image, Input, Text, useColorModeValue, View } from 'native-base'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../utils/colors';
import { useFormik } from 'formik';
import { signUpSchema } from '../utils/form-validation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EyeIcon, EyeOffIcon } from 'react-native-heroicons/outline';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase, db } from '../../firebase'
import { Alert } from 'react-native'

interface RegisterScreenProps {

}




export const RegisterScreen: React.FC<RegisterScreenProps> = ({ }) => {
    const {
        values, handleBlur, handleChange, handleSubmit, errors
    } = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        }, validationSchema: signUpSchema,
        onSubmit: (values) => {
            SignUp(values.email, values.confirmPassword, values.username)
            console.log('Submitted to Firebase');

        },
    });
    const [open, setOpen] = React.useState<boolean>(false)


    return (
        <SafeAreaView style={{ backgroundColor: useColorModeValue(colors.gray, colors.ebony) }}>
            <KeyboardAwareScrollView style={{ backgroundColor: useColorModeValue(colors.gray, colors.ebony), height: '100%' }} enableOnAndroid={true}>
                <View bgColor={useColorModeValue(colors.lightGray, colors.ebony)} h={'full'}>
                    {/* Sign In Form*/}
                    <Heading mt={'2'} size={'xl'} color={useColorModeValue(colors.ebony, 'white')} fontWeight={'black'} textAlign={'center'}>Sign Up</Heading>
                    <Heading mt={'4'} size={'lg'} color={useColorModeValue(colors.ebony, colors.lightGray)} textAlign={'center'} fontWeight={'semibold'}>Set up your leadRef account</Heading>
                    <View bgColor={useColorModeValue(colors.gray, colors.coolGray)} h={'full'} mt={'2'}>
                        {/* Form Validation */}
                        <Center pt={4} mb={'5'} backgroundColor={colors.ebony} borderBottomColor={colors.gray} borderTopColor={colors.lightGray} borderWidth={2}>
                            <Image backgroundColor={colors.ebony} source={require('../../assets/leedVec.png')} alt={'lOGO'} h={220 / 2} w={350 / 2} />
                            <Text mx={'4'} my={'3'} textAlign={'center'} fontSize={'sm'} fontWeight={'black'} >
                                Leadistro is a tool for Individuals or small Startup owners
                                who want to collect obtainable data from domains
                                and use it to create a list of potential prospects
                                to whom you may mark as a lead.
                            </Text>
                        </Center>
                        <>
                            <Center mx={'3'} px={'2'} backgroundColor={colors.ebony} borderColor={colors.lightGray} borderWidth={'2'} my={'1'} py={'1'} rounded={'full'}>
                                <Text fontSize={'md'} fontWeight={'bold'} >Create an Account for yourself</Text>
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
                            <Box mx={'2'}>
                                <Input bgColor={colors.ebony} variant={'rounded'} placeholder={'Enter Your Name'} autoCapitalize={'none'} autoCorrect={false}
                                    value={values.username}
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                    borderColor={errors.username ? colors.gray : colors.lightGray} size={'md'} placeholderTextColor={colors.lightGray}
                                />
                                <Text ml={'3.5'} fontSize={'xs'} color={colors.lightGray} my={'1'} >{errors.username}</Text>
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
                            <Box mx={'2'} >
                                <Input bgColor={colors.ebony} variant={'rounded'} placeholder={'Confirm Password'} autoCapitalize={'none'} autoCorrect={false}
                                    value={values.confirmPassword}
                                    onBlur={handleBlur('confirmPassword')}
                                    onChangeText={handleChange('confirmPassword')}
                                    borderColor={errors.confirmPassword ? colors.gray : colors.lightGray} size={'md'} placeholderTextColor={colors.lightGray}
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
                                />
                                <Text ml={'3.5'} fontSize={'xs'} color={colors.lightGray} mt={'0.5'}  >{errors.confirmPassword}</Text>
                            </Box>
                        </>
                        <Center mb={'2'}>
                            <TouchableOpacity onPress={() => {

                                console.log(values.email);
                                console.log(values.confirmPassword);
                                console.log(values.username);
                                SignUp(values.email, values.confirmPassword, values.username)
                                console.log('Firebase Sign Up function');
                            }}>
                                <Box borderColor={colors.lightGray} borderWidth={'2'} rounded={'full'} backgroundColor={colors.ebony} px={'5'} py={'2'}>
                                    <Text>Sign Up</Text>
                                </Box>
                            </TouchableOpacity>
                        </Center>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}
const SignUp = async (email: string, password: string, name: string) => {
    try {
        const authUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
        db.collection('users').add({
            uid: authUser.user?.uid,
            name: name,
            email: authUser.user?.email
        })

    } catch (error: any) {
        Alert.alert('Error Caused while Sign up', error.message)
    }
}