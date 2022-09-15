import { Square, useColorModeValue } from 'native-base'
import React from 'react'
import Animated, { useAnimatedStyle, useDerivedValue, withSpring, withTiming } from 'react-native-reanimated';
import colors from './colors';
import { N, SqSize } from './misc';
import { View } from 'react-native'


interface sq {
    index: number;
    progress: Animated.SharedValue<number>
}

const Sq: React.FC<sq> = ({ index, progress }) => {
    const offsetAngle = (2 * Math.PI) / N
    const finalAngle = offsetAngle * (N - 1 - index)
    const rotate = useDerivedValue(() => {
        if (progress?.value <= (2 * Math.PI)) {
            return (Math.min(finalAngle, progress?.value))
        }
        if (progress.value - 2 * Math.PI < finalAngle) {
            return finalAngle
        }
        return progress.value
    }, [])
    const translateY = useDerivedValue(() => {
        if (rotate.value === finalAngle) {
            return withSpring(-N * SqSize)
        }
        if (progress.value > 2 * Math.PI) {
            return withTiming((index - N) * SqSize)
        }
        return withTiming(-index * SqSize)
    })
    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: `${rotate.value}rad` },
                { translateY: translateY.value }
            ]
        };
    })

    return (
        <Animated.View style={[
            {
                height: SqSize, aspectRatio: 1,
                backgroundColor: useColorModeValue(colors.ebony, colors.white),
                 position: 'absolute'
            }, rStyle
        ]}
        />
    )
}

export default Sq