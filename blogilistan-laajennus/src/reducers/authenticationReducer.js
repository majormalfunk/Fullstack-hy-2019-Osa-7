import loginService from '../services/login'

const storageKeyUser = 'loggedBlogUser'

export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username: username,
      password: password
    })
    window.localStorage.setItem(storageKeyUser, JSON.stringify(user))
    dispatch({
      type: 'LOGIN_USER',
      data: {
        loggedUser: user
      }
    })
  }

}

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER'
  }
}

const reducerAuth = (state = { loggedUser: null }, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return action.data
    case 'LOGOUT_USER':
      return ''
    default:
      return state
  }
}

export default reducerAuth