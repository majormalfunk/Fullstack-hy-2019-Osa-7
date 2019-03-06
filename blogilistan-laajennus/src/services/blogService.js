
import axios from 'axios'

const baseUrl = '/api/blogs'

let user = null
let token = null

const setUser = newUser => {
  user = newUser
  if (user !== undefined && user !== null) {
    setToken(user.token)
  }
}

const setToken = newToken => {
  token = `bearer ${newToken}`
  console.log("Token is", token)
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blog, config)
  response.data.user = { username: blog.user.username, name: blog.user.name, id: blog.user.id }
  return response.data
}

const update = async ( blog ) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(baseUrl.concat(`/${blog.id}`), blog, config)
  return response.data
}

const remove = async ( blogId ) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(baseUrl.concat(`/${blogId}`), config)
  return response.data
}

export default {setUser, setToken, getAll, create, update, remove}