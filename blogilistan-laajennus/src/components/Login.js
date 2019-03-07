import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useField } from '../hooks/index'
import { setNotification } from '../reducers/notificationReducer'
import { loginUser, reLoginUser } from '../reducers/authenticationReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import { initializeUsers } from '../reducers/userReducer'

const Login = (props) => {

  const username = useField('text')
  const password = useField('password')

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await props.loginUser(username.params.value, password.params.value)
      initStuff()
      username.reset()
      password.reset()
      props.setNotification('success', 'Welcome!', 5)
    } catch (exception) {
      props.setNotification('error', 'Invalid username or password.', 5)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <table>
            <tbody>
              <tr>
                <td>Username</td>
                <td><input size="20" name="Username" {...username.params} /></td>
              </tr>
              <tr>
                <td>Password</td>
                <td><input size="20" name="Password" {...password.params} /></td>
              </tr>
              <tr>
                <td>
                  &nbsp;
                </td>
                <td>
                  <button type="submit">Login</button>
                </td>
              </tr>
            </tbody>
          </table>
          <p />
        </form>
      </div>
    )
  }

  if (props.loggedUser === undefined || props.loggedUser === null) {
    return (
      <div>{loginForm()}</div>
    )
  } else {
    return (
      <div></div>
    )
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
