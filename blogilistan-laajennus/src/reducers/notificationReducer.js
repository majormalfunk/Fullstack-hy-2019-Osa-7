const notificationAtStart = ''

export const setNotification = (notClass, notMessage, timeout) => {

  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        notMessage: notMessage,
        notClass: notClass
       }
    })
    await setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, (timeout * 1000))
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

const reducerNotifs = (state = { notMessage: notificationAtStart, notClass: 'success' }, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      console.log("NOTSWITCH", action.data)
      return action.data
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}


export default reducerNotifs