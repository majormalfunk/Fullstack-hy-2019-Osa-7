import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks/index'
import PropTypes from 'prop-types'
import Blog from './Blog'
import { initializeBlogs, createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blogs = (props) => {

  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newURL = useField('text')

  const [showForm, setShowForm] = useState(false)

  const initBlogs = async () => {
    await props.initializeBlogs()
  }

  useEffect(() => {
    initBlogs()
  }, [])

  const handleShowForm = (event) => {
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
      props.setNotification('success', `A new blog ${newBlog.title} by ${newBlog.author} was added`, 5)
    } catch (error) {
      console.log(error.response.data.error)
      props.setNotification('error', error.response.data.error, 10)
    }
  }

  const blogList = () => {
    if (props.blogs !== undefined) {
      return (
        <div>
          {props.blogs.map(blog =>
            <Blog key={blog.id} blog={blog}
              showRemove={!blog.user || blog.user.id !== props.userId ? false : true} />
          )}
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

  return (
    <div>
      <div id="formstyle">
        {showForm ? NewBlogForm() : CreateNewButton()}
      </div>
      <div>
        {blogList()}
      </div>
    </div>
  )

}

Blogs.propTypes = {
  setNotification: PropTypes.func.isRequired,
  loggedUser: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    loggedUser: state.authentication.loggedUser
  }
}

const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  createBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs)