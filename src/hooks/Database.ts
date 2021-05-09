import { db } from "../firebase"
import { useAuth } from "../contexts/AuthContext"
import { TodoType } from "../types"
import firebase from "firebase"
import moment from "moment"

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
    const pushedTodoRef = db.ref(`users/${currentUser!.uid}/todos`).push()

    if (pushedTodoRef.key == null) {
      alert("Key is null")
      return
    }

    todo.id = pushedTodoRef.key

    // Clean whitespaces
    todo.description = todo.description.trim()
    todo.notes = todo.notes.trim()

    // Update endDate if entered
    if (todo.endDate !== "")
      todo.endDate = moment(todo.endDate).format("DD/MM/YYYY")

    pushedTodoRef.setWithPriority(todo, todo.priority)
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
