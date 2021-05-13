import React from "react"
import { useFormik } from "formik"
import { TodoType, PrioritiesEnum } from "../types"
import { Form, Button, Container } from "react-bootstrap"
import { useDatabase } from "../hooks/Database"
import { dateIsSameOrAfterToday, todaysDate } from "../helpers/Date"

const validateEndDate = (endDate: string): boolean => {
  return endDate === "" || dateIsSameOrAfterToday(endDate)
}

const TodoForm: React.FC = (): JSX.Element => {
  const { pushTodo } = useDatabase()
  const { handleSubmit, handleChange, values } = useFormik<TodoType>({
    initialValues: {
      id: "",
      description: "",
      notes: "",
      endDate: "",
      isDone: false,
      priority: PrioritiesEnum.None,
    },
    onSubmit: (values: TodoType, { resetForm }) => {
      if (!validateEndDate(values.endDate)) {
        alert(
          `End date must be from ${todaysDate().format("DD/MM/YYYY")} onwards.`
        )
        return
      }

      // Push todo to firebase
      pushTodo(values)
      resetForm()
    },
  })

  return (
    <Container
      fluid="sm"
      className="my-4 p-4 border border-5 border-primary rounded"
    >
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
        <Form.Group controlId="endDate" className="col-sm-6">
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
        <Form.Group controlId="priority" className="col-sm-6">
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
        <Button variant="primary" type="submit" className="col mx-3">
          Create Todo!
        </Button>
      </Form>
    </Container>
  )
}

export default TodoForm
