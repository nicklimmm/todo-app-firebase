import React from "react"
import { useFormik } from "formik"
import { useTodos, Todo, PrioritiesEnum } from "../contexts/TodosProvider"
import { Form, Button, Container } from "react-bootstrap"

const copyValues = (values: Todo): Todo => {
  return {
    id: values.id,
    description: values.description,
    notes: values.notes,
    startDate: values.startDate,
    endDate: values.endDate,
    isDone: values.isDone,
    priority: values.priority,
  }
}

const validateEndDate = (endDate: string): boolean => {
  return new Date(endDate) > new Date() || endDate === ""
}

const TodoForm: React.FC = () => {
  const { todos, setTodos } = useTodos()
  const formik = useFormik<Todo>({
    initialValues: {
      id: 0,
      description: "",
      notes: "",
      startDate: "",
      endDate: "",
      isDone: false,
      priority: PrioritiesEnum.None,
    },
    onSubmit: (values: Todo, { resetForm }) => {
      if (!validateEndDate(values.endDate)) {
        alert("Invalid End Date")
        return
      }

      values.id = todos.length
      values.startDate = new Date().toISOString()

      // Update endDate if entered
      if (values.endDate !== "")
        values.endDate = new Date(values.endDate).toISOString()

      setTodos([...todos, copyValues(values)])
      console.log(todos)

      resetForm()
    },
  })

  return (
    <Container
      fluid="sm"
      className="my-4 p-4 border border-5 border-primary rounded"
    >
      <Form onSubmit={formik.handleSubmit} className="row">
        <Form.Group controlId="description" className="col-12">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            placeholder="What's your next plan?"
            onChange={formik.handleChange}
            value={formik.values.description}
            required
          />
        </Form.Group>
        <Form.Group controlId="notes" className="col-12">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            name="notes"
            placeholder="Anything important to remember?"
            onChange={formik.handleChange}
            value={formik.values.notes}
          />
        </Form.Group>
        <Form.Group controlId="endDate" className="col-6">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="datetime-local"
            name="endDate"
            placeholder="End Date"
            onChange={formik.handleChange}
            value={formik.values.endDate}
            isValid={
              formik.values.endDate !== "" &&
              validateEndDate(formik.values.endDate)
            }
            isInvalid={!validateEndDate(formik.values.endDate)}
          />
        </Form.Group>
        <Form.Group controlId="priority" className="col-6">
          <Form.Label>Priority</Form.Label>
          <Form.Control
            as="select"
            name="priority"
            placeholder="None"
            onChange={formik.handleChange}
            value={formik.values.priority}
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
