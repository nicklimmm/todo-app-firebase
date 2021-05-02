import React from "react"
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"
import TodosProvider from "./contexts/TodosProvider"

function App() {
  return (
    <TodosProvider>
      <TodoForm />
      <TodoList />
    </TodosProvider>
  )
}

export default App
