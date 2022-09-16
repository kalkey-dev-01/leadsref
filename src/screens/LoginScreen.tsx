
import { Box, Button, Center, FormControl, Heading, Image, Input, Text, useColorModeValue, View, VStack } from 'native-base'
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
import { useNavigation } from '@react-navigation/native';
import { Fonts, StyledText } from '../utils/fontText';
import Loading from '../utils/loadingUI';

interface LoginScreenProps {

}
export const LoginScreen: React.FC<LoginScreenProps> = ({ }) => {
    const [loading, setLoading] = React.useState<boolean>(false)
    const {
        values, handleBlur, handleChange, handleSubmit, errors
    } = useFormik({
        initialValues: {
            email: '',
            password: '',

        }, validationSchema: loginSchema,
        onSubmit: () => {

            Login(values.email, values.password)

        },
    });
    const nav = useNavigation()
    const [open, setOpen] = React.useState<boolean>(false)
    const Login = async (email: string, password: string) => {
        setLoading(true)
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => console.log(firebase.auth().currentUser))

        } catch (error: any) {
            Alert.alert('Error caused while login', error.message)
        }
        setLoading(false)
    }

    if (loading) {
        return (
            <>
                <VStack alignItems={'center'} pt={20} bgColor={useColorModeValue(colors.white, colors.ebony)}>
                    <StyledText content={`Leadistro is logging you In`} fontFamily={Fonts.RwBold} fontSize={15} />
                    <StyledText content={`${values.email}`} fontFamily={Fonts.RwSemiBold} fontSize={12.5} />
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
                <View bg={colors.ebony} h={'full'} >


                    <Center mt={'1'} pb={'2.5'} borderBottomColor={'white'} borderWidth={0.75}>
                        <StyledText content={'Welcome Back'} fontFamily={Fonts.RwBlack} fontSize={'2xl'} letterSpacing={2} />
                        <StyledText content={'Login to leadistro'} fontFamily={Fonts.RwExBold} fontSize={'lg'} letterSpacing={1.5} />

                    </Center>
                    {/* Image */}
                    <Center mt={'5'}>
                        <Image source={require('../../assets/leedVec.png')} alt={'lOGO'} h={220 / 2} w={350 / 2} my={'2'} />
                    </Center>
                    <Center mx={'7'} my={'2.5'}>
                        <StyledText content={`Leadistro is a mobile lead generation application for email marketing and extraction of information about websites and domains.`}
                            fontFamily={Fonts.RwBold} fontSize={'lg'} textAlign={'center'} />
                    </Center>
                    <Box mx={'3'} mt={'3'} mb={'2'} >
                        <Input bgColor={useColorModeValue(colors.white, colors.ebony)} variant={'rounded'} placeholder={'Enter Your Email'} autoCapitalize={'none'} autoCorrect={false}
                            value={values.email}
                            fontFamily={Fonts.RwMed}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')} accessibilityLabel={'Email'}
                            borderColor={errors.email ? colors.gray : colors.coolGray} size={'md'} placeholderTextColor={useColorModeValue(colors.ebony, colors.white)}
                        />
                        {errors.email && <StyledText content={`${errors.email}`} fontFamily={Fonts.RwLight} fontSize={'xs'} ml={3.5} my={0.5} />}
                    </Box>
                    <Box mx={'3'}  >
                        <Input bgColor={useColorModeValue(colors.white, colors.ebony)} variant={'rounded'}
                            textDecorationColor={colors.white}
                            placeholder={'Enter Your Password'} autoCapitalize={'none'} autoCorrect={false}
                            fontFamily={Fonts.RwMed}
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            type={open ? "text" : "password"}
                            InputRightElement={
                                <>
                                    <TouchableOpacity onPress={() => setOpen(!open)}>
                                        <Box mr={3}>
                                            {open ? <EyeIcon color={colors.gray} /> : <EyeOffIcon color={colors.gray} />}
                                        </Box>
                                    </TouchableOpacity>
                                </>
                            }
                            borderColor={errors.password ? colors.gray : colors.coolGray} size={'md'} placeholderTextColor={useColorModeValue(colors.ebony, colors.white)}
                        />
                        {errors.password && <StyledText content={`${errors.password}`} fontFamily={Fonts.RwLight} ml={3.5} my={0.5} fontSize={'xs'} />}
                    </Box>
                    <Center mb={'2'}>
                        <TouchableOpacity onPress={() => {

                            handleSubmit()

                        }}>
                            <Box mt={'2'} borderColor={colors.gray} borderWidth={'2'} rounded={'full'} backgroundColor={colors.ebony} px={'5'} py={'2'}>
                                <StyledText fontFamily={Fonts.RwBold} mb={0.5} fontSize={'lg'} content='Login' />
                            </Box>
                        </TouchableOpacity>
                    </Center>
                    <Center mb={'2'}>
                        <TouchableOpacity onPress={() => {
                            nav.navigate('register' as never)
                        }}>
                            <Box mt={'2'} borderColor={colors.coolGray} borderWidth={'2'} rounded={'full'} backgroundColor={colors.ebony} px={'5'} py={'2'}>
                                <StyledText fontFamily={Fonts.RwExBold} fontSize={'lg'} content={`Dont have an account? Sign-Up`} />
                            </Box>
                        </TouchableOpacity>
                    </Center>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}
