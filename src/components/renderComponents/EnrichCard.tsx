import { Text, View } from 'native-base';
import React from 'react'
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

export type ListComponent = <T>(
    { items, render }: { items: T[]; render: (item: T) => React.ReactNode }
) => React.ReactElement;





// function List<T>({ items, render }: {
//     items: T[]
//     render: (item: T) => React.ReactNode
// }) {
//     return (
//         <>
//             {items.map((item, index) => <>

//             </>
//         )}
//         </>
//     );
// }



const EnrichCard: ListComponent = ({ items, render }) => {
    
    return (
        <View>
            {items.map((item, index) => <><Text>{render(item)}</Text></>)}
        </View>

    )
}




export default EnrichCard