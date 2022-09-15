import { View, Text, VStack, Box, Center, AspectRatio } from 'native-base'
import React from 'react'
import AnimatedLottieView from 'lottie-react-native'
import { Fonts, StyledText } from './fontText'
import colors from './colors'


const Loading: React.FC<{}> = ({ }) => {
    React.useEffect(() => {
        ref.current?.play()
    }, [])
    const ref = React.useRef<AnimatedLottieView>(null)
    return (
        <Box>
            <AnimatedLottieView ref={ref} source={require('../../assets/blackloading.json')} autoPlay={true} loop autoSize={true}  />
        </Box>
    )
}

export default Loading