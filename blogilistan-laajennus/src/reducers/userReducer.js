import userService from '../services/userService'

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const clearUsers = () => {
  return {
    type: 'CLEAR_USERS'
  }
}

const reducerUser = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data.sort(function(a,b){ return a.name.localeCompare(b.name) })
    case 'CLEAR_USERS':
      return null
    default:
      return state
  }
}

export default reducerUser