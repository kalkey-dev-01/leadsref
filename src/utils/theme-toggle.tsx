import React from 'react'
import { Text, HStack, Switch, useColorMode, Center, Flex } from 'native-base'

export default function ThemeToggle() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (    
            <Switch isChecked={colorMode === 'light'} onToggle={toggleColorMode} />
        
    )
}