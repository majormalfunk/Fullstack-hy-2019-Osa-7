import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const User = (props) => {

  const haveBlogs = () => {
    console.log("USER:", props.user)
    return (props.user.blogs !== undefined && props.user.blogs !== null)
  }

  const usersBlogList = () => {
    if (haveBlogs()) {
      return (
        <div>
          <div>
            <h4>Added blogs</h4>
          </div>
          <ul>
            {props.user.blogs.map(blog =>
              <li key={blog.id}>{blog.title} by {blog.author}</li>
            )}
          </ul>
        </div>
      )
    } else {
      return <div></div>
    }
  }

  if (props.user !== undefined && props.user !== null) {
    return (
      <div>
        <h3>{props.user.name}</h3>
        <div>
          {usersBlogList()}
        </div>
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