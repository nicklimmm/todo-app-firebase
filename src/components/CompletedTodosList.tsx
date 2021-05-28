import React from "react"
import { useTodos } from "../contexts/TodosContext"
import { TodoType } from "../types"
import { Container } from "react-bootstrap"
import Todo from "./Todo"

const CompletedTodosList: React.FC = (): JSX.Element => {
  const { todos } = useTodos()

  return (
    <Container fluid="sm" className="px-4 mb-4">
      <h3 className="text-center">Completed Todos List</h3>
      {todos
        .filter((todo: TodoType): boolean => todo.isDone)
        .map((todo: TodoType): JSX.Element => {
          return <Todo todo={todo} key={todo.id} />
        })}
    </Container>
  )
}

export default CompletedTodosList
