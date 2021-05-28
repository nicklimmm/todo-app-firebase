import React, { useState } from "react"
import { Accordion, Button, Card } from "react-bootstrap"
import { dateIsSameOrAfterToday } from "../helpers/Date"
import { priorityColor } from "../helpers/Todo"
import { useDatabase } from "../hooks/Database"
import { TodoType } from "../types"
import EditTodoModal from "./EditTodoModal"

export type TodoProps = {
  todo: TodoType
}

const Todo: React.FC<TodoProps> = ({ todo }): JSX.Element => {
  const { toggleDoneTodo, deleteTodo } = useDatabase()
  const [showModal, setShowModal] = useState(false)
  const openModal = () => {
    setShowModal(true)
  }
  const closeModal = () => {
    setShowModal(false)
  }
  return (
    <>
      {showModal && (
        <EditTodoModal
          todo={todo}
          showModal={showModal}
          closeModal={closeModal}
        />
      )}
      <Accordion>
        <Card border={priorityColor(todo.priority)} className="my-1">
          <Card.Header className="row">
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey={todo.id}
              className="col-auto mx-2 p-0"
            >
              <i className="bi bi-caret-down-fill"></i>
            </Accordion.Toggle>
            <div
              className="flex-grow-1 align-self-center"
              style={todo.isDone ? { textDecoration: "line-through" } : {}}
            >
              {todo.description}
            </div>
            <div className="col-md-auto d-flex">
              {todo.endDate !== "" && (
                <span
                  className="align-self-center mr-1"
                  style={
                    !dateIsSameOrAfterToday(todo.endDate)
                      ? {
                          color: "#DC3D45",
                          fontWeight: "bold",
                        }
                      : {}
                  }
                >
                  {todo.endDate}
                </span>
              )}
              <div className="buttons ml-auto">
                <Button variant="primary" className="" onClick={openModal}>
                  <i className="bi bi-pencil-square"></i>
                </Button>
                {todo.isDone ? (
                  <Button
                    variant="warning"
                    className="mx-1"
                    onClick={() => {
                      toggleDoneTodo(todo.id)
                    }}
                  >
                    <i className="bi bi-x-circle"></i>
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    className="ml-1"
                    onClick={() => {
                      toggleDoneTodo(todo.id)
                    }}
                  >
                    <i className="bi bi-check-circle"></i>
                  </Button>
                )}
                <Button
                  variant="danger"
                  className="ml-1"
                  onClick={() => {
                    deleteTodo(todo.id)
                  }}
                >
                  <i className="bi bi-trash-fill"></i>
                </Button>
              </div>
            </div>
          </Card.Header>
          <Accordion.Collapse eventKey={todo.id}>
            <Card.Body>{todo.notes}</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>{" "}
    </>
  )
}

export default Todo
