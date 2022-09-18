import { Box, Center, Heading, HStack, Input, Text, useColorModeValue, View, VStack } from 'native-base'
import React, { useCallback, useEffect } from 'react'
import { IdentificationIcon, SearchCircleIcon, MailIcon, UserGroupIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../utils/colors';
import { firebase } from '../../firebase'
import { useFormik } from 'formik';
import { domainSchema } from '../utils/form-validation';
import EnrichCard, { RootObject } from './renderComponents/EnrichCard';
import axios, { AxiosResponse } from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Animated, { useAnimatedStyle, withTiming, withSpring, useSharedValue } from 'react-native-reanimated'
import { apikey, employeesApi } from '../api/apikey';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Fonts, StyledText } from '../utils/fontText';
import { AtSymbolIcon, UsersIcon } from 'react-native-heroicons/solid';
import { Alert } from 'react-native'
import { Ecard } from './renderComponents/Ecard';
import Loading from '../utils/loadingUI';
import { Linking } from 'react-native'
import AnimatedLottieView from 'lottie-react-native';
interface EnrichCompanyProps {

}


export const EnrichCompany: React.FC<EnrichCompanyProps> = ({ }) => {
    const [data, setData] = React.useState<AxiosResponse>()
    const [loading, setLoading] = React.useState<boolean>(false)
    let bgcol = useColorModeValue(colors.lightGray, colors.ebony)
    let borcol = useColorModeValue(colors.ebony, colors.lightGray)
    const handlePressUrl = React.useCallback(async () => {
        let supported = await Linking.canOpenURL(data?.data['employees'][0]['company_linkedin_url'].toString())
        if (supported) {
            await Linking.openURL(data?.data['employees'][0]['company_linkedin_url'].toString())
        } else {
            Alert.alert(`This Social Url seems faulty`)
        }
    }, [data?.data['employees'][0]['company_linkedin_url'].toString()])


    const {
        values, handleBlur, handleChange, handleSubmit, errors
    } = useFormik({
        initialValues: {
            domain: ''
        }, validationSchema: domainSchema,
        onSubmit: () => {
            console.log(values.domain);

            setLoading(true)
            axios.post(employeesApi, { "api_key": apikey, 'domain': values.domain })
                .then((res) => {
                    setData(res)
                }).catch((e) => console.log(e))
                .finally(() => {
                    setLoading(false)
                })
        }

    })


    if (loading) {
        return <>
            <VStack alignItems={'center'} bgColor={useColorModeValue(colors.lightGray, colors.ebony)}>
                <StyledText content={`Leadistro is Searching`} fontFamily={Fonts.RwBold} fontSize={20} />
                <StyledText content={`${values.domain}`} fontFamily={Fonts.RwSemiBold} fontSize={25} />
                <Center h={'full'}>
                    <Loading />
                </Center>

            </VStack>
        </>

    }


    return (
        <KeyboardAwareScrollView style={{ backgroundColor: useColorModeValue(colors.lightGray, colors.ebony), height: '100%' }} enableOnAndroid={true}>
            <View h={'full'} borderTopColor={useColorModeValue(colors.coolGray, colors.white)} borderTopWidth={'0.5'} backgroundColor={useColorModeValue(colors.lightGray, colors.ebony)}>
                <>
                    <HStack justifyContent={'space-between'} alignItems={'center'} mx={'4'} my={'3'}>
                        <StyledText content='Search Employees Information' fontFamily={Fonts.RwExBold} fontSize={20} />
                        <Box pt={1.5}>
                            <UserGroupIcon size={30} color={useColorModeValue(colors.ebony, colors.white)} />
                        </Box>
                    </HStack>
                    <Input fontFamily={Fonts.RwSemiBold} mx={'5'} variant={'rounded'} placeholder={'Enter The domain'} placeholderTextColor={useColorModeValue(colors.coolGray, colors.lightGray)}

                        blurOnSubmit={true} onChangeText={handleChange('domain')} onBlur={handleBlur('domain')} value={values.domain} autoCapitalize={'none'} autoCorrect={false}
                        borderColor={errors.domain ? useColorModeValue(colors.gray, colors.coolGray) : useColorModeValue(colors.gray, colors.coolGray)}
                        InputRightElement={
                            <TouchableOpacity onPress={async () => {
                                handleSubmit()
                            }}>
                                <SearchCircleIcon size={25} color={useColorModeValue(colors.ebony, colors.white)} style={{ marginHorizontal: 15 }} />
                            </TouchableOpacity>
                        }
                    />
                    <Center>
                        {errors.domain && <StyledText fontSize={12} mt={1} mb={'1'} fontFamily={Fonts.RwSemiBold} content={errors.domain} />}
                    </Center>

                    {/* Complete Post Logic and Rendering */}

                    {data &&
                        <>
                            {
                                data?.data['employees'][0] &&
                                <VStack mt={5} mb={1.5} mx={5} space={2} alignItems={'flex-start'} borderColor={borcol} rounded={'2xl'} borderWidth={2} px={2.5} py={3}>
                                    <StyledText content={`${data?.data['employees'][0]['company_name']}`} fontFamily={Fonts.RwBold} fontSize={'xl'} />
                                    <StyledText content={`Domain - ${data?.data['employees'][0]['company_domain']}`} fontFamily={Fonts.RwBold} fontSize={'sm'} />

                                    <StyledText content={`Address - ${data?.data['employees'][0]['company_address']}`} fontFamily={Fonts.RwBold} fontSize={'xs'} isTrunc={true} />
                                    <StyledText content={`Country -  ${data?.data['employees'][0]['company_country']}`} fontFamily={Fonts.RwBold} fontSize={'lg'} />
                                    <StyledText content={`Year Founded - ${data?.data['employees'][0]['company_founded']}`} fontFamily={Fonts.RwBold} fontSize={'lg'} />


                                    <TouchableOpacity onPress={
                                        handlePressUrl
                                    }>
                                        <HStack alignItems={'center'} space={'2'}>
                                            <UsersIcon color={borcol} size={22.5} />
                                            <StyledText content={`Company LinkedIn `} fontFamily={Fonts.RwBold} py={1} pb={1} numofLines={1} fontSize={15} />
                                        </HStack>
                                    </TouchableOpacity>

                                </VStack>
                            }
                            <EnrichCard
                                items={data?.data['employees']}
                                render={(item: RootObject,) =>
                                    <Box mx={3} my={3} borderWidth={1} borderRadius={'xl'} borderColor={borcol} bgColor={bgcol}  >
                                        <Ecard
                                            item={item}
                                        />
                                    </Box>

                                }
                            />
                        </>}


                </>
            </View>
        </KeyboardAwareScrollView>

    );
}

// Raleway_100Thin,
// Raleway_100Thin_Italic,
// Raleway_200ExtraLight,
// Raleway_200ExtraLight_Italic,
// Raleway_300Light,
// Raleway_300Light_Italic,
// Raleway_400Regular,
// Raleway_400Regular_Italic,
// Raleway_500Medium,
// Raleway_500Medium_Italic,
// Raleway_600SemiBold,
// Raleway_600SemiBold_Italic,
// Raleway_700Bold,
// Raleway_700Bold_Italic,
// Raleway_800ExtraBold,
// Raleway_800ExtraBold_Italic,
// Raleway_900Black,
// Raleway_900Black_Italic 