import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import User from './User'
import { setNotification } from '../reducers/notificationReducer'

const Users = (props) => {

  const haveUsers = () => {
    return (props.users !== undefined && props.users !== null)
  }
  const haveUser = () => {
    return (props.loggedUser !== undefined && props.loggedUser !== null)
  }

  const userById = (id) => {
    console.log("uBi props.users", props.users, "id", id)
    return props.users.find(a => a.id === id)
  }

  const padding = { paddingRight: 5 }
  const center = { textAlign: "center" }

  const userList = () => {
    console.log("Users: props.users", props.users, "props.loggedUser", props.loggedUser)
    if (haveUser() && haveUsers()) {
      return (
        <Router>
          <div>
            <table>
              <tbody>
                <tr><td>&nbsp;</td><td style={center}>Blogs</td></tr>
                <tr><td>&nbsp;</td><td style={center}>added</td></tr>
                {props.users.map(user =>
                  <tr key={user.id}>
                    <td><Link style={padding} to={`/users/${user.id}`}>{user.name}</Link></td>
                    <td style={center}>{user.blogs === undefined ? 0 : user.blogs.length}</td>
                  </tr>
                )}
              </tbody>
            </table>
            <Route exact path="/users/:id" render={({ match }) =>
              <User user={userById(match.params.id)}
              />} />
          </div>
        </Router>
      )
    } else {
      return <div></div>
    }
  }

  if (haveUser()) {
    return (
      <div>
        <h3>Users</h3>
        <div>
          {userList()}
        </div>
      </div>
    )
  } else {
    return <div></div>
  }

}

Users.propTypes = {
  setNotification: PropTypes.func.isRequired,
  loggedUser: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    loggedUser: state.authentication.loggedUser,
    users: state.users
  }
}

const mapDispatchToProps = {
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)