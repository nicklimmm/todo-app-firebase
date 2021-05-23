import React, { useEffect } from "react"
import { useTodos } from "../contexts/TodosContext"
import { TodoType } from "../types"
import { Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { db } from "../firebase"
import firebase from "firebase"
import Todo from "./Todo"

const TodosList: React.FC = (): JSX.Element => {
  const { todos, setTodos } = useTodos()
  const { currentUser } = useAuth()

  // Always listen for any updates
  useEffect(() => {
    const todosRef: firebase.database.Reference = db.ref(
      `users/${currentUser!.uid}/todos`
    )
    const listener = todosRef.on("value", (snapshot) => {
      const fetchedTodos = [] as TodoType[]
      snapshot.forEach((child) => {
        fetchedTodos.push(child.val())
      })
      fetchedTodos.sort((todo1, todo2) => todo2.priority - todo1.priority)
      setTodos(fetchedTodos)
    })
    return () => todosRef.off("value", listener)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container fluid="sm" className="px-4 mb-4">
      <h3 className="text-center">Todos List</h3>
      {todos
        .filter((todo: TodoType): boolean => !todo.isDone)
        .map((todo: TodoType): JSX.Element => {
          return <Todo todo={todo} key={todo.id} />
        })}
    </Container>
  )
}

export default TodosList
