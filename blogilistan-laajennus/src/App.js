import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import Notification from './components/Notification'
import Login from './components/Login'
import Logout from './components/Logout'

const App = (props) => {

  const blogById = (id) => {
    if (props.blogs !== undefined && props.blogs !== null) {
      return props.blogs.find(a => a.id === id)
    } else {
      return null
    }
  }

  const userById = (id) => {
    if (props.users !== undefined && props.users !== null) {
      return props.users.find(a => a.id === id)
    } else {
      return null
    }
  }

  const padding = { paddingRight: 5 }

  return (
    <div className="container">
      <Router>
        <div>
          <div>
            <Navbar collapseOnSelect expand="lg" bg="warning" variant="dark">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#" as="span">
                    <Link style={padding} to="/">Blogs</Link>
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    <Link style={padding} to="/users">Users</Link>
                  </Nav.Link>
                  <Navbar.Text as="span">
                    <Logout />
                  </Navbar.Text>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
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
            <Route exact path="/users/:id" render={({ match }) =>
              <User user={userById(match.params.id)}
              />} />
          </div>
        </div>
      </Router>
    </div >
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