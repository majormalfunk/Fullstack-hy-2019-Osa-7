import React from 'react'
import { connect } from 'react-redux'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Authentication from './components/Authentication'

const App = (props) => {

  const blogs = () => {
    return <Blogs userId={props.loggedUser} />
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <Authentication />
      {(props.loggedUser !== undefined && props.loggedUser !== null ? blogs() : null)}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authentication.loggedUser
  }
}

export default connect(mapStateToProps, null)(App)