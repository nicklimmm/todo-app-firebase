import { db } from "../firebase"
import { useAuth } from "../contexts/AuthContext"
import { TodoType } from "../types"
import firebase from "firebase"

export type DatabaseType = {
  todosCountRef: firebase.database.Reference
  todosRef: firebase.database.Reference
  pushTodo: (todo: TodoType) => void
  toggleDoneTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

export const useDatabase = (): DatabaseType => {
  const { currentUser } = useAuth()
  const todosCountRef: firebase.database.Reference = db.ref(
    `users/${currentUser!.uid}/todosCount`
  )
  const todosRef: firebase.database.Reference = db.ref(
    `users/${currentUser!.uid}/todos`
  )

  const pushTodo = (todo: TodoType): void => {
    // todosRef.push(todo)
    const pushedTodoRef = db.ref(`users/${currentUser!.uid}/todos`).push()

    if (pushedTodoRef.key == null) {
      alert("Key is null")
      return
    }

    todo.id = pushedTodoRef.key
    todo.startDate = new Date().toISOString()

    // Update endDate if entered
    if (todo.endDate !== "") todo.endDate = new Date(todo.endDate).toISOString()

    pushedTodoRef.set(todo)
  }

  const toggleDoneTodo = (id: string): void => {
    todosRef.child(`${id}/isDone/`).transaction((isDone) => !isDone)
  }

  const deleteTodo = (id: string): void => {
    todosRef.child(`${id}/`).remove()
  }

  return {
    todosCountRef,
    todosRef,
    pushTodo,
    deleteTodo,
    toggleDoneTodo,
  }
}
