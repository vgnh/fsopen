import React, { useState, useEffect } from 'react'
import Blog from './components/Blog.js'
import LogInForm from './components/LogInForm.js'
import Notification from './components/Notification.js'
import CreateNewBlog from './components/CreateNewBlog.js'
import blogService from './services/blogs.js'
import loginService from './services/login.js'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const populateBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorStatus, setErrorStatus] = useState(false)

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const handleCreateBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
    await blogService.create(newBlog)

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
    await populateBlogs()

    setNotificationMessage(`a new blog ${blogTitle} by ${blogAuthor} added`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      await populateBlogs()
    }
    catch (error) {
      setErrorStatus(true)
      setNotificationMessage('wrong username or password')
      setTimeout(() => {
        setNotificationMessage(null)
        setErrorStatus(false)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

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
        <Notification message={notificationMessage} error={errorStatus} />
        <LogInForm
          username={username} setUsername={setUsername}
          password={password} setPassword={setPassword}
          handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} error={errorStatus} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <CreateNewBlog
        blogTitle={blogTitle} setBlogTitle={setBlogTitle}
        blogAuthor={blogAuthor} setBlogAuthor={setBlogAuthor}
        blogUrl={blogUrl} setBlogUrl={setBlogUrl}
        handleCreateBlog={handleCreateBlog} />
      <br />
      {
        blogs.map(blog => <Blog key={blog.id} blog={blog} />)
      }
    </div>
  )
}

export default App