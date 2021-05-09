import React from "react"
import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import TodosPage from "./components/TodosPage"
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import PrivateRoute from "./components/PrivateRoute"
import ResetPassword from "./components/ResetPassword"
import AppBar from "./components/AppBar"

function App(): JSX.Element {
  return (
    <Router>
      <AuthProvider>
        <AppBar />
        <Switch>
          <PrivateRoute path="/" component={TodosPage} exact />
          <Route path="/resetpassword" component={ResetPassword} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App
