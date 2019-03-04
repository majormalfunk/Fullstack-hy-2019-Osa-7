import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useField } from '../hooks/index'
import { setNotification } from '../reducers/notificationReducer'
import { loginUser, logoutUser } from '../reducers/authenticationReducer'

const Authentication = (props) => {

  const username = useField('text')
  const password = useField('password')

  //  const [loggedUser, setLoggedUser] = useState(null)

  const storageKeyUser = 'loggedBlogUser'

  const storageUserToUser = () => {
    const loggedUserJSON = window.localStorage.getItem(storageKeyUser)
    if (loggedUserJSON && loggedUserJSON.length > 0 && loggedUserJSON !== 'null') {
      return JSON.parse(loggedUserJSON)
    } else {
      return null
    }
  }

  useEffect(() => {
    const user = storageUserToUser()
    if (user !== undefined && user !== null) {
      console.log("Storage user was", user)
      props.userHandler(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await props.loginUser(username.params.value, password.params.value)
      const user = storageUserToUser()
      props.userHandler(user)
      username.reset()
      password.reset()
      props.setNotification('success', 'Welcome!', 5)
    } catch (exception) {
      props.setNotification('error', 'Invalid username or password.', 5)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      console.log('Logging out user', props.loggedUser.username)
      await props.logoutUser()
      window.localStorage.removeItem(storageKeyUser)
      props.userHandler(null)
      props.setNotification('success', 'Goodbye!', 5)
    } catch (exception) {
      props.setNotification('error', 'Unable to logout. Strange.', 10)
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

  const logoutForm = () => {
    return (
      <div>
        <p>{props.loggedUser.name} logged in</p>
        <p />
        <form onSubmit={handleLogout}>
          <button type="submit">Logout</button>
        </form>
        <p />
      </div>
    )
  }

  if (props.loggedUser === undefined || props.loggedUser === null) {
    return (
      <div>{loginForm()}</div>
    )
  } else {
    return (
      <div>{logoutForm()}</div>
    )
  }

}
Authentication.propTypes = {
  userHandler: PropTypes.func,
  loggedUser: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authentication.loggedUser
  }
}

const mapDispatchToProps = {
  loginUser,
  logoutUser,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)
