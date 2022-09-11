import { Box, Center, Heading, HStack, Input, Text, useColorModeValue, View, VStack } from 'native-base'
import React, { useCallback, useEffect } from 'react'
import { IdentificationIcon, SearchCircleIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../utils/colors';
import { firebase } from '../../firebase'
import { useFormik } from 'formik';
import { domainSchema } from '../utils/form-validation';
import EnrichCard from './renderComponents/EnrichCard';
import axios, { AxiosResponse } from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Animated, { useAnimatedStyle, withTiming, withSpring, useSharedValue } from 'react-native-reanimated'
import { apikey, employeesApi } from '../api/apikey';
import { TouchableOpacity } from 'react-native-gesture-handler';
interface EnrichCompanyProps {

}

interface RootObject {
    first_name: string;
    last_name: string;
    headline: string;
    job_title: string;
    location: string;
    business_email: string;
    personal_email: string;
    phone: string;
    social_url: string;
    description: string;
    company_name: string;
    keywords: any[];
    connections_count: string;
    picture: string;
    city: string;
    linkedin_id: number;
    skills: string;
    past_company: any[];
    rewards: any[];
    industry: string;
    company_domain: string;
    company_industry: string;
    company_address: string;
    company_country: string;
    company_founded: string;
    company_size: string;
    company_linkedin_url: string;
    company_phone: string;
    company_type: string;
    company_id: string;
    email_format: string;
}
export const EnrichCompany: React.FC<EnrichCompanyProps> = ({ }) => {
    const [data, setData] = React.useState<AxiosResponse>()
    const [loading, setLoading] = React.useState<boolean>(false)
    let bgcol = useColorModeValue(colors.lightGray, colors.ebony)
    let borcol = useColorModeValue(colors.ebony, colors.lightGray)

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
            <View h={'full'} bgColor={useColorModeValue(colors.lightGray, colors.ebony)}>
                <Center>
                    <Text fontSize={'lg'}>Loading</Text>
                </Center>
            </View>
        </>

    }


    return (
        <KeyboardAwareScrollView style={{ backgroundColor: useColorModeValue(colors.lightGray, colors.ebony), height: '100%' }} enableOnAndroid={true}>
            <View h={'full'} borderTopColor={useColorModeValue(colors.coolGray, colors.white)} borderTopWidth={'0.5'} backgroundColor={useColorModeValue(colors.lightGray, colors.ebony)}>
                <>
                    <HStack justifyContent={'space-between'} alignItems={'center'} mx={'4'} my={'3'}>
                        <Heading color={useColorModeValue(colors.ebony, colors.white)} size={'md'}>Search Employees Information</Heading>
                        <IdentificationIcon size={30} color={useColorModeValue(colors.ebony, colors.white)} />
                    </HStack>
                    <Input mx={'5'} variant={'rounded'} placeholder={'Enter The domain'} placeholderTextColor={useColorModeValue(colors.coolGray, colors.lightGray)}
                        onChangeText={handleChange('domain')} onBlur={handleBlur('domain')} value={values.domain} autoCapitalize={'none'} autoCorrect={false}
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
                        {errors.domain && <Text fontSize={'xs'} mt={'0.5'} mb={'1'} >{errors.domain}</Text>}
                    </Center>

                    {/* Complete Post Logic and Rendering */}

                    {data && <EnrichCard
                        items={data?.data['employees']}
                        render={(item: RootObject,) =>
                            <Box mx={3} my={3} borderWidth={1} borderRadius={'xl'} borderColor={borcol} bgColor={bgcol}  >
                                <VStack alignItems={'center'} >
                                    <HStack alignItems={'center'} space={'1'}>
                                        <Text>{item.first_name}</Text>
                                        <Text>{item.last_name}</Text>
                                    </HStack>
                                    <Text>{item.job_title}</Text>
                                </VStack>
                                <VStack alignItems={'center'}>
                                    {item.business_email !== "" ? <Text>{item.business_email}</Text> : <Text>No Business Email found</Text>}
                                    {item.personal_email !== "" ? <Text>{item.personal_email}</Text> : <Text>No Personal Email found</Text>}
                                    {item.phone !== "" ? <Text>{item.phone}</Text> : <Text>No Phone Number found</Text>}
                                    {item.social_url !== "" ? <Text>{item.social_url}</Text> : <Text>No Social Url found</Text>}
                                </VStack>
                            </Box>

                        }
                    />}


                </>
            </View>
        </KeyboardAwareScrollView>

    );
}