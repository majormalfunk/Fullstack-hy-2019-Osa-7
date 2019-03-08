import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import { loginUser, reLoginUser } from '../reducers/authenticationReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import { initializeUsers } from '../reducers/userReducer'

const Login = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const storageKeyUser = 'loggedBlogUser'

  const storageUserToUser = () => {
    const loggedUserJSON = window.localStorage.getItem(storageKeyUser)
    if (loggedUserJSON && loggedUserJSON.length > 0 && loggedUserJSON !== 'null') {
      return JSON.parse(loggedUserJSON)
    } else {
      return null
    }
  }

  const initStuff = async () => {
    await props.initializeBlogs()
    await props.initializeUsers()
  }

  useEffect(() => {
    const user = storageUserToUser()
    if (user !== undefined && user !== null) {
      console.log("Storage user was", user)
      props.reLoginUser(user)
      initStuff()
    }
  }, [])

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    console.log("username", username)
    console.log("password", password)
    event.preventDefault()
    try {
      await props.loginUser(username, password)
      initStuff()
      setUsername('')
      setPassword('')
      props.setNotification('success', 'Welcome!', 5)
    } catch (exception) {
      props.setNotification('error', 'Invalid username or password.', 5)
    }
  }

  if (props.loggedUser === undefined || props.loggedUser === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username"
              placeholder="Enter username" onChange={handleUsername} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password"
              placeholder="Enter password" onChange={handlePassword} />
          </Form.Group>
          <Form.Group>
            <Button variant="primary" type="submit">Login</Button>
          </Form.Group>
          <p />
        </Form>
      </div >
    )
  } else {
    if (window.location.pathname !== "/") {
      return (
        <Redirect to="/"></Redirect>
      )
    } else {
      return null
    }
  }

}
Login.propTypes = {
  loggedUser: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authentication.loggedUser
  }
}

const mapDispatchToProps = {
  loginUser,
  reLoginUser,
  setNotification,
  initializeBlogs,
  initializeUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
