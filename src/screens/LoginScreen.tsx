
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
import { useNavigation } from '@react-navigation/native';
import { Fonts, StyledText } from '../utils/fontText';

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
                <View h={'full'} bgColor={useColorModeValue(colors.lightGray, colors.ebony)}>
                    <Center mt={10}>
                        <StyledText content='Loading Please Wait' fontSize={45} fontFamily={Fonts.RwBlack} />
                    </Center>
                </View>
            </>
        )
    }

    return (

        <SafeAreaView style={{ backgroundColor: colors.ebony }}>
            <KeyboardAwareScrollView style={{ backgroundColor: colors.ebony, height: '100%' }} enableOnAndroid={true}>
                <View bg={colors.ebony} h={'full'} >


                    <Center mt={'1'} pb={'2.5'} borderBottomColor={'white'} borderWidth={0.75}>
                        <Heading bold size={'2xl'} color={'white'}>Welcome Back</Heading>
                        <Heading size={'lg'} color={'white'}>Login to Leadistro</Heading>

                    </Center>
                    {/* Image */}
                    <Center mt={'5'}>
                        <Image source={require('../../assets/leedVec.png')} alt={'lOGO'} h={220 / 2} w={350 / 2} my={'2'} />
                    </Center>
                    <Center mx={'7'} my={'2.5'}>
                        <Text textAlign={'center'} fontSize={'lg'} fontWeight={'semibold'} color={colors.white}>
                            Leadistro is a mobile lead generation application for email marketing
                            and extraction of information about websites and domains.
                        </Text>
                    </Center>
                    <Box mx={'3'} mt={'3'} mb={'2'} >
                        <Input bgColor={useColorModeValue(colors.white, colors.ebony)} variant={'rounded'} placeholder={'Enter Your Email'} autoCapitalize={'none'} autoCorrect={false}
                            value={values.email}

                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')} accessibilityLabel={'Email'}
                            borderColor={errors.email ? colors.gray : colors.coolGray} size={'md'} placeholderTextColor={useColorModeValue(colors.ebony, colors.white)}
                        />
                        <Text ml={'3.5'} fontSize={'xs'} color={colors.gray} mt={'0.5'} mb={'1'} >{errors.email}</Text>
                    </Box>
                    <Box mx={'3'}  >
                        <Input bgColor={useColorModeValue(colors.white, colors.ebony)} variant={'rounded'}
                            textDecorationColor={colors.white}
                            placeholder={'Enter Your Password'} autoCapitalize={'none'} autoCorrect={false}
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
                        <Text ml={'3.5'} fontSize={'xs'} color={colors.gray} mt={'0.5'} mb={'1'} >{errors.password}</Text>
                    </Box>
                    <Center mb={'2'}>
                        <TouchableOpacity onPress={() => {

                            handleSubmit()

                        }}>
                            <Box mt={'2'} borderColor={colors.gray} borderWidth={'2'} rounded={'full'} backgroundColor={colors.ebony} px={'5'} py={'2'}>
                                <Text color={colors.gray} fontWeight={'black'} fontSize={'lg'}>Login</Text>
                            </Box>
                        </TouchableOpacity>
                    </Center>
                    <Center mb={'2'}>
                        <TouchableOpacity onPress={() => {
                            nav.navigate('register' as never)
                        }}>
                            <Box mt={'2'} borderColor={colors.coolGray} borderWidth={'2'} rounded={'full'} backgroundColor={colors.ebony} px={'5'} py={'2'}>
                                <Text color={colors.white} fontWeight={'black'} fontSize={'lg'}>Dont have an account? Sign-Up</Text>
                            </Box>
                        </TouchableOpacity>
                    </Center>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}
