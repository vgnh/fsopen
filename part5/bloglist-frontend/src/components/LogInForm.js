import React from 'react'

const LogInForm = ({ username, handleUsernameChange, password, handlePasswordChange, handleLogin }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username &nbsp;
        <input
          type="text"
          value={username}
          name="username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password &nbsp;
        <input
          type="password"
          value={password}
          name="password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LogInForm