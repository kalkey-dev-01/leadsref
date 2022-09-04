import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { firebase } from '../../firebase'
import { SignedInStack, SignedOutStack } from '../routes'



const AuthNav = () => {
    const [currentUser, setCurrentUser] = React.useState(null)
    const useUserhandler = (user: any) =>
        user ? setCurrentUser(user) : setCurrentUser(null)



    useEffect(() => firebase.auth().onAuthStateChanged(user => useUserhandler(user)), [])

    return (
        <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>
    )
}

export default AuthNav