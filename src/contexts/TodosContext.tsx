import React, { createContext, useContext, useState } from "react"
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
        todos,
        setTodos,
      }}
    >
      {children}
    </TodosContext.Provider>
  )
}

export default TodosProvider
