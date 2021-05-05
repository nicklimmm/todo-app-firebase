import React, { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Alert, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import TodosProvider from "../contexts/TodosContext"
import TodoForm from "./TodoForm"
import TodoList from "./TodosList"

const TodosPage: React.FC<{}> = () => {
  const { signOut } = useAuth()
  const [error, setError] = useState<string>("")
  const history = useHistory()

  const handleSignOut = async () => {
    try {
      await signOut()
      history.push("/signin")
    } catch (error) {
      setError(error)
    }
  }

  return (
    <TodosProvider>
      <TodoForm />
      <TodoList />
      <div className="text-center">
        <Button variant="link" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
    </TodosProvider>
  )
}

export default TodosPage
