import { Box, Center, HStack, Input, Text, useColorModeValue, View, VStack } from 'native-base'
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
                    <StyledText my={3} mx={4} px={4} content={'Individual Email Lookup'} fontFamily={Fonts.RwBlack} letterSpacing={0.75} fontSize={'2xl'} textAlign={'center'} />
                    <VStack alignItems={'center'} space={3} my={4}>
                        <Input fontFamily={Fonts.RwSemiBold} mx={'4'} variant={'rounded'} placeholder={'First Name'} placeholderTextColor={useColorModeValue(colors.coolGray, colors.lightGray)}
                            paddingLeft={0}
                            blurOnSubmit={true} onChangeText={handleChange('first_name')} onBlur={handleBlur('first_name')} value={values.first_name} autoCapitalize={'none'} autoCorrect={false}
                            borderColor={errors.first_name ? useColorModeValue(colors.gray, colors.coolGray) : useColorModeValue(colors.gray, colors.coolGray)}
                        />
                        <Input fontFamily={Fonts.RwSemiBold} mx={'4'} variant={'rounded'} placeholder={'First Name'} placeholderTextColor={useColorModeValue(colors.coolGray, colors.lightGray)}

                            blurOnSubmit={true} onChangeText={handleChange('last_name')} onBlur={handleBlur('last_name')} value={values.last_name} autoCapitalize={'none'} autoCorrect={false}
                            borderColor={errors.last_name ? useColorModeValue(colors.gray, colors.coolGray) : useColorModeValue(colors.gray, colors.coolGray)}
                        />
                        <Input fontFamily={Fonts.RwSemiBold} mx={'4'} variant={'rounded'} placeholder={'Domain'} placeholderTextColor={useColorModeValue(colors.coolGray, colors.lightGray)}

                            blurOnSubmit={true} onChangeText={handleChange('domain')} onBlur={handleBlur('domain')} value={values.domain} autoCapitalize={'none'} autoCorrect={false}
                            borderColor={errors.domain ? useColorModeValue(colors.gray, colors.coolGray) : useColorModeValue(colors.gray, colors.coolGray)}
                        />
                    </VStack>
                    {errors &&                        
                        <Box mx={4} px={4}>
                            {errors.first_name && <StyledText fontSize={12} mt={1} mb={'1'} fontFamily={Fonts.RwSemiBold} content={errors.first_name} />}
                            {errors.last_name && <StyledText fontSize={12} mt={1} mb={'1'} fontFamily={Fonts.RwSemiBold} content={errors.last_name} />}
                            {errors.domain && <StyledText fontSize={12} mt={1} mb={'1'} fontFamily={Fonts.RwSemiBold} content={errors.domain} />}
                        </Box>
                    }
                </VStack>
            </View>
        </KeyboardAwareScrollView>
    );
}