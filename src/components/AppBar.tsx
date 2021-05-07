import React from "react"
import { Navbar, Nav, NavDropdown } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"

const AppBar = () => {
  const { currentUser, signOut } = useAuth()

  const history = useHistory()

  const handleSignOut = async () => {
    try {
      await signOut()
      history.push("/signin")
    } catch (error) {
      alert(error)
    }
  }

  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand>Todo App Firebase</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          {currentUser && (
            <NavDropdown
              // Maybe can use display name soon
              title={`${currentUser?.email}`}
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item onClick={handleSignOut}>
                Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default AppBar
