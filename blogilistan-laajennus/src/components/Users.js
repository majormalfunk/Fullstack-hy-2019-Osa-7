import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'

const Users = (props) => {

  const haveUsers = () => {
    return (props.users !== undefined && props.users !== null)
  }
  const haveUser = () => {
    return (props.loggedUser !== undefined && props.loggedUser !== null)
  }

  const center = { textAlign: "center" }

  if (haveUser() && haveUsers()) {
    return (
      <div>
        <h3>Users</h3>
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>User</th><th style={center}>Blogs added</th>
            </tr>
          </thead>
          <tbody>
            {props.users.map(user =>
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td style={center}>{user.blogs === undefined ? 0 : user.blogs.length}</td>
              </tr>
            )}
          </tbody>
        </Table>
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