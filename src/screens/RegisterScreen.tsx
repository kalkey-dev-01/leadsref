import { Box, Button, Center, FormControl, Heading, Image, Input, Text, useColorModeValue, View, VStack } from 'native-base'
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
import { Fonts, StyledText } from '../utils/fontText';
import Loading from '../utils/loadingUI';

interface RegisterScreenProps {

}




export const RegisterScreen: React.FC<RegisterScreenProps> = ({ }) => {
    const [loading, setLoading] = React.useState<boolean>(false)
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


        },
    });
    const [open, setOpen] = React.useState<boolean>(false)
    const SignUp = async (email: string, password: string, name: string) => {
        setLoading(true)
        try {
            const authUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
            db.collection('users').doc(authUser.user?.uid).set({
                uid: authUser.user?.uid,
                name: name,
                email: authUser.user?.email
            })
            // db.collection('users').add({
            //     uid: authUser.user?.uid,
            //     name: name,
            //     email: authUser.user?.email
            // })

        } catch (error: any) {
            Alert.alert('Error Caused while Sign up', error.message)
        }
        setLoading(false)
    }


    if (loading) {
        return (
            <>
                <VStack alignItems={'center'} pt={20} bgColor={useColorModeValue(colors.lightGray, colors.ebony)}>
                    <StyledText content={`Leadistro is Registering Your Account`} fontFamily={Fonts.RwSemiBold} fontSize={20} />
                    <StyledText content={`Thank You for Using Leadistro `} fontFamily={Fonts.RwSemiBold} fontSize={17.5} />
                    <StyledText content={`${values.username}`} fontFamily={Fonts.RwSemiBold} fontSize={17.5} />
                    <Center h={'full'}>
                        <Loading />
                    </Center>

                </VStack>
            </>
        )
    }

    return (
        <SafeAreaView style={{ backgroundColor: colors.ebony }}>
            <KeyboardAwareScrollView style={{ backgroundColor: colors.ebony, height: '100%' }} enableOnAndroid={true}>
                <View bgColor={colors.ebony} h={'full'}>
                    {/* Sign In Form*/}
                    <StyledText content='Sign Up' textAlign={'center'} fontFamily={Fonts.RwBlack} fontSize={30} letterSpacing={1} />
                    <StyledText content='Set up your Leadistro' textAlign={'center'} fontFamily={Fonts.RwSemiBold} fontSize={25} />

                    <View bgColor={colors.ebony} h={'full'} mt={'2'}>
                        {/* Form Validation */}
                        <Center pt={4} mb={'5'} backgroundColor={colors.ebony} borderBottomColor={colors.gray} borderTopColor={colors.lightGray} borderWidth={2}>
                            <Image backgroundColor={colors.ebony} source={require('../../assets/leedVec.png')} alt={'lOGO'} h={220 / 2} w={350 / 2} />
                            <StyledText content={
                                `Leadistro is a tool for Individuals or small Startup owners who want to collect obtainable data from domains and use it to create a list of potential prospects to whom you may mark as a lead.`
                            } textAlign={'center'} fontFamily={Fonts.RwLight}
                                mx={6} my={3}
                            />


                        </Center>
                        <>
                            <Center mx={'3'} px={'2'} backgroundColor={colors.ebony} borderColor={colors.lightGray} borderWidth={'2'} my={'1'} py={'1'} rounded={'full'}>
                                <StyledText content='Create an Account for yourself' fontFamily={Fonts.RwExBold} fontSize={16} mb={0.5} />
                            </Center>
                            <Box mx={'3'} mt={'3'} mb={2} >
                                <Input bgColor={useColorModeValue(colors.white, colors.ebony)} variant={'rounded'} placeholder={'Enter Your Email'} autoCapitalize={'none'} autoCorrect={false}
                                    value={values.email}
                                    fontFamily={Fonts.RwBold}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')} accessibilityLabel={'Email'}
                                    borderColor={errors.confirmPassword ? colors.gray : colors.coolGray} size={'md'} placeholderTextColor={useColorModeValue(colors.ebony, colors.white)}
                                />
                                {errors.email && <StyledText ml={'3.5'} fontSize={12} fontFamily={Fonts.RwLight} my={'0.5'} pb={1} content={`${errors.email}`} />}
                            </Box>
                            <Box mx={'3'} mb={2}>
                                <Input bgColor={useColorModeValue(colors.white, colors.ebony)} variant={'rounded'} placeholder={'Enter Your Name'} autoCapitalize={'none'} autoCorrect={false}
                                    value={values.username}
                                    fontFamily={Fonts.RwBold}
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                    borderColor={errors.username ? colors.gray : colors.coolGray} size={'md'} placeholderTextColor={useColorModeValue(colors.ebony, colors.white)}
                                />
                                {errors.username && <StyledText ml={'3.5'} fontSize={12} fontFamily={Fonts.RwLight} my={'0.5'} pb={1} content={`${errors.username}`} />}
                            </Box>
                            <Box mx={'3'} mb={2} >
                                <Input bgColor={useColorModeValue(colors.white, colors.ebony)} variant={'rounded'} placeholder={'Enter Your Password'} autoCapitalize={'none'} autoCorrect={false}
                                    value={values.password}
                                    fontFamily={Fonts.RwBold}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    type={open ? "text" : "password"}
                                    InputRightElement={
                                        <>
                                            <TouchableOpacity onPress={() => setOpen(!open)}>
                                                <Box mr={3}>
                                                    {open ? <EyeIcon color={useColorModeValue(colors.ebony, colors.white)} /> : <EyeOffIcon color={useColorModeValue(colors.ebony, colors.white)} />}
                                                </Box>
                                            </TouchableOpacity>
                                        </>
                                    }
                                    borderColor={errors.password ? colors.gray : colors.coolGray} size={'md'} placeholderTextColor={useColorModeValue(colors.ebony, colors.white)}
                                />
                                {errors.password && <StyledText ml={'3.5'} fontSize={12} fontFamily={Fonts.RwLight} my={'0.5'} pb={1} content={`${errors.password}`} />}
                            </Box>
                            <Box mx={'3'} mb={2} >
                                <Input bgColor={useColorModeValue(colors.white, colors.ebony)} variant={'rounded'} placeholder={'Confirm Password'} autoCapitalize={'none'} autoCorrect={false}
                                    value={values.confirmPassword}
                                    fontFamily={Fonts.RwBold}
                                    onBlur={handleBlur('confirmPassword')}
                                    onChangeText={handleChange('confirmPassword')}
                                    borderColor={errors.confirmPassword ? colors.gray : colors.coolGray} size={'md'} placeholderTextColor={useColorModeValue(colors.ebony, colors.white)}
                                    type={open ? "text" : "password"}
                                    InputRightElement={
                                        <>
                                            <TouchableOpacity onPress={() => setOpen(!open)}>
                                                <Box mr={3}>
                                                    {open ? <EyeIcon color={useColorModeValue(colors.ebony, colors.white)} /> : <EyeOffIcon color={useColorModeValue(colors.ebony, colors.white)} />}
                                                </Box>
                                            </TouchableOpacity>
                                        </>
                                    }
                                />
                                {errors.confirmPassword && <StyledText ml={'3.5'} fontSize={12} fontFamily={Fonts.RwLight} my={'0.5'} pb={1} content={`${errors.confirmPassword}`} />}
                            </Box>
                        </>
                        <Center mb={'2'}>
                            <TouchableOpacity onPress={async () => {
                                handleSubmit()
                            }}>
                                <Box borderColor={colors.lightGray} borderWidth={'2'} rounded={'full'} backgroundColor={colors.ebony} px={'5'} py={'1'}>
                                    <StyledText content={'Sign Up'} fontFamily={Fonts.RwSemiBold} mb={0.5} />
                                </Box>
                            </TouchableOpacity>
                        </Center>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}
