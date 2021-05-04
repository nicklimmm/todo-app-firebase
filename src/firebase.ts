import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

export type Config = {
  apiKey: string | undefined
  authDomain: string | undefined
  projectId: string | undefined
  storageBucket: string | undefined
  messagingSenderId: string | undefined
  appId: string | undefined
  databaseURL: string | undefined
}

// Your web app's Firebase configuration
const firebaseConfig: Config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export const auth: firebase.auth.Auth = firebase.auth()
export const db: firebase.database.Database = firebase.database()
