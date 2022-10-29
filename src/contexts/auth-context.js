import React, { useContext, useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    onAuthStateChanged,
    getAdditionalUserInfo,
} from 'firebase/auth'

import { auth } from '../firebase.config'
import setData from '../utils/writes/NewUserData'

import { useBoards } from './boards-context'

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const googleProvider = new GoogleAuthProvider()
    const facebookProvider = new FacebookAuthProvider()
    const githubProvider = new GithubAuthProvider()
    const [user, setUser] = useState()
    const navigate = useNavigate()
    const { setBoards } = useBoards()

    const logInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider)
            const { isNewUser } = getAdditionalUserInfo(result)
            if (isNewUser) {
                setData(auth.currentUser, setBoards)
            }
            setBoards([])
            navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }
    }

    const logInWithFacebook = async () => {
        try {
            const result = await signInWithPopup(auth, facebookProvider)
            const { isNewUser } = getAdditionalUserInfo(result)
            if (isNewUser) {
                setData(auth.currentUser, setBoards)
            }
            setBoards([])
            navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }
    }

    const logInWithGithub = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider)
            const { isNewUser } = getAdditionalUserInfo(result)
            if (isNewUser) {
                setData(auth.currentUser, setBoards)
            }
            setBoards([])
            navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }
    }

    const signUpWithEmailPassword = async (email, password) => {
        const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        )
        setBoards([])
        setData(result.user, setBoards)
    }

    const signInWithEmailPassword = async (email, password) => {
        const result = await signInWithEmailAndPassword(auth, email, password)
        setBoards([])
        console.log(result.user)
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (theUser) => {
            if (theUser) {
                setUser(theUser)
            }
        })

        return unsubscribe
    }, [])

    const authValue = useMemo(
        () => ({
            user,
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
