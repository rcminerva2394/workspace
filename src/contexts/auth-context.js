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
    const navigate = useNavigate()

    // function to create user document
    const setUserDoc = async () => {
        try {
            const { uid, email, displayName, photoURL } = auth.currentUser
            console.log(auth.currentUser)

            // Use the uid as a firestore user docID
            const docRef = doc(db, 'users', uid)

            // Set it
            await setDoc(
                docRef,
                {
                    id: uid,
                    name: displayName,
                    userEmail: email,
                    photo: photoURL,
                },
                { merge: true }
            )
        } catch (err) {
            console.log('Error setting a document', err)
        }
    }

    const logInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
            setUserDoc()
            navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }
    }

    const logInWithFacebook = async () => {
        try {
            await signInWithPopup(auth, facebookProvider)
            navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }
    }

    const logInWithGithub = async () => {
        try {
            await signInWithPopup(auth, githubProvider)
            navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }
    }

    const signUpWithEmailPassword = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInWithEmailPassword = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
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
