import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import PropTypes from 'prop-types'

const User = (props) => {

  const haveBlogs = () => {
    console.log("USER:", props.user)
    return (props.user.blogs !== undefined && props.user.blogs !== null)
  }
  const haveUser = () => {
    return (props.loggedUser !== undefined && props.loggedUser !== null)
  }

  const usersBlogs = () => {
    if (haveBlogs()) {
      return (
        <Table responsive striped>
          <tbody>
            {props.user.blogs.map(blog =>
              <tr key={blog.id}>
                <td><Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link></td>
              </tr>
            )}
          </tbody>
        </Table>
      )
    } else {
      return (
      <div>
        <h3>{props.user.name} hasn't added any blogs</h3>
      </div>
      )
    }
  }

  if (haveUser()) {
    return (
      <div>
        <h3>{props.user.name}'s added blogs:</h3>
        {usersBlogs()}
      </div>
    )
  } else {
    return <div></div>
  }

}

User.propTypes = {
  loggedUser: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authentication.loggedUser,
  }
}

export default connect(mapStateToProps, null)(User)