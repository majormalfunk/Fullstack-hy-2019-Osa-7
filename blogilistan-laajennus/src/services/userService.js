import axios from 'axios'

const baseUrl = '/api/users'

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

export default { setUser, setToken, getAll }