import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import authReducer from './reducers/authenticationReducer'
import notifReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  authentication: authReducer,
  notification: notifReducer,
  blogs: blogReducer,
  users: userReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store