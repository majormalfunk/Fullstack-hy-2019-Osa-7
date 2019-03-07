import loginService from '../services/loginService'
import blogService from '../services/blogService'

const storageKeyUser = 'loggedBlogUser'

export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username: username,
      password: password
    })
    await blogService.setUser(user)
    await window.localStorage.setItem(storageKeyUser, JSON.stringify(user))
    dispatch({
      type: 'LOGIN_USER',
      data: {
        loggedUser: user
      }
    })
  }
}

export const reLoginUser = (user) => {
  return async dispatch => {
    await blogService.setUser(user)
    dispatch({
      type: 'RELOGIN_USER',
      data: {
        loggedUser: user
      }
    })
  }
}

export const logoutUser = () => {
  return async dispatch => {
    await blogService.setUser(null)
    dispatch({
      type: 'LOGOUT_USER',
      data: {
        loggedUser: null
      }
    })
  }
}

const reducerAuth = (state = { loggedUser: null }, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return action.data
    case 'RELOGIN_USER':
      return action.data
    case 'LOGOUT_USER':
      return action.data
    default:
      return state
  }
}

export default reducerAuth