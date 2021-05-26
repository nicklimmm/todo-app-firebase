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
          <Card.Header className="d-flex">
            <div className="flex-grow-1 align-self-center">
              {todo.description}
            </div>
            {!dateIsSameOrAfterToday(todo.endDate) && todo.endDate !== "" && (
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
            <Button variant="primary" className="mx-1" onClick={openModal}>
              <i className="bi bi-pencil-square"></i>
            </Button>
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
      </Accordion>{" "}
    </>
  )
}

export default Todo
