import React, { useState } from 'react'
import { connect } from 'react-redux'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Authentication from './components/Authentication'
import blogService from './services/blogs'

const App = (props) => {
  const [user, setUser] = useState(null)

  const handleUser = (user) => {
    setUser(user)
    blogService.setUser(user ? user : null)
  }

  const blogs = () => {
    return <Blogs userId={user.id} />
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <Authentication userHandler={handleUser} />
      {(user !== undefined && user !== null ? blogs() : null)}
    </div>
  )
}

export default connect(null, null)(App)