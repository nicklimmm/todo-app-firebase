import React from "react"
import { useAuth } from "../contexts/AuthContext"
import { Redirect, Route } from "react-router-dom"

const PrivateRoute = ({ ...props }) => {
  const { currentUser } = useAuth()
  return <>{currentUser ? <Route {...props} /> : <Redirect to="/signin" />}</>
}

export default PrivateRoute
