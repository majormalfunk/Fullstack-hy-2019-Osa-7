import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks/index'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import Blog from './Blog'
import { setNotification } from '../reducers/notificationReducer'

const Blogs = (props) => {

  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newURL = useField('text')

  const [blogs, setBlogs] = useState([])
  const [showForm, setShowForm] = useState(false)

  const fetchAll = async () => {
    const unsorted = await blogService.getAll()
    setBlogs(sortBlogs(unsorted))
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const sortBlogs = (unsorted) => {
    //console.log('Sorting blogs')
    return unsorted.sort(function (a, b) { return b.likes - a.likes })
  }

  const handleShowForm = (event) => {
    setShowForm(!showForm)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle.params.value,
      author: newAuthor.params.value,
      url: newURL.params.value
    }

    try {
      const created = await blogService.create(blogObject)
      //console.log('Created blog', created)
      setBlogs(blogs.concat(created))
      newTitle.reset()
      newAuthor.reset()
      newURL.reset()
      props.setNotification('success', `A new blog ${created.title} by ${created.author} was added`, 5)
    } catch (error) {
      console.log(error.response.data.error)
      props.setNotification('error', error.response.data.error, 10)
    }
  }

  const likeBlog = async (event) => {
    event.preventDefault()
    const blogId = event.target.value
    const blog = blogs.find(blog => blog.id === blogId)
    try {
      const updated = await blogService.update({ blog, blogId })
      blog.likes = updated.likes
      const updatedBlogs = blogs.map(b => b.id === blog.id ? blog : b)
      sortBlogs(updatedBlogs)
      setBlogs(updatedBlogs)
      props.setNotification('success', `Blog ${blog.title} by ${blog.author} was liked`, 2)
    } catch (exception) {
      props.setNotification('error', exception.response.data.error, 10)
    }
  }

  const deleteBlog = async (event) => {
    event.preventDefault()
    const blogId = event.target.value
    const deletee = blogs.find(blog => blog.id === blogId)
    const titleOfDeleted = `${deletee.title} by ${deletee.author}`
    //console.log('Deleting blog ', titleOfDeleted)
    try {
      await blogService.remove({ blogId })
      setBlogs(blogs.filter(blog => blog.id !== blogId))
      props.setNotification('success', `The blog ${titleOfDeleted} was deleted`, 5)
    } catch (exception) {
      props.setNotification('error', exception.response.data.error, 10)
    }
  }

  const blogList = () => {
    return (
      <div>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            likeHandler={likeBlog}
            deleteHandler={deleteBlog}
            showRemove={!blog.user || blog.user.id !== props.userId ? false : true} />
        )}
      </div>
    )
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
  userId: PropTypes.string.isRequired
}

const mapDispatchToProps = {
  setNotification
}

export default connect(null, mapDispatchToProps)(Blogs)