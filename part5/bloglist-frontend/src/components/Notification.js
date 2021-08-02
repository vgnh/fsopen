import React from 'react'

const Notification = ({ message, color }) => {
  if (message === null) {
    return null
  }

  const notificationColor = color === 'green' ? 'rgb(0, 255, 0)' : 'rgb(255, 0, 0)'

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
    <div style={notificationStyle} className="notification">
      {message}
    </div>
  )
}

export default Notification