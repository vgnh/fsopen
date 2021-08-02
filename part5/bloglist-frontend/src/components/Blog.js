import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, increaseLikesOf, removeBlog, visibilityOfRemove }) => {
  const [showInfo, setShowInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const infoStyle = { display: showInfo ? '' : 'none' }
  const removeButtonStyle = { display: visibilityOfRemove(blog) ? '' : 'none' }

  const handleShowInfo = () => {
    setShowInfo(!showInfo)
  }

  const handleLikes = () => {
    increaseLikesOf(blog)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      removeBlog(blog)
  }

  return (
    <div style={blogStyle} className='blogCard'>
      {blog.title} {blog.author} <button onClick={handleShowInfo} id="showInfoButton">{showInfo ? 'hide' : 'view'}</button>
      <div style={infoStyle} className='blogInfoCard'>
        {blog.url}<br />
        <span id="likesString">likes {blog.likes} </span><button onClick={handleLikes} id="likeButton">like</button><br />
        {blog.user.name}<br />
        <button onClick={handleRemove} style={removeButtonStyle} id="removeButton">remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  increaseLikesOf: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  visibilityOfRemove: PropTypes.func.isRequired
}

export default Blog