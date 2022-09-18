import { Box, Button, Center, HStack, Input, Text, useColorModeValue, View, VStack } from 'native-base'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import colors from '../utils/colors';

import { apikey, fnlndApi } from '../api/apikey';
import { Fonts, StyledText } from '../utils/fontText';
import Loading from '../utils/loadingUI';
import { Linking, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios, { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { emailFinderSchema } from '../utils/form-validation';
import { SearchCircleIcon } from 'react-native-heroicons/outline';

interface IndividualEmailSearchProps {

}

export const IndividualEmailSearch: React.FC<IndividualEmailSearchProps> = ({ }) => {
    const [data, setData] = React.useState<AxiosResponse>()
    const [loading, setLoading] = React.useState<boolean>(false)
    let bgcol = useColorModeValue(colors.lightGray, colors.ebony)
    let borcol = useColorModeValue(colors.gray, colors.coolGray)
    const {
        values, handleBlur, handleChange, handleSubmit, errors
    } = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            domain: '',
        }, validationSchema: emailFinderSchema,
        onSubmit: () => {
            console.log(values.first_name + values.last_name);
            console.log(values.domain);
            setLoading(true)
            axios.post(fnlndApi, {
                "api_key": apikey,
                "first_name": values.first_name,
                "last_name": values.last_name,
                "domain": values.domain
            }).then((res) => {
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
                <StyledText content={`Leadistro is Searching`} fontFamily={Fonts.RwBold} fontSize={'xl'} />
                <StyledText content={`${values.first_name} ${values.last_name} working in ${values.domain}`} fontFamily={Fonts.RwSemiBold} fontSize={'lg'} />
                <Center h={'full'}>
                    <Loading />
                </Center>

            </VStack>
        </>

    }
    return (
        <KeyboardAwareScrollView style={{ backgroundColor: useColorModeValue(colors.lightGray, colors.ebony), height: '100%' }} enableOnAndroid={true}>
            <View h={'full'} borderTopWidth={'1'} borderTopColor={borcol} backgroundColor={useColorModeValue(colors.lightGray, colors.ebony)}>
                <VStack alignItems={'flex-start'}>
                    <StyledText mt={2} px={4} alignSelf={'center'} content={'Individual Email Lookup'} fontFamily={Fonts.RwBlack} letterSpacing={0.75} fontSize={'2xl'} textAlign={'center'} />
                    <VStack py={3} px={2} alignSelf={'center'} space={3} my={4}>
                        <HStack alignItems={'center'} justifyContent={'space-evenly'}>
                            <VStack w={'45%'} alignItems={'flex-start'}>
                                <Input fontFamily={Fonts.RwSemiBold} variant={'rounded'} placeholder={'First Name'} placeholderTextColor={useColorModeValue(colors.coolGray, colors.lightGray)}

                                    blurOnSubmit={true} onChangeText={handleChange('first_name')} onBlur={handleBlur('first_name')} value={values.first_name} autoCapitalize={'none'} autoCorrect={false}
                                    borderColor={errors.first_name ? useColorModeValue(colors.gray, colors.coolGray) : useColorModeValue(colors.gray, colors.coolGray)}
                                />
                                <>
                                    {errors.first_name && <StyledText pl={'4'} opacity={40} fontSize={'10'} fontFamily={Fonts.RwSemiBold} content={errors.first_name} />}
                                </>
                            </VStack>
                            <VStack w={'45%'} alignItems={'flex-start'}>
                                <Input fontFamily={Fonts.RwSemiBold} variant={'rounded'} placeholder={'Last Name'} placeholderTextColor={useColorModeValue(colors.coolGray, colors.lightGray)}

                                    blurOnSubmit={true} onChangeText={handleChange('last_name')} onBlur={handleBlur('last_name')} value={values.last_name} autoCapitalize={'none'} autoCorrect={false}
                                    borderColor={errors.last_name ? useColorModeValue(colors.gray, colors.coolGray) : useColorModeValue(colors.gray, colors.coolGray)}
                                />
                                <>
                                    {errors.last_name && <StyledText pl={'4'} opacity={40} fontSize={'10'} fontFamily={Fonts.RwSemiBold} content={errors.last_name} />}
                                </>
                            </VStack>
                        </HStack>
                        <VStack w={'75%'} alignItems={'flex-start'} >
                            <Input alignSelf={'flex-start'} ml={'2%'} fontFamily={Fonts.RwSemiBold} variant={'rounded'} placeholder={'Domain'} placeholderTextColor={useColorModeValue(colors.coolGray, colors.lightGray)}

                                blurOnSubmit={true} onChangeText={handleChange('domain')} onBlur={handleBlur('domain')} value={values.domain} autoCapitalize={'none'} autoCorrect={false}
                                borderColor={errors.domain ? useColorModeValue(colors.gray, colors.coolGray) : useColorModeValue(colors.gray, colors.coolGray)}
                            />
                            {errors.domain && <StyledText pl={'5'} opacity={40} fontSize={10} fontFamily={Fonts.RwSemiBold} content={errors.domain} />}
                        </VStack>
                        <Button onPress={async () => handleSubmit()} variant={'outline'} borderColor={borcol} borderRadius={'full'} alignItems={'center'} alignSelf={'center'} >
                            <StyledText content='Search Individual' fontFamily={Fonts.RwExBold} fontSize={'xl'} />
                        </Button>
                    </VStack>
                    {
                        data?.data &&
                        <>
                            <Box alignSelf={'center'} px={3.5} mx={2} rounded={'3xl'} py={5} borderWidth={5} borderColor={borcol}>
                                {
                                    data?.data['email'] !== null
                                        ?
                                        <VStack alignSelf={'center'} >
                                            <StyledText content={`The email found :-`} textAlign={'center'} fontSize={'lg'} fontFamily={Fonts.RwSemiBold} />
                                            <StyledText fontFamily={Fonts.RwBold} content={`${data?.data['email']}`} textAlign={'center'} fontSize={'xl'} />
                                        </VStack>
                                        :
                                        <TouchableOpacity onPress={() => {
                                            Alert.alert(`No Email Found`, 'The Email is either invalid or the Individual did not set up their email with the Company', [
                                                {
                                                    text: 'or Maybe I Just Mistyped',
                                                    style: 'cancel'
                                                }
                                            ],)
                                        }}>
                                            <StyledText content={`${values.first_name} ${values.last_name} might not exist on ${values.domain} or Information Given is Wrong`}
                                                fontFamily={Fonts.RwMed} fontSize={'md'} alignSelf={'flex-start'} textAlign={'center'} />
                                        </TouchableOpacity>
                                }

                            </Box>
                            <Box bgColor={bgcol} borderColor={borcol} borderWidth={3} alignSelf={'center'} mx={3} rounded={'2xl'} my={10} py={'5'} px={3}>
                                <StyledText content={`Features being added to Leadistro at the moment`}  alignSelf={'flex-start'} textAlign={'left'} px={8} fontSize={'lg'} fontFamily={Fonts.RwBlack} />
                                <StyledText content={`Create Email Marketing Campaigns`} mt={5} alignSelf={'flex-start'} textAlign={'left'} px={8} fontSize={'lg'} fontFamily={Fonts.RwSemiBold} />
                                <StyledText content={`Filter Employee Leads Success Rate`} mt={5} alignSelf={'flex-start'} textAlign={'left'} px={8} fontSize={'lg'} fontFamily={Fonts.RwSemiBold} />
                            </Box>
                        </>
                    }


                </VStack>
            </View>
        </KeyboardAwareScrollView>
    );
}