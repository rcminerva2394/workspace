import React, { useContext, useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

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
    const navigate = useNavigate()

    const logInWithGoogle = async () => {
        try {
            await auth.signInWithPopup(googleProvider)
            navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }
    }

    const logInWithFacebook = async () => {
        try {
            await auth.signInWithPopup(facebookProvider)
            navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }
    }

    const logInWithGithub = async () => {
        try {
            await auth.signInWithPopup(githubProvider)
            navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }
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
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    )
}
