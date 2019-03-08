import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import { logoutUser } from '../reducers/authenticationReducer'
import { clearBlogs } from '../reducers/blogReducer'
import { clearUsers } from '../reducers/userReducer'

const Logout = (props) => {

  const storageKeyUser = 'loggedBlogUser'

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      console.log('Logging out user', props.loggedUser.username)
      await props.logoutUser()
      await props.clearBlogs()
      await props.clearUsers()
      window.localStorage.removeItem(storageKeyUser)
      props.setNotification('success', 'Goodbye!', 5)
      return
    } catch (exception) {
      props.setNotification('error', 'Unable to logout. Strange.', 10)
    }
  }

  const logoutForm = () => {
    return (
      <div style={{color:"black"}}>
        {props.loggedUser.name} logged in &nbsp;
        <Button variant="primary" size="sm" type="button" onClick={handleLogout}>Logout</Button>
      </div>
    )
  }

  if (props.loggedUser === undefined || props.loggedUser === null) {
    return (
      <>&nbsp;</>
    )
  } else {
    return (
      <>{logoutForm()}</>
    )
  }

}
Logout.propTypes = {
  loggedUser: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authentication.loggedUser
  }
}

const mapDispatchToProps = {
  logoutUser,
  setNotification,
  clearBlogs,
  clearUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
