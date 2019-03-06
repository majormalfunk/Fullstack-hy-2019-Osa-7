import blogService from '../services/blogService'

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const removeBlog = blogId => {
  return async dispatch => {
    await blogService.remove(blogId)
    dispatch({
      type: 'DELETE_BLOG',
      data: blogId
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const like = blog => {
  return async dispatch => {
    const likedBlog = blog
    likedBlog.likes = likedBlog.likes + 1
    await blogService.update(likedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: likedBlog
    })
  }
}

const reducerBlog = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'DELETE_BLOG':
      const deletedId = action.data
      return state.filter(blog => blog.id !== deletedId)
    case 'INIT_BLOGS':
      return action.data.sort((a, b) => b.likes - a.likes)
    case 'LIKE_BLOG':
      const changedBlog = action.data
      const id = changedBlog.id
      return state.map(blog => blog.id !== id ? blog : changedBlog).sort((a, b) => b.likes - a.likes)
    default:
      return state
  }
}

export default reducerBlog