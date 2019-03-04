import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import authReducer from './reducers/authenticationReducer'
import notifReducer from './reducers/notificationReducer'
//import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  authentication: authReducer,
  notification: notifReducer,
  //filter: filterReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store