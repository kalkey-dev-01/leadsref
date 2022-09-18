
import { View, Text } from 'react-native'
import React from 'react'
import { ListComponent } from './EnrichCard'
import { Box } from 'native-base'

export interface CCNCardProps {
    name: string;
    domain: string;
    logo: string;
}

export const CCNCard: ListComponent = ({ items, render }) => {
    return (
        <View>
            {items.map((item, index) => <Box key={index.toString()}>{render(item)}</Box>)}
        </View>
    )
}


