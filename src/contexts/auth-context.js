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
    fetchSignInMethodsForEmail,
} from 'firebase/auth'

import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase.config'

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const googleProvider = new GoogleAuthProvider()
    const facebookProvider = new FacebookAuthProvider()
    const githubProvider = new GithubAuthProvider()
    const [user, setUser] = useState()
    const [error, setError] = useState()
    const navigate = useNavigate()

    // function to create a user document
    const setUserDoc = async () => {
        const { uid, email, displayName, photoURL, emailVerified, metadata } =
            auth.currentUser
        try {
            // Use the uid as a firestore user docID
            const docRef = doc(db, 'users', uid)

            // Set it
            await setDoc(
                docRef,
                {
                    userId: uid,
                    name: displayName,
                    userEmail: email,
                    photo: photoURL,
                    isEmailVerified: emailVerified,
                    created: metadata.creationTime || null,
                    lastSignIn: metadata.lastSignInTime,
                },
                { merge: true }
            )
        } catch (err) {
            console.log('Error setting a document', err)
        }
    }

    const logInWithGoogle = async () => {
        const result = await signInWithPopup(auth, googleProvider)
        const { isNewUser } = getAdditionalUserInfo(result)
        if (isNewUser) {
            setUserDoc()
        }
        navigate('/dashboard')
    }

    const logInWithFacebook = async () => {
        try {
            const result = await signInWithPopup(auth, facebookProvider)
            const { isNewUser } = getAdditionalUserInfo(result)
            if (isNewUser) {
                setUserDoc()
            }
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
                setUserDoc()
            }
            navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }
    }

    const signUpWithEmailPassword = async (email, password) => {
        try {
            setError('')
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            const { uid, displayName, photoURL, emailVerified, metadata } =
                result.user
            const userRef = doc(db, 'users', uid)
            setDoc(
                userRef,
                {
                    userId: uid,
                    name: displayName,
                    userEmail: email,
                    photo: photoURL,
                    isEmailVerified: emailVerified,
                    created: metadata.creationTime || null,
                    lastSignIn: metadata.lastSignInTime,
                },
                { merge: true }
            )
            navigate('dashboard')
        } catch (err) {
            console.log(err.code, err.message)
            setError(err.message)
        }
    }

    const signInWithEmailPassword = async (email, password) => {
        // check if user already exists, if yes, sign in the user, if not, encourage user to use sign up form
        const result = await fetchSignInMethodsForEmail(auth, email)
        if (result.length === 1) {
            signInWithEmailAndPassword(auth, email, password)
            navigate('/dashboard')
        }
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (theUser) => {
            setUser(theUser)
        })
        return unsubscribe
    }, [])

    const authValue = useMemo(
        () => ({
            user,
            error,
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
