import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
    apiKey: 'process.env.REACT_APP_FIREBASE_API_KEY',
    authDomain: 'process.env.REACT_APP_FIREBASE_AUTH_DOMAIN',
    projectId: 'workspace-cda03',
    storageBucket: 'process.env.REACT_APP_FIREBASE_STORAGE_BUCKET',
    messagingSenderId: 'process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
    appId: 'process.env.REACT_APP_FIREBASE_APP_ID',
    measurementId: 'process.env.REACT_APP_FIREBASE_MEASUREMENT_ID',
}
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
export const analytics = getAnalytics(app)

if (window.location.hostname.includes('localhost')) {
    connectAuthEmulator(auth, 'http://localhost:9099')
    connectFirestoreEmulator(db, 'localhost', 3010)
}
