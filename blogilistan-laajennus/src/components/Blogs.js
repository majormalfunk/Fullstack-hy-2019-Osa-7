import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { useField } from '../hooks/index'
import PropTypes from 'prop-types'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blogs = (props) => {

  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newURL = useField('text')

  const [showForm, setShowForm] = useState(false)

  const handleShowForm = () => {
    setShowForm(!showForm)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle.params.value,
      author: newAuthor.params.value,
      url: newURL.params.value,
      user: {
        username: props.loggedUser.username,
        name: props.loggedUser.name,
        id: props.loggedUser.id
      }
    }
    try {
      props.createBlog(newBlog)
      newTitle.reset()
      newAuthor.reset()
      newURL.reset()
      handleShowForm()
      props.setNotification('success', `A new blog ${newBlog.title} by ${newBlog.author} was added`, 5)
    } catch (error) {
      console.log(error.response.data.error)
      props.setNotification('error', error.response.data.error, 10)
    }
  }

  const haveBlogs = () => {
    return (props.blogs !== undefined && props.blogs !== null)
  }
  const haveUser = () => {
    return (props.loggedUser !== undefined && props.loggedUser !== null)
  }

  const padding = { padding: 5 }

  const blogList = () => {
    if (haveUser() && haveBlogs()) {
      return (
        <div width="80%">
          <div id="detailsshown">
            {props.blogs.map(blog =>
              <div key={blog.id} className="titleandauthor">
                <div>
                  <Link style={padding} to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )
    } else {
      return <div></div>
    }
  }

  const CreateNewButton = () => {
    return (
      <div>
        <button type="button" onClick={handleShowForm}>Create New</button>
      </div>
    )
  }

  const Cancel = () => {
    return (
      <div>
        <button type="button" onClick={handleShowForm}>Cancel</button>
      </div>
    )
  }

  const NewBlogForm = () => {
    return (
      <div>
        <form onSubmit={addBlog}>
          <table>
            <tbody>
              <tr>
                <td>Title:</td>
                <td><input size="70" {...newTitle.params} /></td>
              </tr>
              <tr>
                <td>Author:</td>
                <td><input size="70" {...newAuthor.params} /></td>
              </tr>
              <tr>
                <td>URL:</td>
                <td><input size="70" {...newURL.params} /></td>
              </tr>
            </tbody>
          </table>
          <div>
            <button type="submit">Create</button> <Cancel />
          </div>
        </form>
        <p />
      </div>
    )
  }

  if (haveUser()) {
    return (
      <div>
        <h3>Blogs</h3>
        <div id="formstyle">
          {showForm ? NewBlogForm() : CreateNewButton()}
        </div>
        <div>
          {blogList()}
        </div>
      </div>
    )
  } else {
    return <div></div>
  }

}

Blogs.propTypes = {
  setNotification: PropTypes.func.isRequired,
  loggedUser: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    loggedUser: state.authentication.loggedUser
  }
}

const mapDispatchToProps = {
  setNotification,
  createBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs)