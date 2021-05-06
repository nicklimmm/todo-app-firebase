import React, { createContext, useContext } from "react"
import { useState } from "react"
import { TodoType, TodosContextType } from "../types"

export const TodosContext = createContext<TodosContextType>({
  todos: [] as TodoType[],
  setTodos: (todos) => console.error("No Todos Provider"),
})

export const useTodos = () => {
  return useContext(TodosContext)
}

const TodosProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState([] as TodoType[])
  return (
    <TodosContext.Provider
      value={{
        todos: todos,
        setTodos: setTodos,
      }}
    >
      {children}
    </TodosContext.Provider>
  )
}

export default TodosProvider
