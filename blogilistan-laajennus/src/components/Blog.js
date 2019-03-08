import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { like, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = (props) => {

  const [redirect, setRedirect] = useState(false)

  const likeBlog = async (event) => {
    event.preventDefault()
    const blogId = event.target.value
    const blog = props.blogs.find(blog => blog.id === blogId)
    try {
      //console.log("Liking blog", blog)
      props.like(blog)
      props.setNotification('success', `Blog ${blog.title} by ${blog.author} was liked`, 2)
    } catch (exception) {
      props.setNotification('error', exception.response.data.error, 10)
    }
  }

  const removeBlog = async (event) => {
    event.preventDefault()
    const blogId = event.target.value
    const deletee = props.blogs.find(blog => blog.id === blogId)
    const titleOfDeleted = `${deletee.title} by ${deletee.author}`
    //console.log('Deleting blog ', titleOfDeleted)
    try {
      props.removeBlog(blogId)
      props.setNotification('success', `The blog ${titleOfDeleted} was deleted`, 5)
      setRedirect(true)
    } catch (exception) {
      props.setNotification('error', exception.response.data.error, 10)
    }
  }

  const BlogTitle = () => {
    return <div>{props.blog.title} by {props.blog.author}</div>
  }

  const AddedBy = () => {
    if (props.blog.hasOwnProperty('user')) {
      return <td>Added by {props.blog.user.name}</td>
    } else {
      return <td>&nbsp;</td>
    }
  }

  const RemoveButton = () => {
    if (props.blog.user === undefined || props.blog.user.id !== props.loggedUser.id) {
      return <td>&nbsp;</td>
    } else {
      return <td><button value={props.blog.id} type="button" onClick={removeBlog}>Remove</button></td>
    }
  }

  const BlogDetails = () => {
    return (
      <table id="detailsshown">
        <tbody>
          <tr>
            <td><a href={props.blog.url}>{props.blog.url}</a></td>
          </tr>
          <tr>
            <td>{props.blog.likes} likes <button value={props.blog.id} type="button" onClick={likeBlog}>Like</button></td>
          </tr>
          <tr>
            {AddedBy()}
          </tr>
          <tr>
            {RemoveButton()}
          </tr>
        </tbody>
      </table>
    )
  }

  if (props.blog !== undefined && props.blog !== null) {
    return (
      <div width="80%">
        <div>
          <div id="detailsshown">
            <div className="titleandauthor">{BlogTitle()}</div>
            {BlogDetails()}
          </div>
        </div>
      </div>
    )
  } else if (redirect) {
    return <Redirect to="/"></Redirect>
  } else {
    console.log("From Blog.js:", props)
    return <div></div>
  }

}

Blog.propTypes = {
  blog: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    loggedUser: state.authentication.loggedUser
  }
}

const mapDispatchToProps = {
  setNotification,
  like,
  removeBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)
