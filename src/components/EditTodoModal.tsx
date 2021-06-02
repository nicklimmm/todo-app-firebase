import React from "react"
import { Form, Button, Modal, Spinner } from "react-bootstrap"
import { useFormik } from "formik"
import { db } from "../firebase"
import { PrioritiesEnum, TodoType } from "../types"
import { convertDateToHTMLFormat, validateEndDate } from "../helpers/Date"
import { useAuth } from "../contexts/AuthContext"

export type EditTodoModalProps = {
  todo: TodoType
  showModal: boolean
  closeModal: () => void
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({
  todo,
  showModal,
  closeModal,
}): JSX.Element => {
  const { currentUser } = useAuth()
  const { handleSubmit, handleChange, values, isSubmitting } =
    useFormik<TodoType>({
      initialValues: {
        id: todo.id,
        description: todo.description,
        notes: todo.notes,
        endDate: convertDateToHTMLFormat(todo.endDate),
        isDone: todo.isDone,
        priority: todo.priority,
      },
      onSubmit: async () => {
        try {
          const todoRef = db.ref(`users/${currentUser!.uid}/todos/${values.id}`)
          await todoRef.set({
            id: todo.id,
            description: values.description,
            notes: values.notes,
            endDate: values.endDate,
            isDone: values.isDone,
            priority: values.priority,
          })

          alert("Successfully edited todo!")
          closeModal()
        } catch (err) {
          alert("An error occurred, please try again.")
          console.error(err)
        }
      },
    })
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header className="text-center">Edit</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="row">
          <Form.Group controlId="description" className="col-12">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="What's your next plan?"
              onChange={handleChange}
              value={values.description}
              required
            />
          </Form.Group>
          <Form.Group controlId="notes" className="col-12">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              name="notes"
              placeholder="Anything important to remember?"
              onChange={handleChange}
              value={values.notes}
            />
          </Form.Group>
          <Form.Group controlId="endDate" className="col-sm-6 pr-sm-1">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              placeholder="End Date"
              onChange={handleChange}
              value={values.endDate}
              isValid={values.endDate !== "" && validateEndDate(values.endDate)}
              isInvalid={!validateEndDate(values.endDate)}
            />
          </Form.Group>
          <Form.Group controlId="priority" className="col-sm-6 pl-sm-1">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              name="priority"
              placeholder="None"
              onChange={handleChange}
              value={values.priority}
            >
              <option value={PrioritiesEnum.None}>None</option>
              <option value={PrioritiesEnum.Low}>Low</option>
              <option value={PrioritiesEnum.Medium}>Medium</option>
              <option value={PrioritiesEnum.High}>High</option>
            </Form.Control>
          </Form.Group>
          <Button
            className="col ml-3 mr-1"
            variant="outline-danger"
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="col mr-3 ml-1"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <Spinner as="span" animation="border" size="sm" role="status" />
            )}
            {isSubmitting ? "Editing..." : "Edit Todo!"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default EditTodoModal
