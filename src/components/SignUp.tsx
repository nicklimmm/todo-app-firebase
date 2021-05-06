import React from "react"
import { useAuth } from "../contexts/AuthContext"
import { EmailAuthType } from "../types"
import { useFormik } from "formik"
import { Form, Button, Container, Card, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import * as Yup from "yup"

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password is too short - should be at least 6 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
})

const SignUp: React.FC = (): JSX.Element => {
  const { signUp } = useAuth()
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
      password: "",
      confirmPassword: "",
    },
    initialStatus: { signUpSuccess: false, errorMessage: "" },
    validationSchema: SignUpSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      setStatus({ signUpSuccess: false, errorMessage: "" })
      try {
        await signUp(values.email, values.password!)
        setStatus({ ...status, signUpSuccess: true })
      } catch (error) {
        setStatus({ ...status, errorMessage: `${error}` })
      }
    },
  })
  return (
    <Container className="d-flex flex-column flex-grow-1 my-4 p-4">
      <Card>
        <Card.Header as="h2" className="text-center">
          Sign Up
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

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={values.confirmPassword}
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
              {isSubmitting ? "Submitting..." : "Sign Up"}
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
          {status.signUpSuccess && (
            <Alert variant="success">Sign Up successful. Please sign in.</Alert>
          )}
        </Card.Body>
      </Card>
      <div className="text-center my-3">
        Already signed up? <Link to="/signin">Sign In</Link>
      </div>
    </Container>
  )
}

export default SignUp
