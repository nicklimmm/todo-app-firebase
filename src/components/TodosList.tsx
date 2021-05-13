import React, { useEffect } from "react"
import { useTodos } from "../contexts/TodosContext"
import { TodoType, PrioritiesEnum } from "../types"
import { Accordion, Button, Card, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { db } from "../firebase"
import { useDatabase } from "../hooks/Database"
import { dateIsSameOrAfterToday } from "../helpers/Date"
import firebase from "firebase"

const priorityColor = (priority: PrioritiesEnum): string => {
  switch (+priority) {
    case PrioritiesEnum.Low:
      return "primary"
    case PrioritiesEnum.Medium:
      return "warning"
    case PrioritiesEnum.High:
      return "danger"
    default:
      return ""
  }
}

const TodosList: React.FC = (): JSX.Element => {
  const { todos, setTodos } = useTodos()
  const { toggleDoneTodo, deleteTodo } = useDatabase()
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
      <Accordion>
        {todos
          .filter((todo: TodoType): boolean => !todo.isDone)
          .map((todo: TodoType): JSX.Element => {
            return (
              <Card
                key={todo.id}
                border={priorityColor(todo.priority)}
                className="my-1"
              >
                <Card.Header className="d-flex">
                  <div className="flex-grow-1 align-self-center">
                    {todo.description}
                  </div>
                  {!dateIsSameOrAfterToday(todo.endDate) && (
                    <div
                      className="align-self-center mx-1"
                      style={{ color: "#DC3D45" }}
                    >
                      Overdue
                    </div>
                  )}
                  {todo.notes !== "" && (
                    <Accordion.Toggle
                      as={Button}
                      variant="link"
                      eventKey={todo.id}
                      className="mx-1"
                    >
                      <i className="bi bi-caret-down-fill"></i>
                    </Accordion.Toggle>
                  )}
                  {todo.endDate !== "" && (
                    <div className="align-self-center mx-1">{todo.endDate}</div>
                  )}
                  <Button
                    variant="success"
                    className="mx-1"
                    onClick={() => {
                      toggleDoneTodo(todo.id)
                    }}
                  >
                    <i className="bi bi-check-circle"></i>
                  </Button>
                  <Button
                    variant="danger"
                    className="mx-1"
                    onClick={() => {
                      deleteTodo(todo.id)
                    }}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </Button>
                </Card.Header>
                <Accordion.Collapse eventKey={todo.id}>
                  <Card.Body>{todo.notes}</Card.Body>
                </Accordion.Collapse>
              </Card>
            )
          })}
      </Accordion>
    </Container>
  )
}

export default TodosList
