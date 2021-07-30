import React from 'react'

const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }

  const notificationColor = error ? 'red' : 'green'

  const notificationStyle = {
    color: notificationColor,
    fontSize: 20,
    padding: 5,
    background: 'lightgrey',
    borderColor: notificationColor,
    borderStyle: 'solid',
    borderRadius: 5,
    marginBottom: 7
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification