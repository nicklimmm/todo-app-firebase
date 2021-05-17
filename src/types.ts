import firebase from "firebase"

export enum PrioritiesEnum {
  None,
  Low,
  Medium,
  High,
}

export type FirebaseConfigType = {
  apiKey: string | undefined
  authDomain: string | undefined
  projectId: string | undefined
  storageBucket: string | undefined
  messagingSenderId: string | undefined
  appId: string | undefined
  databaseURL: string | undefined
}

export type User = firebase.User | null

export type EmailAuthType = {
  email: string
  password?: string
  confirmPassword?: string
}

export type TodoType = {
  id: string
  description: string
  notes: string
  endDate: string
  isDone: boolean
  priority: PrioritiesEnum
}

export type TodosContextType = {
  todos: TodoType[]
  setTodos: (todos: TodoType[]) => void
}

export type AuthContextType = {
  currentUser: User
  signUp: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential> | void
  signIn: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential> | void
  signOut: () => Promise<void> | void
  resetPassword: (email: string) => Promise<void> | void
}

export type Errors = {
  passwordsMismatch?: string
}
