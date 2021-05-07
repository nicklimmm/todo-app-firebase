import React from "react"
import TodosProvider from "../contexts/TodosContext"
import TodoForm from "./TodoForm"
import TodoList from "./TodosList"

const TodosPage: React.FC<{}> = () => {
  return (
    <TodosProvider>
      <TodoForm />
      <TodoList />
    </TodosProvider>
  )
}

export default TodosPage
