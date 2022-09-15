import { View, Text, VStack, Box, Center, AspectRatio, Square, useColorModeValue } from 'native-base'
import React from 'react'
import AnimatedLottieView from 'lottie-react-native'
import { Fonts, StyledText } from './fontText'
import colors from './colors'
import { Easing, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import Sq from './loadingClockSquare'
import { N } from './misc'






const Loading: React.FC<{}> = ({ }) => {
    const progress = useSharedValue(0)

    React.useEffect(() => {
        progress.value = withRepeat(withTiming(4 * Math.PI, { duration: 8000, easing: Easing.linear }), -1)
    }, [])

    return (

        <>
            {
                new Array(N).fill(0).map((_, i) => {
                    return <Sq key={i} index={i} progress={progress} />
                })
            }
        </>

    )
}

export default Loading