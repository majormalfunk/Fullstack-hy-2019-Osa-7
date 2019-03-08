import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table, Button, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blogs = (props) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [showForm, setShowForm] = useState(false)

  const handleShowForm = () => {
    setShowForm(!showForm)
  }

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthor = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrl = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
      user: {
        username: props.loggedUser.username,
        name: props.loggedUser.name,
        id: props.loggedUser.id
      }
    }
    try {
      props.createBlog(newBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
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

  const blogList = () => {
    if (haveBlogs()) {
      return (
        <Table responsive striped hover size="sm">
          <thead>
            <tr>
              <th>Title</th><th>Author</th>
            </tr>
          </thead>
          <tbody>
            {props.blogs.map(blog =>
              <tr key={blog.id}>
                <td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
                <td>{blog.author}</td>
              </tr>
            )}
          </tbody>
        </Table>
      )
    } else {
      return (
        <div>
          <h4>No blogs</h4>
        </div>
      )
    }
  }

  const CreateNewButton = () => {
    return (
      <div>
        <Button type="button" variant="primary" size="sm" onClick={handleShowForm}>Create New</Button>
      </div>
    )
  }

  const NewBlogForm = () => {
    return (
      <div>
        <Form onSubmit={addBlog}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" onChange={handleTitle}
              placeholder="Enter the title of the blog" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" name="author" onChange={handleAuthor}
              placeholder="Enter the name of the author" />
          </Form.Group>
          <Form.Group>
            <Form.Label>URL</Form.Label>
            <Form.Control type="text" name="url" onChange={handleUrl}
              placeholder="Enter the url of the blog" />
          </Form.Group>
          <Form.Group>
            <Button variant="success" type="submit" size="sm">Create</Button>
          </Form.Group>
          <Form.Group>
            <Button variant="danger" type="button" size="sm"
              onClick={handleShowForm}>Cancel</Button>
          </Form.Group>
        </Form>
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
        {blogList()}
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