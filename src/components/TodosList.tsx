import React from "react"
import { useTodos, TodoType, PrioritiesEnum } from "../contexts/TodosContext"
import { Accordion, Button, Card, Container } from "react-bootstrap"

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

const TodosList = () => {
  const { todos, toggleTodoDone, removeTodo } = useTodos()

  return (
    <Container fluid="sm" className="px-4">
      <Accordion>
        {todos
          .filter((todo: TodoType): boolean => !todo.isDone)
          .map(
            (todo: TodoType): JSX.Element => {
              return (
                <Card
                  key={todo.id.toString()}
                  border={priorityColor(todo.priority)}
                  className="my-1"
                >
                  <Card.Header className="d-flex">
                    <div className="flex-grow-1 align-self-center">
                      {todo.description}
                    </div>
                    <Accordion.Toggle
                      as={Button}
                      variant="link"
                      eventKey={todo.id.toString()}
                      className="mx-1"
                    >
                      <i className="bi bi-caret-down-fill"></i>
                    </Accordion.Toggle>
                    <Button
                      variant="success"
                      className="mx-1"
                      onClick={() => {
                        toggleTodoDone(todo.id)
                      }}
                    >
                      <i className="bi bi-check-circle"></i>
                    </Button>
                    <Button
                      variant="danger"
                      className="mx-1"
                      onClick={() => {
                        removeTodo(todo.id)
                      }}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                  </Card.Header>
                  <Accordion.Collapse eventKey={todo.id.toString()}>
                    <Card.Body>{todo.notes}</Card.Body>
                  </Accordion.Collapse>
                </Card>
              )
            }
          )}
      </Accordion>
    </Container>
  )
}

export default TodosList
