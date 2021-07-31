import React, { useState, useEffect } from 'react'
import Blog from './components/Blog.js'
import LogInForm from './components/LogInForm.js'
import Notification from './components/Notification.js'
import NewBlogForm from './components/NewBlogForm.js'
import blogService from './services/blogs.js'
import loginService from './services/login.js'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const populateBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationColor, setNotificationColor] = useState('green')
  const showNotification = (message, color = 'green') => {
    setNotificationColor(color)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationColor('green')
    }, 5000)
  }

  const createNewBlog = async (newBlog) => {
    await blogService.create(newBlog)
    await populateBlogs()

    showNotification(`a new blog ${newBlog.blogTitle} by ${newBlog.blogAuthor} added`)
  }

  const logIn = async (usernameAndPassword) => {
    try {
      const user = await loginService.login(usernameAndPassword)

      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))

      await populateBlogs()
    }
    catch (exception) {
      showNotification('wrong username or password', 'red')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  // App execution starts here
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const reloadBlogs = async () => {
      await populateBlogs()
    }
    reloadBlogs()
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={notificationMessage} color={notificationColor} />
        <LogInForm logIn={logIn} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} color={notificationColor} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <NewBlogForm createNewBlog={createNewBlog} />
      <br />
      {
        blogs.map(blog => <Blog key={blog.id} blog={blog} />)
      }
    </div>
  )
}

export default App