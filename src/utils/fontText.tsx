import { Box, Heading, HStack, Text, useColorModeValue } from 'native-base'
import React from 'react'
import colors from './colors'


export const Fonts = {
    RwThin: 'Raleway_100Thin',
    RwExLight: 'Raleway_200ExtraLight',
    RwLight: 'Raleway_300Light',
    RwReg: 'Raleway_400Regular',
    RwMed: 'Raleway_500Medium',
    RwSemiBold: 'Raleway_600SemiBold',
    RwBold: 'Raleway_700Bold',
    RwExBold: 'Raleway_800ExtraBold',
    RwBlack: 'Raleway_900Black'
}
interface Props {
    content: string,
    fontFamily: string,
    fontSize?: number,
    my?: string | number,
    mx?: string | number,
    pb?: string | number,
    pt?: string | number,
    pl?: string | number,
    pr?: string | number,
    letterSpacing?: string | number
}

export const StyledText: React.FC<Props> = ({
    content, fontFamily, fontSize, my, mx, pb, pt, pl, pr, letterSpacing
}) => {
    return (
        <Text color={useColorModeValue(colors.ebony, colors.white)}
            mx={mx} my={my} pb={pb} pt={pt} pl={pl} pr={pr} letterSpacing={letterSpacing}
            fontSize={fontSize} style={{ fontFamily: fontFamily }}>
            {content}
        </Text>
    )

}


