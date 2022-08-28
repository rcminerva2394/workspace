import React, { useContext, useState, useEffect, useMemo } from 'react'
import {
    auth,
    googleProvider,
    facebookProvider,
    githubProvider,
} from '../firebase'

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    // const [loading, setLoading] = useState(true)

    const logInWithGoogle = () => {
        return auth.signInWithPopup(googleProvider)
        // will be used for sign up too using additional AdditionalUserinfo.isNewUser
    }

    const logInWithFacebook = () => {
        return auth.signInWithPopup(facebookProvider)
        // will be used for sign up too using additional AdditionalUserinfo.isNewUser
    }

    const logInWithGithub = () => {
        return auth.signInWithPopup(githubProvider)
        // will be used for sign up too using additional AdditionalUserinfor.isNewUser
    }

    const signUpWithEmailPassword = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const signInWithEmailPassword = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            // setLoading(false)
        })
        return unsubscribe
    }, [])

    const authValue = useMemo(
        () => ({
            currentUser,
            logInWithGoogle,
            logInWithFacebook,
            logInWithGithub,
            signUpWithEmailPassword,
            signInWithEmailPassword,
            resetPassword,
        }),
        []
    )

    return (
        <AuthProvider.Provider value={authValue}>
            {children}
        </AuthProvider.Provider>
    )
}
