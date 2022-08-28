import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/analytics'

import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider,
} from 'firebase/auth'

firebase.initializeApp({
    apiKey: 'process.env.REACT_APP_FIREBASE_API_KEY',
    authDomain: 'process.env.REACT_APP_FIREBASE_AUTH_DOMAIN',
    projectId: 'process.env.REACT_APP_FIREBASE_PROJECT_ID',
    storageBucket: 'process.env.REACT_APP_FIREBASE_STORAGE_BUCKET',
    messagingSenderId: 'process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
    appId: 'process.env.REACT_APP_FIREBASE_APP_ID',
    measurementId: 'process.env.REACT_APP_FIREBASE_MEASUREMENT_ID',
})

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const analytics = firebase.analytics()
export const googleProvider = new GoogleAuthProvider()
export const facebookProvider = new FacebookAuthProvider()
export const githubProvider = new GithubAuthProvider()

if (window.location.hostname.includes('localhost')) {
    auth.useEmulator('http://localhost:9099')
    firestore.useEmulator('localhost', 8080)
}
