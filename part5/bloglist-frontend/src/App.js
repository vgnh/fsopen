import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog.js'
import LogInForm from './components/LogInForm.js'
import Notification from './components/Notification.js'
import NewBlogForm from './components/NewBlogForm.js'
import blogService from './services/blogs.js'
import loginService from './services/login.js'
import Togglable from './components/Togglable.js'

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
    createNewBlogFormRef.current.toggleVisibility()
    await blogService.create(newBlog)
    await populateBlogs()

    showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
  }

  const increaseLikesOf = async (blog) => {
    await blogService.update(blog.id, { likes: (blog.likes + 1) })
    await populateBlogs()
  }

  const removeBlog = async (blog) => {
    await blogService.remove(blog.id)
    await populateBlogs()
  }

  const visibilityOfRemove = (blog) => {
    return blog.user.name === user.name
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

  const createNewBlogFormRef = useRef()
  const createNewBlogForm = () => (
    <Togglable buttonLabel='create new blog' ref={createNewBlogFormRef}>
      <NewBlogForm createNewBlog={createNewBlog} />
    </Togglable>
  )

  const displayAllBlogs = () => {
    blogs.sort((a, b) => b.likes - a.likes)
    return blogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        increaseLikesOf={increaseLikesOf}
        visibilityOfRemove={visibilityOfRemove}
        removeBlog={removeBlog} />
    )
  }

  // App execution starts here
  useEffect(() => {
    const reloadBlogs = async () => { await populateBlogs() }
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      reloadBlogs()
    }
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
      <p>{user.name} logged in <button onClick={handleLogout} id="logoutButton">logout</button></p>
      {
        createNewBlogForm()
      }
      <br />
      {
        displayAllBlogs()
      }
    </div>
  )
}

export default App