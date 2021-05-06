import React, { createContext, useContext, useState, useEffect } from "react"
import firebase from "firebase"
import { auth } from "../firebase"
import { User, AuthContextType } from "../types"

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  signUp: (email, password) => console.log("AuthProvider not available"),
  signIn: (email, password) => console.log("AuthProvider not available"),
  signOut: () => console.log("AuthProvider not available"),
  resetPassword: (email) => console.log("AuthProvider not available"),
})

export const useAuth = (): AuthContextType => useContext(AuthContext)

export const AuthProvider: React.FC<React.ReactNode> = ({
  children,
}): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<User>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const signUp = (
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> =>
    auth.createUserWithEmailAndPassword(email, password)

  const signIn = (
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> =>
    auth.signInWithEmailAndPassword(email, password)

  const signOut = (): Promise<void> => auth.signOut()

  const resetPassword = (email: string): Promise<void> =>
    auth.sendPasswordResetEmail(email)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value: AuthContextType = {
    currentUser,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
