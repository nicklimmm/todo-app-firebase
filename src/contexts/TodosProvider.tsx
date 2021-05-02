import React, { createContext, useContext } from "react"
import { useState } from "react"

export enum PrioritiesEnum {
  None,
  Low,
  Medium,
  High,
}

export type Todo = {
  id: number
  description: string
  notes: string
  startDate: string
  endDate: string
  isDone: boolean
  priority: PrioritiesEnum
}

export type TodosContextType = {
  todos: Todo[]
  setTodos: (todos: Todo[]) => void
  toggleTodoDone: (id: number) => void
  removeTodo: (id: number) => void
}

export const TodosContext = createContext<TodosContextType>({
  todos: [] as Todo[],
  setTodos: (todos) => console.warn("No Todos Provider"),
  toggleTodoDone: (id) => console.warn("No Todos Provider"),
  removeTodo: (id) => console.warn("No Todos Provider"),
})

export const useTodos = () => {
  return useContext(TodosContext)
}

const TodosProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState([] as Todo[])
  const toggleTodoDone = (id: number): void => {
    setTodos(
      todos.map((todo: Todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: true,
          }
        }
        return todo
      })
    )
  }

  const removeTodo = (id: number): void => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }
  return (
    <TodosContext.Provider
      value={{
        todos: todos,
        setTodos: setTodos,
        toggleTodoDone: toggleTodoDone,
        removeTodo: removeTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  )
}

export default TodosProvider
