import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import { connect } from 'react-redux'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import Notification from './components/Notification'
import Login from './components/Login'
import Logout from './components/Logout'

const App = (props) => {

  const blogById = (id) => {
    props.blogs.find(a => a.id === id)
  }

  const padding = { paddingRight: 5 }

  return (
    <div>
      <Router>
        <div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <Link style={padding} to="/">Blogs</Link>
                    <Link style={padding} to="/users">Users</Link>
                  </td>
                  <td>
                    <Logout />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h2>Blog App</h2>
            <Notification />
            <Login />
            <Route exact path="/" render={() => <Blogs />} />
            <Route exact path="/blogs/:id" render={({ match }) =>
              <Blog blog={blogById(match.params.id)}
              />} />
            <Route exact path="/users" render={() => <Users />} />
          </div>
        </div>
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    users: state.users,
    loggedUser: state.authentication.loggedUser
  }
}

export default connect(mapStateToProps, null)(App)