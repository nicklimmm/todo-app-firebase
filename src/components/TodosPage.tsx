import React from "react"
import TodosProvider from "../contexts/TodosContext"
import TodoForm from "./TodoForm"
import TodoList from "./TodosList"
import CompletedTodosList from "./CompletedTodosList"

const TodosPage: React.FC<{}> = () => {
  return (
    <TodosProvider>
      <TodoForm />
      <TodoList />
      <CompletedTodosList />
    </TodosProvider>
  )
}

export default TodosPage
