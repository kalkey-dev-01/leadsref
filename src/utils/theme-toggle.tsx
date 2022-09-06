import React from 'react'
import { Text, HStack, Switch, useColorMode, Center, Flex } from 'native-base'

export default function ThemeToggle() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (    
            <Switch size={'md'} isChecked={colorMode === 'light'} onToggle={toggleColorMode} />
        
    )
}