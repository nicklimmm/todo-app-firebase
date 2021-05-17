import React from "react"
import { useAuth } from "../contexts/AuthContext"
import { EmailAuthType } from "../types"
import { useFormik } from "formik"
import { Form, Button, Container, Card, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import * as Yup from "yup"

const SignInSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
})

const SignIn: React.FC = (): JSX.Element => {
  const { signIn } = useAuth()
  const history = useHistory()
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
    },
    initialStatus: { signInSuccess: false, errorMessage: "" },
    validationSchema: SignInSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      setStatus({ signInSuccess: false, errorMessage: "" })
      try {
        await signIn(values.email, values.password!)
        setStatus({ ...status, signInSuccess: true })
        history.push("/")
      } catch (error) {
        setStatus({ ...status, errorMessage: `${error}` })
      }
    },
  })
  return (
    <Container className="my-4 p-4">
      <Card>
        <Card.Header as="h2" className="text-center">
          Sign In
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

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Sign In"}
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
              Sign In successful. Please <Link to="/signin">sign in</Link>
            </Alert>
          )}
        </Card.Body>
      </Card>
      <div className="text-center mt-3">
        Not yet signed up? <Link to="/signup">Sign Up</Link>
      </div>
      <div className="text-center mt-1">
        Forgot password? <Link to="/resetpassword">Reset Password</Link>
      </div>
    </Container>
  )
}

export default SignIn
