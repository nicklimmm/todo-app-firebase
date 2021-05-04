import React from "react"
import { useAuth, EmailAuthType } from "../contexts/AuthContext"
import { useFormik } from "formik"
import { Form, Button, Container, Card, Alert } from "react-bootstrap"
import * as Yup from "yup"
import { Link } from "react-router-dom"

const SignInSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
})

const ResetPassword: React.FC = (): JSX.Element => {
  const { resetPassword } = useAuth()
  const {
    values,
    handleChange,
    handleSubmit,
    isSubmitting,
    errors,
    status,
    setStatus,
  } = useFormik<EmailAuthType>({
    initialValues: {
      email: "",
    },
    initialStatus: { emailSent: false, errorMessage: "" },
    validationSchema: SignInSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      setStatus({ emailSent: false, errorMessage: "" })
      try {
        await resetPassword(values.email)
        setStatus({ ...status, signInSuccess: true })
      } catch (error) {
        setStatus({ ...status, errorMessage: `${error}` })
      }
    },
  })
  return (
    <Container className="d-flex flex-column flex-grow-1 my-4 p-4">
      <Card>
        <Card.Header as="h2" className="text-center">
          Reset Password
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={values.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Reset Password"}
            </Button>
          </Form>
          {Object.entries(errors).map(([key, value]) => (
            <Alert variant="danger" key={key}>
              {value}
            </Alert>
          ))}
          {status.errorMessage !== "" && (
            <Alert variant="danger">{status.errorMessage}</Alert>
          )}
          {status.signInSuccess && (
            <Alert variant="success">
              An email confirmation is sent to your email. Please check your
              inbox.
            </Alert>
          )}
        </Card.Body>
      </Card>
      <div className="text-center my-3">
        Back to <Link to="/">main page</Link>
      </div>
    </Container>
  )
}

export default ResetPassword
