import { Center, Text, useColorModeValue, View } from 'native-base'
import React from 'react'
import { BackspaceIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../utils/colors';
import { firebase } from '../../firebase'
import { useFormik } from 'formik';
import { domainSchema } from '../utils/form-validation';
import EnrichCard from './renderComponents/EnrichCard';
import axios from'axios';
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
    const [data, setData] = React.useState<RootObject[]>([])
    const {
        values, handleBlur, handleChange, handleSubmit, errors
    } = useFormik({
        initialValues: {
            domain: ''
        }, validationSchema: domainSchema,
        onSubmit: () => {
            console.log('domain submitted successfully');

        }
    })
  

    return (
        <View h={'full'} borderTopColor={useColorModeValue(colors.coolGray, colors.white)} borderTopWidth={'1'} backgroundColor={useColorModeValue(colors.lightGray, colors.ebony)}>
            <Center>
                <Text>Enrich Company</Text>
                <EnrichCard items={data}
                    render={(item) => `Data is ${item}`}
                />
            </Center>
        </View>

    );
}