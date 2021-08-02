import React, { useState } from 'react'

const NewBlogForm = ({ createNewBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleCreateNewBlog = (event) => {
    event.preventDefault()

    createNewBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    })

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateNewBlog}>
        <div>
          title: &nbsp;
          <input
            type="text"
            value={blogTitle}
            name="blogTitle"
            id="blogTitle"
            onChange={(event) => { setBlogTitle(event.target.value) }}
          />
        </div>
        <div>
          author: &nbsp;
          <input
            type="text"
            value={blogAuthor}
            name="blogAuthor"
            id="blogAuthor"
            onChange={(event) => { setBlogAuthor(event.target.value) }}
          />
        </div>
        <div>
          url: &nbsp;
          <input
            type="text"
            value={blogUrl}
            name="blogUrl"
            id="blogUrl"
            onChange={(event) => { setBlogUrl(event.target.value) }}
          />
        </div>
        <button type="submit" id="createButton">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm