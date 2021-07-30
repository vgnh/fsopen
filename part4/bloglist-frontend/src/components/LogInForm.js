import React from 'react'
import Notification from './Notification'

const LogInForm = ({ username, setUsername, password, setPassword, handleLogin, notificationMessage, errorStatus }) => {
  return (
    <div>
      <h2>log in to application</h2>
      <Notification message={notificationMessage} error={errorStatus} />
      <form onSubmit={handleLogin}>
        <div>
          username &nbsp;
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password &nbsp;
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LogInForm