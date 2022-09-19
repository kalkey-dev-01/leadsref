import axios, { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { Box, Center, Input, Text, useColorModeValue, View, VStack } from 'native-base'
import React from 'react'

import { SearchCircleIcon } from 'react-native-heroicons/solid';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { apikey, convertCompanyNamesApi } from '../api/apikey';
import colors from '../utils/colors';
import { Fonts, StyledText } from '../utils/fontText';
import { domainNameSchema, domainSchema } from '../utils/form-validation';
import Loading from '../utils/loadingUI';
import { CCNCard, CCNCardProps } from './renderComponents/CCNCard';
import { Linking, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
interface SimilarDomainSearchProps {

}

export const SimilarDomainSearch: React.FC<SimilarDomainSearchProps> = ({ }) => {
    const [loading, setLoading] = React.useState<boolean>(false)
    const [data, setData] = React.useState<AxiosResponse>()
    let bgcol = useColorModeValue(colors.lightGray, colors.ebony)
    let borcol = useColorModeValue(colors.ebony, colors.lightGray)
    const {
        values, handleBlur, handleChange, handleSubmit, errors
    } = useFormik({
        initialValues: {
            name: ''
        }, validationSchema: domainNameSchema,
        onSubmit: () => {
            console.log(values.name);

            setLoading(true)
            axios.post(convertCompanyNamesApi, { "api_key": apikey, 'company_name': values.name })
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
                <StyledText content={`Leadistro is Searching Domains Index`} fontFamily={Fonts.RwBold} fontSize={'xl'} />
                <StyledText content={`of ${values.name}`} fontFamily={Fonts.RwSemiBold} fontSize={'2xl'} />
                <Center h={'full'}>
                    <Loading />
                </Center>
            </VStack>
        </>

    }
    return (
        <KeyboardAwareScrollView style={{ backgroundColor: useColorModeValue(colors.lightGray, colors.ebony), height: '100%' }} enableOnAndroid={true}>
            <View h={'full'} borderTopColor={useColorModeValue(colors.coolGray, colors.lightGray)} borderTopWidth={1} backgroundColor={useColorModeValue(colors.lightGray, colors.ebony)}>
                <VStack alignItems={'center'} space={3}>
                    <StyledText mx={4} content={'Find Similar Domains & Company names'} fontFamily={Fonts.RwBlack} letterSpacing={0.75} fontSize={'2xl'} textAlign={'center'} />
                    <Input fontFamily={Fonts.RwSemiBold} mx={'5'} variant={'rounded'} placeholder={'Enter The domain'} placeholderTextColor={useColorModeValue(colors.coolGray, colors.lightGray)}

                        blurOnSubmit={true} onChangeText={handleChange('name')} onBlur={handleBlur('name')} value={values.name} autoCapitalize={'none'} autoCorrect={false}
                        borderColor={errors.name ? useColorModeValue(colors.gray, colors.coolGray) : useColorModeValue(colors.gray, colors.coolGray)}
                        InputRightElement={
                            <TouchableOpacity onPress={async () => {
                                handleSubmit()
                                console.log(values.name);

                            }}>
                                <SearchCircleIcon size={25} color={useColorModeValue(colors.ebony, colors.white)} style={{ marginHorizontal: 15 }} />
                            </TouchableOpacity>
                        }
                    />
                    <Center>
                        {errors.name && <StyledText fontSize={12} mt={1} mb={'1'} fontFamily={Fonts.RwSemiBold} content={errors.name} />}
                    </Center>

                </VStack>
                <Box mt={3} >
                    {data && <CCNCard
                        items={data?.data['data']}
                        render={(item: CCNCardProps) =>
                            <VStack alignItems={'center'} rounded={'3xl'} mx={4} my={3} py={4} borderWidth={0.75} borderColor={borcol} bgColor={bgcol}>
                                <StyledText content={`${item.name}`} fontFamily={Fonts.RwMed} letterSpacing={1} fontSize={'xl'} isTrunc={true} />
                                <TouchableOpacity onPress={async () => {
                                    let supported = await Linking.canOpenURL(`https://www.${item.domain}`)
                                    console.log(supported);

                                    if (supported) {
                                        await Linking.openURL(`https://www.${item.domain}`)
                                    } else {
                                        Alert.alert(`Something doesn't feel right`, 'The Domain might be faulty or has changed Namespaces', [
                                            {
                                                text: 'Okay I understand',
                                                style: 'cancel'
                                            }
                                        ],)
                                    }
                                }}>
                                    <StyledText content={`${item.domain}`} fontFamily={Fonts.RwSemiBold} letterSpacing={1.5} fontSize={'lg'} />
                                </TouchableOpacity>
                            </VStack>
                        }
                    />
                    }
                     {
                        data === undefined
                            ?
                            <Center borderColor={borcol} bgColor={bgcol} my={10} mx={8} py={8} px={3} rounded={'2xl'} borderWidth={1}>
                                <StyledText content={'Looks like you did not search anything yet'} letterSpacing={5}
                                    fontSize={'2xl'} textAlign={'center'} fontFamily={Fonts.RwBlack} />
                                <StyledText content={'leadistro ©'} mt={10} letterSpacing={0.75}
                                    fontSize={'2xl'} textAlign={'center'} fontFamily={Fonts.RwSemiBold} />
                            </Center>
                            :
                            null
                    }

                </Box>
            </View>
        </KeyboardAwareScrollView>
    );
}

