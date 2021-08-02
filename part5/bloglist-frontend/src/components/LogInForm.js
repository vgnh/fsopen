import React, { useState } from 'react'

const LogInForm = ({ logIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    logIn({ username, password })

    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username &nbsp;
        <input
          type="text"
          value={username}
          name="username"
          id="username"
          onChange={(event) => { setUsername(event.target.value) }}
        />
      </div>
      <div>
        password &nbsp;
        <input
          type="password"
          value={password}
          name="password"
          id="password"
          onChange={(event) => { setPassword(event.target.value) }}
        />
      </div>
      <button type="submit" id="loginSubmitButton">login</button>
    </form>
  )
}

export default LogInForm